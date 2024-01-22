[@celo/wallet-hsm-gcp](../README.md) / [gcp-hsm-wallet](../modules/gcp_hsm_wallet.md) / GcpHsmWallet

# Class: GcpHsmWallet

[gcp-hsm-wallet](../modules/gcp_hsm_wallet.md).GcpHsmWallet

A Cloud HSM wallet built on GCP.

## Hierarchy

- `RemoteWallet`\<[`GcpHsmSigner`](gcp_hsm_signer.GcpHsmSigner.md)\>

  ↳ **`GcpHsmWallet`**

## Implements

- `ReadOnlyWallet`

## Table of contents

### Constructors

- [constructor](gcp_hsm_wallet.GcpHsmWallet.md#constructor)

### Properties

- [isSetupFinished](gcp_hsm_wallet.GcpHsmWallet.md#issetupfinished)

### Methods

- [computeSharedSecret](gcp_hsm_wallet.GcpHsmWallet.md#computesharedsecret)
- [decrypt](gcp_hsm_wallet.GcpHsmWallet.md#decrypt)
- [getAccounts](gcp_hsm_wallet.GcpHsmWallet.md#getaccounts)
- [getAddressFromVersionName](gcp_hsm_wallet.GcpHsmWallet.md#getaddressfromversionname)
- [hasAccount](gcp_hsm_wallet.GcpHsmWallet.md#hasaccount)
- [init](gcp_hsm_wallet.GcpHsmWallet.md#init)
- [removeAccount](gcp_hsm_wallet.GcpHsmWallet.md#removeaccount)
- [signPersonalMessage](gcp_hsm_wallet.GcpHsmWallet.md#signpersonalmessage)
- [signTransaction](gcp_hsm_wallet.GcpHsmWallet.md#signtransaction)
- [signTypedData](gcp_hsm_wallet.GcpHsmWallet.md#signtypeddata)

## Constructors

### constructor

• **new GcpHsmWallet**(`versionName`): [`GcpHsmWallet`](gcp_hsm_wallet.GcpHsmWallet.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `versionName` | `string` |

#### Returns

[`GcpHsmWallet`](gcp_hsm_wallet.GcpHsmWallet.md)

#### Overrides

RemoteWallet\&lt;GcpHsmSigner\&gt;.constructor

#### Defined in

[wallet-hsm-gcp/src/gcp-hsm-wallet.ts:21](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-hsm-gcp/src/gcp-hsm-wallet.ts#L21)

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

wallet-remote/lib/remote-wallet.d.ts:51

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

RemoteWallet.computeSharedSecret

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

RemoteWallet.decrypt

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

#### Inherited from

RemoteWallet.getAccounts

#### Defined in

wallet-remote/lib/remote-wallet.d.ts:27

___

### getAddressFromVersionName

▸ **getAddressFromVersionName**(`versionName`): `Promise`\<`string`\>

Returns the EVM address for the given key
Useful for initially getting the 'from' field given a keyName

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `versionName` | `string` | GCP version name for the HSM |

#### Returns

`Promise`\<`string`\>

#### Defined in

[wallet-hsm-gcp/src/gcp-hsm-wallet.ts:78](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-hsm-gcp/src/gcp-hsm-wallet.ts#L78)

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

#### Inherited from

RemoteWallet.hasAccount

#### Defined in

wallet-remote/lib/remote-wallet.d.ts:32

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

wallet-remote/lib/remote-wallet.d.ts:15

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

RemoteWallet.removeAccount

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

#### Inherited from

RemoteWallet.signPersonalMessage

#### Defined in

wallet-remote/lib/remote-wallet.d.ts:43

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

#### Inherited from

RemoteWallet.signTransaction

#### Defined in

wallet-remote/lib/remote-wallet.d.ts:37

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

#### Inherited from

RemoteWallet.signTypedData

#### Defined in

wallet-remote/lib/remote-wallet.d.ts:49
