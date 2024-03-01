[@celo/contractkit](../README.md) / [Exports](../modules.md) / [wrappers/GasPriceMinimum](../modules/wrappers_GasPriceMinimum.md) / GasPriceMinimumWrapper

# Class: GasPriceMinimumWrapper

[wrappers/GasPriceMinimum](../modules/wrappers_GasPriceMinimum.md).GasPriceMinimumWrapper

Stores the gas price minimum

## Hierarchy

- [`BaseWrapper`](wrappers_BaseWrapper.BaseWrapper.md)\<`GasPriceMinimum`\>

  ↳ **`GasPriceMinimumWrapper`**

## Table of contents

### Constructors

- [constructor](wrappers_GasPriceMinimum.GasPriceMinimumWrapper.md#constructor)

### Properties

- [adjustmentSpeed](wrappers_GasPriceMinimum.GasPriceMinimumWrapper.md#adjustmentspeed)
- [eventTypes](wrappers_GasPriceMinimum.GasPriceMinimumWrapper.md#eventtypes)
- [events](wrappers_GasPriceMinimum.GasPriceMinimumWrapper.md#events)
- [gasPriceMinimum](wrappers_GasPriceMinimum.GasPriceMinimumWrapper.md#gaspriceminimum)
- [getGasPriceMinimum](wrappers_GasPriceMinimum.GasPriceMinimumWrapper.md#getgaspriceminimum)
- [methodIds](wrappers_GasPriceMinimum.GasPriceMinimumWrapper.md#methodids)
- [targetDensity](wrappers_GasPriceMinimum.GasPriceMinimumWrapper.md#targetdensity)

### Accessors

- [address](wrappers_GasPriceMinimum.GasPriceMinimumWrapper.md#address)

### Methods

- [getConfig](wrappers_GasPriceMinimum.GasPriceMinimumWrapper.md#getconfig)
- [getPastEvents](wrappers_GasPriceMinimum.GasPriceMinimumWrapper.md#getpastevents)
- [version](wrappers_GasPriceMinimum.GasPriceMinimumWrapper.md#version)

## Constructors

### constructor

• **new GasPriceMinimumWrapper**(`connection`, `contract`): [`GasPriceMinimumWrapper`](wrappers_GasPriceMinimum.GasPriceMinimumWrapper.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `connection` | `Connection` |
| `contract` | `GasPriceMinimum` |

#### Returns

[`GasPriceMinimumWrapper`](wrappers_GasPriceMinimum.GasPriceMinimumWrapper.md)

#### Inherited from

[BaseWrapper](wrappers_BaseWrapper.BaseWrapper.md).[constructor](wrappers_BaseWrapper.BaseWrapper.md#constructor)

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:34](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L34)

## Properties

### adjustmentSpeed

• **adjustmentSpeed**: (...`args`: []) => `Promise`\<`BigNumber`\>

Query adjustment speed parameter

#### Type declaration

▸ (`...args`): `Promise`\<`BigNumber`\>

Query adjustment speed parameter

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [] |

##### Returns

`Promise`\<`BigNumber`\>

multiplier that impacts how quickly gas price minimum is adjusted.

#### Defined in

[packages/sdk/contractkit/src/wrappers/GasPriceMinimum.ts:44](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/GasPriceMinimum.ts#L44)

___

### eventTypes

• **eventTypes**: `EventsEnum`\<`GasPriceMinimum`\>

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
| `AdjustmentSpeedSet` | `ContractEvent`\<`string`\> |
| `BaseFeeOpCodeActivationBlockSet` | `ContractEvent`\<`string`\> |
| `GasPriceMinimumFloorSet` | `ContractEvent`\<`string`\> |
| `GasPriceMinimumUpdated` | `ContractEvent`\<`string`\> |
| `OwnershipTransferred` | `ContractEvent`\<\{ `0`: `string` ; `1`: `string` ; `newOwner`: `string` ; `previousOwner`: `string`  }\> |
| `RegistrySet` | `ContractEvent`\<`string`\> |
| `TargetDensitySet` | `ContractEvent`\<`string`\> |
| `allEvents` | (`options?`: `EventOptions`, `cb?`: `Callback`\<`EventLog`\>) => `EventEmitter` |

#### Inherited from

[BaseWrapper](wrappers_BaseWrapper.BaseWrapper.md).[events](wrappers_BaseWrapper.BaseWrapper.md#events)

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:61](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L61)

___

### gasPriceMinimum

• **gasPriceMinimum**: (...`args`: []) => `Promise`\<`BigNumber`\>

Query current gas price minimum in CELO.

#### Type declaration

▸ (`...args`): `Promise`\<`BigNumber`\>

Query current gas price minimum in CELO.

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [] |

##### Returns

`Promise`\<`BigNumber`\>

current gas price minimum in CELO

#### Defined in

[packages/sdk/contractkit/src/wrappers/GasPriceMinimum.ts:19](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/GasPriceMinimum.ts#L19)

___

### getGasPriceMinimum

• **getGasPriceMinimum**: (...`args`: [tokenAddress: string]) => `Promise`\<`BigNumber`\>

Query current gas price minimum.

#### Type declaration

▸ (`...args`): `Promise`\<`BigNumber`\>

Query current gas price minimum.

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [tokenAddress: string] |

##### Returns

`Promise`\<`BigNumber`\>

current gas price minimum in the requested currency

#### Defined in

[packages/sdk/contractkit/src/wrappers/GasPriceMinimum.ts:25](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/GasPriceMinimum.ts#L25)

___

### methodIds

• **methodIds**: `Record`\<``"gasPriceMinimum"`` \| ``"targetDensity"`` \| ``"adjustmentSpeed"`` \| ``"initialized"`` \| ``"owner"`` \| ``"registry"`` \| ``"renounceOwnership"`` \| ``"setRegistry"`` \| ``"transferOwnership"`` \| ``"getVersionNumber"`` \| ``"initialize"`` \| ``"baseFeeOpCodeActivationBlock"`` \| ``"deprecated_gasPriceMinimum"`` \| ``"gasPriceMinimumFloor"`` \| ``"setAdjustmentSpeed"`` \| ``"setTargetDensity"`` \| ``"setGasPriceMinimumFloor"`` \| ``"setBaseFeeOpCodeActivationBlock"`` \| ``"getGasPriceMinimum"`` \| ``"updateGasPriceMinimum"`` \| ``"getUpdatedGasPriceMinimum"``, `string`\>

#### Inherited from

[BaseWrapper](wrappers_BaseWrapper.BaseWrapper.md).[methodIds](wrappers_BaseWrapper.BaseWrapper.md#methodids)

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:68](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L68)

___

### targetDensity

• **targetDensity**: (...`args`: []) => `Promise`\<`BigNumber`\>

Query target density parameter.

#### Type declaration

▸ (`...args`): `Promise`\<`BigNumber`\>

Query target density parameter.

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [] |

##### Returns

`Promise`\<`BigNumber`\>

the current block density targeted by the gas price minimum algorithm.

#### Defined in

[packages/sdk/contractkit/src/wrappers/GasPriceMinimum.ts:35](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/GasPriceMinimum.ts#L35)

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

▸ **getConfig**(): `Promise`\<[`GasPriceMinimumConfig`](../interfaces/wrappers_GasPriceMinimum.GasPriceMinimumConfig.md)\>

Returns current configuration parameters.

#### Returns

`Promise`\<[`GasPriceMinimumConfig`](../interfaces/wrappers_GasPriceMinimum.GasPriceMinimumConfig.md)\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/GasPriceMinimum.ts:52](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/GasPriceMinimum.ts#L52)

___

### getPastEvents

▸ **getPastEvents**(`event`, `options`): `Promise`\<`EventLog`[]\>

Contract getPastEvents

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"OwnershipTransferred"`` \| ``"RegistrySet"`` \| ``"allEvents"`` \| ``"AdjustmentSpeedSet"`` \| ``"BaseFeeOpCodeActivationBlockSet"`` \| ``"GasPriceMinimumFloorSet"`` \| ``"GasPriceMinimumUpdated"`` \| ``"TargetDensitySet"`` |
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
