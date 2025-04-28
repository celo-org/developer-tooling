import { registryABI } from '@celo/abis'
import { NULL_ADDRESS, StrongAddress } from '@celo/base'
import { PublicClient } from 'viem'
import { ContractName } from './contract-name'

export const REGISTRY_CONTRACT_ADDRESS = '0x000000000000000000000000000000000000ce10'

const cache = new Map<string, Promise<StrongAddress>>()

export const resolveAddress = async (
  client: PublicClient,
  contractName: ContractName
): Promise<StrongAddress> => {
  if (cache.has(contractName)) {
    const address = await cache.get(contractName)
    if (!address || address === NULL_ADDRESS) {
      throw new Error(`${contractName} not (yet) registered`)
    }
    return address
  }

  const addressPromise = client.readContract({
    address: REGISTRY_CONTRACT_ADDRESS,
    abi: registryABI,
    functionName: 'getAddressForString',
    args: [contractName],
  })
  cache.set(contractName, addressPromise)

  return addressPromise
}
