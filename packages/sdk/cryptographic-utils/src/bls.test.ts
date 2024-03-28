import { normalizeAddressWith0x } from '@celo/base'
import { privateKeyToAddress } from '@celo/utils/lib/address'
import { blsPrivateKeyToProcessedPrivateKey, getBlsPoP, getBlsPublicKey } from './bls'
const PRIVATE_KEY1 = '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef'
const ACCOUNT_ADDRESS1 = normalizeAddressWith0x(privateKeyToAddress(PRIVATE_KEY1)) as `0x${string}`

describe('BLS regression tests', () => {
  test('blsPrivateKeyToProcessedPrivateKey', () => {
    expect(blsPrivateKeyToProcessedPrivateKey(PRIVATE_KEY1)).toMatchInlineSnapshot(`
      {
        "data": [
          242,
          30,
          152,
          172,
          17,
          130,
          80,
          64,
          6,
          191,
          156,
          10,
          65,
          229,
          164,
          189,
          107,
          121,
          20,
          112,
          230,
          253,
          30,
          215,
          206,
          48,
          25,
          145,
          97,
          14,
          121,
          3,
        ],
        "type": "Buffer",
      }
    `)
  })

  test('getBlsPublicKey', () => {
    expect(getBlsPublicKey(PRIVATE_KEY1)).toMatchInlineSnapshot(
      `"0x71436cf1cd3aacc12cf48122094802172522e0ae788a3c53328c911c6b84920cf584a865cccb319c82dcebb00e37520031d5c4c68104f1ae9eebb34fa76060da75ae8039810227104a89d7e033e4af8813ba0556cc8ffc47ca0791c7fa4ec680"`
    )
  })

  test('getBlsPoP', () => {
    expect(getBlsPoP(ACCOUNT_ADDRESS1, PRIVATE_KEY1)).toMatchInlineSnapshot(
      `"0x049cb0478d23fe074f01f0d8e5a512e6fb4b1dfe1ed1e079aea01e88a693f59904fc7a1668fef32a4ea0ce4e4e71f800"`
    )
  })
})
