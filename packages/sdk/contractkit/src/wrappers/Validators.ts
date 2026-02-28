import { validatorsABI } from '@celo/abis'
import { eqAddress, findAddressIndex, NULL_ADDRESS } from '@celo/base/lib/address'
import { concurrentMap } from '@celo/base/lib/async'
import { zeroRange, zip } from '@celo/base/lib/collections'
import { Address, CeloTransactionObject, EventLog } from '@celo/connect'
import { fromFixed, toFixed } from '@celo/utils/lib/fixidity'
import BigNumber from 'bignumber.js'
import {
  blocksToDurationString,
  secondsToDurationString,
  stringToSolidityBytes,
  toViemAddress,
  toViemBigInt,
  valueToBigNumber,
  valueToFixidityString,
  valueToInt,
} from './BaseWrapper'
import { BaseWrapperForGoverning } from './BaseWrapperForGoverning'

export interface Validator {
  name: string
  address: Address
  ecdsaPublicKey: string
  affiliation: string | null
  score: BigNumber
  signer: Address
}

export interface ValidatorGroup {
  name: string
  address: Address
  members: Address[]
  membersUpdated: number
  affiliates: Address[]
  commission: BigNumber
  nextCommission: BigNumber
  nextCommissionBlock: BigNumber
  lastSlashed: BigNumber
  slashingMultiplier: BigNumber
}

export interface ValidatorReward {
  validator: Validator
  validatorPayment: BigNumber
  group: ValidatorGroup
  groupPayment: BigNumber
  epochNumber: number
}

export interface LockedGoldRequirements {
  value: BigNumber
  duration: BigNumber
}

export interface ValidatorsConfig {
  groupLockedGoldRequirements: LockedGoldRequirements
  validatorLockedGoldRequirements: LockedGoldRequirements
  maxGroupSize: BigNumber
  membershipHistoryLength: BigNumber
  slashingMultiplierResetPeriod: BigNumber
  commissionUpdateDelay: BigNumber
  downtimeGracePeriod: BigNumber
}

export interface GroupMembership {
  epoch: number
  group: Address
}

export interface MembershipHistoryExtraData {
  lastRemovedFromGroupTimestamp: number
  tail: number
}

/**
 * Contract for voting for validators and managing validator groups.
 */
// TODO(asa): Support validator signers
export class ValidatorsWrapper extends BaseWrapperForGoverning<typeof validatorsABI> {
  // --- private proxy fields for typed contract calls ---
  private _getValidatorLockedGoldRequirements = async (): Promise<LockedGoldRequirements> => {
    const res = await this.contract.read.getValidatorLockedGoldRequirements()
    return {
      value: valueToBigNumber(res[0].toString()),
      duration: valueToBigNumber(res[1].toString()),
    }
  }

  private _getGroupLockedGoldRequirements = async (): Promise<LockedGoldRequirements> => {
    const res = await this.contract.read.getGroupLockedGoldRequirements()
    return {
      value: valueToBigNumber(res[0].toString()),
      duration: valueToBigNumber(res[1].toString()),
    }
  }

  private _maxGroupSize = async () => {
    const res = await this.contract.read.maxGroupSize()
    return valueToBigNumber(res.toString())
  }

  private _membershipHistoryLength = async () => {
    const res = await this.contract.read.membershipHistoryLength()
    return valueToBigNumber(res.toString())
  }

  private _getValidator = async (address: string) => {
    const res = await this.contract.read.getValidator([toViemAddress(address)])
    return {
      ecdsaPublicKey: res[0] as string,
      affiliation: res[2] as string,
      score: res[3].toString(),
      signer: res[4] as string,
    }
  }

  private _getValidatorsGroup = async (address: string) =>
    this.contract.read.getValidatorsGroup([toViemAddress(address)])

  private _getMembershipInLastEpoch = async (address: string) =>
    this.contract.read.getMembershipInLastEpoch([toViemAddress(address)])

  private _getValidatorGroup = async (address: string) => {
    const res = await this.contract.read.getValidatorGroup([toViemAddress(address)])
    return {
      0: [...res[0]] as string[],
      1: res[1].toString(),
      2: res[2].toString(),
      3: res[3].toString(),
      4: [...res[4]].map((v) => v.toString()),
      5: res[5].toString(),
      6: res[6].toString(),
    }
  }

