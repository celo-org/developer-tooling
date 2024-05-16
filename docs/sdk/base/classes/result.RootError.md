[@celo/base](../README.md) / [result](../modules/result.md) / RootError

# Class: RootError\<T\>

[result](../modules/result.md).RootError

## Type parameters

| Name |
| :------ |
| `T` |

## Hierarchy

- `Error`

  ↳ **`RootError`**

  ↳↳ [`JSONParseError`](result.JSONParseError.md)

## Implements

- [`BaseError`](../interfaces/result.BaseError.md)\<`T`\>

## Table of contents

### Constructors

- [constructor](result.RootError.md#constructor)

### Properties

- [errorType](result.RootError.md#errortype)
- [message](result.RootError.md#message)
- [name](result.RootError.md#name)
- [stack](result.RootError.md#stack)
- [prepareStackTrace](result.RootError.md#preparestacktrace)
- [stackTraceLimit](result.RootError.md#stacktracelimit)

### Methods

- [captureStackTrace](result.RootError.md#capturestacktrace)

## Constructors

### constructor

• **new RootError**\<`T`\>(`errorType`): [`RootError`](result.RootError.md)\<`T`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `errorType` | `T` |

#### Returns

[`RootError`](result.RootError.md)\<`T`\>

#### Overrides

Error.constructor

#### Defined in

[packages/sdk/base/src/result.ts:68](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/base/src/result.ts#L68)

## Properties

### errorType

• `Readonly` **errorType**: `T`

#### Implementation of

[BaseError](../interfaces/result.BaseError.md).[errorType](../interfaces/result.BaseError.md#errortype)

#### Defined in

[packages/sdk/base/src/result.ts:68](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/base/src/result.ts#L68)

___

### message

• **message**: `string`

#### Inherited from

Error.message

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1076

___

### name

• **name**: `string`

#### Inherited from

Error.name

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1075

___

### stack

• `Optional` **stack**: `string`

#### Inherited from

Error.stack

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1077

___

### prepareStackTrace

▪ `Static` `Optional` **prepareStackTrace**: (`err`: `Error`, `stackTraces`: `CallSite`[]) => `any`

Optional override for formatting stack traces

**`See`**

https://v8.dev/docs/stack-trace-api#customizing-stack-traces

#### Type declaration

▸ (`err`, `stackTraces`): `any`

Optional override for formatting stack traces

##### Parameters

| Name | Type |
| :------ | :------ |
| `err` | `Error` |
| `stackTraces` | `CallSite`[] |

##### Returns

`any`

**`See`**

https://v8.dev/docs/stack-trace-api#customizing-stack-traces

#### Inherited from

Error.prepareStackTrace

#### Defined in

node_modules/@types/node/globals.d.ts:11

___

### stackTraceLimit

▪ `Static` **stackTraceLimit**: `number`

#### Inherited from

Error.stackTraceLimit

#### Defined in

node_modules/@types/node/globals.d.ts:13

## Methods

### captureStackTrace

▸ **captureStackTrace**(`targetObject`, `constructorOpt?`): `void`

Create .stack property on a target object

#### Parameters

| Name | Type |
| :------ | :------ |
| `targetObject` | `object` |
| `constructorOpt?` | `Function` |

#### Returns

`void`

#### Inherited from

Error.captureStackTrace

#### Defined in

node_modules/@types/node/globals.d.ts:4
