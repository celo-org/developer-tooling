import { trimLeading0x } from '@celo/base/lib/address'
import { secp256k1 } from '@noble/curves/secp256k1'

export function computeSharedSecret(privateKey: string, publicKey: string): Buffer {
  return Buffer.from(
    secp256k1.getSharedSecret(
      Buffer.from(trimLeading0x(privateKey), 'hex'),
      Buffer.from(ensureCompressed(publicKey), 'hex')
    )
  )
}

export function isCompressed(publicKey: string) {
  const noLeading0x = trimLeading0x(publicKey)
  if (noLeading0x.length === 64) {
    return true
  }
  return noLeading0x.length === 66 && (noLeading0x.startsWith('02') || noLeading0x.startsWith('03'))
}

export function ensureCompressed(publicKey: string): string {
  return Buffer.from(secp256k1.getSharedSecret(BigInt(1), Buffer.from(publicKey, 'hex'))).toString(
    'hex'
  )
}

export function ensureUncompressed(publicKey: string) {
  const noLeading0x = trimLeading0x(publicKey)
  return secp256k1.getSharedSecret(BigInt(1), Buffer.from(noLeading0x, 'hex'), false)
}

export function trimUncompressedPrefix(publicKey: string) {
  const noLeading0x = trimLeading0x(publicKey)
  if (noLeading0x.length === 130 && noLeading0x.startsWith('04')) {
    return noLeading0x.slice(2)
  }
  return noLeading0x
}
