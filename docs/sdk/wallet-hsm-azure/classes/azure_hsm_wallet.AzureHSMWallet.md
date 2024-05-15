[@celo/wallet-hsm-azure](../README.md) / [azure-hsm-wallet](../modules/azure_hsm_wallet.md) / AzureHSMWallet

# Class: AzureHSMWallet

[azure-hsm-wallet](../modules/azure_hsm_wallet.md).AzureHSMWallet

## Hierarchy

- `RemoteWallet`\<[`AzureHSMSigner`](azure_hsm_signer.AzureHSMSigner.md)\>

  ↳ **`AzureHSMWallet`**

## Implements

- `ReadOnlyWallet`

## Table of contents

### Constructors

- [constructor](azure_hsm_wallet.AzureHSMWallet.md#constructor)

### Properties

- [isSetupFinished](azure_hsm_wallet.AzureHSMWallet.md#issetupfinished)

### Methods

- [computeSharedSecret](azure_hsm_wallet.AzureHSMWallet.md#computesharedsecret)
- [decrypt](azure_hsm_wallet.AzureHSMWallet.md#decrypt)
- [getAccounts](azure_hsm_wallet.AzureHSMWallet.md#getaccounts)
- [getAddressFromKeyName](azure_hsm_wallet.AzureHSMWallet.md#getaddressfromkeyname)
- [hasAccount](azure_hsm_wallet.AzureHSMWallet.md#hasaccount)
- [init](azure_hsm_wallet.AzureHSMWallet.md#init)
- [removeAccount](azure_hsm_wallet.AzureHSMWallet.md#removeaccount)
- [signPersonalMessage](azure_hsm_wallet.AzureHSMWallet.md#signpersonalmessage)
- [signTransaction](azure_hsm_wallet.AzureHSMWallet.md#signtransaction)
- [signTypedData](azure_hsm_wallet.AzureHSMWallet.md#signtypeddata)

## Constructors

### constructor

• **new AzureHSMWallet**(`vaultName`): [`AzureHSMWallet`](azure_hsm_wallet.AzureHSMWallet.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `vaultName` | `string` |

#### Returns

[`AzureHSMWallet`](azure_hsm_wallet.AzureHSMWallet.md)

#### Overrides

RemoteWallet\&lt;AzureHSMSigner\&gt;.constructor

#### Defined in

[wallet-hsm-azure/src/azure-hsm-wallet.ts:14](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-hsm-azure/src/azure-hsm-wallet.ts#L14)

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

### getAddressFromKeyName

▸ **getAddressFromKeyName**(`keyName`): `Promise`\<`string`\>

Returns the EVM address for the given key
Useful for initially getting the 'from' field given a keyName

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `keyName` | `string` | Azure KeyVault key name |

#### Returns

`Promise`\<`string`\>

#### Defined in

[wallet-hsm-azure/src/azure-hsm-wallet.ts:50](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-hsm-azure/src/azure-hsm-wallet.ts#L50)

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
