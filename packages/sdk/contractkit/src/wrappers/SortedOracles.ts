import { sortedOraclesABI } from '@celo/abis'
import { eqAddress, NULL_ADDRESS, StrongAddress } from '@celo/base/lib/address'
import { Address, CeloTx, CeloContract, Connection } from '@celo/connect'
import { isValidAddress } from '@celo/utils/lib/address'
import { fromFixed, toFixed } from '@celo/utils/lib/fixidity'
import BigNumber from 'bignumber.js'
import { AddressRegistry } from '../address-registry'
import { CeloContract as CeloContractEnum, StableTokenContract } from '../base'
import { isStableTokenContract, StableToken, stableTokenInfos } from '../celo-tokens'
import {
  BaseWrapper,
  secondsToDurationString,
  toViemAddress,
  valueToBigNumber,
  valueToFrac,
  valueToInt,
} from './BaseWrapper'

export enum MedianRelation {
  Undefined,
  Lesser,
  Greater,
  Equal,
}

export interface SortedOraclesConfig {
  reportExpirySeconds: BigNumber
}

export interface OracleRate {
  address: Address
  rate: BigNumber
  medianRelation: MedianRelation
}

export interface OracleTimestamp {
  address: Address
  timestamp: BigNumber
  medianRelation: MedianRelation
}

export interface OracleReport {
  address: Address
  rate: BigNumber
  timestamp: BigNumber
}

export interface MedianRate {
  rate: BigNumber
}

export type ReportTarget = StableTokenContract | Address

/**
 * Currency price oracle contract.
 */
export class SortedOraclesWrapper extends BaseWrapper<typeof sortedOraclesABI> {
  constructor(
    protected readonly connection: Connection,
    protected readonly contract: CeloContract<typeof sortedOraclesABI>,
    protected readonly registry: AddressRegistry
  ) {
    super(connection, contract)
  }

  private _numRates = async (target: string): Promise<number> => {
    const res = await this.contract.read.numRates([toViemAddress(target)])
    return valueToInt(res.toString())
  }

  /**
   * Gets the number of rates that have been reported for the given target
   * @param target The ReportTarget, either CeloToken or currency pair
   * @return The number of reported oracle rates for `token`.
   */
  async numRates(target: ReportTarget): Promise<number> {
    const identifier = await this.toCurrencyPairIdentifier(target)
    return this._numRates(identifier)
  }

  private _medianRate = async (target: string) => {
    const res = await this.contract.read.medianRate([toViemAddress(target)])
    return {
      0: res[0].toString(),
      1: res[1].toString(),
    }
  }

  /**
   * Returns the median rate for the given target
   * @param target The ReportTarget, either CeloToken or currency pair
   * @return The median exchange rate for `token`, expressed as:
   *   amount of that token / equivalent amount in CELO
   */
  async medianRate(target: ReportTarget): Promise<MedianRate> {
    const identifier = await this.toCurrencyPairIdentifier(target)
    const response = await this._medianRate(identifier)
    return {
      rate: valueToFrac(response[0], response[1]),
    }
  }

  private _isOracle = async (target: string, oracle: string): Promise<boolean> => {
    return this.contract.read.isOracle([toViemAddress(target), toViemAddress(oracle)])
  }

  /**
   * Checks if the given address is whitelisted as an oracle for the target
   * @param target The ReportTarget, either CeloToken or currency pair
   * @param oracle The address that we're checking the oracle status of
   * @returns boolean describing whether this account is an oracle
   */
  async isOracle(target: ReportTarget, oracle: Address): Promise<boolean> {
    const identifier = await this.toCurrencyPairIdentifier(target)
    return this._isOracle(identifier, oracle)
  }

  private _getOracles = async (target: string) => {
    const res = await this.contract.read.getOracles([toViemAddress(target)])
    return [...res] as string[]
  }

  /**
   * Returns the list of whitelisted oracles for a given target
   * @param target The ReportTarget, either CeloToken or currency pair
   * @returns The list of whitelisted oracles for a given token.
   */
  async getOracles(target: ReportTarget): Promise<Address[]> {
    const identifier = await this.toCurrencyPairIdentifier(target)
    return this._getOracles(identifier)
  }

