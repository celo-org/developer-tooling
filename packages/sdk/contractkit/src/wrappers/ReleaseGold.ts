import { releaseGoldABI } from '@celo/abis'
import { concurrentMap } from '@celo/base'
import { StrongAddress, findAddressIndex } from '@celo/base/lib/address'
import { Signature } from '@celo/base/lib/signatureUtils'
import { Address, CeloTransactionObject } from '@celo/connect'
import { soliditySha3 } from '@celo/utils/lib/solidity'
import { hashMessageWithPrefix, signedMessageToPublicKey } from '@celo/utils/lib/signatureUtils'
import BigNumber from 'bignumber.js'
import { flatten } from 'fp-ts/lib/Array'
import {
  secondsToDurationString,
  stringToSolidityBytes,
  unixSecondsTimestampToDateString,
  valueToBigNumber,
  valueToInt,
  valueToString,
} from './BaseWrapper'
import { BaseWrapperForGoverning } from './BaseWrapperForGoverning'
import { PendingWithdrawal } from './LockedGold'

export interface BalanceState {
  totalWithdrawn: string
  maxDistribution: string
  totalBalance: string
  remainingTotalBalance: string
  remainingUnlockedBalance: string
  remainingLockedBalance: string
  currentReleasedTotalAmount: string
}

export interface ReleaseGoldInfo {
  releaseGoldWrapperAddress: string
  beneficiary: string
  releaseOwner: string
  owner: string
  refundAddress: string
  liquidityProvisionMet: boolean
  canValidate: boolean
  canVote: boolean
  releaseSchedule: ReleaseSchedule
  isRevoked: boolean
  revokedStateData: RevocationInfo
  balanceStateData: BalanceState
}

interface ReleaseSchedule {
  releaseStartTime: number
  releaseCliff: number
  numReleasePeriods: number
  releasePeriod: number
  amountReleasedPerPeriod: BigNumber
}

interface RevocationInfo {
  revocable: boolean
  canExpire: boolean
  releasedBalanceAtRevoke: BigNumber
  revokeTime: number
}

/**
 * Contract for handling an instance of a ReleaseGold contract.
 */
export class ReleaseGoldWrapper extends BaseWrapperForGoverning<typeof releaseGoldABI> {
  private _getReleaseSchedule = async () => {
    const res = await this.contract.read.releaseSchedule()
    return {
      releaseStartTime: res[0].toString(),
      releaseCliff: res[1].toString(),
      numReleasePeriods: res[2].toString(),
      releasePeriod: res[3].toString(),
      amountReleasedPerPeriod: res[4].toString(),
    }
  }

  /**
   * Returns the underlying Release schedule of the ReleaseGold contract
   * @return A ReleaseSchedule.
   */
  async getReleaseSchedule(): Promise<ReleaseSchedule> {
    const releaseSchedule = await this._getReleaseSchedule()

    return {
      releaseStartTime: valueToInt(releaseSchedule.releaseStartTime),
      releaseCliff: valueToInt(releaseSchedule.releaseCliff),
      numReleasePeriods: valueToInt(releaseSchedule.numReleasePeriods),
      releasePeriod: valueToInt(releaseSchedule.releasePeriod),
      amountReleasedPerPeriod: valueToBigNumber(releaseSchedule.amountReleasedPerPeriod),
    }
  }

  /**
   * Returns the underlying Release schedule of the ReleaseGold contract
   * @return A ReleaseSchedule.
   */
  async getHumanReadableReleaseSchedule() {
    const releaseSchedule = await this.getReleaseSchedule()

    return {
      ...releaseSchedule,
      releaseCliff: unixSecondsTimestampToDateString(releaseSchedule.releaseCliff),
      releaseStartTime: unixSecondsTimestampToDateString(releaseSchedule.releaseStartTime),
      releasePeriod: secondsToDurationString(releaseSchedule.releasePeriod),
    }
  }

  /**
   * Returns the beneficiary of the ReleaseGold contract
   * @return The address of the beneficiary.
   */
  getBeneficiary = async (): Promise<StrongAddress> => this.contract.read.beneficiary()

