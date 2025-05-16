import { epochManagerABI } from '@celo/abis'
import { Client, getContract, GetContractReturnType, PublicClient } from 'viem'
import { resolveAddress } from './registry'

export async function getEpochManagerContract<T extends Client = PublicClient>(
  client: T
): Promise<EpochManager<T>> {
  return getContract({
    address: await resolveAddress(client, 'EpochManager'),
    abi: epochManagerABI,
    client,
  })
}
export type EpochManager<T extends Client = PublicClient> = GetContractReturnType<
  typeof epochManagerABI,
  T
>