  private _getRegisteredValidators = async () => {
    const res = await this.contract.read.getRegisteredValidators()
    return [...res] as string[]
  }

  private _numberValidatorsInCurrentSet = async () => {
    const res = await this.contract.read.numberValidatorsInCurrentSet()
    return valueToInt(res.toString())
  }

  private _validatorSignerAddressFromCurrentSet = async (index: number) =>
    this.contract.read.validatorSignerAddressFromCurrentSet([toViemBigInt(index)])

  private _deregisterValidator = (...args: any[]) => this.buildTx('deregisterValidator', args)

  private _registerValidatorGroup = (...args: any[]) => this.buildTx('registerValidatorGroup', args)

  private _deregisterValidatorGroup = (...args: any[]) =>
    this.buildTx('deregisterValidatorGroup', args)

  private _addFirstMember = (...args: any[]) => this.buildTx('addFirstMember', args)

  private _addMember = (...args: any[]) => this.buildTx('addMember', args)

  private _reorderMember = (...args: any[]) => this.buildTx('reorderMember', args)

  /**
   * Queues an update to a validator group's commission.
   * @param commission Fixidity representation of the commission this group receives on epoch
   *   payments made to its members. Must be in the range [0, 1.0].
   */
  setNextCommissionUpdate = (commission: BigNumber.Value) =>
    this.buildTx('setNextCommissionUpdate', [valueToFixidityString(commission)])

  /**
   * Updates a validator group's commission based on the previously queued update
   */
  updateCommission = () => this.buildTx('updateCommission', [])

  /**
   * Returns the Locked Gold requirements for validators.
   * @returns The Locked Gold requirements for validators.
   */
  async getValidatorLockedGoldRequirements(): Promise<LockedGoldRequirements> {
    return this._getValidatorLockedGoldRequirements()
  }

  /**
   * Returns the Locked Gold requirements for validator groups.
   * @returns The Locked Gold requirements for validator groups.
   */
  async getGroupLockedGoldRequirements(): Promise<LockedGoldRequirements> {
    return this._getGroupLockedGoldRequirements()
  }

  /**
   * Returns the Locked Gold requirements for specific account.
   * @returns The Locked Gold requirements for a specific account.
   */
  getAccountLockedGoldRequirement = async (account: string) => {
    const res = await this.contract.read.getAccountLockedGoldRequirement([toViemAddress(account)])
    return valueToBigNumber(res.toString())
  }

  /**
   * Returns the reset period, in seconds, for slashing multiplier.
   */
  getSlashingMultiplierResetPeriod = async () => {
    const res = await this.contract.read.slashingMultiplierResetPeriod()
    return valueToBigNumber(res.toString())
  }

  /**
   * Returns the update delay, in blocks, for the group commission.
   */
  getCommissionUpdateDelay = async () => {
    const res = await this.contract.read.commissionUpdateDelay()
    return valueToBigNumber(res.toString())
  }

  /**
   * Returns the validator downtime grace period
   */
  getDowntimeGracePeriod = async () => {
    const res = await this.contract.read.deprecated_downtimeGracePeriod()
    return valueToBigNumber(res.toString())
  }

  /**
   * Returns current configuration parameters.
   */
  async getConfig(): Promise<ValidatorsConfig> {
    const res = await Promise.all([
      this.getValidatorLockedGoldRequirements(),
      this.getGroupLockedGoldRequirements(),
      this._maxGroupSize(),
      this._membershipHistoryLength(),
      this.getSlashingMultiplierResetPeriod(),
      this.getCommissionUpdateDelay(),
      this.getDowntimeGracePeriod(),
    ])
    return {
      validatorLockedGoldRequirements: res[0],
      groupLockedGoldRequirements: res[1],
      maxGroupSize: res[2],
      membershipHistoryLength: res[3],
      slashingMultiplierResetPeriod: res[4],
      commissionUpdateDelay: res[5],
      downtimeGracePeriod: res[6],
    }
  }

  /**
   * @dev Returns human readable configuration of the validators contract
   * @return ValidatorsConfig object
   */
  async getHumanReadableConfig() {
    const config = await this.getConfig()
    const validatorLockedGoldRequirements = {
      ...config.validatorLockedGoldRequirements,
      duration: secondsToDurationString(config.validatorLockedGoldRequirements.duration),
    }
    const groupLockedGoldRequirements = {
      ...config.groupLockedGoldRequirements,
      duration: secondsToDurationString(config.groupLockedGoldRequirements.duration),
    }
    return {
      ...config,
      slashingMultiplierResetPeriod: secondsToDurationString(config.slashingMultiplierResetPeriod),
      commissionUpdateDelay: blocksToDurationString(config.commissionUpdateDelay),
      validatorLockedGoldRequirements,
      groupLockedGoldRequirements,
    }
  }

