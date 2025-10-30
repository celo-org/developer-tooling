import { accountsABI } from '@celo/abis'
import { parseSignature } from '@celo/core'
import { Address, encodePacked, getContract, GetContractReturnType, Hex, keccak256 } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { Clients, PublicCeloClient, WalletCeloClient } from '../client.js'
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

// PROOF OF POSSESSION FUNCTIONS

export const generateProofOfKeyPossession = async (
  client: WalletCeloClient,
  account: Address,
  signer: Address
): Promise<{ v: number; r: string; s: string }> => {
  // Use the same hash generation as soliditySha3({ type: 'address', value: account })
  const hash = keccak256(encodePacked(['address'], [account]))

  const signature = await client.signMessage({
    account: signer,
    message: { raw: hash },
  })

  return parseSignature(hash, signature, signer)
}

export const generateProofOfKeyPossessionLocally = async (
  privateKey: Hex,
  account: Address
): Promise<{ v: number; r: string; s: string }> => {
  const hash = keccak256(encodePacked(['address'], [account]))

  // To match ContractKit behavior, we need to add Ethereum message prefix
  // ContractKit passes the hash as a "message" to signMessage, which adds the prefix
  const messageLength = 32 // hash is always 32 bytes
  const prefix = `\x19Ethereum Signed Message:\n${messageLength}`
  const prefixedHash = keccak256(encodePacked(['string', 'bytes'], [prefix, hash]))

  const localAccount = privateKeyToAccount(privateKey)
  const signature = await localAccount.sign({ hash: prefixedHash })
  const signerAddress = localAccount.address

  // Parse using the prefixed hash for validation
  return parseSignature(prefixedHash, signature, signerAddress)
}

// For parsing existing signatures (equivalent to parseSignatureOfAddress)
export const parseSignatureOfAddress = (address: Address, signer: string, signature: Hex) => {
  const hash = keccak256(encodePacked(['address'], [address]))

  // To match ContractKit behavior, use prefixed hash for parsing
  const messageLength = 32 // hash is always 32 bytes
  const prefix = `\x19Ethereum Signed Message:\n${messageLength}`
  const prefixedHash = keccak256(encodePacked(['string', 'bytes'], [prefix, hash]))

  return parseSignature(prefixedHash, signature, signer)
}
