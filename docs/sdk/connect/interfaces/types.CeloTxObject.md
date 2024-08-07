[@celo/connect](../README.md) / [Exports](../modules.md) / [types](../modules/types.md) / CeloTxObject

# Interface: CeloTxObject\<T\>

[types](../modules/types.md).CeloTxObject

## Type parameters

| Name |
| :------ |
| `T` |

## Table of contents

### Properties

- [\_parent](types.CeloTxObject.md#_parent)
- [arguments](types.CeloTxObject.md#arguments)

### Methods

- [call](types.CeloTxObject.md#call)
- [encodeABI](types.CeloTxObject.md#encodeabi)
- [estimateGas](types.CeloTxObject.md#estimategas)
- [send](types.CeloTxObject.md#send)

## Properties

### \_parent

• **\_parent**: [`Contract`](../classes/index.Contract.md)

#### Defined in

[packages/sdk/connect/src/types.ts:49](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/types.ts#L49)

___

### arguments

• **arguments**: `any`[]

#### Defined in

[packages/sdk/connect/src/types.ts:44](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/types.ts#L44)

## Methods

### call

▸ **call**(`tx?`): `Promise`\<`T`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `tx?` | [`CeloTx`](../modules/types.md#celotx) |

#### Returns

`Promise`\<`T`\>

#### Defined in

[packages/sdk/connect/src/types.ts:45](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/types.ts#L45)

___

### encodeABI

▸ **encodeABI**(): `string`

#### Returns

`string`

#### Defined in

[packages/sdk/connect/src/types.ts:48](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/types.ts#L48)

___

### estimateGas

▸ **estimateGas**(`tx?`): `Promise`\<`number`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `tx?` | [`CeloTx`](../modules/types.md#celotx) |

#### Returns

`Promise`\<`number`\>

#### Defined in

[packages/sdk/connect/src/types.ts:47](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/types.ts#L47)

___

### send

▸ **send**(`tx?`): [`PromiEvent`](index.PromiEvent.md)\<[`CeloTxReceipt`](../modules/types.md#celotxreceipt)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `tx?` | [`CeloTx`](../modules/types.md#celotx) |

#### Returns

[`PromiEvent`](index.PromiEvent.md)\<[`CeloTxReceipt`](../modules/types.md#celotxreceipt)\>

#### Defined in

[packages/sdk/connect/src/types.ts:46](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/types.ts#L46)
