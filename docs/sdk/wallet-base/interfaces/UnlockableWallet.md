[**@celo/wallet-base v8.0.0-beta.3**](../README.md)

***

[@celo/wallet-base](../README.md) / UnlockableWallet

# Interface: UnlockableWallet

Defined in: [wallets/wallet-base/src/wallet-base.ts:14](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-base/src/wallet-base.ts#L14)

## Extends

- [`Wallet`](Wallet.md)

## Properties

### addAccount

> **addAccount**: `addInMemoryAccount` \| `addRemoteAccount`

Defined in: [wallets/wallet-base/src/wallet-base.ts:11](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-base/src/wallet-base.ts#L11)

#### Inherited from

[`Wallet`](Wallet.md).[`addAccount`](Wallet.md#addaccount)

***

### computeSharedSecret()

> **computeSharedSecret**: (`address`, `publicKey`) => `Promise`\<`Buffer`\>

Defined in: connect/lib/wallet.d.ts:12

#### Parameters

##### address

`string`

##### publicKey

`string`

#### Returns

`Promise`\<`Buffer`\>

#### Inherited from

[`Wallet`](Wallet.md).[`computeSharedSecret`](Wallet.md#computesharedsecret)

***

### decrypt()

> **decrypt**: (`address`, `ciphertext`) => `Promise`\<`Buffer`\>

Defined in: connect/lib/wallet.d.ts:11

#### Parameters

##### address

`string`

##### ciphertext

`Buffer`

#### Returns

`Promise`\<`Buffer`\>

#### Inherited from

[`Wallet`](Wallet.md).[`decrypt`](Wallet.md#decrypt)

***

### getAccounts()

> **getAccounts**: () => `string`[]

Defined in: connect/lib/wallet.d.ts:5

#### Returns

`string`[]

#### Inherited from

[`Wallet`](Wallet.md).[`getAccounts`](Wallet.md#getaccounts)

***

### hasAccount()

> **hasAccount**: (`address?`) => `boolean`

Defined in: connect/lib/wallet.d.ts:7

#### Parameters

##### address?

`string`

#### Returns

`boolean`

#### Inherited from

[`Wallet`](Wallet.md).[`hasAccount`](Wallet.md#hasaccount)

***

### isAccountUnlocked()

> **isAccountUnlocked**: (`address`) => `boolean`

Defined in: [wallets/wallet-base/src/wallet-base.ts:16](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-base/src/wallet-base.ts#L16)

#### Parameters

##### address

`string`

#### Returns

`boolean`

***

### removeAccount()

> **removeAccount**: (`address`) => `void`

Defined in: connect/lib/wallet.d.ts:6

#### Parameters

##### address

`string`

#### Returns

`void`

#### Inherited from

[`Wallet`](Wallet.md).[`removeAccount`](Wallet.md#removeaccount)

***

### signPersonalMessage()

> **signPersonalMessage**: (`address`, `data`) => `Promise`\<`string`\>

Defined in: connect/lib/wallet.d.ts:10

#### Parameters

##### address

`string`

##### data

`string`

#### Returns

`Promise`\<`string`\>

#### Inherited from

[`Wallet`](Wallet.md).[`signPersonalMessage`](Wallet.md#signpersonalmessage)

***

### signTransaction()

> **signTransaction**: (`txParams`) => `Promise`\<`EncodedTransaction`\>

Defined in: connect/lib/wallet.d.ts:8

#### Parameters

##### txParams

`CeloTx`

#### Returns

`Promise`\<`EncodedTransaction`\>

#### Inherited from

[`Wallet`](Wallet.md).[`signTransaction`](Wallet.md#signtransaction)

***

### signTypedData()

> **signTypedData**: (`address`, `typedData`) => `Promise`\<`string`\>

Defined in: connect/lib/wallet.d.ts:9

#### Parameters

##### address

`string`

##### typedData

`EIP712TypedData`

#### Returns

`Promise`\<`string`\>

#### Inherited from

[`Wallet`](Wallet.md).[`signTypedData`](Wallet.md#signtypeddata)

***

### unlockAccount()

> **unlockAccount**: (`address`, `passphrase`, `duration`) => `Promise`\<`boolean`\>

Defined in: [wallets/wallet-base/src/wallet-base.ts:15](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-base/src/wallet-base.ts#L15)

#### Parameters

##### address

`string`

##### passphrase

`string`

##### duration

`number`

#### Returns

`Promise`\<`boolean`\>
