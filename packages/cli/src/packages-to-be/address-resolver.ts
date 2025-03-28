import { registryABI } from '@celo/abis'
import { NULL_ADDRESS, StrongAddress } from '@celo/base'
import { PublicClient } from 'viem'

export const REGISTRY_CONTRACT_ADDRESS = '0x000000000000000000000000000000000000ce10'

const cache: Record<string, StrongAddress> = {}

// When we need more contracts here we can either list them or fetch all values of an Enum,
// but by abstracting the type we have flexibility and single point of change
export type ContractName =
  | 'Accounts'
  | 'Governance'
  | 'LockedGold'
  | 'Validators'
  | 'GoldToken'
  | 'StableToken'
  | 'StableTokenEUR'
  | 'StableTokenBRL'

export const resolveAddress = async (
  client: PublicClient,
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
