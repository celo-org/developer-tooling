[**@celo/wallet-remote v8.0.3**](../README.md)

***

[@celo/wallet-remote](../README.md) / RemoteWallet

# Class: `abstract` RemoteWallet\<TSigner\>

Defined in: [wallet-remote/src/remote-wallet.ts:9](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-remote/src/remote-wallet.ts#L9)

Abstract class representing a remote wallet that requires async initialization

## Extends

- `WalletBase`\<`TSigner`\>

## Type Parameters

### TSigner

`TSigner` *extends* `Signer`

## Implements

- `ReadOnlyWallet`

## Constructors

### Constructor

> **new RemoteWallet**\<`TSigner`\>(): `RemoteWallet`\<`TSigner`\>

#### Returns

`RemoteWallet`\<`TSigner`\>

#### Inherited from

`WalletBase<TSigner>.constructor`

## Methods

### computeSharedSecret()

> **computeSharedSecret**(`address`, `publicKey`): `Promise`\<`Buffer`\>

Defined in: wallet-base/lib/wallet-base.d.ts:65

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

#### Inherited from

`WalletBase.computeSharedSecret`

***

### decrypt()

> **decrypt**(`address`, `ciphertext`): `Promise`\<`Buffer`\>

Defined in: wallet-base/lib/wallet-base.d.ts:61

#### Parameters

##### address

`string`

##### ciphertext

`Buffer`

#### Returns

`Promise`\<`Buffer`\>

#### Implementation of

`ReadOnlyWallet.decrypt`

#### Inherited from

`WalletBase.decrypt`

***

### getAccounts()

> **getAccounts**(): `string`[]

Defined in: [wallet-remote/src/remote-wallet.ts:62](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-remote/src/remote-wallet.ts#L62)

Get a list of accounts in the remote wallet

#### Returns

`string`[]

#### Implementation of

`ReadOnlyWallet.getAccounts`

#### Overrides

`WalletBase.getAccounts`

***

### hasAccount()

> **hasAccount**(`address?`): `boolean`

Defined in: [wallet-remote/src/remote-wallet.ts:71](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-remote/src/remote-wallet.ts#L71)

Returns true if account is in the remote wallet

#### Parameters

##### address?

`string`

Account to check

#### Returns

`boolean`

#### Implementation of

`ReadOnlyWallet.hasAccount`

#### Overrides

`WalletBase.hasAccount`

***

### init()

> **init**(): `Promise`\<`void`\>

Defined in: [wallet-remote/src/remote-wallet.ts:21](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-remote/src/remote-wallet.ts#L21)

Discovers wallet accounts and caches results in memory
Idempotent to ensure multiple calls are benign

#### Returns

`Promise`\<`void`\>

***

### isSetupFinished()

> **isSetupFinished**(): `boolean`

Defined in: [wallet-remote/src/remote-wallet.ts:111](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-remote/src/remote-wallet.ts#L111)

#### Returns

`boolean`

***

### removeAccount()

> **removeAccount**(`_address`): `void`

Defined in: wallet-base/lib/wallet-base.d.ts:24

Removes the account with the given address. Needs to be implemented by subclass, otherwise throws error

#### Parameters

##### \_address

`string`

The address of the account to be removed

#### Returns

`void`

#### Implementation of

`ReadOnlyWallet.removeAccount`

#### Inherited from

`WalletBase.removeAccount`

***

### signPersonalMessage()

> **signPersonalMessage**(`address`, `data`): `Promise`\<`string`\>

Defined in: [wallet-remote/src/remote-wallet.ts:90](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-remote/src/remote-wallet.ts#L90)

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

#### Overrides

`WalletBase.signPersonalMessage`

***

### signTransaction()

> **signTransaction**(`txParams`): `Promise`\<`EncodedTransaction`\>

Defined in: [wallet-remote/src/remote-wallet.ts:80](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-remote/src/remote-wallet.ts#L80)

Signs the EVM transaction using the signer pulled from the from field

#### Parameters

##### txParams

`CeloTx`

EVM transaction

#### Returns

`Promise`\<`EncodedTransaction`\>

#### Implementation of

`ReadOnlyWallet.signTransaction`

#### Overrides

`WalletBase.signTransaction`

***

### signTypedData()

> **signTypedData**(`address`, `typedData`): `Promise`\<`string`\>

Defined in: [wallet-remote/src/remote-wallet.ts:100](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-remote/src/remote-wallet.ts#L100)

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

#### Overrides

`WalletBase.signTypedData`
