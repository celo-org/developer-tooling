[**@celo/contractkit**](../../../README.md)

***

[@celo/contractkit](../../../modules.md) / [wrappers/ScoreManager](../README.md) / ScoreManagerWrapper

# Class: ScoreManagerWrapper

Defined in: [packages/sdk/contractkit/src/wrappers/ScoreManager.ts:7](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/ScoreManager.ts#L7)

Contract handling validator scores.

## Extends

- [`BaseWrapper`](../../BaseWrapper/classes/BaseWrapper.md)\<`ScoreManager`\>

## Constructors

### Constructor

> **new ScoreManagerWrapper**(`connection`, `contract`): `ScoreManagerWrapper`

Defined in: [packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:34](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L34)

#### Parameters

##### connection

`Connection`

##### contract

`ScoreManager`

#### Returns

`ScoreManagerWrapper`

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

#### GroupScoreSet

> **GroupScoreSet**: `ContractEvent`\<\{ `0`: `string`; `1`: `string`; `group`: `string`; `score`: `string`; \}\>

#### OwnershipTransferred

> **OwnershipTransferred**: `ContractEvent`\<\{ `0`: `string`; `1`: `string`; `newOwner`: `string`; `previousOwner`: `string`; \}\>

#### ScoreManagerSetterSet

> **ScoreManagerSetterSet**: `ContractEvent`\<`string`\>

#### ValidatorScoreSet

> **ValidatorScoreSet**: `ContractEvent`\<\{ `0`: `string`; `1`: `string`; `score`: `string`; `validator`: `string`; \}\>

#### Inherited from

[`BaseWrapper`](../../BaseWrapper/classes/BaseWrapper.md).[`events`](../../BaseWrapper/classes/BaseWrapper.md#events)

***

### eventTypes

> **eventTypes**: `EventsEnum`\<`ScoreManager`\>

Defined in: [packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:63](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L63)

#### Inherited from

[`BaseWrapper`](../../BaseWrapper/classes/BaseWrapper.md).[`eventTypes`](../../BaseWrapper/classes/BaseWrapper.md#eventtypes)

***

### getGroupScore()

> **getGroupScore**: (...`args`) => `Promise`\<`BigNumber`\>

Defined in: [packages/sdk/contractkit/src/wrappers/ScoreManager.ts:8](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/ScoreManager.ts#L8)

#### Parameters

##### args

...\[`string`\]

#### Returns

`Promise`\<`BigNumber`\>

***

### getValidatorScore()

> **getValidatorScore**: (...`args`) => `Promise`\<`BigNumber`\>

Defined in: [packages/sdk/contractkit/src/wrappers/ScoreManager.ts:13](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/ScoreManager.ts#L13)

#### Parameters

##### args

...\[`string`\]

#### Returns

`Promise`\<`BigNumber`\>

***

### methodIds

> **methodIds**: `Record`\<`"initialized"` \| `"owner"` \| `"renounceOwnership"` \| `"transferOwnership"` \| `"initialize"` \| `"getVersionNumber"` \| `"ZERO_SCORE"` \| `"groupScores"` \| `"validatorScores"` \| `"setGroupScore"` \| `"setValidatorScore"` \| `"setScoreManagerSetter"` \| `"getGroupScore"` \| `"getValidatorScore"` \| `"getScoreManagerSetter"`, `string`\>

Defined in: [packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:68](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L68)

#### Inherited from

[`BaseWrapper`](../../BaseWrapper/classes/BaseWrapper.md).[`methodIds`](../../BaseWrapper/classes/BaseWrapper.md#methodids)

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

`"OwnershipTransferred"` | `"allEvents"` | `"GroupScoreSet"` | `"ScoreManagerSetterSet"` | `"ValidatorScoreSet"`

##### options

`PastEventOptions`

#### Returns

`Promise`\<`EventLog`[]\>

#### Inherited from

[`BaseWrapper`](../../BaseWrapper/classes/BaseWrapper.md).[`getPastEvents`](../../BaseWrapper/classes/BaseWrapper.md#getpastevents)

***

### version()

> **version**(): `Promise`\<[`ContractVersion`](../../../versions/classes/ContractVersion.md)\>

Defined in: [packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:41](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L41)

#### Returns

`Promise`\<[`ContractVersion`](../../../versions/classes/ContractVersion.md)\>

#### Inherited from

[`BaseWrapper`](../../BaseWrapper/classes/BaseWrapper.md).[`version`](../../BaseWrapper/classes/BaseWrapper.md#version)
