import { governanceABI } from '@celo/abis'
import { pad } from 'viem'
import {
  bufferToHex,
  ensureLeading0x,
  hexToBuffer,
  NULL_ADDRESS,
  trimLeading0x,
} from '@celo/base/lib/address'
import { concurrentMap } from '@celo/base/lib/async'
import { zeroRange, zip } from '@celo/base/lib/collections'
import { Address, CeloTx, CeloTxPending } from '@celo/connect'
import { fromFixed } from '@celo/utils/lib/fixidity'
import BigNumber from 'bignumber.js'
import {
  bufferToSolidityBytes,
  secondsToDurationString,
  solidityBytesToString,
  toViemAddress,
  toViemBigInt,
  unixSecondsTimestampToDateString,
  valueToBigNumber,
  valueToInt,
  valueToString,
} from './BaseWrapper'
import { BaseWrapperForGoverning } from './BaseWrapperForGoverning'

export enum ProposalStage {
  None = 'None',
  Queued = 'Queued',
  Approval = 'Approval',
  Referendum = 'Referendum',
  Execution = 'Execution',
  Expiration = 'Expiration',
}

type StageDurations<V> = {
  [Stage in ProposalStage]: V
}

type DequeuedStageDurations = Pick<
  StageDurations<BigNumber>,
  ProposalStage.Referendum | ProposalStage.Execution
>

export interface ParticipationParameters {
  baseline: BigNumber
  baselineFloor: BigNumber
  baselineUpdateFactor: BigNumber
  baselineQuorumFactor: BigNumber
}

export interface GovernanceConfig {
  concurrentProposals: BigNumber
  dequeueFrequency: BigNumber // seconds
  minDeposit: BigNumber
  queueExpiry: BigNumber
  stageDurations: DequeuedStageDurations
  participationParameters: ParticipationParameters
}

export interface ProposalMetadata {
  proposer: Address
  deposit: BigNumber
  timestamp: BigNumber
  transactionCount: number
  descriptionURL: string
}

export type ProposalParams = [
  (number | string)[],
  string[],
  string | number[],
  (number | string)[],
  string,
]
export type ProposalTransaction = Pick<CeloTxPending, 'to' | 'input' | 'value'>
export type Proposal = ProposalTransaction[]

export const proposalToParams = (proposal: Proposal, descriptionURL: string): ProposalParams => {
  const data = proposal.map((tx) => hexToBuffer(tx.input))
  return [
    proposal.map((tx) => tx.value),
    proposal.map((tx) => tx.to!),
    bufferToSolidityBytes(Buffer.concat(data)),
    data.map((inp) => inp.length),
    descriptionURL,
  ]
}

interface ApprovalStatus {
  completion: string
  confirmations: string[]
  approvers: string[]
}

export interface ProposalRecord {
  metadata: ProposalMetadata
  proposal: Proposal
  stage: ProposalStage
  approved: boolean
  passed: boolean
  upvotes?: BigNumber
  approvals?: ApprovalStatus
  votes?: Votes
}

export interface UpvoteRecord {
  proposalID: BigNumber
  upvotes: BigNumber
}

export enum VoteValue {
  None = 'None',
  Abstain = 'Abstain',
  No = 'No',
  Yes = 'Yes',
}

export interface Votes {
  [VoteValue.Abstain]: BigNumber
  [VoteValue.No]: BigNumber
  [VoteValue.Yes]: BigNumber
}

export type HotfixParams = [
  (number | string)[],
  string[],
  string | number[],
  (number | string)[],
  string | number[],
]
export const hotfixToParams = (proposal: Proposal, salt: Buffer): HotfixParams => {
  const p = proposalToParams(proposal, '') // no description URL for hotfixes
  return [p[0], p[1], p[2], p[3], bufferToHex(salt)]
}

// Purposfully not named L2HotfixRecord to signal that this is a new and valid going forward
// interface
export interface HotfixRecord {
  approved: boolean
  councilApproved: boolean
  executed: boolean
  executionTimeLimit: BigNumber
}

export interface VoteRecord {
  proposalID: BigNumber
  votes: BigNumber
  value: VoteValue
  yesVotes: BigNumber
  noVotes: BigNumber
  abstainVotes: BigNumber
}

export interface Voter {
  upvote: UpvoteRecord
  votes: VoteRecord[]
  refundedDeposits: BigNumber
}

const ZERO_BN = new BigNumber(0)

