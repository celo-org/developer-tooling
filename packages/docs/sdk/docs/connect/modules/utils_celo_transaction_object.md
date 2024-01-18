[@celo/connect](../README.md) / [Exports](../modules.md) / utils/celo-transaction-object

# Module: utils/celo-transaction-object

## Table of contents

### Classes

- [CeloTransactionObject](../classes/utils_celo_transaction_object.CeloTransactionObject.md)

### Type Aliases

- [CeloTransactionParams](utils_celo_transaction_object.md#celotransactionparams)

### Functions

- [toTransactionObject](utils_celo_transaction_object.md#totransactionobject)

## Type Aliases

### CeloTransactionParams

Ƭ **CeloTransactionParams**: `Omit`\<[`CeloTx`](types.md#celotx), ``"data"``\>

#### Defined in

[packages/sdk/connect/src/utils/celo-transaction-object.ts:5](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/utils/celo-transaction-object.ts#L5)

## Functions

### toTransactionObject

▸ **toTransactionObject**\<`O`\>(`connection`, `txo`, `defaultParams?`): [`CeloTransactionObject`](../classes/utils_celo_transaction_object.CeloTransactionObject.md)\<`O`\>

#### Type parameters

| Name |
| :------ |
| `O` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `connection` | [`Connection`](../classes/connection.Connection.md) |
| `txo` | [`CeloTxObject`](../interfaces/types.CeloTxObject.md)\<`O`\> |
| `defaultParams?` | [`CeloTransactionParams`](utils_celo_transaction_object.md#celotransactionparams) |

#### Returns

[`CeloTransactionObject`](../classes/utils_celo_transaction_object.CeloTransactionObject.md)\<`O`\>

#### Defined in

[packages/sdk/connect/src/utils/celo-transaction-object.ts:7](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/utils/celo-transaction-object.ts#L7)
