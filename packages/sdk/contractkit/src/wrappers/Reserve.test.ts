import { multiSigABI, reserveABI } from '@celo/abis'
import { StrongAddress } from '@celo/base'
import { createViemTxObject } from '@celo/connect'
import {
  asCoreContractsOwner,
  DEFAULT_OWNER_ADDRESS,
  setBalance,
  testWithAnvilL2,
  withImpersonatedAccount,
} from '@celo/dev-utils/anvil-test'
import BigNumber from 'bignumber.js'
import { CeloContract } from '../base'
import { newKitFromProvider } from '../kit'
import { MultiSigWrapper } from './MultiSig'
import { ReserveWrapper } from './Reserve'

testWithAnvilL2('Reserve Wrapper', (provider) => {
  const kit = newKitFromProvider(provider)
  let accounts: StrongAddress[] = []
  let reserve: ReserveWrapper
  let reserveSpenderMultiSig: MultiSigWrapper
  let otherReserveAddress: StrongAddress
  let otherSpender: StrongAddress

  beforeEach(async () => {
    accounts = await kit.connection.getAccounts()
    kit.defaultAccount = accounts[0]
    otherReserveAddress = accounts[9]
    otherSpender = accounts[7]
    reserve = await kit.contracts.getReserve()
    const multiSigAddress = await kit.registry.addressFor('ReserveSpenderMultiSig' as CeloContract)
    reserveSpenderMultiSig = await kit.contracts.getMultiSig(multiSigAddress)
    const reserveContract = kit.connection.getCeloContract(reserveABI as any, reserve.address)
    const reserveSpenderMultiSigContract = kit.connection.getCeloContract(
      multiSigABI as any,
      reserveSpenderMultiSig.address
    )

    await withImpersonatedAccount(
      provider,
      multiSigAddress,
      async () => {
        await reserveSpenderMultiSig
          .replaceOwner(DEFAULT_OWNER_ADDRESS, accounts[0])
          .sendAndWaitForReceipt({ from: multiSigAddress })
        await createViemTxObject(kit.connection, reserveSpenderMultiSigContract, 'addOwner', [
          otherSpender,
        ]).send({ from: multiSigAddress })
        await createViemTxObject(
          kit.connection,
          reserveSpenderMultiSigContract,
          'changeRequirement',
          [2]
        ).send({ from: multiSigAddress })
      },
      new BigNumber('1e18')
    )

    await asCoreContractsOwner(provider, async (ownerAdress: StrongAddress) => {
      await createViemTxObject(kit.connection, reserveContract, 'addSpender', [otherSpender]).send({
        from: ownerAdress,
      })
      await createViemTxObject(kit.connection, reserveContract, 'addOtherReserveAddress', [
        otherReserveAddress,
      ]).send({ from: ownerAdress })
    })

    await setBalance(provider, reserve.address, new BigNumber('1e18'))
  })

  test('can get asset target weights which sum to 100%', async () => {
    const targets = await reserve.getAssetAllocationWeights()
    expect(
      targets.reduce(
        (total: BigNumber, current: BigNumber) => total.plus(current),
        new BigNumber(0)
      )
    ).toEqual(new BigNumber(100 * 10_000_000_000_000_000_000_000))
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