  /**
   * Returns the account associated with `signer`.
   * @param signer The address of an account or currently authorized validator signer.
   * @dev Fails if the `signer` is not an account or currently authorized validator.
   * @return The associated account.
   */
  async validatorSignerToAccount(signerAddress: Address) {
    const accounts = await this.contracts.getAccounts()
    return accounts.validatorSignerToAccount(signerAddress)
  }

  /**
   * Returns the account associated with `signer`.
   * @param signer The address of the account or previously authorized signer.
   * @dev Fails if the `signer` is not an account or previously authorized signer.
   * @return The associated account.
   */
  async signerToAccount(signerAddress: Address) {
    const accounts = await this.contracts.getAccounts()
    return accounts.signerToAccount(signerAddress)
  }

  /**
   * Returns whether a particular account has a registered validator.
   * @param account The account.
   * @return Whether a particular address is a registered validator.
   */
  isValidator = async (account: string): Promise<boolean> =>
    this.contract.read.isValidator([toViemAddress(account)])

  /**
   * Returns whether a particular account has a registered validator group.
   * @param account The account.
   * @return Whether a particular address is a registered validator group.
   */
  isValidatorGroup = async (account: string): Promise<boolean> =>
    this.contract.read.isValidatorGroup([toViemAddress(account)])

  /**
   * Returns whether an account meets the requirements to register a validator.
   * @param account The account.
   * @return Whether an account meets the requirements to register a validator.
   */
  meetsValidatorBalanceRequirements = async (address: Address) => {
    const lockedGold = await this.contracts.getLockedGold()
    const total = await lockedGold.getAccountTotalLockedGold(address)
    const reqs = await this.getValidatorLockedGoldRequirements()
    return reqs.value.lte(total)
  }

  /**
   * Returns whether an account meets the requirements to register a group.
   * @param account The account.
   * @return Whether an account meets the requirements to register a group.
   */

  meetsValidatorGroupBalanceRequirements = async (address: Address) => {
    const lockedGold = await this.contracts.getLockedGold()
    const total = await lockedGold.getAccountTotalLockedGold(address)
    const reqs = await this.getGroupLockedGoldRequirements()
    return reqs.value.lte(total)
  }

  /** Get Validator information */
  async getValidator(address: Address, blockNumber?: number): Promise<Validator> {
    // @ts-ignore: Expected 0-1 arguments, but got 2
    const res = await this._getValidator(address)
    const accounts = await this.contracts.getAccounts()
    const name = (await accounts.getName(address, blockNumber)) || ''

    return {
      name,
      address,
      ecdsaPublicKey: res.ecdsaPublicKey,
      affiliation: res.affiliation,
      score: fromFixed(new BigNumber(res.score)),
      signer: res.signer,
    }
  }

  async getValidatorsGroup(address: Address): Promise<Address> {
    return this._getValidatorsGroup(address)
  }

  async getMembershipInLastEpoch(address: Address): Promise<Address> {
    return this._getMembershipInLastEpoch(address)
  }

  async getValidatorFromSigner(address: Address, blockNumber?: number): Promise<Validator> {
    const account = await this.signerToAccount(address)
    if (eqAddress(account, NULL_ADDRESS) || !(await this.isValidator(account))) {
      return {
        name: 'Unregistered validator',
        address,
        ecdsaPublicKey: '',
        affiliation: '',
        score: new BigNumber(0),
        signer: address,
      }
    } else {
      return this.getValidator(account, blockNumber)
    }
  }

