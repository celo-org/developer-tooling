[@celo/base](../README.md) / async

# Module: async

## Table of contents

### Functions

- [concurrentMap](async.md#concurrentmap)
- [concurrentValuesMap](async.md#concurrentvaluesmap)
- [retryAsync](async.md#retryasync)
- [retryAsyncWithBackOff](async.md#retryasyncwithbackoff)
- [retryAsyncWithBackOffAndTimeout](async.md#retryasyncwithbackoffandtimeout)
- [selectiveRetryAsyncWithBackOff](async.md#selectiveretryasyncwithbackoff)
- [sleep](async.md#sleep)
- [timeout](async.md#timeout)

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

[packages/sdk/base/src/async.ts:128](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/base/src/async.ts#L128)

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

[packages/sdk/base/src/async.ts:150](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/base/src/async.ts#L150)

___

### retryAsync

▸ **retryAsync**\<`T`, `U`\>(`inFunction`, `tries`, `params`, `delay?`, `logger?`): `Promise`\<`U`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `any`[] |
| `U` | `U` |

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `inFunction` | `InFunction`\<`T`, `U`\> | `undefined` |
| `tries` | `number` | `undefined` |
| `params` | `T` | `undefined` |
| `delay` | `number` | `100` |
| `logger` | ``null`` \| [`Logger`](logger.md#logger) | `null` |

#### Returns

`Promise`\<`U`\>

#### Defined in

[packages/sdk/base/src/async.ts:14](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/base/src/async.ts#L14)

___

### retryAsyncWithBackOff

▸ **retryAsyncWithBackOff**\<`T`, `U`\>(`inFunction`, `tries`, `params`, `delay?`, `factor?`, `logger?`): `Promise`\<`U`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `any`[] |
| `U` | `U` |

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `inFunction` | `InFunction`\<`T`, `U`\> | `undefined` |
| `tries` | `number` | `undefined` |
| `params` | `T` | `undefined` |
| `delay` | `number` | `100` |
| `factor` | `number` | `1.5` |
| `logger` | ``null`` \| [`Logger`](logger.md#logger) | `null` |

#### Returns

`Promise`\<`U`\>

#### Defined in

[packages/sdk/base/src/async.ts:40](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/base/src/async.ts#L40)

___

### retryAsyncWithBackOffAndTimeout

▸ **retryAsyncWithBackOffAndTimeout**\<`T`, `U`\>(`inFunction`, `tries`, `params`, `delayMs?`, `factor?`, `timeoutMs?`, `logger?`): `Promise`\<`U`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `any`[] |
| `U` | `U` |

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `inFunction` | `InFunction`\<`T`, `U`\> | `undefined` |
| `tries` | `number` | `undefined` |
| `params` | `T` | `undefined` |
| `delayMs` | `number` | `100` |
| `factor` | `number` | `1.5` |
| `timeoutMs` | `number` | `2000` |
| `logger` | ``null`` \| [`Logger`](logger.md#logger) | `null` |

#### Returns

`Promise`\<`U`\>

#### Defined in

[packages/sdk/base/src/async.ts:102](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/base/src/async.ts#L102)

___

### selectiveRetryAsyncWithBackOff

▸ **selectiveRetryAsyncWithBackOff**\<`T`, `U`\>(`inFunction`, `tries`, `dontRetry`, `params`, `delay?`, `factor?`, `logger?`): `Promise`\<`U`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `any`[] |
| `U` | `U` |

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `inFunction` | `InFunction`\<`T`, `U`\> | `undefined` |
| `tries` | `number` | `undefined` |
| `dontRetry` | `string`[] | `undefined` |
| `params` | `T` | `undefined` |
| `delay` | `number` | `100` |
| `factor` | `number` | `1.5` |
| `logger` | ``null`` \| [`Logger`](logger.md#logger) | `null` |

#### Returns

`Promise`\<`U`\>

#### Defined in

[packages/sdk/base/src/async.ts:68](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/base/src/async.ts#L68)

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

[packages/sdk/base/src/async.ts:6](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/base/src/async.ts#L6)

___

### timeout

▸ **timeout**\<`T`, `U`\>(`inFunction`, `params`, `timeoutMs`, `timeoutError`, `timeoutLogMsg?`, `logger?`): `Promise`\<`Awaited`\<`U`\>\>

Wraps an async function in a timeout before calling it.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `any`[] |
| `U` | `U` |

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `inFunction` | `InFunction`\<`T`, `U`\> | `undefined` | The async function to call |
| `params` | `T` | `undefined` | The parameters of the async function |
| `timeoutMs` | `number` | `undefined` | The timeout in milliseconds |
| `timeoutError` | `any` | `undefined` | The value to which the returned Promise should reject to |
| `timeoutLogMsg` | ``null`` \| `string` | `null` | - |
| `logger` | ``null`` \| [`Logger`](logger.md#logger) | `null` | - |

#### Returns

`Promise`\<`Awaited`\<`U`\>\>

#### Defined in

[packages/sdk/base/src/async.ts:173](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/base/src/async.ts#L173)
