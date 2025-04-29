[**@celo/cryptographic-utils v5.1.3**](../README.md)

***

[@celo/cryptographic-utils](../globals.md) / CommentEncryptionUtils

# Variable: CommentEncryptionUtils

> `const` **CommentEncryptionUtils**: `object`

Defined in: [cryptographic-utils/src/commentEncryption.ts:116](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/cryptographic-utils/src/commentEncryption.ts#L116)

## Type declaration

### decryptComment()

> **decryptComment**: (`comment`, `key`, `sender`) => [`EncryptionStatus`](../interfaces/EncryptionStatus.md)

Decrypts a comments encrypted by encryptComment. If it cannot decrypt the comment (i.e. comment was
never encrypted in the first place), it returns the comments without any changes.

#### Parameters

##### comment

`string`

Comment to decrypt. If encrypted, base64 encoded. May be plaintext.

##### key

`Buffer`

Private key to decrypt the message with.

##### sender

`boolean`

If the decryptor is the sender of the message.

#### Returns

[`EncryptionStatus`](../interfaces/EncryptionStatus.md)

Decrypted comment if can decrypt, otherwise comment.

### encryptComment()

> **encryptComment**: (`comment`, `pubKeyRecipient`, `pubKeySelf`) => [`EncryptionStatus`](../interfaces/EncryptionStatus.md)

Encrypts a comment. If it can encrypt, it returns a base64 string with the following:
   ECIES(session key to other) + ECIES(session key to self) + AES(comment)
If it fails to encrypt, it returns the comment without any changes.

#### Parameters

##### comment

`string`

Comment to encrypt.

##### pubKeyRecipient

`Buffer`

Public key of the recipient. May be compressed.

##### pubKeySelf

`Buffer`

Public key of the sender. May be compressed.

#### Returns

[`EncryptionStatus`](../interfaces/EncryptionStatus.md)

base64 string of encrypted comment if can encrypt, otherwise comment.