  /** Get ValidatorGroup information */
  async getValidatorGroup(
    address: Address,
    getAffiliates: boolean = true,
    blockNumber?: number
  ): Promise<ValidatorGroup> {
    // @ts-ignore: Expected 0-1 arguments, but got 2
    const res = await this._getValidatorGroup(address)
    const accounts = await this.contracts.getAccounts()
    const name = (await accounts.getName(address, blockNumber)) || ''
    let affiliates: Validator[] = []
    if (getAffiliates) {
      const validators = await this.getRegisteredValidators(blockNumber)
      affiliates = validators
        .filter((v) => v.affiliation && eqAddress(v.affiliation, address))
        .filter((v) => !res[0].includes(v.address))
    }
    return {
      name,
      address,
      members: Array.from(res[0]),
      commission: fromFixed(new BigNumber(res[1])),
      nextCommission: fromFixed(new BigNumber(res[2])),
      nextCommissionBlock: new BigNumber(res[3]),
      membersUpdated: res[4].reduce(
        (a: number, b: BigNumber.Value) => Math.max(a, new BigNumber(b).toNumber()),
        0
      ),
      affiliates: affiliates.map((v) => v.address),
      slashingMultiplier: fromFixed(new BigNumber(res[5])),
      lastSlashed: valueToBigNumber(res[6]),
    }
  }

  /**
   * Returns the Validator's group membership history
   * @param validator The validator whose membership history to return.
   * @return The group membership history of a validator.
   */
  getValidatorMembershipHistory = async (validator: Address): Promise<GroupMembership[]> => {
    const res = await this.contract.read.getMembershipHistory([toViemAddress(validator)])
    return zip(
      (epoch, group): GroupMembership => ({ epoch: valueToInt(epoch.toString()), group }),
      [...res[0]],
      [...res[1]]
    )
  }

  /**
   * Returns extra data from the Validator's group membership history
   * @param validator The validator whose membership history to return.
   * @return The group membership history of a validator.
   */
  getValidatorMembershipHistoryExtraData = async (
    validator: Address
  ): Promise<MembershipHistoryExtraData> => {
    const res = await this.contract.read.getMembershipHistory([toViemAddress(validator)])
    return {
      lastRemovedFromGroupTimestamp: valueToInt(res[2].toString()),
      tail: valueToInt(res[3].toString()),
    }
  }

  /** Get the size (amount of members) of a ValidatorGroup */
  getValidatorGroupSize = async (group: Address): Promise<number> => {
    const res = await this.contract.read.getGroupNumMembers([toViemAddress(group)])
    return valueToInt(res.toString())
  }

  /** Get list of registered validator addresses */
  async getRegisteredValidatorsAddresses(_blockNumber?: number): Promise<Address[]> {
    // @ts-ignore: Expected 0-1 arguments, but got 2
    return this._getRegisteredValidators()
  }

  /** Get list of registered validator group addresses */
  getRegisteredValidatorGroupsAddresses = async () => {
    const res = await this.contract.read.getRegisteredValidatorGroups()
    return [...res] as string[]
  }

  /** Get list of registered validators */
  async getRegisteredValidators(blockNumber?: number): Promise<Validator[]> {
    const vgAddresses = await this.getRegisteredValidatorsAddresses(blockNumber)
    return concurrentMap(10, vgAddresses, (addr) => this.getValidator(addr, blockNumber))
  }

  /** Get list of registered validator groups */
  async getRegisteredValidatorGroups(): Promise<ValidatorGroup[]> {
    const vgAddresses = await this.getRegisteredValidatorGroupsAddresses()
    return concurrentMap(10, vgAddresses, (addr) => this.getValidatorGroup(addr, false))
  }

  /**
   * Registers a validator unaffiliated with any validator group.
   *
   * Fails if the account is already a validator or validator group.
   *
   * @param validatorAddress The address that the validator is using for consensus, should match
   *   the validator signer.
   * @param ecdsaPublicKey The ECDSA public key that the validator is using for consensus. 64 bytes.
   */
  registerValidator = (ecdsaPublicKey: string) =>
    this.buildTx('registerValidator', [
      stringToSolidityBytes(ecdsaPublicKey),
    ]) as unknown as CeloTransactionObject<boolean>

  registerValidatorNoBls = (ecdsaPublicKey: string) =>
    this.buildTx('registerValidatorNoBls', [
      stringToSolidityBytes(ecdsaPublicKey),
    ]) as unknown as CeloTransactionObject<boolean>

  getEpochNumber = async () => {
    const res = await this.contract.read.getEpochNumber()
    return valueToBigNumber(res.toString())
  }

  getEpochSize = async () => {
    const res = await this.contract.read.getEpochSize()
    return valueToBigNumber(res.toString())
  }

