import { lockedGoldABI } from '@celo/abis'
import {
  AddressListItem as ALI,
  Comparator,
  linkedListChanges as baseLinkedListChanges,
  zip,
} from '@celo/base/lib/collections'
import { Address, CeloTx, EventLog } from '@celo/connect'
import BigNumber from 'bignumber.js'
import {
  secondsToDurationString,
  toViemAddress,
  toViemBigInt,
  valueToBigNumber,
  valueToString,
} from '../wrappers/BaseWrapper'
import { BaseWrapperForGoverning } from './BaseWrapperForGoverning'

type AddressListItem = ALI<BigNumber>
const bigNumberComparator: Comparator<BigNumber> = (a: BigNumber, b: BigNumber) => a.lt(b)
function linkedListChanges(
  groups: AddressListItem[],
  changed: AddressListItem[]
): { lessers: string[]; greaters: string[]; list: AddressListItem[] } {
  return baseLinkedListChanges(groups, changed, bigNumberComparator)
}

export interface VotingDetails {
  accountAddress: Address
  voterAddress: Address
  /** vote's weight */
  weight: BigNumber
}

export interface DelegateInfo {
  totalPercentDelegated: string
  delegatees: string[]
  totalVotesDelegatedToThisAccount: BigNumber
}

interface AccountSummary {
  lockedGold: {
    total: BigNumber
    nonvoting: BigNumber
    requirement: BigNumber
  }
  totalGovernaneVotingPower: BigNumber
  pendingWithdrawals: PendingWithdrawal[]
}

export interface AccountSlashed {
  slashed: Address
  penalty: BigNumber
  reporter: Address
  reward: BigNumber
  epochNumber: number
}

export interface PendingWithdrawal {
  time: BigNumber
  value: BigNumber
}

export interface LockedGoldConfig {
  unlockingPeriod: BigNumber
  totalLockedGold: BigNumber
}

/**
 * Contract for handling deposits needed for voting.
 */

export class LockedGoldWrapper extends BaseWrapperForGoverning<typeof lockedGoldABI> {
  /**
   * Withdraws a gold that has been unlocked after the unlocking period has passed.
   * @param index The index of the pending withdrawal to withdraw.
   */
  withdraw = (index: number, txParams?: Omit<CeloTx, 'data'>) =>
    this.sendTx('withdraw', [index], txParams)

  /**
   * Locks gold to be used for voting.
   * The gold to be locked, must be specified as the `tx.value`
   */
  lock = (txParams?: Omit<CeloTx, 'data'>) => this.sendTx('lock', [], txParams)

  /**
   * Delegates locked gold.
   */
  delegate = (delegatee: string, percentAmount: string, txParams?: Omit<CeloTx, 'data'>) =>
    this.sendTx('delegateGovernanceVotes', [delegatee, percentAmount], txParams)

  /**
   * Updates the amount of delegated locked gold. There might be discrepancy between the amount of locked gold
   * and the amount of delegated locked gold because of received rewards.
   */
  updateDelegatedAmount = (delegator: string, delegatee: string, txParams?: Omit<CeloTx, 'data'>) =>
    this.sendTx('updateDelegatedAmount', [delegator, delegatee], txParams)

  /**
   * Revokes delegated locked gold.
   */
  revokeDelegated = (delegatee: string, percentAmount: string, txParams?: Omit<CeloTx, 'data'>) =>
    this.sendTx('revokeDelegatedGovernanceVotes', [delegatee, percentAmount], txParams)

  getMaxDelegateesCount = async () => {
    const maxDelegateesCountHex = await this.connection.getStorageAt(
      // @ts-ignore
      this.contract.address,
      10
    )
    return new BigNumber(maxDelegateesCountHex, 16)
  }

  private _getAccountTotalDelegatedFraction = async (account: string) => {
    const res = await this.contract.read.getAccountTotalDelegatedFraction([toViemAddress(account)])
    return res.toString()
  }

  private _getTotalDelegatedCelo = async (account: string) => {
    const res = await this.contract.read.totalDelegatedCelo([toViemAddress(account)])
    return res.toString()
  }

