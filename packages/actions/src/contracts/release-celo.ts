import { releaseGoldABI } from '@celo/abis'
import { Address, Client, getContract, GetContractReturnType, PublicClient } from 'viem'

export async function getReleaseCeloContract<T extends Client = PublicClient>(
  client: T,
  address: Address
): Promise<ReleaseCeloContract<T>> {
  return getContract({
    address,
    abi: releaseGoldABI,
    client,
  })
}
export type ReleaseCeloContract<T extends Client = PublicClient> = GetContractReturnType<
  typeof releaseGoldABI,
  T
>
