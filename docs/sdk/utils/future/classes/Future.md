[**@celo/utils**](../../README.md)

***

[@celo/utils](../../README.md) / [future](../README.md) / Future

# Class: Future\<T\>

Defined in: packages/sdk/base/lib/future.d.ts:2

**`Internal`**

## Type Parameters

### T

`T`

## Constructors

### Constructor

> **new Future**\<`T`\>(): `Future`\<`T`\>

Defined in: packages/sdk/base/lib/future.d.ts:8

#### Returns

`Future`\<`T`\>

## Accessors

### error

#### Get Signature

> **get** **error**(): `any`

Defined in: packages/sdk/base/lib/future.d.ts:10

##### Returns

`any`

***

### finished

#### Get Signature

> **get** **finished**(): `boolean`

Defined in: packages/sdk/base/lib/future.d.ts:9

##### Returns

`boolean`

## Methods

### asPromise()

> **asPromise**(): `Promise`\<`T`\>

Defined in: packages/sdk/base/lib/future.d.ts:14

#### Returns

`Promise`\<`T`\>

***

### reject()

> **reject**(`error`): `void`

Defined in: packages/sdk/base/lib/future.d.ts:12

#### Parameters

##### error

`any`

#### Returns

`void`

***

### resolve()

> **resolve**(`value`): `void`

Defined in: packages/sdk/base/lib/future.d.ts:11

#### Parameters

##### value

`T`

#### Returns

`void`

***

### wait()

> **wait**(): `Promise`\<`T`\>

Defined in: packages/sdk/base/lib/future.d.ts:13

#### Returns

`Promise`\<`T`\>
