import { scoreManagerABI } from '@celo/abis'
import { getContract, GetContractReturnType } from 'viem'
import { Clients } from '../client.js'
import { resolveAddress } from './registry.js'

export type ScoreManager<T extends Clients = Clients> = GetContractReturnType<
  typeof scoreManagerABI,
  T
>

export async function getScoreManagerContract<T extends Clients = Clients>(
  clients: T
): Promise<ScoreManager<T>> {
  return getContract({
    address: await resolveAddress(clients.public, 'ScoreManager'),
    abi: scoreManagerABI,
    client: clients,
  })
}