  /**
   * Returns the releaseOwner address of the ReleaseGold contract
   * @return The address of the releaseOwner.
   */
  getReleaseOwner = async (): Promise<StrongAddress> => this.contract.read.releaseOwner()

  /**
   * Returns the refund address of the ReleaseGold contract
   * @return The refundAddress.
   */
  getRefundAddress = async (): Promise<StrongAddress> => this.contract.read.refundAddress()

  /**
   * Returns the owner's address of the ReleaseGold contract
   * @return The owner's address.
   */
  getOwner = async (): Promise<StrongAddress> => this.contract.read.owner()

  /**
   * Returns true if the liquidity provision has been met for this contract
   * @return If the liquidity provision is met.
   */
  getLiquidityProvisionMet = async (): Promise<boolean> =>
    this.contract.read.liquidityProvisionMet()

  /**
   * Returns true if the contract can validate
   * @return If the contract can validate
   */
  getCanValidate = async (): Promise<boolean> => this.contract.read.canValidate()

  /**
   * Returns true if the contract can vote
   * @return If the contract can vote
   */
  getCanVote = async (): Promise<boolean> => this.contract.read.canVote()

  /**
   * Returns the total withdrawn amount from the ReleaseGold contract
   * @return The total withdrawn amount from the ReleaseGold contract
   */
  getTotalWithdrawn = async (): Promise<BigNumber> => {
    const res = await this.contract.read.totalWithdrawn()
    return valueToBigNumber(res.toString())
  }

  /**
   * Returns the maximum amount of gold (regardless of release schedule)
   * currently allowed for release.
   * @return The max amount of gold currently withdrawable.
   */
  getMaxDistribution = async (): Promise<BigNumber> => {
    const res = await this.contract.read.maxDistribution()
    return valueToBigNumber(res.toString())
  }

  private _getRevocationInfo = async () => {
    const res = await this.contract.read.revocationInfo()
    return {
      revocable: res[0] as boolean,
      canExpire: res[1] as boolean,
      releasedBalanceAtRevoke: res[2].toString(),
      revokeTime: res[3].toString(),
    }
  }

  /**
   * Returns the underlying Revocation Info of the ReleaseGold contract
   * @return A RevocationInfo struct.
   */
  async getRevocationInfo(): Promise<RevocationInfo> {
    try {
      const revocationInfo = await this._getRevocationInfo()
      return {
        revocable: revocationInfo.revocable,
        canExpire: revocationInfo.canExpire,
        releasedBalanceAtRevoke: valueToBigNumber(revocationInfo.releasedBalanceAtRevoke),
        revokeTime: valueToInt(revocationInfo.revokeTime),
      }
    } catch (_) {
      // This error is caused by a mismatch between the deployed contract and the locally compiled version.
      // Specifically, networks like baklava and rc0 were deployed before adding `canExpire`.
      console.info('Some info could not be fetched, returning default for revocation info.')
      return {
        revocable: false,
        canExpire: false,
        releasedBalanceAtRevoke: new BigNumber(0),
        revokeTime: 0,
      }
    }
  }

  /**
   * Indicates if the release grant is revocable or not
   * @return A boolean indicating revocable releasing (true) or non-revocable(false).
   */
  async isRevocable(): Promise<boolean> {
    const revocationInfo = await this.getRevocationInfo()
    return revocationInfo.revocable
  }

  /**
   * Indicates if the release grant is revoked or not
   * @return A boolean indicating revoked releasing (true) or non-revoked(false).
   */
  isRevoked = async (): Promise<boolean> => this.contract.read.isRevoked()

  /**
   * Returns the time at which the release schedule was revoked
   * @return The timestamp of the release schedule revocation
   */
  async getRevokeTime(): Promise<number> {
    const revocationInfo = await this.getRevocationInfo()
    return revocationInfo.revokeTime
  }

