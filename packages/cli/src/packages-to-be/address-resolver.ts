import { registryABI } from '@celo/abis'
import { NULL_ADDRESS, REGISTRY_CONTRACT_ADDRESS, StrongAddress } from '@celo/base'
import { PublicClient, Transport } from 'viem'
import { celo } from 'viem/chains'

export interface ContractAddressResolver {
  resolve(address: string): Promise<StrongAddress>
}

export class ViemAddressResolver implements ContractAddressResolver {
  protected cache: Record<string, StrongAddress> = {}

  constructor(private readonly publicClient: PublicClient<Transport, typeof celo>) {}

  async resolve(contractName: string): Promise<StrongAddress> {
    if (this.cache[contractName]) {
      return this.cache[contractName]
    }

    const address = await this.publicClient.readContract({
      address: REGISTRY_CONTRACT_ADDRESS,
      abi: registryABI,
      functionName: 'getAddressForString',
      args: [contractName],
    })

    if (address && address !== NULL_ADDRESS) {
      this.cache[contractName] = address

      return address
    }

    throw new Error(`${contractName} not (yet) registered`)
  }
}
