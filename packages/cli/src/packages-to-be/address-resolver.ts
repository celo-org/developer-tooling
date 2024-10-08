import { registryABI } from '@celo/abis'
import { NULL_ADDRESS, REGISTRY_CONTRACT_ADDRESS, StrongAddress } from '@celo/base'
import { PublicClient, Transport } from 'viem'
import { celo } from 'viem/chains'

export interface ContractAddressResolver {
  resolve(address: string): Promise<StrongAddress>
}

export class ViemAddressResolver implements ContractAddressResolver {
  constructor(private readonly publicClient: PublicClient<Transport, typeof celo>) {}

  async resolve(contractName: string): Promise<StrongAddress> {
    const address = await this.publicClient.readContract({
      address: REGISTRY_CONTRACT_ADDRESS,
      abi: registryABI,
      functionName: 'getAddressForString',
      args: [contractName],
    })

    if (address && address !== NULL_ADDRESS) {
      return address
    }

    throw new Error(`Contract ${contractName} not found in the registry`)
  }
}
