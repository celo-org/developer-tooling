import { goldTokenABI } from '@celo/abis'
import { Client, getContract, GetContractReturnType, PublicClient } from 'viem'
import { resolveAddress } from './registry'

export async function getCeloERC20Contract<T extends Client = PublicClient>(
  client: T
): Promise<CeloERC20<T>> {
  return getContract({
    address: await resolveAddress(client, 'GoldToken'),
    abi: goldTokenABI,
    client,
  })
}
export type CeloERC20<T extends Client = PublicClient> = GetContractReturnType<
  typeof goldTokenABI,
  T
>
