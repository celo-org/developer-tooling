import { electionABI } from '@celo/abis'
import {
  eqAddress,
  findAddressIndex,
  normalizeAddressWith0x,
  NULL_ADDRESS,
  StrongAddress,
} from '@celo/base/lib/address'
import { concurrentMap, concurrentValuesMap } from '@celo/base/lib/async'
import { zeroRange, zip } from '@celo/base/lib/collections'
import { Address, CeloTransactionObject, EventLog } from '@celo/connect'
import BigNumber from 'bignumber.js'
import {
  fixidityValueToBigNumber,
  proxySend,
  toViemAddress,
  toViemBigInt,
  valueToBigNumber,
  valueToInt,
} from './BaseWrapper'
import { BaseWrapperForGoverning } from './BaseWrapperForGoverning'
import { ValidatorGroup } from './Validators'

export interface ValidatorGroupVote {
  address: Address
  name: string
  votes: BigNumber
  capacity: BigNumber
  eligible: boolean
}

export interface Voter {
  address: Address
  votes: GroupVote[]
}

export interface VoterReward {
  address: Address
  addressPayment: BigNumber
  group: ValidatorGroup
  epochNumber: number
}

export interface GroupVote {
  group: Address
  pending: BigNumber
  active: BigNumber
}

export interface GroupVoterReward {
  group: ValidatorGroup
  groupVoterPayment: BigNumber
  epochNumber: number
}

export interface ElectableValidators {
  min: BigNumber
  max: BigNumber
}

export interface ElectionConfig {
  electableValidators: ElectableValidators
  electabilityThreshold: BigNumber
  maxNumGroupsVotedFor: BigNumber
  totalVotes: BigNumber
  currentThreshold: BigNumber
}

/**
 * Contract for voting for validators and managing validator groups.
 */
export class ElectionWrapper extends BaseWrapperForGoverning<typeof electionABI> {
  // --- private proxy fields for typed contract calls ---
  private _electableValidators = async () => {
    const res = await this.contract.read.electableValidators()
    return {
      min: valueToBigNumber(res[0].toString()),
      max: valueToBigNumber(res[1].toString()),
    }
  }

  private _electNValidatorSigners = async (min: string, max: string) => {
    const res = await this.contract.read.electNValidatorSigners([
      toViemBigInt(min),
      toViemBigInt(max),
    ])
    return [...res] as Address[]
  }

  private _electValidatorSigners = async () => {
    const res = await this.contract.read.electValidatorSigners()
    return [...res] as Address[]
  }

  private _getTotalVotesForGroup = async (group: string) => {
    const res = await this.contract.read.getTotalVotesForGroup([toViemAddress(group)])
    return valueToBigNumber(res.toString())
  }

  private _getActiveVotesForGroup = async (group: string) => {
    const res = await this.contract.read.getActiveVotesForGroup([toViemAddress(group)])
    return valueToBigNumber(res.toString())
  }

  private _getPendingVotesForGroupByAccount = async (group: string, account: string) => {
    const res = await this.contract.read.getPendingVotesForGroupByAccount([
      toViemAddress(group),
      toViemAddress(account),
    ])
    return valueToBigNumber(res.toString())
  }

  private _getActiveVotesForGroupByAccount = async (group: string, account: string) => {
    const res = await this.contract.read.getActiveVotesForGroupByAccount([
      toViemAddress(group),
      toViemAddress(account),
    ])
    return valueToBigNumber(res.toString())
  }

  private _getGroupsVotedForByAccountInternal = async (account: string) => {
    const res = await this.contract.read.getGroupsVotedForByAccount([toViemAddress(account)])
    return [...res] as string[]
  }

  private _hasActivatablePendingVotes = async (
    account: string,
    group: string
  ): Promise<boolean> => {
    return this.contract.read.hasActivatablePendingVotes([
      toViemAddress(account),
      toViemAddress(group),
    ])
  }

  private _maxNumGroupsVotedFor = async () => {
    const res = await this.contract.read.maxNumGroupsVotedFor()
    return valueToBigNumber(res.toString())
  }

  private _getGroupEligibility = async (group: string): Promise<boolean> => {
    return this.contract.read.getGroupEligibility([toViemAddress(group)])
  }

  private _getNumVotesReceivable = async (group: string) => {
    const res = await this.contract.read.getNumVotesReceivable([toViemAddress(group)])
    return valueToBigNumber(res.toString())
  }

  private _getTotalVotesForEligibleValidatorGroups = async () => {
    const res = await this.contract.read.getTotalVotesForEligibleValidatorGroups()
    return [[...res[0]] as string[], [...res[1]].map((v) => v.toString())] as [string[], string[]]
  }

