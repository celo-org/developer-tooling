import { StrongAddress } from '@celo/base'
import { AbiItem, createViemTxObject } from '@celo/connect'
import { BaseWrapper, type ContractLike } from './BaseWrapper'

const MINIMAL_TOKEN_INFO_ABI: AbiItem[] = [
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

export abstract class AbstractFeeCurrencyWrapper extends BaseWrapper {
  abstract getAddresses(): Promise<StrongAddress[]>

  async getFeeCurrencyInformation(whitelist?: StrongAddress[]) {
    const feeCurrencies = whitelist ?? (await this.getAddresses())

    return Promise.all(
      feeCurrencies.map(async (address) => {
        let contract: ContractLike = this.connection.getCeloContract(
          MINIMAL_TOKEN_INFO_ABI,
          address
        )

        const adaptedToken = (await createViemTxObject<string>(
          this.connection,
          contract,
          'adaptedToken',
          []
        )
          .call()
          .catch(() =>
            createViemTxObject<string>(this.connection, contract, 'getAdaptedToken', [])
              .call()
              .catch(() => undefined)
          )) as StrongAddress | undefined
        // if standard didnt work try alt

        if (adaptedToken) {
          contract = this.connection.getCeloContract(MINIMAL_TOKEN_INFO_ABI, adaptedToken)
        }

        return Promise.all([
          createViemTxObject<string>(this.connection, contract, 'name', [])
            .call()
            .catch(() => undefined) as Promise<string | undefined>,
          createViemTxObject<string>(this.connection, contract, 'symbol', [])
            .call()
            .catch(() => undefined) as Promise<string | undefined>,
          createViemTxObject<string>(this.connection, contract, 'decimals', [])
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
