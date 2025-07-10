[**@celo/cryptographic-utils v6.0.0**](../README.md)

***

[@celo/cryptographic-utils](../globals.md) / decryptData

# Function: decryptData()

> **decryptData**(`data`, `key`, `sender`): `Buffer`

Defined in: [cryptographic-utils/src/commentEncryption.ts:46](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/cryptographic-utils/src/commentEncryption.ts#L46)

Decrypts raw data that was encrypted by encryptData. Throws on error.

## Parameters

### data

`Buffer`

Data to decrypt.

### key

`Buffer`

Private key to decrypt the message with.

### sender

`boolean`

If the decryptor is the sender of the message.

## Returns

`Buffer`

Decrypted data.
