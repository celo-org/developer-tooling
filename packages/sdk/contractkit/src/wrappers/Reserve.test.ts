import { multiSigABI, reserveABI } from '@celo/abis'
import { StrongAddress } from '@celo/base'
import {
  asCoreContractsOwner,
  DEFAULT_OWNER_ADDRESS,
  setBalance,
  testWithAnvilL2,
  withImpersonatedAccount,
} from '@celo/dev-utils/anvil-test'
import { encodeFunctionData } from 'viem'
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
        await kit.connection.sendTransaction({
          to: reserveSpenderMultiSigContract.address,
          data: encodeFunctionData({
            abi: reserveSpenderMultiSigContract.abi as any,
            functionName: 'addOwner',
            args: [otherSpender],
          }),
          from: multiSigAddress,
        })
        await kit.connection.sendTransaction({
          to: reserveSpenderMultiSigContract.address,
          data: encodeFunctionData({
            abi: reserveSpenderMultiSigContract.abi as any,
            functionName: 'changeRequirement',
            args: [2],
          }),
          from: multiSigAddress,
        })
      },
      new BigNumber('1e18')
    )

    await asCoreContractsOwner(provider, async (ownerAdress: StrongAddress) => {
      await kit.connection.sendTransaction({
        to: reserveContract.address,
        data: encodeFunctionData({
          abi: reserveContract.abi as any,
          functionName: 'addSpender',
          args: [otherSpender],
        }),
        from: ownerAdress,
      })
      await kit.connection.sendTransaction({
        to: reserveContract.address,
        data: encodeFunctionData({
          abi: reserveContract.abi as any,
          functionName: 'addOtherReserveAddress',
          args: [otherReserveAddress],
        }),
        from: ownerAdress,
      })
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
    const { parseEventLogs } = await import('viem')

    const transferData = encodeFunctionData({
      abi: reserveABI,
      functionName: 'transferGold',
      args: [otherReserveAddress, BigInt(10)],
    })
    const txHash = await reserveSpenderMultiSig.submitOrConfirmTransaction(
      reserve.address,
      transferData
    )
    const receipt = await kit.connection.getTransactionReceipt(txHash)
    const logs = parseEventLogs({ abi: multiSigABI as any, logs: receipt!.logs as any })
    const eventNames = logs.map((l: any) => l.eventName)
    // First signer: Submission + Confirmation but NOT Execution (2-of-2 required)
    expect(eventNames).toContain('Submission')
    expect(eventNames).toContain('Confirmation')
    expect(eventNames).not.toContain('Execution')

    const transferData2 = encodeFunctionData({
      abi: reserveABI,
      functionName: 'transferGold',
      args: [otherReserveAddress, BigInt(10)],
    })
    const txHash2 = await reserveSpenderMultiSig.submitOrConfirmTransaction(
      reserve.address,
      transferData2,
      '0',
      { from: otherSpender }
    )
    const receipt2 = await kit.connection.getTransactionReceipt(txHash2)
    const logs2 = parseEventLogs({ abi: multiSigABI as any, logs: receipt2!.logs as any })
    const eventNames2 = logs2.map((l: any) => l.eventName)
    // Second signer: Confirmation + Execution but NOT Submission
    expect(eventNames2).not.toContain('Submission')
    expect(eventNames2).toContain('Confirmation')
    expect(eventNames2).toContain('Execution')
  })

  test('test does not transfer gold if not spender', async () => {
    const transferData = encodeFunctionData({
      abi: reserveABI,
      functionName: 'transferGold',
      args: [otherReserveAddress, BigInt(10)],
    })
    await expect(
      reserveSpenderMultiSig.submitOrConfirmTransaction(reserve.address, transferData, '0', {
        from: accounts[2],
      })
    ).rejects.toThrowError()
  })
})
