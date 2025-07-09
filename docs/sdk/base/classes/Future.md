[**@celo/base v7.0.3**](../README.md)

***

[@celo/base](../README.md) / Future

# Class: Future\<T\>

Defined in: [packages/sdk/base/src/future.ts:3](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/base/src/future.ts#L3)

**`Internal`**

## Type Parameters

### T

`T`

## Constructors

### Constructor

> **new Future**\<`T`\>(): `Future`\<`T`\>

Defined in: [packages/sdk/base/src/future.ts:10](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/base/src/future.ts#L10)

#### Returns

`Future`\<`T`\>

## Accessors

### error

#### Get Signature

> **get** **error**(): `any`

Defined in: [packages/sdk/base/src/future.ts:21](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/base/src/future.ts#L21)

##### Returns

`any`

***

### finished

#### Get Signature

> **get** **finished**(): `boolean`

Defined in: [packages/sdk/base/src/future.ts:17](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/base/src/future.ts#L17)

##### Returns

`boolean`

## Methods

### asPromise()

> **asPromise**(): `Promise`\<`T`\>

Defined in: [packages/sdk/base/src/future.ts:41](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/base/src/future.ts#L41)

#### Returns

`Promise`\<`T`\>

***

### reject()

> **reject**(`error`): `void`

Defined in: [packages/sdk/base/src/future.ts:31](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/base/src/future.ts#L31)

#### Parameters

##### error

`any`

#### Returns

`void`

***

### resolve()

> **resolve**(`value`): `void`

Defined in: [packages/sdk/base/src/future.ts:25](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/base/src/future.ts#L25)

#### Parameters

##### value

`T`

#### Returns

`void`

***

### wait()

> **wait**(): `Promise`\<`T`\>

Defined in: [packages/sdk/base/src/future.ts:37](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/base/src/future.ts#L37)

#### Returns

`Promise`\<`T`\>
