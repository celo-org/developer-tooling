import { FeeCurrencyWhitelist } from '@celo/abis/web3/FeeCurrencyWhitelist'
import { StrongAddress } from '@celo/base'
import 'bignumber.js'
import { BaseWrapper, proxyCall } from './BaseWrapper'

const MINIMAL_TOKEN_INFO_ABI = [
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
  {
    type: 'function' as const,
    stateMutability: 'view',
    inputs: [],
    outputs: [{ type: 'address', name: '', internalType: 'address' }],
    name: 'adaptedToken',
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

  async getFeeCurrencyInformation(whitelist?: StrongAddress[]) {
    const feeCurrencies = whitelist ?? (await this.getWhitelist())

    return Promise.all(
      feeCurrencies.map(async (address) => {
        // @ts-expect-error abi typing is not 100% correct but works
        let contract = new this.connection.web3.eth.Contract(MINIMAL_TOKEN_INFO_ABI, address)

        const adaptedToken = (await contract.methods
          .adaptedToken()
          .call()
          .catch(() => undefined)) as StrongAddress | undefined

        if (adaptedToken) {
          // @ts-expect-error abi typing is not 100% correct but works
          contract = new this.connection.web3.eth.Contract(MINIMAL_TOKEN_INFO_ABI, adaptedToken)
        }

        return Promise.all([
          contract.methods
            .name()
            .call()
            .catch(() => undefined) as Promise<string | undefined>,
          contract.methods
            .symbol()
            .call()
            .catch(() => undefined) as Promise<string | undefined>,
        ]).then(([name, symbol]) => ({
          name,
          symbol,
          address,
          adaptedToken,
        }))
      })
    )
  }

  removeToken = proxyCall(this.contract.methods.removeToken)
  addToken = proxyCall(this.contract.methods.addToken)
}

export type GoldTokenWrapperType = FeeCurrencyWhitelistWrapper