  /**
   * De-registers a validator, removing it from the group for which it is a member.
   * @param validatorAddress Address of the validator to deregister
   */
  async deregisterValidator(validatorAddress: Address): Promise<CeloTransactionObject<void>> {
    const allValidators = await this.getRegisteredValidatorsAddresses()
    const idx = findAddressIndex(validatorAddress, allValidators)

    if (idx < 0) {
      throw new Error(`${validatorAddress} is not a registered validator`)
    }
    return this._deregisterValidator(idx)
  }

  /**
   * Registers a validator group with no member validators.
   * Fails if the account is already a validator or validator group.
   * Fails if the account does not have sufficient weight.
   *
   * @param commission the commission this group receives on epoch payments made to its members.
   */
  async registerValidatorGroup(commission: BigNumber): Promise<CeloTransactionObject<boolean>> {
    return this._registerValidatorGroup(
      toFixed(commission).toFixed()
    ) as unknown as CeloTransactionObject<boolean>
  }

  /**
   * De-registers a validator Group
   * @param validatorGroupAddress Address of the validator group to deregister
   */
  async deregisterValidatorGroup(
    validatorGroupAddress: Address
  ): Promise<CeloTransactionObject<void>> {
    const allGroups = await this.getRegisteredValidatorGroupsAddresses()
    const idx = findAddressIndex(validatorGroupAddress, allGroups)

    if (idx < 0) {
      throw new Error(`${validatorGroupAddress} is not a registered validator`)
    }
    return this._deregisterValidatorGroup(idx)
  }

  /**
   * Affiliates a validator with a group, allowing it to be added as a member.
   * De-affiliates with the previously affiliated group if present.
   * @param group The validator group with which to affiliate.
   */
  affiliate = (group: Address) =>
    this.buildTx('affiliate', [group]) as unknown as CeloTransactionObject<boolean>

  /**
   * De-affiliates a validator, removing it from the group for which it is a member.
   * Fails if the account is not a validator with non-zero affiliation.
   */

  deaffiliate = () => this.buildTx('deaffiliate', [])

  /**
   * Removes a validator from the group for which it is a member.
   * @param validatorAccount The validator to deaffiliate from their affiliated validator group.
   */
  forceDeaffiliateIfValidator = (validatorAccount: string) =>
    this.buildTx('forceDeaffiliateIfValidator', [validatorAccount])

  /**
   * Resets a group's slashing multiplier if it has been >= the reset period since
   * the last time the group was slashed.
   */
  resetSlashingMultiplier = () => this.buildTx('resetSlashingMultiplier', [])

  /**
   * Adds a member to the end of a validator group's list of members.
   * Fails if `validator` has not set their affiliation to this account.
   * @param validator The validator to add to the group
   */
  async addMember(group: Address, validator: Address): Promise<CeloTransactionObject<boolean>> {
    const numMembers = await this.getValidatorGroupSize(group)
    if (numMembers === 0) {
      const election = await this.contracts.getElection()
      const voteWeight = await election.getTotalVotesForGroup(group)
      const { lesser, greater } = await election.findLesserAndGreaterAfterVote(group, voteWeight)

      return this._addFirstMember(
        validator,
        lesser,
        greater
      ) as unknown as CeloTransactionObject<boolean>
    } else {
      return this._addMember(validator) as unknown as CeloTransactionObject<boolean>
    }
  }

  /**
   * Removes a member from a ValidatorGroup
   * The ValidatorGroup is specified by the `from` of the tx.
   *
   * @param validator The Validator to remove from the group
   */
  removeMember = (validator: string) => this.buildTx('removeMember', [validator])

  /**
   * Reorders a member within a validator group.
   * Fails if `validator` is not a member of the account's validator group.
   * @param groupAddr The validator group
   * @param validator The validator to reorder.
   * @param newIndex New position for the validator
   */
  async reorderMember(
    groupAddr: Address,
    validator: Address,
    newIndex: number
  ): Promise<CeloTransactionObject<void>> {
    const group = await this.getValidatorGroup(groupAddr)

    if (newIndex < 0 || newIndex >= group.members.length) {
      throw new Error(`Invalid index ${newIndex}; max index is ${group.members.length - 1}`)
    }

    const currentIdx = findAddressIndex(validator, group.members)
    if (currentIdx < 0) {
      throw new Error(`ValidatorGroup ${groupAddr} does not include ${validator}`)
    } else if (currentIdx === newIndex) {
      throw new Error(`Validator is already in position ${newIndex}`)
    }

    // remove the element
    group.members.splice(currentIdx, 1)
    // add it on new position
    group.members.splice(newIndex, 0, validator)

    const nextMember =
      newIndex === group.members.length - 1 ? NULL_ADDRESS : group.members[newIndex + 1]
    const prevMember = newIndex === 0 ? NULL_ADDRESS : group.members[newIndex - 1]

    return this._reorderMember(validator, nextMember, prevMember)
  }

