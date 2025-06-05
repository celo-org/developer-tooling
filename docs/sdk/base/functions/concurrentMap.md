[**@celo/base v7.0.3-beta.0**](../README.md)

***

[@celo/base](../README.md) / concurrentMap

# Function: concurrentMap()

> **concurrentMap**\<`A`, `B`\>(`concurrency`, `xs`, `mapFn`): `Promise`\<`B`[]\>

Defined in: [packages/sdk/base/src/async.ts:128](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/base/src/async.ts#L128)

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
