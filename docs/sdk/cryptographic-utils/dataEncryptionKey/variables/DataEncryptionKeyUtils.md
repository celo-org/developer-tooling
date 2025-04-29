[**@celo/cryptographic-utils**](../../README.md)

***

[@celo/cryptographic-utils](../../modules.md) / [dataEncryptionKey](../README.md) / DataEncryptionKeyUtils

# Variable: DataEncryptionKeyUtils

> `const` **DataEncryptionKeyUtils**: `object`

Defined in: [cryptographic-utils/src/dataEncryptionKey.ts:47](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/cryptographic-utils/src/dataEncryptionKey.ts#L47)

## Type declaration

### compressedPubKey()

> **compressedPubKey**: (`privateKey`) => `string`

Turns a private key to a compressed public key (hex string with hex leader).

#### Parameters

##### privateKey

`Buffer`

Private key.

#### Returns

`string`

Corresponding compressed public key in hex encoding with '0x' leader.

### decompressPublicKey()

> **decompressPublicKey**: (`publicKey`) => `Buffer`

Decompresses a public key and strips out the '0x04' leading constant. This makes
any public key suitable to be used with this ECIES implementation.

#### Parameters

##### publicKey

`Buffer`

Public key in standard form (with 0x02, 0x03, or 0x04 prefix)

#### Returns

`Buffer`

Decompresssed public key without prefix.

### deriveDek()

> **deriveDek**: (`mnemonic`, `bip39ToUse?`) => `Promise`\<\{ `address`: `string`; `privateKey`: `string`; `publicKey`: `string`; \}\>

Derives a data encryption key from the mnemonic

#### Parameters

##### mnemonic

`string`

##### bip39ToUse?

[`Bip39`](../../account/interfaces/Bip39.md)

#### Returns

`Promise`\<\{ `address`: `string`; `privateKey`: `string`; `publicKey`: `string`; \}\>

Comment Encryption Private key.
