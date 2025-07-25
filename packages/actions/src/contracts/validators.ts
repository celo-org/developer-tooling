import { validatorsABI } from '@celo/abis'
import { getContract, GetContractReturnType } from 'viem'
import { Clients } from '../client.js'
import { resolveAddress } from './registry.js'

export async function getValidatorsContract<T extends Clients = Clients>(
  clients: T
): Promise<ValidatorsContract<T>> {
  return getContract({
    address: await resolveAddress(clients.public, 'Validators'),
    abi: validatorsABI,
    client: clients,
  })
}
export type ValidatorsContract<T extends Clients = Clients> = GetContractReturnType<
  typeof validatorsABI,
  T
>
