[@celo/wallet-base](../README.md) / [wallet-base](../modules/wallet_base.md) / UnlockableWallet

# Interface: UnlockableWallet

[wallet-base](../modules/wallet_base.md).UnlockableWallet

## Hierarchy

- [`Wallet`](wallet_base.Wallet.md)

  ↳ **`UnlockableWallet`**

## Table of contents

### Properties

- [addAccount](wallet_base.UnlockableWallet.md#addaccount)
- [computeSharedSecret](wallet_base.UnlockableWallet.md#computesharedsecret)
- [decrypt](wallet_base.UnlockableWallet.md#decrypt)
- [getAccounts](wallet_base.UnlockableWallet.md#getaccounts)
- [hasAccount](wallet_base.UnlockableWallet.md#hasaccount)
- [isAccountUnlocked](wallet_base.UnlockableWallet.md#isaccountunlocked)
- [removeAccount](wallet_base.UnlockableWallet.md#removeaccount)
- [signPersonalMessage](wallet_base.UnlockableWallet.md#signpersonalmessage)
- [signTransaction](wallet_base.UnlockableWallet.md#signtransaction)
- [signTypedData](wallet_base.UnlockableWallet.md#signtypeddata)
- [unlockAccount](wallet_base.UnlockableWallet.md#unlockaccount)

## Properties

### addAccount

• **addAccount**: `addInMemoryAccount` \| `addRemoteAccount`

#### Inherited from

[Wallet](wallet_base.Wallet.md).[addAccount](wallet_base.Wallet.md#addaccount)

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

[Wallet](wallet_base.Wallet.md).[computeSharedSecret](wallet_base.Wallet.md#computesharedsecret)

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

[Wallet](wallet_base.Wallet.md).[decrypt](wallet_base.Wallet.md#decrypt)

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

[Wallet](wallet_base.Wallet.md).[getAccounts](wallet_base.Wallet.md#getaccounts)

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

[Wallet](wallet_base.Wallet.md).[hasAccount](wallet_base.Wallet.md#hasaccount)

#### Defined in

connect/lib/wallet.d.ts:7

___

### isAccountUnlocked

• **isAccountUnlocked**: (`address`: `string`) => `boolean`

#### Type declaration

▸ (`address`): `boolean`

##### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |

##### Returns

`boolean`

#### Defined in

[wallets/wallet-base/src/wallet-base.ts:16](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-base/src/wallet-base.ts#L16)

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

[Wallet](wallet_base.Wallet.md).[removeAccount](wallet_base.Wallet.md#removeaccount)

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

[Wallet](wallet_base.Wallet.md).[signPersonalMessage](wallet_base.Wallet.md#signpersonalmessage)

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

[Wallet](wallet_base.Wallet.md).[signTransaction](wallet_base.Wallet.md#signtransaction)

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

[Wallet](wallet_base.Wallet.md).[signTypedData](wallet_base.Wallet.md#signtypeddata)

#### Defined in

connect/lib/wallet.d.ts:9

___

### unlockAccount

• **unlockAccount**: (`address`: `string`, `passphrase`: `string`, `duration`: `number`) => `Promise`\<`boolean`\>

#### Type declaration

▸ (`address`, `passphrase`, `duration`): `Promise`\<`boolean`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |
| `passphrase` | `string` |
| `duration` | `number` |

##### Returns

`Promise`\<`boolean`\>

#### Defined in

[wallets/wallet-base/src/wallet-base.ts:15](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-base/src/wallet-base.ts#L15)
