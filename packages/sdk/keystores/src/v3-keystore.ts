/**
 * Encryption and decryption of Web3 Secret Storage V3 keystores.
 * See https://github.com/ethereum/wiki/wiki/Web3-Secret-Storage-Definition
 *
 * Parameter defaults and error messages match those of geth-generated keystores.
 */

import { randomUUID } from 'node:crypto'
import {
  ensureLeading0x,
  hexToBuffer,
  privateKeyToAddress,
  trimLeading0x,
} from '@celo/utils/lib/address'
import { ctr } from '@noble/ciphers/aes'
import { pbkdf2Async } from '@noble/hashes/pbkdf2'
import { scryptAsync } from '@noble/hashes/scrypt'
import { keccak_256 } from '@noble/hashes/sha3'
import { sha256 } from '@noble/hashes/sha256'
import { randomBytes } from '@noble/hashes/utils'

/** The only cipher used by geth and by the wider V3 ecosystem. */
const CIPHER = 'aes-128-ctr'
const SCRYPT_N = 262144
const SCRYPT_R = 8
const SCRYPT_P = 1
const DERIVED_KEY_LENGTH = 32
const SALT_LENGTH = 32
const IV_LENGTH = 16

export enum V3ErrorMessages {
  NOT_V3 = 'Not a V3 wallet',
  UNSUPPORTED_CIPHER = 'Unsupported cipher',
  UNSUPPORTED_KDF = 'Unsupported key derivation scheme',
  UNSUPPORTED_PBKDF2_PARAMS = 'Unsupported parameters to PBKDF2',
  WRONG_PASSPHRASE = 'Key derivation failed - possibly wrong passphrase',
}

interface ScryptParams {
  dklen: number
  salt: string
  n: number
  r: number
  p: number
}

interface Pbkdf2Params {
  dklen: number
  salt: string
  c: number
  prf: string
}

export interface V3Keystore {
  version: number
  id: string
  address: string
  crypto: {
    ciphertext: string
    cipherparams: { iv: string }
    cipher: string
    kdf: string
    kdfparams: ScryptParams | Pbkdf2Params
    mac: string
  }
}

/**
 * Derives the symmetric key that protects a keystore's ciphertext.
 * The first half encrypts the private key, the second half authenticates it.
 */
async function deriveKey(
  kdf: string,
  kdfparams: ScryptParams | Pbkdf2Params,
  passphrase: string
): Promise<Uint8Array> {
  const password = Buffer.from(passphrase, 'utf8')
  const salt = hexToBuffer(kdfparams.salt)

  if (kdf === 'scrypt') {
    const { n, r, p } = kdfparams as ScryptParams
    return scryptAsync(password, salt, { N: n, r, p, dkLen: kdfparams.dklen })
  }
  if (kdf === 'pbkdf2') {
    const { c, prf } = kdfparams as Pbkdf2Params
    if (prf !== 'hmac-sha256') {
      throw new Error(V3ErrorMessages.UNSUPPORTED_PBKDF2_PARAMS)
    }
    return pbkdf2Async(sha256, password, salt, { c, dkLen: kdfparams.dklen })
  }
  throw new Error(V3ErrorMessages.UNSUPPORTED_KDF)
}

/**
 * The V3 message authentication code, over the second half of the derived key
 * and the ciphertext.
 */
function macOf(derivedKey: Uint8Array, ciphertext: Uint8Array): string {
  return Buffer.from(
    keccak_256(Buffer.concat([Buffer.from(derivedKey.subarray(16, 32)), Buffer.from(ciphertext)]))
  ).toString('hex')
}

/**
 * Decrypts a V3 keystore
 * @param keystore Serialized V3 keystore
 * @param passphrase Secret phrase the private key was encrypted with
 * @returns Private key as a 0x-prefixed hex string
 */
export async function decryptV3(keystore: string, passphrase: string): Promise<string> {
  const json: V3Keystore = JSON.parse(keystore)
  if (json.version !== 3) {
    throw new Error(V3ErrorMessages.NOT_V3)
  }
  if (json.crypto.cipher !== CIPHER) {
    throw new Error(`${V3ErrorMessages.UNSUPPORTED_CIPHER}: ${json.crypto.cipher}`)
  }

  const derivedKey = await deriveKey(json.crypto.kdf, json.crypto.kdfparams, passphrase)
  const ciphertext = hexToBuffer(json.crypto.ciphertext)
  if (macOf(derivedKey, ciphertext) !== json.crypto.mac) {
    throw new Error(V3ErrorMessages.WRONG_PASSPHRASE)
  }

  const privateKey = ctr(
    derivedKey.subarray(0, 16),
    hexToBuffer(json.crypto.cipherparams.iv)
  ).decrypt(ciphertext)
  return ensureLeading0x(Buffer.from(privateKey).toString('hex'))
}

/**
 * Encrypts a private key into a V3 keystore, using geth's default parameters
 * @param privateKey Private key to encrypt, with or without a 0x prefix
 * @param passphrase Secret phrase to encrypt the private key with
 */
export async function encryptV3(privateKey: string, passphrase: string): Promise<V3Keystore> {
  const salt = randomBytes(SALT_LENGTH)
  const iv = randomBytes(IV_LENGTH)
  const kdfparams: ScryptParams = {
    dklen: DERIVED_KEY_LENGTH,
    salt: Buffer.from(salt).toString('hex'),
    n: SCRYPT_N,
    r: SCRYPT_R,
    p: SCRYPT_P,
  }

  const derivedKey = await deriveKey('scrypt', kdfparams, passphrase)
  const ciphertext = ctr(derivedKey.subarray(0, 16), iv).encrypt(hexToBuffer(privateKey))

  return {
    version: 3,
    id: randomUUID(),
    // The V3 spec omits the address, but geth and its ecosystem always write it.
    address: trimLeading0x(privateKeyToAddress(privateKey)).toLowerCase(),
    crypto: {
      ciphertext: Buffer.from(ciphertext).toString('hex'),
      cipherparams: { iv: Buffer.from(iv).toString('hex') },
      cipher: CIPHER,
      kdf: 'scrypt',
      kdfparams,
      mac: macOf(derivedKey, ciphertext),
    },
  }
}

/**
 * Builds the conventional geth filename for a V3 keystore entry,
 * e.g. UTC--2016-03-15T17-11-33.007Z--<address>
 * @param address Account address of the keystore entry
 * @param timestamp Creation time in milliseconds since the epoch
 */
export function v3Filename(address: string, timestamp: number): string {
  const isoTime = new Date(timestamp).toJSON().replace(/:/g, '-')
  return `UTC--${isoTime}--${trimLeading0x(address).toLowerCase()}`
}
