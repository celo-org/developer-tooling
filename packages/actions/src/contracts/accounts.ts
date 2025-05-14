import { accountsABI } from '@celo/abis'
import { Address, getContract, GetContractReturnType, PublicClient, WalletClient } from 'viem'

import { resolveAddress } from './registry'

export type AccountsContract<T extends WalletClient | PublicClient = PublicClient> =
  GetContractReturnType<typeof accountsABI, T>

export async function getAccountsContract<T extends WalletClient | PublicClient = PublicClient>(
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
