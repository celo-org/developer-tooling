[**@celo/contractkit**](../../../README.md)

***

[@celo/contractkit](../../../modules.md) / [wrappers/Freezer](../README.md) / FreezerWrapper

# Class: FreezerWrapper

Defined in: [packages/sdk/contractkit/src/wrappers/Freezer.ts:4](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Freezer.ts#L4)

**`Internal`**

-- use its children

## Extends

- [`BaseWrapper`](../../BaseWrapper/classes/BaseWrapper.md)\<`Freezer`\>

## Constructors

### Constructor

> **new FreezerWrapper**(`connection`, `contract`): `FreezerWrapper`

Defined in: [packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:34](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L34)

#### Parameters

##### connection

`Connection`

##### contract

`Freezer`

#### Returns

`FreezerWrapper`

#### Inherited from

[`BaseWrapper`](../../BaseWrapper/classes/BaseWrapper.md).[`constructor`](../../BaseWrapper/classes/BaseWrapper.md#constructor)

## Properties

### events

> **events**: `object`

Defined in: [packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:61](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L61)

#### allEvents()

> **allEvents**: (`options?`, `cb?`) => `EventEmitter`

##### Parameters

###### options?

`EventOptions`

###### cb?

`Callback`\<`EventLog`\>

##### Returns

`EventEmitter`

#### OwnershipTransferred

> **OwnershipTransferred**: `ContractEvent`\<\{ `0`: `string`; `1`: `string`; `newOwner`: `string`; `previousOwner`: `string`; \}\>

#### Inherited from

[`BaseWrapper`](../../BaseWrapper/classes/BaseWrapper.md).[`events`](../../BaseWrapper/classes/BaseWrapper.md#events)

***

### eventTypes

> **eventTypes**: `EventsEnum`\<`Freezer`\>

Defined in: [packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:63](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L63)

#### Inherited from

[`BaseWrapper`](../../BaseWrapper/classes/BaseWrapper.md).[`eventTypes`](../../BaseWrapper/classes/BaseWrapper.md#eventtypes)

***

### freeze()

> **freeze**: (...`args`) => `CeloTransactionObject`\<`void`\>

Defined in: [packages/sdk/contractkit/src/wrappers/Freezer.ts:5](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Freezer.ts#L5)

#### Parameters

##### args

...\[`string`\]

#### Returns

`CeloTransactionObject`\<`void`\>

***

### isFrozen()

> **isFrozen**: (...`args`) => `Promise`\<`boolean`\>

Defined in: [packages/sdk/contractkit/src/wrappers/Freezer.ts:7](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Freezer.ts#L7)

#### Parameters

##### args

...\[`string`\]

#### Returns

`Promise`\<`boolean`\>

***

### methodIds

> **methodIds**: `Record`\<`"initialized"` \| `"isOwner"` \| `"owner"` \| `"renounceOwnership"` \| `"transferOwnership"` \| `"initialize"` \| `"isFrozen"` \| `"freeze"` \| `"unfreeze"`, `string`\>

Defined in: [packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:68](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L68)

#### Inherited from

[`BaseWrapper`](../../BaseWrapper/classes/BaseWrapper.md).[`methodIds`](../../BaseWrapper/classes/BaseWrapper.md#methodids)

***

### unfreeze()

> **unfreeze**: (...`args`) => `CeloTransactionObject`\<`void`\>

Defined in: [packages/sdk/contractkit/src/wrappers/Freezer.ts:6](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Freezer.ts#L6)

#### Parameters

##### args

...\[`string`\]

#### Returns

`CeloTransactionObject`\<`void`\>

## Accessors

### address

#### Get Signature

> **get** **address**(): `` `0x${string}` ``

Defined in: [packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:37](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L37)

Contract address

##### Returns

`` `0x${string}` ``

#### Inherited from

[`BaseWrapper`](../../BaseWrapper/classes/BaseWrapper.md).[`address`](../../BaseWrapper/classes/BaseWrapper.md#address)

## Methods

### getPastEvents()

> **getPastEvents**(`event`, `options`): `Promise`\<`EventLog`[]\>

Defined in: [packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:57](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L57)

Contract getPastEvents

#### Parameters

##### event

`"OwnershipTransferred"` | `"allEvents"`

##### options

`PastEventOptions`

#### Returns

`Promise`\<`EventLog`[]\>

#### Inherited from

[`BaseWrapper`](../../BaseWrapper/classes/BaseWrapper.md).[`getPastEvents`](../../BaseWrapper/classes/BaseWrapper.md#getpastevents)

***

### version()

> **version**(): `Promise`\<`never`\>

Defined in: [packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:41](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L41)

#### Returns

`Promise`\<`never`\>

#### Inherited from

[`BaseWrapper`](../../BaseWrapper/classes/BaseWrapper.md).[`version`](../../BaseWrapper/classes/BaseWrapper.md#version)
