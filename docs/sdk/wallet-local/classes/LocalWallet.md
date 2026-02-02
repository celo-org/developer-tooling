[**@celo/wallet-local v8.0.3**](../README.md)

***

[@celo/wallet-local](../README.md) / LocalWallet

# Class: LocalWallet

Defined in: [wallet-local/src/local-wallet.ts:5](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-local/src/local-wallet.ts#L5)

## Extends

- `WalletBase`\<[`LocalSigner`](LocalSigner.md)\>

## Implements

- `Wallet`

## Constructors

### Constructor

> **new LocalWallet**(): `LocalWallet`

#### Returns

`LocalWallet`

#### Inherited from

`WalletBase<LocalSigner>.constructor`

## Methods

### addAccount()

> **addAccount**(`privateKey`): `void`

Defined in: [wallet-local/src/local-wallet.ts:10](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-local/src/local-wallet.ts#L10)

Register the private key as signer account

#### Parameters

##### privateKey

`string`

account private key

#### Returns

`void`

#### Implementation of

`Wallet.addAccount`

***

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

`Wallet.computeSharedSecret`

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

`Wallet.decrypt`

#### Inherited from

`WalletBase.decrypt`

***

### getAccounts()

> **getAccounts**(): `string`[]

Defined in: wallet-base/lib/wallet-base.d.ts:19

Gets a list of accounts that have been registered

#### Returns

`string`[]

#### Implementation of

`Wallet.getAccounts`

#### Inherited from

`WalletBase.getAccounts`

***

### hasAccount()

> **hasAccount**(`address?`): `boolean`

Defined in: wallet-base/lib/wallet-base.d.ts:29

Returns true if account has been registered

#### Parameters

##### address?

`string`

Account to check

#### Returns

`boolean`

#### Implementation of

`Wallet.hasAccount`

#### Inherited from

`WalletBase.hasAccount`

***

### removeAccount()

> **removeAccount**(`address`): `void`

Defined in: [wallet-local/src/local-wallet.ts:24](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-local/src/local-wallet.ts#L24)

Remove the account

#### Parameters

##### address

`string`

Adddress of the account to remove

#### Returns

`void`

#### Implementation of

`Wallet.removeAccount`

#### Overrides

`WalletBase.removeAccount`

***

### signPersonalMessage()

> **signPersonalMessage**(`address`, `data`): `Promise`\<`string`\>

Defined in: wallet-base/lib/wallet-base.d.ts:52

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

`Wallet.signPersonalMessage`

#### Inherited from

`WalletBase.signPersonalMessage`

***

### signTransaction()

> **signTransaction**(`txParams`): `Promise`\<`EncodedTransaction`\>

Defined in: wallet-base/lib/wallet-base.d.ts:45

Gets the signer based on the 'from' field in the tx body

#### Parameters

##### txParams

`CeloTx`

Transaction to sign

#### Returns

`Promise`\<`EncodedTransaction`\>

#### Implementation of

`Wallet.signTransaction`

#### Inherited from

`WalletBase.signTransaction`

***

### signTypedData()

> **signTypedData**(`address`, `typedData`): `Promise`\<`string`\>

Defined in: wallet-base/lib/wallet-base.d.ts:59

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

`Wallet.signTypedData`

#### Inherited from

`WalletBase.signTypedData`
