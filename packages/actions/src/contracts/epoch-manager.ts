import { epochManagerABI } from '@celo/abis'
import { getContract, GetContractReturnType, PublicClient, WalletClient } from 'viem'
import { resolveAddress } from './registry'

export async function getEpochManagerContract<T extends WalletClient | PublicClient = PublicClient>(
  client: T
): Promise<EpochManager<T>> {
  return getContract({
    address: await resolveAddress(client, 'EpochManager'),
    abi: epochManagerABI,
    client,
  })
}
export type EpochManager<T extends WalletClient | PublicClient = PublicClient> =
  GetContractReturnType<typeof epochManagerABI, T>
