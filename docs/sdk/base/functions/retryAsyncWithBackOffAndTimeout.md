[**@celo/base v7.0.4**](../README.md)

***

[@celo/base](../README.md) / retryAsyncWithBackOffAndTimeout

# Function: retryAsyncWithBackOffAndTimeout()

> **retryAsyncWithBackOffAndTimeout**\<`T`, `U`\>(`inFunction`, `tries`, `params`, `delayMs`, `factor`, `timeoutMs`, `logger`): `Promise`\<`U`\>

Defined in: [packages/sdk/base/src/async.ts:102](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/base/src/async.ts#L102)

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

### delayMs

`number` = `100`

### factor

`number` = `1.5`

### timeoutMs

`number` = `2000`

### logger

`null` | [`Logger`](../type-aliases/Logger.md)

## Returns

`Promise`\<`U`\>
