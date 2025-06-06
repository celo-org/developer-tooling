import { newAttestations } from '@celo/abis/web3/Attestations'
import { newRegistry } from '@celo/abis/web3/Registry'
import { StableToken, StrongAddress } from '@celo/base'
import { asCoreContractsOwner, setBalance, testWithAnvilL2 } from '@celo/dev-utils/anvil-test'
import { deployAttestationsContract } from '@celo/dev-utils/contracts'
import BigNumber from 'bignumber.js'
import Web3 from 'web3'
import { REGISTRY_CONTRACT_ADDRESS } from '../address-registry'
import { newKitFromWeb3 } from '../kit'
import { topUpWithToken } from '../test-utils/utils'
import { getParsedSignatureOfAddress } from '../utils/getParsedSignatureOfAddress'
import { EscrowWrapper } from './Escrow'
import { FederatedAttestationsWrapper } from './FederatedAttestations'
import { StableTokenWrapper } from './StableTokenWrapper'

testWithAnvilL2('Escrow Wrapper', (web3: Web3) => {
  const kit = newKitFromWeb3(web3)
  const TEN_CUSD = kit.web3.utils.toWei('10', 'ether')
  const TIMESTAMP = 1665080820

  const getParsedSignatureOfAddressForTest = (address: string, signer: string) => {
    return getParsedSignatureOfAddress(
      web3.utils.soliditySha3,
      kit.connection.sign,
      address,
      signer
    )
  }

  let accounts: StrongAddress[] = []
  let escrow: EscrowWrapper
  let federatedAttestations: FederatedAttestationsWrapper
  let stableTokenContract: StableTokenWrapper
  let identifier: string

  beforeEach(async () => {
    accounts = (await web3.eth.getAccounts()) as StrongAddress[]
    escrow = await kit.contracts.getEscrow()

    await asCoreContractsOwner(
      web3,
      async (ownerAdress: StrongAddress) => {
        const registryContract = newRegistry(web3, REGISTRY_CONTRACT_ADDRESS)
        const attestationsContractAddress = await deployAttestationsContract(web3, ownerAdress)

        const attestationsContract = newAttestations(web3, attestationsContractAddress)

        // otherwise reverts with "minAttestations larger than limit"
        await attestationsContract.methods.setMaxAttestations(1).send({ from: ownerAdress })

        await registryContract.methods
          .setAddressFor('Attestations', attestationsContractAddress)
          .send({
            from: ownerAdress,
          })
      },
      new BigNumber(web3.utils.toWei('1', 'ether'))
    )

    await topUpWithToken(kit, StableToken.cUSD, escrow.address, new BigNumber(TEN_CUSD))
    await topUpWithToken(kit, StableToken.cUSD, accounts[0], new BigNumber(TEN_CUSD))
    await topUpWithToken(kit, StableToken.cUSD, accounts[1], new BigNumber(TEN_CUSD))
    await topUpWithToken(kit, StableToken.cUSD, accounts[2], new BigNumber(TEN_CUSD))
    await setBalance(web3, accounts[0], new BigNumber(TEN_CUSD))

    stableTokenContract = await kit.contracts.getStableToken()
    federatedAttestations = await kit.contracts.getFederatedAttestations()

    kit.defaultAccount = accounts[0]

    identifier = kit.web3.utils.soliditySha3({
      t: 'bytes32',
      v: kit.web3.eth.accounts.create().address,
    }) as string
  })

  it('transfer with trusted issuers should set TrustedIssuersPerPayment', async () => {
    const testPaymentId = kit.web3.eth.accounts.create().address
    await federatedAttestations
      .registerAttestationAsIssuer(identifier, kit.defaultAccount as string, TIMESTAMP)
      .sendAndWaitForReceipt()

    await stableTokenContract.approve(escrow.address, TEN_CUSD).sendAndWaitForReceipt()

    await escrow
      .transferWithTrustedIssuers(
        identifier,
        stableTokenContract.address,
        TEN_CUSD,
        1000,
        testPaymentId,
        1,
        accounts
      )
      .sendAndWaitForReceipt()

    const trustedIssuersPerPayment = await escrow.getTrustedIssuersPerPayment(testPaymentId)

    expect(trustedIssuersPerPayment[0]).toEqual(kit.defaultAccount)
  })
  it('withdraw should be successful after transferWithTrustedIssuers', async () => {
    const sender: string = accounts[1]
    const receiver: string = accounts[2]
    const withdrawKeyAddress: string = accounts[3]
    const oneDayInSecs: number = 86400
    const parsedSig = await getParsedSignatureOfAddressForTest(receiver, withdrawKeyAddress)

    await federatedAttestations
      .registerAttestationAsIssuer(identifier, receiver, TIMESTAMP)
      .sendAndWaitForReceipt()

    const senderBalanceBefore = await stableTokenContract.balanceOf(sender)
    const receiverBalanceBefore = await stableTokenContract.balanceOf(receiver)

    await stableTokenContract
      .approve(escrow.address, TEN_CUSD)
      .sendAndWaitForReceipt({ from: sender })

    await escrow
      .transferWithTrustedIssuers(
        identifier,
        stableTokenContract.address,
        TEN_CUSD,
        oneDayInSecs,
        withdrawKeyAddress,
        1,
        accounts
      )
      .sendAndWaitForReceipt({ from: sender })

    await escrow
      .withdraw(withdrawKeyAddress, parsedSig.v, parsedSig.r, parsedSig.s)
      .sendAndWaitForReceipt({ from: receiver })

    const senderBalanceAfter = await stableTokenContract.balanceOf(sender)
    const receiverBalanceAfter = await stableTokenContract.balanceOf(receiver)

    expect(senderBalanceBefore.minus(+TEN_CUSD)).toEqual(senderBalanceAfter)
    expect(receiverBalanceBefore.plus(+TEN_CUSD)).toEqual(receiverBalanceAfter)
  })
  it('withdraw should revert if attestation is not registered', async () => {
    const sender: string = accounts[1]
    const receiver: string = accounts[2]
    const withdrawKeyAddress: string = accounts[3]
    const oneDayInSecs: number = 86400
    const parsedSig = await getParsedSignatureOfAddressForTest(receiver, withdrawKeyAddress)

    await stableTokenContract
      .approve(escrow.address, TEN_CUSD)
      .sendAndWaitForReceipt({ from: sender })

    await escrow
      .transferWithTrustedIssuers(
        identifier,
        stableTokenContract.address,
        TEN_CUSD,
        oneDayInSecs,
        withdrawKeyAddress,
        1,
        accounts
      )
      .sendAndWaitForReceipt({ from: sender })

    await expect(
      escrow
        .withdraw(withdrawKeyAddress, parsedSig.v, parsedSig.r, parsedSig.s)
        .sendAndWaitForReceipt()
    ).rejects.toThrow()
  })
  it('withdraw should revert if attestation is registered by issuer not on the trusted issuers list', async () => {
    const sender: string = accounts[1]
    const receiver: string = accounts[2]
    const withdrawKeyAddress: string = accounts[3]
    const oneDayInSecs: number = 86400
    const parsedSig = await getParsedSignatureOfAddressForTest(receiver, withdrawKeyAddress)

    await federatedAttestations
      .registerAttestationAsIssuer(identifier, receiver, TIMESTAMP)
      .sendAndWaitForReceipt()

    await stableTokenContract
      .approve(escrow.address, TEN_CUSD)
      .sendAndWaitForReceipt({ from: sender })

    await escrow
      .transferWithTrustedIssuers(
        identifier,
        stableTokenContract.address,
        TEN_CUSD,
        oneDayInSecs,
        withdrawKeyAddress,
        1,
        [accounts[5]]
      )
      .sendAndWaitForReceipt({ from: sender })

    await expect(
      escrow
        .withdraw(withdrawKeyAddress, parsedSig.v, parsedSig.r, parsedSig.s)
        .sendAndWaitForReceipt()
    ).rejects.toThrow()
  })
})
