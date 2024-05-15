[@celo/contractkit](../README.md) / [Exports](../modules.md) / [address-registry](../modules/address_registry.md) / UnregisteredError

# Class: UnregisteredError

[address-registry](../modules/address_registry.md).UnregisteredError

## Hierarchy

- `Error`

  ↳ **`UnregisteredError`**

## Table of contents

### Constructors

- [constructor](address_registry.UnregisteredError.md#constructor)

### Properties

- [message](address_registry.UnregisteredError.md#message)
- [name](address_registry.UnregisteredError.md#name)
- [stack](address_registry.UnregisteredError.md#stack)
- [prepareStackTrace](address_registry.UnregisteredError.md#preparestacktrace)
- [stackTraceLimit](address_registry.UnregisteredError.md#stacktracelimit)

### Methods

- [captureStackTrace](address_registry.UnregisteredError.md#capturestacktrace)

## Constructors

### constructor

• **new UnregisteredError**(`contract`): [`UnregisteredError`](address_registry.UnregisteredError.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `contract` | [`CeloContract`](../enums/base.CeloContract.md) |

#### Returns

[`UnregisteredError`](address_registry.UnregisteredError.md)

#### Overrides

Error.constructor

#### Defined in

[packages/sdk/contractkit/src/address-registry.ts:14](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/address-registry.ts#L14)

## Properties

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
