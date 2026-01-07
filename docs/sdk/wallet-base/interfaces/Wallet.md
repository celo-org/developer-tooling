[**@celo/wallet-base v8.0.3**](../README.md)

***

[@celo/wallet-base](../README.md) / Wallet

# Interface: Wallet

Defined in: [wallets/wallet-base/src/wallet-base.ts:10](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-base/src/wallet-base.ts#L10)

## Extends

- `ReadOnlyWallet`

## Extended by

- [`UnlockableWallet`](UnlockableWallet.md)

## Properties

### addAccount

> **addAccount**: `addInMemoryAccount` \| `addRemoteAccount`

Defined in: [wallets/wallet-base/src/wallet-base.ts:11](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-base/src/wallet-base.ts#L11)

***

### computeSharedSecret()

> **computeSharedSecret**: (`address`, `publicKey`) => `Promise`\<`Buffer`\>

Defined in: connect/lib/wallet.d.ts:13

#### Parameters

##### address

`string`

##### publicKey

`string`

#### Returns

`Promise`\<`Buffer`\>

#### Inherited from

`ReadOnlyWallet.computeSharedSecret`

***

### decrypt()

> **decrypt**: (`address`, `ciphertext`) => `Promise`\<`Buffer`\>

Defined in: connect/lib/wallet.d.ts:12

#### Parameters

##### address

`string`

##### ciphertext

`Buffer`

#### Returns

`Promise`\<`Buffer`\>

#### Inherited from

`ReadOnlyWallet.decrypt`

***

### getAccounts()

> **getAccounts**: () => `string`[]

Defined in: connect/lib/wallet.d.ts:6

#### Returns

`string`[]

#### Inherited from

`ReadOnlyWallet.getAccounts`

***

### hasAccount()

> **hasAccount**: (`address?`) => `boolean`

Defined in: connect/lib/wallet.d.ts:8

#### Parameters

##### address?

`string`

#### Returns

`boolean`

#### Inherited from

`ReadOnlyWallet.hasAccount`

***

### removeAccount()

> **removeAccount**: (`address`) => `void`

Defined in: connect/lib/wallet.d.ts:7

#### Parameters

##### address

`string`

#### Returns

`void`

#### Inherited from

`ReadOnlyWallet.removeAccount`

***

### signPersonalMessage()

> **signPersonalMessage**: (`address`, `data`) => `Promise`\<`string`\>

Defined in: connect/lib/wallet.d.ts:11

#### Parameters

##### address

`string`

##### data

`string`

#### Returns

`Promise`\<`string`\>

#### Inherited from

`ReadOnlyWallet.signPersonalMessage`

***

### signTransaction()

> **signTransaction**: (`txParams`) => `Promise`\<`EncodedTransaction`\>

Defined in: connect/lib/wallet.d.ts:9

#### Parameters

##### txParams

`CeloTx`

#### Returns

`Promise`\<`EncodedTransaction`\>

#### Inherited from

`ReadOnlyWallet.signTransaction`

***

### signTypedData()

> **signTypedData**: (`address`, `typedData`) => `Promise`\<`string`\>

Defined in: connect/lib/wallet.d.ts:10

#### Parameters

##### address

`string`

##### typedData

`EIP712TypedData`

#### Returns

`Promise`\<`string`\>

#### Inherited from

`ReadOnlyWallet.signTypedData`
