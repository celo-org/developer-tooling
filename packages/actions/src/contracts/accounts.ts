import { accountsABI } from '@celo/abis'
import { Address, getContract, GetContractReturnType } from 'viem'
import { Clients, PublicCeloClient } from '../client.js'
import { resolveAddress } from './registry.js'

export type AccountsContract<C extends Clients = Clients> = GetContractReturnType<
  typeof accountsABI,
  C
>

export async function getAccountsContract(clients: Clients): Promise<AccountsContract<Clients>> {
  return getContract({
    address: await resolveAddress(clients.public, 'Accounts'),
    abi: accountsABI,
    client: clients,
  })
}

// METHODS

export const signerToAccount = async (
  client: PublicCeloClient,
  signer: Address
): Promise<Address> => {
  return client.readContract({
    address: await resolveAddress(client, 'Accounts'),
    abi: accountsABI,
    functionName: 'signerToAccount',
    args: [signer],
  })
}
