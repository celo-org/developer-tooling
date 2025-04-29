[**@celo/utils**](../../README.md)

***

[@celo/utils](../../README.md) / [async](../README.md) / concurrentValuesMap

# Function: concurrentValuesMap()

> **concurrentValuesMap**\<`IN`, `OUT`\>(`concurrency`, `x`, `mapFn`): `Promise`\<`Record`\<`string`, `OUT`\>\>

Defined in: packages/sdk/base/lib/async.d.ts:24

Map an async function over the values in Object x with a given concurrency level

## Type Parameters

### IN

`IN` *extends* `unknown`

### OUT

`OUT` *extends* `unknown`

## Parameters

### concurrency

`number`

number of `mapFn` concurrent executions

### x

`Record`\<`string`, `IN`\>

associative array of values

### mapFn

(`val`, `key`) => `Promise`\<`OUT`\>

mapping function

## Returns

`Promise`\<`Record`\<`string`, `OUT`\>\>
