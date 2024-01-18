[@celo/contractkit](../README.md) / [Exports](../modules.md) / [wrappers/DowntimeSlasher](../modules/wrappers_DowntimeSlasher.md) / DowntimeSlasherWrapper

# Class: DowntimeSlasherWrapper

[wrappers/DowntimeSlasher](../modules/wrappers_DowntimeSlasher.md).DowntimeSlasherWrapper

Contract handling slashing for Validator downtime using intervals.

## Hierarchy

- [`BaseSlasher`](wrappers_BaseSlasher.BaseSlasher.md)\<`DowntimeSlasher`\>

  ↳ **`DowntimeSlasherWrapper`**

## Table of contents

### Constructors

- [constructor](wrappers_DowntimeSlasher.DowntimeSlasherWrapper.md#constructor)

### Properties

- [eventTypes](wrappers_DowntimeSlasher.DowntimeSlasherWrapper.md#eventtypes)
- [events](wrappers_DowntimeSlasher.DowntimeSlasherWrapper.md#events)
- [getBitmapForInterval](wrappers_DowntimeSlasher.DowntimeSlasherWrapper.md#getbitmapforinterval)
- [isBitmapSetForInterval](wrappers_DowntimeSlasher.DowntimeSlasherWrapper.md#isbitmapsetforinterval)
- [lastSlashedBlock](wrappers_DowntimeSlasher.DowntimeSlasherWrapper.md#lastslashedblock)
- [methodIds](wrappers_DowntimeSlasher.DowntimeSlasherWrapper.md#methodids)
- [setBitmapForInterval](wrappers_DowntimeSlasher.DowntimeSlasherWrapper.md#setbitmapforinterval)
- [slashableDowntime](wrappers_DowntimeSlasher.DowntimeSlasherWrapper.md#slashabledowntime)
- [slashingIncentives](wrappers_DowntimeSlasher.DowntimeSlasherWrapper.md#slashingincentives)

### Accessors

- [address](wrappers_DowntimeSlasher.DowntimeSlasherWrapper.md#address)

### Methods

- [getConfig](wrappers_DowntimeSlasher.DowntimeSlasherWrapper.md#getconfig)
- [getHumanReadableConfig](wrappers_DowntimeSlasher.DowntimeSlasherWrapper.md#gethumanreadableconfig)
- [getPastEvents](wrappers_DowntimeSlasher.DowntimeSlasherWrapper.md#getpastevents)
- [isBitmapSetForIntervals](wrappers_DowntimeSlasher.DowntimeSlasherWrapper.md#isbitmapsetforintervals)
- [slashValidator](wrappers_DowntimeSlasher.DowntimeSlasherWrapper.md#slashvalidator)
- [slashableDowntimeIntervalsBefore](wrappers_DowntimeSlasher.DowntimeSlasherWrapper.md#slashabledowntimeintervalsbefore)
- [version](wrappers_DowntimeSlasher.DowntimeSlasherWrapper.md#version)
- [wasValidatorDownForInterval](wrappers_DowntimeSlasher.DowntimeSlasherWrapper.md#wasvalidatordownforinterval)
- [wasValidatorDownForIntervals](wrappers_DowntimeSlasher.DowntimeSlasherWrapper.md#wasvalidatordownforintervals)

## Constructors

### constructor

• **new DowntimeSlasherWrapper**(`connection`, `contract`, `contracts`): [`DowntimeSlasherWrapper`](wrappers_DowntimeSlasher.DowntimeSlasherWrapper.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `connection` | `Connection` |
| `contract` | `DowntimeSlasher` |
| `contracts` | `ContractWrappersForVotingAndRules` |

#### Returns

[`DowntimeSlasherWrapper`](wrappers_DowntimeSlasher.DowntimeSlasherWrapper.md)

#### Inherited from

[BaseSlasher](wrappers_BaseSlasher.BaseSlasher.md).[constructor](wrappers_BaseSlasher.BaseSlasher.md#constructor)

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapperForGoverning.ts:21](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapperForGoverning.ts#L21)

## Properties

### eventTypes

• **eventTypes**: `EventsEnum`\<`DowntimeSlasher`\>

#### Inherited from

[BaseSlasher](wrappers_BaseSlasher.BaseSlasher.md).[eventTypes](wrappers_BaseSlasher.BaseSlasher.md#eventtypes)

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:63](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L63)

___

### events

• **events**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `BitmapSetForInterval` | `ContractEvent`\<\{ `0`: `string` ; `1`: `string` ; `2`: `string` ; `3`: `string` ; `bitmap`: `string` ; `endBlock`: `string` ; `sender`: `string` ; `startBlock`: `string`  }\> |
| `DowntimeSlashPerformed` | `ContractEvent`\<\{ `0`: `string` ; `1`: `string` ; `2`: `string` ; `endBlock`: `string` ; `startBlock`: `string` ; `validator`: `string`  }\> |
| `OwnershipTransferred` | `ContractEvent`\<\{ `0`: `string` ; `1`: `string` ; `newOwner`: `string` ; `previousOwner`: `string`  }\> |
| `RegistrySet` | `ContractEvent`\<`string`\> |
| `SlashableDowntimeSet` | `ContractEvent`\<`string`\> |
| `SlashingIncentivesSet` | `ContractEvent`\<\{ `0`: `string` ; `1`: `string` ; `penalty`: `string` ; `reward`: `string`  }\> |
| `allEvents` | (`options?`: `EventOptions`, `cb?`: `Callback`\<`EventLog`\>) => `EventEmitter` |

#### Inherited from

[BaseSlasher](wrappers_BaseSlasher.BaseSlasher.md).[events](wrappers_BaseSlasher.BaseSlasher.md#events)

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:61](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L61)

___

### getBitmapForInterval

• **getBitmapForInterval**: (...`args`: [interval: Interval]) => `Promise`\<`string`\>

Calculates and returns the signature bitmap for the specified interval.
Similar to the parentSealBitmap of every block (where you have which validators were
able to sign the previous block), this bitmap shows for that specific interval which
validators signed at least one block

**`Param`**

First and last block of the interval.

**`Dev`**

startBlock and endBlock must be in the same epoch.

**`Dev`**

The getParentSealBitmap precompile requires that startBlock must be within 4 epochs of
the current block.

#### Type declaration

▸ (`...args`): `Promise`\<`string`\>

Calculates and returns the signature bitmap for the specified interval.
Similar to the parentSealBitmap of every block (where you have which validators were
able to sign the previous block), this bitmap shows for that specific interval which
validators signed at least one block

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [interval: Interval] |

##### Returns

`Promise`\<`string`\>

(string) The signature uptime bitmap for the specified interval.

**`Dev`**

startBlock and endBlock must be in the same epoch.

**`Dev`**

The getParentSealBitmap precompile requires that startBlock must be within 4 epochs of
the current block.

#### Defined in

[packages/sdk/contractkit/src/wrappers/DowntimeSlasher.ts:73](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/DowntimeSlasher.ts#L73)

___

### isBitmapSetForInterval

• **isBitmapSetForInterval**: (...`args`: [interval: Interval]) => `Promise`\<`boolean`\>

Shows if the user already called the `setBitmapForInterval` for
the specific interval.

**`Param`**

First and last block of the interval.

#### Type declaration

▸ (`...args`): `Promise`\<`boolean`\>

Shows if the user already called the `setBitmapForInterval` for
the specific interval.

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [interval: Interval] |

##### Returns

`Promise`\<`boolean`\>

True if the user already called the `setBitmapForInterval` for
the specific interval.

#### Defined in

[packages/sdk/contractkit/src/wrappers/DowntimeSlasher.ts:126](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/DowntimeSlasher.ts#L126)

___

### lastSlashedBlock

• **lastSlashedBlock**: (...`args`: [arg0: string]) => `Promise`\<`number`\>

#### Type declaration

▸ (`...args`): `Promise`\<`number`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [arg0: string] |

##### Returns

`Promise`\<`number`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/DowntimeSlasher.ts:140](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/DowntimeSlasher.ts#L140)

___

### methodIds

• **methodIds**: `Record`\<``"slash"`` \| ``"slashingIncentives"`` \| ``"slashableDowntime"`` \| ``"checkProofOfPossession"`` \| ``"fractionMulExp"`` \| ``"getBlockNumberFromHeader"`` \| ``"getEpochNumber"`` \| ``"getEpochNumberOfBlock"`` \| ``"getEpochSize"`` \| ``"getParentSealBitmap"`` \| ``"getVerifiedSealBitmapFromHeader"`` \| ``"hashHeader"`` \| ``"initialized"`` \| ``"isOwner"`` \| ``"minQuorumSize"`` \| ``"minQuorumSizeInCurrentSet"`` \| ``"numberValidatorsInCurrentSet"`` \| ``"numberValidatorsInSet"`` \| ``"owner"`` \| ``"registry"`` \| ``"renounceOwnership"`` \| ``"setRegistry"`` \| ``"transferOwnership"`` \| ``"validatorSignerAddressFromCurrentSet"`` \| ``"validatorSignerAddressFromSet"`` \| ``"getVersionNumber"`` \| ``"initialize"`` \| ``"bitmaps"`` \| ``"groupMembershipAtBlock"`` \| ``"lastSlashedBlock"`` \| ``"setSlashingIncentives"`` \| ``"setSlashableDowntime"`` \| ``"getBitmapForInterval"`` \| ``"setBitmapForInterval"`` \| ``"wasDownForInterval"`` \| ``"isBitmapSetForInterval"`` \| ``"wasDownForIntervals"``, `string`\>

#### Inherited from

[BaseSlasher](wrappers_BaseSlasher.BaseSlasher.md).[methodIds](wrappers_BaseSlasher.BaseSlasher.md#methodids)

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:68](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L68)

___

### setBitmapForInterval

• **setBitmapForInterval**: (...`args`: [interval: Interval]) => `CeloTransactionObject`\<`string`\>

Calculates and sets the signature bitmap for the specified interval.

**`Param`**

First and last block of the interval.

**`Dev`**

interval.start and interval.end must be in the same epoch.

#### Type declaration

▸ (`...args`): `CeloTransactionObject`\<`string`\>

Calculates and sets the signature bitmap for the specified interval.

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [interval: Interval] |

##### Returns

`CeloTransactionObject`\<`string`\>

The signature bitmap for the specified interval.

**`Dev`**

interval.start and interval.end must be in the same epoch.

#### Defined in

[packages/sdk/contractkit/src/wrappers/DowntimeSlasher.ts:85](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/DowntimeSlasher.ts#L85)

___

### slashableDowntime

• **slashableDowntime**: (...`args`: []) => `Promise`\<`number`\>

Returns slashable downtime in blocks.

#### Type declaration

▸ (`...args`): `Promise`\<`number`\>

Returns slashable downtime in blocks.

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [] |

##### Returns

`Promise`\<`number`\>

The number of consecutive blocks before a Validator missing from IBFT consensus
can be slashed.

#### Defined in

[packages/sdk/contractkit/src/wrappers/DowntimeSlasher.ts:37](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/DowntimeSlasher.ts#L37)

___

### slashingIncentives

• **slashingIncentives**: (...`args`: []) => `Promise`\<\{ `penalty`: `BigNumber` ; `reward`: `BigNumber`  }\>

Returns slashing incentives.

#### Type declaration

▸ (`...args`): `Promise`\<\{ `penalty`: `BigNumber` ; `reward`: `BigNumber`  }\>

Returns slashing incentives.

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [] |

##### Returns

`Promise`\<\{ `penalty`: `BigNumber` ; `reward`: `BigNumber`  }\>

Rewards and penalties for slashing.

#### Inherited from

[BaseSlasher](wrappers_BaseSlasher.BaseSlasher.md).[slashingIncentives](wrappers_BaseSlasher.BaseSlasher.md#slashingincentives)

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseSlasher.ts:70](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseSlasher.ts#L70)

## Accessors

### address

• `get` **address**(): `string`

Contract address

#### Returns

`string`

#### Inherited from

BaseSlasher.address

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:37](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L37)

## Methods

### getConfig

▸ **getConfig**(): `Promise`\<[`DowntimeSlasherConfig`](../interfaces/wrappers_DowntimeSlasher.DowntimeSlasherConfig.md)\>

Returns current configuration parameters.

#### Returns

`Promise`\<[`DowntimeSlasherConfig`](../interfaces/wrappers_DowntimeSlasher.DowntimeSlasherConfig.md)\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/DowntimeSlasher.ts:42](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/DowntimeSlasher.ts#L42)

___

### getHumanReadableConfig

▸ **getHumanReadableConfig**(): `Promise`\<\{ `slashableDowntime`: `string` ; `slashingIncentives`: \{ `penalty`: `BigNumber` ; `reward`: `BigNumber`  }  }\>

#### Returns

`Promise`\<\{ `slashableDowntime`: `string` ; `slashingIncentives`: \{ `penalty`: `BigNumber` ; `reward`: `BigNumber`  }  }\>

DowntimeSlasherConfig object

**`Dev`**

Returns human readable configuration of the downtime slasher contract

#### Defined in

[packages/sdk/contractkit/src/wrappers/DowntimeSlasher.ts:54](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/DowntimeSlasher.ts#L54)

___

### getPastEvents

▸ **getPastEvents**(`event`, `options`): `Promise`\<`EventLog`[]\>

Contract getPastEvents

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"OwnershipTransferred"`` \| ``"RegistrySet"`` \| ``"allEvents"`` \| ``"BitmapSetForInterval"`` \| ``"DowntimeSlashPerformed"`` \| ``"SlashableDowntimeSet"`` \| ``"SlashingIncentivesSet"`` |
| `options` | `PastEventOptions` |

#### Returns

`Promise`\<`EventLog`[]\>

#### Inherited from

[BaseSlasher](wrappers_BaseSlasher.BaseSlasher.md).[getPastEvents](wrappers_BaseSlasher.BaseSlasher.md#getpastevents)

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:57](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L57)

___

### isBitmapSetForIntervals

▸ **isBitmapSetForIntervals**(`intervals`): `Promise`\<`boolean`\>

Shows if the user already called the `setBitmapForInterval` for intervals.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `intervals` | [`Interval`](../interfaces/wrappers_DowntimeSlasher.Interval.md)[] | First and last block of the interval. |

#### Returns

`Promise`\<`boolean`\>

True if the user already called the `setBitmapForInterval` for intervals.

#### Defined in

[packages/sdk/contractkit/src/wrappers/DowntimeSlasher.ts:133](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/DowntimeSlasher.ts#L133)

___

### slashValidator

▸ **slashValidator**(`address`, `intervals`): `Promise`\<`CeloTransactionObject`\<`void`\>\>

Returns true if the validator did not sign any blocks for the specified overlapping or adjacent
intervals.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `address` | `string` | Address of the validator account or signer. |
| `intervals` | [`Interval`](../interfaces/wrappers_DowntimeSlasher.Interval.md)[] | A list of ordered intervals for which signature bitmaps have already been set. |

#### Returns

`Promise`\<`CeloTransactionObject`\<`void`\>\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/DowntimeSlasher.ts:174](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/DowntimeSlasher.ts#L174)

___

### slashableDowntimeIntervalsBefore

▸ **slashableDowntimeIntervalsBefore**(`block?`, `maximumLength?`): `Promise`\<[`Interval`](../interfaces/wrappers_DowntimeSlasher.Interval.md)[]\>

Calculates intervals which span `slashableDowntime` before provided block.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `block?` | `number` | `undefined` | Block number to build intervals before. |
| `maximumLength` | `number` | `4000` | Maximum length for any interval (limited by gas limit). |

#### Returns

`Promise`\<[`Interval`](../interfaces/wrappers_DowntimeSlasher.Interval.md)[]\>

The signature bitmap for the specified interval.

**`Dev`**

if block is undefined, latest will be used

#### Defined in

[packages/sdk/contractkit/src/wrappers/DowntimeSlasher.ts:98](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/DowntimeSlasher.ts#L98)

___

### version

▸ **version**(): `Promise`\<[`ContractVersion`](versions.ContractVersion.md)\>

#### Returns

`Promise`\<[`ContractVersion`](versions.ContractVersion.md)\>

#### Inherited from

[BaseSlasher](wrappers_BaseSlasher.BaseSlasher.md).[version](wrappers_BaseSlasher.BaseSlasher.md#version)

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:41](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L41)

___

### wasValidatorDownForInterval

▸ **wasValidatorDownForInterval**(`address`, `interval`): `Promise`\<`boolean`\>

Tests if the given validator or signer did not sign any blocks in the interval.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `address` | `string` | Address of the validator account or signer. |
| `interval` | [`Interval`](../interfaces/wrappers_DowntimeSlasher.Interval.md) | First and last block of the interval. |

#### Returns

`Promise`\<`boolean`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/DowntimeSlasher.ts:147](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/DowntimeSlasher.ts#L147)

___

### wasValidatorDownForIntervals

▸ **wasValidatorDownForIntervals**(`address`, `intervals`): `Promise`\<`boolean`\>

Returns true if the validator did not sign any blocks for the specified overlapping or adjacent
intervals.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `address` | `string` | Address of the validator account or signer. |
| `intervals` | [`Interval`](../interfaces/wrappers_DowntimeSlasher.Interval.md)[] |  |

#### Returns

`Promise`\<`boolean`\>

True if the validator signature does not appear in any block within the window.

#### Defined in

[packages/sdk/contractkit/src/wrappers/DowntimeSlasher.ts:161](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/DowntimeSlasher.ts#L161)
