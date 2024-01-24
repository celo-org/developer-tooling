import { Address, ensureLeading0x } from '@celo/base/lib/address'
import * as ethUtil from '@ethereumjs/util'
import { SignatureType } from '@noble/curves/abstract/weierstrass'
import { secp256k1 } from '@noble/curves/secp256k1'
import { BigNumber } from 'bignumber.js'

// 0x04 prefix indicates that the key is not compressed
// https://tools.ietf.org/html/rfc5480#section-2.2
export const publicKeyPrefix: number = 0x04
export const sixtyFour: number = 64
export const thirtyTwo: number = 32

/**
 * If the signature is in the "bottom" of the curve, it is non-canonical
 * Non-canonical signatures are illegal in Ethereum and therefore the S value
 * must be transposed to the lower intersection
 * https://github.com/bitcoin/bips/blob/master/bip-0062.mediawiki#Low_S_values_in_signatures
 */
export const makeCanonical = (S: BigNumber): BigNumber => {
  const curveN = new BigNumber(secp256k1.CURVE.n.toString())
  const isCanonical = S.comparedTo(curveN.dividedBy(2)) <= 0
  if (!isCanonical) {
    return curveN.minus(S)
  }
  return S
}

export const bufferToBigNumber = (input: Buffer): BigNumber => {
  return new BigNumber(ensureLeading0x(input.toString('hex')))
}

export const bigNumberToBuffer = (input: BigNumber, lengthInBytes: number): Buffer => {
  let hex = input.toString(16)
  const hexLength = lengthInBytes * 2 // 2 hex characters per byte.
  if (hex.length < hexLength) {
    hex = '0'.repeat(hexLength - hex.length) + hex
  }
  return ethUtil.toBuffer(ensureLeading0x(hex)) as Buffer
}

export class Signature {
  public v: number
  public r: Buffer
  public s: Buffer

  constructor(v: number, r: Buffer, s: Buffer) {
    this.v = v
    this.r = r
    this.s = s
  }
}

/**
 * Attempts each recovery key to find a match
 */
export function recoverKeyIndex(
  signature: Uint8Array,
  _publicKey: BigNumber,
  hash: Uint8Array
): number {
  const formats = ['fromCompact', 'fromDER'] as const

  for (let format of formats) {
    let sig: SignatureType
    try {
      sig = secp256k1.Signature[format](signature)
    } catch (e) {
      continue
    }

    for (let i = 0; i < 4; i++) {
      sig = sig.addRecoveryBit(i)
      const recoveredPublicKeyByteArr = sig.recoverPublicKey(hash)

      // NOTE:
      // converting hex value to bigint allows for discrepencies between
      // libraries to disappear, ran into an issue where
      // "0x01234" wasn't equal to "0x1234", the conversion removes it
      const compressedRecoveredPublicKey = BigInt(
        ensureLeading0x(recoveredPublicKeyByteArr.toHex(false))
      )
      const uncompressedRecoveredPublicKey = BigInt(
        ensureLeading0x(recoveredPublicKeyByteArr.toHex(true))
      )
      const publicKey = BigInt(ensureLeading0x(_publicKey.toString(16)))

      if (
        publicKey === compressedRecoveredPublicKey ||
        publicKey === uncompressedRecoveredPublicKey
      ) {
        return i
      }
    }
  }

  throw new Error('Unable to generate recovery key from signature.')
}

export function getAddressFromPublicKey(publicKey: BigNumber): Address {
  const pkBuffer = ethUtil.toBuffer(ensureLeading0x(publicKey.toString(16)))
  if (!ethUtil.isValidPublic(pkBuffer, true)) {
    throw new Error(`Invalid secp256k1 public key ${publicKey}`)
  }
  const address = ethUtil.pubToAddress(pkBuffer, true)
  return ensureLeading0x(address.toString('hex'))
}
