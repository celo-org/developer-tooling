import { Adapter, vote } from './vote'

describe('Stake.vote', () => {
  const address1 = '0x1111111111111111111111111111111111111111' as const
  const address2 = '0x2222222222222222222222222222222222222222' as const
  const address3 = '0x3333333333333333333333333333333333333333' as const
  const NULL_ADDRESS = '0x0000000000000000000000000000000000000000' as const

  let adapter: Adapter

  beforeEach(() => {
    adapter = {
      vote: jest.fn().mockResolvedValue(true),
      getTotalVotesForEligibleValidatorGroups: jest.fn(),
    }
  })

  it('calls adapter.vote with correct lesser and greater when voting for new group', async () => {
    // No current votes for the group
    ;(adapter.getTotalVotesForEligibleValidatorGroups as jest.Mock).mockResolvedValue([
      [address1, address2],
      [100n, 50n],
    ])
    const result = await vote(adapter, address3, 10n)
    expect(adapter.vote).toHaveBeenCalledWith(address3, 10n, address2, NULL_ADDRESS)
    expect(result).toBe(true)
  })

  it('calls adapter.vote with correct lesser and greater when increasing votes for existing group', async () => {
    ;(adapter.getTotalVotesForEligibleValidatorGroups as jest.Mock).mockResolvedValue([
      [address1, address2, address3],
      [100n, 50n, 20n],
    ])
    // address3 currently has 20, will have 30 after voting 10
    const result = await vote(adapter, address3, 10n)
    // After voting, address3 will have 30, so lesser is address2 (50), greater is address1 (100)
    expect(adapter.vote).toHaveBeenCalledWith(address3, 10n, address2, address1)
    expect(result).toBe(true)
  })

  it('places group at the end if it has the lowest votes after voting', async () => {
    ;(adapter.getTotalVotesForEligibleValidatorGroups as jest.Mock).mockResolvedValue([
      [address1, address2],
      [100n, 10n],
    ])
    // Voting for address3 with 5n, which is less than all others
    const result = await vote(adapter, address3, 5n)
    expect(adapter.vote).toHaveBeenCalledWith(address3, 5n, NULL_ADDRESS, address2)
    expect(result).toBe(true)
  })

  it('places group at the top if it has the highest votes after voting', async () => {
    ;(adapter.getTotalVotesForEligibleValidatorGroups as jest.Mock).mockResolvedValue([
      [address1, address2],
      [100n, 10n],
    ])
    // Voting for address3 with 200n, which is more than all others
    const result = await vote(adapter, address3, 200n)
    expect(adapter.vote).toHaveBeenCalledWith(address3, 200n, address1, NULL_ADDRESS)
    expect(result).toBe(true)
  })

  it('handles empty currentVotes', async () => {
    ;(adapter.getTotalVotesForEligibleValidatorGroups as jest.Mock).mockResolvedValue([[], []])
    const result = await vote(adapter, address1, 42n)
    expect(adapter.vote).toHaveBeenCalledWith(address1, 42n, NULL_ADDRESS, NULL_ADDRESS)
    expect(result).toBe(true)
  })
})
