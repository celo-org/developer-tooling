import { Hex, RLPEncodedTx, Signer } from '@celo/connect'
import { ensureLeading0x, trimLeading0x } from '@celo/utils/lib/address'
import { computeSharedSecret as computeECDHSecret } from '@celo/utils/lib/ecdh'
import { Decrypt } from '@celo/utils/lib/ecies'
import { EIP712TypedData, generateTypedDataHash } from '@celo/utils/lib/sign-typed-data-utils'
import { getHashFromEncoded, signTransaction } from '@celo/wallet-base'
import * as ethUtil from '@ethereumjs/util'

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
    // ecsign needs a privateKey without 0x
    const trimmedKey = trimLeading0x(this.privateKey)
    const pkBuffer = Buffer.from(trimmedKey, 'hex')

    const dataBuff = ethUtil.toBuffer(ensureLeading0x(data))
    const msgHashBuff = ethUtil.hashPersonalMessage(dataBuff)

    const sig = ethUtil.ecsign(msgHashBuff, pkBuffer)
    return {
      v: Number(sig.v),
      r: Buffer.from(sig.r),
      s: Buffer.from(sig.s),
    }
  }

  async signTypedData(typedData: EIP712TypedData): Promise<{ v: number; r: Buffer; s: Buffer }> {
    const dataBuff = generateTypedDataHash(typedData)
    const trimmedKey = trimLeading0x(this.privateKey)
    const pkBuffer = Buffer.from(trimmedKey, 'hex')

    const sig = ethUtil.ecsign(dataBuff, pkBuffer)
    return {
      v: Number(sig.v),
      r: Buffer.from(sig.r),
      s: Buffer.from(sig.s),
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
