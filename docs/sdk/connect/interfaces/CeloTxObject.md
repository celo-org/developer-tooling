[**@celo/connect v7.0.0**](../README.md)

***

[@celo/connect](../globals.md) / CeloTxObject

# Interface: CeloTxObject\<T\>

Defined in: [packages/sdk/connect/src/types.ts:43](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/types.ts#L43)

## Type Parameters

### T

`T`

## Properties

### \_parent

> **\_parent**: [`Contract`](../classes/Contract.md)

Defined in: [packages/sdk/connect/src/types.ts:49](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/types.ts#L49)

***

### arguments

> **arguments**: `any`[]

Defined in: [packages/sdk/connect/src/types.ts:44](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/types.ts#L44)

## Methods

### call()

> **call**(`tx?`): `Promise`\<`T`\>

Defined in: [packages/sdk/connect/src/types.ts:45](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/types.ts#L45)

#### Parameters

##### tx?

[`CeloTx`](../type-aliases/CeloTx.md)

#### Returns

`Promise`\<`T`\>

***

### encodeABI()

> **encodeABI**(): `string`

Defined in: [packages/sdk/connect/src/types.ts:48](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/types.ts#L48)

#### Returns

`string`

***

### estimateGas()

> **estimateGas**(`tx?`): `Promise`\<`number`\>

Defined in: [packages/sdk/connect/src/types.ts:47](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/types.ts#L47)

#### Parameters

##### tx?

[`CeloTx`](../type-aliases/CeloTx.md)

#### Returns

`Promise`\<`number`\>

***

### send()

> **send**(`tx?`): [`PromiEvent`](PromiEvent.md)\<[`CeloTxReceipt`](../type-aliases/CeloTxReceipt.md)\>

Defined in: [packages/sdk/connect/src/types.ts:46](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/types.ts#L46)

#### Parameters

##### tx?

[`CeloTx`](../type-aliases/CeloTx.md)

#### Returns

[`PromiEvent`](PromiEvent.md)\<[`CeloTxReceipt`](../type-aliases/CeloTxReceipt.md)\>
