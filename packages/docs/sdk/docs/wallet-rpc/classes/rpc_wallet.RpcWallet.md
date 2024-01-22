[@celo/wallet-rpc](../README.md) / [rpc-wallet](../modules/rpc_wallet.md) / RpcWallet

# Class: RpcWallet

[rpc-wallet](../modules/rpc_wallet.md).RpcWallet

## Hierarchy

- `RemoteWallet`\<[`RpcSigner`](rpc_signer.RpcSigner.md)\>

  ↳ **`RpcWallet`**

## Implements

- `UnlockableWallet`

## Table of contents

### Constructors

- [constructor](rpc_wallet.RpcWallet.md#constructor)

### Properties

- [isSetupFinished](rpc_wallet.RpcWallet.md#issetupfinished)

### Methods

- [addAccount](rpc_wallet.RpcWallet.md#addaccount)
- [computeSharedSecret](rpc_wallet.RpcWallet.md#computesharedsecret)
- [decrypt](rpc_wallet.RpcWallet.md#decrypt)
- [getAccounts](rpc_wallet.RpcWallet.md#getaccounts)
- [hasAccount](rpc_wallet.RpcWallet.md#hasaccount)
- [init](rpc_wallet.RpcWallet.md#init)
- [isAccountUnlocked](rpc_wallet.RpcWallet.md#isaccountunlocked)
- [loadAccountSigners](rpc_wallet.RpcWallet.md#loadaccountsigners)
- [removeAccount](rpc_wallet.RpcWallet.md#removeaccount)
- [signPersonalMessage](rpc_wallet.RpcWallet.md#signpersonalmessage)
- [signTransaction](rpc_wallet.RpcWallet.md#signtransaction)
- [signTypedData](rpc_wallet.RpcWallet.md#signtypeddata)
- [unlockAccount](rpc_wallet.RpcWallet.md#unlockaccount)

## Constructors

### constructor

• **new RpcWallet**(`_provider`): [`RpcWallet`](rpc_wallet.RpcWallet.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `_provider` | `Provider` |

#### Returns

[`RpcWallet`](rpc_wallet.RpcWallet.md)

#### Overrides

RemoteWallet\&lt;RpcSigner\&gt;.constructor

#### Defined in

[packages/sdk/wallets/wallet-rpc/src/rpc-wallet.ts:20](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-rpc/src/rpc-wallet.ts#L20)

## Properties

### isSetupFinished

• **isSetupFinished**: () => `boolean`

#### Type declaration

▸ (): `boolean`

##### Returns

`boolean`

#### Inherited from

RemoteWallet.isSetupFinished

#### Defined in

packages/sdk/wallets/wallet-remote/lib/remote-wallet.d.ts:51

## Methods

### addAccount

▸ **addAccount**(`privateKey`, `passphrase`): `Promise`\<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `privateKey` | `string` |
| `passphrase` | `string` |

#### Returns

`Promise`\<`string`\>

#### Implementation of

UnlockableWallet.addAccount

#### Defined in

[packages/sdk/wallets/wallet-rpc/src/rpc-wallet.ts:38](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-rpc/src/rpc-wallet.ts#L38)

___

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

UnlockableWallet.computeSharedSecret

#### Inherited from

RemoteWallet.computeSharedSecret

#### Defined in

packages/sdk/wallets/wallet-base/lib/wallet-base.d.ts:64

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

UnlockableWallet.decrypt

#### Inherited from

RemoteWallet.decrypt

#### Defined in

packages/sdk/wallets/wallet-base/lib/wallet-base.d.ts:60

___

### getAccounts

▸ **getAccounts**(): `string`[]

Get a list of accounts in the remote wallet

#### Returns

`string`[]

#### Implementation of

UnlockableWallet.getAccounts

#### Inherited from

RemoteWallet.getAccounts

#### Defined in

packages/sdk/wallets/wallet-remote/lib/remote-wallet.d.ts:27

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

UnlockableWallet.hasAccount

#### Inherited from

RemoteWallet.hasAccount

#### Defined in

packages/sdk/wallets/wallet-remote/lib/remote-wallet.d.ts:32

___

### init

▸ **init**(): `Promise`\<`void`\>

Discovers wallet accounts and caches results in memory
Idempotent to ensure multiple calls are benign

#### Returns

`Promise`\<`void`\>

#### Inherited from

RemoteWallet.init

#### Defined in

packages/sdk/wallets/wallet-remote/lib/remote-wallet.d.ts:15

___

### isAccountUnlocked

▸ **isAccountUnlocked**(`address`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |

#### Returns

`boolean`

#### Implementation of

UnlockableWallet.isAccountUnlocked

#### Defined in

[packages/sdk/wallets/wallet-rpc/src/rpc-wallet.ts:54](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-rpc/src/rpc-wallet.ts#L54)

___

### loadAccountSigners

▸ **loadAccountSigners**(): `Promise`\<`Map`\<`string`, [`RpcSigner`](rpc_signer.RpcSigner.md)\>\>

#### Returns

`Promise`\<`Map`\<`string`, [`RpcSigner`](rpc_signer.RpcSigner.md)\>\>

#### Overrides

RemoteWallet.loadAccountSigners

#### Defined in

[packages/sdk/wallets/wallet-rpc/src/rpc-wallet.ts:25](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-rpc/src/rpc-wallet.ts#L25)

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

UnlockableWallet.removeAccount

#### Inherited from

RemoteWallet.removeAccount

#### Defined in

packages/sdk/wallets/wallet-base/lib/wallet-base.d.ts:23

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

UnlockableWallet.signPersonalMessage

#### Inherited from

RemoteWallet.signPersonalMessage

#### Defined in

packages/sdk/wallets/wallet-remote/lib/remote-wallet.d.ts:43

___

### signTransaction

▸ **signTransaction**(`txParams`): `Promise`\<`EncodedTransaction`\>

Gets the signer based on the 'from' field in the tx body

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `txParams` | `CeloTx` | Transaction to sign |

#### Returns

`Promise`\<`EncodedTransaction`\>

**`Dev`**

overrides WalletBase.signTransaction

#### Implementation of

UnlockableWallet.signTransaction

#### Overrides

RemoteWallet.signTransaction

#### Defined in

[packages/sdk/wallets/wallet-rpc/src/rpc-wallet.ts:64](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-rpc/src/rpc-wallet.ts#L64)

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

UnlockableWallet.signTypedData

#### Inherited from

RemoteWallet.signTypedData

#### Defined in

packages/sdk/wallets/wallet-remote/lib/remote-wallet.d.ts:49

___

### unlockAccount

▸ **unlockAccount**(`address`, `passphrase`, `duration`): `Promise`\<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |
| `passphrase` | `string` |
| `duration` | `number` |

#### Returns

`Promise`\<`boolean`\>

#### Implementation of

UnlockableWallet.unlockAccount

#### Defined in

[packages/sdk/wallets/wallet-rpc/src/rpc-wallet.ts:49](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-rpc/src/rpc-wallet.ts#L49)