  /**
   * Returns the balance of released gold when the grant was revoked
   * @return The balance at revocation time. 0 can also indicate not revoked.
   */
  async getReleasedBalanceAtRevoke(): Promise<string> {
    const revocationInfo = await this.getRevocationInfo()
    return revocationInfo.releasedBalanceAtRevoke.toString()
  }

  /**
   * Returns the total balance of the ReleaseGold instance
   * @return The total ReleaseGold instance balance
   */
  getTotalBalance = async (): Promise<BigNumber> => {
    const res = await this.contract.read.getTotalBalance()
    return valueToBigNumber(res.toString())
  }

  /**
   * Returns the the sum of locked and unlocked gold in the ReleaseGold instance
   * @return The remaining total ReleaseGold instance balance
   */
  getRemainingTotalBalance = async (): Promise<BigNumber> => {
    const res = await this.contract.read.getRemainingTotalBalance()
    return valueToBigNumber(res.toString())
  }

  /**
   * Returns the remaining unlocked gold balance in the ReleaseGold instance
   * @return The available unlocked ReleaseGold instance gold balance
   */
  getRemainingUnlockedBalance = async (): Promise<BigNumber> => {
    const res = await this.contract.read.getRemainingUnlockedBalance()
    return valueToBigNumber(res.toString())
  }

  /**
   * Returns the remaining locked gold balance in the ReleaseGold instance
   * @return The remaining locked ReleaseGold instance gold balance
   */
  getRemainingLockedBalance = async (): Promise<BigNumber> => {
    const res = await this.contract.read.getRemainingLockedBalance()
    return valueToBigNumber(res.toString())
  }

  /**
   * Returns the total amount that has already released up to now
   * @return The already released gold amount up to the point of call
   */
  getCurrentReleasedTotalAmount = async (): Promise<BigNumber> => {
    const res = await this.contract.read.getCurrentReleasedTotalAmount()
    return valueToBigNumber(res.toString())
  }

  /**
   * Returns currently withdrawable amount
   * @return The amount that can be yet withdrawn
   */
  getWithdrawableAmount = async (): Promise<BigNumber> => {
    const res = await this.contract.read.getWithdrawableAmount()
    return valueToBigNumber(res.toString())
  }

  /**
   * Revoke a Release schedule
   * @return A CeloTransactionObject
   */
  revokeReleasing = () => this.buildTx('revoke', [])

  /**
   * Revoke a vesting CELO schedule from the contract's beneficiary.
   * @return A CeloTransactionObject
   */
  revokeBeneficiary = this.revokeReleasing

  /**
   * Refund `refundAddress` and `beneficiary` after the ReleaseGold schedule has been revoked.
   * @return A CeloTransactionObject
   */
  refundAndFinalize = () => this.buildTx('refundAndFinalize', [])

  /**
   * Locks gold to be used for voting.
   * @param value The amount of gold to lock
   */
  lockGold = (value: BigNumber.Value) => this.buildTx('lockGold', [valueToString(value)])

  transfer = (to: Address, value: BigNumber.Value) =>
    this.buildTx('transfer', [to, valueToString(value)])

  /**
   * Unlocks gold that becomes withdrawable after the unlocking period.
   * @param value The amount of gold to unlock
   */
  unlockGold = (value: BigNumber.Value) => this.buildTx('unlockGold', [valueToString(value)])

  async unlockAllGold() {
    const lockedGold = await this.contracts.getLockedGold()
    const amount = await lockedGold.getAccountTotalLockedGold(this.address)
    return this.unlockGold(amount)
  }

  /**
   * Relocks gold in the ReleaseGold instance that has been unlocked but not withdrawn.
   * @param index The index of the pending withdrawal to relock from.
   * @param value The value to relock from the specified pending withdrawal.
   */
  async relockGold(value: BigNumber.Value): Promise<CeloTransactionObject<void>[]> {
    const lockedGold = await this.contracts.getLockedGold()
    const pendingWithdrawals = await lockedGold.getPendingWithdrawals(this.address)
    // Ensure there are enough pending withdrawals to relock.
    const totalValue = await lockedGold.getPendingWithdrawalsTotalValue(this.address)
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
    const relockPw = (acc: CeloTransactionObject<void>[], pw: PendingWithdrawal, i: number) => {
      const valueToRelock = BigNumber.minimum(pw.value, remainingToRelock)
      if (!valueToRelock.isZero()) {
        remainingToRelock = remainingToRelock.minus(valueToRelock)
        acc.push(this._relockGold(i, valueToRelock))
      }
      return acc
    }
    return pendingWithdrawals.reduceRight(relockPw, []) as CeloTransactionObject<void>[]
  }

