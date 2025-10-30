import { accountsABI } from '@celo/abis'
import { Address, getContract, GetContractReturnType } from 'viem'
import { Clients, PublicCeloClient } from '../client.js'
import type { ProofOfPossession } from '../multicontract-interactions/authorize/proof-of-possession.js'
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

// AUTHORIZATION FUNCTIONS

export const authorizeVoteSigner = async (
  clients: Required<Clients>,
  signer: Address,
  proofOfSigningKeyPossession: ProofOfPossession
) => {
  return clients.wallet.writeContract({
    address: await resolveAddress(clients.public, 'Accounts'),
    abi: accountsABI,
    functionName: 'authorizeVoteSigner',
    args: [
      signer,
      proofOfSigningKeyPossession.v,
      proofOfSigningKeyPossession.r,
      proofOfSigningKeyPossession.s,
    ],
  })
}

export const authorizeValidatorSigner = async (
  clients: Required<Clients>,
  signer: Address,
  proofOfSigningKeyPossession: ProofOfPossession
) => {
  return clients.wallet.writeContract({
    address: await resolveAddress(clients.public, 'Accounts'),
    abi: accountsABI,
    functionName: 'authorizeValidatorSigner',
    args: [
      signer,
      proofOfSigningKeyPossession.v,
      proofOfSigningKeyPossession.r,
      proofOfSigningKeyPossession.s,
    ],
  })
}
