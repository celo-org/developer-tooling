import { beforeEach, describe, expect, it, vi } from 'vitest'
import { voteProposal, VoteProposalAdapter, VoteProposalTypes } from './vote.js'

describe('voteProposal', () => {
  const proposalId = 123n
  const dequeue = [111n, 123n, 456n]

  let adapter: VoteProposalAdapter

  beforeEach(() => {
    adapter = {
      vote: vi.fn().mockResolvedValue('0xabc'),
      getDequeue: vi.fn().mockResolvedValue(dequeue),
    }
  })

  it('calls adapter.vote with correct proposalIndex and voteValue', async () => {
    await voteProposal(adapter, proposalId, 'Yes')
    expect(adapter.getDequeue).toHaveBeenCalled()
    expect(adapter.vote).toHaveBeenCalledWith(proposalId, 1n, 3)
  })

  it('throws if proposalId is not in dequeue', async () => {
    await expect(voteProposal(adapter, 999n, 'No')).rejects.toThrow(
      'ID 999 not found in array 111,123,456'
    )
  })

  it('passes correct voteValue for each VoteProposalTypes', async () => {
    const values: [VoteProposalTypes, number][] = [
      ['None', 0],
      ['Abstain', 1],
      ['No', 2],
      ['Yes', 3],
    ]
    for (const [type, value] of values) {
      await voteProposal(adapter, proposalId, type)
      expect(adapter.vote).toHaveBeenLastCalledWith(proposalId, 1n, value)
    }
  })
})
