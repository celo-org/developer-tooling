[**@celo/cryptographic-utils**](../../README.md)

***

[@celo/cryptographic-utils](../../modules.md) / [commentEncryption](../README.md) / decryptComment

# Function: decryptComment()

> **decryptComment**(`comment`, `key`, `sender`): [`EncryptionStatus`](../interfaces/EncryptionStatus.md)

Defined in: [cryptographic-utils/src/commentEncryption.ts:105](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/cryptographic-utils/src/commentEncryption.ts#L105)

Decrypts a comments encrypted by encryptComment. If it cannot decrypt the comment (i.e. comment was
never encrypted in the first place), it returns the comments without any changes.

## Parameters

### comment

`string`

Comment to decrypt. If encrypted, base64 encoded. May be plaintext.

### key

`Buffer`

Private key to decrypt the message with.

### sender

`boolean`

If the decryptor is the sender of the message.

## Returns

[`EncryptionStatus`](../interfaces/EncryptionStatus.md)

Decrypted comment if can decrypt, otherwise comment.
