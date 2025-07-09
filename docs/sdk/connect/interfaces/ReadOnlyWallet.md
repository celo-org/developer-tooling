[**@celo/connect v7.0.0**](../README.md)

***

[@celo/connect](../globals.md) / ReadOnlyWallet

# Interface: ReadOnlyWallet

Defined in: [packages/sdk/connect/src/wallet.ts:4](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/wallet.ts#L4)

## Properties

### computeSharedSecret()

> **computeSharedSecret**: (`address`, `publicKey`) => `Promise`\<`Buffer`\>

Defined in: [packages/sdk/connect/src/wallet.ts:12](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/wallet.ts#L12)

#### Parameters

##### address

`string`

##### publicKey

`string`

#### Returns

`Promise`\<`Buffer`\>

***

### decrypt()

> **decrypt**: (`address`, `ciphertext`) => `Promise`\<`Buffer`\>

Defined in: [packages/sdk/connect/src/wallet.ts:11](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/wallet.ts#L11)

#### Parameters

##### address

`string`

##### ciphertext

`Buffer`

#### Returns

`Promise`\<`Buffer`\>

***

### getAccounts()

> **getAccounts**: () => `string`[]

Defined in: [packages/sdk/connect/src/wallet.ts:5](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/wallet.ts#L5)

#### Returns

`string`[]

***

### hasAccount()

> **hasAccount**: (`address?`) => `boolean`

Defined in: [packages/sdk/connect/src/wallet.ts:7](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/wallet.ts#L7)

#### Parameters

##### address?

`string`

#### Returns

`boolean`

***

### removeAccount()

> **removeAccount**: (`address`) => `void`

Defined in: [packages/sdk/connect/src/wallet.ts:6](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/wallet.ts#L6)

#### Parameters

##### address

`string`

#### Returns

`void`

***

### signPersonalMessage()

> **signPersonalMessage**: (`address`, `data`) => `Promise`\<`string`\>

Defined in: [packages/sdk/connect/src/wallet.ts:10](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/wallet.ts#L10)

#### Parameters

##### address

`string`

##### data

`string`

#### Returns

`Promise`\<`string`\>

***

### signTransaction()

> **signTransaction**: (`txParams`) => `Promise`\<[`EncodedTransaction`](EncodedTransaction.md)\>

Defined in: [packages/sdk/connect/src/wallet.ts:8](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/wallet.ts#L8)

#### Parameters

##### txParams

[`CeloTx`](../type-aliases/CeloTx.md)

#### Returns

`Promise`\<[`EncodedTransaction`](EncodedTransaction.md)\>

***

### signTypedData()

> **signTypedData**: (`address`, `typedData`) => `Promise`\<`string`\>

Defined in: [packages/sdk/connect/src/wallet.ts:9](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/wallet.ts#L9)

#### Parameters

##### address

`string`

##### typedData

`EIP712TypedData`

#### Returns

`Promise`\<`string`\>
