import { registryABI } from '@celo/abis'
import { NULL_ADDRESS, StrongAddress } from '@celo/base'
import { Client, publicActions, PublicClient } from 'viem'
import { ContractName } from './contract-name'

export const REGISTRY_CONTRACT_ADDRESS = '0x000000000000000000000000000000000000ce10'

const cache: Record<string, StrongAddress> = {}

export const resolveAddress = async (
  client: Client,
  contractName: ContractName
): Promise<StrongAddress> => {
  if (cache[contractName]) {
    return cache[contractName]
  }

  if (!('readContract' in client)) {
    client = client.extend(publicActions)
  }

  const address = await (client as PublicClient).readContract({
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
