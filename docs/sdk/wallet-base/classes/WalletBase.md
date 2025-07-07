[**@celo/wallet-base v8.0.0-beta.3**](../README.md)

***

[@celo/wallet-base](../README.md) / WalletBase

# Class: `abstract` WalletBase\<TSigner\>

Defined in: [wallets/wallet-base/src/wallet-base.ts:19](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-base/src/wallet-base.ts#L19)

## Type Parameters

### TSigner

`TSigner` *extends* `Signer`

## Implements

- `ReadOnlyWallet`

## Constructors

### Constructor

> **new WalletBase**\<`TSigner`\>(): `WalletBase`\<`TSigner`\>

#### Returns

`WalletBase`\<`TSigner`\>

## Methods

### computeSharedSecret()

> **computeSharedSecret**(`address`, `publicKey`): `Promise`\<`Buffer`\>

Defined in: [wallets/wallet-base/src/wallet-base.ts:148](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-base/src/wallet-base.ts#L148)

Computes the shared secret (an ECDH key exchange object) between two accounts

#### Parameters

##### address

`string`

##### publicKey

`string`

#### Returns

`Promise`\<`Buffer`\>

#### Implementation of

`ReadOnlyWallet.computeSharedSecret`

***

### decrypt()

> **decrypt**(`address`, `ciphertext`): `Promise`\<`Buffer`\>

Defined in: [wallets/wallet-base/src/wallet-base.ts:140](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-base/src/wallet-base.ts#L140)

#### Parameters

##### address

`string`

##### ciphertext

`Buffer`

#### Returns

`Promise`\<`Buffer`\>

#### Implementation of

`ReadOnlyWallet.decrypt`

***

### getAccounts()

> **getAccounts**(): `string`[]

Defined in: [wallets/wallet-base/src/wallet-base.ts:27](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-base/src/wallet-base.ts#L27)

Gets a list of accounts that have been registered

#### Returns

`string`[]

#### Implementation of

`ReadOnlyWallet.getAccounts`

***

### hasAccount()

> **hasAccount**(`address?`): `boolean`

Defined in: [wallets/wallet-base/src/wallet-base.ts:43](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-base/src/wallet-base.ts#L43)

Returns true if account has been registered

#### Parameters

##### address?

`string`

Account to check

#### Returns

`boolean`

#### Implementation of

`ReadOnlyWallet.hasAccount`

***

### removeAccount()

> **removeAccount**(`_address`): `void`

Defined in: [wallets/wallet-base/src/wallet-base.ts:35](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-base/src/wallet-base.ts#L35)

Removes the account with the given address. Needs to be implemented by subclass, otherwise throws error

#### Parameters

##### \_address

`string`

The address of the account to be removed

#### Returns

`void`

#### Implementation of

`ReadOnlyWallet.removeAccount`

***

### signPersonalMessage()

> **signPersonalMessage**(`address`, `data`): `Promise`\<`string`\>

Defined in: [wallets/wallet-base/src/wallet-base.ts:104](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-base/src/wallet-base.ts#L104)

Sign a personal Ethereum signed message.

#### Parameters

##### address

`string`

Address of the account to sign with

##### data

`string`

Hex string message to sign

#### Returns

`Promise`\<`string`\>

Signature hex string (order: rsv)

#### Implementation of

`ReadOnlyWallet.signPersonalMessage`

***

### signTransaction()

> **signTransaction**(`txParams`): `Promise`\<`EncodedTransaction`\>

Defined in: [wallets/wallet-base/src/wallet-base.ts:75](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-base/src/wallet-base.ts#L75)

Gets the signer based on the 'from' field in the tx body

#### Parameters

##### txParams

`CeloTx`

Transaction to sign

#### Returns

`Promise`\<`EncodedTransaction`\>

#### Implementation of

`ReadOnlyWallet.signTransaction`

***

### signTypedData()

> **signTypedData**(`address`, `typedData`): `Promise`\<`string`\>

Defined in: [wallets/wallet-base/src/wallet-base.ts:121](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-base/src/wallet-base.ts#L121)

Sign an EIP712 Typed Data message.

#### Parameters

##### address

`string`

Address of the account to sign with

##### typedData

`EIP712TypedData`

the typed data object

#### Returns

`Promise`\<`string`\>

Signature hex string (order: rsv)

#### Implementation of

`ReadOnlyWallet.signTypedData`
