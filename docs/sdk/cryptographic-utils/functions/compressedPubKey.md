[**@celo/cryptographic-utils v5.1.3**](../README.md)

***

[@celo/cryptographic-utils](../globals.md) / compressedPubKey

# Function: compressedPubKey()

> **compressedPubKey**(`privateKey`): `string`

Defined in: [cryptographic-utils/src/dataEncryptionKey.ts:12](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/cryptographic-utils/src/dataEncryptionKey.ts#L12)

Turns a private key to a compressed public key (hex string with hex leader).

## Parameters

### privateKey

`Buffer`

Private key.

## Returns

`string`

Corresponding compressed public key in hex encoding with '0x' leader.
