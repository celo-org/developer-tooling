[**@celo/base**](../../README.md)

***

[@celo/base](../../README.md) / [result](../README.md) / makeThrowable

# Function: makeThrowable()

> **makeThrowable**\<`TArgs`, `TResult`, `TError`, `TModifiedError`\>(`f`, `errorModifier?`): (...`args`) => `TResult`

Defined in: [packages/sdk/base/src/result.ts:36](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/base/src/result.ts#L36)

## Type Parameters

### TArgs

`TArgs` *extends* `any`[]

### TResult

`TResult`

### TError

`TError` *extends* `Error`

### TModifiedError

`TModifiedError` *extends* `Error`

## Parameters

### f

(...`args`) => [`Result`](../type-aliases/Result.md)\<`TResult`, `TError`\>

### errorModifier?

(`error`) => `TModifiedError`

## Returns

> (...`args`): `TResult`

### Parameters

#### args

...`TArgs`

### Returns

`TResult`