  private _getGroupEpochRewardsBasedOnScore = async (
    group: string,
    totalEpochRewards: string,
    groupScore: string
  ) => {
    const res = await this.contract.read.getGroupEpochRewardsBasedOnScore([
      toViemAddress(group),
      toViemBigInt(totalEpochRewards),
      toViemBigInt(groupScore),
    ])
    return valueToBigNumber(res.toString())
  }

  private _revokePending: (...args: any[]) => CeloTransactionObject<boolean> = proxySend(
    this.connection,
    this.contract,
    'revokePending'
  )
  private _revokeActive: (...args: any[]) => CeloTransactionObject<boolean> = proxySend(
    this.connection,
    this.contract,
    'revokeActive'
  )
  private _vote: (...args: any[]) => CeloTransactionObject<boolean> = proxySend(
    this.connection,
    this.contract,
    'vote'
  )

  /**
   * Returns the minimum and maximum number of validators that can be elected.
   * @returns The minimum and maximum number of validators that can be elected.
   */
  async electableValidators(): Promise<ElectableValidators> {
    return this._electableValidators()
  }

  /**
   * Returns the current election threshold.
   * @returns Election threshold.
   */
  electabilityThreshold = async () => {
    const res = await this.contract.read.getElectabilityThreshold()
    return fixidityValueToBigNumber(res.toString())
  }

  /**
   * Gets a validator address from the validator set at the given block number.
   * @param index Index of requested validator in the validator set.
   * @param blockNumber Block number to retrieve the validator set from.
   * @return Address of validator at the requested index.
   */
  validatorSignerAddressFromSet = async (
    signerIndex: number,
    blockNumber: number
  ): Promise<StrongAddress> => {
    return this.contract.read.validatorSignerAddressFromSet([
      toViemBigInt(signerIndex),
      toViemBigInt(blockNumber),
    ])
  }

  /**
   * Gets a validator address from the current validator set.
   * @param index Index of requested validator in the validator set.
   * @return Address of validator at the requested index.
   */
  validatorSignerAddressFromCurrentSet = async (index: number): Promise<StrongAddress> => {
    return this.contract.read.validatorSignerAddressFromCurrentSet([toViemBigInt(index)])
  }

  /**
   * Gets the size of the validator set that must sign the given block number.
   * @param blockNumber Block number to retrieve the validator set from.
   * @return Size of the validator set.
   */
  numberValidatorsInSet = async (blockNumber: number): Promise<number> => {
    const res = await this.contract.read.numberValidatorsInSet([toViemBigInt(blockNumber)])
    return valueToInt(res.toString())
  }

  /**
   * Gets the size of the current elected validator set.
   * @return Size of the current elected validator set.
   */
  numberValidatorsInCurrentSet = async (): Promise<number> => {
    const res = await this.contract.read.numberValidatorsInCurrentSet()
    return valueToInt(res.toString())
  }

  /**
   * Returns the total votes received across all groups.
   * @return The total votes received across all groups.
   */
  getTotalVotes = async () => {
    const res = await this.contract.read.getTotalVotes()
    return valueToBigNumber(res.toString())
  }

  /**
   * Returns the current validator signers using the precompiles.
   * @return List of current validator signers.
   * @deprecated use EpochManagerWrapper.getElectedSigners instead. see see https://specs.celo.org/smart_contract_updates_from_l1.html
   */
  getCurrentValidatorSigners = async () => {
    const res = await this.contract.read.getCurrentValidatorSigners()
    return [...res] as string[]
  }

  /**
   * Returns the validator signers for block `blockNumber`.
   * @param blockNumber Block number to retrieve signers for.
   * @return Address of each signer in the validator set.
   * @deprecated see https://specs.celo.org/smart_contract_updates_from_l1.html
   */
  async getValidatorSigners(blockNumber: number): Promise<Address[]> {
    const numValidators = await this.numberValidatorsInSet(blockNumber)
    return concurrentMap(10, zeroRange(numValidators), (i: number) =>
      this.validatorSignerAddressFromSet(i, blockNumber)
    )
  }

  /**
   * Returns a list of elected validators with seats allocated to groups via the D'Hondt method.
   * @return The list of elected validators.
   * @dev See https://en.wikipedia.org/wiki/D%27Hondt_method#Allocation for more information.
   */
  async electValidatorSigners(min?: number, max?: number): Promise<Address[]> {
    if (min !== undefined || max !== undefined) {
      const config = await this.getConfig()
      const minArg = min === undefined ? config.electableValidators.min : min
      const maxArg = max === undefined ? config.electableValidators.max : max
      return this._electNValidatorSigners(minArg.toString(10), maxArg.toString(10))
    } else {
      return this._electValidatorSigners()
    }
  }

