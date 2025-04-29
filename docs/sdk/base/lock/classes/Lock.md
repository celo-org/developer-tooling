[**@celo/base**](../../README.md)

***

[@celo/base](../../README.md) / [lock](../README.md) / Lock

# Class: Lock

Defined in: [packages/sdk/base/src/lock.ts:10](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/base/src/lock.ts#L10)

## Constructors

### Constructor

> **new Lock**(): `Lock`

Defined in: [packages/sdk/base/src/lock.ts:14](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/base/src/lock.ts#L14)

#### Returns

`Lock`

## Accessors

### listenersCount

#### Get Signature

> **get** **listenersCount**(): `number`

Defined in: [packages/sdk/base/src/lock.ts:18](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/base/src/lock.ts#L18)

##### Returns

`number`

## Methods

### acquire()

> **acquire**(): `Promise`\<`void`\>

Defined in: [packages/sdk/base/src/lock.ts:33](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/base/src/lock.ts#L33)

#### Returns

`Promise`\<`void`\>

***

### release()

> **release**(): `void`

Defined in: [packages/sdk/base/src/lock.ts:58](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/base/src/lock.ts#L58)

#### Returns

`void`

***

### tryAcquire()

> **tryAcquire**(): `boolean`

Defined in: [packages/sdk/base/src/lock.ts:24](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/base/src/lock.ts#L24)

#### Returns

`boolean`
