import { goldTokenABI } from '@celo/abis'
import { getContract, GetContractReturnType } from 'viem'
import { Clients } from '../client'
import { resolveAddress } from './registry'

export type CeloERC20<T extends Clients = Clients> = GetContractReturnType<typeof goldTokenABI, T>

export async function getCeloERC20Contract<T extends Clients = Clients>(
  clients: T
): Promise<CeloERC20<T>> {
  return getContract({
    address: await resolveAddress(clients.public, 'GoldToken'),
    abi: goldTokenABI,
    client: clients,
  })
}
