import { lockedGoldABI } from '@celo/abis'
import { getContract, GetContractReturnType, PublicClient, WalletClient } from 'viem'
import { resolveAddress } from './registry'

export async function getLockedCeloContract<T extends WalletClient | PublicClient = PublicClient>(
  client: T
): Promise<LockedCeloContract<T>> {
  return getContract({
    address: await resolveAddress(client, 'LockedGold'),
    abi: lockedGoldABI,
    client,
  })
}
export type LockedCeloContract<T extends WalletClient | PublicClient = PublicClient> =
  GetContractReturnType<typeof lockedGoldABI, T>
