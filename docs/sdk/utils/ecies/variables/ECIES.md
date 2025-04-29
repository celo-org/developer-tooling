[**@celo/utils**](../../README.md)

***

[@celo/utils](../../README.md) / [ecies](../README.md) / ECIES

# Variable: ECIES

> `const` **ECIES**: `object`

Defined in: [packages/sdk/utils/src/ecies.ts:199](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/utils/src/ecies.ts#L199)

## Type declaration

### AES128DecryptAndHMAC()

> **AES128DecryptAndHMAC**: (`encryptionKey`, `macKey`, `ciphertext`) => `Uint8Array`

AES-128 CTR decrypt with message authentication

#### Parameters

##### encryptionKey

`Uint8Array`

##### macKey

`Uint8Array`

##### ciphertext

`Uint8Array`

#### Returns

`Uint8Array`

plaintext

### AES128EncryptAndHMAC()

> **AES128EncryptAndHMAC**: (`encryptionKey`, `macKey`, `plaintext`) => `Uint8Array`

AES-128 CTR encrypt with message authentication

#### Parameters

##### encryptionKey

`Uint8Array`

##### macKey

`Uint8Array`

##### plaintext

`Uint8Array`

#### Returns

`Uint8Array`

ciphertext

### Decrypt()

> **Decrypt**: (`privKey`, `encrypted`) => `Uint8Array`

ECIES decrypt

#### Parameters

##### privKey

`PrivKey`

Ethereum private key, 32 bytes.

##### encrypted

`Buffer`

Encrypted message, serialized, 113+ bytes

#### Returns

`Uint8Array`

plaintext

### Encrypt()

> **Encrypt**: (`pubKeyTo`, `plaintext`) => `Buffer`

ECIES encrypt

#### Parameters

##### pubKeyTo

`PubKey`

Ethereum pub key, 64 bytes.

##### plaintext

`Uint8Array`

Plaintext to be encrypted.

#### Returns

`Buffer`

Encrypted message, serialized, 113+ bytes
