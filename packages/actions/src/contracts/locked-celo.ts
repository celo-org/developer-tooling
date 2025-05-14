import { lockedGoldABI } from '@celo/abis-12'
import { getContract, GetContractReturnType, PublicClient, WalletClient } from 'viem'
import { resolveAddress } from './registry'

export async function getLockedGoldContract<T extends WalletClient | PublicClient = PublicClient>(
  client: T
): Promise<LockedGoldContract<T>> {
  return getContract({
    address: await resolveAddress(client, 'LockedGold'),
    abi: lockedGoldABI,
    client,
  })
}
export type LockedGoldContract<T extends WalletClient | PublicClient = PublicClient> =
  GetContractReturnType<typeof lockedGoldABI, T>
