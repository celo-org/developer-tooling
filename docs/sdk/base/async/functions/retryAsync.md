[**@celo/base**](../../README.md)

***

[@celo/base](../../README.md) / [async](../README.md) / retryAsync

# Function: retryAsync()

> **retryAsync**\<`T`, `U`\>(`inFunction`, `tries`, `params`, `delay`, `logger`): `Promise`\<`U`\>

Defined in: [packages/sdk/base/src/async.ts:14](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/base/src/async.ts#L14)

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

### params

`T`

### delay

`number` = `100`

### logger

`null` | [`Logger`](../../logger/type-aliases/Logger.md)

## Returns

`Promise`\<`U`\>
