[**@celo/utils**](../../README.md)

***

[@celo/utils](../../README.md) / [ecies](../README.md) / Encrypt

# Function: Encrypt()

> **Encrypt**(`pubKeyTo`, `plaintext`): `Buffer`

Defined in: [packages/sdk/utils/src/ecies.ts:145](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/utils/src/ecies.ts#L145)

ECIES encrypt

## Parameters

### pubKeyTo

`PubKey`

Ethereum pub key, 64 bytes.

### plaintext

`Uint8Array`

Plaintext to be encrypted.

## Returns

`Buffer`

Encrypted message, serialized, 113+ bytes
