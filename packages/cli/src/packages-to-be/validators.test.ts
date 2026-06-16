import {
  meetsValidatorBalanceRequirements,
  meetsValidatorGroupBalanceRequirements,
} from './validators'

// resolveAddress hits the on-chain registry; stub it so the unit test only
// exercises the requirement-comparison logic.
jest.mock('@celo/actions', () => ({
  resolveAddress: jest.fn(async (_client: unknown, name: string) =>
    name === 'LockedGold'
      ? '0x0000000000000000000000000000000000000001'
      : '0x0000000000000000000000000000000000000002'
  ),
}))

// requirement tuple is [value, duration]; the bug compared duration (index 1)
// against locked gold instead of value (index 0).
const VALUE = 10_000n * 10n ** 18n // 10k CELO required
const DURATION = 5_184_000n // ~60 days, in seconds — far smaller than VALUE

function clientWithLockedGold(lockedGold: bigint) {
  return {
    readContract: jest.fn(async ({ functionName }: { functionName: string }) => {
      if (functionName === 'getAccountTotalLockedGold') {
        return lockedGold
      }
      // getValidatorLockedGoldRequirements / getGroupLockedGoldRequirements
      return [VALUE, DURATION]
    }),
  } as any
}

describe('meetsValidatorBalanceRequirements', () => {
  const addr = '0x00000000000000000000000000000000000000aa' as const

  it('returns true only when locked gold meets the requirement VALUE (not the duration)', async () => {
    expect(await meetsValidatorBalanceRequirements(clientWithLockedGold(VALUE), addr)).toBe(true)
    expect(await meetsValidatorBalanceRequirements(clientWithLockedGold(VALUE - 1n), addr)).toBe(
      false
    )
  })

  it('regression: an amount above duration but below value must NOT pass', async () => {
    // With the old `[1]` (duration) comparison this returned true; it must be false.
    expect(await meetsValidatorBalanceRequirements(clientWithLockedGold(DURATION), addr)).toBe(
      false
    )
  })
})

describe('meetsValidatorGroupBalanceRequirements', () => {
  const addr = '0x00000000000000000000000000000000000000bb' as const

  it('compares against the requirement VALUE, not the duration', async () => {
    expect(await meetsValidatorGroupBalanceRequirements(clientWithLockedGold(VALUE), addr)).toBe(
      true
    )
    expect(await meetsValidatorGroupBalanceRequirements(clientWithLockedGold(DURATION), addr)).toBe(
      false
    )
  })
})
