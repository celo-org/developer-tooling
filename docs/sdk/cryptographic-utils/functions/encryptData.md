[**@celo/cryptographic-utils v6.0.0-beta.0**](../README.md)

***

[@celo/cryptographic-utils](../globals.md) / encryptData

# Function: encryptData()

> **encryptData**(`data`, `pubKeyRecipient`, `pubKeySelf`): `Buffer`

Defined in: [cryptographic-utils/src/commentEncryption.ts:28](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/cryptographic-utils/src/commentEncryption.ts#L28)

Encrypts a buffer to two recipients. Throws on error.

## Parameters

### data

`Buffer`

Data to encrypt

### pubKeyRecipient

`Buffer`

Public key of the recipient. Uncompressed without leading 0x04.

### pubKeySelf

`Buffer`

Public key of the sender. Uncompressed without leading 0x04.

## Returns

`Buffer`

Encrypted data to sender and recipient.