  async getEpochSizeNumber(): Promise<number> {
    const epochSize = await this.getEpochSize()

    return epochSize.toNumber()
  }

  async getLastBlockNumberForEpoch(epochNumber: number): Promise<number> {
    const epochManagerWrapper = await this.contracts.getEpochManager()
    return epochManagerWrapper.getLastBlockAtEpoch(epochNumber)
  }

  async getEpochNumberOfBlock(blockNumber: number): Promise<number> {
    const epochManagerWrapper = await this.contracts.getEpochManager()
    return epochManagerWrapper.getEpochNumberOfBlock(blockNumber)
  }

  /**
   * Retrieves ValidatorRewards for epochNumber.
   * @param epochNumber The epoch to retrieve ValidatorRewards at.
   */
  async getValidatorRewards(
    epochNumber: number,
    useBlockNumber?: boolean
  ): Promise<ValidatorReward[]> {
    const blockNumber = await this.getLastBlockNumberForEpoch(epochNumber)
    const epochManager = await this.contracts.getEpochManager()
    const events = await epochManager.getPastEvents('ValidatorEpochPaymentDistributed', {
      fromBlock: blockNumber,
      toBlock: blockNumber,
    })
    const validator: Validator[] = await concurrentMap(10, events, (e: EventLog) => {
      return this.getValidator(e.returnValues.validator, useBlockNumber ? blockNumber : undefined)
    })
    const validatorGroup: ValidatorGroup[] = await concurrentMap(10, events, (e: EventLog) => {
      return this.getValidatorGroup(
        e.returnValues.group,
        false,
        useBlockNumber ? blockNumber : undefined
      )
    })
    return events.map(
      (e: EventLog, index: number): ValidatorReward => ({
        epochNumber,
        validator: validator[index],
        validatorPayment: valueToBigNumber(e.returnValues.validatorPayment),
        group: validatorGroup[index],
        groupPayment: valueToBigNumber(e.returnValues.groupPayment),
      })
    )
  }

  /**
   * Returns the current set of validator signer addresses
   */
  async currentSignerSet(): Promise<Address[]> {
    const n = await this._numberValidatorsInCurrentSet()
    return concurrentMap(5, zeroRange(n), (idx) => this._validatorSignerAddressFromCurrentSet(idx))
  }

  /**
   * Returns the current set of validator signer and account addresses
   */
  async currentValidatorAccountsSet() {
    const signerAddresses = await this.currentSignerSet()
    const accountAddresses = await concurrentMap(5, signerAddresses, (signer) =>
      this.validatorSignerToAccount(signer)
    )
    return zip((signer, account) => ({ signer, account }), signerAddresses, accountAddresses)
  }

  /**
   * Returns the group membership for validator account.
   * @param account Address of validator account to retrieve group membership for.
   * @param blockNumber Block number to retrieve group membership at.
   * @return Group and membership history index for `validator`.
   */
  async getValidatorMembershipHistoryIndex(
    account: Address,
    blockNumber?: number
  ): Promise<{ group: Address; historyIndex: number }> {
    const blockEpoch = await this.getEpochNumberOfBlock(
      blockNumber || (await this.connection.getBlockNumber())
    )
    const membershipHistory = await this.getValidatorMembershipHistory(account)
    const historyIndex = this.findValidatorMembershipHistoryIndex(blockEpoch, membershipHistory)
    const group = membershipHistory[historyIndex].group
    return { group, historyIndex }
  }

  /**
   * Returns the index into `history` for `epoch`.
   * @param epoch The needle.
   * @param history The haystack.
   * @return Index for epoch or -1.
   */
  findValidatorMembershipHistoryIndex(epoch: number, history: GroupMembership[]): number {
    const revIndex = history
      .slice()
      .reverse()
      .findIndex((x) => x.epoch <= epoch)
    return revIndex < 0 ? -1 : history.length - revIndex - 1
  }
}

export type ValidatorsWrapperType = ValidatorsWrapper
