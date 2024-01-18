[@celo/base](../README.md) / result

# Module: result

## Table of contents

### Classes

- [JSONParseError](../classes/result.JSONParseError.md)
- [RootError](../classes/result.RootError.md)

### Interfaces

- [BaseError](../interfaces/result.BaseError.md)
- [ErrorResult](../interfaces/result.ErrorResult.md)
- [OkResult](../interfaces/result.OkResult.md)

### Type Aliases

- [Result](result.md#result)

### Variables

- [JSONParseErrorType](result.md#jsonparseerrortype)

### Functions

- [Err](result.md#err)
- [Ok](result.md#ok)
- [isErr](result.md#iserr)
- [isOk](result.md#isok)
- [makeAsyncThrowable](result.md#makeasyncthrowable)
- [makeThrowable](result.md#makethrowable)
- [parseJsonAsResult](result.md#parsejsonasresult)
- [throwIfError](result.md#throwiferror)

## Type Aliases

### Result

Ƭ **Result**\<`TResult`, `TError`\>: [`OkResult`](../interfaces/result.OkResult.md)\<`TResult`\> \| [`ErrorResult`](../interfaces/result.ErrorResult.md)\<`TError`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TResult` | `TResult` |
| `TError` | extends `Error` |

#### Defined in

[packages/sdk/base/src/result.ts:11](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/base/src/result.ts#L11)

## Variables

### JSONParseErrorType

• `Const` **JSONParseErrorType**: ``"JsonParseError"``

#### Defined in

[packages/sdk/base/src/result.ts:78](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/base/src/result.ts#L78)

## Functions

### Err

▸ **Err**\<`TError`\>(`error`): [`ErrorResult`](../interfaces/result.ErrorResult.md)\<`TError`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TError` | extends `Error` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `error` | `TError` |

#### Returns

[`ErrorResult`](../interfaces/result.ErrorResult.md)\<`TError`\>

#### Defined in

[packages/sdk/base/src/result.ts:17](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/base/src/result.ts#L17)

___

### Ok

▸ **Ok**\<`TResult`\>(`result`): [`OkResult`](../interfaces/result.OkResult.md)\<`TResult`\>

#### Type parameters

| Name |
| :------ |
| `TResult` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `result` | `TResult` |

#### Returns

[`OkResult`](../interfaces/result.OkResult.md)\<`TResult`\>

#### Defined in

[packages/sdk/base/src/result.ts:13](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/base/src/result.ts#L13)

___

### isErr

▸ **isErr**\<`TResult`, `TError`\>(`result`): result is ErrorResult\<TError\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TResult` | `TResult` |
| `TError` | extends `Error` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `result` | [`Result`](result.md#result)\<`TResult`, `TError`\> |

#### Returns

result is ErrorResult\<TError\>

#### Defined in

[packages/sdk/base/src/result.ts:98](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/base/src/result.ts#L98)

___

### isOk

▸ **isOk**\<`TResult`, `TError`\>(`result`): result is OkResult\<TResult\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TResult` | `TResult` |
| `TError` | extends `Error` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `result` | [`Result`](result.md#result)\<`TResult`, `TError`\> |

#### Returns

result is OkResult\<TResult\>

#### Defined in

[packages/sdk/base/src/result.ts:92](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/base/src/result.ts#L92)

___

### makeAsyncThrowable

▸ **makeAsyncThrowable**\<`TArgs`, `TResult`, `TError`, `TModifiedError`\>(`f`, `errorModifier?`): (...`args`: `TArgs`) => `Promise`\<`TResult`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TArgs` | extends `any`[] |
| `TResult` | `TResult` |
| `TError` | extends `Error` |
| `TModifiedError` | extends `Error` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `f` | (...`args`: `TArgs`) => `Promise`\<[`Result`](result.md#result)\<`TResult`, `TError`\>\> |
| `errorModifier?` | (`error`: `TError`) => `TModifiedError` |

#### Returns

`fn`

▸ (`...args`): `Promise`\<`TResult`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `TArgs` |

##### Returns

`Promise`\<`TResult`\>

#### Defined in

[packages/sdk/base/src/result.ts:48](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/base/src/result.ts#L48)

___

### makeThrowable

▸ **makeThrowable**\<`TArgs`, `TResult`, `TError`, `TModifiedError`\>(`f`, `errorModifier?`): (...`args`: `TArgs`) => `TResult`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TArgs` | extends `any`[] |
| `TResult` | `TResult` |
| `TError` | extends `Error` |
| `TModifiedError` | extends `Error` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `f` | (...`args`: `TArgs`) => [`Result`](result.md#result)\<`TResult`, `TError`\> |
| `errorModifier?` | (`error`: `TError`) => `TModifiedError` |

#### Returns

`fn`

▸ (`...args`): `TResult`

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `TArgs` |

##### Returns

`TResult`

#### Defined in

[packages/sdk/base/src/result.ts:36](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/base/src/result.ts#L36)

___

### parseJsonAsResult

▸ **parseJsonAsResult**(`data`): [`OkResult`](../interfaces/result.OkResult.md)\<`any`\> \| [`ErrorResult`](../interfaces/result.ErrorResult.md)\<[`JSONParseError`](../classes/result.JSONParseError.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `string` |

#### Returns

[`OkResult`](../interfaces/result.OkResult.md)\<`any`\> \| [`ErrorResult`](../interfaces/result.ErrorResult.md)\<[`JSONParseError`](../classes/result.JSONParseError.md)\>

#### Defined in

[packages/sdk/base/src/result.ts:84](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/base/src/result.ts#L84)

___

### throwIfError

▸ **throwIfError**\<`TResult`, `TError`, `TModifiedError`\>(`result`, `errorModifier?`): `TResult`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TResult` | `TResult` |
| `TError` | extends `Error` |
| `TModifiedError` | extends `Error` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `result` | [`Result`](result.md#result)\<`TResult`, `TError`\> |
| `errorModifier?` | (`error`: `TError`) => `TModifiedError` |

#### Returns

`TResult`

#### Defined in

[packages/sdk/base/src/result.ts:22](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/base/src/result.ts#L22)
