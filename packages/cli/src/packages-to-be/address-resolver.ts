import { registryABI } from '@celo/abis'
import { NULL_ADDRESS, StrongAddress } from '@celo/base'
import { PublicClient } from 'viem'

export const REGISTRY_CONTRACT_ADDRESS = '0x000000000000000000000000000000000000ce10'

const cache: Record<string, StrongAddress> = {}

// TODO should use the enum for contract names?
export const resolveAddress = async (
  client: PublicClient,
  contractName: string
): Promise<StrongAddress> => {
  if (cache[contractName]) {
    return cache[contractName]
  }

  const address = await client.readContract({
    address: REGISTRY_CONTRACT_ADDRESS,
    abi: registryABI,
    functionName: 'getAddressForString',
    args: [contractName],
  })

  if (address && address !== NULL_ADDRESS) {
    cache[contractName] = address

    return address
  }

  throw new Error(`${contractName} not (yet) registered`)
}
