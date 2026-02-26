import { Address, CeloTransactionObject, EventLog } from '@celo/connect'
import BigNumber from 'bignumber.js'
import {
  BaseWrapper,
  fixidityValueToBigNumber,
  proxyCall,
  proxySend,
  valueToBigNumber,
} from './BaseWrapper'

export interface ReserveConfig {
  tobinTaxStalenessThreshold: BigNumber
  frozenReserveGoldStartBalance: BigNumber
  frozenReserveGoldStartDay: BigNumber
  frozenReserveGoldDays: BigNumber
  otherReserveAddresses: string[]
}

/**
 * Contract for handling reserve for stable currencies
 */
export class ReserveWrapper extends BaseWrapper {
  /**
   * Query Tobin tax staleness threshold parameter.
   * @returns Current Tobin tax staleness threshold.
   */
  tobinTaxStalenessThreshold = proxyCall(
    this.contract,
    'tobinTaxStalenessThreshold',
    undefined,
    valueToBigNumber
  )
  dailySpendingRatio = proxyCall(
    this.contract,
    'getDailySpendingRatio',
    undefined,
    fixidityValueToBigNumber
  )
  isSpender: (account: string) => Promise<boolean> = proxyCall(this.contract, 'isSpender')
  transferGold: (to: string, value: string | number) => CeloTransactionObject<void> = proxySend(
    this.connection,
    this.contract,
    'transferGold'
  )
  getOrComputeTobinTax: () => CeloTransactionObject<void> = proxySend(
    this.connection,
    this.contract,
    'getOrComputeTobinTax'
  )
  frozenReserveGoldStartBalance = proxyCall(
    this.contract,
    'frozenReserveGoldStartBalance',
    undefined,
    valueToBigNumber
  )
  frozenReserveGoldStartDay = proxyCall(
    this.contract,
    'frozenReserveGoldStartDay',
    undefined,
    valueToBigNumber
  )
  frozenReserveGoldDays = proxyCall(
    this.contract,
    'frozenReserveGoldDays',
    undefined,
    valueToBigNumber
  )

  /**
   * @notice Returns a list of weights used for the allocation of reserve assets.
   * @return An array of a list of weights used for the allocation of reserve assets.
   */
  getAssetAllocationWeights: () => Promise<BigNumber[]> = proxyCall(
    this.contract,
    'getAssetAllocationWeights',
    undefined,
    (weights: string[]) => weights.map(valueToBigNumber)
  )

  /**
   * @notice Returns a list of token symbols that have been allocated.
   * @return An array of token symbols that have been allocated.
   */
  getAssetAllocationSymbols = proxyCall(
    this.contract,
    'getAssetAllocationSymbols',
    undefined,
    (symbols: string[]) => symbols.map((symbol: string) => this.connection.hexToAscii(symbol))
  )

  /**
   * @alias {getReserveCeloBalance}
   */
  getReserveGoldBalance = proxyCall(
    this.contract,
    'getReserveGoldBalance',
    undefined,
    valueToBigNumber
  )

  /**
   * @notice Returns the amount of CELO included in the reserve
   * @return {BigNumber} The CELO amount included in the reserve.
   */
  getReserveCeloBalance = this.getReserveGoldBalance

  /**
   * @notice Returns the amount of unfrozen CELO in the Reserve contract.
   * @see {getUnfrozenReserveCeloBalance}
   * @return {BigNumber} amount in wei
   */
  getUnfrozenBalance = proxyCall(
    this.contract,
    'getUnfrozenBalance',
    undefined,
    valueToBigNumber
  )

  /**
   * @notice Returns the amount of unfrozen CELO included in the reserve
   *  contract and in other reserve addresses.
   * @see {getUnfrozenBalance}
   * @return {BigNumber} amount in wei
   */
  getUnfrozenReserveCeloBalance = proxyCall(
    this.contract,
    'getUnfrozenReserveGoldBalance',
    undefined,
    valueToBigNumber
  )

  getOtherReserveAddresses: () => Promise<string[]> = proxyCall(this.contract, 'getOtherReserveAddresses')

  /**
   * Returns current configuration parameters.
   */
  async getConfig(): Promise<ReserveConfig> {
    return {
      tobinTaxStalenessThreshold: await this.tobinTaxStalenessThreshold(),
      frozenReserveGoldStartBalance: await this.frozenReserveGoldStartBalance(),
      frozenReserveGoldStartDay: await this.frozenReserveGoldStartDay(),
      frozenReserveGoldDays: await this.frozenReserveGoldDays(),
      otherReserveAddresses: await this.getOtherReserveAddresses(),
    }
  }

  isOtherReserveAddress: (address: string) => Promise<boolean> = proxyCall(this.contract, 'isOtherReserveAddress')

  async getSpenders(): Promise<Address[]> {
    const spendersAdded = (
      await this.getPastEvents('SpenderAdded', {
        fromBlock: 0,
        toBlock: 'latest',
      })
    ).map((eventlog: EventLog) => eventlog.returnValues.spender)
    const spendersRemoved = (
      await this.getPastEvents('SpenderRemoved', {
        fromBlock: 0,
        toBlock: 'latest',
      })
    ).map((eventlog: EventLog) => eventlog.returnValues.spender)
    return spendersAdded.filter((spender) => !spendersRemoved.includes(spender))
  }
}

export type ReserveWrapperType = ReserveWrapper
