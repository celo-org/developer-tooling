[**@celo/base v7.0.3-beta.0**](../README.md)

***

[@celo/base](../README.md) / RootError

# Class: RootError\<T\>

Defined in: [packages/sdk/base/src/result.ts:67](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/base/src/result.ts#L67)

## Extends

- `Error`

## Extended by

- [`JSONParseError`](JSONParseError.md)

## Type Parameters

### T

`T`

## Implements

- [`BaseError`](../interfaces/BaseError.md)\<`T`\>

## Constructors

### Constructor

> **new RootError**\<`T`\>(`errorType`): `RootError`\<`T`\>

Defined in: [packages/sdk/base/src/result.ts:68](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/base/src/result.ts#L68)

#### Parameters

##### errorType

`T`

#### Returns

`RootError`\<`T`\>

#### Overrides

`Error.constructor`

## Properties

### errorType

> `readonly` **errorType**: `T`

Defined in: [packages/sdk/base/src/result.ts:68](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/base/src/result.ts#L68)

#### Implementation of

[`BaseError`](../interfaces/BaseError.md).[`errorType`](../interfaces/BaseError.md#errortype)

***

### message

> **message**: `string`

Defined in: node\_modules/typescript/lib/lib.es5.d.ts:1076

#### Inherited from

`Error.message`

***

### name

> **name**: `string`

Defined in: node\_modules/typescript/lib/lib.es5.d.ts:1075

#### Inherited from

`Error.name`

***

### stack?

> `optional` **stack**: `string`

Defined in: node\_modules/typescript/lib/lib.es5.d.ts:1077

#### Inherited from

`Error.stack`

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

`Error.prepareStackTrace`

***

### stackTraceLimit

> `static` **stackTraceLimit**: `number`

Defined in: node\_modules/@types/node/globals.d.ts:13

#### Inherited from

`Error.stackTraceLimit`

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

`Error.captureStackTrace`
