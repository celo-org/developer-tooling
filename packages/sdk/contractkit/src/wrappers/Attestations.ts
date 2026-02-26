import { attestationsABI } from '@celo/abis'
import { StableToken } from '@celo/base'
import { eqAddress } from '@celo/base/lib/address'
import { Address, CeloTransactionObject, Connection, type ViemContract } from '@celo/connect'
import BigNumber from 'bignumber.js'
import { AccountsWrapper } from './Accounts'
import {
  BaseWrapper,
  blocksToDurationString,
  proxyCall,
  proxySend,
  valueToBigNumber,
  valueToInt,
} from './BaseWrapper'
import { StableTokenWrapper } from './StableTokenWrapper'

export interface AttestationStat {
  completed: number
  total: number
}

export interface AttestationStateForIssuer {
  attestationState: AttestationState
}

export interface AttestationsToken {
  address: Address
  fee: BigNumber
}

export interface AttestationsConfig {
  attestationExpiryBlocks: number
  attestationRequestFees: AttestationsToken[]
}

/**
 * Contract for managing identities
 */
export enum AttestationState {
  None,
  Incomplete,
  Complete,
}

export interface UnselectedRequest {
  blockNumber: number
  attestationsRequested: number
  attestationRequestFeeToken: string
}

// Map of identifier -> (Map of address -> AttestationStat)
export type IdentifierLookupResult = Record<
  string,
  Record<Address, AttestationStat | undefined> | undefined
>

interface ContractsForAttestation {
  getAccounts(): Promise<AccountsWrapper>

  getStableToken(stableToken: StableToken): Promise<StableTokenWrapper>
}

export class AttestationsWrapper extends BaseWrapper<typeof attestationsABI> {
  constructor(
    protected readonly connection: Connection,
    protected readonly contract: ViemContract<typeof attestationsABI>,
    protected readonly contracts: ContractsForAttestation
  ) {
    super(connection, contract)
  }

  /**
   *  Returns the time an attestation can be completable before it is considered expired
   */
  attestationExpiryBlocks = proxyCall(
    this.contract,
    'attestationExpiryBlocks',
    undefined,
    valueToInt
  )

  /**
   * Returns the attestation request fee in a given currency.
   * @param address Token address.
   * @returns The fee as big number.
   */
  attestationRequestFees = proxyCall(
    this.contract,
    'attestationRequestFees',
    undefined,
    valueToBigNumber
  )

  selectIssuersWaitBlocks = proxyCall(
    this.contract,
    'selectIssuersWaitBlocks',
    undefined,
    valueToInt
  )

  /**
   * @notice Returns the unselected attestation request for an identifier/account pair, if any.
   * @param identifier Attestation identifier (e.g. phone hash)
   * @param account Address of the account
   */
  getUnselectedRequest: (identifier: string, account: Address) => Promise<UnselectedRequest> =
    proxyCall(
      this.contract,
      'getUnselectedRequest',
      undefined,
      (res: any): UnselectedRequest => ({
        blockNumber: valueToInt(res[0]),
        attestationsRequested: valueToInt(res[1]),
        attestationRequestFeeToken: res[2] as string,
      })
    )

  /**
   * @notice Checks if attestation request is expired.
   * @param attestationRequestBlockNumber Attestation Request Block Number to be checked
   */
  isAttestationExpired = async (attestationRequestBlockNumber: number) => {
    // We duplicate the implementation here, until Attestation.sol->isAttestationExpired is not external
    const attestationExpiryBlocks = await this.attestationExpiryBlocks()
    const blockNumber = await this.connection.getBlockNumber()
    return blockNumber >= attestationRequestBlockNumber + attestationExpiryBlocks
  }

  /**
   * Returns the issuers of attestations for a phoneNumber/account combo
   * @param identifier Attestation identifier (e.g. phone hash)
   * @param account Address of the account
   */
  getAttestationIssuers: (identifier: string, account: Address) => Promise<string[]> = proxyCall(
    this.contract,
    'getAttestationIssuers'
  )

  /**
   * Returns the attestation state of a phone number/account/issuer tuple
   * @param identifier Attestation identifier (e.g. phone hash)
   * @param account Address of the account
   */
  getAttestationState: (
    identifier: string,
    account: Address,
    issuer: Address
  ) => Promise<AttestationStateForIssuer> = proxyCall(
    this.contract,
    'getAttestationState',
    undefined,
    (state: any) => ({ attestationState: valueToInt(state[0]) })
  )

  /**
   * Returns the attestation stats of a identifer/account pair
   * @param identifier Attestation identifier (e.g. phone hash)
   * @param account Address of the account
   */
  getAttestationStat: (identifier: string, account: Address) => Promise<AttestationStat> =
    proxyCall(this.contract, 'getAttestationStats', undefined, (stat: any) => ({
      completed: valueToInt(stat[0]),
      total: valueToInt(stat[1]),
    }))

  /**
   * Returns the verified status of an identifier/account pair indicating whether the attestation
   * stats for a given pair are completed beyond a certain threshold of confidence (aka "verified")
   * @param identifier Attestation identifier (e.g. phone hash)
   * @param account Address of the account
   * @param numAttestationsRequired Optional number of attestations required.  Will default to
   *  hardcoded value if absent.
   * @param attestationThreshold Optional threshold for fraction attestations completed. Will
   *  default to hardcoded value if absent.
   */
  async getVerifiedStatus(
    identifier: string,
    account: Address,
    numAttestationsRequired: number = 3,
    attestationThreshold: number = 0.25
  ) {
    const stats = await this.getAttestationStat(identifier, account)
    if (!stats) {
      return {
        isVerified: false,
        numAttestationsRemaining: 0,
        total: 0,
        completed: 0,
      }
    }
    const numAttestationsRemaining = numAttestationsRequired - stats.completed
    const fractionAttestation = stats.total < 1 ? 0 : stats.completed / stats.total
    // 'verified' is a term of convenience to mean that the attestation stats for a
    // given identifier are beyond a certain threshold of confidence
    const isVerified = numAttestationsRemaining <= 0 && fractionAttestation >= attestationThreshold

    return {
      isVerified,
      numAttestationsRemaining,
      total: stats.total,
      completed: stats.completed,
    }
  }

