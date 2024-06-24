import { FeeCurrencyWhitelist } from '@celo/abis/web3/FeeCurrencyWhitelist'
import { StrongAddress } from '@celo/base'
import { AbstractFeeCurrencyWrapper } from './AbstractFeeCurrencyWrapper'
import { proxyCall } from './BaseWrapper'

/**
 * FeeCurrencyWhitelist contract listing available currencies usable to pay fees
 */
export class FeeCurrencyWhitelistWrapper extends AbstractFeeCurrencyWrapper<FeeCurrencyWhitelist> {
  getWhitelist = proxyCall(
    this.contract.methods.getWhitelist,
    undefined,
    (addresses) => [...new Set(addresses)].sort() as StrongAddress[]
  )

  removeToken = proxyCall(this.contract.methods.removeToken)
  addToken = proxyCall(this.contract.methods.addToken)

  getAddresses(): Promise<StrongAddress[]> {
    return this.getWhitelist()
  }
}

export type GoldTokenWrapperType = FeeCurrencyWhitelistWrapper
