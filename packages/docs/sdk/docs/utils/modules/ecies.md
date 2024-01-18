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
- [Decrypt](ecies.md#decrypt)
- [Encrypt](ecies.md#encrypt)

## Variables

### ECIES

• `Const` **ECIES**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `AES128DecryptAndHMAC` | (`encryptionKey`: `Buffer`, `macKey`: `Buffer`, `ciphertext`: `Buffer`) => `Buffer` |
| `AES128EncryptAndHMAC` | (`encryptionKey`: `Buffer`, `macKey`: `Buffer`, `plaintext`: `Buffer`) => `Buffer` |
| `Decrypt` | (`privKey`: `Buffer`, `encrypted`: `Buffer`) => `Buffer` |
| `Encrypt` | (`pubKeyTo`: `Buffer`, `plaintext`: `Buffer`) => `Buffer` |

#### Defined in

[packages/sdk/utils/src/ecies.ts:184](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/utils/src/ecies.ts#L184)

___

### IV\_LENGTH

• `Const` **IV\_LENGTH**: ``16``

#### Defined in

[packages/sdk/utils/src/ecies.ts:11](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/utils/src/ecies.ts#L11)

## Functions

### AES128Decrypt

▸ **AES128Decrypt**(`encryptionKey`, `iv`, `ciphertext`): `Buffer`

AES-128 CTR decrypt

#### Parameters

| Name | Type |
| :------ | :------ |
| `encryptionKey` | `Buffer` |
| `iv` | `Buffer` |
| `ciphertext` | `Buffer` |

#### Returns

`Buffer`

plaintext

#### Defined in

[packages/sdk/utils/src/ecies.ts:96](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/utils/src/ecies.ts#L96)

___

### AES128DecryptAndHMAC

▸ **AES128DecryptAndHMAC**(`encryptionKey`, `macKey`, `ciphertext`): `Buffer`

AES-128 CTR decrypt with message authentication

#### Parameters

| Name | Type |
| :------ | :------ |
| `encryptionKey` | `Buffer` |
| `macKey` | `Buffer` |
| `ciphertext` | `Buffer` |

#### Returns

`Buffer`

plaintext

#### Defined in

[packages/sdk/utils/src/ecies.ts:111](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/utils/src/ecies.ts#L111)

___

### AES128Encrypt

▸ **AES128Encrypt**(`encryptionKey`, `iv`, `plaintext`): `Buffer`

AES-128 CTR encrypt

#### Parameters

| Name | Type |
| :------ | :------ |
| `encryptionKey` | `Buffer` |
| `iv` | `Buffer` |
| `plaintext` | `Buffer` |

#### Returns

`Buffer`

ciphertext

#### Defined in

[packages/sdk/utils/src/ecies.ts:63](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/utils/src/ecies.ts#L63)

___

### AES128EncryptAndHMAC

▸ **AES128EncryptAndHMAC**(`encryptionKey`, `macKey`, `plaintext`): `Buffer`

AES-128 CTR encrypt with message authentication

#### Parameters

| Name | Type |
| :------ | :------ |
| `encryptionKey` | `Buffer` |
| `macKey` | `Buffer` |
| `plaintext` | `Buffer` |

#### Returns

`Buffer`

ciphertext

#### Defined in

[packages/sdk/utils/src/ecies.ts:77](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/utils/src/ecies.ts#L77)

___

### Decrypt

▸ **Decrypt**(`privKey`, `encrypted`): `Buffer`

ECIES decrypt

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `privKey` | `Buffer` | Ethereum private key, 32 bytes. |
| `encrypted` | `Buffer` | Encrypted message, serialized, 113+ bytes |

#### Returns

`Buffer`

plaintext

#### Defined in

[packages/sdk/utils/src/ecies.ts:163](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/utils/src/ecies.ts#L163)

___

### Encrypt

▸ **Encrypt**(`pubKeyTo`, `plaintext`): `Buffer`

ECIES encrypt

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pubKeyTo` | `Buffer` | Ethereum pub key, 64 bytes. |
| `plaintext` | `Buffer` | Plaintext to be encrypted. |

#### Returns

`Buffer`

Encrypted message, serialized, 113+ bytes

#### Defined in

[packages/sdk/utils/src/ecies.ts:134](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/utils/src/ecies.ts#L134)