  /**
   * Returns the total votes for `group`.
   * @param group The address of the validator group.
   * @return The total votes for `group`.
   */
  async getTotalVotesForGroup(group: Address, _blockNumber?: number): Promise<BigNumber> {
    return this._getTotalVotesForGroup(group)
  }

  /**
   * Returns the total votes for `group` made by `account`.
   * @param group The address of the validator group.
   * @param account The address of the voting account.
   * @return The total votes for `group` made by `account`.
   */
  getTotalVotesForGroupByAccount = async (group: string, account: string) => {
    const res = await this.contract.read.getTotalVotesForGroupByAccount([
      toViemAddress(group),
      toViemAddress(account),
    ])
    return valueToBigNumber(res.toString())
  }

  /**
   * Returns the active votes for `group`.
   * @param group The address of the validator group.
   * @return The active votes for `group`.
   */
  async getActiveVotesForGroup(group: Address, _blockNumber?: number): Promise<BigNumber> {
    return this._getActiveVotesForGroup(group)
  }

  /**
   * Returns the groups that `account` has voted for.
   * @param account The address of the account casting votes.
   * @return The groups that `account` has voted for.
   */
  getGroupsVotedForByAccount = async (account: string) => {
    const res = await this.contract.read.getGroupsVotedForByAccount([toViemAddress(account)])
    return [...res] as string[]
  }

  async getVotesForGroupByAccount(
    account: Address,
    group: Address,
    _blockNumber?: number
  ): Promise<GroupVote> {
    const pending = await this._getPendingVotesForGroupByAccount(group, account)
    const active = await this._getActiveVotesForGroupByAccount(group, account)

    return {
      group,
      pending,
      active,
    }
  }

  async getVoter(account: Address, blockNumber?: number): Promise<Voter> {
    const groups: Address[] = await this._getGroupsVotedForByAccountInternal(account)

    const votes = await concurrentMap(10, groups, (g) =>
      this.getVotesForGroupByAccount(account, g, blockNumber)
    )
    return { address: account, votes }
  }

  getTotalVotesByAccount = async (account: string) => {
    const res = await this.contract.read.getTotalVotesByAccount([toViemAddress(account)])
    return valueToBigNumber(res.toString())
  }

  /**
   * Returns whether or not the account has any pending votes.
   * @param account The address of the account casting votes.
   * @return The groups that `account` has voted for.
   */
  async hasPendingVotes(account: Address): Promise<boolean> {
    const groups: string[] = await this._getGroupsVotedForByAccountInternal(account)
    const isPending = await Promise.all(
      groups.map(async (g) =>
        (await this._getPendingVotesForGroupByAccount(g, account)).isGreaterThan(0)
      )
    )
    return isPending.some((a: boolean) => a)
  }

  async hasActivatablePendingVotes(account: Address): Promise<boolean> {
    const groups = await this._getGroupsVotedForByAccountInternal(account)
    const isActivatable = await Promise.all(
      groups.map((g: string) => this._hasActivatablePendingVotes(account, g))
    )
    return isActivatable.some((a: boolean) => a)
  }

  /**
   * Returns current configuration parameters.
   */
  async getConfig(): Promise<ElectionConfig> {
    const res = await Promise.all([
      this.electableValidators(),
      this.electabilityThreshold(),
      this._maxNumGroupsVotedFor(),
      this.getTotalVotes(),
    ])
    return {
      electableValidators: res[0],
      electabilityThreshold: res[1],
      maxNumGroupsVotedFor: res[2],
      totalVotes: res[3],
      currentThreshold: res[3].multipliedBy(res[1]),
    }
  }

  async getValidatorGroupVotes(address: Address): Promise<ValidatorGroupVote> {
    const votes = await this._getTotalVotesForGroup(address)
    const eligible = await this._getGroupEligibility(address)
    const numVotesReceivable = await this._getNumVotesReceivable(address)
    const accounts = await this.contracts.getAccounts()
    const name = (await accounts.getName(address)) || ''
    return {
      address,
      name,
      votes,
      capacity: numVotesReceivable.minus(votes),
      eligible,
    }
  }
  /**
   * Returns the current registered validator groups and their total votes and eligibility.
   */
  async getValidatorGroupsVotes(): Promise<ValidatorGroupVote[]> {
    const validators = await this.contracts.getValidators()
    const groups = await validators.getRegisteredValidatorGroupsAddresses()
    return concurrentMap(5, groups, (g) => this.getValidatorGroupVotes(g as string))
  }

