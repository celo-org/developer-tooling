import { StrongAddress } from '@celo/base'
import { Contract } from '@celo/connect'
import { BaseWrapper } from './BaseWrapper'

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
  //  usdt adapter uses slightly different interface this adaptedToken/getAdaptedToken are aliases
  {
    type: 'function' as const,
    stateMutability: 'view',
    inputs: [],
    outputs: [{ type: 'address', name: '', internalType: 'address' }],
    name: 'getAdaptedToken',
  },
  {
    type: 'function' as const,
    stateMutability: 'view',
    inputs: [],
    outputs: [{ type: 'uint8', name: '', internalType: 'uint8' }],
    name: 'decimals',
  },
] as const

export abstract class AbstractFeeCurrencyWrapper<
  TContract extends Contract
> extends BaseWrapper<TContract> {
  abstract getAddresses(): Promise<StrongAddress[]>

  async getFeeCurrencyInformation(whitelist?: StrongAddress[]) {
    const feeCurrencies = whitelist ?? (await this.getAddresses())

    return Promise.all(
      feeCurrencies.map(async (address) => {
        // @ts-expect-error abi typing is not 100% correct but works
        let contract = new this.connection.web3.eth.Contract(MINIMAL_TOKEN_INFO_ABI, address)

        const adaptedToken = (await contract.methods
          .adaptedToken()
          .call()
          .catch(() =>
            contract.methods
              .getAdaptedToken()
              .call()
              .catch(() => undefined)
          )) as StrongAddress | undefined
        // if standard didnt work try alt

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
          contract.methods
            .decimals()
            .call()
            .then((x: string) => x && parseInt(x, 10))
            .catch(() => undefined) as Promise<number | undefined>,
        ]).then(([name, symbol, decimals]) => ({
          name,
          symbol,
          address,
          adaptedToken,
          decimals,
        }))
      })
    )
  }
}
