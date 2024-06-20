[@celo/contractkit](../README.md) / [Exports](../modules.md) / [wrappers/MintCeloScheduleWrapper](../modules/wrappers_MintCeloScheduleWrapper.md) / MintCeloScheduleWrapper

# Class: MintCeloScheduleWrapper

[wrappers/MintCeloScheduleWrapper](../modules/wrappers_MintCeloScheduleWrapper.md).MintCeloScheduleWrapper

-- use its children

## Hierarchy

- [`BaseWrapper`](wrappers_BaseWrapper.BaseWrapper.md)\<`MintGoldSchedule`\>

  ↳ **`MintCeloScheduleWrapper`**

## Table of contents

### Constructors

- [constructor](wrappers_MintCeloScheduleWrapper.MintCeloScheduleWrapper.md#constructor)

### Properties

- [carbonOffsettingPartner](wrappers_MintCeloScheduleWrapper.MintCeloScheduleWrapper.md#carbonoffsettingpartner)
- [communityRewardFund](wrappers_MintCeloScheduleWrapper.MintCeloScheduleWrapper.md#communityrewardfund)
- [eventTypes](wrappers_MintCeloScheduleWrapper.MintCeloScheduleWrapper.md#eventtypes)
- [events](wrappers_MintCeloScheduleWrapper.MintCeloScheduleWrapper.md#events)
- [getCarbonOffsettingFraction](wrappers_MintCeloScheduleWrapper.MintCeloScheduleWrapper.md#getcarbonoffsettingfraction)
- [getCommunityRewardFraction](wrappers_MintCeloScheduleWrapper.MintCeloScheduleWrapper.md#getcommunityrewardfraction)
- [getMintableAmount](wrappers_MintCeloScheduleWrapper.MintCeloScheduleWrapper.md#getmintableamount)
- [getRemainingBalanceToMint](wrappers_MintCeloScheduleWrapper.MintCeloScheduleWrapper.md#getremainingbalancetomint)
- [getTargetGoldTotalSupply](wrappers_MintCeloScheduleWrapper.MintCeloScheduleWrapper.md#gettargetgoldtotalsupply)
- [getTotalMintedBySchedule](wrappers_MintCeloScheduleWrapper.MintCeloScheduleWrapper.md#gettotalmintedbyschedule)
- [methodIds](wrappers_MintCeloScheduleWrapper.MintCeloScheduleWrapper.md#methodids)
- [mintAccordingToSchedule](wrappers_MintCeloScheduleWrapper.MintCeloScheduleWrapper.md#mintaccordingtoschedule)

### Accessors

- [address](wrappers_MintCeloScheduleWrapper.MintCeloScheduleWrapper.md#address)

### Methods

- [getConfig](wrappers_MintCeloScheduleWrapper.MintCeloScheduleWrapper.md#getconfig)
- [getPastEvents](wrappers_MintCeloScheduleWrapper.MintCeloScheduleWrapper.md#getpastevents)
- [version](wrappers_MintCeloScheduleWrapper.MintCeloScheduleWrapper.md#version)

## Constructors

### constructor

• **new MintCeloScheduleWrapper**(`connection`, `contract`): [`MintCeloScheduleWrapper`](wrappers_MintCeloScheduleWrapper.MintCeloScheduleWrapper.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `connection` | `Connection` |
| `contract` | `MintGoldSchedule` |

#### Returns

[`MintCeloScheduleWrapper`](wrappers_MintCeloScheduleWrapper.MintCeloScheduleWrapper.md)

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

[packages/sdk/contractkit/src/wrappers/MintCeloScheduleWrapper.ts:28](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/MintCeloScheduleWrapper.ts#L28)

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

[packages/sdk/contractkit/src/wrappers/MintCeloScheduleWrapper.ts:29](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/MintCeloScheduleWrapper.ts#L29)

___

### eventTypes

• **eventTypes**: `EventsEnum`\<`MintGoldSchedule`\>

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

[packages/sdk/contractkit/src/wrappers/MintCeloScheduleWrapper.ts:36](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/MintCeloScheduleWrapper.ts#L36)

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

[packages/sdk/contractkit/src/wrappers/MintCeloScheduleWrapper.ts:31](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/MintCeloScheduleWrapper.ts#L31)

___

### getMintableAmount

• **getMintableAmount**: (...`args`: []) => `Promise`\<`string`\>

#### Type declaration

▸ (`...args`): `Promise`\<`string`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [] |

##### Returns

`Promise`\<`string`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/MintCeloScheduleWrapper.ts:51](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/MintCeloScheduleWrapper.ts#L51)

___

### getRemainingBalanceToMint

• **getRemainingBalanceToMint**: (...`args`: []) => `Promise`\<`string`\>

#### Type declaration

▸ (`...args`): `Promise`\<`string`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [] |

##### Returns

`Promise`\<`string`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/MintCeloScheduleWrapper.ts:41](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/MintCeloScheduleWrapper.ts#L41)

___

### getTargetGoldTotalSupply

• **getTargetGoldTotalSupply**: () => `Promise`\<`TargetTotalSupplyResponse`\>

#### Type declaration

▸ (): `Promise`\<`TargetTotalSupplyResponse`\>

##### Returns

`Promise`\<`TargetTotalSupplyResponse`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/MintCeloScheduleWrapper.ts:52](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/MintCeloScheduleWrapper.ts#L52)

___

### getTotalMintedBySchedule

• **getTotalMintedBySchedule**: (...`args`: []) => `Promise`\<`string`\>

#### Type declaration

▸ (`...args`): `Promise`\<`string`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [] |

##### Returns

`Promise`\<`string`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/MintCeloScheduleWrapper.ts:46](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/MintCeloScheduleWrapper.ts#L46)

___

### methodIds

• **methodIds**: `Record`\<``"initialized"`` \| ``"owner"`` \| ``"registry"`` \| ``"renounceOwnership"`` \| ``"setRegistry"`` \| ``"transferOwnership"`` \| ``"getVersionNumber"`` \| ``"initialize"`` \| ``"activate"`` \| ``"areDependenciesSet"`` \| ``"carbonOffsettingPartner"`` \| ``"communityRewardFund"`` \| ``"isL2"`` \| ``"l2StartTime"`` \| ``"totalMintedBySchedule"`` \| ``"totalSupplyAtL2Start"`` \| ``"mintAccordingToSchedule"`` \| ``"getCommunityRewardFraction"`` \| ``"getCarbonOffsettingFraction"`` \| ``"setCommunityRewardFraction"`` \| ``"setCarbonOffsettingFund"`` \| ``"getRemainingBalanceToMint"`` \| ``"getTotalMintedBySchedule"`` \| ``"getMintableAmount"`` \| ``"getTargetGoldTotalSupply"``, `string`\>

#### Inherited from

[BaseWrapper](wrappers_BaseWrapper.BaseWrapper.md).[methodIds](wrappers_BaseWrapper.BaseWrapper.md#methodids)

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:68](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L68)

___

### mintAccordingToSchedule

• **mintAccordingToSchedule**: (...`args`: []) => `CeloTransactionObject`\<`boolean`\>

#### Type declaration

▸ (`...args`): `CeloTransactionObject`\<`boolean`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [] |

##### Returns

`CeloTransactionObject`\<`boolean`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/MintCeloScheduleWrapper.ts:62](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/MintCeloScheduleWrapper.ts#L62)

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

▸ **getConfig**(): `Promise`\<`MintCeloScheduleConfig`\>

#### Returns

`Promise`\<`MintCeloScheduleConfig`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/MintCeloScheduleWrapper.ts:67](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/MintCeloScheduleWrapper.ts#L67)

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
