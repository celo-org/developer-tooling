import { electionABI } from '@celo/abis'
import { getContract, GetContractReturnType, PublicClient, WalletClient } from 'viem'
import { resolveAddress } from './registry'

export type ElectionContract<T extends WalletClient | PublicClient = PublicClient> =
  GetContractReturnType<typeof electionABI, T>

export async function getElectionContract<T extends WalletClient | PublicClient = PublicClient>(
  client: T
): Promise<ElectionContract<T>> {
  return getContract({
    address: await resolveAddress(client, 'Election'),
    abi: electionABI,
    client,
  })
}
