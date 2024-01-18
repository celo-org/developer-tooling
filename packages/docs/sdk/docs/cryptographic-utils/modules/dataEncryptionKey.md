[@celo/cryptographic-utils](../README.md) / [Exports](../modules.md) / dataEncryptionKey

# Module: dataEncryptionKey

## Table of contents

### Variables

- [DataEncryptionKeyUtils](dataEncryptionKey.md#dataencryptionkeyutils)

### Functions

- [compressedPubKey](dataEncryptionKey.md#compressedpubkey)
- [decompressPublicKey](dataEncryptionKey.md#decompresspublickey)
- [deriveDek](dataEncryptionKey.md#derivedek)

## Variables

### DataEncryptionKeyUtils

• `Const` **DataEncryptionKeyUtils**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `compressedPubKey` | (`privateKey`: `Buffer`) => `string` |
| `decompressPublicKey` | (`publicKey`: `Buffer`) => `Buffer` |
| `deriveDek` | (`mnemonic`: `string`, `bip39ToUse?`: [`Bip39`](../interfaces/account.Bip39.md)) => `Promise`\<\{ `address`: `string` ; `privateKey`: `string` ; `publicKey`: `string`  }\> |

#### Defined in

[cryptographic-utils/src/dataEncryptionKey.ts:56](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/cryptographic-utils/src/dataEncryptionKey.ts#L56)

## Functions

### compressedPubKey

▸ **compressedPubKey**(`privateKey`): `string`

Turns a private key to a compressed public key (hex string with hex leader).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `privateKey` | `Buffer` | Private key. |

#### Returns

`string`

Corresponding compessed public key in hex encoding with '0x' leader.

#### Defined in

[cryptographic-utils/src/dataEncryptionKey.ts:10](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/cryptographic-utils/src/dataEncryptionKey.ts#L10)

___

### decompressPublicKey

▸ **decompressPublicKey**(`publicKey`): `Buffer`

Decompresses a public key and strips out the '0x04' leading constant. This makes
any public key suitable to be used with this ECIES implementation.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `publicKey` | `Buffer` | Public key in standard form (with 0x02, 0x03, or 0x04 prefix) |

#### Returns

`Buffer`

Decompresssed public key without prefix.

#### Defined in

[cryptographic-utils/src/dataEncryptionKey.ts:27](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/cryptographic-utils/src/dataEncryptionKey.ts#L27)

___

### deriveDek

▸ **deriveDek**(`mnemonic`, `bip39ToUse?`): `Promise`\<\{ `address`: `string` ; `privateKey`: `string` ; `publicKey`: `string`  }\>

Derives a data encryption key from the mnemonic

#### Parameters

| Name | Type |
| :------ | :------ |
| `mnemonic` | `string` |
| `bip39ToUse?` | [`Bip39`](../interfaces/account.Bip39.md) |

#### Returns

`Promise`\<\{ `address`: `string` ; `privateKey`: `string` ; `publicKey`: `string`  }\>

Comment Encryption Private key.

#### Defined in

[cryptographic-utils/src/dataEncryptionKey.ts:42](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/cryptographic-utils/src/dataEncryptionKey.ts#L42)
