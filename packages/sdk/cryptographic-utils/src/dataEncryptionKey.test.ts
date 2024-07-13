import { secp256k1 } from '@noble/curves/secp256k1'
import { decompressPublicKey, deriveDek } from './dataEncryptionKey'

describe('deriveDek', () => {
  it('should produce a the expected keys', async () => {
    const mnemonic =
      'language quiz proud sample canoe trend topic upper coil rack choice engage noodle panda mutual grab shallow thrive forget trophy pull pool mask height'
    const { publicKey, privateKey } = await deriveDek(mnemonic)
    expect(publicKey).toBe('032e4027fc0a763a6651551f66ea50084b436cd7399564f9a05e916d2c37322a60')
    expect(privateKey).toBe('d8428ba6a3a55e46d9b53cad26aca4a2be4c288e48a769f81c96a3ef1b391972')
  })
})

describe('decompressPublicKey', () => {
  it('should work with compressed input', () => {
    const privateKey = secp256k1.utils.randomPrivateKey()
    const publicKeyFull = Buffer.from(secp256k1.getPublicKey(privateKey, false))
    const publicKeyCompressed = Buffer.from(secp256k1.getPublicKey(privateKey))
    const decompressed = decompressPublicKey(publicKeyCompressed)
    expect(Buffer.concat([Buffer.from('04', 'hex'), decompressed])).toEqual(publicKeyFull)
    expect(decompressed).toHaveLength(64)
  })
  it('should work with long form input', () => {
    const privateKey = secp256k1.utils.randomPrivateKey()
    const publicKeyFull = Buffer.from(secp256k1.getPublicKey(privateKey, false))
    const decompressed = decompressPublicKey(publicKeyFull)
    expect(Buffer.concat([Buffer.from('04', 'hex'), decompressed])).toEqual(publicKeyFull)
    expect(decompressed).toHaveLength(64)
  })
})
