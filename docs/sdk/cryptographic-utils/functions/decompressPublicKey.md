[**@celo/cryptographic-utils v5.1.3**](../README.md)

***

[@celo/cryptographic-utils](../globals.md) / decompressPublicKey

# Function: decompressPublicKey()

> **decompressPublicKey**(`publicKey`): `Buffer`

Defined in: [cryptographic-utils/src/dataEncryptionKey.ts:23](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/cryptographic-utils/src/dataEncryptionKey.ts#L23)

Decompresses a public key and strips out the '0x04' leading constant. This makes
any public key suitable to be used with this ECIES implementation.

## Parameters

### publicKey

`Buffer`

Public key in standard form (with 0x02, 0x03, or 0x04 prefix)

## Returns

`Buffer`

Decompresssed public key without prefix.
