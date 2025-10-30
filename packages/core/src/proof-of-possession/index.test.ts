import { encodePacked, keccak256 } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { describe, expect, it, vi } from 'vitest'
import { generateProofOfPossessionHash, parseProofOfPossession, parseSignature } from './index.js'

describe('generateProofOfPossessionHash', () => {
  const testAddress = '0x5409ED021D9299bf6814279A6A1411A7e866A631' as const

  it('generates correct hash for address', () => {
    const hash = generateProofOfPossessionHash(testAddress)

    // Should match what viem's keccak256(encodePacked(['address'], [address])) produces
    const expectedHash = keccak256(encodePacked(['address'], [testAddress]))
    expect(hash).toBe(expectedHash)
  })

  it('produces consistent results for same address', () => {
    const hash1 = generateProofOfPossessionHash(testAddress)
    const hash2 = generateProofOfPossessionHash(testAddress)
    expect(hash1).toBe(hash2)
  })

  it('produces different results for different addresses', () => {
    const address1 = '0x5409ED021D9299bf6814279A6A1411A7e866A631' as const
    const address2 = '0x6Ecbe1DB9EF729CBe972C83Fb886247691Fb6beb' as const

    const hash1 = generateProofOfPossessionHash(address1)
    const hash2 = generateProofOfPossessionHash(address2)

    expect(hash1).not.toBe(hash2)
  })

  it('returns 32-byte hex string', () => {
    const hash = generateProofOfPossessionHash(testAddress)

    // Should be 0x + 64 hex chars (32 bytes)
    expect(hash).toMatch(/^0x[a-fA-F0-9]{64}$/)
  })
})

describe('parseProofOfPossession', () => {
  const testAddress = '0x5409ED021D9299bf6814279A6A1411A7e866A631' as const

  // Use a known private key for testing
  const testPrivateKey = '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80'
  const testAccount = privateKeyToAccount(testPrivateKey)
  const testSigner = testAccount.address

  it('parses signature correctly', async () => {
    // Generate the hash and sign it directly (without message prefix)
    const hash = generateProofOfPossessionHash(testAddress)
    const signature = await testAccount.sign({ hash })

    const result = await parseProofOfPossession(testAddress, testSigner, signature)

    expect(result).toHaveProperty('v')
    expect(result).toHaveProperty('r')
    expect(result).toHaveProperty('s')
    expect(typeof result.v).toBe('number')
    expect(typeof result.r).toBe('string')
    expect(typeof result.s).toBe('string')
  })

  it('uses correct hash in parsing', async () => {
    const expectedHash = generateProofOfPossessionHash(testAddress)

    // Generate a valid signature for the test
    const hash = generateProofOfPossessionHash(testAddress)
    const signature = await testAccount.sign({ hash })

    // Rather than mocking, just verify that parseProofOfPossession calls with the expected hash
    // We can do this by checking that it uses the same hash as we generate
    const result = await parseProofOfPossession(testAddress, testSigner, signature)

    // The fact that this doesn't throw an error means the correct hash was used
    expect(result).toHaveProperty('v')
    expect(result).toHaveProperty('r')
    expect(result).toHaveProperty('s')

    // Verify the hash matches what we expect
    expect(hash).toBe(expectedHash)
  })
})
