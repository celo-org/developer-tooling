import { FeeCurrencyDirectory } from '@celo/abis-12/web3/FeeCurrencyDirectory'
import { StrongAddress } from '@celo/base'
import { AbstractFeeCurrencyWrapper } from './AbstractFeeCurrencyWrapper'
import { proxyCall } from './BaseWrapper'

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

  getExchangeRate: (token: StrongAddress) => Promise<{ numerator: string; denominator: string }> =
    proxyCall(this.contract.methods.getExchangeRate)

  getCurrencyConfig: (token: StrongAddress) => Promise<{ oracle: string; intrinsicGas: string }> =
    proxyCall(this.contract.methods.getCurrencyConfig)
}
