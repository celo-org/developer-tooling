[**@celo/connect v7.0.0-beta.0**](../README.md)

***

[@celo/connect](../globals.md) / CeloTransactionObject

# Class: CeloTransactionObject\<O\>

Defined in: [packages/sdk/connect/src/utils/celo-transaction-object.ts:15](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/utils/celo-transaction-object.ts#L15)

## Type Parameters

### O

`O`

## Constructors

### Constructor

> **new CeloTransactionObject**\<`O`\>(`connection`, `txo`, `defaultParams?`): `CeloTransactionObject`\<`O`\>

Defined in: [packages/sdk/connect/src/utils/celo-transaction-object.ts:16](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/utils/celo-transaction-object.ts#L16)

#### Parameters

##### connection

[`Connection`](Connection.md)

##### txo

[`CeloTxObject`](../interfaces/CeloTxObject.md)\<`O`\>

##### defaultParams?

[`CeloTransactionParams`](../type-aliases/CeloTransactionParams.md)

#### Returns

`CeloTransactionObject`\<`O`\>

## Properties

### defaultParams?

> `readonly` `optional` **defaultParams**: [`CeloTransactionParams`](../type-aliases/CeloTransactionParams.md)

Defined in: [packages/sdk/connect/src/utils/celo-transaction-object.ts:19](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/utils/celo-transaction-object.ts#L19)

***

### txo

> `readonly` **txo**: [`CeloTxObject`](../interfaces/CeloTxObject.md)\<`O`\>

Defined in: [packages/sdk/connect/src/utils/celo-transaction-object.ts:18](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/utils/celo-transaction-object.ts#L18)

## Methods

### send()

> **send**(`params?`): `Promise`\<[`TransactionResult`](TransactionResult.md)\>

Defined in: [packages/sdk/connect/src/utils/celo-transaction-object.ts:23](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/utils/celo-transaction-object.ts#L23)

send the transaction to the chain

#### Parameters

##### params?

[`CeloTransactionParams`](../type-aliases/CeloTransactionParams.md)

#### Returns

`Promise`\<[`TransactionResult`](TransactionResult.md)\>

***

### sendAndWaitForReceipt()

> **sendAndWaitForReceipt**(`params?`): `Promise`\<[`CeloTxReceipt`](../type-aliases/CeloTxReceipt.md)\>

Defined in: [packages/sdk/connect/src/utils/celo-transaction-object.ts:28](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/utils/celo-transaction-object.ts#L28)

send the transaction and waits for the receipt

#### Parameters

##### params?

[`CeloTransactionParams`](../type-aliases/CeloTransactionParams.md)

#### Returns

`Promise`\<[`CeloTxReceipt`](../type-aliases/CeloTxReceipt.md)\>
