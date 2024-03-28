[@celo/utils](../README.md) / ecies

# Module: ecies

## Table of contents

### Variables

- [ECIES](ecies.md#ecies)
- [IV\_LENGTH](ecies.md#iv_length)

### Functions

- [AES128Decrypt](ecies.md#aes128decrypt)
- [AES128DecryptAndHMAC](ecies.md#aes128decryptandhmac)
- [AES128Encrypt](ecies.md#aes128encrypt)
- [AES128EncryptAndHMAC](ecies.md#aes128encryptandhmac)
- [ConcatKDF](ecies.md#concatkdf)
- [Decrypt](ecies.md#decrypt)
- [Encrypt](ecies.md#encrypt)

## Variables

### ECIES

• `Const` **ECIES**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `AES128DecryptAndHMAC` | (`encryptionKey`: `Uint8Array`, `macKey`: `Uint8Array`, `ciphertext`: `Uint8Array`) => `Uint8Array` |
| `AES128EncryptAndHMAC` | (`encryptionKey`: `Uint8Array`, `macKey`: `Uint8Array`, `plaintext`: `Uint8Array`) => `Uint8Array` |
| `Decrypt` | (`privKey`: `PrivKey`, `encrypted`: `Buffer`) => `Uint8Array` |
| `Encrypt` | (`pubKeyTo`: `PubKey`, `plaintext`: `Uint8Array`) => `Buffer` |

#### Defined in

[packages/sdk/utils/src/ecies.ts:199](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/utils/src/ecies.ts#L199)

___

### IV\_LENGTH

• `Const` **IV\_LENGTH**: ``16``

#### Defined in

[packages/sdk/utils/src/ecies.ts:18](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/utils/src/ecies.ts#L18)

## Functions

### AES128Decrypt

▸ **AES128Decrypt**(`encryptionKey`, `iv`, `ciphertext`): `Uint8Array`

AES-128 CTR decrypt

#### Parameters

| Name | Type |
| :------ | :------ |
| `encryptionKey` | `Uint8Array` |
| `iv` | `Uint8Array` |
| `ciphertext` | `Uint8Array` |

#### Returns

`Uint8Array`

plaintext

#### Defined in

[packages/sdk/utils/src/ecies.ts:106](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/utils/src/ecies.ts#L106)

___

### AES128DecryptAndHMAC

▸ **AES128DecryptAndHMAC**(`encryptionKey`, `macKey`, `ciphertext`): `Uint8Array`

AES-128 CTR decrypt with message authentication

#### Parameters

| Name | Type |
| :------ | :------ |
| `encryptionKey` | `Uint8Array` |
| `macKey` | `Uint8Array` |
| `ciphertext` | `Uint8Array` |

#### Returns

`Uint8Array`

plaintext

#### Defined in

[packages/sdk/utils/src/ecies.ts:122](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/utils/src/ecies.ts#L122)

___

### AES128Encrypt

▸ **AES128Encrypt**(`encryptionKey`, `iv`, `plaintext`): `Uint8Array`

AES-128 CTR encrypt

#### Parameters

| Name | Type |
| :------ | :------ |
| `encryptionKey` | `Uint8Array` |
| `iv` | `Uint8Array` |
| `plaintext` | `Uint8Array` |

#### Returns

`Uint8Array`

ciphertext

#### Defined in

[packages/sdk/utils/src/ecies.ts:70](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/utils/src/ecies.ts#L70)

___

### AES128EncryptAndHMAC

▸ **AES128EncryptAndHMAC**(`encryptionKey`, `macKey`, `plaintext`): `Uint8Array`

AES-128 CTR encrypt with message authentication

#### Parameters

| Name | Type |
| :------ | :------ |
| `encryptionKey` | `Uint8Array` |
| `macKey` | `Uint8Array` |
| `plaintext` | `Uint8Array` |

#### Returns

`Uint8Array`

ciphertext

#### Defined in

[packages/sdk/utils/src/ecies.ts:88](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/utils/src/ecies.ts#L88)

___

### ConcatKDF

▸ **ConcatKDF**(`px`, `kdLen`): `Buffer`

NIST 8000-56C Rev 1 One Step KDF with the following parameters:
- H(x) is SHA-256(x)
- Fixed info is null

TODO:
- Implement proper ceiling on reps.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `px` | `Buffer` | Input keying material to derive key from. |
| `kdLen` | `number` | Length of output in bytes |

#### Returns

`Buffer`

Output keying material of length kdLen bytes.

#### Defined in

[packages/sdk/utils/src/ecies.ts:48](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/utils/src/ecies.ts#L48)

___

### Decrypt

▸ **Decrypt**(`privKey`, `encrypted`): `Uint8Array`

ECIES decrypt

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `privKey` | `PrivKey` | Ethereum private key, 32 bytes. |
| `encrypted` | `Buffer` | Encrypted message, serialized, 113+ bytes |

#### Returns

`Uint8Array`

plaintext

#### Defined in

[packages/sdk/utils/src/ecies.ts:179](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/utils/src/ecies.ts#L179)

___

### Encrypt

▸ **Encrypt**(`pubKeyTo`, `plaintext`): `Buffer`

ECIES encrypt

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pubKeyTo` | `PubKey` | Ethereum pub key, 64 bytes. |
| `plaintext` | `Uint8Array` | Plaintext to be encrypted. |

#### Returns

`Buffer`

Encrypted message, serialized, 113+ bytes

#### Defined in

[packages/sdk/utils/src/ecies.ts:145](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/utils/src/ecies.ts#L145)