/**
 * Contract managing voting for governance proposals.
 */
export class GovernanceWrapper extends BaseWrapperForGoverning<typeof governanceABI> {
  // --- private proxy fields for typed contract calls ---
  private _stageDurations = async () => {
    const res = await this.contract.read.stageDurations()
    return {
      [ProposalStage.Referendum]: valueToBigNumber(res[1].toString()),
      [ProposalStage.Execution]: valueToBigNumber(res[2].toString()),
    }
  }

  private _getConstitution = async (destination: string, functionId: string) =>
    this.contract.read.getConstitution([toViemAddress(destination), functionId as `0x${string}`])

  private _getParticipationParameters = async () => {
    const res = await this.contract.read.getParticipationParameters()
    return {
      baseline: fromFixed(new BigNumber(res[0].toString())),
      baselineFloor: fromFixed(new BigNumber(res[1].toString())),
      baselineUpdateFactor: fromFixed(new BigNumber(res[2].toString())),
      baselineQuorumFactor: fromFixed(new BigNumber(res[3].toString())),
    }
  }

  private _getProposalStage = async (proposalID: BigNumber.Value) =>
    this.contract.read.getProposalStage([toViemBigInt(proposalID)])

  private _getVoteRecord = async (voter: string, index: number) =>
    this.contract.read.getVoteRecord([toViemAddress(voter), BigInt(index)])

  private _getDequeue = async () => this.contract.read.getDequeue()

  private _getHotfixRecord = async (hash: string): Promise<HotfixRecord> => {
    const res = await this.contract.read.getHotfixRecord([pad(hash as `0x${string}`, { size: 32 })])
    return {
      approved: res[0],
      councilApproved: res[1],
      executed: res[2],
      executionTimeLimit: valueToBigNumber(res[3].toString()),
    }
  }

  private _upvote = (args: any[], txParams?: Omit<CeloTx, 'data'>) =>
    this.sendTx('upvote', args, txParams)
  private _revokeUpvote = (args: any[], txParams?: Omit<CeloTx, 'data'>) =>
    this.sendTx('revokeUpvote', args, txParams)
  private _approve = (args: any[], txParams?: Omit<CeloTx, 'data'>) =>
    this.sendTx('approve', args, txParams)
  private _voteSend = (args: any[], txParams?: Omit<CeloTx, 'data'>) =>
    this.sendTx('vote', args, txParams)
  private _votePartially = (args: any[], txParams?: Omit<CeloTx, 'data'>) =>
    this.sendTx('votePartially', args, txParams)
  private _execute = (args: any[], txParams?: Omit<CeloTx, 'data'>) =>
    this.sendTx('execute', args, txParams)

  /**
   * Querying number of possible concurrent proposals.
   * @returns Current number of possible concurrent proposals.
   */
  concurrentProposals = async () => {
    const res = await this.contract.read.concurrentProposals()
    return valueToBigNumber(res.toString())
  }
  /**
   * Query time of last proposal dequeue
   * @returns Time of last dequeue
   */
  lastDequeue = async () => {
    const res = await this.contract.read.lastDequeue()
    return valueToBigNumber(res.toString())
  }
  /**
   * Query proposal dequeue frequency.
   * @returns Current proposal dequeue frequency in seconds.
   */
  dequeueFrequency = async () => {
    const res = await this.contract.read.dequeueFrequency()
    return valueToBigNumber(res.toString())
  }
  /**
   * Query minimum deposit required to make a proposal.
   * @returns Current minimum deposit.
   */
  minDeposit = async () => {
    const res = await this.contract.read.minDeposit()
    return valueToBigNumber(res.toString())
  }
  /**
   * Query queue expiry parameter.
   * @return The number of seconds a proposal can stay in the queue before expiring.
   */
  queueExpiry = async () => {
    const res = await this.contract.read.queueExpiry()
    return valueToBigNumber(res.toString())
  }
  /**
   * Query durations of different stages in proposal lifecycle.
   * @returns Durations for approval, referendum and execution stages in seconds.
   */
  async stageDurations(): Promise<DequeuedStageDurations> {
    return this._stageDurations()
  }

  /**
   * Returns the required ratio of yes:no votes needed to exceed in order to pass the proposal transaction.
   * @param tx Transaction to determine the constitution for running.
   */
  async getTransactionConstitution(tx: ProposalTransaction): Promise<BigNumber> {
    // Extract the leading four bytes of the call data, which specifies the function.
    const callSignature = ensureLeading0x(trimLeading0x(tx.input).slice(0, 8))
    const value = await this._getConstitution(tx.to ?? NULL_ADDRESS, callSignature)
    return fromFixed(new BigNumber(value.toString()))
  }

