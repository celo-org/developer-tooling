[**@celo/utils**](../../README.md)

***

[@celo/utils](../../README.md) / [async](../README.md) / concurrentMap

# Function: concurrentMap()

> **concurrentMap**\<`A`, `B`\>(`concurrency`, `xs`, `mapFn`): `Promise`\<`B`[]\>

Defined in: packages/sdk/base/lib/async.d.ts:16

Map an async function over a list xs with a given concurrency level

## Type Parameters

### A

`A`

### B

`B`

## Parameters

### concurrency

`number`

number of `mapFn` concurrent executions

### xs

`A`[]

list of value

### mapFn

(`val`, `idx`) => `Promise`\<`B`\>

mapping function

## Returns

`Promise`\<`B`[]\>
