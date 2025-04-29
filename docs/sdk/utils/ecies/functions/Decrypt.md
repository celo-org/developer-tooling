[**@celo/utils**](../../README.md)

***

[@celo/utils](../../README.md) / [ecies](../README.md) / Decrypt

# Function: Decrypt()

> **Decrypt**(`privKey`, `encrypted`): `Uint8Array`

Defined in: [packages/sdk/utils/src/ecies.ts:179](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/utils/src/ecies.ts#L179)

ECIES decrypt

## Parameters

### privKey

`PrivKey`

Ethereum private key, 32 bytes.

### encrypted

`Buffer`

Encrypted message, serialized, 113+ bytes

## Returns

`Uint8Array`

plaintext
