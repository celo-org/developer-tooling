import { reserveABI } from '@celo/abis'
import { Address, EventLog } from '@celo/connect'
import BigNumber from 'bignumber.js'
import {
  BaseWrapper,
  fixidityValueToBigNumber,
  toViemAddress,
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
export class ReserveWrapper extends BaseWrapper<typeof reserveABI> {
  /**
   * Query Tobin tax staleness threshold parameter.
   * @returns Current Tobin tax staleness threshold.
   */
  tobinTaxStalenessThreshold = async (): Promise<BigNumber> => {
    const res = await this.contract.read.tobinTaxStalenessThreshold()
    return valueToBigNumber(res.toString())
  }
  dailySpendingRatio = async (): Promise<BigNumber> => {
    const res = await this.contract.read.getDailySpendingRatio()
    return fixidityValueToBigNumber(res.toString())
  }
  isSpender = async (account: string): Promise<boolean> => {
    return this.contract.read.isSpender([toViemAddress(account)])
  }
  transferGold = (to: string, value: string | number) => this.buildTx('transferGold', [to, value])
  getOrComputeTobinTax = () => this.buildTx('getOrComputeTobinTax', [])
  frozenReserveGoldStartBalance = async (): Promise<BigNumber> => {
    const res = await this.contract.read.frozenReserveGoldStartBalance()
    return valueToBigNumber(res.toString())
  }
  frozenReserveGoldStartDay = async (): Promise<BigNumber> => {
    const res = await this.contract.read.frozenReserveGoldStartDay()
    return valueToBigNumber(res.toString())
  }
  frozenReserveGoldDays = async (): Promise<BigNumber> => {
    const res = await this.contract.read.frozenReserveGoldDays()
    return valueToBigNumber(res.toString())
  }

  /**
   * @notice Returns a list of weights used for the allocation of reserve assets.
   * @return An array of a list of weights used for the allocation of reserve assets.
   */
  getAssetAllocationWeights = async (): Promise<BigNumber[]> => {
    const res = await this.contract.read.getAssetAllocationWeights()
    return [...res].map((w) => valueToBigNumber(w.toString()))
  }

  /**
   * @notice Returns a list of token symbols that have been allocated.
   * @return An array of token symbols that have been allocated.
   */
  getAssetAllocationSymbols = async (): Promise<string[]> => {
    const res = await this.contract.read.getAssetAllocationSymbols()
    return [...res].map((symbol) => this.connection.hexToAscii(symbol))
  }

  /**
   * @alias {getReserveCeloBalance}
   */
  getReserveGoldBalance = async (): Promise<BigNumber> => {
    const res = await this.contract.read.getReserveGoldBalance()
    return valueToBigNumber(res.toString())
  }

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
  getUnfrozenBalance = async (): Promise<BigNumber> => {
    const res = await this.contract.read.getUnfrozenBalance()
    return valueToBigNumber(res.toString())
  }

  /**
   * @notice Returns the amount of unfrozen CELO included in the reserve
   *  contract and in other reserve addresses.
   * @see {getUnfrozenBalance}
   * @return {BigNumber} amount in wei
   */
  getUnfrozenReserveCeloBalance = async (): Promise<BigNumber> => {
    const res = await this.contract.read.getUnfrozenReserveGoldBalance()
    return valueToBigNumber(res.toString())
  }

  getOtherReserveAddresses = async (): Promise<string[]> => {
    const res = await this.contract.read.getOtherReserveAddresses()
    return [...res] as string[]
  }

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

  isOtherReserveAddress = async (address: string): Promise<boolean> => {
    return this.contract.read.isOtherReserveAddress([toViemAddress(address)])
  }

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