  /**
   * Relocks gold that has been unlocked but not withdrawn.
   * @param index The index of the pending withdrawal to relock from.
   * @param value The value to relock from the specified pending withdrawal.
   */
  _relockGold = (index: number, value: BigNumber.Value) =>
    this.buildTx('relockGold', [valueToString(index), valueToString(value)])

  /**
   * Withdraw gold in the ReleaseGold instance that has been unlocked but not withdrawn.
   * @param index The index of the pending locked gold withdrawal
   */
  withdrawLockedGold = (index: BigNumber.Value) =>
    this.buildTx('withdrawLockedGold', [valueToString(index)])

  /**
   * Transfer released gold from the ReleaseGold instance back to beneficiary.
   * @param value The requested gold amount
   */
  withdraw = (value: BigNumber.Value) => this.buildTx('withdraw', [valueToString(value)])

  /**
   * Beneficiary creates an account on behalf of the ReleaseGold contract.
   */
  createAccount = () => this.buildTx('createAccount', [])

  /**
   * Beneficiary creates an account on behalf of the ReleaseGold contract.
   * @param name The name to set
   * @param dataEncryptionKey The key to set
   * @param walletAddress The address to set
   */
  setAccount = (name: string, dataEncryptionKey: string, walletAddress: string) =>
    this.buildTx('setAccount', [name, dataEncryptionKey, walletAddress])

  /**
   * Sets the name for the account
   * @param name The name to set
   */
  setAccountName = (name: string) => this.buildTx('setAccountName', [name])

  /**
   * Sets the metadataURL for the account
   * @param metadataURL The url to set
   */
  setAccountMetadataURL = (url: string) => this.buildTx('setAccountMetadataURL', [url])

  /**
   * Sets the wallet address for the account
   * @param walletAddress The address to set
   * @param v The recovery id of the incoming ECDSA signature
   * @param r The output of the ECDSA signature
   * @param s The output of the ECDSA signature
   */
  setAccountWalletAddress = (
    walletAddress: string,
    v: number | string,
    r: string | number[],
    s: string | number[]
  ) => this.buildTx('setAccountWalletAddress', [walletAddress, v, r, s])

  /**
   * Sets the data encryption of the account
   * @param dataEncryptionKey The key to set
   */
  setAccountDataEncryptionKey = (dataEncryptionKey: string) =>
    this.buildTx('setAccountDataEncryptionKey', [dataEncryptionKey])

  /**
   * Sets the contract's liquidity provision to true
   */
  setLiquidityProvision = () => this.buildTx('setLiquidityProvision', [])

  /**
   * Sets the contract's `canExpire` field to `_canExpire`
   * @param _canExpire If the contract can expire `EXPIRATION_TIME` after the release schedule finishes.
   */
  setCanExpire = (canExpire: boolean) => this.buildTx('setCanExpire', [canExpire])

  /**
   * Sets the contract's max distribution
   */
  setMaxDistribution = (distributionRatio: number | string) =>
    this.buildTx('setMaxDistribution', [distributionRatio])

  /**
   * Sets the contract's beneficiary
   */
  setBeneficiary = (beneficiary: string) => this.buildTx('setBeneficiary', [beneficiary])

  private _authorizeVoteSigner = (...args: any[]) =>
    this.buildTx('authorizeVoteSigner', args)

