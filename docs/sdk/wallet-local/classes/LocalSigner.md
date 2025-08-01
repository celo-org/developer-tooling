[**@celo/wallet-local v8.0.1**](../README.md)

***

[@celo/wallet-local](../README.md) / LocalSigner

# Class: LocalSigner

Defined in: [wallet-local/src/local-signer.ts:12](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-local/src/local-signer.ts#L12)

Signs the EVM transaction using the provided private key

## Implements

- `Signer`

## Constructors

### Constructor

> **new LocalSigner**(`privateKey`): `LocalSigner`

Defined in: [wallet-local/src/local-signer.ts:15](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-local/src/local-signer.ts#L15)

#### Parameters

##### privateKey

`string`

#### Returns

`LocalSigner`

## Methods

### computeSharedSecret()

> **computeSharedSecret**(`publicKey`): `Promise`\<`Buffer`\>

Defined in: [wallet-local/src/local-signer.ts:66](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-local/src/local-signer.ts#L66)

#### Parameters

##### publicKey

`string`

#### Returns

`Promise`\<`Buffer`\>

#### Implementation of

`Signer.computeSharedSecret`

***

### decrypt()

> **decrypt**(`ciphertext`): `Promise`\<`Buffer`\>

Defined in: [wallet-local/src/local-signer.ts:59](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-local/src/local-signer.ts#L59)

#### Parameters

##### ciphertext

`Buffer`

#### Returns

`Promise`\<`Buffer`\>

#### Implementation of

`Signer.decrypt`

***

### getNativeKey()

> **getNativeKey**(): `string`

Defined in: [wallet-local/src/local-signer.ts:19](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-local/src/local-signer.ts#L19)

#### Returns

`string`

#### Implementation of

`Signer.getNativeKey`

***

### signPersonalMessage()

> **signPersonalMessage**(`data`): `Promise`\<\{ `r`: `Buffer`; `s`: `Buffer`; `v`: `number`; \}\>

Defined in: [wallet-local/src/local-signer.ts:30](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-local/src/local-signer.ts#L30)

#### Parameters

##### data

`string`

#### Returns

`Promise`\<\{ `r`: `Buffer`; `s`: `Buffer`; `v`: `number`; \}\>

#### Implementation of

`Signer.signPersonalMessage`

***

### signTransaction()

> **signTransaction**(`addToV`, `encodedTx`): `Promise`\<\{ `r`: `Buffer`; `s`: `Buffer`; `v`: `number`; \}\>

Defined in: [wallet-local/src/local-signer.ts:23](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-local/src/local-signer.ts#L23)

Signs the message and returns an EVM transaction

#### Parameters

##### addToV

`number`

represents the chainId and is added to the recoveryId to prevent replay

##### encodedTx

`RLPEncodedTx`

is the RLPEncoded transaction object

#### Returns

`Promise`\<\{ `r`: `Buffer`; `s`: `Buffer`; `v`: `number`; \}\>

#### Implementation of

`Signer.signTransaction`

***

### signTypedData()

> **signTypedData**(`typedData`): `Promise`\<\{ `r`: `Buffer`; `s`: `Buffer`; `v`: `number`; \}\>

Defined in: [wallet-local/src/local-signer.ts:46](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-local/src/local-signer.ts#L46)

#### Parameters

##### typedData

`EIP712TypedData`

#### Returns

`Promise`\<\{ `r`: `Buffer`; `s`: `Buffer`; `v`: `number`; \}\>

#### Implementation of

`Signer.signTypedData`
