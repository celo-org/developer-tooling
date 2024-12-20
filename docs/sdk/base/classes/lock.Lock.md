[@celo/base](../README.md) / [lock](../modules/lock.md) / Lock

# Class: Lock

[lock](../modules/lock.md).Lock

## Table of contents

### Constructors

- [constructor](lock.Lock.md#constructor)

### Accessors

- [listenersCount](lock.Lock.md#listenerscount)

### Methods

- [acquire](lock.Lock.md#acquire)
- [release](lock.Lock.md#release)
- [tryAcquire](lock.Lock.md#tryacquire)

## Constructors

### constructor

• **new Lock**(): [`Lock`](lock.Lock.md)

#### Returns

[`Lock`](lock.Lock.md)

#### Defined in

[packages/sdk/base/src/lock.ts:14](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/base/src/lock.ts#L14)

## Accessors

### listenersCount

• `get` **listenersCount**(): `number`

#### Returns

`number`

#### Defined in

[packages/sdk/base/src/lock.ts:18](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/base/src/lock.ts#L18)

## Methods

### acquire

▸ **acquire**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

[packages/sdk/base/src/lock.ts:33](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/base/src/lock.ts#L33)

___

### release

▸ **release**(): `void`

#### Returns

`void`

#### Defined in

[packages/sdk/base/src/lock.ts:58](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/base/src/lock.ts#L58)

___

### tryAcquire

▸ **tryAcquire**(): `boolean`

#### Returns

`boolean`

#### Defined in

[packages/sdk/base/src/lock.ts:24](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/base/src/lock.ts#L24)