  /**
   * Returns the required ratio of yes:no votes needed to exceed in order to pass the proposal.
   * @param proposal Proposal to determine the constitution for running.
   */
  async getConstitution(proposal: Proposal): Promise<BigNumber> {
    // Default value that is harcoded on Governance contract
    // it's 0.5 in Fixidity
    // https://github.com/celo-org/celo-monorepo/blob/3fffa158d67ffd6366e81ba7243eadede1974b1b/packages/protocol/contracts/governance/Governance.sol#L39
    let constitution = fromFixed(new BigNumber('500000000000000000000000'))
    for (const tx of proposal) {
      constitution = BigNumber.max(await this.getTransactionConstitution(tx), constitution)
    }
    return constitution
  }

  /**
   * Returns the participation parameters.
   * @returns The participation parameters.
   */
  async getParticipationParameters(): Promise<ParticipationParameters> {
    return this._getParticipationParameters()
  }

  // function get support doesn't consider constitution parameteres that has an influence
  // in the total of yes votes required
  async getSupportWithConstitutionThreshold(proposalID: BigNumber.Value, constitution: BigNumber) {
    const support = await this.getSupport(proposalID)
    support.required = support.required.times(constitution).integerValue()
    return support
  }

  // simulates proposal.getSupportWithQuorumPadding
  async getSupport(proposalID: BigNumber.Value) {
    const [participation, votes, lockedGold] = await Promise.all([
      this.getParticipationParameters(),
      this.getVotes(proposalID),
      this.contracts.getLockedGold(),
    ])
    const quorum = participation.baseline.times(participation.baselineQuorumFactor)
    const total = votes.Yes.plus(votes.No).plus(votes.Abstain)
    // NOTE: this networkWeight is not as governance calculates it,
    // but we don't have access to proposal.networkWeight
    const networkWeight = await lockedGold.getTotalLockedGold()
    const required = networkWeight.times(quorum)
    let support = votes.Yes.div(votes.Yes.plus(votes.No))
    support = isNaN(support.toNumber()) ? new BigNumber(0) : support
    return {
      support,
      required,
      total,
    }
  }

  /**
   * Returns whether or not a particular account is voting on proposals.
   * @param account The address of the account.
   * @returns Whether or not the account is voting on proposals.
   */
  isVoting = async (account: string) => this.contract.read.isVoting([toViemAddress(account)])

  /**
   * Returns current configuration parameters.
   */
  async getConfig(): Promise<GovernanceConfig> {
    const res = await Promise.all([
      this.concurrentProposals(),
      this.dequeueFrequency(),
      this.minDeposit(),
      this.queueExpiry(),
      this.stageDurations(),
      this.getParticipationParameters(),
    ])
    return {
      concurrentProposals: res[0],
      dequeueFrequency: res[1],
      minDeposit: res[2],
      queueExpiry: res[3],
      stageDurations: res[4],
      participationParameters: res[5],
    }
  }

  /**
   * @dev Returns human readable configuration of the governance contract
   * @return GovernanceConfig object
   */
  async getHumanReadableConfig() {
    const config = await this.getConfig()
    const stageDurations = {
      [ProposalStage.Referendum]: secondsToDurationString(
        config.stageDurations[ProposalStage.Referendum]
      ),
      [ProposalStage.Execution]: secondsToDurationString(
        config.stageDurations[ProposalStage.Execution]
      ),
    }
    return {
      ...config,
      dequeueFrequency: secondsToDurationString(config.dequeueFrequency),
      queueExpiry: secondsToDurationString(config.queueExpiry),
      stageDurations,
    }
  }

  /**
   * Returns the metadata associated with a given proposal.
   * @param proposalID Governance proposal UUID
   */
  getProposalMetadata = async (proposalID: BigNumber.Value): Promise<ProposalMetadata> => {
    const res = await this.contract.read.getProposal([toViemBigInt(proposalID)])
    return {
      proposer: res[0],
      deposit: valueToBigNumber(res[1].toString()),
      timestamp: valueToBigNumber(res[2].toString()),
      transactionCount: valueToInt(res[3].toString()),
      descriptionURL: res[4],
    }
  }

