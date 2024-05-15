[@celo/connect](../README.md) / [Exports](../modules.md) / [wallet](../modules/wallet.md) / ReadOnlyWallet

# Interface: ReadOnlyWallet

[wallet](../modules/wallet.md).ReadOnlyWallet

## Table of contents

### Properties

- [computeSharedSecret](wallet.ReadOnlyWallet.md#computesharedsecret)
- [decrypt](wallet.ReadOnlyWallet.md#decrypt)
- [getAccounts](wallet.ReadOnlyWallet.md#getaccounts)
- [hasAccount](wallet.ReadOnlyWallet.md#hasaccount)
- [removeAccount](wallet.ReadOnlyWallet.md#removeaccount)
- [signPersonalMessage](wallet.ReadOnlyWallet.md#signpersonalmessage)
- [signTransaction](wallet.ReadOnlyWallet.md#signtransaction)
- [signTypedData](wallet.ReadOnlyWallet.md#signtypeddata)

## Properties

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

#### Defined in

[packages/sdk/connect/src/wallet.ts:12](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/wallet.ts#L12)

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

#### Defined in

[packages/sdk/connect/src/wallet.ts:11](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/wallet.ts#L11)

___

### getAccounts

• **getAccounts**: () => `string`[]

#### Type declaration

▸ (): `string`[]

##### Returns

`string`[]

#### Defined in

[packages/sdk/connect/src/wallet.ts:5](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/wallet.ts#L5)

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

#### Defined in

[packages/sdk/connect/src/wallet.ts:7](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/wallet.ts#L7)

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

#### Defined in

[packages/sdk/connect/src/wallet.ts:6](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/wallet.ts#L6)

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

#### Defined in

[packages/sdk/connect/src/wallet.ts:10](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/wallet.ts#L10)

___

### signTransaction

• **signTransaction**: (`txParams`: [`CeloTx`](../modules/types.md#celotx)) => `Promise`\<[`EncodedTransaction`](types.EncodedTransaction.md)\>

#### Type declaration

▸ (`txParams`): `Promise`\<[`EncodedTransaction`](types.EncodedTransaction.md)\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `txParams` | [`CeloTx`](../modules/types.md#celotx) |

##### Returns

`Promise`\<[`EncodedTransaction`](types.EncodedTransaction.md)\>

#### Defined in

[packages/sdk/connect/src/wallet.ts:8](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/wallet.ts#L8)

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

#### Defined in

[packages/sdk/connect/src/wallet.ts:9](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/wallet.ts#L9)
