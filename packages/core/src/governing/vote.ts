import { HexString } from '@celo/base'
const voteValuesMap = {
  None: 0,
  Abstain: 1,
  No: 2,
  Yes: 3,
} as const
export type VoteProposalTypes = keyof typeof voteValuesMap
type VoteValues = (typeof voteValuesMap)[keyof typeof voteValuesMap]

export type VoteProposalAdapter = {
  vote: (proposalID: bigint, proposalIndex: bigint, voteValue: VoteValues) => Promise<HexString>
  getDequeue: () => Promise<bigint[]>
}

export async function voteProposal(
  adapater: VoteProposalAdapter,
  proposalId: bigint,
  voteValue: VoteProposalTypes
) {
  const dequeue = await adapater.getDequeue()
  const proposalIndex = getDequeueIndex(proposalId, dequeue)
  return adapater.vote(proposalId, proposalIndex, voteValuesMap[voteValue])
}

// todo i feel wierd returning a bigint when actually the index will always be a number
function getDequeueIndex(proposalID: bigint, dequeue: bigint[]): bigint {
  const index = dequeue.findIndex((bn) => bn === proposalID)

  if (index === -1) {
    throw new Error(`ID ${proposalID} not found in array ${dequeue}`)
  }
  return BigInt(index)
}