  /**
   * Returns the human readable metadata associated with a given proposal.
   * @param proposalID Governance proposal UUID
   */
  async getHumanReadableProposalMetadata(proposalID: BigNumber.Value) {
    const meta = await this.getProposalMetadata(proposalID)
    return {
      ...meta,
      timestamp: unixSecondsTimestampToDateString(meta.timestamp),
    }
  }

  /**
   * Returns the transaction at the given index associated with a given proposal.
   * @param proposalID Governance proposal UUID
   * @param txIndex Transaction index
   */
  getProposalTransaction = async (
    proposalID: BigNumber.Value,
    txIndex: number
  ): Promise<ProposalTransaction> => {
    const res = await this.contract.read.getProposalTransaction([
      toViemBigInt(proposalID),
      toViemBigInt(txIndex),
    ])
    return {
      value: res[0].toString(),
      to: res[1],
      input: solidityBytesToString(res[2]),
    }
  }

  /**
   * Returns whether a given proposal is approved.
   * @param proposalID Governance proposal UUID
   */
  isApproved = async (proposalID: BigNumber.Value) =>
    this.contract.read.isApproved([toViemBigInt(proposalID)])

  /**
   * Returns whether a dequeued proposal is expired.
   * @param proposalID Governance proposal UUID
   */
  isDequeuedProposalExpired = async (proposalID: BigNumber.Value) =>
    this.contract.read.isDequeuedProposalExpired([toViemBigInt(proposalID)])

  /**
   * Returns whether a dequeued proposal is expired.
   * @param proposalID Governance proposal UUID
   */
  isQueuedProposalExpired = async (proposalID: BigNumber.Value) =>
    this.contract.read.isQueuedProposalExpired([toViemBigInt(proposalID)])

  /**
   * Returns the approver address for proposals and hotfixes.
   */
  getApprover = async () => this.contract.read.approver() as Promise<string>

  /**
   * Returns the approver multisig contract for proposals and hotfixes.
   */
  getApproverMultisig = () =>
    this.getApprover().then((address) => this.contracts.getMultiSig(address))

  /**
   * Returns the security council address for hotfixes.
   */
  getSecurityCouncil = async () => this.contract.read.securityCouncil() as Promise<string>

  /**
   * Returns the security council multisig contract for hotfixes.
   */
  getSecurityCouncilMultisig = () =>
    this.getSecurityCouncil().then((address) => this.contracts.getMultiSig(address))

  getProposalStage = async (proposalID: BigNumber.Value): Promise<ProposalStage> => {
    const queue = await this.getQueue()
    const existsInQueue = queue.find((u) => u.proposalID === proposalID) !== undefined
    if (existsInQueue) {
      const expired = await this.isQueuedProposalExpired(proposalID)
      return expired ? ProposalStage.Expiration : ProposalStage.Queued
    }

    const res = await this._getProposalStage(proposalID)
    return Object.keys(ProposalStage)[Number(res)] as ProposalStage
  }

  async proposalSchedule(proposalID: BigNumber.Value): Promise<Partial<StageDurations<BigNumber>>> {
    const meta = await this.getProposalMetadata(proposalID)
    const stage = await this.getProposalStage(proposalID)

    if (stage === ProposalStage.Queued) {
      const queueExpiry = await this.queueExpiry()
      const queueExpiration = meta.timestamp.plus(queueExpiry)
      return {
        [ProposalStage.Queued]: meta.timestamp,
        [ProposalStage.Expiration]: queueExpiration,
      }
    }

    const durations = await this.stageDurations()
    const referendum = meta.timestamp
    const execution = referendum.plus(durations.Referendum)
    const expiration = execution.plus(durations.Execution)

    return {
      [ProposalStage.Referendum]: referendum,
      [ProposalStage.Execution]: execution,
      [ProposalStage.Expiration]: expiration,
    }
  }

  async humanReadableProposalSchedule(proposalID: BigNumber.Value) {
    const schedule = await this.proposalSchedule(proposalID)

    const dates: Partial<StageDurations<string>> = {}
    for (const stage of Object.keys(schedule) as (keyof StageDurations<string>)[]) {
      dates[stage] = unixSecondsTimestampToDateString(schedule[stage]!)
    }
    return dates
  }

