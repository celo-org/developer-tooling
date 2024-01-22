[@celo/contractkit](../README.md) / [Exports](../modules.md) / [wrappers/EpochRewards](../modules/wrappers_EpochRewards.md) / EpochRewardsWrapper

# Class: EpochRewardsWrapper

[wrappers/EpochRewards](../modules/wrappers_EpochRewards.md).EpochRewardsWrapper

-- use its children

## Hierarchy

- [`BaseWrapper`](wrappers_BaseWrapper.BaseWrapper.md)\<`EpochRewards`\>

  ↳ **`EpochRewardsWrapper`**

## Table of contents

### Constructors

- [constructor](wrappers_EpochRewards.EpochRewardsWrapper.md#constructor)

### Properties

- [eventTypes](wrappers_EpochRewards.EpochRewardsWrapper.md#eventtypes)
- [events](wrappers_EpochRewards.EpochRewardsWrapper.md#events)
- [getCommunityReward](wrappers_EpochRewards.EpochRewardsWrapper.md#getcommunityreward)
- [getRewardsMultiplierParameters](wrappers_EpochRewards.EpochRewardsWrapper.md#getrewardsmultiplierparameters)
- [getTargetValidatorEpochPayment](wrappers_EpochRewards.EpochRewardsWrapper.md#gettargetvalidatorepochpayment)
- [getTargetVotingYieldParameters](wrappers_EpochRewards.EpochRewardsWrapper.md#gettargetvotingyieldparameters)
- [methodIds](wrappers_EpochRewards.EpochRewardsWrapper.md#methodids)

### Accessors

- [address](wrappers_EpochRewards.EpochRewardsWrapper.md#address)

### Methods

- [getCarbonOffsetting](wrappers_EpochRewards.EpochRewardsWrapper.md#getcarbonoffsetting)
- [getConfig](wrappers_EpochRewards.EpochRewardsWrapper.md#getconfig)
- [getPastEvents](wrappers_EpochRewards.EpochRewardsWrapper.md#getpastevents)
- [version](wrappers_EpochRewards.EpochRewardsWrapper.md#version)

## Constructors

### constructor

• **new EpochRewardsWrapper**(`connection`, `contract`): [`EpochRewardsWrapper`](wrappers_EpochRewards.EpochRewardsWrapper.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `connection` | `Connection` |
| `contract` | `EpochRewards` |

#### Returns

[`EpochRewardsWrapper`](wrappers_EpochRewards.EpochRewardsWrapper.md)

#### Inherited from

[BaseWrapper](wrappers_BaseWrapper.BaseWrapper.md).[constructor](wrappers_BaseWrapper.BaseWrapper.md#constructor)

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:34](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L34)

## Properties

### eventTypes

• **eventTypes**: `EventsEnum`\<`EpochRewards`\>

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
| `RewardsMultiplierParametersSet` | `ContractEvent`\<\{ `0`: `string` ; `1`: `string` ; `2`: `string` ; `max`: `string` ; `overspendAdjustmentFactor`: `string` ; `underspendAdjustmentFactor`: `string`  }\> |
| `TargetValidatorEpochPaymentSet` | `ContractEvent`\<`string`\> |
| `TargetVotingGoldFractionSet` | `ContractEvent`\<`string`\> |
| `TargetVotingYieldParametersSet` | `ContractEvent`\<\{ `0`: `string` ; `1`: `string` ; `adjustmentFactor`: `string` ; `max`: `string`  }\> |
| `TargetVotingYieldSet` | `ContractEvent`\<`string`\> |
| `TargetVotingYieldUpdated` | `ContractEvent`\<`string`\> |
| `allEvents` | (`options?`: `EventOptions`, `cb?`: `Callback`\<`EventLog`\>) => `EventEmitter` |

#### Inherited from

[BaseWrapper](wrappers_BaseWrapper.BaseWrapper.md).[events](wrappers_BaseWrapper.BaseWrapper.md#events)

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:61](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L61)

___

### getCommunityReward

• **getCommunityReward**: (...`args`: []) => `Promise`\<`BigNumber`\>

#### Type declaration

▸ (`...args`): `Promise`\<`BigNumber`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [] |

##### Returns

`Promise`\<`BigNumber`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/EpochRewards.ts:28](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/EpochRewards.ts#L28)

___

### getRewardsMultiplierParameters

• **getRewardsMultiplierParameters**: (...`args`: []) => `Promise`\<\{ `max`: `BigNumber` ; `overspendAdjustment`: `BigNumber` ; `underspendAdjustment`: `BigNumber`  }\>

#### Type declaration

▸ (`...args`): `Promise`\<\{ `max`: `BigNumber` ; `overspendAdjustment`: `BigNumber` ; `underspendAdjustment`: `BigNumber`  }\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [] |

##### Returns

`Promise`\<\{ `max`: `BigNumber` ; `overspendAdjustment`: `BigNumber` ; `underspendAdjustment`: `BigNumber`  }\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/EpochRewards.ts:8](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/EpochRewards.ts#L8)

___

### getTargetValidatorEpochPayment

• **getTargetValidatorEpochPayment**: (...`args`: []) => `Promise`\<`BigNumber`\>

#### Type declaration

▸ (`...args`): `Promise`\<`BigNumber`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [] |

##### Returns

`Promise`\<`BigNumber`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/EpochRewards.ts:43](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/EpochRewards.ts#L43)

___

### getTargetVotingYieldParameters

• **getTargetVotingYieldParameters**: (...`args`: []) => `Promise`\<\{ `adjustment`: `BigNumber` ; `max`: `BigNumber` ; `target`: `BigNumber`  }\>

#### Type declaration

▸ (`...args`): `Promise`\<\{ `adjustment`: `BigNumber` ; `max`: `BigNumber` ; `target`: `BigNumber`  }\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [] |

##### Returns

`Promise`\<\{ `adjustment`: `BigNumber` ; `max`: `BigNumber` ; `target`: `BigNumber`  }\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/EpochRewards.ts:18](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/EpochRewards.ts#L18)

___

### methodIds

• **methodIds**: `Record`\<``"checkProofOfPossession"`` \| ``"fractionMulExp"`` \| ``"getBlockNumberFromHeader"`` \| ``"getEpochNumber"`` \| ``"getEpochNumberOfBlock"`` \| ``"getEpochSize"`` \| ``"getParentSealBitmap"`` \| ``"getVerifiedSealBitmapFromHeader"`` \| ``"hashHeader"`` \| ``"initialized"`` \| ``"isOwner"`` \| ``"minQuorumSize"`` \| ``"minQuorumSizeInCurrentSet"`` \| ``"numberValidatorsInCurrentSet"`` \| ``"numberValidatorsInSet"`` \| ``"owner"`` \| ``"registry"`` \| ``"renounceOwnership"`` \| ``"setRegistry"`` \| ``"transferOwnership"`` \| ``"validatorSignerAddressFromCurrentSet"`` \| ``"validatorSignerAddressFromSet"`` \| ``"getVersionNumber"`` \| ``"initialize"`` \| ``"carbonOffsettingPartner"`` \| ``"startTime"`` \| ``"targetValidatorEpochPayment"`` \| ``"getTargetVotingYieldParameters"`` \| ``"getRewardsMultiplierParameters"`` \| ``"setCommunityRewardFraction"`` \| ``"getCommunityRewardFraction"`` \| ``"setCarbonOffsettingFund"`` \| ``"getCarbonOffsettingFraction"`` \| ``"setTargetVotingGoldFraction"`` \| ``"getTargetVotingGoldFraction"`` \| ``"setTargetValidatorEpochPayment"`` \| ``"setRewardsMultiplierParameters"`` \| ``"setTargetVotingYieldParameters"`` \| ``"setTargetVotingYield"`` \| ``"getTargetGoldTotalSupply"`` \| ``"getTargetVoterRewards"`` \| ``"getTargetTotalEpochPaymentsInGold"`` \| ``"getRewardsMultiplier"`` \| ``"getVotingGoldFraction"`` \| ``"updateTargetVotingYield"`` \| ``"isReserveLow"`` \| ``"calculateTargetEpochRewards"``, `string`\>

#### Inherited from

[BaseWrapper](wrappers_BaseWrapper.BaseWrapper.md).[methodIds](wrappers_BaseWrapper.BaseWrapper.md#methodids)

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:68](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L68)

## Accessors

### address

• `get` **address**(): `string`

Contract address

#### Returns

`string`

#### Inherited from

BaseWrapper.address

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:37](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L37)

## Methods

### getCarbonOffsetting

▸ **getCarbonOffsetting**(): `Promise`\<\{ `factor`: `BigNumber` ; `partner`: `string`  }\>

#### Returns

`Promise`\<\{ `factor`: `BigNumber` ; `partner`: `string`  }\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/EpochRewards.ts:34](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/EpochRewards.ts#L34)

___

### getConfig

▸ **getConfig**(): `Promise`\<\{ `carbonOffsetting`: \{ `factor`: `BigNumber` ; `partner`: `string`  } ; `communityReward`: `BigNumber` ; `rewardsMultiplier`: \{ `max`: `BigNumber` ; `overspendAdjustment`: `BigNumber` ; `underspendAdjustment`: `BigNumber`  } ; `targetValidatorEpochPayment`: `BigNumber` ; `targetVotingYield`: \{ `adjustment`: `BigNumber` ; `max`: `BigNumber` ; `target`: `BigNumber`  }  }\>

#### Returns

`Promise`\<\{ `carbonOffsetting`: \{ `factor`: `BigNumber` ; `partner`: `string`  } ; `communityReward`: `BigNumber` ; `rewardsMultiplier`: \{ `max`: `BigNumber` ; `overspendAdjustment`: `BigNumber` ; `underspendAdjustment`: `BigNumber`  } ; `targetValidatorEpochPayment`: `BigNumber` ; `targetVotingYield`: \{ `adjustment`: `BigNumber` ; `max`: `BigNumber` ; `target`: `BigNumber`  }  }\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/EpochRewards.ts:49](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/EpochRewards.ts#L49)

___

### getPastEvents

▸ **getPastEvents**(`event`, `options`): `Promise`\<`EventLog`[]\>

Contract getPastEvents

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"OwnershipTransferred"`` \| ``"RegistrySet"`` \| ``"allEvents"`` \| ``"CarbonOffsettingFundSet"`` \| ``"CommunityRewardFractionSet"`` \| ``"RewardsMultiplierParametersSet"`` \| ``"TargetValidatorEpochPaymentSet"`` \| ``"TargetVotingGoldFractionSet"`` \| ``"TargetVotingYieldParametersSet"`` \| ``"TargetVotingYieldSet"`` \| ``"TargetVotingYieldUpdated"`` |
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
