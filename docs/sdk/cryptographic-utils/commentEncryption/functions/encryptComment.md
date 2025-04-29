[**@celo/cryptographic-utils**](../../README.md)

***

[@celo/cryptographic-utils](../../modules.md) / [commentEncryption](../README.md) / encryptComment

# Function: encryptComment()

> **encryptComment**(`comment`, `pubKeyRecipient`, `pubKeySelf`): [`EncryptionStatus`](../interfaces/EncryptionStatus.md)

Defined in: [cryptographic-utils/src/commentEncryption.ts:70](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/cryptographic-utils/src/commentEncryption.ts#L70)

Encrypts a comment. If it can encrypt, it returns a base64 string with the following:
   ECIES(session key to other) + ECIES(session key to self) + AES(comment)
If it fails to encrypt, it returns the comment without any changes.

## Parameters

### comment

`string`

Comment to encrypt.

### pubKeyRecipient

`Buffer`

Public key of the recipient. May be compressed.

### pubKeySelf

`Buffer`

Public key of the sender. May be compressed.

## Returns

[`EncryptionStatus`](../interfaces/EncryptionStatus.md)

base64 string of encrypted comment if can encrypt, otherwise comment.
