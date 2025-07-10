[**@celo/base v7.0.3**](../README.md)

***

[@celo/base](../README.md) / throwIfError

# Function: throwIfError()

> **throwIfError**\<`TResult`, `TError`, `TModifiedError`\>(`result`, `errorModifier?`): `TResult`

Defined in: [packages/sdk/base/src/result.ts:21](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/base/src/result.ts#L21)

## Type Parameters

### TResult

`TResult`

### TError

`TError` *extends* `Error`

### TModifiedError

`TModifiedError` *extends* `Error`

## Parameters

### result

[`Result`](../type-aliases/Result.md)\<`TResult`, `TError`\>

### errorModifier?

(`error`) => `TModifiedError`

## Returns

`TResult`
