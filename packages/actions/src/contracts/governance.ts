import { governanceABI } from '@celo/abis'
import { zip } from '@celo/base'
import { voteProposal, VoteProposalTypes } from '@celo/core'
import { Client, getContract, GetContractReturnType, PublicClient } from 'viem'
import { WalletCeloClient } from '../client'
import { resolveAddress } from './registry'

export type GovernanceContract<T extends Client = PublicClient> = GetContractReturnType<
  typeof governanceABI,
  T
>

export enum ProposalStage {
  None = 'None',
  Queued = 'Queued',
  Approval = 'Approval',
  Referendum = 'Referendum',
  Execution = 'Execution',
  Expiration = 'Expiration',
}

export interface UpvoteRecord {
  proposalID: bigint
  upvotes: bigint
}

export async function getGovernanceContract<T extends Client = PublicClient>(
  client: T
): Promise<GovernanceContract<T>> {
  return getContract({
    address: await resolveAddress(client, 'Governance'),
    abi: governanceABI,
    client,
  })
}

export async function vote<T extends WalletCeloClient = WalletCeloClient>(
  client: T,
  proposalId: bigint,
  voteValue: VoteProposalTypes
) {
  const contract = await getGovernanceContract(client)
  return voteProposal(
    {
      vote: async (proposalID, proposalIndex, voteValue) => {
        const { request } = await contract.simulate.vote([proposalID, proposalIndex, voteValue])
        return contract.write.vote(request.args)
      },
      getDequeue: async () => {
        const dequeue = await contract.read.getDequeue()
        return dequeue as bigint[] // remove readonly
      },
    },
    proposalId,
    voteValue
  )
}

export const getQueue = async (client: PublicClient) => {
  const queue = await client.readContract({
    address: await resolveAddress(client, 'Governance'),
    abi: governanceABI,
    functionName: 'getQueue',
  })

  return zip<bigint, bigint, UpvoteRecord>(
    (_id, _upvotes) => ({
      proposalID: _id,
      upvotes: _upvotes,
    }),
    queue[0] as bigint[],
    queue[1] as bigint[]
  )
}

export const getProposalStage = async (
  client: PublicClient,
  proposalId: bigint
): Promise<ProposalStage> => {
  const queue = await getQueue(client)

  const existsInQueue = queue.find((u) => u.proposalID === proposalId) !== undefined
  if (existsInQueue) {
    const expired = await client.readContract({
      address: await resolveAddress(client, 'Governance'),
      abi: governanceABI,
      functionName: 'isQueuedProposalExpired',
      args: [proposalId],
    })

    return expired ? ProposalStage.Expiration : ProposalStage.Queued
  }

  const stage = await client.readContract({
    address: await resolveAddress(client, 'Governance'),
    abi: governanceABI,
    functionName: 'getProposalStage',
    args: [proposalId],
  })

  return Object.keys(ProposalStage)[stage] as ProposalStage
}
