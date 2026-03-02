import { Hex, RLPEncodedTx, Signer } from '@celo/connect'
import { ensureLeading0x, trimLeading0x } from '@celo/utils/lib/address'
import { computeSharedSecret as computeECDHSecret } from '@celo/utils/lib/ecdh'
import { Decrypt } from '@celo/utils/lib/ecies'
import { EIP712TypedData, generateTypedDataHash } from '@celo/utils/lib/sign-typed-data-utils'
import { getHashFromEncoded, signTransaction } from '@celo/wallet-base'
import { keccak_256 } from '@noble/hashes/sha3'
import { secp256k1 } from '@noble/curves/secp256k1'

/**
 * Signs the EVM transaction using the provided private key
 */
export class LocalSigner implements Signer {
  private privateKey: Hex

  constructor(privateKey: string) {
    this.privateKey = ensureLeading0x(privateKey)
  }

  getNativeKey(): string {
    return this.privateKey
  }

  async signTransaction(
    addToV: number,
    encodedTx: RLPEncodedTx
  ): Promise<{ v: number; r: Buffer; s: Buffer }> {
    return signTransaction(getHashFromEncoded(encodedTx.rlpEncode), this.privateKey, addToV)
  }

  async signPersonalMessage(data: string): Promise<{ v: number; r: Buffer; s: Buffer }> {
    const trimmedKey = trimLeading0x(this.privateKey)
    const pkBuffer = Buffer.from(trimmedKey, 'hex')

    const dataBytes = Buffer.from(trimLeading0x(ensureLeading0x(data)), 'hex')
    const prefix = Buffer.from(`\x19Ethereum Signed Message:\n${dataBytes.length}`)
    const combined = new Uint8Array(prefix.length + dataBytes.length)
    combined.set(prefix)
    combined.set(dataBytes, prefix.length)
    const msgHash = keccak_256(combined)

    const sig = secp256k1.sign(msgHash, pkBuffer)
    return {
      v: sig.recovery + 27,
      r: Buffer.from(sig.r.toString(16).padStart(64, '0'), 'hex'),
      s: Buffer.from(sig.s.toString(16).padStart(64, '0'), 'hex'),
    }
  }

  async signTypedData(typedData: EIP712TypedData): Promise<{ v: number; r: Buffer; s: Buffer }> {
    const dataBuff = generateTypedDataHash(typedData)
    const trimmedKey = trimLeading0x(this.privateKey)
    const pkBuffer = Buffer.from(trimmedKey, 'hex')

    const sig = secp256k1.sign(dataBuff, pkBuffer)
    return {
      v: sig.recovery + 27,
      r: Buffer.from(sig.r.toString(16).padStart(64, '0'), 'hex'),
      s: Buffer.from(sig.s.toString(16).padStart(64, '0'), 'hex'),
    }
  }

  decrypt(ciphertext: Buffer) {
    const decryptedPlaintext = Buffer.from(
      Decrypt(Buffer.from(trimLeading0x(this.privateKey), 'hex'), ciphertext)
    )
    return Promise.resolve(decryptedPlaintext)
  }

  computeSharedSecret(publicKey: string): Promise<Buffer> {
    return Promise.resolve(computeECDHSecret(this.privateKey, publicKey))
  }
}
