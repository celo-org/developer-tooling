import { governanceABI } from '@celo/abis'
import { PublicCeloClient, resolveAddress } from '@celo/actions'
import { getProposalStage, ProposalStage } from '@celo/actions/contracts/governance'
import { bufferToHex, StrongAddress } from '@celo/base'
import BigNumber from 'bignumber.js'
import { bigintToBigNumber } from './utils'

type DequeuedStageDurations = Pick<
  StageDurations<BigNumber>,
  ProposalStage.Referendum | ProposalStage.Execution
>

export interface ProposalMetadata {
  proposer: StrongAddress
  deposit: BigNumber
  timestamp: BigNumber
  transactionCount: number
  descriptionURL: string
}

export const getHotfixRecord = async (
  client: PublicCeloClient,
  hash: Buffer
): Promise<HotfixRecord> => {
  const address = await resolveAddress(client, 'Governance')

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
}

type StageDurations<V> = {
  [Stage in ProposalStage]: V
}

export const getProposalSchedule = async (
  client: PublicCeloClient,
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
  client: PublicCeloClient,
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

export const stageDurations = async (client: PublicCeloClient): Promise<DequeuedStageDurations> => {
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

export interface HotfixRecord {
  approved: boolean
  councilApproved: boolean
  executed: boolean
  executionTimeLimit: BigNumber
}
