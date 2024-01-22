[@celo/base](../README.md) / [result](../modules/result.md) / JSONParseError

# Class: JSONParseError

[result](../modules/result.md).JSONParseError

## Hierarchy

- [`RootError`](result.RootError.md)\<`string`\>

  ↳ **`JSONParseError`**

## Table of contents

### Constructors

- [constructor](result.JSONParseError.md#constructor)

### Properties

- [error](result.JSONParseError.md#error)
- [errorType](result.JSONParseError.md#errortype)
- [message](result.JSONParseError.md#message)
- [name](result.JSONParseError.md#name)
- [stack](result.JSONParseError.md#stack)
- [prepareStackTrace](result.JSONParseError.md#preparestacktrace)
- [stackTraceLimit](result.JSONParseError.md#stacktracelimit)

### Methods

- [captureStackTrace](result.JSONParseError.md#capturestacktrace)

## Constructors

### constructor

• **new JSONParseError**(`error`): [`JSONParseError`](result.JSONParseError.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `error` | `Error` |

#### Returns

[`JSONParseError`](result.JSONParseError.md)

#### Overrides

[RootError](result.RootError.md).[constructor](result.RootError.md#constructor)

#### Defined in

[packages/sdk/base/src/result.ts:80](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/base/src/result.ts#L80)

## Properties

### error

• `Readonly` **error**: `Error`

#### Defined in

[packages/sdk/base/src/result.ts:80](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/base/src/result.ts#L80)

___

### errorType

• `Readonly` **errorType**: `string`

#### Inherited from

[RootError](result.RootError.md).[errorType](result.RootError.md#errortype)

#### Defined in

[packages/sdk/base/src/result.ts:68](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/base/src/result.ts#L68)

___

### message

• **message**: `string`

#### Inherited from

[RootError](result.RootError.md).[message](result.RootError.md#message)

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1076

___

### name

• **name**: `string`

#### Inherited from

[RootError](result.RootError.md).[name](result.RootError.md#name)

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1075

___

### stack

• `Optional` **stack**: `string`

#### Inherited from

[RootError](result.RootError.md).[stack](result.RootError.md#stack)

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

[RootError](result.RootError.md).[prepareStackTrace](result.RootError.md#preparestacktrace)

#### Defined in

node_modules/@types/node/globals.d.ts:11

___

### stackTraceLimit

▪ `Static` **stackTraceLimit**: `number`

#### Inherited from

[RootError](result.RootError.md).[stackTraceLimit](result.RootError.md#stacktracelimit)

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

[RootError](result.RootError.md).[captureStackTrace](result.RootError.md#capturestacktrace)

#### Defined in

node_modules/@types/node/globals.d.ts:4