  private _getDelegateesOfDelegator = async (account: string) => {
    const res = await this.contract.read.getDelegateesOfDelegator([toViemAddress(account)])
    return [...res] as string[]
  }

  getDelegateInfo = async (account: string): Promise<DelegateInfo> => {
    const totalDelegatedFractionPromise = this._getAccountTotalDelegatedFraction(account)
    const totalDelegatedCeloPromise = this._getTotalDelegatedCelo(account)
    const delegateesPromise = this._getDelegateesOfDelegator(account)

    const fixidity = new BigNumber('1000000000000000000000000')

    return {
      totalPercentDelegated:
        new BigNumber(await totalDelegatedFractionPromise)
          .multipliedBy(100)
          .div(fixidity)
          .toFixed() + '%',
      delegatees: await delegateesPromise,
      totalVotesDelegatedToThisAccount: new BigNumber(await totalDelegatedCeloPromise),
    }
  }

  /**
   * Unlocks gold that becomes withdrawable after the unlocking period.
   * @param value The amount of gold to unlock.
   */
  unlock = (value: BigNumber.Value, txParams?: Omit<CeloTx, 'data'>) =>
    this.sendTx('unlock', [valueToString(value)], txParams)

  async getPendingWithdrawalsTotalValue(account: Address) {
    const pendingWithdrawals = await this.getPendingWithdrawals(account)
    // Ensure there are enough pending withdrawals to relock.
    const values = pendingWithdrawals.map((pw: PendingWithdrawal) => pw.value)
    const reducer = (total: BigNumber, pw: BigNumber) => pw.plus(total)
    return values.reduce(reducer, new BigNumber(0))
  }

  /**
   * Relocks gold that has been unlocked but not withdrawn.
   * @param value The value to relock from pending withdrawals.
   */
  async relock(
    account: Address,
    value: BigNumber.Value,
    txParams?: Omit<CeloTx, 'data'>
  ): Promise<`0x${string}`[]> {
    const pendingWithdrawals = await this.getPendingWithdrawals(account)
    // Ensure there are enough pending withdrawals to relock.
    const totalValue = await this.getPendingWithdrawalsTotalValue(account)
    if (totalValue.isLessThan(value)) {
      throw new Error(`Not enough pending withdrawals to relock ${value}`)
    }
    // Assert pending withdrawals are sorted by time (increasing), so that we can re-lock starting
    // with those furthest away from being available (at the end).
    const throwIfNotSorted = (pw: PendingWithdrawal, i: number) => {
      if (i > 0 && !pw.time.isGreaterThanOrEqualTo(pendingWithdrawals[i - 1].time)) {
        throw new Error('Pending withdrawals not sorted by timestamp')
      }
    }
    pendingWithdrawals.forEach(throwIfNotSorted)

    let remainingToRelock = new BigNumber(value)
    const relockOps: { index: number; value: BigNumber }[] = []
    // Use reduceRight to determine which withdrawals to relock (highest index first)
    pendingWithdrawals.reduceRight((_acc: null, pw: PendingWithdrawal, i: number) => {
      const valueToRelock = BigNumber.minimum(pw.value, remainingToRelock)
      if (!valueToRelock.isZero()) {
        remainingToRelock = remainingToRelock.minus(valueToRelock)
        relockOps.push({ index: i, value: valueToRelock })
      }
      return null
    }, null)
    // Send sequentially, preserving reduceRight ordering
    const hashes: `0x${string}`[] = []
    for (const op of relockOps) {
      hashes.push(await this._relock(op.index, op.value, txParams))
    }
    return hashes
  }

  /**
   * Relocks gold that has been unlocked but not withdrawn.
   * @param index The index of the pending withdrawal to relock from.
   * @param value The value to relock from the specified pending withdrawal.
   */
  _relock = (index: number, value: BigNumber.Value, txParams?: Omit<CeloTx, 'data'>) =>
    this.sendTx('relock', [valueToString(index), valueToString(value)], txParams)