  /**
   * Returns the proposal associated with a given id.
   * @param proposalID Governance proposal UUID
   */
  async getProposal(proposalID: BigNumber.Value): Promise<Proposal> {
    const metadata = await this.getProposalMetadata(proposalID)
    const txIndices = zeroRange(metadata.transactionCount)
    return concurrentMap(4, txIndices, (idx) => this.getProposalTransaction(proposalID, idx))
  }

  async getApprovalStatus(proposalID: BigNumber.Value): Promise<ApprovalStatus> {
    const [proposalIndex, multisig] = await Promise.all([
      this.getDequeueIndex(proposalID),
      this.getApproverMultisig(),
    ])
    const encodedData = this.encodeFunctionData('approve', [
      valueToString(proposalID),
      proposalIndex,
    ])
    const [multisigTxs, approvers] = await Promise.all([
      multisig.getTransactionDataByContent(this.address, encodedData),
      multisig.getOwners() as Promise<Address[]>,
    ])

    const confirmations = multisigTxs ? multisigTxs.confirmations : []

    return {
      completion: `${confirmations.length} / ${approvers.length}`,
      confirmations,
      approvers,
    }
  }

  /**
   * Returns the stage, metadata, upvotes, votes, and transactions associated with a given proposal.
   * @param proposalID Governance proposal UUID
   */
  async getProposalRecord(proposalID: BigNumber.Value): Promise<ProposalRecord> {
    const [proposal, metadata, stage] = await Promise.all([
      this.getProposal(proposalID),
      this.getProposalMetadata(proposalID),
      this.getProposalStage(proposalID),
    ])

    const record: ProposalRecord = {
      proposal,
      metadata,
      stage,
      passed: false,
      approved: false,
    }

    if (stage === ProposalStage.Queued) {
      record.upvotes = await this.getUpvotes(proposalID)
    } else if (stage === ProposalStage.Referendum || stage === ProposalStage.Execution) {
      const [passed, votes, approved, approvals] = await Promise.all([
        this.isProposalPassing(proposalID),
        this.getVotes(proposalID),
        this.isApproved(proposalID),
        this.getApprovalStatus(proposalID),
      ])
      record.passed = passed
      record.votes = votes
      record.approved = approved
      record.approvals = approvals
    }
    return record
  }

  /**
   * Returns whether a given proposal is passing relative to the constitution's threshold.
   * @param proposalID Governance proposal UUID
   */
  isProposalPassing = async (proposalID: BigNumber.Value) =>
    this.contract.read.isProposalPassing([toViemBigInt(proposalID)])

  /**
   * Withdraws refunded proposal deposits.
   */
  withdraw = (txParams?: Omit<CeloTx, 'data'>) => this.sendTx('withdraw', [], txParams)

  /**
   * Submits a new governance proposal.
   * @param proposal Governance proposal
   * @param descriptionURL A URL where further information about the proposal can be viewed
   */
  propose = (proposal: Proposal, descriptionURL: string, txParams?: Omit<CeloTx, 'data'>) =>
    this.sendTx('propose', proposalToParams(proposal, descriptionURL), txParams)

  /**
   * Returns whether a governance proposal exists with the given ID.
   * @param proposalID Governance proposal UUID
   */
  proposalExists = async (proposalID: BigNumber.Value) =>
    this.contract.read.proposalExists([toViemBigInt(proposalID)])

  /**
   * Returns the current upvoted governance proposal ID and applied vote weight (zeroes if none).
   * @param upvoter Address of upvoter
   */
  getUpvoteRecord = async (upvoter: Address): Promise<UpvoteRecord> => {
    const o = await this.contract.read.getUpvoteRecord([toViemAddress(upvoter)])
    return {
      proposalID: valueToBigNumber(o[0].toString()),
      upvotes: valueToBigNumber(o[1].toString()),
    }
  }

  async isUpvoting(upvoter: Address): Promise<boolean> {
    const upvote = await this.getUpvoteRecord(upvoter)
    return (
      !upvote.proposalID.isZero() &&
      (await this.isQueued(upvote.proposalID)) &&
      !(await this.isQueuedProposalExpired(upvote.proposalID))
    )
  }

