import { sortedOraclesABI } from '@celo/abis'
import { Address, getContract, GetContractReturnType } from 'viem'
import { Clients } from '../client.js'
import { resolveAddress } from './registry.js'

export type SortedOraclesContract<T extends Clients = Clients> = GetContractReturnType<
  typeof sortedOraclesABI,
  T
>

export async function getSortedOraclesContract<T extends Clients = Clients>(
  clients: T
): Promise<SortedOraclesContract<T>> {
  return getContract({
    address: await resolveAddress(clients.public, 'SortedOracles'),
    abi: sortedOraclesABI,
    client: clients,
  })
}
