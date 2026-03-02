import { StrongAddress } from '@celo/base'
import { testWithAnvilL2 } from '@celo/dev-utils/anvil-test'
import { addressToPublicKey } from '@celo/utils/lib/signatureUtils'
import { soliditySha3 } from '@celo/utils/lib/solidity'
import { ContractKit, newKitFromProvider } from '../kit'
import { getParsedSignatureOfAddress } from '../utils/getParsedSignatureOfAddress'
import { AccountsWrapper } from './Accounts'
import { valueToBigNumber, valueToFixidityString } from './BaseWrapper'
import { parseEther } from 'viem'
import { LockedGoldWrapper } from './LockedGold'
import { ValidatorsWrapper } from './Validators'
jest.setTimeout(60 * 1000)

/*
TEST NOTES:
- In migrations: The only account that has USDm is accounts[0]
*/

const minLockedGoldValue = parseEther('10000').toString()

testWithAnvilL2('Accounts Wrapper', (provider) => {
  let kit: ContractKit
  let accounts: StrongAddress[] = []
  let accountsInstance: AccountsWrapper
  let validators: ValidatorsWrapper
  let lockedGold: LockedGoldWrapper

  const registerAccountWithLockedGold = async (account: string) => {
    if (!(await accountsInstance.isAccount(account))) {
      const hash = await accountsInstance.createAccount({ from: account })
      await kit.connection.waitForTransactionReceipt(hash)
    }
    const hash = await lockedGold.lock({ from: account, value: minLockedGoldValue })
    await kit.connection.waitForTransactionReceipt(hash)
  }

  const getParsedSignatureOfAddressForTest = (address: string, signer: string) => {
    return getParsedSignatureOfAddress(soliditySha3, kit.connection.sign, address, signer)
  }

  beforeAll(async () => {
    kit = newKitFromProvider(provider)
    accounts = await kit.connection.getAccounts()
    validators = await kit.contracts.getValidators()
    lockedGold = await kit.contracts.getLockedGold()
    accountsInstance = await kit.contracts.getAccounts()
  })

  const setupValidator = async (validatorAccount: string) => {
    await registerAccountWithLockedGold(validatorAccount)
    const ecdsaPublicKey = await addressToPublicKey(validatorAccount, kit.connection.sign)
    const hash = await validators.registerValidatorNoBls(ecdsaPublicKey, { from: validatorAccount })
    await kit.connection.waitForTransactionReceipt(hash)
  }

  test('SBAT authorize attestation key', async () => {
    const account = accounts[0]
    const signer = accounts[1]
    const hash = await accountsInstance.createAccount({ from: account })
    await kit.connection.waitForTransactionReceipt(hash)
    const sig = await getParsedSignatureOfAddressForTest(account, signer)
    const authHash = await accountsInstance.authorizeAttestationSigner(signer, sig, {
      from: account,
    })
    await kit.connection.waitForTransactionReceipt(authHash)
    const attestationSigner = await accountsInstance.getAttestationSigner(account)
    expect(attestationSigner).toEqual(signer)
  })

  test('SBAT remove attestation key authorization', async () => {
    const account = accounts[0]
    const signer = accounts[1]
    const hash = await accountsInstance.createAccount({ from: account })
    await kit.connection.waitForTransactionReceipt(hash)
    const sig = await getParsedSignatureOfAddressForTest(account, signer)
    const authHash = await accountsInstance.authorizeAttestationSigner(signer, sig, {
      from: account,
    })
    await kit.connection.waitForTransactionReceipt(authHash)

    let attestationSigner = await accountsInstance.getAttestationSigner(account)
    expect(attestationSigner).toEqual(signer)

    const removeHash = await accountsInstance.removeAttestationSigner({ from: account })
    await kit.connection.waitForTransactionReceipt(removeHash)

    attestationSigner = await accountsInstance.getAttestationSigner(account)
    expect(attestationSigner).toEqual(account)
  })

  test('SBAT authorize validator key when not a validator', async () => {
    const account = accounts[0]
    const signer = accounts[1]
    const hash = await accountsInstance.createAccount({ from: account })
    await kit.connection.waitForTransactionReceipt(hash)
    const sig = await getParsedSignatureOfAddressForTest(account, signer)
    const authHash = await accountsInstance.authorizeValidatorSigner(signer, sig, validators, {
      from: account,
    })
    await kit.connection.waitForTransactionReceipt(authHash)

    const validatorSigner = await accountsInstance.getValidatorSigner(account)
    expect(validatorSigner).toEqual(signer)
  })

  test('SBAT authorize validator key when a validator', async () => {
    const account = accounts[0]
    const signer = accounts[1]
    const hash = await accountsInstance.createAccount({ from: account })
    await kit.connection.waitForTransactionReceipt(hash)
    await setupValidator(account)
    const sig = await getParsedSignatureOfAddressForTest(account, signer)
    const authHash = await accountsInstance.authorizeValidatorSigner(signer, sig, validators, {
      from: account,
    })
    await kit.connection.waitForTransactionReceipt(authHash)

    const validatorSigner = await accountsInstance.getValidatorSigner(account)
    expect(validatorSigner).toEqual(signer)
  })

  test('SBAT set the wallet address to the caller', async () => {
    const account = accounts[0]
    const hash = await accountsInstance.createAccount({ from: account })
    await kit.connection.waitForTransactionReceipt(hash)
    const setHash = await accountsInstance.setWalletAddress(account, null, { from: account })
    await kit.connection.waitForTransactionReceipt(setHash)

    const walletAddress = await accountsInstance.getWalletAddress(account)
    expect(walletAddress).toEqual(account)
  })

  test('SBAT set the wallet address to a different wallet address', async () => {
    const account = accounts[0]
    const wallet = accounts[1]
    const hash = await accountsInstance.createAccount({ from: account })
    await kit.connection.waitForTransactionReceipt(hash)
    const signature = await accountsInstance.generateProofOfKeyPossession(account, wallet)
    const setHash = await accountsInstance.setWalletAddress(wallet, signature, { from: account })
    await kit.connection.waitForTransactionReceipt(setHash)

    const walletAddress = await accountsInstance.getWalletAddress(account)
    expect(walletAddress).toEqual(wallet)
  })

  test('SNBAT to set to a different wallet address without a signature', async () => {
    const account = accounts[0]
    const wallet = accounts[1]
    const hash = await accountsInstance.createAccount({ from: account })
    await kit.connection.waitForTransactionReceipt(hash)
    await expect(
      accountsInstance.setWalletAddress(wallet, null, { from: account })
    ).rejects.toThrow()
  })

  test('SNBAT fraction greater than 1', async () => {
    const account = accounts[0]
    const beneficiary = accounts[1]
    const fractionInvalid = valueToFixidityString(valueToBigNumber('2.5'))

    kit.defaultAccount = account

    const hash = await accountsInstance.createAccount({ from: account })
    await kit.connection.waitForTransactionReceipt(hash)
    await expect(
      accountsInstance.setPaymentDelegation(beneficiary, fractionInvalid, { from: account })
    ).rejects.toThrow('Fraction must not be greater than 1')
  })

  test('SNBAT beneficiary and fraction', async () => {
    const account = accounts[0]
    const beneficiary = accounts[1]
    const fractionValid = valueToFixidityString(valueToBigNumber('.25'))
    const expectedRetval = { 0: beneficiary, 1: fractionValid }

    kit.defaultAccount = account

    const hash = await accountsInstance.createAccount({ from: account })
    await kit.connection.waitForTransactionReceipt(hash)
    const setHash = await accountsInstance.setPaymentDelegation(beneficiary, fractionValid)
    await kit.connection.waitForTransactionReceipt(setHash)

    const retval = await accountsInstance.getPaymentDelegation(account)
    expect(retval).toEqual(expectedRetval)
  })

  test('SNBAT delete expected to clear beneficiary and fraction', async () => {
    const account = accounts[0]
    const beneficiary = accounts[1]
    const fractionValid = valueToFixidityString(valueToBigNumber('.25'))
    const expectedRetval = { 0: '0x0000000000000000000000000000000000000000', 1: '0' }

    kit.defaultAccount = account

    const hash = await accountsInstance.createAccount({ from: account })
    await kit.connection.waitForTransactionReceipt(hash)
    const setHash = await accountsInstance.setPaymentDelegation(beneficiary, fractionValid)
    await kit.connection.waitForTransactionReceipt(setHash)

    const delHash = await accountsInstance.deletePaymentDelegation()
    await kit.connection.waitForTransactionReceipt(delHash)

    const retval = await accountsInstance.getPaymentDelegation(account)
    expect(retval).toEqual(expectedRetval)
  })
})
