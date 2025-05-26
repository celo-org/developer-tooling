import { electionABI } from '@celo/abis'
import { getContract, GetContractReturnType } from 'viem'
import { Clients } from '../client'
import { resolveAddress } from './registry'

export type ElectionContract<T extends Clients = Clients> = GetContractReturnType<
  typeof electionABI,
  T
>

export async function getElectionContract<T extends Clients = Clients>(
  clients: T
): Promise<ElectionContract<T>> {
  return getContract({
    address: await resolveAddress(clients.public, 'Election'),
    abi: electionABI,
    client: clients,
  })
}
