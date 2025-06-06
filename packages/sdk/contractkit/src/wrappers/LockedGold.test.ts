import { StrongAddress } from '@celo/base'
import { testWithAnvilL2 } from '@celo/dev-utils/anvil-test'
import BigNumber from 'bignumber.js'
import { newKitFromWeb3 } from '../kit'
import { startAndFinishEpochProcess } from '../test-utils/utils'
import { AccountsWrapper } from './Accounts'
import { LockedGoldWrapper } from './LockedGold'

testWithAnvilL2('LockedGold Wrapper', (web3) => {
  const kit = newKitFromWeb3(web3)
  let accounts: AccountsWrapper
  let lockedGold: LockedGoldWrapper

  // Arbitrary value.
  const value = 120938732980
  let account: StrongAddress
  beforeAll(async () => {
    account = (await web3.eth.getAccounts())[0] as StrongAddress
    kit.defaultAccount = account
    lockedGold = await kit.contracts.getLockedGold()
    accounts = await kit.contracts.getAccounts()
    if (!(await accounts.isAccount(account))) {
      await accounts.createAccount().sendAndWaitForReceipt({ from: account })
    }
  })

  it('locks gold', async () => {
    await lockedGold.lock().sendAndWaitForReceipt({ value })
  })

  it('unlocks gold', async () => {
    await lockedGold.lock().sendAndWaitForReceipt({ value })
    await lockedGold.unlock(value).sendAndWaitForReceipt()
  })

  it('relocks gold', async () => {
    // Make 5 pending withdrawals.
    await lockedGold.lock().sendAndWaitForReceipt({ value: value * 5 })
    await lockedGold.unlock(value).sendAndWaitForReceipt()
    await lockedGold.unlock(value).sendAndWaitForReceipt()
    await lockedGold.unlock(value).sendAndWaitForReceipt()
    await lockedGold.unlock(value).sendAndWaitForReceipt()
    await lockedGold.unlock(value).sendAndWaitForReceipt()

    // Re-lock 2.5 of them
    const txos = await lockedGold.relock(account, value * 2.5)
    for (const txo of txos) {
      await txo.sendAndWaitForReceipt()
    }
  })

  test('should return the count of pending withdrawals', async () => {
    await lockedGold.lock().sendAndWaitForReceipt({ value: value * 2 })
    await lockedGold.unlock(value).sendAndWaitForReceipt()
    await lockedGold.unlock(value).sendAndWaitForReceipt()

    const count = await lockedGold.getTotalPendingWithdrawalsCount(account)
    expect(count).toEqBigNumber(2)
  })

  test('should return zero when there are no pending withdrawals', async () => {
    const count = await lockedGold.getTotalPendingWithdrawalsCount(account)
    expect(count).toEqBigNumber(0)
  })

  test('should return the pending withdrawal at a given index', async () => {
    await lockedGold.lock().sendAndWaitForReceipt({ value: value * 2 })
    await lockedGold.unlock(value).sendAndWaitForReceipt()
    const pendingWithdrawal = await lockedGold.getPendingWithdrawal(account, 0)

    expect(pendingWithdrawal.value).toEqBigNumber(value)
  })

  test('should throw an error for an invalid index', async () => {
    await expect(lockedGold.getPendingWithdrawal(account, 999)).rejects.toThrow(
      'Bad pending withdrawal index'
    )
  })

  test('get accounts slashed', async () => {
    const epoch = await (await kit.contracts.getEpochManager()).getCurrentEpochNumber()
    jest.spyOn(lockedGold, 'getPastEvents').mockResolvedValueOnce([
      // @ts-expect-error
      {
        returnValues: {
          slashed: '0x123',
          penalty: new BigNumber(3),
          reward: new BigNumber(2),
          reporter: '0x456',
        },
      },
      // @ts-expect-error
      {
        returnValues: {
          slashed: '0x789',
          penalty: new BigNumber(5),
          reward: new BigNumber(7),
          reporter: '0x007',
        },
      },
    ])
    await startAndFinishEpochProcess(kit)
    await expect(lockedGold.getAccountsSlashed(epoch)).resolves.toMatchInlineSnapshot(`
      [
        {
          "epochNumber": 4,
          "penalty": "3",
          "reporter": "0x456",
          "reward": "2",
          "slashed": "0x123",
        },
        {
          "epochNumber": 4,
          "penalty": "5",
          "reporter": "0x007",
          "reward": "7",
          "slashed": "0x789",
        },
      ]
    `)
  })
})
