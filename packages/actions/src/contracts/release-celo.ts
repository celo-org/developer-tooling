import { releaseGoldABI } from '@celo/abis'
import { Address, getContract, GetContractReturnType } from 'viem'
import { Clients } from '../client.js'

export async function getReleaseCeloContract<T extends Clients = Clients>(
  clients: T,
  address: Address
): Promise<ReleaseCeloContract<T>> {
  return getContract({
    address,
    abi: releaseGoldABI,
    client: clients,
  })
}
export type ReleaseCeloContract<T extends Clients = Clients> = GetContractReturnType<
  typeof releaseGoldABI,
  T
>
