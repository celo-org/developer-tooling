// NOTE: removing this import results in `yarn build` failures in Dockerfiles
// after the move to node 10. This allows types to be inferred without
// referencing '@celo/utils/node_modules/bignumber.js'
import { FeeCurrencyWhitelist } from '@celo/abis/web3/FeeCurrencyWhitelist'
import { StrongAddress } from '@celo/base'
import 'bignumber.js'
import { BaseWrapper, proxyCall } from './BaseWrapper'

const minimal_token_info_abi = [
  {
    type: 'function' as const,
    stateMutability: 'view',
    outputs: [{ type: 'string', name: '', internalType: 'string' }],
    name: 'symbol',
    inputs: [],
  },
  {
    type: 'function' as const,
    stateMutability: 'view',
    outputs: [{ type: 'string', name: '', internalType: 'string' }],
    name: 'name',
    inputs: [],
  },
] as const

/**
 * FeeCurrencyWhitelist contract listing available currencies usable to pay fees
 */
export class FeeCurrencyWhitelistWrapper extends BaseWrapper<FeeCurrencyWhitelist> {
  getWhitelist = proxyCall(
    this.contract.methods.getWhitelist,
    undefined,
    (addresses) => [...new Set(addresses)].sort() as StrongAddress[]
  )

  async getFeeCurrencyInformation(whitelist?: StrongAddress[]): Promise<
    {
      name: string | undefined
      address: StrongAddress
      symbol: string | undefined
    }[]
  > {
    const feeCurrencies = whitelist ?? (await this.getWhitelist())

    return Promise.all(
      feeCurrencies.map(async (address) => {
        // @ts-expect-error abi typing is not 100% correct but works
        const contract = new this.connection.web3.eth.Contract(minimal_token_info_abi, address)
        return Promise.all([
          contract.methods
            .name()
            .call()
            .catch(() => undefined),
          contract.methods
            .symbol()
            .call()
            .catch(() => undefined),
          address,
        ]).then(([name, symbol, address]) => ({ name, symbol, address }))
      })
    )
  }

  removeToken = proxyCall(this.contract.methods.removeToken)
  addToken = proxyCall(this.contract.methods.addToken)
}

export type GoldTokenWrapperType = FeeCurrencyWhitelistWrapper
