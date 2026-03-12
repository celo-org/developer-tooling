import { StrongAddress, ensureLeading0x, hexToBuffer } from '@celo/base/lib/address'
import { secp256k1 } from '@noble/curves/secp256k1'
import { getAddress, isAddress } from 'viem'
import { publicKeyToAddress as viemPublicKeyToAddress } from 'viem/accounts'
// Exports moved to @celo/base, forwarding them
// here for backwards compatibility
export {
  Address,
  NULL_ADDRESS,
  bufferToHex,
  ensureLeading0x,
  eqAddress,
  findAddressIndex,
  getAddressChunks,
  hexToBuffer,
  isHexString,
  mapAddressListDataOnto,
  mapAddressListOnto,
  normalizeAddress,
  normalizeAddressWith0x,
  trimLeading0x,
} from '@celo/base/lib/address'
export { getAddress as toChecksumAddress } from 'viem'
export const isValidChecksumAddress = (address: string): boolean =>
  isAddress(address, { strict: true })

export const privateKeyToAddress = (privateKey: string) => {
  const pubKey = secp256k1.getPublicKey(hexToBuffer(privateKey), false)
  return viemPublicKeyToAddress(
    ensureLeading0x(Buffer.from(pubKey).toString('hex')) as `0x${string}`
  ) as StrongAddress
}

export const privateKeyToPublicKey = (privateKey: string) =>
  ensureLeading0x(
    Buffer.from(secp256k1.getPublicKey(hexToBuffer(privateKey), false).subarray(1)).toString('hex')
  )

export const publicKeyToAddress = (publicKey: string) => {
  let hex = ensureLeading0x(publicKey) as `0x${string}`
  // If raw 64-byte key (128 hex chars, no 04 prefix), prepend the uncompressed prefix
  if (hex.length === 130 && !hex.startsWith('0x04')) {
    hex = `0x04${hex.slice(2)}` as `0x${string}`
  }
  return viemPublicKeyToAddress(hex) as StrongAddress
}

export const isValidPrivateKey = (privateKey: string) => {
  try {
    if (!privateKey.startsWith('0x')) return false
    secp256k1.getPublicKey(hexToBuffer(privateKey))
    return true
  } catch {
    return false
  }
}

export const isValidAddress = (input: string): input is StrongAddress => {
  if ('string' !== typeof input) {
    return false
  }
  if (!/^(0x)?[0-9a-f]{40}$/i.test(input)) {
    return false
  }
  if (/^(0x|0X)?[0-9A-F]{40}$/.test(input.toUpperCase())) {
    return true
  }

  if (getAddress(input) === input) {
    return true
  }

  return false
}
