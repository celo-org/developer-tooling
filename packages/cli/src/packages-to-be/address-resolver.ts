import { registryABI } from '@celo/abis'
import { NULL_ADDRESS, StrongAddress } from '@celo/base'
import { PublicClient } from 'viem'
import { CeloClient } from './client'
import { ContractName } from './contract-name'

export const REGISTRY_CONTRACT_ADDRESS = '0x000000000000000000000000000000000000ce10'

const cache: Record<string, StrongAddress> = {}

export const resolveAddress = async (
  client: PublicClient | CeloClient,
  contractName: ContractName
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
