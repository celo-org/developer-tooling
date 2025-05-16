import { registryABI } from '@celo/abis'
import { NULL_ADDRESS } from '@celo/base'
import { Address, PublicClient, WalletClient, publicActions } from 'viem'
import { CeloClient, WalletCeloClient } from '../client'
import { ContractName } from '../contract-name'

export const REGISTRY_CONTRACT_ADDRESS = '0x000000000000000000000000000000000000ce10'

const cache: Record<string, Address> = {}

export const resolveAddress = async (
  client: PublicClient | CeloClient | WalletClient | WalletCeloClient,
  contractName: ContractName
): Promise<Address> => {
  if (cache[contractName]) {
    return cache[contractName]
  }

  if (!('readContract' in client)) {
    client = (client as WalletClient).extend(publicActions)
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
