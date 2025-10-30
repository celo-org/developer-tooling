import { privateKeyToAccount } from 'viem/accounts'
import { describe, expect, it } from 'vitest'
import { serializeSignature } from '@celo/core'
import { generateProofOfKeyPossessionLocally, parseSignatureOfAddress } from './accounts.js'

// Test constants
const TEST_PRIVATE_KEY = '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef'
const TEST_SIGNER = privateKeyToAccount(TEST_PRIVATE_KEY).address
const TEST_ACCOUNT = TEST_SIGNER // Use the same address for proof-of-possession tests

describe('accounts proof-of-possession functions', () => {
  // Note: wallet client tests are not included because anvil doesn't support personal_sign
  // These tests focus on local signing which works independently

  describe('generateProofOfKeyPossessionLocally', () => {
    it('generates valid proof of possession signature locally', async () => {
      const result = await generateProofOfKeyPossessionLocally(TEST_PRIVATE_KEY, TEST_ACCOUNT)

      expect(result).toHaveProperty('v')
      expect(result).toHaveProperty('r')
      expect(result).toHaveProperty('s')
      expect(typeof result.v).toBe('number')
      expect([27, 28]).toContain(result.v)
      expect(result.r).toMatch(/^0x[a-fA-F0-9]{64}$/)
      expect(result.s).toMatch(/^0x[a-fA-F0-9]{64}$/)
    })

    it('works with different private keys', async () => {
      const privateKey1 = '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef'
      const privateKey2 = '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890'

      // Use different account addresses to avoid signature validation errors
      const account1 = privateKeyToAccount(privateKey1).address
      const account2 = privateKeyToAccount(privateKey2).address

      const result1 = await generateProofOfKeyPossessionLocally(privateKey1, account1)
      const result2 = await generateProofOfKeyPossessionLocally(privateKey2, account2)

      expect(serializeSignature(result1)).not.toBe(serializeSignature(result2))
    })
  })

  describe('parseSignatureOfAddress', () => {
    it('parses signature correctly', async () => {
      // First generate a signature
      const signature = await generateProofOfKeyPossessionLocally(TEST_PRIVATE_KEY, TEST_ACCOUNT)
      const serializedSig = serializeSignature(signature)

      // Then parse it
      const parsed = await parseSignatureOfAddress(TEST_ACCOUNT, TEST_SIGNER, serializedSig)

      expect(parsed.v).toBe(signature.v)
      expect(parsed.r).toBe(signature.r)
      expect(parsed.s).toBe(signature.s)
    })

    it('throws error for invalid signer', async () => {
      // Generate a signature with one signer but try to parse with different expected signer
      const signature = await generateProofOfKeyPossessionLocally(TEST_PRIVATE_KEY, TEST_ACCOUNT)
      const serializedSig = serializeSignature(signature)

      const wrongSigner = '0x6Ecbe1DB9EF729CBe972C83Fb886247691Fb6beb'

      await expect(
        parseSignatureOfAddress(TEST_ACCOUNT, wrongSigner, serializedSig)
      ).rejects.toThrow('Unable to parse signature')
    })
  })
})
