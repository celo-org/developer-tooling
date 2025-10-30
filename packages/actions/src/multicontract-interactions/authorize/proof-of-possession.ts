import { parseSignature } from '@celo/core'
import { Address, encodePacked, Hex, keccak256 } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { WalletCeloClient } from '../../client'

export type ProofOfPossession = {
  v: number
  r: Hex
  s: Hex
}

// PROOF OF POSSESSION FUNCTIONS

export const generateProofOfKeyPossession = async (
  client: WalletCeloClient,
  account: Address,
  signer: Address
): Promise<ProofOfPossession> => {
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
): Promise<ProofOfPossession> => {
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

export const parseSignatureOfAddress = (address: Address, signer: Address, signature: Hex) => {
  const hash = keccak256(encodePacked(['address'], [address]))

  // To match ContractKit behavior, use prefixed hash for parsing
  const messageLength = 32 // hash is always 32 bytes
  const prefix = `\x19Ethereum Signed Message:\n${messageLength}`
  const prefixedHash = keccak256(encodePacked(['string', 'bytes'], [prefix, hash]))

  return parseSignature(prefixedHash, signature, signer)
}
