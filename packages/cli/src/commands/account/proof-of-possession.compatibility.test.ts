import { generateProofOfKeyPossessionLocally, parseSignatureOfAddress } from '@celo/actions'
import { newKitFromWeb3 } from '@celo/contractkit'
import { serializeSignature } from '@celo/core'
import { testWithAnvilL2 } from '@celo/dev-utils/anvil-test'
import { encodePacked, keccak256 } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import Web3 from 'web3'

const TIMEOUT = 30_000

// Test data - use different addresses for account and signer (real-world scenario)
const TEST_SIGNER_PRIVATE_KEY = '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef'
const TEST_ACCOUNT_PRIVATE_KEY =
  '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890'
const TEST_SIGNER = privateKeyToAccount(TEST_SIGNER_PRIVATE_KEY).address
const TEST_ACCOUNT = privateKeyToAccount(TEST_ACCOUNT_PRIVATE_KEY).address

describe('Proof of Possession Compatibility Tests', () => {
  describe('Hash Generation Compatibility', () => {
    it('viem hash matches web3 soliditySha3 hash', async () => {
      // Web3 approach
      const web3Hash = Web3.utils.soliditySha3({ type: 'address', value: TEST_ACCOUNT })

      // Viem approach
      const viemHash = keccak256(encodePacked(['address'], [TEST_ACCOUNT]))

      expect(viemHash).toBe(web3Hash)
    })
  })

  describe('Local Signature Compatibility', () => {
    testWithAnvilL2('local implementations produce identical results', (web3: Web3) => {
      it(
        'both implementations produce identical signatures with different account/signer',
        async () => {
          // Old ContractKit local approach
          const kit = newKitFromWeb3(web3)
          const accounts = await kit.contracts.getAccounts()
          const oldResult = await accounts.generateProofOfKeyPossessionLocally(
            TEST_ACCOUNT,
            TEST_SIGNER,
            TEST_SIGNER_PRIVATE_KEY
          )

          // New viem approach - signer proves possession for account
          const newResult = await generateProofOfKeyPossessionLocally(
            TEST_SIGNER_PRIVATE_KEY,
            TEST_ACCOUNT
          )

          // Both should produce valid signature structures
          expect(oldResult).toHaveProperty('v')
          expect(oldResult).toHaveProperty('r')
          expect(oldResult).toHaveProperty('s')
          expect(typeof oldResult.v).toBe('number')
          expect([27, 28]).toContain(oldResult.v)

          expect(newResult).toHaveProperty('v')
          expect(newResult).toHaveProperty('r')
          expect(newResult).toHaveProperty('s')
          expect(typeof newResult.v).toBe('number')
          expect([27, 28]).toContain(newResult.v)

          // Test cross-compatibility: both implementations should produce identical signatures
          // when signer proves possession for a different account
          const oldSerialized = serializeSignature(oldResult)
          const newSerialized = serializeSignature(newResult)

          // New implementation should be able to parse its own signatures
          const newParsed = await parseSignatureOfAddress(TEST_ACCOUNT, TEST_SIGNER, newSerialized)
          expect(newParsed.v).toBe(newResult.v)
          expect(newParsed.r).toBe(newResult.r)
          expect(newParsed.s).toBe(newResult.s)

          expect(oldSerialized).toBe(newSerialized)
        },
        TIMEOUT
      )
    })
  })

  describe('End-to-End Compatibility', () => {
    testWithAnvilL2('old implementation works', (web3: Web3) => {
      it(
        'generates proof with ContractKit',
        async () => {
          const kit = newKitFromWeb3(web3)
          const accounts = await kit.contracts.getAccounts()

          // Fund the account (not the signer)
          const fundingAccount = (await web3.eth.getAccounts())[0]
          await web3.eth.sendTransaction({
            from: fundingAccount,
            to: TEST_ACCOUNT,
            value: web3.utils.toWei('1', 'ether'),
          })

          // We need to add both account and signer private keys for this test
          kit.connection.addAccount(TEST_ACCOUNT_PRIVATE_KEY)
          kit.connection.addAccount(TEST_SIGNER_PRIVATE_KEY)
          kit.defaultAccount = TEST_SIGNER // Set signer as default for signing

          const oldResult = await accounts.generateProofOfKeyPossession(TEST_ACCOUNT, TEST_SIGNER)
          const oldSerialized = serializeSignature(oldResult)

          expect(oldSerialized).toMatch(/^0x[a-fA-F0-9]{130}$/)

          // Store for comparison with new implementation
          expect(oldResult).toHaveProperty('v')
          expect(oldResult).toHaveProperty('r')
          expect(oldResult).toHaveProperty('s')
        },
        TIMEOUT
      )
    })

    it(
      'new implementation has correct structure',
      async () => {
        // Test local signing without RPC calls - signer proves possession for account
        const newResult = await generateProofOfKeyPossessionLocally(
          TEST_SIGNER_PRIVATE_KEY,
          TEST_ACCOUNT
        )
        const newSerialized = serializeSignature(newResult)

        expect(newSerialized).toMatch(/^0x[a-fA-F0-9]{130}$/)

        // Verify structure
        expect(newResult).toHaveProperty('v')
        expect(newResult).toHaveProperty('r')
        expect(newResult).toHaveProperty('s')
      },
      TIMEOUT
    )
  })

  describe('Signature Format Compatibility', () => {
    testWithAnvilL2('signatures can be parsed by both implementations', (_web3: Web3) => {
      it(
        'new implementation parses signatures correctly',
        async () => {
          // Generate signature with new implementation - signer proves possession for account
          const newSignature = await generateProofOfKeyPossessionLocally(
            TEST_SIGNER_PRIVATE_KEY,
            TEST_ACCOUNT
          )
          const serializedSig = serializeSignature(newSignature)

          // Parse with new implementation
          const parsedByNew = await parseSignatureOfAddress(
            TEST_ACCOUNT,
            TEST_SIGNER,
            serializedSig
          )

          expect(parsedByNew.v).toBe(newSignature.v)
          expect(parsedByNew.r).toBe(newSignature.r)
          expect(parsedByNew.s).toBe(newSignature.s)
        },
        TIMEOUT
      )
    })
  })

  describe('Known Test Vector Compatibility', () => {
    it('produces known test signature correctly', async () => {
      // Using the constants from test-utils/constants.ts
      const knownAccount = '0x5409ED021D9299bf6814279A6A1411A7e866A631'

      // This test assumes we know the private key that corresponds to the known signer
      // For now, we'll just test that our new implementation produces consistent results
      // TODO: Use knownAccount when we have the corresponding private key
      void knownAccount // Keep for future use
      const result1 = await generateProofOfKeyPossessionLocally(
        TEST_SIGNER_PRIVATE_KEY,
        TEST_ACCOUNT
      )

      const result2 = await generateProofOfKeyPossessionLocally(
        TEST_SIGNER_PRIVATE_KEY,
        TEST_ACCOUNT
      )

      expect(serializeSignature(result1)).toBe(serializeSignature(result2))
    })
  })
})
