import { trimLeading0x } from '@celo/utils/lib/address'
import {
  ADDRESS1,
  GETH_GEN_KEYSTORE1,
  GETH_GEN_KEYSTORE2,
  PASSPHRASE1,
  PASSPHRASE2,
  PBKDF2_KEYSTORE,
  PBKDF2_PASSPHRASE,
  PBKDF2_PK,
  PK1,
  PK2,
} from './test-constants'
import { decryptV3, encryptV3, V3ErrorMessages, v3Filename } from './v3-keystore'

jest.setTimeout(30000)

describe('decryptV3', () => {
  it('decrypts a geth-generated keystore', async () => {
    expect(trimLeading0x(await decryptV3(GETH_GEN_KEYSTORE1, PASSPHRASE1))).toBe(PK1)
    expect(trimLeading0x(await decryptV3(GETH_GEN_KEYSTORE2, PASSPHRASE2))).toBe(PK2)
  })

  it('returns the private key 0x-prefixed', async () => {
    expect(await decryptV3(GETH_GEN_KEYSTORE1, PASSPHRASE1)).toBe(`0x${PK1}`)
  })

  it('decrypts a pbkdf2 keystore', async () => {
    expect(trimLeading0x(await decryptV3(PBKDF2_KEYSTORE, PBKDF2_PASSPHRASE))).toBe(PBKDF2_PK)
  })

  it('rejects a wrong passphrase for a pbkdf2 keystore', async () => {
    await expect(decryptV3(PBKDF2_KEYSTORE, `${PBKDF2_PASSPHRASE}!`)).rejects.toThrow(
      V3ErrorMessages.WRONG_PASSPHRASE
    )
  })

  it('rejects a wrong passphrase', async () => {
    await expect(decryptV3(GETH_GEN_KEYSTORE1, `${PASSPHRASE1}!`)).rejects.toThrow(
      V3ErrorMessages.WRONG_PASSPHRASE
    )
  })

  it('rejects a non-V3 keystore', async () => {
    const v1 = JSON.stringify({ ...JSON.parse(GETH_GEN_KEYSTORE1), version: 1 })
    await expect(decryptV3(v1, PASSPHRASE1)).rejects.toThrow(V3ErrorMessages.NOT_V3)
  })

  it('rejects an unsupported cipher', async () => {
    const parsed = JSON.parse(GETH_GEN_KEYSTORE1)
    parsed.crypto.cipher = 'aes-128-cbc'
    await expect(decryptV3(JSON.stringify(parsed), PASSPHRASE1)).rejects.toThrow(
      V3ErrorMessages.UNSUPPORTED_CIPHER
    )
  })

  it('rejects an unsupported key derivation scheme', async () => {
    const parsed = JSON.parse(GETH_GEN_KEYSTORE1)
    parsed.crypto.kdf = 'bcrypt'
    await expect(decryptV3(JSON.stringify(parsed), PASSPHRASE1)).rejects.toThrow(
      V3ErrorMessages.UNSUPPORTED_KDF
    )
  })

  it('rejects pbkdf2 with a pseudorandom function other than hmac-sha256', async () => {
    const parsed = JSON.parse(GETH_GEN_KEYSTORE1)
    parsed.crypto.kdf = 'pbkdf2'
    parsed.crypto.kdfparams = { dklen: 32, salt: '00'.repeat(32), c: 1, prf: 'hmac-sha512' }
    await expect(decryptV3(JSON.stringify(parsed), PASSPHRASE1)).rejects.toThrow(
      V3ErrorMessages.UNSUPPORTED_PBKDF2_PARAMS
    )
  })

  it('detects a tampered ciphertext via the mac', async () => {
    const parsed = JSON.parse(GETH_GEN_KEYSTORE1)
    parsed.crypto.ciphertext = `${parsed.crypto.ciphertext.slice(0, -2)}00`
    await expect(decryptV3(JSON.stringify(parsed), PASSPHRASE1)).rejects.toThrow(
      V3ErrorMessages.WRONG_PASSPHRASE
    )
  })
})

describe('encryptV3', () => {
  it('round-trips a private key', async () => {
    const keystore = await encryptV3(PK1, PASSPHRASE1)
    expect(trimLeading0x(await decryptV3(JSON.stringify(keystore), PASSPHRASE1))).toBe(PK1)
  })

  it('round-trips a 0x-prefixed private key', async () => {
    const keystore = await encryptV3(`0x${PK1}`, PASSPHRASE1)
    expect(trimLeading0x(await decryptV3(JSON.stringify(keystore), PASSPHRASE1))).toBe(PK1)
  })

  it('writes geth-compatible parameters', async () => {
    const { version, crypto } = await encryptV3(PK1, PASSPHRASE1)
    expect(version).toBe(3)
    expect(crypto.cipher).toBe('aes-128-ctr')
    expect(crypto.kdf).toBe('scrypt')
    expect(crypto.kdfparams).toMatchObject({ dklen: 32, n: 262144, r: 8, p: 1 })
    expect(crypto.cipherparams.iv).toHaveLength(32)
    expect(crypto.kdfparams.salt).toHaveLength(64)
    expect(crypto.mac).toHaveLength(64)
  })

  it('stores the address unprefixed and lowercased', async () => {
    const { address } = await encryptV3(PK1, PASSPHRASE1)
    expect(address).toBe(trimLeading0x(ADDRESS1).toLowerCase())
  })

  it('uses a fresh salt and iv for each keystore', async () => {
    const [a, b] = await Promise.all([encryptV3(PK1, PASSPHRASE1), encryptV3(PK1, PASSPHRASE1)])
    expect(a.crypto.kdfparams.salt).not.toBe(b.crypto.kdfparams.salt)
    expect(a.crypto.cipherparams.iv).not.toBe(b.crypto.cipherparams.iv)
    expect(a.crypto.ciphertext).not.toBe(b.crypto.ciphertext)
    expect(a.id).not.toBe(b.id)
  })
})

describe('v3Filename', () => {
  it('builds the geth filename convention', () => {
    expect(v3Filename(ADDRESS1, Date.parse('2016-03-15T17:11:33.007Z'))).toBe(
      `UTC--2016-03-15T17-11-33.007Z--${trimLeading0x(ADDRESS1).toLowerCase()}`
    )
  })

  it('accepts an address with or without a 0x prefix', () => {
    const timestamp = Date.parse('2016-03-15T17:11:33.007Z')
    expect(v3Filename(ADDRESS1, timestamp)).toBe(v3Filename(trimLeading0x(ADDRESS1), timestamp))
  })
})
