[@celo/utils](../README.md) / async

# Module: async

## Table of contents

### Functions

- [concurrentMap](async.md#concurrentmap)
- [concurrentValuesMap](async.md#concurrentvaluesmap)
- [retryAsync](async.md#retryasync)
- [retryAsyncWithBackOff](async.md#retryasyncwithbackoff)
- [selectiveRetryAsyncWithBackOff](async.md#selectiveretryasyncwithbackoff)
- [sleep](async.md#sleep)

## Functions

### concurrentMap

▸ **concurrentMap**\<`A`, `B`\>(`concurrency`, `xs`, `mapFn`): `Promise`\<`B`[]\>

Map an async function over a list xs with a given concurrency level

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `concurrency` | `number` | number of `mapFn` concurrent executions |
| `xs` | `A`[] | list of value |
| `mapFn` | (`val`: `A`, `idx`: `number`) => `Promise`\<`B`\> | mapping function |

#### Returns

`Promise`\<`B`[]\>

#### Defined in

packages/sdk/base/lib/async.d.ts:16

___

### concurrentValuesMap

▸ **concurrentValuesMap**\<`IN`, `OUT`\>(`concurrency`, `x`, `mapFn`): `Promise`\<`Record`\<`string`, `OUT`\>\>

Map an async function over the values in Object x with a given concurrency level

#### Type parameters

| Name | Type |
| :------ | :------ |
| `IN` | extends `unknown` |
| `OUT` | extends `unknown` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `concurrency` | `number` | number of `mapFn` concurrent executions |
| `x` | `Record`\<`string`, `IN`\> | associative array of values |
| `mapFn` | (`val`: `IN`, `key`: `string`) => `Promise`\<`OUT`\> | mapping function |

#### Returns

`Promise`\<`Record`\<`string`, `OUT`\>\>

#### Defined in

packages/sdk/base/lib/async.d.ts:24

___

### retryAsync

▸ **retryAsync**\<`T`, `U`\>(`inFunction`, `tries`, `params`, `delay?`, `logger?`): `Promise`\<`U`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `any`[] |
| `U` | `U` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `inFunction` | `InFunction`\<`T`, `U`\> |
| `tries` | `number` |
| `params` | `T` |
| `delay?` | `number` |
| `logger?` | ``null`` \| [`Logger`](logger.md#logger) |

#### Returns

`Promise`\<`U`\>

#### Defined in

packages/sdk/base/lib/async.d.ts:5

___

### retryAsyncWithBackOff

▸ **retryAsyncWithBackOff**\<`T`, `U`\>(`inFunction`, `tries`, `params`, `delay?`, `factor?`, `logger?`): `Promise`\<`U`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `any`[] |
| `U` | `U` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `inFunction` | `InFunction`\<`T`, `U`\> |
| `tries` | `number` |
| `params` | `T` |
| `delay?` | `number` |
| `factor?` | `number` |
| `logger?` | ``null`` \| [`Logger`](logger.md#logger) |

#### Returns

`Promise`\<`U`\>

#### Defined in

packages/sdk/base/lib/async.d.ts:6

___

### selectiveRetryAsyncWithBackOff

▸ **selectiveRetryAsyncWithBackOff**\<`T`, `U`\>(`inFunction`, `tries`, `dontRetry`, `params`, `delay?`, `factor?`, `logger?`): `Promise`\<`U`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `any`[] |
| `U` | `U` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `inFunction` | `InFunction`\<`T`, `U`\> |
| `tries` | `number` |
| `dontRetry` | `string`[] |
| `params` | `T` |
| `delay?` | `number` |
| `factor?` | `number` |
| `logger?` | ``null`` \| [`Logger`](logger.md#logger) |

#### Returns

`Promise`\<`U`\>

#### Defined in

packages/sdk/base/lib/async.d.ts:7

___

### sleep

▸ **sleep**(`ms`): `Promise`\<`void`\>

Sleep for a number of milliseconds

#### Parameters

| Name | Type |
| :------ | :------ |
| `ms` | `number` |

#### Returns

`Promise`\<`void`\>

#### Defined in

packages/sdk/base/lib/async.d.ts:3