  /**
   * Returns the report expiry parameter.
   * @returns Current report expiry.
   */
  reportExpirySeconds = async (): Promise<BigNumber> => {
    const res = await this.contract.read.reportExpirySeconds()
    return valueToBigNumber(res.toString())
  }

  private _getTokenReportExpirySeconds = async (target: string): Promise<BigNumber> => {
    const res = await this.contract.read.getTokenReportExpirySeconds([toViemAddress(target)])
    return valueToBigNumber(res.toString())
  }

  /**
   * Returns the expiry for the target if exists, if not the default.
   * @param target The ReportTarget, either CeloToken or currency pair
   * @return The report expiry in seconds.
   */
  async getTokenReportExpirySeconds(target: ReportTarget): Promise<BigNumber> {
    const identifier = await this.toCurrencyPairIdentifier(target)
    return this._getTokenReportExpirySeconds(identifier)
  }

  private _isOldestReportExpired = async (target: string): Promise<{ 0: boolean; 1: Address }> => {
    const res = await this.contract.read.isOldestReportExpired([toViemAddress(target)])
    return { 0: res[0], 1: res[1] as Address }
  }

  /**
   * Checks if the oldest report for a given target is expired
   * @param target The ReportTarget, either CeloToken or currency pair
   */
  async isOldestReportExpired(target: ReportTarget): Promise<[boolean, Address]> {
    const identifier = await this.toCurrencyPairIdentifier(target)
    const response = await this._isOldestReportExpired(identifier)
    // response is NOT an array, but a js object with two keys 0 and 1
    return [response[0], response[1]]
  }

  /**
   * Removes expired reports, if any exist
   * @param target The ReportTarget, either CeloToken or currency pair
   * @param numReports The upper-limit of reports to remove. For example, if there
   * are 2 expired reports, and this param is 5, it will only remove the 2 that
   * are expired.
   */
  async removeExpiredReports(
    target: ReportTarget,
    numReports?: number,
    txParams?: Omit<CeloTx, 'data'>
  ): Promise<`0x${string}`> {
    const identifier = await this.toCurrencyPairIdentifier(target)
    if (!numReports) {
      numReports = (await this.getReports(target)).length - 1
    }
    return this.contract.write.removeExpiredReports(
      [toViemAddress(identifier), BigInt(numReports!)] as const,
      txParams as any
    )
  }

  /**
   * Updates an oracle value and the median.
   * @param target The ReportTarget, either CeloToken or currency pair
   * @param value The amount of `token` equal to one CELO.
   */
  async report(
    target: ReportTarget,
    value: BigNumber.Value,
    oracleAddress: Address
  ): Promise<`0x${string}`> {
    const identifier = await this.toCurrencyPairIdentifier(target)
    const fixedValue = toFixed(valueToBigNumber(value))

    const { lesserKey, greaterKey } = await this.findLesserAndGreaterKeys(
      target,
      valueToBigNumber(value),
      oracleAddress
    )

    return this.contract.write.report(
      [
        toViemAddress(identifier),
        BigInt(fixedValue.toFixed()),
        toViemAddress(lesserKey),
        toViemAddress(greaterKey),
      ] as const,
      { from: oracleAddress } as any
    )
  }

  /**
   * Updates an oracle value and the median.
   * @param value The amount of US Dollars equal to one CELO.
   * @param oracleAddress The address to report as
   * @param token The token to report for
   */
  async reportStableToken(
    value: BigNumber.Value,
    oracleAddress: Address,
    token: StableToken = StableToken.USDm
  ): Promise<`0x${string}`> {
    return this.report(stableTokenInfos[token].contract, value, oracleAddress)
  }

  /**
   * Returns current configuration parameters.
   */
  async getConfig(): Promise<SortedOraclesConfig> {
    return {
      reportExpirySeconds: await this.reportExpirySeconds(),
    }
  }

  /**
   * @dev Returns human readable configuration of the sortedoracles contract
   * @return SortedOraclesConfig object
   */
  async getHumanReadableConfig() {
    const config = await this.getConfig()
    return {
      reportExpiry: secondsToDurationString(config.reportExpirySeconds),
    }
  }

