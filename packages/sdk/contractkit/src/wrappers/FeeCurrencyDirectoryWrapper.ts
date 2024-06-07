import { FeeCurrencyDirectory } from '@celo/abis-12/web3/FeeCurrencyDirectory'
import { StrongAddress } from '@celo/base'
import BigNumber from 'bignumber.js'
import { AbstractFeeCurrencyWrapper } from './AbstractFeeCurrencyWrapper'
import { proxyCall, valueToBigNumber } from './BaseWrapper'

/**
 * FeeCurrencyDirectory contract listing available currencies usable to pay fees
 */
export class FeeCurrencyDirectoryWrapper extends AbstractFeeCurrencyWrapper<FeeCurrencyDirectory> {
  getCurrencies = proxyCall(
    this.contract.methods.getCurrencies,
    undefined,
    (addresses) => [...new Set(addresses)].sort() as StrongAddress[]
  )

  getAddresses(): Promise<StrongAddress[]> {
    return this.getCurrencies()
  }

  getExchangeRate: (
    token: StrongAddress
  ) => Promise<{ numerator: BigNumber; denominator: BigNumber }> = proxyCall(
    this.contract.methods.getExchangeRate,
    undefined,
    (res) => ({
      numerator: valueToBigNumber(res.numerator),
      denominator: valueToBigNumber(res.denominator),
    })
  )

  getCurrencyConfig: (
    token: StrongAddress
  ) => Promise<{ oracle: StrongAddress; intrinsicGas: BigNumber }> = proxyCall(
    this.contract.methods.getCurrencyConfig,
    undefined,
    (res) => ({
      oracle: res.oracle as StrongAddress,
      intrinsicGas: valueToBigNumber(res.intrinsicGas),
    })
  )
}
