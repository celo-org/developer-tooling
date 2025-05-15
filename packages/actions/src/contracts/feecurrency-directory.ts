import { feeCurrencyDirectoryABI } from '@celo/abis'
import { getContract, GetContractReturnType, PublicClient, WalletClient } from 'viem'
import { resolveAddress } from './registry'

export async function getFeeCurrencyDirectoryContract<
  T extends WalletClient | PublicClient = PublicClient
>(client: T): Promise<FeeCurrencyDirectory<T>> {
  return getContract({
    address: await resolveAddress(client, 'FeeCurrencyDirectory'),
    abi: feeCurrencyDirectoryABI,
    client,
  })
}
export type FeeCurrencyDirectory<T extends WalletClient | PublicClient = PublicClient> =
  GetContractReturnType<typeof feeCurrencyDirectoryABI, T>
