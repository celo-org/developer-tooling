import { reserveABI } from '@celo/abis'
import { Address, getContract, GetContractReturnType } from 'viem'
import { Clients } from '../client.js'
import { resolveAddress } from './registry.js'

export type ReserveContract<T extends Clients = Clients> = GetContractReturnType<
  typeof reserveABI,
  T
>

export async function getReserveContract<T extends Clients = Clients>(
  clients: T
): Promise<ReserveContract<T>> {
  return getContract({
    address: await resolveAddress(clients.public, 'Reserve'),
    abi: reserveABI,
    client: clients,
  })
}