  private _activate = proxySend(this.connection, this.contract, 'activate')

  private _activateForAccount = proxySend(this.connection, this.contract, 'activateForAccount')

  /**
   * Activates any activatable pending votes.
   * @param account The account with pending votes to activate.
   */
  async activate(
    account: Address,
    onBehalfOfAccount?: boolean
  ): Promise<CeloTransactionObject<boolean>[]> {
    const groups = await this._getGroupsVotedForByAccountInternal(account)
    const isActivatable = await Promise.all(
      groups.map((g: string) => this._hasActivatablePendingVotes(account, g))
    )
    const groupsActivatable = groups.filter((_: string, i: number) => isActivatable[i])
    return groupsActivatable.map((g: string) =>
      onBehalfOfAccount ? this._activateForAccount(g, account) : this._activate(g)
    ) as CeloTransactionObject<boolean>[]
  }

  async revokePending(
    account: Address,
    group: Address,
    value: BigNumber
  ): Promise<CeloTransactionObject<boolean>> {
    const groups = await this._getGroupsVotedForByAccountInternal(account)
    const index = findAddressIndex(group, groups)
    const { lesser, greater } = await this.findLesserAndGreaterAfterVote(group, value.times(-1))

    return this._revokePending(
      group,
      value.toFixed(),
      lesser,
      greater,
      index
    ) as CeloTransactionObject<boolean>
  }

  /**
   * Creates a transaction object for revoking active votes.
   * @param account Account to revoke votes for.
   * @param group Validator group to revoke votes from.
   * @param value Amount to be removed from active votes.
   * @param lesserAfterVote First group address with less vote than `account`.
   * @param greaterAfterVote First group address with more vote than `account`.
   * @dev Must pass both `lesserAfterVote` and `greaterAfterVote` or neither.
   */
  async revokeActive(
    account: Address,
    group: Address,
    value: BigNumber,
    lesserAfterVote?: Address,
    greaterAfterVote?: Address
  ): Promise<CeloTransactionObject<boolean>> {
    let lesser: Address, greater: Address

    const groups = await this._getGroupsVotedForByAccountInternal(account)
    const index = findAddressIndex(group, groups)
    if (lesserAfterVote !== undefined && greaterAfterVote !== undefined) {
      lesser = lesserAfterVote
      greater = greaterAfterVote
    } else {
      const res = await this.findLesserAndGreaterAfterVote(group, value.times(-1))
      lesser = res.lesser
      greater = res.greater
    }
    return this._revokeActive(
      group,
      value.toFixed(),
      lesser,
      greater,
      index
    ) as CeloTransactionObject<boolean>
  }

  async revoke(
    account: Address,
    group: Address,
    value: BigNumber
  ): Promise<CeloTransactionObject<boolean>[]> {
    const vote = await this.getVotesForGroupByAccount(account, group)
    if (value.gt(vote.pending.plus(vote.active))) {
      throw new Error(`can't revoke more votes for ${group} than have been made by ${account}`)
    }
    const txos = []
    const pendingValue = BigNumber.minimum(vote.pending, value)
    if (!pendingValue.isZero()) {
      txos.push(await this.revokePending(account, group, pendingValue))
    }
    if (pendingValue.lt(value)) {
      const activeValue = value.minus(pendingValue)
      const { lesser, greater } = await this.findLesserAndGreaterAfterVote(group, value.times(-1))
      txos.push(await this.revokeActive(account, group, activeValue, lesser, greater))
    }
    return txos
  }

  /**
   * Increments the number of total and pending votes for `group`.
   * @param validatorGroup The validator group to vote for.
   * @param value The amount of gold to use to vote.
   */
  async vote(validatorGroup: Address, value: BigNumber): Promise<CeloTransactionObject<boolean>> {
    const { lesser, greater } = await this.findLesserAndGreaterAfterVote(validatorGroup, value)

    return this._vote(
      validatorGroup,
      value.toFixed(),
      lesser,
      greater
    ) as CeloTransactionObject<boolean>
  }

  /**
   * Returns the current eligible validator groups and their total votes.
   */
  async getEligibleValidatorGroupsVotes(): Promise<ValidatorGroupVote[]> {
    const res = await this._getTotalVotesForEligibleValidatorGroups()
    return zip(
      (a: string, b: string) => ({
        address: a,
        name: '',
        votes: new BigNumber(b),
        capacity: new BigNumber(0),
        eligible: true as const,
      }),
      res[0] as string[],
      res[1] as string[]
    )
  }