  private _getAttestationRequestFee = proxyCall(
    this.contract,
    'getAttestationRequestFee',
    undefined,
    valueToBigNumber
  )

  /**
   * Calculates the amount of StableToken required to request Attestations
   * @param attestationsRequested  The number of attestations to request
   */
  async getAttestationFeeRequired(attestationsRequested: number) {
    const contract = await this.contracts.getStableToken(StableToken.USDm)
    const attestationFee = await this._getAttestationRequestFee(contract.address)
    return attestationFee.times(attestationsRequested)
  }

  /**
   * Approves the necessary amount of StableToken to request Attestations
   * @param attestationsRequested The number of attestations to request
   */
  async approveAttestationFee(attestationsRequested: number): Promise<CeloTransactionObject<void>> {
    const tokenContract = await this.contracts.getStableToken(StableToken.USDm)
    const fee = await this.getAttestationFeeRequired(attestationsRequested)
    return tokenContract.approve(this.address, fee.toFixed())
  }

  /**
   * Returns the attestation signer for the specified account.
   * @param account The address of token rewards are accumulated in.
   * @param account The address of the account.
   * @return The reward amount.
   */
  getPendingWithdrawals: (token: string, account: string) => Promise<BigNumber> = proxyCall(
    this.contract,
    'pendingWithdrawals',
    undefined,
    valueToBigNumber
  )

  /**
   * Allows issuers to withdraw accumulated attestation rewards
   * @param address The address of the token that will be withdrawn
   */
  withdraw: (token: string) => CeloTransactionObject<void> = proxySend(
    this.connection,
    this.contract,
    'withdraw'
  )

  /**
   * Returns the current configuration parameters for the contract.
   * @param tokens List of tokens used for attestation fees. use CeloTokens.getAddresses() to get
   * @return AttestationsConfig object
   */
  async getConfig(tokens: string[]): Promise<AttestationsConfig> {
    const feeTokens = tokens
    const fees = await Promise.all(
      feeTokens.map(async (token) => {
        const fee = await this.attestationRequestFees(token)
        return { fee, address: token }
      })
    )
    return {
      attestationExpiryBlocks: await this.attestationExpiryBlocks(),
      attestationRequestFees: fees,
    }
  }

  /**
   * @dev Returns human readable configuration of the attestations contract
   * @param tokens List of tokens used for attestation fees. use CeloTokens.getAddresses() to get
   * @return AttestationsConfig object
   */
  async getHumanReadableConfig(tokens: string[]) {
    const config = await this.getConfig(tokens)
    return {
      attestationRequestFees: config.attestationRequestFees,
      attestationExpiry: blocksToDurationString(config.attestationExpiryBlocks),
    }
  }

  /**
   * Returns the list of accounts associated with an identifier.
   * @param identifier Attestation identifier (e.g. phone hash)
   */
  lookupAccountsForIdentifier: (identifier: string) => Promise<string[]> = proxyCall(
    this.contract,
    'lookupAccountsForIdentifier'
  )

  /**
   * Lookup mapped wallet addresses for a given list of identifiers
   * @param identifiers Attestation identifiers (e.g. phone hashes)
   */
  private _batchGetAttestationStats: (
    ...args: any[]
  ) => Promise<{ 0: string[]; 1: string[]; 2: string[]; 3: string[] }> = proxyCall(
    this.contract,
    'batchGetAttestationStats'
  )

  async lookupIdentifiers(identifiers: string[]): Promise<IdentifierLookupResult> {
    // Unfortunately can't be destructured
    const stats = await this._batchGetAttestationStats(identifiers)

    const matches = (stats[0] as string[]).map(valueToInt)
    const addresses = stats[1] as string[]
    const completed = (stats[2] as string[]).map(valueToInt)
    const total = (stats[3] as string[]).map(valueToInt)
    // Map of identifier -> (Map of address -> AttestationStat)
    const result: IdentifierLookupResult = {}

    let rIndex = 0

    for (let pIndex = 0; pIndex < identifiers.length; pIndex++) {
      const pHash = identifiers[pIndex]
      const numberOfMatches = matches[pIndex]
      if (numberOfMatches === 0) {
        continue
      }

      const matchingAddresses: Record<string, AttestationStat> = {}
      for (let mIndex = 0; mIndex < numberOfMatches; mIndex++) {
        const matchingAddress = addresses[rIndex]
        matchingAddresses[matchingAddress] = {
          completed: completed[rIndex],
          total: total[rIndex],
        }
        rIndex++
      }

      result[pHash] = matchingAddresses
    }

    return result
  }

  private _revoke: (...args: any[]) => CeloTransactionObject<void> = proxySend(
    this.connection,
    this.contract,
    'revoke'
  )

  async revoke(identifer: string, account: Address): Promise<CeloTransactionObject<void>> {
    const accounts = await this.lookupAccountsForIdentifier(identifer)
    const idx = accounts.findIndex((acc: string) => eqAddress(acc, account))
    if (idx < 0) {
      throw new Error("Account not found in identifier's accounts")
    }
    return this._revoke(identifer, idx)
  }
}

export type AttestationsWrapperType = AttestationsWrapper