  /**
   * Returns the corresponding vote record
   * @param voter Address of voter
   * @param proposalID Governance proposal UUID
   */
  async getVoteRecord(voter: Address, proposalID: BigNumber.Value): Promise<VoteRecord | null> {
    try {
      const proposalIndex = await this.getDequeueIndex(proposalID)
      const res = await this._getVoteRecord(voter, proposalIndex)
      return {
        proposalID: valueToBigNumber(res[0].toString()),
        value: Object.keys(VoteValue)[valueToInt(res[1].toString())] as VoteValue,
        votes: valueToBigNumber(res[2].toString()),
        yesVotes: valueToBigNumber(res[3].toString()),
        noVotes: valueToBigNumber(res[4].toString()),
        abstainVotes: valueToBigNumber(res[5].toString()),
      }
    } catch (_) {
      // The proposal ID may not be present in the dequeued list, or the voter may not have a vote
      // record for the proposal.
      return null
    }
  }

  /**
   * Returns whether a given proposal is queued.
   * @param proposalID Governance proposal UUID
   */
  isQueued = async (proposalID: BigNumber.Value) =>
    this.contract.read.isQueued([toViemBigInt(proposalID)])

  /**
   * Returns the value of proposal deposits that have been refunded.
   * @param proposer Governance proposer address.
   */
  getRefundedDeposits = async (proposer: string) => {
    const res = await this.contract.read.refundedDeposits([toViemAddress(proposer)])
    return valueToBigNumber(res.toString())
  }

  /*
   * Returns the upvotes applied to a given proposal.
   * @param proposalID Governance proposal UUID
   */
  getUpvotes = async (proposalID: BigNumber.Value) => {
    const res = await this.contract.read.getUpvotes([toViemBigInt(proposalID)])
    return valueToBigNumber(res.toString())
  }

  /**
   * Returns the yes, no, and abstain votes applied to a given proposal.
   * @param proposalID Governance proposal UUID
   */
  getVotes = async (proposalID: BigNumber.Value): Promise<Votes> => {
    const res = await this.contract.read.getVoteTotals([toViemBigInt(proposalID)])
    return {
      [VoteValue.Yes]: valueToBigNumber(res[0].toString()),
      [VoteValue.No]: valueToBigNumber(res[1].toString()),
      [VoteValue.Abstain]: valueToBigNumber(res[2].toString()),
    }
  }

  /**
   * Returns the proposal queue as list of upvote records.
   */
  getQueue = async () => {
    const arraysObject = await this.contract.read.getQueue()
    return zip(
      (_id, _upvotes) => ({
        proposalID: valueToBigNumber(_id.toString()),
        upvotes: valueToBigNumber(_upvotes.toString()),
      }),
      [...arraysObject[0]],
      [...arraysObject[1]]
    )
  }

  /**
   * Returns the (existing) proposal dequeue as list of proposal IDs.
   */
  async getDequeue(filterZeroes = false) {
    const dequeue = await this._getDequeue()
    // filter non-zero as dequeued indices are reused and `deleteDequeuedProposal` zeroes
    const dequeueIds = [...dequeue].map((id) => new BigNumber(id.toString()))
    return filterZeroes ? dequeueIds.filter((id: BigNumber) => !id.isZero()) : dequeueIds
  }

  /*
   * Returns the vote records for a given voter.
   */
  async getVoteRecords(voter: Address): Promise<VoteRecord[]> {
    const dequeue = await this.getDequeue()
    const voteRecords = await Promise.all(
      dequeue.map((id: BigNumber) => this.getVoteRecord(voter, id))
    )
    return voteRecords.filter((record) => record != null) as VoteRecord[]
  }

  async isVotingReferendum(voter: Address) {
    const records = await this.getVoteRecords(voter)
    return records.length !== 0
  }

  /*
   * Returns information pertaining to a voter in governance.
   */
  async getVoter(account: Address): Promise<Voter> {
    const res = await Promise.all([
      this.getUpvoteRecord(account),
      this.getVoteRecords(account),
      this.getRefundedDeposits(account),
    ])
    return {
      upvote: res[0],
      votes: res[1],
      refundedDeposits: res[2],
    }
  }

  /**
   * Dequeues any queued proposals if `dequeueFrequency` seconds have elapsed since the last dequeue
   */
  dequeueProposalsIfReady = (txParams?: Omit<CeloTx, 'data'>) =>
    this.sendTx('dequeueProposalsIfReady', [], txParams)

  /**
   * Returns the number of votes that will be applied to a proposal for a given voter.
   * @param voter Address of voter
   */
  async getVoteWeight(voter: Address) {
    const lockedGoldContract = await this.contracts.getLockedGold()
    return lockedGoldContract.getAccountTotalLockedGold(voter)
  }

