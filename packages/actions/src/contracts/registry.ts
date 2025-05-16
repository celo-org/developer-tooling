import { NULL_ADDRESS } from '@celo/base'
import { Address, PublicClient, WalletClient, publicActions } from 'viem'
import { CeloClient, WalletCeloClient } from '../client'
import { ContractName } from '../contract-name'

export const REGISTRY_CONTRACT_ADDRESS = '0x000000000000000000000000000000000000ce10'

// we only use this one function from the registry so we don't need the whole ABI
const ABI = [
  {
    constant: true,
    inputs: [
      {
        internalType: 'string',
        name: 'identifier',
        type: 'string',
      },
    ],
    name: 'getAddressForString',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
] as const

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
    abi: ABI,
    functionName: 'getAddressForString',
    args: [contractName],
  })

  if (address && address !== NULL_ADDRESS) {
    cache[contractName] = address

    return address
  }

  throw new Error(`${contractName} not (yet) registered`)
}