  /**
   * Authorizes an address to sign votes on behalf of the account.
   * @param signer The address of the vote signing key to authorize.
   * @param proofOfSigningKeyPossession The account address signed by the signer address.
   * @return A CeloTransactionObject
   */
  async authorizeVoteSigner(
    signer: Address,
    proofOfSigningKeyPossession: Signature
  ): Promise<CeloTransactionObject<void>> {
    return this._authorizeVoteSigner(
      signer,
      proofOfSigningKeyPossession.v,
      proofOfSigningKeyPossession.r,
      proofOfSigningKeyPossession.s
    )
  }

  private _authorizeValidatorSignerWithPublicKey = (...args: any[]) =>
    this.buildTx('authorizeValidatorSignerWithPublicKey', args)

  private _authorizeValidatorSigner = (...args: any[]) =>
    this.buildTx('authorizeValidatorSigner', args)

  /**
   * Authorizes an address to sign validation messages on behalf of the account.
   * @param signer The address of the validator signing key to authorize.
   * @param proofOfSigningKeyPossession The account address signed by the signer address.
   * @return A CeloTransactionObject
   */
  async authorizeValidatorSigner(
    signer: Address,
    proofOfSigningKeyPossession: Signature
  ): Promise<CeloTransactionObject<void>> {
    const validators = await this.contracts.getValidators()
    const account = this.address
    if (await validators.isValidator(account)) {
      const message = soliditySha3({
        type: 'address',
        value: account,
      })!
      const prefixedMsg = hashMessageWithPrefix(message)
      const pubKey = signedMessageToPublicKey(
        prefixedMsg!,
        proofOfSigningKeyPossession.v,
        proofOfSigningKeyPossession.r,
        proofOfSigningKeyPossession.s
      )
      return this._authorizeValidatorSignerWithPublicKey(
        signer,
        proofOfSigningKeyPossession.v,
        proofOfSigningKeyPossession.r,
        proofOfSigningKeyPossession.s,
        stringToSolidityBytes(pubKey)
      )
    } else {
      return this._authorizeValidatorSigner(
        signer,
        proofOfSigningKeyPossession.v,
        proofOfSigningKeyPossession.r,
        proofOfSigningKeyPossession.s
      )
    }
  }

  /**
   * @deprecated use `authorizeValidatorSignerWithPublicKey`
   */
  async authorizeValidatorSignerAndBls(signer: Address, proofOfSigningKeyPossession: Signature) {
    return this.authorizeValidatorSignerWithPublicKey(signer, proofOfSigningKeyPossession)
  }

  /**
   * Authorizes an address to sign consensus messages on behalf of the contract's account. Also switch BLS key at the same time.
   * @param signer The address of the signing key to authorize.
   * @param proofOfSigningKeyPossession The contract's account address signed by the signer address.
   * @return A CeloTransactionObject
   */
  async authorizeValidatorSignerWithPublicKey(
    signer: Address,
    proofOfSigningKeyPossession: Signature
  ): Promise<CeloTransactionObject<void>> {
    const account = this.address
    const message = soliditySha3({
      type: 'address',
      value: account,
    })!
    const prefixedMsg = hashMessageWithPrefix(message)
    const pubKey = signedMessageToPublicKey(
      prefixedMsg!,
      proofOfSigningKeyPossession.v,
      proofOfSigningKeyPossession.r,
      proofOfSigningKeyPossession.s
    )
    return this._authorizeValidatorSignerWithPublicKey(
      signer,
      proofOfSigningKeyPossession.v,
      proofOfSigningKeyPossession.r,
      proofOfSigningKeyPossession.s,
      stringToSolidityBytes(pubKey)
    )
  }

  private _authorizeAttestationSigner = (...args: any[]) =>
    this.buildTx('authorizeAttestationSigner', args)

  /**
   * Authorizes an address to sign attestation messages on behalf of the account.
   * @param signer The address of the attestation signing key to authorize.
   * @param proofOfSigningKeyPossession The account address signed by the signer address.
   * @return A CeloTransactionObject
   */
  async authorizeAttestationSigner(
    signer: Address,
    proofOfSigningKeyPossession: Signature
  ): Promise<CeloTransactionObject<void>> {
    return this._authorizeAttestationSigner(
      signer,
      proofOfSigningKeyPossession.v,
      proofOfSigningKeyPossession.r,
      proofOfSigningKeyPossession.s
    )
  }