  /**
   * Returns the total amount of locked gold for an account.
   * @param account The account.
   * @return The total amount of locked gold for an account.
   */
  getAccountTotalLockedGold = async (account: string) => {
    const res = await this.contract.read.getAccountTotalLockedGold([toViemAddress(account)])
    return valueToBigNumber(res.toString())
  }

  /**
   * Returns the total amount of locked gold in the system. Note that this does not include
   *   gold that has been unlocked but not yet withdrawn.
   * @returns The total amount of locked gold in the system.
   */
  getTotalLockedGold = async () => {
    const res = await this.contract.read.getTotalLockedGold()
    return valueToBigNumber(res.toString())
  }

  /**
   * Returns the total amount of non-voting locked gold for an account.
   * @param account The account.
   * @return The total amount of non-voting locked gold for an account.
   */
  getAccountNonvotingLockedGold = async (account: string) => {
    const res = await this.contract.read.getAccountNonvotingLockedGold([toViemAddress(account)])
    return valueToBigNumber(res.toString())
  }

  private _getUnlockingPeriod = async () => {
    const res = await this.contract.read.unlockingPeriod()
    return valueToBigNumber(res.toString())
  }

  /**
   * Returns current configuration parameters.
   */
  async getConfig(): Promise<LockedGoldConfig> {
    return {
      unlockingPeriod: await this._getUnlockingPeriod(),
      totalLockedGold: await this.getTotalLockedGold(),
    }
  }

  /**
   * @dev Returns human readable configuration of the lockedcelo contract
   * @return LockedGoldConfig object
   */
  async getHumanReadableConfig() {
    const config = await this.getConfig()
    return {
      ...config,
      unlockingPeriod: secondsToDurationString(config.unlockingPeriod),
    }
  }

  async getAccountSummary(account: string): Promise<AccountSummary> {
    const validators = await this.contracts.getValidators()
    const nonvotingPromise = this.getAccountNonvotingLockedGold(account)
    const totalPromise = this.getAccountTotalLockedGold(account)
    const requirementPromise = validators.getAccountLockedGoldRequirement(account)
    const pendingWithdrawalsPromise = this.getPendingWithdrawals(account)
    const accountTotalGovernanceVotingPowerPromise =
      this.getAccountTotalGovernanceVotingPower(account)
    return {
      lockedGold: {
        total: await totalPromise,
        nonvoting: await nonvotingPromise,
        requirement: await requirementPromise,
      },
      totalGovernaneVotingPower: await accountTotalGovernanceVotingPowerPromise,
      pendingWithdrawals: await pendingWithdrawalsPromise,
    }
  }

  /**
   * Returns the total amount of governance voting power for an account.
   * @param account The address of the account.
   * @return The total amount of governance voting power for an account.
   */
  private _getAccountTotalGovernanceVotingPower = async (account: string) => {
    const res = await this.contract.read.getAccountTotalGovernanceVotingPower([
      toViemAddress(account),
    ])
    return valueToBigNumber(res.toString())
  }

  async getAccountTotalGovernanceVotingPower(account: string) {
    return this._getAccountTotalGovernanceVotingPower(account)
  }

  /**
   * Returns the pending withdrawals from unlocked gold for an account.
   * @param account The address of the account.
   * @return The value and timestamp for each pending withdrawal.
   */
  private _getPendingWithdrawals = async (account: string) => {
    const res = await this.contract.read.getPendingWithdrawals([toViemAddress(account)])
    return {
      0: [...res[0]].map((v) => v.toString()),
      1: [...res[1]].map((v) => v.toString()),
    }
  }

  async getPendingWithdrawals(account: string) {
    const withdrawals = await this._getPendingWithdrawals(account)
    return zip(
      (time: string, value: string): PendingWithdrawal => ({
        time: valueToBigNumber(time),
        value: valueToBigNumber(value),
      }),
      withdrawals[1] as string[],
      withdrawals[0] as string[]
    )
  }

  /**
   * Returns the pending withdrawal at a given index for a given account.
   * @param account The address of the account.
   * @param index The index of the pending withdrawal.
   * @return The value of the pending withdrawal.
   * @return The timestamp of the pending withdrawal.
   */
  private _getPendingWithdrawal = async (account: string, index: number) => {
    const res = await this.contract.read.getPendingWithdrawal([
      toViemAddress(account),
      toViemBigInt(index),
    ])
    return {
      0: res[0].toString(),
      1: res[1].toString(),
    }
  }

