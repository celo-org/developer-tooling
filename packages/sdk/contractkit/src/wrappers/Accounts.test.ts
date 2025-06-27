import { StrongAddress } from '@celo/base'
import { testWithAnvilL2 } from '@celo/dev-utils/anvil-test'
import { addressToPublicKey } from '@celo/utils/lib/signatureUtils'
import Web3 from 'web3'
import { ContractKit, newKitFromWeb3 } from '../kit'
import { getParsedSignatureOfAddress } from '../utils/getParsedSignatureOfAddress'
import { AccountsWrapper } from './Accounts'
import { valueToBigNumber, valueToFixidityString } from './BaseWrapper'
import { LockedGoldWrapper } from './LockedGold'
import { ValidatorsWrapper } from './Validators'
jest.setTimeout(10 * 1000)

/*
TEST NOTES:
- In migrations: The only account that has cUSD is accounts[0]
*/

const minLockedGoldValue = Web3.utils.toWei('10000', 'ether') // 10k gold

testWithAnvilL2('Accounts Wrapper', (web3) => {
  let kit: ContractKit
  let accounts: StrongAddress[] = []
  let accountsInstance: AccountsWrapper
  let validators: ValidatorsWrapper
  let lockedGold: LockedGoldWrapper

  const registerAccountWithLockedGold = async (account: string) => {
    if (!(await accountsInstance.isAccount(account))) {
      await accountsInstance.createAccount().sendAndWaitForReceipt({ from: account })
    }
    await lockedGold.lock().sendAndWaitForReceipt({ from: account, value: minLockedGoldValue })
  }

  const getParsedSignatureOfAddressForTest = (address: string, signer: string) => {
    return getParsedSignatureOfAddress(
      web3.utils.soliditySha3,
      kit.connection.sign,
      address,
      signer
    )
  }

  beforeAll(async () => {
    kit = newKitFromWeb3(web3)
    accounts = await kit.connection.getAccounts()
    validators = await kit.contracts.getValidators()
    lockedGold = await kit.contracts.getLockedGold()
    accountsInstance = await kit.contracts.getAccounts()
  })

  const setupValidator = async (validatorAccount: string) => {
    await registerAccountWithLockedGold(validatorAccount)
    const ecdsaPublicKey = await addressToPublicKey(validatorAccount, kit.connection.sign)
    await validators.registerValidatorNoBls(ecdsaPublicKey).sendAndWaitForReceipt({
      from: validatorAccount,
    })
  }

  test('SBAT authorize attestation key', async () => {
    const account = accounts[0]
    const signer = accounts[1]
    await accountsInstance.createAccount().sendAndWaitForReceipt({ from: account })
    const sig = await getParsedSignatureOfAddressForTest(account, signer)
    await (await accountsInstance.authorizeAttestationSigner(signer, sig)).sendAndWaitForReceipt({
      from: account,
    })
    const attestationSigner = await accountsInstance.getAttestationSigner(account)
    expect(attestationSigner).toEqual(signer)
  })

  test('SBAT remove attestation key authorization', async () => {
    const account = accounts[0]
    const signer = accounts[1]
    await accountsInstance.createAccount().sendAndWaitForReceipt({ from: account })
    const sig = await getParsedSignatureOfAddressForTest(account, signer)
    await (await accountsInstance.authorizeAttestationSigner(signer, sig)).sendAndWaitForReceipt({
      from: account,
    })

    let attestationSigner = await accountsInstance.getAttestationSigner(account)
    expect(attestationSigner).toEqual(signer)

    await (await accountsInstance.removeAttestationSigner()).sendAndWaitForReceipt({
      from: account,
    })

    attestationSigner = await accountsInstance.getAttestationSigner(account)
    expect(attestationSigner).toEqual(account)
  })

  test('SBAT authorize validator key when not a validator', async () => {
    const account = accounts[0]
    const signer = accounts[1]
    await accountsInstance.createAccount().sendAndWaitForReceipt({ from: account })
    const sig = await getParsedSignatureOfAddressForTest(account, signer)
    await (
      await accountsInstance.authorizeValidatorSigner(signer, sig, validators)
    ).sendAndWaitForReceipt({ from: account })

    const validatorSigner = await accountsInstance.getValidatorSigner(account)
    expect(validatorSigner).toEqual(signer)
  })

  test('SBAT authorize validator key when a validator', async () => {
    const account = accounts[0]
    const signer = accounts[1]
    await accountsInstance.createAccount().sendAndWaitForReceipt({ from: account })
    await setupValidator(account)
    const sig = await getParsedSignatureOfAddressForTest(account, signer)
    await (
      await accountsInstance.authorizeValidatorSigner(signer, sig, validators)
    ).sendAndWaitForReceipt({ from: account })

    const validatorSigner = await accountsInstance.getValidatorSigner(account)
    expect(validatorSigner).toEqual(signer)
  })

  test('SBAT set the wallet address to the caller', async () => {
    const account = accounts[0]
    await accountsInstance.createAccount().sendAndWaitForReceipt({ from: account })
    await accountsInstance.setWalletAddress(account).sendAndWaitForReceipt({ from: account })

    const walletAddress = await accountsInstance.getWalletAddress(account)
    expect(walletAddress).toEqual(account)
  })

  test('SBAT set the wallet address to a different wallet address', async () => {
    const account = accounts[0]
    const wallet = accounts[1]
    await accountsInstance.createAccount().sendAndWaitForReceipt({ from: account })
    const signature = await accountsInstance.generateProofOfKeyPossession(account, wallet)
    await accountsInstance
      .setWalletAddress(wallet, signature)
      .sendAndWaitForReceipt({ from: account })

    const walletAddress = await accountsInstance.getWalletAddress(account)
    expect(walletAddress).toEqual(wallet)
  })

  test('SNBAT to set to a different wallet address without a signature', async () => {
    const account = accounts[0]
    const wallet = accounts[1]
    await accountsInstance.createAccount().sendAndWaitForReceipt({ from: account })
    await expect(accountsInstance.setWalletAddress(wallet)).rejects
  })

  test('SNBAT fraction greater than 1', async () => {
    const account = accounts[0]
    const beneficiary = accounts[1]
    const fractionInvalid = valueToFixidityString(valueToBigNumber('2.5'))

    kit.defaultAccount = account

    await accountsInstance.createAccount().sendAndWaitForReceipt({ from: account })
    await expect(
      accountsInstance.setPaymentDelegation(beneficiary, fractionInvalid).sendAndWaitForReceipt({})
    ).rejects.toEqual(
      new Error('Error: execution reverted: revert: Fraction must not be greater than 1')
    )
  })

  test('SNBAT beneficiary and fraction', async () => {
    const account = accounts[0]
    const beneficiary = accounts[1]
    const fractionValid = valueToFixidityString(valueToBigNumber('.25'))
    const expectedRetval = { 0: beneficiary, 1: fractionValid }

    kit.defaultAccount = account

    await accountsInstance.createAccount().sendAndWaitForReceipt({ from: account })
    await accountsInstance.setPaymentDelegation(beneficiary, fractionValid).sendAndWaitForReceipt()

    const retval = await accountsInstance.getPaymentDelegation(account)
    expect(retval).toEqual(expectedRetval)
  })

  test('SNBAT delete expected to clear beneficiary and fraction', async () => {
    const account = accounts[0]
    const beneficiary = accounts[1]
    const fractionValid = valueToFixidityString(valueToBigNumber('.25'))
    const expectedRetval = { 0: '0x0000000000000000000000000000000000000000', 1: '0' }

    kit.defaultAccount = account

    await accountsInstance.createAccount().sendAndWaitForReceipt({ from: account })
    await accountsInstance.setPaymentDelegation(beneficiary, fractionValid).sendAndWaitForReceipt()

    await accountsInstance.deletePaymentDelegation().sendAndWaitForReceipt()

    const retval = await accountsInstance.getPaymentDelegation(account)
    expect(retval).toEqual(expectedRetval)
  })
})
