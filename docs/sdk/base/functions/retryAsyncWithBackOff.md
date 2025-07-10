[**@celo/base v7.0.3**](../README.md)

***

[@celo/base](../README.md) / retryAsyncWithBackOff

# Function: retryAsyncWithBackOff()

> **retryAsyncWithBackOff**\<`T`, `U`\>(`inFunction`, `tries`, `params`, `delay`, `factor`, `logger`): `Promise`\<`U`\>

Defined in: [packages/sdk/base/src/async.ts:40](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/base/src/async.ts#L40)

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

### factor

`number` = `1.5`

### logger

`null` | [`Logger`](../type-aliases/Logger.md)

## Returns

`Promise`\<`U`\>
