[@celo/wallet-local](../README.md) / [local-wallet](../modules/local_wallet.md) / LocalWallet

# Class: LocalWallet

[local-wallet](../modules/local_wallet.md).LocalWallet

## Hierarchy

- `WalletBase`\<[`LocalSigner`](local_signer.LocalSigner.md)\>

  ↳ **`LocalWallet`**

## Implements

- `Wallet`

## Table of contents

### Constructors

- [constructor](local_wallet.LocalWallet.md#constructor)

### Methods

- [addAccount](local_wallet.LocalWallet.md#addaccount)
- [computeSharedSecret](local_wallet.LocalWallet.md#computesharedsecret)
- [decrypt](local_wallet.LocalWallet.md#decrypt)
- [getAccounts](local_wallet.LocalWallet.md#getaccounts)
- [hasAccount](local_wallet.LocalWallet.md#hasaccount)
- [removeAccount](local_wallet.LocalWallet.md#removeaccount)
- [signPersonalMessage](local_wallet.LocalWallet.md#signpersonalmessage)
- [signTransaction](local_wallet.LocalWallet.md#signtransaction)
- [signTypedData](local_wallet.LocalWallet.md#signtypeddata)

## Constructors

### constructor

• **new LocalWallet**(): [`LocalWallet`](local_wallet.LocalWallet.md)

#### Returns

[`LocalWallet`](local_wallet.LocalWallet.md)

#### Inherited from

WalletBase\<LocalSigner\>.constructor

## Methods

### addAccount

▸ **addAccount**(`privateKey`): `void`

Register the private key as signer account

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `privateKey` | `string` | account private key |

#### Returns

`void`

#### Implementation of

Wallet.addAccount

#### Defined in

[wallet-local/src/local-wallet.ts:10](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-local/src/local-wallet.ts#L10)

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

Wallet.computeSharedSecret

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

Wallet.decrypt

#### Inherited from

WalletBase.decrypt

#### Defined in

wallet-base/lib/wallet-base.d.ts:60

___

### getAccounts

▸ **getAccounts**(): `string`[]

Gets a list of accounts that have been registered

#### Returns

`string`[]

#### Implementation of

Wallet.getAccounts

#### Inherited from

WalletBase.getAccounts

#### Defined in

wallet-base/lib/wallet-base.d.ts:18

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

Wallet.hasAccount

#### Inherited from

WalletBase.hasAccount

#### Defined in

wallet-base/lib/wallet-base.d.ts:28

___

### removeAccount

▸ **removeAccount**(`address`): `void`

Remove the account

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `address` | `string` | Adddress of the account to remove |

#### Returns

`void`

#### Implementation of

Wallet.removeAccount

#### Overrides

WalletBase.removeAccount

#### Defined in

[wallet-local/src/local-wallet.ts:24](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-local/src/local-wallet.ts#L24)

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

Wallet.signPersonalMessage

#### Inherited from

WalletBase.signPersonalMessage

#### Defined in

wallet-base/lib/wallet-base.d.ts:51

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

Wallet.signTransaction

#### Inherited from

WalletBase.signTransaction

#### Defined in

wallet-base/lib/wallet-base.d.ts:44

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

Wallet.signTypedData

#### Inherited from

WalletBase.signTypedData

#### Defined in

wallet-base/lib/wallet-base.d.ts:58
