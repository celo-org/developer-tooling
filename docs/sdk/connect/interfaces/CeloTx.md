[**@celo/connect v8.0.0**](../README.md)

***

[@celo/connect](../globals.md) / CeloTx

# Interface: CeloTx

Defined in: [packages/sdk/connect/src/types.ts:41](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/types.ts#L41)

Transaction configuration

## Extends

- `Partial`\<[`CeloParams`](CeloParams.md)\>

## Properties

### accessList?

> `optional` **accessList**: [`AccessList`](../type-aliases/AccessList.md)

Defined in: [packages/sdk/connect/src/types.ts:55](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/types.ts#L55)

***

### chain?

> `optional` **chain**: `string`

Defined in: [packages/sdk/connect/src/types.ts:52](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/types.ts#L52)

***

### chainId?

> `optional` **chainId**: `number`

Defined in: [packages/sdk/connect/src/types.ts:51](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/types.ts#L51)

***

### common?

> `optional` **common**: `Record`\<`string`, `unknown`\>

Defined in: [packages/sdk/connect/src/types.ts:54](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/types.ts#L54)

***

### data?

> `optional` **data**: `string`

Defined in: [packages/sdk/connect/src/types.ts:49](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/types.ts#L49)

***

### feeCurrency?

> `optional` **feeCurrency**: `` `0x${string}` ``

Defined in: [packages/sdk/connect/src/types.ts:7](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/types.ts#L7)

#### Inherited from

`Partial.feeCurrency`

***

### from?

> `optional` **from**: `string`

Defined in: [packages/sdk/connect/src/types.ts:42](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/types.ts#L42)

***

### gas?

> `optional` **gas**: `string` \| `number` \| `bigint`

Defined in: [packages/sdk/connect/src/types.ts:45](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/types.ts#L45)

***

### gasPrice?

> `optional` **gasPrice**: `string` \| `number` \| `bigint`

Defined in: [packages/sdk/connect/src/types.ts:46](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/types.ts#L46)

***

### hardfork?

> `optional` **hardfork**: `string`

Defined in: [packages/sdk/connect/src/types.ts:53](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/types.ts#L53)

***

### maxFeeInFeeCurrency?

> `optional` **maxFeeInFeeCurrency**: `string` \| `bigint`

Defined in: [packages/sdk/connect/src/types.ts:8](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/types.ts#L8)

#### Inherited from

`Partial.maxFeeInFeeCurrency`

***

### maxFeePerGas?

> `optional` **maxFeePerGas**: `string` \| `number` \| `bigint`

Defined in: [packages/sdk/connect/src/types.ts:47](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/types.ts#L47)

***

### maxPriorityFeePerGas?

> `optional` **maxPriorityFeePerGas**: `string` \| `number` \| `bigint`

Defined in: [packages/sdk/connect/src/types.ts:48](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/types.ts#L48)

***

### nonce?

> `optional` **nonce**: `number`

Defined in: [packages/sdk/connect/src/types.ts:50](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/types.ts#L50)

***

### to?

> `optional` **to**: `string`

Defined in: [packages/sdk/connect/src/types.ts:43](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/types.ts#L43)

***

### type?

> `optional` **type**: [`TransactionTypes`](../type-aliases/TransactionTypes.md)

Defined in: [packages/sdk/connect/src/types.ts:56](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/types.ts#L56)

***

### value?

> `optional` **value**: `string` \| `number` \| `bigint`

Defined in: [packages/sdk/connect/src/types.ts:44](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/types.ts#L44)
