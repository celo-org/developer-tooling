[@celo/wallet-base](../README.md) / [wallet-base](../modules/wallet_base.md) / Wallet

# Interface: Wallet

[wallet-base](../modules/wallet_base.md).Wallet

## Hierarchy

- `ReadOnlyWallet`

  ↳ **`Wallet`**

  ↳↳ [`UnlockableWallet`](wallet_base.UnlockableWallet.md)

## Table of contents

### Properties

- [addAccount](wallet_base.Wallet.md#addaccount)
- [computeSharedSecret](wallet_base.Wallet.md#computesharedsecret)
- [decrypt](wallet_base.Wallet.md#decrypt)
- [getAccounts](wallet_base.Wallet.md#getaccounts)
- [hasAccount](wallet_base.Wallet.md#hasaccount)
- [removeAccount](wallet_base.Wallet.md#removeaccount)
- [signPersonalMessage](wallet_base.Wallet.md#signpersonalmessage)
- [signTransaction](wallet_base.Wallet.md#signtransaction)
- [signTypedData](wallet_base.Wallet.md#signtypeddata)

## Properties

### addAccount

• **addAccount**: `addInMemoryAccount` \| `addRemoteAccount`

#### Defined in

[wallets/wallet-base/src/wallet-base.ts:11](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-base/src/wallet-base.ts#L11)

___

### computeSharedSecret

• **computeSharedSecret**: (`address`: `string`, `publicKey`: `string`) => `Promise`\<`Buffer`\>

#### Type declaration

▸ (`address`, `publicKey`): `Promise`\<`Buffer`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |
| `publicKey` | `string` |

##### Returns

`Promise`\<`Buffer`\>

#### Inherited from

ReadOnlyWallet.computeSharedSecret

#### Defined in

connect/lib/wallet.d.ts:12

___

### decrypt

• **decrypt**: (`address`: `string`, `ciphertext`: `Buffer`) => `Promise`\<`Buffer`\>

#### Type declaration

▸ (`address`, `ciphertext`): `Promise`\<`Buffer`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |
| `ciphertext` | `Buffer` |

##### Returns

`Promise`\<`Buffer`\>

#### Inherited from

ReadOnlyWallet.decrypt

#### Defined in

connect/lib/wallet.d.ts:11

___

### getAccounts

• **getAccounts**: () => `string`[]

#### Type declaration

▸ (): `string`[]

##### Returns

`string`[]

#### Inherited from

ReadOnlyWallet.getAccounts

#### Defined in

connect/lib/wallet.d.ts:5

___

### hasAccount

• **hasAccount**: (`address?`: `string`) => `boolean`

#### Type declaration

▸ (`address?`): `boolean`

##### Parameters

| Name | Type |
| :------ | :------ |
| `address?` | `string` |

##### Returns

`boolean`

#### Inherited from

ReadOnlyWallet.hasAccount

#### Defined in

connect/lib/wallet.d.ts:7

___

### removeAccount

• **removeAccount**: (`address`: `string`) => `void`

#### Type declaration

▸ (`address`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |

##### Returns

`void`

#### Inherited from

ReadOnlyWallet.removeAccount

#### Defined in

connect/lib/wallet.d.ts:6

___

### signPersonalMessage

• **signPersonalMessage**: (`address`: `string`, `data`: `string`) => `Promise`\<`string`\>

#### Type declaration

▸ (`address`, `data`): `Promise`\<`string`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |
| `data` | `string` |

##### Returns

`Promise`\<`string`\>

#### Inherited from

ReadOnlyWallet.signPersonalMessage

#### Defined in

connect/lib/wallet.d.ts:10

___

### signTransaction

• **signTransaction**: (`txParams`: `CeloTx`) => `Promise`\<`EncodedTransaction`\>

#### Type declaration

▸ (`txParams`): `Promise`\<`EncodedTransaction`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `txParams` | `CeloTx` |

##### Returns

`Promise`\<`EncodedTransaction`\>

#### Inherited from

ReadOnlyWallet.signTransaction

#### Defined in

connect/lib/wallet.d.ts:8

___

### signTypedData

• **signTypedData**: (`address`: `string`, `typedData`: `EIP712TypedData`) => `Promise`\<`string`\>

#### Type declaration

▸ (`address`, `typedData`): `Promise`\<`string`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |
| `typedData` | `EIP712TypedData` |

##### Returns

`Promise`\<`string`\>

#### Inherited from

ReadOnlyWallet.signTypedData

#### Defined in

connect/lib/wallet.d.ts:9
