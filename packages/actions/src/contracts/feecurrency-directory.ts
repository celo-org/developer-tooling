import { feeCurrencyDirectoryABI } from '@celo/abis'
import { Client, getContract, GetContractReturnType, PublicClient } from 'viem'
import { resolveAddress } from './registry'

export async function getFeeCurrencyDirectoryContract<T extends Client = PublicClient>(
  client: T
): Promise<FeeCurrencyDirectory<T>> {
  return getContract({
    address: await resolveAddress(client, 'FeeCurrencyDirectory'),
    abi: feeCurrencyDirectoryABI,
    client,
  })
}
export type FeeCurrencyDirectory<T extends Client = PublicClient> = GetContractReturnType<
  typeof feeCurrencyDirectoryABI,
  T
>
