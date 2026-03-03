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
      const hash = await accounts.createAccount({ from: account })
      await kit.connection.viemClient.waitForTransactionReceipt({ hash: hash })
    }
  })

  it('locks gold', async () => {
    const hash = await lockedGold.lock({ value })
    await kit.connection.viemClient.waitForTransactionReceipt({ hash: hash })
  })

  it('unlocks gold', async () => {
    const lockHash = await lockedGold.lock({ value })
    await kit.connection.viemClient.waitForTransactionReceipt({ hash: lockHash })
    const unlockHash = await lockedGold.unlock(value)
    await kit.connection.viemClient.waitForTransactionReceipt({ hash: unlockHash })
  })

  it('relocks gold', async () => {
    // Make 5 pending withdrawals.
    const lockHash = await lockedGold.lock({ value: value * 5 })
    await kit.connection.viemClient.waitForTransactionReceipt({ hash: lockHash })
    for (let i = 0; i < 5; i++) {
      const unlockHash = await lockedGold.unlock(value)
      await kit.connection.viemClient.waitForTransactionReceipt({ hash: unlockHash })
    }

    // Re-lock 2.5 of them
    const relockHashes = await lockedGold.relock(account, value * 2.5)
    for (const hash of relockHashes) {
      await kit.connection.viemClient.waitForTransactionReceipt({ hash: hash })
    }
  })

  test('should return the count of pending withdrawals', async () => {
    const lockHash = await lockedGold.lock({ value: value * 2 })
    await kit.connection.viemClient.waitForTransactionReceipt({ hash: lockHash })
    const unlock1 = await lockedGold.unlock(value)
    await kit.connection.viemClient.waitForTransactionReceipt({ hash: unlock1 })
    const unlock2 = await lockedGold.unlock(value)
    await kit.connection.viemClient.waitForTransactionReceipt({ hash: unlock2 })

    const count = await lockedGold.getTotalPendingWithdrawalsCount(account)
    expect(count).toEqBigNumber(2)
  })

  test('should return zero when there are no pending withdrawals', async () => {
    const count = await lockedGold.getTotalPendingWithdrawalsCount(account)
    expect(count).toEqBigNumber(0)
  })

  test('should return the pending withdrawal at a given index', async () => {
    const lockHash = await lockedGold.lock({ value: value * 2 })
    await kit.connection.viemClient.waitForTransactionReceipt({ hash: lockHash })
    const unlockHash = await lockedGold.unlock(value)
    await kit.connection.viemClient.waitForTransactionReceipt({ hash: unlockHash })
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
