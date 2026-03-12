import { NativeSigner, serializeSignature, Signature, Signer } from '@celo/base/lib/signatureUtils'
import { secp256k1 } from '@noble/curves/secp256k1'
import { bytesToHex, hexToBytes, isHex, keccak256, stringToBytes, toBytes, toHex } from 'viem'
import { publicKeyToAddress as viemPublicKeyToAddress } from 'viem/accounts'
import { ensureLeading0x, eqAddress, privateKeyToAddress, trimLeading0x } from './address'
import { EIP712TypedData, generateTypedDataHash } from './sign-typed-data-utils'

// Exports moved to @celo/base, forwarding them
// here for backwards compatibility
export {
  NativeSigner,
  POP_SIZE,
  serializeSignature,
  Signature,
  Signer,
} from '@celo/base/lib/signatureUtils'

// If messages is a hex, the length of it should be the number of bytes
function messageLength(message: string) {
  if (isHex(message, { strict: true })) {
    return (message.length - 2) / 2
  }
  return message.length
}
// Ethereum has a special signature format that requires a prefix
// https://github.com/ethereum/wiki/wiki/JSON-RPC#eth_sign
export function hashMessageWithPrefix(message: string): string {
  const prefix = '\x19Ethereum Signed Message:\n' + messageLength(message)
  // prefix is always a plain string (UTF-8), message can be hex or plain string
  // toBytes handles both: hex strings → decoded bytes, plain strings → UTF-8 bytes
  const prefixBytes = toBytes(prefix)
  const messageBytes = toBytes(message)
  const combined = new Uint8Array(prefixBytes.length + messageBytes.length)
  combined.set(prefixBytes)
  combined.set(messageBytes, prefixBytes.length)
  return keccak256(combined)
}

export function hashMessage(message: string): string {
  // Always treat message as UTF-8 string (matching soliditySha3({type:'string', value}))
  return keccak256(stringToBytes(message))
}

export async function addressToPublicKey(
  signer: string,
  signFn: (message: string, signer: string) => Promise<string>
) {
  const msg = Buffer.from('dummy_msg_data')
  const data = '0x' + msg.toString('hex')
  // Note: Eth.sign typing displays incorrect parameter order
  const sig = await signFn(data, signer)

  const trimmedSig = trimLeading0x(sig)
  const r = hexToBytes(`0x${trimmedSig.slice(0, 64)}`)
  const s = hexToBytes(`0x${trimmedSig.slice(64, 128)}`)
  let v = parseInt(trimmedSig.slice(128, 130), 16)
  if (v < 27) v += 27

  const prefixedMsg = hashMessageWithPrefix(data)
  const msgHash = hexToBytes(prefixedMsg as `0x${string}`)

  const signature = new secp256k1.Signature(
    BigInt(toHex(r, { size: 32 })),
    BigInt(toHex(s, { size: 32 }))
  ).addRecoveryBit(v - 27)
  const pubKeyFull = signature.recoverPublicKey(msgHash).toRawBytes(false)

  const computedAddr = viemPublicKeyToAddress(bytesToHex(pubKeyFull) as `0x${string}`)
  if (!eqAddress(computedAddr, signer)) {
    throw new Error('computed address !== signer')
  }

  // Return raw 64-byte key (without 04 prefix) for on-chain compatibility
  return bytesToHex(pubKeyFull.subarray(1))
}

export function LocalSigner(privateKey: string): Signer {
  return {
    sign: async (message: string) =>
      Promise.resolve(
        serializeSignature(signMessage(message, privateKey, privateKeyToAddress(privateKey)))
      ),
  }
}

export function signedMessageToPublicKey(message: string, v: number, r: string, s: string) {
  const msgHash = hexToBytes(message as `0x${string}`)
  const signature = new secp256k1.Signature(BigInt(r), BigInt(s)).addRecoveryBit(v - 27)
  const pubKey = signature.recoverPublicKey(msgHash).toRawBytes(false)
  // Return raw 64-byte key (without 04 prefix) for on-chain compatibility
  return bytesToHex(pubKey.subarray(1))
}

export function signMessage(message: string, privateKey: string, address: string) {
  return signMessageWithoutPrefix(
    hashMessageWithPrefix(message),
    ensureLeading0x(privateKey),
    address
  )
}

export function signMessageWithoutPrefix(messageHash: string, privateKey: string, address: string) {
  const privKeyBytes = hexToBytes(ensureLeading0x(privateKey) as `0x${string}`)
  const pubKey = secp256k1.getPublicKey(privKeyBytes, false)
  const derivedAddress = viemPublicKeyToAddress(bytesToHex(pubKey) as `0x${string}`)
  if (derivedAddress.toLowerCase() !== address.toLowerCase()) {
    throw new Error('Provided private key does not match address of intended signer')
  }
  const msgHashBytes = hexToBytes(messageHash as `0x${string}`)
  const sig = secp256k1.sign(msgHashBytes, privKeyBytes.slice(0, 32))
  const v = sig.recovery + 27
  const r = ensureLeading0x(sig.r.toString(16).padStart(64, '0'))
  const s = ensureLeading0x(sig.s.toString(16).padStart(64, '0'))
  if (!isValidSignature(address, messageHash, v, r, s)) {
    throw new Error('Unable to validate signature')
  }
  return { v, r, s }
}

