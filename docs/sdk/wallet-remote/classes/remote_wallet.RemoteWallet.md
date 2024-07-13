[@celo/wallet-remote](../README.md) / [remote-wallet](../modules/remote_wallet.md) / RemoteWallet

# Class: RemoteWallet\<TSigner\>

[remote-wallet](../modules/remote_wallet.md).RemoteWallet

Abstract class representing a remote wallet that requires async initialization

## Type parameters

| Name | Type |
| :------ | :------ |
| `TSigner` | extends `Signer` |

## Hierarchy

- `WalletBase`\<`TSigner`\>

  ↳ **`RemoteWallet`**

## Implements

- `ReadOnlyWallet`

## Table of contents

### Constructors

- [constructor](remote_wallet.RemoteWallet.md#constructor)

### Methods

- [computeSharedSecret](remote_wallet.RemoteWallet.md#computesharedsecret)
- [decrypt](remote_wallet.RemoteWallet.md#decrypt)
- [getAccounts](remote_wallet.RemoteWallet.md#getaccounts)
- [hasAccount](remote_wallet.RemoteWallet.md#hasaccount)
- [init](remote_wallet.RemoteWallet.md#init)
- [isSetupFinished](remote_wallet.RemoteWallet.md#issetupfinished)
- [removeAccount](remote_wallet.RemoteWallet.md#removeaccount)
- [signPersonalMessage](remote_wallet.RemoteWallet.md#signpersonalmessage)
- [signTransaction](remote_wallet.RemoteWallet.md#signtransaction)
- [signTypedData](remote_wallet.RemoteWallet.md#signtypeddata)

## Constructors

### constructor

• **new RemoteWallet**\<`TSigner`\>(): [`RemoteWallet`](remote_wallet.RemoteWallet.md)\<`TSigner`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TSigner` | extends `Signer` |

#### Returns

[`RemoteWallet`](remote_wallet.RemoteWallet.md)\<`TSigner`\>

#### Inherited from

WalletBase\<TSigner\>.constructor

## Methods

### computeSharedSecret

▸ **computeSharedSecret**(`address`, `publicKey`): `Promise`\<`Buffer`\>

Computes the shared secret (an ECDH key exchange object) between two accounts

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |
| `publicKey` | `string` |

#### Returns

`Promise`\<`Buffer`\>

#### Implementation of

ReadOnlyWallet.computeSharedSecret

#### Inherited from

WalletBase.computeSharedSecret

#### Defined in

wallet-base/lib/wallet-base.d.ts:64

___

### decrypt

▸ **decrypt**(`address`, `ciphertext`): `Promise`\<`Buffer`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |
| `ciphertext` | `Buffer` |

#### Returns

`Promise`\<`Buffer`\>

#### Implementation of

ReadOnlyWallet.decrypt

#### Inherited from

WalletBase.decrypt

#### Defined in

wallet-base/lib/wallet-base.d.ts:60

___

### getAccounts

▸ **getAccounts**(): `string`[]

Get a list of accounts in the remote wallet

#### Returns

`string`[]

#### Implementation of

ReadOnlyWallet.getAccounts

#### Overrides

WalletBase.getAccounts

#### Defined in

[wallet-remote/src/remote-wallet.ts:62](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-remote/src/remote-wallet.ts#L62)

___

### hasAccount

▸ **hasAccount**(`address?`): `boolean`

Returns true if account is in the remote wallet

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `address?` | `string` | Account to check |

#### Returns

`boolean`

#### Implementation of

ReadOnlyWallet.hasAccount

#### Overrides

WalletBase.hasAccount

#### Defined in

[wallet-remote/src/remote-wallet.ts:71](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-remote/src/remote-wallet.ts#L71)

___

### init

▸ **init**(): `Promise`\<`void`\>

Discovers wallet accounts and caches results in memory
Idempotent to ensure multiple calls are benign

#### Returns

`Promise`\<`void`\>

#### Defined in

[wallet-remote/src/remote-wallet.ts:21](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-remote/src/remote-wallet.ts#L21)

___

### isSetupFinished

▸ **isSetupFinished**(): `boolean`

#### Returns

`boolean`

#### Defined in

[wallet-remote/src/remote-wallet.ts:111](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-remote/src/remote-wallet.ts#L111)

___

### removeAccount

▸ **removeAccount**(`_address`): `void`

Removes the account with the given address. Needs to be implemented by subclass, otherwise throws error

#### Parameters

| Name | Type |
| :------ | :------ |
| `_address` | `string` |

#### Returns

`void`

#### Implementation of

ReadOnlyWallet.removeAccount

#### Inherited from

WalletBase.removeAccount

#### Defined in

wallet-base/lib/wallet-base.d.ts:23

___

### signPersonalMessage

▸ **signPersonalMessage**(`address`, `data`): `Promise`\<`string`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `address` | `string` | Address of the account to sign with |
| `data` | `string` | Hex string message to sign |

#### Returns

`Promise`\<`string`\>

Signature hex string (order: rsv)

#### Implementation of

ReadOnlyWallet.signPersonalMessage

#### Overrides

WalletBase.signPersonalMessage

#### Defined in

[wallet-remote/src/remote-wallet.ts:90](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-remote/src/remote-wallet.ts#L90)

___

### signTransaction

▸ **signTransaction**(`txParams`): `Promise`\<`EncodedTransaction`\>

Signs the EVM transaction using the signer pulled from the from field

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `txParams` | `CeloTx` | EVM transaction |

#### Returns

`Promise`\<`EncodedTransaction`\>

#### Implementation of

ReadOnlyWallet.signTransaction

#### Overrides

WalletBase.signTransaction

#### Defined in

[wallet-remote/src/remote-wallet.ts:80](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-remote/src/remote-wallet.ts#L80)

___

### signTypedData

▸ **signTypedData**(`address`, `typedData`): `Promise`\<`string`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `address` | `string` | Address of the account to sign with |
| `typedData` | `EIP712TypedData` | the typed data object |

#### Returns

`Promise`\<`string`\>

Signature hex string (order: rsv)

#### Implementation of

ReadOnlyWallet.signTypedData

#### Overrides

WalletBase.signTypedData

#### Defined in

[wallet-remote/src/remote-wallet.ts:100](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-remote/src/remote-wallet.ts#L100)
