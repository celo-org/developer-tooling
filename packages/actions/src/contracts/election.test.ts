import type { Address } from 'viem'
import { describe, expect, it, vi } from 'vitest'
import { getGroupsWithPendingVotes } from './election.js'

// resolveAddress hits the on-chain registry; stub it so the unit test only
// exercises the pending-votes filtering logic.
vi.mock('./registry.js', () => ({
  resolveAddress: vi.fn(async () => '0x0000000000000000000000000000000000000001'),
}))

const ACCOUNT = '0x00000000000000000000000000000000000000aa' as Address
const GROUP_A = '0x000000000000000000000000000000000000000a' as Address
const GROUP_B = '0x000000000000000000000000000000000000000b' as Address
const GROUP_C = '0x000000000000000000000000000000000000000c' as Address

function clients(groups: Address[], pendingVotes: bigint[]) {
  return {
    public: {
      readContract: vi.fn(async () => groups),
      multicall: vi.fn(async () => pendingVotes),
    },
  } as any
}

describe('getGroupsWithPendingVotes', () => {
  it('returns only groups whose pending votes are strictly greater than zero', async () => {
    // Regression: the filter used `>= 0`, which kept every group (including
    // those with 0 pending votes). It must be `> 0`.
    const result = await getGroupsWithPendingVotes(
      clients([GROUP_A, GROUP_B, GROUP_C], [BigInt(0), BigInt(5), BigInt(0)]),
      ACCOUNT
    )
    expect(result).toEqual([GROUP_B])
  })

  it('returns an empty array when every group has zero pending votes', async () => {
    const result = await getGroupsWithPendingVotes(
      clients([GROUP_A, GROUP_B], [BigInt(0), BigInt(0)]),
      ACCOUNT
    )
    expect(result).toEqual([])
  })
})
