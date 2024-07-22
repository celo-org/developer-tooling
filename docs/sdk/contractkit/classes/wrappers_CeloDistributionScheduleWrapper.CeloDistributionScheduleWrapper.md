[@celo/contractkit](../README.md) / [Exports](../modules.md) / [wrappers/CeloDistributionScheduleWrapper](../modules/wrappers_CeloDistributionScheduleWrapper.md) / CeloDistributionScheduleWrapper

# Class: CeloDistributionScheduleWrapper

[wrappers/CeloDistributionScheduleWrapper](../modules/wrappers_CeloDistributionScheduleWrapper.md).CeloDistributionScheduleWrapper

-- use its children

## Hierarchy

- [`BaseWrapper`](wrappers_BaseWrapper.BaseWrapper.md)\<`CeloDistributionSchedule`\>

  ↳ **`CeloDistributionScheduleWrapper`**

## Table of contents

### Constructors

- [constructor](wrappers_CeloDistributionScheduleWrapper.CeloDistributionScheduleWrapper.md#constructor)

### Properties

- [carbonOffsettingPartner](wrappers_CeloDistributionScheduleWrapper.CeloDistributionScheduleWrapper.md#carbonoffsettingpartner)
- [communityRewardFund](wrappers_CeloDistributionScheduleWrapper.CeloDistributionScheduleWrapper.md#communityrewardfund)
- [distributeAccordingToSchedule](wrappers_CeloDistributionScheduleWrapper.CeloDistributionScheduleWrapper.md#distributeaccordingtoschedule)
- [eventTypes](wrappers_CeloDistributionScheduleWrapper.CeloDistributionScheduleWrapper.md#eventtypes)
- [events](wrappers_CeloDistributionScheduleWrapper.CeloDistributionScheduleWrapper.md#events)
- [getCarbonOffsettingFraction](wrappers_CeloDistributionScheduleWrapper.CeloDistributionScheduleWrapper.md#getcarbonoffsettingfraction)
- [getCommunityRewardFraction](wrappers_CeloDistributionScheduleWrapper.CeloDistributionScheduleWrapper.md#getcommunityrewardfraction)
- [getDistributableAmount](wrappers_CeloDistributionScheduleWrapper.CeloDistributionScheduleWrapper.md#getdistributableamount)
- [getRemainingBalanceToDistribute](wrappers_CeloDistributionScheduleWrapper.CeloDistributionScheduleWrapper.md#getremainingbalancetodistribute)
- [getTargetCeloDistribution](wrappers_CeloDistributionScheduleWrapper.CeloDistributionScheduleWrapper.md#gettargetcelodistribution)
- [getTotalDistributedBySchedule](wrappers_CeloDistributionScheduleWrapper.CeloDistributionScheduleWrapper.md#gettotaldistributedbyschedule)
- [methodIds](wrappers_CeloDistributionScheduleWrapper.CeloDistributionScheduleWrapper.md#methodids)

### Accessors

- [address](wrappers_CeloDistributionScheduleWrapper.CeloDistributionScheduleWrapper.md#address)

### Methods

- [getConfig](wrappers_CeloDistributionScheduleWrapper.CeloDistributionScheduleWrapper.md#getconfig)
- [getPastEvents](wrappers_CeloDistributionScheduleWrapper.CeloDistributionScheduleWrapper.md#getpastevents)
- [version](wrappers_CeloDistributionScheduleWrapper.CeloDistributionScheduleWrapper.md#version)

## Constructors

### constructor

• **new CeloDistributionScheduleWrapper**(`connection`, `contract`): [`CeloDistributionScheduleWrapper`](wrappers_CeloDistributionScheduleWrapper.CeloDistributionScheduleWrapper.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `connection` | `Connection` |
| `contract` | `CeloDistributionSchedule` |

#### Returns

[`CeloDistributionScheduleWrapper`](wrappers_CeloDistributionScheduleWrapper.CeloDistributionScheduleWrapper.md)

#### Inherited from

[BaseWrapper](wrappers_BaseWrapper.BaseWrapper.md).[constructor](wrappers_BaseWrapper.BaseWrapper.md#constructor)

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:34](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L34)

## Properties

### carbonOffsettingPartner

• **carbonOffsettingPartner**: (...`args`: []) => `Promise`\<`string`\>

#### Type declaration

▸ (`...args`): `Promise`\<`string`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [] |

##### Returns

`Promise`\<`string`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/CeloDistributionScheduleWrapper.ts:28](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/CeloDistributionScheduleWrapper.ts#L28)

___

### communityRewardFund

• **communityRewardFund**: (...`args`: []) => `Promise`\<`string`\>

#### Type declaration

▸ (`...args`): `Promise`\<`string`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [] |

##### Returns

`Promise`\<`string`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/CeloDistributionScheduleWrapper.ts:29](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/CeloDistributionScheduleWrapper.ts#L29)

___

### distributeAccordingToSchedule

• **distributeAccordingToSchedule**: (...`args`: []) => `CeloTransactionObject`\<`boolean`\>

#### Type declaration

▸ (`...args`): `CeloTransactionObject`\<`boolean`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [] |

##### Returns

`CeloTransactionObject`\<`boolean`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/CeloDistributionScheduleWrapper.ts:66](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/CeloDistributionScheduleWrapper.ts#L66)

___

### eventTypes

• **eventTypes**: `EventsEnum`\<`CeloDistributionSchedule`\>

#### Inherited from

[BaseWrapper](wrappers_BaseWrapper.BaseWrapper.md).[eventTypes](wrappers_BaseWrapper.BaseWrapper.md#eventtypes)

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:63](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L63)

___

### events

• **events**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `CarbonOffsettingFundSet` | `ContractEvent`\<\{ `0`: `string` ; `1`: `string` ; `fraction`: `string` ; `partner`: `string`  }\> |
| `CommunityRewardFractionSet` | `ContractEvent`\<`string`\> |
| `OwnershipTransferred` | `ContractEvent`\<\{ `0`: `string` ; `1`: `string` ; `newOwner`: `string` ; `previousOwner`: `string`  }\> |
| `RegistrySet` | `ContractEvent`\<`string`\> |
| `allEvents` | (`options?`: `EventOptions`, `cb?`: `Callback`\<`EventLog`\>) => `EventEmitter` |

#### Inherited from

[BaseWrapper](wrappers_BaseWrapper.BaseWrapper.md).[events](wrappers_BaseWrapper.BaseWrapper.md#events)

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:61](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L61)

___

### getCarbonOffsettingFraction

• **getCarbonOffsettingFraction**: (...`args`: []) => `Promise`\<`string`\>

#### Type declaration

▸ (`...args`): `Promise`\<`string`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [] |

##### Returns

`Promise`\<`string`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/CeloDistributionScheduleWrapper.ts:36](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/CeloDistributionScheduleWrapper.ts#L36)

___

### getCommunityRewardFraction

• **getCommunityRewardFraction**: (...`args`: []) => `Promise`\<`string`\>

#### Type declaration

▸ (`...args`): `Promise`\<`string`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [] |

##### Returns

`Promise`\<`string`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/CeloDistributionScheduleWrapper.ts:31](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/CeloDistributionScheduleWrapper.ts#L31)

___

### getDistributableAmount

• **getDistributableAmount**: (...`args`: []) => `Promise`\<`string`\>

#### Type declaration

▸ (`...args`): `Promise`\<`string`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [] |

##### Returns

`Promise`\<`string`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/CeloDistributionScheduleWrapper.ts:51](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/CeloDistributionScheduleWrapper.ts#L51)

___

### getRemainingBalanceToDistribute

• **getRemainingBalanceToDistribute**: (...`args`: []) => `Promise`\<`string`\>

#### Type declaration

▸ (`...args`): `Promise`\<`string`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [] |

##### Returns

`Promise`\<`string`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/CeloDistributionScheduleWrapper.ts:41](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/CeloDistributionScheduleWrapper.ts#L41)

___

### getTargetCeloDistribution

• **getTargetCeloDistribution**: () => `Promise`\<`TargetTotalSupplyResponse`\>

#### Type declaration

▸ (): `Promise`\<`TargetTotalSupplyResponse`\>

##### Returns

`Promise`\<`TargetTotalSupplyResponse`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/CeloDistributionScheduleWrapper.ts:56](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/CeloDistributionScheduleWrapper.ts#L56)

___

### getTotalDistributedBySchedule

• **getTotalDistributedBySchedule**: (...`args`: []) => `Promise`\<`string`\>

#### Type declaration

▸ (`...args`): `Promise`\<`string`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [] |

##### Returns

`Promise`\<`string`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/CeloDistributionScheduleWrapper.ts:46](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/CeloDistributionScheduleWrapper.ts#L46)

___

### methodIds

• **methodIds**: `Record`\<``"initialized"`` \| ``"isL2"`` \| ``"owner"`` \| ``"registry"`` \| ``"renounceOwnership"`` \| ``"setRegistry"`` \| ``"transferOwnership"`` \| ``"initialize"`` \| ``"getVersionNumber"`` \| ``"activate"`` \| ``"carbonOffsettingPartner"`` \| ``"setCommunityRewardFraction"`` \| ``"getCommunityRewardFraction"`` \| ``"setCarbonOffsettingFund"`` \| ``"getCarbonOffsettingFraction"`` \| ``"areDependenciesSet"`` \| ``"communityRewardFund"`` \| ``"l2StartTime"`` \| ``"totalAllocatedAtL2Start"`` \| ``"totalDistributedBySchedule"`` \| ``"distributeAccordingToSchedule"`` \| ``"getTotalDistributedBySchedule"`` \| ``"getRemainingBalanceToDistribute"`` \| ``"getDistributableAmount"`` \| ``"getTargetCeloDistribution"``, `string`\>

#### Inherited from

[BaseWrapper](wrappers_BaseWrapper.BaseWrapper.md).[methodIds](wrappers_BaseWrapper.BaseWrapper.md#methodids)

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:68](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L68)

## Accessors

### address

• `get` **address**(): \`0x$\{string}\`

Contract address

#### Returns

\`0x$\{string}\`

#### Inherited from

BaseWrapper.address

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:37](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L37)

## Methods

### getConfig

▸ **getConfig**(): `Promise`\<`CeloDistributionScheduleConfig`\>

#### Returns

`Promise`\<`CeloDistributionScheduleConfig`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/CeloDistributionScheduleWrapper.ts:71](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/CeloDistributionScheduleWrapper.ts#L71)

___

### getPastEvents

▸ **getPastEvents**(`event`, `options`): `Promise`\<`EventLog`[]\>

Contract getPastEvents

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"OwnershipTransferred"`` \| ``"RegistrySet"`` \| ``"allEvents"`` \| ``"CarbonOffsettingFundSet"`` \| ``"CommunityRewardFractionSet"`` |
| `options` | `PastEventOptions` |

#### Returns

`Promise`\<`EventLog`[]\>

#### Inherited from

[BaseWrapper](wrappers_BaseWrapper.BaseWrapper.md).[getPastEvents](wrappers_BaseWrapper.BaseWrapper.md#getpastevents)

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:57](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L57)

___

### version

▸ **version**(): `Promise`\<[`ContractVersion`](versions.ContractVersion.md)\>

#### Returns

`Promise`\<[`ContractVersion`](versions.ContractVersion.md)\>

#### Inherited from

[BaseWrapper](wrappers_BaseWrapper.BaseWrapper.md).[version](wrappers_BaseWrapper.BaseWrapper.md#version)

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:41](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L41)
