import { FeeCurrencyDirectory } from '@celo/abis-cel2/web3/FeeCurrencyDirectory'
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

  // TODO add other methods as well
}
