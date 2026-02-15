import { StrongAddress } from '@celo/base'
import type { Contract } from '@celo/connect'
import BigNumber from 'bignumber.js'
import { AbstractFeeCurrencyWrapper } from './AbstractFeeCurrencyWrapper'
import { proxyCall, valueToBigNumber } from './BaseWrapper'

export interface FeeCurrencyDirectoryConfig {
  intrinsicGasForAlternativeFeeCurrency: {
    [feeCurrencyAddress: StrongAddress]: BigNumber
  }
}

/**
 * FeeCurrencyDirectory contract listing available currencies usable to pay fees
 */
export class FeeCurrencyDirectoryWrapper extends AbstractFeeCurrencyWrapper<Contract> {
  getCurrencies = proxyCall(
    this.contract.methods.getCurrencies,
    undefined,
    (addresses: string[]) => [...new Set(addresses)].sort() as StrongAddress[]
  )

  getAddresses(): Promise<StrongAddress[]> {
    return this.getCurrencies()
  }

  getExchangeRate: (
    token: StrongAddress
  ) => Promise<{ numerator: BigNumber; denominator: BigNumber }> = proxyCall(
    this.contract.methods.getExchangeRate,
    undefined,
    (res: { numerator: string; denominator: string }) => ({
      numerator: valueToBigNumber(res.numerator),
      denominator: valueToBigNumber(res.denominator),
    })
  )

  getCurrencyConfig: (
    token: StrongAddress
  ) => Promise<{ oracle: StrongAddress; intrinsicGas: BigNumber }> = proxyCall(
    this.contract.methods.getCurrencyConfig,
    undefined,
    (res: { oracle: string; intrinsicGas: string }) => ({
      oracle: res.oracle as StrongAddress,
      intrinsicGas: valueToBigNumber(res.intrinsicGas),
    })
  )

  /**
   * Returns current configuration parameters.
   */
  async getConfig(): Promise<FeeCurrencyDirectoryConfig> {
    const addresses = await this.getAddresses()
    const config: FeeCurrencyDirectoryConfig = { intrinsicGasForAlternativeFeeCurrency: {} }

    for (const address of addresses) {
      config.intrinsicGasForAlternativeFeeCurrency[address] = (
        await this.getCurrencyConfig(address)
      ).intrinsicGas
    }

    return config
  }
}
