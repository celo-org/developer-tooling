import { attestationsABI, registryABI } from '@celo/abis'
import { StableToken, StrongAddress } from '@celo/base'
import { asCoreContractsOwner, setBalance, testWithAnvilL2 } from '@celo/dev-utils/anvil-test'
import { deployAttestationsContract } from '@celo/dev-utils/contracts'
import { privateKeyToAddress } from '@celo/utils/lib/address'
import { soliditySha3 } from '@celo/utils/lib/solidity' // uses viem internally; needed for getParsedSignatureOfAddress callback
import BigNumber from 'bignumber.js'
import { randomBytes } from 'crypto'
import { encodeFunctionData, encodePacked, keccak256, pad, parseEther } from 'viem'
import { REGISTRY_CONTRACT_ADDRESS } from '../address-registry'
import { newKitFromProvider } from '../kit'
import { topUpWithToken } from '../test-utils/utils'
import { getParsedSignatureOfAddress } from '../utils/getParsedSignatureOfAddress'
import { EscrowWrapper } from './Escrow'
import { FederatedAttestationsWrapper } from './FederatedAttestations'
import { StableTokenWrapper } from './StableTokenWrapper'

jest.setTimeout(30_000)
testWithAnvilL2('Escrow Wrapper', (provider) => {
  const kit = newKitFromProvider(provider)
  const TEN_USDM = parseEther('10').toString()
  const TIMESTAMP = 1665080820

  const getParsedSignatureOfAddressForTest = (address: string, signer: string) => {
    return getParsedSignatureOfAddress(soliditySha3, kit.connection.sign, address, signer)
  }

  let accounts: StrongAddress[] = []
  let escrow: EscrowWrapper
  let federatedAttestations: FederatedAttestationsWrapper
  let stableTokenContract: StableTokenWrapper
  let identifier: string

  beforeEach(async () => {
    accounts = await kit.connection.getAccounts()
    escrow = await kit.contracts.getEscrow()

    await asCoreContractsOwner(
      provider,
      async (ownerAdress: StrongAddress) => {
        const registryContract = kit.connection.getCeloContract(
          registryABI as any,
          REGISTRY_CONTRACT_ADDRESS
        )
        const attestationsContractAddress = await deployAttestationsContract(provider, ownerAdress)

        const attestationsContract = kit.connection.getCeloContract(
          attestationsABI as any,
          attestationsContractAddress
        )

        // otherwise reverts with "minAttestations larger than limit"
        await kit.connection.sendTransaction({
          to: attestationsContract.address,
          data: encodeFunctionData({
            abi: attestationsContract.abi as any,
            functionName: 'setMaxAttestations',
            args: [1],
          }),
          from: ownerAdress,
        })

        await kit.connection.sendTransaction({
          to: registryContract.address,
          data: encodeFunctionData({
            abi: registryContract.abi as any,
            functionName: 'setAddressFor',
            args: ['Attestations', attestationsContractAddress],
          }),
          from: ownerAdress,
        })
      },
      parseEther('1')
    )

    await topUpWithToken(kit, StableToken.USDm, escrow.address, new BigNumber(TEN_USDM))
    await topUpWithToken(kit, StableToken.USDm, accounts[0], new BigNumber(TEN_USDM))
    await topUpWithToken(kit, StableToken.USDm, accounts[1], new BigNumber(TEN_USDM))
    await topUpWithToken(kit, StableToken.USDm, accounts[2], new BigNumber(TEN_USDM))
    await setBalance(provider, accounts[0], new BigNumber(TEN_USDM))

    stableTokenContract = await kit.contracts.getStableToken()
    federatedAttestations = await kit.contracts.getFederatedAttestations()

    kit.defaultAccount = accounts[0]

    const randomKey1 = '0x' + randomBytes(32).toString('hex')
    identifier = keccak256(
      encodePacked(
        ['bytes32'],
        [pad(privateKeyToAddress(randomKey1) as `0x${string}`, { size: 32 })]
      )
    ) as string
  })

  it('transfer with trusted issuers should set TrustedIssuersPerPayment', async () => {
    const randomKey2 = '0x' + randomBytes(32).toString('hex')
    const testPaymentId = privateKeyToAddress(randomKey2)
    const registerHash = await federatedAttestations.registerAttestationAsIssuer(
      identifier,
      kit.defaultAccount as string,
      TIMESTAMP
    )
    await kit.connection.viemClient.waitForTransactionReceipt({ hash: registerHash })

    const approveHash = await stableTokenContract.approve(escrow.address, TEN_USDM)
    await kit.connection.viemClient.waitForTransactionReceipt({ hash: approveHash })

    const transferHash = await escrow.transferWithTrustedIssuers(
      identifier,
      stableTokenContract.address,
      TEN_USDM,
      1000,
      testPaymentId,
      1,
      accounts
    )
    await kit.connection.viemClient.waitForTransactionReceipt({ hash: transferHash })

    const trustedIssuersPerPayment = await escrow.getTrustedIssuersPerPayment(testPaymentId)

    expect(trustedIssuersPerPayment[0]).toEqual(kit.defaultAccount)
  })
  it('withdraw should be successful after transferWithTrustedIssuers', async () => {
    const sender: string = accounts[1]
    const receiver: string = accounts[2]
    const withdrawKeyAddress: string = accounts[3]
    const oneDayInSecs: number = 86400
    const parsedSig = await getParsedSignatureOfAddressForTest(receiver, withdrawKeyAddress)

    const registerHash = await federatedAttestations.registerAttestationAsIssuer(
      identifier,
      receiver,
      TIMESTAMP
    )
    await kit.connection.viemClient.waitForTransactionReceipt({ hash: registerHash })

    const senderBalanceBefore = await stableTokenContract.balanceOf(sender)
    const receiverBalanceBefore = await stableTokenContract.balanceOf(receiver)

    const approveHash = await stableTokenContract.approve(escrow.address, TEN_USDM, {
      from: sender,
    })
    await kit.connection.viemClient.waitForTransactionReceipt({ hash: approveHash })

    const transferHash = await escrow.transferWithTrustedIssuers(
      identifier,
      stableTokenContract.address,
      TEN_USDM,
      oneDayInSecs,
      withdrawKeyAddress,
      1,
      accounts,
      { from: sender }
    )
    await kit.connection.viemClient.waitForTransactionReceipt({ hash: transferHash })

    const withdrawHash = await escrow.withdraw(
      withdrawKeyAddress,
      parsedSig.v,
      parsedSig.r,
      parsedSig.s,
      {
        from: receiver,
      }
    )
    await kit.connection.viemClient.waitForTransactionReceipt({ hash: withdrawHash })

    const senderBalanceAfter = await stableTokenContract.balanceOf(sender)
    const receiverBalanceAfter = await stableTokenContract.balanceOf(receiver)

    expect(senderBalanceBefore.minus(+TEN_USDM)).toEqual(senderBalanceAfter)
    expect(receiverBalanceBefore.plus(+TEN_USDM)).toEqual(receiverBalanceAfter)
  })
  it('withdraw should revert if attestation is not registered', async () => {
    const sender: string = accounts[1]
    const receiver: string = accounts[2]
    const withdrawKeyAddress: string = accounts[3]
    const oneDayInSecs: number = 86400
    const parsedSig = await getParsedSignatureOfAddressForTest(receiver, withdrawKeyAddress)

    const approveHash = await stableTokenContract.approve(escrow.address, TEN_USDM, {
      from: sender,
    })
    await kit.connection.viemClient.waitForTransactionReceipt({ hash: approveHash })

    const transferHash = await escrow.transferWithTrustedIssuers(
      identifier,
      stableTokenContract.address,
      TEN_USDM,
      oneDayInSecs,
      withdrawKeyAddress,
      1,
      accounts,
      { from: sender }
    )
    await kit.connection.viemClient.waitForTransactionReceipt({ hash: transferHash })

    await expect(
      escrow.withdraw(withdrawKeyAddress, parsedSig.v, parsedSig.r, parsedSig.s)
    ).rejects.toThrow()
  })
  it('withdraw should revert if attestation is registered by issuer not on the trusted issuers list', async () => {
    const sender: string = accounts[1]
    const receiver: string = accounts[2]
    const withdrawKeyAddress: string = accounts[3]
    const oneDayInSecs: number = 86400
    const parsedSig = await getParsedSignatureOfAddressForTest(receiver, withdrawKeyAddress)

    const registerHash = await federatedAttestations.registerAttestationAsIssuer(
      identifier,
      receiver,
      TIMESTAMP
    )
    await kit.connection.viemClient.waitForTransactionReceipt({ hash: registerHash })

    const approveHash = await stableTokenContract.approve(escrow.address, TEN_USDM, {
      from: sender,
    })
    await kit.connection.viemClient.waitForTransactionReceipt({ hash: approveHash })

    const transferHash = await escrow.transferWithTrustedIssuers(
      identifier,
      stableTokenContract.address,
      TEN_USDM,
      oneDayInSecs,
      withdrawKeyAddress,
      1,
      [accounts[5]],
      { from: sender }
    )
    await kit.connection.viemClient.waitForTransactionReceipt({ hash: transferHash })

    await expect(
      escrow.withdraw(withdrawKeyAddress, parsedSig.v, parsedSig.r, parsedSig.s)
    ).rejects.toThrow()
  })
})