  private getIndex(id: BigNumber.Value, array: BigNumber[]) {
    const index = array.findIndex((bn) => bn.isEqualTo(id))
    if (index === -1) {
      throw new Error(`ID ${id} not found in array ${array}`)
    }
    return index
  }

  private async getDequeueIndex(proposalID: BigNumber.Value, dequeue?: BigNumber[]) {
    const resolvedDequeue = dequeue ?? (await this.getDequeue())
    return this.getIndex(proposalID, resolvedDequeue)
  }

  private async getQueueIndex(proposalID: BigNumber.Value, queue?: UpvoteRecord[]) {
    if (!queue) {
      queue = await this.getQueue()
    }
    return {
      index: this.getIndex(
        proposalID,
        queue.map((record) => record.proposalID)
      ),
      queue,
    }
  }

  private async lesserAndGreater(proposalID: BigNumber.Value, _queue?: UpvoteRecord[]) {
    const { index, queue } = await this.getQueueIndex(proposalID, _queue)
    return {
      lesserID: index === 0 ? ZERO_BN : queue[index - 1].proposalID,
      greaterID: index === queue.length - 1 ? ZERO_BN : queue[index + 1].proposalID,
    }
  }

  sortedQueue(queue: UpvoteRecord[]) {
    return queue.sort((a, b) => a.upvotes.comparedTo(b.upvotes))
  }

  private async withUpvoteRevoked(upvoter: Address, _queue?: UpvoteRecord[]) {
    const upvoteRecord = await this.getUpvoteRecord(upvoter)
    const { index, queue } = await this.getQueueIndex(upvoteRecord.proposalID, _queue)
    queue[index].upvotes = queue[index].upvotes.minus(upvoteRecord.upvotes)
    return {
      queue: this.sortedQueue(queue),
      upvoteRecord,
    }
  }

  private async withUpvoteApplied(
    upvoter: Address,
    proposalID: BigNumber.Value,
    _queue?: UpvoteRecord[]
  ) {
    const { index, queue } = await this.getQueueIndex(proposalID, _queue)
    const weight = await this.getVoteWeight(upvoter)
    queue[index].upvotes = queue[index].upvotes.plus(weight)
    return this.sortedQueue(queue)
  }

  private async lesserAndGreaterAfterRevoke(upvoter: Address) {
    const { queue, upvoteRecord } = await this.withUpvoteRevoked(upvoter)
    return this.lesserAndGreater(upvoteRecord.proposalID, queue)
  }

  private async lesserAndGreaterAfterUpvote(upvoter: Address, proposalID: BigNumber.Value) {
    const upvoteRecord = await this.getUpvoteRecord(upvoter)
    const recordQueued = await this.isQueued(upvoteRecord.proposalID)
    // if existing upvote exists in queue, revoke it before applying new upvote
    const queue = recordQueued
      ? (await this.withUpvoteRevoked(upvoter)).queue
      : await this.getQueue()
    const upvoteQueue = await this.withUpvoteApplied(upvoter, proposalID, queue)
    return this.lesserAndGreater(proposalID, upvoteQueue)
  }

  /**
   * Applies provided upvoter's upvote to given proposal.
   * @param proposalID Governance proposal UUID
   * @param upvoter Address of upvoter
   */
  async upvote(
    proposalID: BigNumber.Value,
    upvoter: Address,
    txParams?: Omit<CeloTx, 'data'>
  ): Promise<`0x${string}`> {
    const { lesserID, greaterID } = await this.lesserAndGreaterAfterUpvote(upvoter, proposalID)
    return this._upvote(
      [valueToString(proposalID), valueToString(lesserID), valueToString(greaterID)],
      txParams
    )
  }
  /**
   * Revokes provided upvoter's upvote.
   * @param upvoter Address of upvoter
   */
  async revokeUpvote(upvoter: Address, txParams?: Omit<CeloTx, 'data'>): Promise<`0x${string}`> {
    const { lesserID, greaterID } = await this.lesserAndGreaterAfterRevoke(upvoter)
    return this._revokeUpvote([valueToString(lesserID), valueToString(greaterID)], txParams)
  }

  /**
   * Approves given proposal, allowing it to later move to `referendum`.
   * @param proposalID Governance proposal UUID
   * @notice Only the `approver` address will succeed in sending this transaction
   */
  async approve(
    proposalID: BigNumber.Value,
    txParams?: Omit<CeloTx, 'data'>
  ): Promise<`0x${string}`> {
    const proposalIndex = await this.getDequeueIndex(proposalID)
    return this._approve([valueToString(proposalID), proposalIndex], txParams)
  }

