[@celo/cryptographic-utils](../README.md) / [Exports](../modules.md) / commentEncryption

# Module: commentEncryption

## Table of contents

### Interfaces

- [EncryptionStatus](../interfaces/commentEncryption.EncryptionStatus.md)

### Variables

- [CommentEncryptionUtils](commentEncryption.md#commentencryptionutils)

### Functions

- [decryptComment](commentEncryption.md#decryptcomment)
- [decryptData](commentEncryption.md#decryptdata)
- [encryptComment](commentEncryption.md#encryptcomment)
- [encryptData](commentEncryption.md#encryptdata)

## Variables

### CommentEncryptionUtils

• `Const` **CommentEncryptionUtils**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `decryptComment` | (`comment`: `string`, `key`: `Buffer`, `sender`: `boolean`) => [`EncryptionStatus`](../interfaces/commentEncryption.EncryptionStatus.md) |
| `encryptComment` | (`comment`: `string`, `pubKeyRecipient`: `Buffer`, `pubKeySelf`: `Buffer`) => [`EncryptionStatus`](../interfaces/commentEncryption.EncryptionStatus.md) |

#### Defined in

[cryptographic-utils/src/commentEncryption.ts:119](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/cryptographic-utils/src/commentEncryption.ts#L119)

## Functions

### decryptComment

▸ **decryptComment**(`comment`, `key`, `sender`): [`EncryptionStatus`](../interfaces/commentEncryption.EncryptionStatus.md)

Decrypts a comments encrypted by encryptComment. If it cannot decrypt the comment (i.e. comment was
never encrypted in the first place), it returns the comments without any changes.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `comment` | `string` | Comment to decrypt. If encrypted, base64 encoded. May be plaintext. |
| `key` | `Buffer` | Private key to decrypt the message with. |
| `sender` | `boolean` | If the decryptor is the sender of the message. |

#### Returns

[`EncryptionStatus`](../interfaces/commentEncryption.EncryptionStatus.md)

Decrypted comment if can decrypt, otherwise comment.

#### Defined in

[cryptographic-utils/src/commentEncryption.ts:108](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/cryptographic-utils/src/commentEncryption.ts#L108)

___

### decryptData

▸ **decryptData**(`data`, `key`, `sender`): `Buffer`

Decrypts raw data that was encrypted by encryptData. Throws on error.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | `Buffer` | Data to decrypt. |
| `key` | `Buffer` | Private key to decrypt the message with. |
| `sender` | `boolean` | If the decryptor is the sender of the message. |

#### Returns

`Buffer`

Decrypted data.

#### Defined in

[cryptographic-utils/src/commentEncryption.ts:46](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/cryptographic-utils/src/commentEncryption.ts#L46)

___

### encryptComment

▸ **encryptComment**(`comment`, `pubKeyRecipient`, `pubKeySelf`): [`EncryptionStatus`](../interfaces/commentEncryption.EncryptionStatus.md)

Encrypts a comment. If it can encrypt, it returns a base64 string with the following:
   ECIES(session key to other) + ECIES(session key to self) + AES(comment)
If it fails to encrypt, it returns the comment without any changes.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `comment` | `string` | Comment to encrypt. |
| `pubKeyRecipient` | `Buffer` | Public key of the recipient. May be compressed. |
| `pubKeySelf` | `Buffer` | Public key of the sender. May be compressed. |

#### Returns

[`EncryptionStatus`](../interfaces/commentEncryption.EncryptionStatus.md)

base64 string of encrypted comment if can encrypt, otherwise comment.

#### Defined in

[cryptographic-utils/src/commentEncryption.ts:73](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/cryptographic-utils/src/commentEncryption.ts#L73)

___

### encryptData

▸ **encryptData**(`data`, `pubKeyRecipient`, `pubKeySelf`): `Buffer`

Encrypts a buffer to two recipients. Throws on error.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | `Buffer` | Data to encrypt |
| `pubKeyRecipient` | `Buffer` | Public key of the recipient. Uncompressed without leading 0x04. |
| `pubKeySelf` | `Buffer` | Public key of the sender. Uncompressed without leading 0x04. |

#### Returns

`Buffer`

Encrypted data to sender and recipient.

#### Defined in

[cryptographic-utils/src/commentEncryption.ts:28](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/cryptographic-utils/src/commentEncryption.ts#L28)
