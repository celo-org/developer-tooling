[**@celo/base v7.0.3-beta.0**](../README.md)

***

[@celo/base](../README.md) / makeAsyncThrowable

# Function: makeAsyncThrowable()

> **makeAsyncThrowable**\<`TArgs`, `TResult`, `TError`, `TModifiedError`\>(`f`, `errorModifier?`): (...`args`) => `Promise`\<`TResult`\>

Defined in: [packages/sdk/base/src/result.ts:47](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/base/src/result.ts#L47)

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

(...`args`) => `Promise`\<[`Result`](../type-aliases/Result.md)\<`TResult`, `TError`\>\>

### errorModifier?

(`error`) => `TModifiedError`

## Returns

> (...`args`): `Promise`\<`TResult`\>

### Parameters

#### args

...`TArgs`

### Returns

`Promise`\<`TResult`\>