  async findLesserAndGreaterAfterVote(
    votedGroup: Address,
    voteWeight: BigNumber
  ): Promise<{ lesser: Address; greater: Address }> {
    const currentVotes = await this.getEligibleValidatorGroupsVotes()
    const selectedGroup = currentVotes.find((votes) => eqAddress(votes.address, votedGroup))
    const voteTotal = selectedGroup ? selectedGroup.votes.plus(voteWeight) : voteWeight
    let greaterKey = NULL_ADDRESS
    let lesserKey = NULL_ADDRESS

    // This leverages the fact that the currentVotes are already sorted from
    // greatest to lowest value
    for (const vote of currentVotes) {
      if (!eqAddress(vote.address, votedGroup)) {
        if (vote.votes.isLessThanOrEqualTo(voteTotal)) {
          lesserKey = vote.address as StrongAddress
          break
        }
        greaterKey = vote.address as StrongAddress
      }
    }

    return { lesser: lesserKey, greater: greaterKey }
  }

  /**
   * Retrieves GroupVoterRewards at epochNumber.
   * @param epochNumber The epoch to retrieve GroupVoterRewards at.
   */
  async getGroupVoterRewards(
    epochNumber: number,
    useBlockNumber?: boolean
  ): Promise<GroupVoterReward[]> {
    const epochManager = await this.contracts.getEpochManager()
    const blockNumber = await epochManager.getLastBlockAtEpoch(epochNumber)
    const events = await this.getPastEvents('EpochRewardsDistributedToVoters', {
      fromBlock: blockNumber,
      toBlock: blockNumber,
    })
    const validators = await this.contracts.getValidators()
    const validatorGroup: ValidatorGroup[] = await concurrentMap(10, events, (e: EventLog) => {
      return validators.getValidatorGroup(
        e.returnValues.group,
        false,
        useBlockNumber ? blockNumber : undefined
      )
    })
    return events.map(
      (e: EventLog, index: number): GroupVoterReward => ({
        epochNumber,
        group: validatorGroup[index],
        groupVoterPayment: valueToBigNumber(e.returnValues.value),
      })
    )
  }

  /**
   * Retrieves VoterRewards for address at epochNumber.
   * @param address The address to retrieve VoterRewards for.
   * @param epochNumber The epoch to retrieve VoterRewards at.
   * @param voterShare Optionally address' share of group rewards.
   */
  async getVoterRewards(
    address: Address,
    epochNumber: number,
    useBlockNumber?: boolean,
    voterShare?: Record<Address, BigNumber>
  ): Promise<VoterReward[]> {
    const activeVoteShare =
      voterShare ||
      (await this.getVoterShare(
        address,
        await (await this.contracts.getEpochManager()).getLastBlockAtEpoch(epochNumber)
      ))
    const groupVoterRewards = await this.getGroupVoterRewards(epochNumber, useBlockNumber)
    const voterRewards = groupVoterRewards.filter(
      (e: GroupVoterReward) => normalizeAddressWith0x(e.group.address) in activeVoteShare
    )
    return voterRewards.map((e: GroupVoterReward): VoterReward => {
      const group = normalizeAddressWith0x(e.group.address)
      return {
        address,
        addressPayment: e.groupVoterPayment.times(activeVoteShare[group]),
        group: e.group,
        epochNumber: e.epochNumber,
      }
    })
  }

  /**
   * Retrieves a voter's share of active votes.
   * @param address The voter to retrieve share for.
   * @param blockNumber The block to retrieve the voter's share at.
   */
  async getVoterShare(address: Address, blockNumber?: number): Promise<Record<Address, BigNumber>> {
    const activeVoterVotes: Record<Address, BigNumber> = {}
    const voter = await this.getVoter(address, blockNumber)
    for (const vote of voter.votes) {
      const group: string = normalizeAddressWith0x(vote.group)
      activeVoterVotes[group] = vote.active
    }
    return concurrentValuesMap(
      10,
      activeVoterVotes,
      async (voterVotes: BigNumber, group: Address) =>
        voterVotes.dividedBy(await this.getActiveVotesForGroup(group, blockNumber))
    )
  }

  async getGroupEpochRewards(
    group: Address,
    totalEpochRewards: BigNumber,
    groupScore: BigNumber
  ): Promise<BigNumber> {
    return this._getGroupEpochRewardsBasedOnScore(
      group,
      totalEpochRewards.toFixed(),
      groupScore.toFixed()
    )
  }
}

export type ElectionWrapperType = ElectionWrapper
