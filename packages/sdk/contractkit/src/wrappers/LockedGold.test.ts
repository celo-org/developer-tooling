import { StrongAddress } from '@celo/base'
import { testWithAnvilL2 } from '@celo/dev-utils/anvil-test'
import BigNumber from 'bignumber.js'
import { newKitFromProvider } from '../kit'
import { startAndFinishEpochProcess } from '../test-utils/utils'
import { AccountsWrapper } from './Accounts'
import { LockedGoldWrapper } from './LockedGold'

testWithAnvilL2('LockedGold Wrapper', (provider) => {
  const kit = newKitFromProvider(provider)
  let accounts: AccountsWrapper
  let lockedGold: LockedGoldWrapper

  // Arbitrary value.
  const value = 120938732980
  let account: StrongAddress
  beforeAll(async () => {
    account = (await kit.connection.getAccounts())[0]
    kit.defaultAccount = account
    lockedGold = await kit.contracts.getLockedGold()
    accounts = await kit.contracts.getAccounts()
    if (!(await accounts.isAccount(account))) {
      await accounts.createAccount({ from: account })
    }
  })

  it('locks gold', async () => {
    await lockedGold.lock({ value })
  })

  it('unlocks gold', async () => {
    await lockedGold.lock({ value })
    await lockedGold.unlock(value)
  })

  it('relocks gold', async () => {
    // Make 5 pending withdrawals.
    await lockedGold.lock({ value: value * 5 })
    await lockedGold.unlock(value)
    await lockedGold.unlock(value)
    await lockedGold.unlock(value)
    await lockedGold.unlock(value)
    await lockedGold.unlock(value)

    // Re-lock 2.5 of them
    await lockedGold.relock(account, value * 2.5)
  })

  test('should return the count of pending withdrawals', async () => {
    await lockedGold.lock({ value: value * 2 })
    await lockedGold.unlock(value)
    await lockedGold.unlock(value)

    const count = await lockedGold.getTotalPendingWithdrawalsCount(account)
    expect(count).toEqBigNumber(2)
  })

  test('should return zero when there are no pending withdrawals', async () => {
    const count = await lockedGold.getTotalPendingWithdrawalsCount(account)
    expect(count).toEqBigNumber(0)
  })

  test('should return the pending withdrawal at a given index', async () => {
    await lockedGold.lock({ value: value * 2 })
    await lockedGold.unlock(value)
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
