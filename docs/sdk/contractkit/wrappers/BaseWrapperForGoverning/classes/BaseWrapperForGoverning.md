[**@celo/contractkit**](../../../README.md)

***

[@celo/contractkit](../../../modules.md) / [wrappers/BaseWrapperForGoverning](../README.md) / BaseWrapperForGoverning

# Class: BaseWrapperForGoverning\<T\>

Defined in: [packages/sdk/contractkit/src/wrappers/BaseWrapperForGoverning.ts:22](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapperForGoverning.ts#L22)

**`Internal`**

## Extends

- [`BaseWrapper`](../../BaseWrapper/classes/BaseWrapper.md)\<`T`\>

## Extended by

- [`ElectionWrapper`](../../Election/classes/ElectionWrapper.md)
- [`EpochManagerWrapper`](../../EpochManager/classes/EpochManagerWrapper.md)
- [`GovernanceWrapper`](../../Governance/classes/GovernanceWrapper.md)
- [`LockedGoldWrapper`](../../LockedGold/classes/LockedGoldWrapper.md)
- [`ReleaseGoldWrapper`](../../ReleaseGold/classes/ReleaseGoldWrapper.md)
- [`ValidatorsWrapper`](../../Validators/classes/ValidatorsWrapper.md)

## Type Parameters

### T

`T` *extends* `Contract`

## Constructors

### Constructor

> **new BaseWrapperForGoverning**\<`T`\>(`connection`, `contract`, `contracts`): `BaseWrapperForGoverning`\<`T`\>

Defined in: [packages/sdk/contractkit/src/wrappers/BaseWrapperForGoverning.ts:23](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapperForGoverning.ts#L23)

#### Parameters

##### connection

`Connection`

##### contract

`T`

##### contracts

`ContractWrappersForVotingAndRules`

#### Returns

`BaseWrapperForGoverning`\<`T`\>

#### Overrides

[`BaseWrapper`](../../BaseWrapper/classes/BaseWrapper.md).[`constructor`](../../BaseWrapper/classes/BaseWrapper.md#constructor)

## Properties

### events

> **events**: `T`\[`"events"`\]

Defined in: [packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:61](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L61)

#### Inherited from

[`BaseWrapper`](../../BaseWrapper/classes/BaseWrapper.md).[`events`](../../BaseWrapper/classes/BaseWrapper.md#events)

***

### eventTypes

> **eventTypes**: `EventsEnum`\<`T`\>

Defined in: [packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:63](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L63)

#### Inherited from

[`BaseWrapper`](../../BaseWrapper/classes/BaseWrapper.md).[`eventTypes`](../../BaseWrapper/classes/BaseWrapper.md#eventtypes)

***

### methodIds

> **methodIds**: `Record`\<keyof `T`\[`"methods"`\], `string`\>

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

keyof `T`\[`"events"`\]

##### options

`PastEventOptions`

#### Returns

`Promise`\<`EventLog`[]\>

#### Inherited from

[`BaseWrapper`](../../BaseWrapper/classes/BaseWrapper.md).[`getPastEvents`](../../BaseWrapper/classes/BaseWrapper.md#getpastevents)

***

### version()

> **version**(): `Promise`\<`T`\[`"methods"`\] *extends* `object` ? [`ContractVersion`](../../../versions/classes/ContractVersion.md) : `never`\>

Defined in: [packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:41](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L41)

#### Returns

`Promise`\<`T`\[`"methods"`\] *extends* `object` ? [`ContractVersion`](../../../versions/classes/ContractVersion.md) : `never`\>

#### Inherited from

[`BaseWrapper`](../../BaseWrapper/classes/BaseWrapper.md).[`version`](../../BaseWrapper/classes/BaseWrapper.md#version)
