[**@celo/contractkit**](../../README.md)

***

[@celo/contractkit](../../modules.md) / [address-registry](../README.md) / UnregisteredError

# Class: UnregisteredError

Defined in: [packages/sdk/contractkit/src/address-registry.ts:13](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/address-registry.ts#L13)

## Extends

- `Error`

## Constructors

### Constructor

> **new UnregisteredError**(`contract`): `UnregisteredError`

Defined in: [packages/sdk/contractkit/src/address-registry.ts:14](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/address-registry.ts#L14)

#### Parameters

##### contract

[`CeloContract`](../../base/enumerations/CeloContract.md)

#### Returns

`UnregisteredError`

#### Overrides

`Error.constructor`

## Properties

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
