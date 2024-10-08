import { feeCurrencyWhitelistABI } from '@celo/abis'
import { feeCurrencyDirectoryABI } from '@celo/abis-12/FeeCurrencyDirectory'
import { StrongAddress } from '@celo/base'
import { getContract, PublicClient, Transport } from 'viem'
import { celo } from 'viem/chains'
import { ContractAddressResolver } from './address-resolver'

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

export interface FeeCurrencyInformation {
  name?: string
  symbol?: string
  address: StrongAddress
  adaptedToken?: StrongAddress
  decimals?: number
}

export interface FeeCurrencyProvider {
  getAddresses(): Promise<StrongAddress[]>
  getFeeCurrencyInformation(whitelist?: StrongAddress[]): Promise<FeeCurrencyInformation[]>
}

export class ViemFeeCurrencyProvider implements FeeCurrencyProvider {
  constructor(
    private readonly publicClient: PublicClient<Transport, typeof celo>,
    private readonly addressResolver: ContractAddressResolver,
    private readonly isL2: boolean
  ) {}

  async getAddresses(): Promise<StrongAddress[]> {
    if (!this.isL2) {
      return (await this.publicClient.readContract({
        address: await this.addressResolver.resolve('FeeCurrencyWhitelist'),
        abi: feeCurrencyWhitelistABI,
        functionName: 'getWhitelist',
      })) as StrongAddress[]
    }

    return (await this.publicClient.readContract({
      address: await this.addressResolver.resolve('FeeCurrencyDirectory'),
      abi: feeCurrencyDirectoryABI,
      functionName: 'getCurrencies',
    })) as StrongAddress[]
  }

  async getFeeCurrencyInformation(whitelist?: StrongAddress[]): Promise<FeeCurrencyInformation[]> {
    const feeCurrencies = whitelist ?? (await this.getAddresses())

    return Promise.all(
      feeCurrencies.map(async (address) => {
        let contract = getContract({
          address,
          abi: MINIMAL_TOKEN_INFO_ABI,
          client: this.publicClient,
        })

        const adaptedToken = (await contract.read
          .adaptedToken()
          .catch(() => contract.read.getAdaptedToken().catch(() => undefined))) as
          | StrongAddress
          | undefined
        // if standard didnt work try alt

        if (adaptedToken) {
          contract = getContract({
            address: adaptedToken,
            abi: MINIMAL_TOKEN_INFO_ABI,
            client: this.publicClient,
          })
        }

        return Promise.all([
          contract.read.name().catch(() => undefined) as Promise<string | undefined>,
          contract.read.symbol().catch(() => undefined) as Promise<string | undefined>,
          contract.read
            .decimals()
            // .then((x: string) => x && parseInt(x, 10))
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
