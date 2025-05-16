import { electionABI } from '@celo/abis'
import { Client, getContract, GetContractReturnType, PublicClient } from 'viem'
import { resolveAddress } from './registry'

export type ElectionContract<T extends Client = PublicClient> = GetContractReturnType<
  typeof electionABI,
  T
>

export async function getElectionContract<T extends Client = PublicClient>(
  client: T
): Promise<ElectionContract<T>> {
  return getContract({
    address: await resolveAddress(client, 'Election'),
    abi: electionABI,
    client,
  })
}
