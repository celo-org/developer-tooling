[**@celo/contractkit**](../../../README.md)

***

[@celo/contractkit](../../../modules.md) / [wrappers/EpochRewards](../README.md) / EpochRewardsWrapper

# Class: EpochRewardsWrapper

Defined in: [packages/sdk/contractkit/src/wrappers/EpochRewards.ts:7](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/EpochRewards.ts#L7)

**`Internal`**

-- use its children

## Extends

- [`BaseWrapper`](../../BaseWrapper/classes/BaseWrapper.md)\<`EpochRewards`\>

## Constructors

### Constructor

> **new EpochRewardsWrapper**(`connection`, `contract`): `EpochRewardsWrapper`

Defined in: [packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:34](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L34)

#### Parameters

##### connection

`Connection`

##### contract

`EpochRewards`

#### Returns

`EpochRewardsWrapper`

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

#### CarbonOffsettingFundSet

> **CarbonOffsettingFundSet**: `ContractEvent`\<\{ `0`: `string`; `1`: `string`; `fraction`: `string`; `partner`: `string`; \}\>

#### CommunityRewardFractionSet

> **CommunityRewardFractionSet**: `ContractEvent`\<`string`\>

#### OwnershipTransferred

> **OwnershipTransferred**: `ContractEvent`\<\{ `0`: `string`; `1`: `string`; `newOwner`: `string`; `previousOwner`: `string`; \}\>

#### RegistrySet

> **RegistrySet**: `ContractEvent`\<`string`\>

#### RewardsMultiplierParametersSet

> **RewardsMultiplierParametersSet**: `ContractEvent`\<\{ `0`: `string`; `1`: `string`; `2`: `string`; `max`: `string`; `overspendAdjustmentFactor`: `string`; `underspendAdjustmentFactor`: `string`; \}\>

#### TargetValidatorEpochPaymentSet

> **TargetValidatorEpochPaymentSet**: `ContractEvent`\<`string`\>

#### TargetVotingGoldFractionSet

> **TargetVotingGoldFractionSet**: `ContractEvent`\<`string`\>

#### TargetVotingYieldParametersSet

> **TargetVotingYieldParametersSet**: `ContractEvent`\<\{ `0`: `string`; `1`: `string`; `adjustmentFactor`: `string`; `max`: `string`; \}\>

#### TargetVotingYieldSet

> **TargetVotingYieldSet**: `ContractEvent`\<`string`\>

#### TargetVotingYieldUpdated

> **TargetVotingYieldUpdated**: `ContractEvent`\<`string`\>

#### Inherited from

[`BaseWrapper`](../../BaseWrapper/classes/BaseWrapper.md).[`events`](../../BaseWrapper/classes/BaseWrapper.md#events)

***

### eventTypes

> **eventTypes**: `EventsEnum`\<`EpochRewards`\>

Defined in: [packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:63](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L63)

#### Inherited from

[`BaseWrapper`](../../BaseWrapper/classes/BaseWrapper.md).[`eventTypes`](../../BaseWrapper/classes/BaseWrapper.md#eventtypes)

***

### getCommunityReward()

> **getCommunityReward**: (...`args`) => `Promise`\<`BigNumber`\>

Defined in: [packages/sdk/contractkit/src/wrappers/EpochRewards.ts:28](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/EpochRewards.ts#L28)

#### Parameters

##### args

...\[\]

#### Returns

`Promise`\<`BigNumber`\>

***

### getRewardsMultiplierParameters()

> **getRewardsMultiplierParameters**: (...`args`) => `Promise`\<\{ `max`: `BigNumber`; `overspendAdjustment`: `BigNumber`; `underspendAdjustment`: `BigNumber`; \}\>

Defined in: [packages/sdk/contractkit/src/wrappers/EpochRewards.ts:8](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/EpochRewards.ts#L8)

#### Parameters

##### args

...\[\]

#### Returns

`Promise`\<\{ `max`: `BigNumber`; `overspendAdjustment`: `BigNumber`; `underspendAdjustment`: `BigNumber`; \}\>

***

### getTargetValidatorEpochPayment()

> **getTargetValidatorEpochPayment**: (...`args`) => `Promise`\<`BigNumber`\>

Defined in: [packages/sdk/contractkit/src/wrappers/EpochRewards.ts:43](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/EpochRewards.ts#L43)

#### Parameters

##### args

...\[\]

#### Returns

`Promise`\<`BigNumber`\>

***

### getTargetVotingYieldParameters()

> **getTargetVotingYieldParameters**: (...`args`) => `Promise`\<\{ `adjustment`: `BigNumber`; `max`: `BigNumber`; `target`: `BigNumber`; \}\>

Defined in: [packages/sdk/contractkit/src/wrappers/EpochRewards.ts:18](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/EpochRewards.ts#L18)

#### Parameters

##### args

...\[\]

#### Returns

`Promise`\<\{ `adjustment`: `BigNumber`; `max`: `BigNumber`; `target`: `BigNumber`; \}\>

***

### methodIds

> **methodIds**: `Record`\<`"checkProofOfPossession"` \| `"fractionMulExp"` \| `"getBlockNumberFromHeader"` \| `"getEpochNumber"` \| `"getEpochNumberOfBlock"` \| `"getEpochSize"` \| `"getParentSealBitmap"` \| `"getVerifiedSealBitmapFromHeader"` \| `"hashHeader"` \| `"initialized"` \| `"isOwner"` \| `"minQuorumSize"` \| `"minQuorumSizeInCurrentSet"` \| `"numberValidatorsInCurrentSet"` \| `"numberValidatorsInSet"` \| `"owner"` \| `"registry"` \| `"renounceOwnership"` \| `"setRegistry"` \| `"transferOwnership"` \| `"validatorSignerAddressFromCurrentSet"` \| `"validatorSignerAddressFromSet"` \| `"initialize"` \| `"getVersionNumber"` \| `"carbonOffsettingPartner"` \| `"startTime"` \| `"targetValidatorEpochPayment"` \| `"getTargetVotingYieldParameters"` \| `"getRewardsMultiplierParameters"` \| `"setCommunityRewardFraction"` \| `"getCommunityRewardFraction"` \| `"setCarbonOffsettingFund"` \| `"getCarbonOffsettingFraction"` \| `"setTargetVotingGoldFraction"` \| `"getTargetVotingGoldFraction"` \| `"setTargetValidatorEpochPayment"` \| `"setRewardsMultiplierParameters"` \| `"setTargetVotingYieldParameters"` \| `"setTargetVotingYield"` \| `"getTargetGoldTotalSupply"` \| `"getTargetVoterRewards"` \| `"getTargetTotalEpochPaymentsInGold"` \| `"getRewardsMultiplier"` \| `"getVotingGoldFraction"` \| `"updateTargetVotingYield"` \| `"isReserveLow"` \| `"calculateTargetEpochRewards"`, `string`\>

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

### getCarbonOffsetting()

> **getCarbonOffsetting**(): `Promise`\<\{ `factor`: `BigNumber`; `partner`: `string`; \}\>

Defined in: [packages/sdk/contractkit/src/wrappers/EpochRewards.ts:34](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/EpochRewards.ts#L34)

#### Returns

`Promise`\<\{ `factor`: `BigNumber`; `partner`: `string`; \}\>

***

### getConfig()

> **getConfig**(): `Promise`\<\{ `carbonOffsetting`: \{ `factor`: `BigNumber`; `partner`: `string`; \}; `communityReward`: `BigNumber`; `rewardsMultiplier`: \{ `max`: `BigNumber`; `overspendAdjustment`: `BigNumber`; `underspendAdjustment`: `BigNumber`; \}; `targetValidatorEpochPayment`: `BigNumber`; `targetVotingYield`: \{ `adjustment`: `BigNumber`; `max`: `BigNumber`; `target`: `BigNumber`; \}; \}\>

Defined in: [packages/sdk/contractkit/src/wrappers/EpochRewards.ts:49](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/EpochRewards.ts#L49)

#### Returns

`Promise`\<\{ `carbonOffsetting`: \{ `factor`: `BigNumber`; `partner`: `string`; \}; `communityReward`: `BigNumber`; `rewardsMultiplier`: \{ `max`: `BigNumber`; `overspendAdjustment`: `BigNumber`; `underspendAdjustment`: `BigNumber`; \}; `targetValidatorEpochPayment`: `BigNumber`; `targetVotingYield`: \{ `adjustment`: `BigNumber`; `max`: `BigNumber`; `target`: `BigNumber`; \}; \}\>

***

### getPastEvents()

> **getPastEvents**(`event`, `options`): `Promise`\<`EventLog`[]\>

Defined in: [packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:57](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L57)

Contract getPastEvents

#### Parameters

##### event

`"OwnershipTransferred"` | `"RegistrySet"` | `"allEvents"` | `"CarbonOffsettingFundSet"` | `"CommunityRewardFractionSet"` | `"RewardsMultiplierParametersSet"` | `"TargetValidatorEpochPaymentSet"` | `"TargetVotingGoldFractionSet"` | `"TargetVotingYieldParametersSet"` | `"TargetVotingYieldSet"` | `"TargetVotingYieldUpdated"`

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
