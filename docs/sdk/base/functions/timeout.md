[**@celo/base v7.0.4**](../README.md)

***

[@celo/base](../README.md) / timeout

# Function: timeout()

> **timeout**\<`T`, `U`\>(`inFunction`, `params`, `timeoutMs`, `timeoutError`, `timeoutLogMsg`, `logger`): `Promise`\<`Awaited`\<`U`\>\>

Defined in: [packages/sdk/base/src/async.ts:173](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/base/src/async.ts#L173)

Wraps an async function in a timeout before calling it.

## Type Parameters

### T

`T` *extends* `any`[]

### U

`U`

## Parameters

### inFunction

`InFunction`\<`T`, `U`\>

The async function to call

### params

`T`

The parameters of the async function

### timeoutMs

`number`

The timeout in milliseconds

### timeoutError

`any`

The value to which the returned Promise should reject to

### timeoutLogMsg

`null` | `string`

### logger

`null` | [`Logger`](../type-aliases/Logger.md)

## Returns

`Promise`\<`Awaited`\<`U`\>\>
