[@celo/base](../README.md) / [future](../modules/future.md) / Future

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

[packages/sdk/base/src/future.ts:10](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/base/src/future.ts#L10)

## Accessors

### error

• `get` **error**(): `any`

#### Returns

`any`

#### Defined in

[packages/sdk/base/src/future.ts:21](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/base/src/future.ts#L21)

___

### finished

• `get` **finished**(): `boolean`

#### Returns

`boolean`

#### Defined in

[packages/sdk/base/src/future.ts:17](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/base/src/future.ts#L17)

## Methods

### asPromise

▸ **asPromise**(): `Promise`\<`T`\>

#### Returns

`Promise`\<`T`\>

#### Defined in

[packages/sdk/base/src/future.ts:41](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/base/src/future.ts#L41)

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

[packages/sdk/base/src/future.ts:31](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/base/src/future.ts#L31)

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

[packages/sdk/base/src/future.ts:25](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/base/src/future.ts#L25)

___

### wait

▸ **wait**(): `Promise`\<`T`\>

#### Returns

`Promise`\<`T`\>

#### Defined in

[packages/sdk/base/src/future.ts:37](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/base/src/future.ts#L37)
