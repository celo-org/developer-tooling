import { privateToPublic } from '@ethereumjs/util'
import { ctr } from '@noble/ciphers/aes'
import { bytesToUtf8, utf8ToBytes } from '@noble/ciphers/utils'
import { randomBytes as randooom } from '@noble/ciphers/webcrypto/utils'
import { randomBytes } from 'crypto'
import { ECIES } from './ecies'

describe('ECIES', () => {
  describe('encrypt', () => {
    it('should encrypt a message without error', () => {
      const privKey = randomBytes(32)
      const pubKey = privateToPublic(privKey)
      const message = Buffer.from('foo')
      const encrypted = ECIES.Encrypt(pubKey, message)
      expect(encrypted.length).toBeGreaterThanOrEqual(113)
    })

    it('should throw an error if priv key is given', () => {
      const privKey = randomBytes(32)
      const message = Buffer.from('foo')
      try {
        ECIES.Encrypt(privKey, message)
        expect(false).toBe(true)
      } catch (error) {
        // ok, encryption should not work when a priv key is given
      }
    })

    it.only('should not regress', () => {
      const snapshotPrivKey = Buffer.from(
        'f353837781491b9ded31b6cb669c867e4c91f0ccfdaa85db4b1f0a814bc060c5',
        'hex'
      )
      const pubKey = privateToPublic(snapshotPrivKey)
      const message = Buffer.from('foo')
      const encrypted = ECIES.Encrypt(pubKey, message).toString('hex')
      expect(encrypted).toMatchInlineSnapshot(
        `"0487d78806c22bc7a5dd5ab38b02fb7ef48220648b6dd815b7ea3466c0270ebfe17aafece9af8f1c827ae9c47bac4215cd344afd94132581f4d789f8715a429d5c5c2dc365496750655bcd1c29445b118967cf790bb46b6a708ff1b3e82982173d98546ae6f228260913572127dc38a015386cb8"`
      )
      expect(ECIES.Decrypt(snapshotPrivKey, Buffer.from(encrypted, 'hex'))).toEqual(message)
    })
  })

  describe('roundtrip', () => {
    it('should return the same plaintext after roundtrip - core', () => {
      // const plaintext = utf8ToBytes('spam')
      const privKey = randooom(32)
      // const pubKey = privateToPublic(privKey)
      // const iv = randomBytes(16)
      // const encrypted = AES128Encrypt(privKey, iv, plaintext)
      // const decrypted = AES128Decrypt(privKey, iv, encrypted)

      const plaintext = 'Hello, World'
      const aes = ctr(privKey, randomBytes(16))
      const ciphertext_ = aes.encrypt(utf8ToBytes(plaintext))
      const plaintext_ = aes.decrypt(ciphertext_)
      expect(bytesToUtf8(plaintext_)).toEqual(plaintext)
    })

    it('should return the same plaintext after roundtrip', () => {
      const plaintext = Buffer.from('spam')
      const privKey = randomBytes(32)
      const pubKey = privateToPublic(privKey)
      const encrypted = ECIES.Encrypt(pubKey, plaintext)
      const decrypted = ECIES.Decrypt(privKey, encrypted)
      expect(decrypted.toString()).toEqual(plaintext.toString())
    })

    it('should only decrypt if correct priv key is given', () => {
      const plaintext = Buffer.from('spam')
      const privKey = randomBytes(32)
      const pubKey = privateToPublic(privKey)
      const fakePrivKey = randomBytes(32)
      try {
        ECIES.Encrypt(pubKey, plaintext)
        ECIES.Decrypt(fakePrivKey, plaintext)
        expect(false).toBe(true)
      } catch (error) {
        // ok, decryption should not work for incorrect priv key
      }
    })

    it('should be able to encrypt and decrypt a longer message (1024 bytes)', () => {
      const plaintext = randomBytes(1024)
      const privKey = randomBytes(32)
      const pubKey = privateToPublic(privKey)
      const encrypted = ECIES.Encrypt(pubKey, plaintext)
      const decrypted = ECIES.Decrypt(privKey, encrypted)
      expect(decrypted.toString()).toEqual(plaintext.toString())
    })
  })
})

describe('AES128CTR', () => {
  describe('encrypt', () => {
    it('should encrypt a message without error', () => {
      const plaintext = Buffer.from('spam')
      const encKey = randomBytes(16)
      const macKey = randomBytes(16)
      const encrypted = ECIES.AES128EncryptAndHMAC(encKey, macKey, plaintext)
      expect(encrypted.length).toBeGreaterThanOrEqual(plaintext.length)
    })
  })

  describe('roundtrip', () => {
    it('should return the same plaintext after roundtrip', () => {
      const plaintext = Buffer.from('spam')
      const encKey = randomBytes(16)
      const macKey = randomBytes(16)
      const encrypted = ECIES.AES128EncryptAndHMAC(encKey, macKey, plaintext)
      const decrypted = ECIES.AES128DecryptAndHMAC(encKey, macKey, encrypted)
      expect(decrypted.toString()).toEqual(plaintext.toString())
    })

    it('should only decrypt if correct priv key is given', () => {
      const plaintext = Buffer.from('spam')
      const encKey = randomBytes(16)
      const macKey = randomBytes(16)
      const fakeKey = randomBytes(16)
      const encrypted = ECIES.AES128EncryptAndHMAC(encKey, macKey, plaintext)
      // console.info(encrypted.toString('hex').length)
      const decrypted = ECIES.AES128DecryptAndHMAC(fakeKey, macKey, encrypted)
      expect(plaintext.equals(decrypted)).toBe(false)
    })

    it('should be able to encrypt and decrypt a longer message (1024 bytes)', () => {
      const plaintext = randomBytes(1024)
      const encKey = randomBytes(16)
      const macKey = randomBytes(16)
      const encrypted = ECIES.AES128EncryptAndHMAC(encKey, macKey, plaintext)
      const decrypted = ECIES.AES128DecryptAndHMAC(encKey, macKey, encrypted)
      expect(decrypted.toString()).toEqual(plaintext.toString())
    })
  })

  describe('authentication', () => {
    it('should reject invalid mac', () => {
      try {
        const plaintext = Buffer.from('spam')
        const encKey = randomBytes(16)
        const macKey = randomBytes(16)
        const fakeKey = randomBytes(16)
        const encrypted = ECIES.AES128EncryptAndHMAC(encKey, macKey, plaintext)
        ECIES.AES128DecryptAndHMAC(encKey, fakeKey, encrypted)
        expect(true).toBe(false)
      } catch (e) {
        // Should in fact throw.
      }
    })
  })
})
