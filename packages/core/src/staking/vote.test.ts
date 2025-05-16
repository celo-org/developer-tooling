import { beforeEach, describe, expect, it, Mock, vi } from 'vitest'
import { vote, VoteAdapter } from './vote'

describe('Stake.vote', () => {
  const address1 = '0x1111111111111111111111111111111111111111' as const
  const address2 = '0x2222222222222222222222222222222222222222' as const
  const groupAddress = '0x3333333333333333333333333333333333333333' as const
  const NULL_ADDRESS = '0x0000000000000000000000000000000000000000' as const

  let adapter: VoteAdapter

  beforeEach(() => {
    adapter = {
      vote: vi.fn().mockResolvedValue('0x1234' as const),
      getTotalVotesForEligibleValidatorGroups: vi.fn(),
    }
  })

  it('calls adapter.vote with correct lesser and greater when voting for new group', async () => {
    // No current votes for the group
    ;(adapter.getTotalVotesForEligibleValidatorGroups as Mock).mockResolvedValue([
      [address1, address2],
      [100n, 50n],
    ])
    const result = await vote(adapter, groupAddress, 10n)
    expect(adapter.vote).toHaveBeenCalledWith(groupAddress, 10n, NULL_ADDRESS, address2)
    expect(result).toBe('0x1234')
  })

  it('calls adapter.vote with correct lesser and greater when increasing votes for existing group', async () => {
    ;(adapter.getTotalVotesForEligibleValidatorGroups as Mock).mockResolvedValue([
      [address1, address2, groupAddress],
      [100n, 50n, 20n],
    ])
    // address3 currently has 20, will have 30 after voting 10
    const result = await vote(adapter, groupAddress, 10n)
    // After voting, groupAddress will have 30. Lesser should be NULL_ADDRESS, greater should be address2 (50)
    expect(adapter.vote).toHaveBeenCalledWith(groupAddress, 10n, NULL_ADDRESS, address2)
    expect(result).toBe('0x1234')
  })

  it('places group at the end if it has the lowest votes after voting', async () => {
    ;(adapter.getTotalVotesForEligibleValidatorGroups as Mock).mockResolvedValue([
      [address1, address2],
      [100n, 10n],
    ])
    // Voting for address3 with 5n, which is less than all others
    const result = await vote(adapter, groupAddress, 5n)
    expect(adapter.vote).toHaveBeenCalledWith(groupAddress, 5n, NULL_ADDRESS, address2)
    expect(result).toBe('0x1234')
  })

  it('places group at the top if it has the highest votes after voting', async () => {
    ;(adapter.getTotalVotesForEligibleValidatorGroups as Mock).mockResolvedValue([
      [address1, address2],
      [100n, 10n],
    ])
    // Voting for address3 with 200n, which is more than all others
    const result = await vote(adapter, groupAddress, 200n)
    expect(adapter.vote).toHaveBeenCalledWith(groupAddress, 200n, address1, NULL_ADDRESS)
    expect(result).toBe('0x1234')
  })

  it('handles empty currentVotes', async () => {
    ;(adapter.getTotalVotesForEligibleValidatorGroups as Mock).mockResolvedValue([[], []])
    const result = await vote(adapter, address1, 42n)
    expect(adapter.vote).toHaveBeenCalledWith(address1, 42n, NULL_ADDRESS, NULL_ADDRESS)
    expect(result).toBe('0x1234')
  })
})
