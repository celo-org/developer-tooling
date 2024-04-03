import { ensureLeading0x } from '@celo/utils/lib/address'
import { bytesToHex } from '@noble/curves/abstract/utils'
import { secp256k1 } from '@noble/curves/secp256k1'
import { Bip39, generateKeys } from './account'

/**
 * Turns a private key to a compressed public key (hex string with hex leader).
 *
 * @param {Buffer} privateKey Private key.
 * @returns {string} Corresponding compressed public key in hex encoding with '0x' leader.
 */
export function compressedPubKey(privateKey: Buffer): string {
  return ensureLeading0x(bytesToHex(secp256k1.getPublicKey(privateKey))).slice(1)
}

/**
 * Decompresses a public key and strips out the '0x04' leading constant. This makes
 * any public key suitable to be used with this ECIES implementation.
 *
 * @param publicKey Public key in standard form (with 0x02, 0x03, or 0x04 prefix)
 * @returns Decompresssed public key without prefix.
 */
export function decompressPublicKey(publicKey: Buffer): Buffer {
  return Buffer.from(secp256k1.getSharedSecret(BigInt(1), publicKey, false)).slice(1)
}

/**
 * Derives a data encryption key from the mnemonic
 *
 * @param {string} privateKey Hex encoded private account key.
 * @returns {Buffer} Comment Encryption Private key.
 */
export function deriveDek(mnemonic: string, bip39ToUse?: Bip39) {
  if (!mnemonic) {
    throw new Error('Invalid mnemonic')
  }

  return generateKeys(
    mnemonic,
    undefined,
    1, // The DEK is derived from change index 1, not 0 like the wallet's transaction keys
    0,
    bip39ToUse
  )
}

export const DataEncryptionKeyUtils = {
  compressedPubKey,
  decompressPublicKey,
  deriveDek,
}
