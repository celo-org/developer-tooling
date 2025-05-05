[**@celo/connect v7.0.0-beta.0**](../README.md)

***

[@celo/connect](../globals.md) / Signer

# Interface: Signer

Defined in: [packages/sdk/connect/src/wallet.ts:15](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/wallet.ts#L15)

## Properties

### computeSharedSecret()

> **computeSharedSecret**: (`publicKey`) => `Promise`\<`Buffer`\>

Defined in: [packages/sdk/connect/src/wallet.ts:29](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/wallet.ts#L29)

#### Parameters

##### publicKey

`string`

#### Returns

`Promise`\<`Buffer`\>

***

### decrypt()

> **decrypt**: (`ciphertext`) => `Promise`\<`Buffer`\>

Defined in: [packages/sdk/connect/src/wallet.ts:28](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/wallet.ts#L28)

#### Parameters

##### ciphertext

`Buffer`

#### Returns

`Promise`\<`Buffer`\>

***

### getNativeKey()

> **getNativeKey**: () => `string`

Defined in: [packages/sdk/connect/src/wallet.ts:27](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/wallet.ts#L27)

#### Returns

`string`

***

### signPersonalMessage()

> **signPersonalMessage**: (`data`) => `Promise`\<\{ `r`: `Buffer`; `s`: `Buffer`; `v`: `number`; \}\>

Defined in: [packages/sdk/connect/src/wallet.ts:25](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/wallet.ts#L25)

#### Parameters

##### data

`string`

#### Returns

`Promise`\<\{ `r`: `Buffer`; `s`: `Buffer`; `v`: `number`; \}\>

***

### signTransaction()

> **signTransaction**: (`addToV`, `encodedTx`) => `Promise`\<\{ `r`: `Buffer`; `s`: `Buffer`; `v`: `number`; \}\>

Defined in: [packages/sdk/connect/src/wallet.ts:21](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/wallet.ts#L21)

Signs the message and returns an EVM transaction

#### Parameters

##### addToV

`number`

represents the chainId and is added to the recoveryId to prevent replay

##### encodedTx

[`RLPEncodedTx`](RLPEncodedTx.md)

is the RLPEncoded transaction object

#### Returns

`Promise`\<\{ `r`: `Buffer`; `s`: `Buffer`; `v`: `number`; \}\>

***

### signTypedData()

> **signTypedData**: (`typedData`) => `Promise`\<\{ `r`: `Buffer`; `s`: `Buffer`; `v`: `number`; \}\>

Defined in: [packages/sdk/connect/src/wallet.ts:26](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/wallet.ts#L26)

#### Parameters

##### typedData

`EIP712TypedData`

#### Returns

`Promise`\<\{ `r`: `Buffer`; `s`: `Buffer`; `v`: `number`; \}\>
