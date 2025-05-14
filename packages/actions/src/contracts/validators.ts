import { validatorsABI } from '@celo/abis-12'
import { getContract, GetContractReturnType, PublicClient, WalletClient } from 'viem'
import { resolveAddress } from './registry'

export async function getValidatorsContract<T extends PublicClient | WalletClient = PublicClient>(
  client: T
): Promise<ValidatorsContract<T>> {
  return getContract({
    address: await resolveAddress(client, 'Validators'),
    abi: validatorsABI,
    client,
  })
}
export type ValidatorsContract<T extends WalletClient | PublicClient = PublicClient> =
  GetContractReturnType<typeof validatorsABI, T>