export function verifySignature(message: string, signature: string, signer: string) {
  try {
    parseSignature(message, signature, signer)
    return true
  } catch (error) {
    return false
  }
}

export function parseSignature(message: string, signature: string, signer: string) {
  return parseSignatureWithoutPrefix(hashMessageWithPrefix(message), signature, signer)
}

export function parseSignatureWithoutPrefix(
  messageHash: string,
  signature: string,
  signer: string
) {
  let { r, s, v } = parseSignatureAsRsv(signature.slice(2))
  if (isValidSignature(signer, messageHash, v, r, s)) {
    return { v, r, s }
  }

  ;({ r, s, v } = parseSignatureAsVrs(signature.slice(2)))
  if (isValidSignature(signer, messageHash, v, r, s)) {
    return { v, r, s }
  }

  throw new Error(`Unable to parse signature (expected signer ${signer})`)
}

function recoverEIP712TypedDataSigner(
  typedData: EIP712TypedData,
  signature: string,
  parseFunction: (signature: string) => Signature
): string {
  const dataBuff = generateTypedDataHash(typedData)
  const { r, s, v } = parseFunction(trimLeading0x(signature))
  const msgHash = dataBuff instanceof Uint8Array ? dataBuff : hexToBytes(dataBuff as `0x${string}`)
  const sig = new secp256k1.Signature(BigInt(r), BigInt(s)).addRecoveryBit(v - 27)
  const publicKey = sig.recoverPublicKey(msgHash).toRawBytes(false)
  return viemPublicKeyToAddress(bytesToHex(publicKey) as `0x${string}`)
}

/**
 * Recover signer from RSV-serialized signature over signed typed data.
 * @param typedData EIP712 typed data
 * @param signature RSV signature of signed type data by signer
 * @returns string signer, or throws error if parsing fails
 */
export function recoverEIP712TypedDataSignerRsv(
  typedData: EIP712TypedData,
  signature: string
): string {
  return recoverEIP712TypedDataSigner(typedData, signature, parseSignatureAsRsv)
}

/**
 * Recover signer from VRS-serialized signature over signed typed data.
 * @param typedData EIP712 typed data
 * @param signature VRS signature of signed type data by signer
 * @returns string signer, or throws error if parsing fails
 */
export function recoverEIP712TypedDataSignerVrs(
  typedData: EIP712TypedData,
  signature: string
): string {
  return recoverEIP712TypedDataSigner(typedData, signature, parseSignatureAsVrs)
}

/**
 * @param typedData EIP712 typed data
 * @param signature VRS or SRV signature of `typedData` by `signer`
 * @param signer address to verify signed the `typedData`
 * @returns boolean, true if `signer` is a possible signer of `signature`
 */
export function verifyEIP712TypedDataSigner(
  typedData: EIP712TypedData,
  signature: string,
  signer: string
) {
  for (const recover of [recoverEIP712TypedDataSignerVrs, recoverEIP712TypedDataSignerRsv]) {
    try {
      if (eqAddress(recover(typedData, signature), signer)) {
        return true
      }
    } catch (e) {
      // try both serialization formats before failing to verify
    }
  }
  return false
}

export function guessSigner(message: string, signature: string): string {
  const messageHash = hashMessageWithPrefix(message)
  const { r, s, v } = parseSignatureAsRsv(signature.slice(2))
  const msgHash = hexToBytes(messageHash as `0x${string}`)
  const sig = new secp256k1.Signature(BigInt(r), BigInt(s)).addRecoveryBit(v - 27)
  const publicKey = sig.recoverPublicKey(msgHash).toRawBytes(false)
  return viemPublicKeyToAddress(bytesToHex(publicKey) as `0x${string}`)
}

function parseSignatureAsVrs(signature: string) {
  let v: number = parseInt(signature.slice(0, 2), 16)
  const r: string = `0x${signature.slice(2, 66)}`
  const s: string = `0x${signature.slice(66, 130)}`
  if (v < 27) {
    v += 27
  }
  return { v, r, s }
}

function parseSignatureAsRsv(signature: string) {
  const r: string = `0x${signature.slice(0, 64)}`
  const s: string = `0x${signature.slice(64, 128)}`
  let v: number = parseInt(signature.slice(128, 130), 16)
  if (v < 27) {
    v += 27
  }
  return { r, s, v }
}

function isValidSignature(signer: string, message: string, v: number, r: string, s: string) {
  try {
    const msgHash = hexToBytes(message as `0x${string}`)
    const sig = new secp256k1.Signature(BigInt(r), BigInt(s)).addRecoveryBit(v - 27)
    const publicKey = sig.recoverPublicKey(msgHash).toRawBytes(false)
    const retrievedAddress = viemPublicKeyToAddress(bytesToHex(publicKey) as `0x${string}`)
    return eqAddress(retrievedAddress, signer)
  } catch (err) {
    return false
  }
}

export const SignatureUtils = {
  NativeSigner,
  LocalSigner,
  signMessage,
  signMessageWithoutPrefix,
  parseSignature,
  parseSignatureWithoutPrefix,
  serializeSignature,
  recoverEIP712TypedDataSignerRsv,
  recoverEIP712TypedDataSignerVrs,
  verifyEIP712TypedDataSigner,
}
