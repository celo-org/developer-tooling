[**@celo/wallet-local v8.0.4**](../README.md)

***

[@celo/wallet-local](../README.md) / LocalSigner

# Class: LocalSigner

Defined in: [wallet-local/src/local-signer.ts:13](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-local/src/local-signer.ts#L13)

Signs the EVM transaction using the provided private key

## Implements

- `Signer`

## Constructors

### Constructor

> **new LocalSigner**(`privateKey`): `LocalSigner`

Defined in: [wallet-local/src/local-signer.ts:16](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-local/src/local-signer.ts#L16)

#### Parameters

##### privateKey

`string`

#### Returns

`LocalSigner`

## Methods

### computeSharedSecret()

> **computeSharedSecret**(`publicKey`): `Promise`\<`Buffer`\>

Defined in: [wallet-local/src/local-signer.ts:70](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-local/src/local-signer.ts#L70)

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

Defined in: [wallet-local/src/local-signer.ts:63](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-local/src/local-signer.ts#L63)

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

Defined in: [wallet-local/src/local-signer.ts:20](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-local/src/local-signer.ts#L20)

#### Returns

`string`

#### Implementation of

`Signer.getNativeKey`

***

### signPersonalMessage()

> **signPersonalMessage**(`data`): `Promise`\<\{ `r`: `Buffer`; `s`: `Buffer`; `v`: `number`; \}\>

Defined in: [wallet-local/src/local-signer.ts:31](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-local/src/local-signer.ts#L31)

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

Defined in: [wallet-local/src/local-signer.ts:24](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-local/src/local-signer.ts#L24)

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

Defined in: [wallet-local/src/local-signer.ts:50](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-local/src/local-signer.ts#L50)

#### Parameters

##### typedData

`EIP712TypedData`

#### Returns

`Promise`\<\{ `r`: `Buffer`; `s`: `Buffer`; `v`: `number`; \}\>

#### Implementation of

`Signer.signTypedData`
