import { governanceABI } from '@celo/abis'
import { zip } from '@celo/base'
import { voteProposal, VoteProposalTypes } from '@celo/core'
import { getContract, GetContractReturnType } from 'viem'
import { Clients, PublicCeloClient } from '../client'
import { resolveAddress } from './registry'

export type GovernanceContract<T extends Clients = Clients> = GetContractReturnType<
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

export async function getGovernanceContract<T extends Clients = Clients>(
  clients: T
): Promise<GovernanceContract<T>> {
  return getContract({
    address: await resolveAddress(clients.public, 'Governance'),
    abi: governanceABI,
    client: clients,
  })
}

export async function vote<C extends Required<Clients> = Required<Clients>>(
  clients: C,
  proposalId: bigint,
  voteValue: VoteProposalTypes
) {
  const contract = await getGovernanceContract(clients)
  return voteProposal(
    {
      vote: async (proposalID, proposalIndex, voteValue) => {
        const { request } = await contract.simulate.vote([proposalID, proposalIndex, voteValue], {
          account: clients.wallet.account.address,
        })
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

export const getQueue = async (client: PublicCeloClient) => {
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
  client: PublicCeloClient,
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
