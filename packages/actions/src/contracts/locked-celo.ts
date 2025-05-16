import { lockedGoldABI } from '@celo/abis'
import { Client, getContract, GetContractReturnType, PublicClient } from 'viem'
import { resolveAddress } from './registry'

export async function getLockedCeloContract<T extends Client = PublicClient>(
  client: T
): Promise<LockedCeloContract<T>> {
  return getContract({
    address: await resolveAddress(client, 'LockedGold'),
    abi: lockedGoldABI,
    client,
  })
}
export type LockedCeloContract<T extends Client = PublicClient> = GetContractReturnType<
  typeof lockedGoldABI,
  T
>
