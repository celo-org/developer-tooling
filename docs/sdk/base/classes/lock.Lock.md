[@celo/base](../README.md) / [lock](../modules/lock.md) / Lock

# Class: Lock

[lock](../modules/lock.md).Lock

## Table of contents

### Constructors

- [constructor](lock.Lock.md#constructor)

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

## Methods

### acquire

▸ **acquire**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

[packages/sdk/base/src/lock.ts:29](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/base/src/lock.ts#L29)

___

### release

▸ **release**(): `void`

#### Returns

`void`

#### Defined in

[packages/sdk/base/src/lock.ts:54](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/base/src/lock.ts#L54)

___

### tryAcquire

▸ **tryAcquire**(): `boolean`

#### Returns

`boolean`

#### Defined in

[packages/sdk/base/src/lock.ts:20](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/base/src/lock.ts#L20)
