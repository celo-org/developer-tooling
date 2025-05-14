import { goldTokenABI } from '@celo/abis-12'
import { getContract, GetContractReturnType, PublicClient, WalletClient } from 'viem'
import { resolveAddress } from './registry'

export async function getCeloERC20Contract<T extends WalletClient | PublicClient = PublicClient>(
  client: T
): Promise<CeloERC20<T>> {
  return getContract({
    address: await resolveAddress(client, 'GoldToken'),
    abi: goldTokenABI,
    client,
  })
}
export type CeloERC20<T extends WalletClient | PublicClient = PublicClient> = GetContractReturnType<
  typeof goldTokenABI,
  T
>
