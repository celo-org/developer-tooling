import { newReserve } from '@celo/abis/web3/mento/Reserve'
import { newMultiSig } from '@celo/abis/web3/MultiSig'
import { StrongAddress } from '@celo/base'
import {
  asCoreContractsOwner,
  DEFAULT_OWNER_ADDRESS,
  setBalance,
  testWithAnvilL1,
  withImpersonatedAccount,
} from '@celo/dev-utils/lib/anvil-test'
import BigNumber from 'bignumber.js'
import { CeloContract } from '../base'
import { newKitFromWeb3 } from '../kit'
import { MultiSigWrapper } from './MultiSig'
import { ReserveWrapper } from './Reserve'

testWithAnvilL1('Reserve Wrapper', (web3) => {
  const kit = newKitFromWeb3(web3)
  let accounts: StrongAddress[] = []
  let reserve: ReserveWrapper
  let reserveSpenderMultiSig: MultiSigWrapper
  let otherReserveAddress: StrongAddress
  let otherSpender: StrongAddress

  beforeEach(async () => {
    accounts = (await web3.eth.getAccounts()) as StrongAddress[]
    kit.defaultAccount = accounts[0]
    otherReserveAddress = accounts[9]
    otherSpender = accounts[7]
    reserve = await kit.contracts.getReserve()
    const multiSigAddress = await kit.registry.addressFor('ReserveSpenderMultiSig' as CeloContract)
    reserveSpenderMultiSig = await kit.contracts.getMultiSig(multiSigAddress)
    const reserveContract = newReserve(web3, reserve.address)
    const reserveSpenderMultiSigContract = newMultiSig(web3, reserveSpenderMultiSig.address)

    await withImpersonatedAccount(
      web3,
      multiSigAddress,
      async () => {
        await reserveSpenderMultiSig
          .replaceOwner(DEFAULT_OWNER_ADDRESS, accounts[0])
          .sendAndWaitForReceipt({ from: multiSigAddress })
        await reserveSpenderMultiSigContract.methods
          .addOwner(otherSpender)
          .send({ from: multiSigAddress })
        await reserveSpenderMultiSigContract.methods
          .changeRequirement(2)
          .send({ from: multiSigAddress })
      },
      new BigNumber(web3.utils.toWei('1', 'ether'))
    )

    await asCoreContractsOwner(web3, async (ownerAdress: StrongAddress) => {
      await reserveContract.methods.addSpender(otherSpender).send({ from: ownerAdress })
      await reserveContract.methods
        .addOtherReserveAddress(otherReserveAddress)
        .send({ from: ownerAdress })
    })

    await setBalance(web3, reserve.address, new BigNumber(web3.utils.toWei('1', 'ether')))
  })

  test('can get asset target weights which sum to 100%', async () => {
    const targets = await reserve.getAssetAllocationWeights()
    expect(targets.reduce((total, current) => total.plus(current), new BigNumber(0))).toEqual(
      new BigNumber(100 * 10_000_000_000_000_000_000_000)
    )
  })

  test('can get asset target symbols ', async () => {
    const targets = await reserve.getAssetAllocationSymbols()

    const expectation = ['cGLD', 'BTC', 'ETH', 'DAI']

    targets.forEach((sym, i) => {
      expect(sym).toEqual(expect.stringMatching(expectation[i]))
    })
  })

  test('can get reserve unfrozen balance ', async () => {
    const balance = await reserve.getUnfrozenBalance()
    expect(balance).toBeBigNumber()
  })

  test('can get sum of reserve unfrozen balance + other reserve address balances', async () => {
    const balanceWithOtherAddresses = await reserve.getUnfrozenReserveCeloBalance()
    expect(balanceWithOtherAddresses).toBeBigNumber()
  })

  test('test is spender', async () => {
    const tx = await reserve.isSpender(reserveSpenderMultiSig.address)
    expect(tx).toBeTruthy()
  })

  test('two spenders required to confirm transfers gold', async () => {
    const tx = await reserve.transferGold(otherReserveAddress, 10)
    const multisigTx = await reserveSpenderMultiSig.submitOrConfirmTransaction(
      reserve.address,
      tx.txo
    )
    const events = await (await multisigTx.sendAndWaitForReceipt()).events
    expect(events && events.Submission && events.Confirmation && !events.Execution).toBeTruthy()

    const tx2 = await reserve.transferGold(otherReserveAddress, 10)
    const multisigTx2 = await reserveSpenderMultiSig.submitOrConfirmTransaction(
      reserve.address,
      tx2.txo
    )
    const events2 = await (await multisigTx2.sendAndWaitForReceipt({ from: otherSpender })).events
    expect(events2 && !events2.Submission && events2.Confirmation && events2.Execution).toBeTruthy()
  })

  test('test does not transfer gold if not spender', async () => {
    const tx = await reserve.transferGold(otherReserveAddress, 10)
    const multisigTx = await reserveSpenderMultiSig.submitOrConfirmTransaction(
      reserve.address,
      tx.txo
    )
    await expect(multisigTx.sendAndWaitForReceipt({ from: accounts[2] })).rejects.toThrowError()
  })
})