  /**
   * Helper function to get the rates for StableToken, by passing the address
   * of StableToken to `getRates`.
   */
  getStableTokenRates = async (): Promise<OracleRate[]> =>
    this.getRates(CeloContractEnum.StableToken)

  private _getRates = async (target: string) => {
    const res = await this.contract.read.getRates([toViemAddress(target)])
    return {
      0: [...res[0]] as string[],
      1: [...res[1]].map((v) => v.toString()),
      2: [...res[2]].map((v) => v.toString()),
    }
  }

  /**
   * Gets all elements from the doubly linked list.
   * @param target The ReportTarget, either CeloToken or currency pair in question
   * @return An unpacked list of elements from largest to smallest.
   */
  async getRates(target: ReportTarget): Promise<OracleRate[]> {
    const identifier = await this.toCurrencyPairIdentifier(target)
    const response = await this._getRates(identifier)
    const rates: OracleRate[] = []
    for (let i = 0; i < (response[0] as Address[]).length; i++) {
      const medRelIndex = parseInt((response[2] as string[])[i], 10)
      rates.push({
        address: (response[0] as Address[])[i],
        rate: fromFixed(valueToBigNumber((response[1] as string[])[i])),
        medianRelation: medRelIndex,
      })
    }
    return rates
  }

  private _getTimestamps = async (target: string) => {
    const res = await this.contract.read.getTimestamps([toViemAddress(target)])
    return {
      0: [...res[0]] as string[],
      1: [...res[1]].map((v) => v.toString()),
      2: [...res[2]].map((v) => v.toString()),
    }
  }

  /**
   * Gets all elements from the doubly linked list.
   * @param target The ReportTarget, either CeloToken or currency pair in question
   * @return An unpacked list of elements from largest to smallest.
   */
  async getTimestamps(target: ReportTarget): Promise<OracleTimestamp[]> {
    const identifier = await this.toCurrencyPairIdentifier(target)
    const response = await this._getTimestamps(identifier)
    const timestamps: OracleTimestamp[] = []
    for (let i = 0; i < (response[0] as Address[]).length; i++) {
      const medRelIndex = parseInt((response[2] as string[])[i], 10)
      timestamps.push({
        address: (response[0] as Address[])[i],
        timestamp: valueToBigNumber((response[1] as string[])[i]),
        medianRelation: medRelIndex,
      })
    }
    return timestamps
  }

  async getReports(target: ReportTarget): Promise<OracleReport[]> {
    const [rates, timestamps] = await Promise.all([
      this.getRates(target),
      this.getTimestamps(target),
    ])
    const reports: OracleReport[] = []
    for (const rate of rates) {
      const match = timestamps.filter((t: OracleTimestamp) => eqAddress(t.address, rate.address))
      reports.push({ address: rate.address, rate: rate.rate, timestamp: match[0].timestamp })
    }
    return reports
  }

  private async findLesserAndGreaterKeys(
    target: ReportTarget,
    value: BigNumber.Value,
    oracleAddress: Address
  ): Promise<{ lesserKey: Address; greaterKey: Address }> {
    const currentRates: OracleRate[] = await this.getRates(target)
    let greaterKey = NULL_ADDRESS
    let lesserKey = NULL_ADDRESS

    // This leverages the fact that the currentRates are already sorted from
    // greatest to lowest value
    for (const rate of currentRates) {
      if (!eqAddress(rate.address, oracleAddress)) {
        if (rate.rate.isLessThanOrEqualTo(value)) {
          lesserKey = rate.address as StrongAddress
          break
        }
        greaterKey = rate.address as StrongAddress
      }
    }

    return { lesserKey, greaterKey }
  }

  private async toCurrencyPairIdentifier(target: ReportTarget): Promise<StrongAddress> {
    if (isStableTokenContract(target as CeloContractEnum)) {
      return this.registry.addressFor(target as StableTokenContract)
    } else if (isValidAddress(target)) {
      return target
    } else {
      throw new Error(`${target} is not StableTokenContract deployed or a valid Address`)
    }
  }
}

export type SortedOraclesWrapperType = SortedOraclesWrapper
