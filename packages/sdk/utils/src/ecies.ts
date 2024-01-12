/**
 * ECIES encrypt/decrypt with Ethereum keys
 * A Typescript implementation of geth/crypto/ecies/ecies.go
 * Modified from https://github.com/LimelabsTech/eth-ecies/blob/master/index.js
 * At commit c858cbd021e9a99d8afa629de33c8c30d923b3e5.
 */
'use strict'

import { ctr } from '@noble/ciphers/aes'
import { secp256k1 } from '@noble/curves/secp256k1'
import { hmac } from '@noble/hashes/hmac'
import { sha256 } from '@noble/hashes/sha256'
import { randomBytes } from '@noble/hashes/utils'

export const IV_LENGTH = 16

const Uint8ArrayEquals = (a: Uint8Array, b: Uint8Array) => {
  if (a.length != b.length) return false
  for (let i = 0; i < a.length; i++) {
    if (a[i] != b[i]) return false
  }
  return true
}

/**
 * Increments big endian uint32
 *
 * @param {Buffer} ctr 32 bit unsigned big endian integer to increment.
 * @returns Incremented counter.
 */
const IncCounter = (ctr: Buffer) => {
  for (let i = ctr.length - 1; i >= 0; i--) {
    ctr[i]++
    if (ctr[i] !== 0) {
      return ctr
    }
  }
  return ctr
}

/**
 * NIST 8000-56C Rev 1 One Step KDF with the following parameters:
 * - H(x) is SHA-256(x)
 * - Fixed info is null
 *
 * TODO:
 * - Implement proper ceiling on reps.
 *
 * @param {Buffer} px Input keying material to derive key from.
 * @param {number} kdLen Length of output in bytes
 * @returns {Buffer} Output keying material of length kdLen bytes.
 */
const ConcatKDF = (px: Buffer, kdLen: number) => {
  const blockSize = 32
  const reps = ((kdLen + 7) * 8) / (blockSize * 8)
  let counter = Buffer.from('00000001', 'hex')
  let k = Buffer.from('00', 'hex')
  for (let i = 0; i <= reps; i++) {
    const hash = sha256.create()
    hash.update(counter)
    hash.update(px)
    k = Buffer.concat([k, hash.digest()])
    counter = IncCounter(counter)
  }
  return k.slice(1, kdLen + 1)
}

/**
 * AES-128 CTR encrypt
 * @param {Buffer} encryptionKey
 * @param {Buffer} iv
 * @param {Uint8Array} plaintext
 * @returns {Uint8Array} ciphertext
 */
export function AES128Encrypt(
  encryptionKey: Buffer,
  iv: Uint8Array,
  plaintext: Uint8Array
): Uint8Array {
  const aes = ctr(encryptionKey, iv)
  return aes.encrypt(plaintext)
}

/**
 * AES-128 CTR encrypt with message authentication
 * @param {Buffer} encryptionKey
 * @param {Buffer} macKey
 * @param {Uint8Array} plaintext
 * @returns {Buffer} ciphertext
 */
export function AES128EncryptAndHMAC(
  encryptionKey: Buffer,
  macKey: Uint8Array,
  plaintext: Uint8Array
): Buffer {
  const iv = randomBytes(IV_LENGTH)
  console.log('RANDOM IV:', iv)
  const dataToMac = AES128Encrypt(encryptionKey, iv, plaintext)
  const mac = hmac(sha256, macKey, dataToMac)

  return Buffer.concat([dataToMac, mac])
}

/**
 * AES-128 CTR decrypt
 * @param {Buffer} encryptionKey
 * @param {Uint8Array} iv
 * @param {Uint8Array} ciphertext
 * @returns {Uint8Array} plaintext
 */
export function AES128Decrypt(
  encryptionKey: Buffer,
  iv: Uint8Array,
  ciphertext: Uint8Array
): Uint8Array {
  const aes = ctr(encryptionKey, iv)
  return aes.decrypt(ciphertext)
}

/**
 * AES-128 CTR decrypt with message authentication
 * @param {Buffer} encryptionKey
 * @param {Buffer} macKey
 * @param {Uint8Array} ciphertext
 * @returns {Uint8Array} plaintext
 */
