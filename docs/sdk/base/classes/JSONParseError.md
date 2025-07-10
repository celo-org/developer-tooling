[**@celo/base v7.0.3**](../README.md)

***

[@celo/base](../README.md) / JSONParseError

# Class: JSONParseError

Defined in: [packages/sdk/base/src/result.ts:78](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/base/src/result.ts#L78)

## Extends

- [`RootError`](RootError.md)\<`string`\>

## Constructors

### Constructor

> **new JSONParseError**(`error`): `JSONParseError`

Defined in: [packages/sdk/base/src/result.ts:79](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/base/src/result.ts#L79)

#### Parameters

##### error

`Error`

#### Returns

`JSONParseError`

#### Overrides

[`RootError`](RootError.md).[`constructor`](RootError.md#constructor)

## Properties

### error

> `readonly` **error**: `Error`

Defined in: [packages/sdk/base/src/result.ts:79](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/base/src/result.ts#L79)

***

### errorType

> `readonly` **errorType**: `string`

Defined in: [packages/sdk/base/src/result.ts:67](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/base/src/result.ts#L67)

#### Inherited from

[`RootError`](RootError.md).[`errorType`](RootError.md#errortype)

***

### message

> **message**: `string`

Defined in: node\_modules/typescript/lib/lib.es5.d.ts:1076

#### Inherited from

[`RootError`](RootError.md).[`message`](RootError.md#message)

***

### name

> **name**: `string`

Defined in: node\_modules/typescript/lib/lib.es5.d.ts:1075

#### Inherited from

[`RootError`](RootError.md).[`name`](RootError.md#name)

***

### stack?

> `optional` **stack**: `string`

Defined in: node\_modules/typescript/lib/lib.es5.d.ts:1077

#### Inherited from

[`RootError`](RootError.md).[`stack`](RootError.md#stack)

***

### prepareStackTrace()?

> `static` `optional` **prepareStackTrace**: (`err`, `stackTraces`) => `any`

Defined in: node\_modules/@types/node/globals.d.ts:11

Optional override for formatting stack traces

#### Parameters

##### err

`Error`

##### stackTraces

`CallSite`[]

#### Returns

`any`

#### See

https://v8.dev/docs/stack-trace-api#customizing-stack-traces

#### Inherited from

[`RootError`](RootError.md).[`prepareStackTrace`](RootError.md#preparestacktrace)

***

### stackTraceLimit

> `static` **stackTraceLimit**: `number`

Defined in: node\_modules/@types/node/globals.d.ts:13

#### Inherited from

[`RootError`](RootError.md).[`stackTraceLimit`](RootError.md#stacktracelimit)

## Methods

### captureStackTrace()

> `static` **captureStackTrace**(`targetObject`, `constructorOpt?`): `void`

Defined in: node\_modules/@types/node/globals.d.ts:4

Create .stack property on a target object

#### Parameters

##### targetObject

`object`

##### constructorOpt?

`Function`

#### Returns

`void`

#### Inherited from

[`RootError`](RootError.md).[`captureStackTrace`](RootError.md#capturestacktrace)
