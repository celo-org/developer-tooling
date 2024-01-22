[@celo/connect](../README.md) / [Exports](../modules.md) / [utils/celo-transaction-object](../modules/utils_celo_transaction_object.md) / CeloTransactionObject

# Class: CeloTransactionObject\<O\>

[utils/celo-transaction-object](../modules/utils_celo_transaction_object.md).CeloTransactionObject

## Type parameters

| Name |
| :------ |
| `O` |

## Table of contents

### Constructors

- [constructor](utils_celo_transaction_object.CeloTransactionObject.md#constructor)

### Properties

- [defaultParams](utils_celo_transaction_object.CeloTransactionObject.md#defaultparams)
- [txo](utils_celo_transaction_object.CeloTransactionObject.md#txo)

### Methods

- [send](utils_celo_transaction_object.CeloTransactionObject.md#send)
- [sendAndWaitForReceipt](utils_celo_transaction_object.CeloTransactionObject.md#sendandwaitforreceipt)

## Constructors

### constructor

• **new CeloTransactionObject**\<`O`\>(`connection`, `txo`, `defaultParams?`): [`CeloTransactionObject`](utils_celo_transaction_object.CeloTransactionObject.md)\<`O`\>

#### Type parameters

| Name |
| :------ |
| `O` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `connection` | [`Connection`](connection.Connection.md) |
| `txo` | [`CeloTxObject`](../interfaces/types.CeloTxObject.md)\<`O`\> |
| `defaultParams?` | [`CeloTransactionParams`](../modules/utils_celo_transaction_object.md#celotransactionparams) |

#### Returns

[`CeloTransactionObject`](utils_celo_transaction_object.CeloTransactionObject.md)\<`O`\>

#### Defined in

[packages/sdk/connect/src/utils/celo-transaction-object.ts:16](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/utils/celo-transaction-object.ts#L16)

## Properties

### defaultParams

• `Optional` `Readonly` **defaultParams**: [`CeloTransactionParams`](../modules/utils_celo_transaction_object.md#celotransactionparams)

#### Defined in

[packages/sdk/connect/src/utils/celo-transaction-object.ts:19](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/utils/celo-transaction-object.ts#L19)

___

### txo

• `Readonly` **txo**: [`CeloTxObject`](../interfaces/types.CeloTxObject.md)\<`O`\>

#### Defined in

[packages/sdk/connect/src/utils/celo-transaction-object.ts:18](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/utils/celo-transaction-object.ts#L18)

## Methods

### send

▸ **send**(`params?`): `Promise`\<[`TransactionResult`](utils_tx_result.TransactionResult.md)\>

send the transaction to the chain

#### Parameters

| Name | Type |
| :------ | :------ |
| `params?` | [`CeloTransactionParams`](../modules/utils_celo_transaction_object.md#celotransactionparams) |

#### Returns

`Promise`\<[`TransactionResult`](utils_tx_result.TransactionResult.md)\>

#### Defined in

[packages/sdk/connect/src/utils/celo-transaction-object.ts:23](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/utils/celo-transaction-object.ts#L23)

___

### sendAndWaitForReceipt

▸ **sendAndWaitForReceipt**(`params?`): `Promise`\<[`CeloTxReceipt`](../modules/types.md#celotxreceipt)\>

send the transaction and waits for the receipt

#### Parameters

| Name | Type |
| :------ | :------ |
| `params?` | [`CeloTransactionParams`](../modules/utils_celo_transaction_object.md#celotransactionparams) |

#### Returns

`Promise`\<[`CeloTxReceipt`](../modules/types.md#celotxreceipt)\>

#### Defined in

[packages/sdk/connect/src/utils/celo-transaction-object.ts:28](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/utils/celo-transaction-object.ts#L28)
