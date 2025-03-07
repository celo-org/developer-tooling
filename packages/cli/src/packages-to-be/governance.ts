import { governanceABI as governanceABI11 } from '@celo/abis'
import { governanceABI } from '@celo/abis-12'
import { Address, bufferToHex, zip } from '@celo/base'
import BigNumber from 'bignumber.js'
import { gte } from 'semver'
import { bigintToBigNumber } from '../utils/checks'
import { resolveAddress } from './address-resolver'
import { CeloClient, isCel2 } from './client'

export interface ProposalMetadata {
  proposer: Address
  deposit: BigNumber
  timestamp: BigNumber
  transactionCount: number
  descriptionURL: string
}

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

type DequeuedStageDurations = Pick<
  StageDurations<BigNumber>,
  ProposalStage.Referendum | ProposalStage.Execution
>

export const getProposalStage = async (
  client: CeloClient,
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

export const getQueue = async (client: CeloClient) => {
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
    // TODO check if this works correctly after changing the types?!
    queue[0] as bigint[],
    queue[1] as bigint[]
  )
}

export const getHotfixRecord = async (
  client: CeloClient,
  hash: Buffer
): Promise<L1HotfixRecord | HotfixRecord> => {
  const address = await resolveAddress(client, 'Governance')
  const version = await client.readContract({
    address,
    abi: governanceABI,
    functionName: 'getVersionNumber',
    args: [],
  })

  if (gte(version.slice(0, -1).join('.'), '1.4.2')) {
    // TODO(L2): this is deprecated and not supported in L2
    if (await isCel2(client)) {
      // is L2
      const res = await client.readContract({
        address,
        abi: governanceABI,
        functionName: 'getL2HotfixRecord',
        args: [bufferToHex(hash)],
      })

      return {
        approved: res[0],
        councilApproved: res[1],
        executed: res[2],
        executionTimeLimit: bigintToBigNumber(res[3]),
      }
    } else {
      // is L1
      const res = await client.readContract({
        address,
        abi: governanceABI,
        functionName: 'getL1HotfixRecord',
        args: [bufferToHex(hash)],
      })

      return {
        approved: res[0],
        executed: res[1],
        preparedEpoch: bigintToBigNumber(res[2]),
      }
    }
  } else {
    const res = await client.readContract({
      address,
      abi: governanceABI11,
      functionName: 'getHotfixRecord',
      args: [bufferToHex(hash)],
    })

    return {
      approved: res[0],
      executed: res[1],
      preparedEpoch: bigintToBigNumber(res[2]),
    }
  }
}

type StageDurations<V> = {
  [Stage in ProposalStage]: V
}

export const getProposalSchedule = async (
  client: CeloClient,
  proposalId: bigint
): Promise<Partial<StageDurations<BigNumber>>> => {
  const meta = await getProposalMetadata(client, proposalId)
  const stage = await getProposalStage(client, proposalId)

  if (stage === ProposalStage.Queued) {
    const queueExpiry = await client.readContract({
      address: await resolveAddress(client, 'Governance'),
      abi: governanceABI,
      functionName: 'queueExpiry',
    })

    const queueExpiration = meta.timestamp.plus(bigintToBigNumber(queueExpiry))

    return {
      [ProposalStage.Queued]: meta.timestamp,
      [ProposalStage.Expiration]: queueExpiration,
    }
  }

  const durations = await stageDurations(client)
  const referendum = meta.timestamp
  const execution = referendum.plus(durations.Referendum)
  const expiration = execution.plus(durations.Execution)

  return {
    [ProposalStage.Referendum]: referendum,
    [ProposalStage.Execution]: execution,
    [ProposalStage.Expiration]: expiration,
  }
}

export const getProposalMetadata = async (
  client: CeloClient,
  proposalId: bigint
): Promise<ProposalMetadata> => {
  const proposal = await client.readContract({
    address: await resolveAddress(client, 'Governance'),
    abi: governanceABI,
    functionName: 'getProposal',
    args: [proposalId],
  })

  return {
    proposer: proposal[0],
    deposit: bigintToBigNumber(proposal[1]),
    timestamp: bigintToBigNumber(proposal[2]),
    transactionCount: Number(proposal[3]),
    descriptionURL: proposal[4],
  }
}

export const stageDurations = async (client: CeloClient): Promise<DequeuedStageDurations> => {
  const durations = await client.readContract({
    address: await resolveAddress(client, 'Governance'),
    abi: governanceABI,
    functionName: 'stageDurations',
  })

  return {
    [ProposalStage.Referendum]: bigintToBigNumber(durations[1]),
    [ProposalStage.Execution]: bigintToBigNumber(durations[2]),
  }
}

// TODO remove this once no longer needed, consider this as legacy
export interface L1HotfixRecord {
  approved: boolean
  executed: boolean
  preparedEpoch: BigNumber
}

// Purposfully not named L2HotfixRecord to signal that this is a new and valid going forward
// interface
export interface HotfixRecord {
  approved: boolean
  councilApproved: boolean
  executed: boolean
  executionTimeLimit: BigNumber
}
