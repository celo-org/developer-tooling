import { NULL_ADDRESS } from '@celo/base/lib/address.js'
import { Address, Client } from 'viem'
import { readContract } from 'viem/actions'
import { ContractName } from '../contract-name.js'

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
  client: Client,
  contractName: ContractName
): Promise<Address> => {
  if (cache[contractName]) {
    return cache[contractName]
  }

  const address = await readContract(client, {
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