  async getPendingWithdrawal(account: string, index: number) {
    const response = await this._getPendingWithdrawal(account, index)
    return {
      value: valueToBigNumber(response[0]),
      time: valueToBigNumber(response[1]),
    }
  }

  /**
   * Retrieves AccountSlashed for epochNumber.
   * @param epochNumber The epoch to retrieve AccountSlashed at.
   */
  async getAccountsSlashed(epochNumber: number): Promise<AccountSlashed[]> {
    const epochManagerWrapper = await this.contracts.getEpochManager()
    const [fromBlock, toBlock] = await Promise.all([
      epochManagerWrapper.getFirstBlockAtEpoch(epochNumber),
      epochManagerWrapper.getLastBlockAtEpoch(epochNumber),
    ])

    const events = await this.getPastEvents('AccountSlashed', { fromBlock, toBlock })
    return events.map(
      (e: EventLog): AccountSlashed => ({
        epochNumber,
        slashed: e.returnValues.slashed,
        penalty: valueToBigNumber(e.returnValues.penalty),
        reporter: e.returnValues.reporter,
        reward: valueToBigNumber(e.returnValues.reward),
      })
    )
  }

  /**
   * Computes parameters for slashing `penalty` from `account`.
   * @param account The account to slash.
   * @param penalty The amount to slash as penalty.
   * @return List of (group, voting gold) to decrement from `account`.
   */
  async computeInitialParametersForSlashing(account: string, penalty: BigNumber) {
    const election = await this.contracts.getElection()
    const eligible = await election.getEligibleValidatorGroupsVotes()
    const groups: AddressListItem[] = eligible.map((x) => ({ address: x.address, value: x.votes }))
    return this.computeParametersForSlashing(account, penalty, groups)
  }

  async computeParametersForSlashing(
    account: string,
    penalty: BigNumber,
    groups: AddressListItem[]
  ) {
    const changed = await this.computeDecrementsForSlashing(account, penalty, groups)
    const changes = linkedListChanges(groups, changed)
    return { ...changes, indices: changed.map((a) => a.index) }
  }

  // Returns how much voting gold will be decremented from the groups voted by an account
  // Implementation follows protocol/test/common/integration slashingOfGroups()
  private async computeDecrementsForSlashing(
    account: Address,
    penalty: BigNumber,
    allGroups: AddressListItem[]
  ) {
    // first check how much voting gold has to be slashed
    const nonVoting = await this.getAccountNonvotingLockedGold(account)
    if (penalty.isLessThan(nonVoting)) {
      return []
    }
    let difference = penalty.minus(nonVoting)
    // find voted groups
    const election = await this.contracts.getElection()
    const groups = await election.getGroupsVotedForByAccount(account)
    const res = []
    //
    for (let i = groups.length - 1; i >= 0; i--) {
      const group = groups[i]
      const totalVotes = allGroups.find((a) => a.address === group)?.value
      if (!totalVotes) {
        throw new Error(`Cannot find group ${group}`)
      }
      const votes = await election.getTotalVotesForGroupByAccount(group, account)
      const slashedVotes = votes.lt(difference) ? votes : difference
      res.push({ address: group, value: totalVotes.minus(slashedVotes), index: i })
      difference = difference.minus(slashedVotes)
      if (difference.eq(new BigNumber(0))) {
        break
      }
    }
    return res
  }

  /**
   * Returns the number of pending withdrawals for the specified account.
   * @param account The account.
   * @returns The count of pending withdrawals.
   */
  async getTotalPendingWithdrawalsCount(account: string) {
    return this._getTotalPendingWithdrawalsCount(account)
  }

  _getTotalPendingWithdrawalsCount = async (account: string) => {
    const res = await this.contract.read.getTotalPendingWithdrawalsCount([toViemAddress(account)])
    return valueToBigNumber(res.toString())
  }
}

export type LockedGoldWrapperType = LockedGoldWrapper
