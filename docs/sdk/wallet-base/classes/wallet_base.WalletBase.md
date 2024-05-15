[@celo/wallet-base](../README.md) / [wallet-base](../modules/wallet_base.md) / WalletBase

# Class: WalletBase\<TSigner\>

[wallet-base](../modules/wallet_base.md).WalletBase

## Type parameters

| Name | Type |
| :------ | :------ |
| `TSigner` | extends `Signer` |

## Implements

- `ReadOnlyWallet`

## Table of contents

### Constructors

- [constructor](wallet_base.WalletBase.md#constructor)

### Methods

- [computeSharedSecret](wallet_base.WalletBase.md#computesharedsecret)
- [decrypt](wallet_base.WalletBase.md#decrypt)
- [getAccounts](wallet_base.WalletBase.md#getaccounts)
- [hasAccount](wallet_base.WalletBase.md#hasaccount)
- [removeAccount](wallet_base.WalletBase.md#removeaccount)
- [signPersonalMessage](wallet_base.WalletBase.md#signpersonalmessage)
- [signTransaction](wallet_base.WalletBase.md#signtransaction)
- [signTypedData](wallet_base.WalletBase.md#signtypeddata)

## Constructors

### constructor

• **new WalletBase**\<`TSigner`\>(): [`WalletBase`](wallet_base.WalletBase.md)\<`TSigner`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TSigner` | extends `Signer` |

#### Returns

[`WalletBase`](wallet_base.WalletBase.md)\<`TSigner`\>

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

#### Defined in

[wallets/wallet-base/src/wallet-base.ts:143](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-base/src/wallet-base.ts#L143)

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

#### Defined in

[wallets/wallet-base/src/wallet-base.ts:135](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-base/src/wallet-base.ts#L135)

___

### getAccounts

▸ **getAccounts**(): `string`[]

Gets a list of accounts that have been registered

#### Returns

`string`[]

#### Implementation of

ReadOnlyWallet.getAccounts

#### Defined in

[wallets/wallet-base/src/wallet-base.ts:27](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-base/src/wallet-base.ts#L27)

___

### hasAccount

▸ **hasAccount**(`address?`): `boolean`

Returns true if account has been registered

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `address?` | `string` | Account to check |

#### Returns

`boolean`

#### Implementation of

ReadOnlyWallet.hasAccount

#### Defined in

[wallets/wallet-base/src/wallet-base.ts:43](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-base/src/wallet-base.ts#L43)

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

#### Defined in

[wallets/wallet-base/src/wallet-base.ts:35](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-base/src/wallet-base.ts#L35)

___

### signPersonalMessage

▸ **signPersonalMessage**(`address`, `data`): `Promise`\<`string`\>

Sign a personal Ethereum signed message.

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

#### Defined in

[wallets/wallet-base/src/wallet-base.ts:99](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-base/src/wallet-base.ts#L99)

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

#### Implementation of

ReadOnlyWallet.signTransaction

#### Defined in

[wallets/wallet-base/src/wallet-base.ts:75](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-base/src/wallet-base.ts#L75)

___

### signTypedData

▸ **signTypedData**(`address`, `typedData`): `Promise`\<`string`\>

Sign an EIP712 Typed Data message.

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

#### Defined in

[wallets/wallet-base/src/wallet-base.ts:116](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-base/src/wallet-base.ts#L116)
