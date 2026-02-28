import { StrongAddress } from '@celo/base'
import type {} from '@celo/connect'
import BigNumber from 'bignumber.js'
import { AbstractFeeCurrencyWrapper } from './AbstractFeeCurrencyWrapper'
import { toViemAddress, valueToBigNumber } from './BaseWrapper'

export interface FeeCurrencyDirectoryConfig {
  intrinsicGasForAlternativeFeeCurrency: {
    [feeCurrencyAddress: StrongAddress]: BigNumber
  }
}

/**
 * FeeCurrencyDirectory contract listing available currencies usable to pay fees
 */
export class FeeCurrencyDirectoryWrapper extends AbstractFeeCurrencyWrapper {
  getCurrencies = async () => {
    const addresses = (await this.contract.read.getCurrencies()) as string[]
    return [...new Set(addresses)].sort() as StrongAddress[]
  }

  getAddresses(): Promise<StrongAddress[]> {
    return this.getCurrencies()
  }

  getExchangeRate = async (token: StrongAddress) => {
    const res = (await this.contract.read.getExchangeRate([toViemAddress(token)])) as readonly [
      bigint,
      bigint,
    ]
    return {
      numerator: valueToBigNumber(res[0].toString()),
      denominator: valueToBigNumber(res[1].toString()),
    }
  }

  getCurrencyConfig = async (token: StrongAddress) => {
    const res = (await this.contract.read.getCurrencyConfig([toViemAddress(token)])) as {
      oracle: string
      intrinsicGas: bigint
    }
    return {
      oracle: res.oracle as StrongAddress,
      intrinsicGas: valueToBigNumber(res.intrinsicGas.toString()),
    }
  }

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
