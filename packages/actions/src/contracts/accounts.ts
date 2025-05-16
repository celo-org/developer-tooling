import { accountsABI } from '@celo/abis'
import { Address, Client, getContract, GetContractReturnType, PublicClient } from 'viem'

import { resolveAddress } from './registry'

export type AccountsContract<T extends Client = PublicClient> = GetContractReturnType<
  typeof accountsABI,
  T
>

export async function getAccountsContract<T extends Client = PublicClient>(
  client: T
): Promise<AccountsContract<T>> {
  return getContract({
    address: await resolveAddress(client, 'Accounts'),
    abi: accountsABI,
    client,
  })
}

// METHODS

export const signerToAccount = async (client: PublicClient, signer: Address): Promise<Address> => {
  return await client.readContract({
    address: await resolveAddress(client, 'Accounts'),
    abi: accountsABI,
    functionName: 'signerToAccount',
    args: [signer],
  })
}
