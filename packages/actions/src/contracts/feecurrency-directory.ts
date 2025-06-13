import { feeCurrencyDirectoryABI } from '@celo/abis'
import { getContract, GetContractReturnType } from 'viem'
import { Clients } from '../client.js'
import { resolveAddress } from './registry.js'

export async function getFeeCurrencyDirectoryContract<T extends Clients = Clients>(
  clients: T
): Promise<FeeCurrencyDirectory<T>> {
  return getContract({
    address: await resolveAddress(clients.public, 'FeeCurrencyDirectory'),
    abi: feeCurrencyDirectoryABI,
    client: clients,
  })
}
export type FeeCurrencyDirectory<T extends Clients = Clients> = GetContractReturnType<
  typeof feeCurrencyDirectoryABI,
  T
>
