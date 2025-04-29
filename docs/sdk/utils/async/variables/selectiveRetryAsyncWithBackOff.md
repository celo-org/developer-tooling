[**@celo/utils**](../../README.md)

***

[@celo/utils](../../README.md) / [async](../README.md) / selectiveRetryAsyncWithBackOff

# Variable: selectiveRetryAsyncWithBackOff()

> `const` **selectiveRetryAsyncWithBackOff**: \<`T`, `U`\>(`inFunction`, `tries`, `dontRetry`, `params`, `delay?`, `factor?`, `logger?`) => `Promise`\<`U`\>

Defined in: packages/sdk/base/lib/async.d.ts:7

## Type Parameters

### T

`T` *extends* `any`[]

### U

`U`

## Parameters

### inFunction

`InFunction`\<`T`, `U`\>

### tries

`number`

### dontRetry

`string`[]

### params

`T`

### delay?

`number`

### factor?

`number`

### logger?

[`Logger`](../../logger/type-aliases/Logger.md) | `null`

## Returns

`Promise`\<`U`\>
