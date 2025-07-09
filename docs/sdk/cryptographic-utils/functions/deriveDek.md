[**@celo/cryptographic-utils v6.0.0**](../README.md)

***

[@celo/cryptographic-utils](../globals.md) / deriveDek

# Function: deriveDek()

> **deriveDek**(`mnemonic`, `bip39ToUse?`): `Promise`\<\{ `address`: `string`; `privateKey`: `string`; `publicKey`: `string`; \}\>

Defined in: [cryptographic-utils/src/dataEncryptionKey.ts:33](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/cryptographic-utils/src/dataEncryptionKey.ts#L33)

Derives a data encryption key from the mnemonic

## Parameters

### mnemonic

`string`

### bip39ToUse?

[`Bip39`](../interfaces/Bip39.md)

## Returns

`Promise`\<\{ `address`: `string`; `privateKey`: `string`; `publicKey`: `string`; \}\>

Comment Encryption Private key.
