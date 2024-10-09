import { feeCurrencyWhitelistABI } from '@celo/abis'
import { feeCurrencyDirectoryABI } from '@celo/abis-12/FeeCurrencyDirectory'
import { StrongAddress } from '@celo/base'
import { PublicClient, Transport } from 'viem'
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

abstract class AbstractFeeCurrencyProvider implements FeeCurrencyProvider {
  constructor(
    protected readonly addressResolver: ContractAddressResolver,
    private readonly isL2: boolean
  ) {}

  abstract callAdaptedToken(address: StrongAddress): Promise<StrongAddress | undefined>

  abstract callGetAdaptedToken(address: StrongAddress): Promise<StrongAddress | undefined>

  abstract callName(address: StrongAddress): Promise<string | undefined>

  abstract callSymbol(address: StrongAddress): Promise<string | undefined>

  abstract callDecimals(address: StrongAddress): Promise<number | undefined>

  abstract getFeeCurrencyWhitelistAddresses(): Promise<StrongAddress[]>

  abstract getFeeCurrencyDirectoryAddresses(): Promise<StrongAddress[]>

  async getFeeCurrencyInformation(whitelist?: StrongAddress[]): Promise<FeeCurrencyInformation[]> {
    const feeCurrencies = whitelist ?? (await this.getAddresses())

    return Promise.all(
      feeCurrencies.map(async (address) => {
        let useAddress = address
        const adaptedToken = (await this.callAdaptedToken(address)
          // if standard didnt work try alt
          .catch(() => this.callGetAdaptedToken(address).catch(() => undefined))) as
          | StrongAddress
          | undefined

        if (adaptedToken) {
          useAddress = adaptedToken
        }

        return Promise.all([
          this.callName(useAddress).catch(() => undefined) as Promise<string | undefined>,
          this.callSymbol(useAddress).catch(() => undefined) as Promise<string | undefined>,
          this.callDecimals(useAddress)
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

  async getAddresses(): Promise<StrongAddress[]> {
    if (!this.isL2) {
      return this.getFeeCurrencyWhitelistAddresses()
    }

    return this.getFeeCurrencyDirectoryAddresses()
  }
}

export class ViemFeeCurrencyProvider extends AbstractFeeCurrencyProvider {
  constructor(
    private readonly publicClient: PublicClient<Transport, typeof celo>,
    addressResolver: ContractAddressResolver,
    isL2: boolean
  ) {
    super(addressResolver, isL2)
  }

  callAdaptedToken(address: StrongAddress): Promise<StrongAddress | undefined> {
    return this.publicClient.readContract({
      address: address,
      abi: MINIMAL_TOKEN_INFO_ABI,
      functionName: 'adaptedToken',
    })
  }

  callGetAdaptedToken(address: StrongAddress): Promise<StrongAddress | undefined> {
    return this.publicClient.readContract({
      address: address,
      abi: MINIMAL_TOKEN_INFO_ABI,
      functionName: 'getAdaptedToken',
    })
  }

  callName(address: StrongAddress): Promise<string | undefined> {
    return this.publicClient.readContract({
      address: address,
      abi: MINIMAL_TOKEN_INFO_ABI,
      functionName: 'name',
    })
  }

  callSymbol(address: StrongAddress) {
    return this.publicClient.readContract({
      address: address,
      abi: MINIMAL_TOKEN_INFO_ABI,
      functionName: 'symbol',
    })
  }

  callDecimals(address: StrongAddress) {
    return this.publicClient.readContract({
      address: address,
      abi: MINIMAL_TOKEN_INFO_ABI,
      functionName: 'decimals',
    })
  }

  async getFeeCurrencyWhitelistAddresses(): Promise<StrongAddress[]> {
    return (await this.publicClient.readContract({
      address: await this.addressResolver.resolve('FeeCurrencyWhitelist'),
      abi: feeCurrencyWhitelistABI,
      functionName: 'getWhitelist',
    })) as StrongAddress[]
  }

  async getFeeCurrencyDirectoryAddresses(): Promise<StrongAddress[]> {
    return (await this.publicClient.readContract({
      address: await this.addressResolver.resolve('FeeCurrencyDirectory'),
      abi: feeCurrencyDirectoryABI,
      functionName: 'getCurrencies',
    })) as StrongAddress[]
  }
}