  /**
   * Applies `sender`'s vote choice to a given proposal.
   * @param proposalID Governance proposal UUID
   * @param vote Choice to apply (yes, no, abstain)
   */
  async vote(
    proposalID: BigNumber.Value,
    vote: keyof typeof VoteValue,
    txParams?: Omit<CeloTx, 'data'>
  ): Promise<`0x${string}`> {
    const proposalIndex = await this.getDequeueIndex(proposalID)
    const voteNum = Object.keys(VoteValue).indexOf(vote)
    return this._voteSend([valueToString(proposalID), proposalIndex, voteNum], txParams)
  }

  /**
   * Applies `sender`'s vote choice to a given proposal.
   * @param proposalID Governance proposal UUID.
   * @param yesVotes The yes votes.
   * @param noVotes The no votes.
   * @param abstainVotes The abstain votes.
   */
  async votePartially(
    proposalID: BigNumber.Value,
    yesVotes: BigNumber.Value,
    noVotes: BigNumber.Value,
    abstainVotes: BigNumber.Value,
    txParams?: Omit<CeloTx, 'data'>
  ): Promise<`0x${string}`> {
    const proposalIndex = await this.getDequeueIndex(proposalID)
    return this._votePartially(
      [
        valueToString(proposalID),
        proposalIndex,
        valueToString(yesVotes),
        valueToString(noVotes),
        valueToString(abstainVotes),
      ],
      txParams
    )
  }
  revokeVotes = (txParams?: Omit<CeloTx, 'data'>) => this.sendTx('revokeVotes', [], txParams)

  /**
   * Executes a given proposal's associated transactions.
   * @param proposalID Governance proposal UUID
   */
  async execute(
    proposalID: BigNumber.Value,
    txParams?: Omit<CeloTx, 'data'>
  ): Promise<`0x${string}`> {
    const proposalIndex = await this.getDequeueIndex(proposalID)
    return this._execute([valueToString(proposalID), proposalIndex], txParams)
  }

  getHotfixHash = async (proposal: Proposal, salt: Buffer): Promise<string> => {
    const params = hotfixToParams(proposal, salt)
    const result = await this.contract.read.getHotfixHash([
      params[0].map((v) => BigInt(v)),
      params[1] as `0x${string}`[],
      params[2] as `0x${string}`,
      params[3].map((v) => BigInt(v)),
      params[4] as `0x${string}`,
    ])
    return result
  }

  /**
   * Returns approved, executed, and prepared status associated with a given hotfix.
   * @param hash keccak256 hash of hotfix's associated abi encoded transactions
   */
  async getHotfixRecord(hash: Buffer): Promise<HotfixRecord> {
    return this._getHotfixRecord(bufferToHex(hash))
  }

  /**
   * Returns the number of validators required to reach a Byzantine quorum
   */
  minQuorumSize = async () => {
    const res = await this.contract.read.minQuorumSizeInCurrentSet()
    return valueToBigNumber(res.toString())
  }

  /**
   * Marks the given hotfix approved by `sender`.
   * @param hash keccak256 hash of hotfix's associated abi encoded transactions
   * @notice Only the `approver` address will succeed in sending this transaction
   */
  approveHotfix = (hash: Buffer, txParams?: Omit<CeloTx, 'data'>) =>
    this.sendTx('approveHotfix', [bufferToHex(hash)], txParams)

  /**
   * Marks the given hotfix prepared for current epoch if quorum of validators have whitelisted it.
   * @param hash keccak256 hash of hotfix's associated abi encoded transactions
   */
  prepareHotfix = (hash: Buffer, txParams?: Omit<CeloTx, 'data'>) =>
    this.sendTx('prepareHotfix', [bufferToHex(hash)], txParams)

  /**
   * Executes a given sequence of transactions if the corresponding hash is prepared and approved.
   * @param hotfix Governance hotfix proposal
   * @param salt Secret which guarantees uniqueness of hash
   * @notice keccak256 hash of abi encoded transactions computed on-chain
   */
  executeHotfix = (proposal: Proposal, salt: Buffer, txParams?: Omit<CeloTx, 'data'>) =>
    this.sendTx('executeHotfix', hotfixToParams(proposal, salt), txParams)
}

export type GovernanceWrapperType = GovernanceWrapper
