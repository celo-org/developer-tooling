import { validatorsABI } from '@celo/abis'
import { Client, getContract, GetContractReturnType, PublicClient } from 'viem'
import { resolveAddress } from './registry'

export async function getValidatorsContract<T extends Client = PublicClient>(
  client: T
): Promise<ValidatorsContract<T>> {
  return getContract({
    address: await resolveAddress(client, 'Validators'),
    abi: validatorsABI,
    client,
  })
}
export type ValidatorsContract<T extends Client = PublicClient> = GetContractReturnType<
  typeof validatorsABI,
  T
>
