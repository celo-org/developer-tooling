[**@celo/base v7.0.3**](../README.md)

***

[@celo/base](../README.md) / selectiveRetryAsyncWithBackOff

# Function: selectiveRetryAsyncWithBackOff()

> **selectiveRetryAsyncWithBackOff**\<`T`, `U`\>(`inFunction`, `tries`, `dontRetry`, `params`, `delay`, `factor`, `logger`): `Promise`\<`U`\>

Defined in: [packages/sdk/base/src/async.ts:68](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/base/src/async.ts#L68)

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

### delay

`number` = `100`

### factor

`number` = `1.5`

### logger

`null` | [`Logger`](../type-aliases/Logger.md)

## Returns

`Promise`\<`U`\>