export function AES128DecryptAndHMAC(
  encryptionKey: Buffer,
  macKey: Uint8Array,
  ciphertext: Uint8Array
): Uint8Array {
  const iv = ciphertext.subarray(0, IV_LENGTH)
  console.log('SLICED FROM CIPHER IV:', iv)
  const message = ciphertext.slice(IV_LENGTH, ciphertext.length - 32)
  const mac = ciphertext.slice(ciphertext.length - 32, ciphertext.length)
  const dataToMac = Buffer.concat([iv, message])
  const computedMac = hmac(sha256, macKey, dataToMac)
  if (!Uint8ArrayEquals(mac, computedMac)) {
    throw new Error('MAC mismatch')
  }

  return Buffer.from(AES128Decrypt(encryptionKey, iv, message))
}

/**
 * ECIES encrypt
 * @param {Buffer} pubKeyTo Ethereum pub key, 64 bytes.
 * @param {Uint8Array} plaintext Plaintext to be encrypted.
 * @returns {Buffer} Encrypted message, serialized, 113+ bytes
 */
export function Encrypt(pubKeyTo: Buffer, plaintext: Uint8Array) {
  const ephemPrivKey = secp256k1.utils.randomPrivateKey()
  const ephemPubKey = Buffer.from(secp256k1.getPublicKey(ephemPrivKey, false))
  const ephemPubKeyEncoded = Buffer.from(ephemPubKey)
  const pubKeyToEncoded = Buffer.concat([Buffer.from([0x04]), pubKeyTo])
  const px = secp256k1.getSharedSecret(ephemPrivKey, pubKeyToEncoded)

  // TODO: remove after I find a way to test this better
  // const EC = require('elliptic').ec
  // const ec = new EC('secp256k1')
  // const _ephemPrivKey = ec.keyFromPrivate(ephemPrivKey)
  // const _ephemPubKey = _ephemPrivKey.getPublic(false, 'hex')
  // const _ephemPubKeyEncoded = Buffer.from(_ephemPubKey, 'hex')
  // const _px = _ephemPrivKey.derive(ec.keyFromPublic(pubKeyToEncoded).getPublic())

  // console.log({
  //   ephemPubKeyEncoded,
  //   _ephemPubKeyEncoded,
  //   eq: ephemPubKeyEncoded.equals(_ephemPubKeyEncoded),
  // })
  // console.log({
  //   px: Buffer.from(px).subarray(1), // remove 0x04 prefix
  //   _px: _px.toArrayLike(Buffer),
  //   eq: Buffer.from(px).subarray(1).equals(_px.toArrayLike(Buffer)),
  // })

  // better TODO: don't do handcrafted encryption??????
  const unprefixedPx = Buffer.from(px).subarray(1) // remove 0x04 prefix
  const hash = ConcatKDF(unprefixedPx, 32)
  const encryptionKey = hash.subarray(0, IV_LENGTH)
  const macKey = sha256.create().update(hash.subarray(16)).digest()
  const message = AES128EncryptAndHMAC(encryptionKey, macKey, plaintext)
  const serializedCiphertext = Buffer.concat([
    ephemPubKeyEncoded, // 65 bytes
    message, // iv + ciphertext + mac (min 48 bytes)
  ])
  return serializedCiphertext
}

/**
 * ECIES decrypt
 * @param {Buffer} privKey Ethereum private key, 32 bytes.
 * @param {Buffer} encrypted Encrypted message, serialized, 113+ bytes
 * @returns {Uint8Array} plaintext
 */
export function Decrypt(privKey: Buffer, encrypted: Buffer) {
  // Read iv, ephemPubKey, mac, ciphertext from encrypted message
  const ephemPubKeyEncoded = encrypted.subarray(0, 65)
  const symmetricEncrypted = encrypted.subarray(65)

  const px = secp256k1.getSharedSecret(privKey, ephemPubKeyEncoded)
  const unprefixedPx = Buffer.from(px).subarray(1) // remove 0x04 prefix
  const hash = ConcatKDF(unprefixedPx, 32)
  // km, ke
  const encryptionKey = hash.subarray(0, 16)

  const macKey = sha256.create().update(hash.subarray(16)).digest()

  return AES128DecryptAndHMAC(encryptionKey, macKey, symmetricEncrypted)
}

export const ECIES = {
  Encrypt,
  Decrypt,
  AES128EncryptAndHMAC,
  AES128DecryptAndHMAC,
}