  private _revokePending = (...args: any[]) => this.buildTx('revokePending', args)

  /**
   * Revokes pending votes
   * @deprecated prefer revokePendingVotes
   * @param account The account to revoke from.
   * @param validatorGroup The group to revoke the vote for.
   * @param value The amount of gold to revoke.
   */
  async revokePending(
    account: Address,
    group: Address,
    value: BigNumber
  ): Promise<CeloTransactionObject<void>> {
    const electionContract = await this.contracts.getElection()
    const groups = await electionContract.getGroupsVotedForByAccount(account)
    const index = findAddressIndex(group, groups)
    const { lesser, greater } = await electionContract.findLesserAndGreaterAfterVote(
      group,
      value.times(-1)
    )

    return this._revokePending(group, value.toFixed(), lesser, greater, index)
  }

  /**
   * Revokes pending votes
   * @param validatorGroup The group to revoke the vote for.
   * @param value The amount of gold to revoke.
   */
  revokePendingVotes = (group: Address, value: BigNumber) =>
    this.revokePending(this.address, group, value)

  private _revokeActive = (...args: any[]) => this.buildTx('revokeActive', args)

  /**
   * Revokes active votes
   * @deprecated Prefer revokeActiveVotes
   * @param account The account to revoke from.
   * @param group The group to revoke the vote for.
   * @param value The amount of gold to revoke.
   */
  async revokeActive(
    account: Address,
    group: Address,
    value: BigNumber
  ): Promise<CeloTransactionObject<void>> {
    const electionContract = await this.contracts.getElection()
    const groups = await electionContract.getGroupsVotedForByAccount(account)
    const index = findAddressIndex(group, groups)
    const { lesser, greater } = await electionContract.findLesserAndGreaterAfterVote(
      group,
      value.times(-1)
    )

    return this._revokeActive(group, value.toFixed(), lesser, greater, index)
  }

  /**
   * Revokes active votes
   * @param group The group to revoke the vote for.
   * @param value The amount of gold to revoke.
   */
  revokeActiveVotes = (group: Address, value: BigNumber) =>
    this.revokeActive(this.address, group, value)

  /**
   * Revokes value from pending/active aggregate
   * @deprecated prefer revokeValueFromVotes
   * @param account The account to revoke from.
   * @param group The group to revoke the vote for.
   * @param value The amount of gold to revoke.
   */
  async revoke(
    account: Address,
    group: Address,
    value: BigNumber
  ): Promise<CeloTransactionObject<void>[]> {
    const electionContract = await this.contracts.getElection()
    const vote = await electionContract.getVotesForGroupByAccount(account, group)
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
      txos.push(await this.revokeActive(account, group, activeValue))
    }
    return txos
  }

  /**
   * Revokes value from pending/active aggregate
   * @param group The group to revoke the vote for.
   * @param value The amount of gold to revoke.
   */
  revokeValueFromVotes = (group: Address, value: BigNumber) =>
    this.revoke(this.address, group, value)

  revokeAllVotesForGroup = async (group: Address) => {
    const txos = []
    const electionContract = await this.contracts.getElection()
    const { pending, active } = await electionContract.getVotesForGroupByAccount(
      this.address,
      group
    )
    if (pending.isGreaterThan(0)) {
      const revokePendingTx = await this.revokePendingVotes(group, pending)
      txos.push(revokePendingTx)
    }
    if (active.isGreaterThan(0)) {
      const revokeActiveTx = await this.revokeActiveVotes(group, active)
      txos.push(revokeActiveTx)
    }
    return txos
  }

  revokeAllVotesForAllGroups = async () => {
    const electionContract = await this.contracts.getElection()
    const groups = await electionContract.getGroupsVotedForByAccount(this.address)
    const txoMatrix = await concurrentMap(4, groups, (group) => this.revokeAllVotesForGroup(group))
    return flatten(txoMatrix)
  }
}
