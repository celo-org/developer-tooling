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

/**
 * Casts a vote on a specified proposal using the provided adapter.
 *
 * @param adapater - The adapter responsible for handling proposal voting operations. See Example for implementation.
 * @param proposalId - The unique identifier of the proposal to vote on.
 * @param voteValue - The value representing the type of vote to cast (e.g., Abstain, No, Yes).
 * @example 
 * ```ts
 * const governanceAddress = "0x1234" 
 * const contract = getContract({client, address: governanceAddress, abi: governanceABI})
 * const adapter: VoteProposalAdapter =
 * {
 *  vote: async (proposalID, proposalIndex, voteValue) => {
 *    const { request } = await contract.simulate.vote([proposalID, proposalIndex, voteValue], {
 *      account: client.wallet.account.address})
 *    const gasLimit = await contract.estimateGas.vote(request.args)
 *    return contract.write.vote(request.args, { gas: gasLimit })
 * },
 *  getDequeue: async () => {
 *     contract.read.getDequeue()}
 * }
 * 
 * voteProposal(adapter, proposalId, 'Yes')
 * ```     
 
 
 * @returns A promise that resolves with the has of the vote transaction.
 */
export async function voteProposal(
  adapater: VoteProposalAdapter,
  proposalId: bigint,
  voteValue: VoteProposalTypes
) {
  const dequeue = await adapater.getDequeue()
  const proposalIndex = getDequeueIndex(proposalId, dequeue)
  return adapater.vote(proposalId, proposalIndex, voteValuesMap[voteValue])
}

function getDequeueIndex(proposalID: bigint, dequeue: bigint[]): bigint {
  const index = dequeue.findIndex((bn) => bn === proposalID)

  if (index === -1) {
    throw new Error(`ID ${proposalID} not found in array ${dequeue}`)
  }
  return BigInt(index)
}
