[@celo/utils](../README.md) / [future](../modules/future.md) / Future

# Class: Future\<T\>

[future](../modules/future.md).Future

## Type parameters

| Name |
| :------ |
| `T` |

## Table of contents

### Constructors

- [constructor](future.Future.md#constructor)

### Accessors

- [error](future.Future.md#error)
- [finished](future.Future.md#finished)

### Methods

- [asPromise](future.Future.md#aspromise)
- [reject](future.Future.md#reject)
- [resolve](future.Future.md#resolve)
- [wait](future.Future.md#wait)

## Constructors

### constructor

• **new Future**\<`T`\>(): [`Future`](future.Future.md)\<`T`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Returns

[`Future`](future.Future.md)\<`T`\>

#### Defined in

packages/sdk/base/lib/future.d.ts:8

## Accessors

### error

• `get` **error**(): `any`

#### Returns

`any`

#### Defined in

packages/sdk/base/lib/future.d.ts:10

___

### finished

• `get` **finished**(): `boolean`

#### Returns

`boolean`

#### Defined in

packages/sdk/base/lib/future.d.ts:9

## Methods

### asPromise

▸ **asPromise**(): `Promise`\<`T`\>

#### Returns

`Promise`\<`T`\>

#### Defined in

packages/sdk/base/lib/future.d.ts:14

___

### reject

▸ **reject**(`error`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `error` | `any` |

#### Returns

`void`

#### Defined in

packages/sdk/base/lib/future.d.ts:12

___

### resolve

▸ **resolve**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `T` |

#### Returns

`void`

#### Defined in

packages/sdk/base/lib/future.d.ts:11

___

### wait

▸ **wait**(): `Promise`\<`T`\>

#### Returns

`Promise`\<`T`\>

#### Defined in

packages/sdk/base/lib/future.d.ts:13
