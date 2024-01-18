[@celo/contractkit](../README.md) / [Exports](../modules.md) / [wrappers/Reserve](../modules/wrappers_Reserve.md) / ReserveWrapper

# Class: ReserveWrapper

[wrappers/Reserve](../modules/wrappers_Reserve.md).ReserveWrapper

Contract for handling reserve for stable currencies

## Hierarchy

- [`BaseWrapper`](wrappers_BaseWrapper.BaseWrapper.md)\<`Reserve`\>

  ↳ **`ReserveWrapper`**

## Table of contents

### Constructors

- [constructor](wrappers_Reserve.ReserveWrapper.md#constructor)

### Properties

- [dailySpendingRatio](wrappers_Reserve.ReserveWrapper.md#dailyspendingratio)
- [eventTypes](wrappers_Reserve.ReserveWrapper.md#eventtypes)
- [events](wrappers_Reserve.ReserveWrapper.md#events)
- [frozenReserveGoldDays](wrappers_Reserve.ReserveWrapper.md#frozenreservegolddays)
- [frozenReserveGoldStartBalance](wrappers_Reserve.ReserveWrapper.md#frozenreservegoldstartbalance)
- [frozenReserveGoldStartDay](wrappers_Reserve.ReserveWrapper.md#frozenreservegoldstartday)
- [getAssetAllocationSymbols](wrappers_Reserve.ReserveWrapper.md#getassetallocationsymbols)
- [getAssetAllocationWeights](wrappers_Reserve.ReserveWrapper.md#getassetallocationweights)
- [getOrComputeTobinTax](wrappers_Reserve.ReserveWrapper.md#getorcomputetobintax)
- [getOtherReserveAddresses](wrappers_Reserve.ReserveWrapper.md#getotherreserveaddresses)
- [getReserveCeloBalance](wrappers_Reserve.ReserveWrapper.md#getreservecelobalance)
- [getReserveGoldBalance](wrappers_Reserve.ReserveWrapper.md#getreservegoldbalance)
- [getUnfrozenBalance](wrappers_Reserve.ReserveWrapper.md#getunfrozenbalance)
- [getUnfrozenReserveCeloBalance](wrappers_Reserve.ReserveWrapper.md#getunfrozenreservecelobalance)
- [isOtherReserveAddress](wrappers_Reserve.ReserveWrapper.md#isotherreserveaddress)
- [isSpender](wrappers_Reserve.ReserveWrapper.md#isspender)
- [methodIds](wrappers_Reserve.ReserveWrapper.md#methodids)
- [tobinTaxStalenessThreshold](wrappers_Reserve.ReserveWrapper.md#tobintaxstalenessthreshold)
- [transferGold](wrappers_Reserve.ReserveWrapper.md#transfergold)

### Accessors

- [address](wrappers_Reserve.ReserveWrapper.md#address)

### Methods

- [getConfig](wrappers_Reserve.ReserveWrapper.md#getconfig)
- [getPastEvents](wrappers_Reserve.ReserveWrapper.md#getpastevents)
- [getSpenders](wrappers_Reserve.ReserveWrapper.md#getspenders)
- [version](wrappers_Reserve.ReserveWrapper.md#version)

## Constructors

### constructor

• **new ReserveWrapper**(`connection`, `contract`): [`ReserveWrapper`](wrappers_Reserve.ReserveWrapper.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `connection` | `Connection` |
| `contract` | `Reserve` |

#### Returns

[`ReserveWrapper`](wrappers_Reserve.ReserveWrapper.md)

#### Inherited from

[BaseWrapper](wrappers_BaseWrapper.BaseWrapper.md).[constructor](wrappers_BaseWrapper.BaseWrapper.md#constructor)

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:34](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L34)

## Properties

### dailySpendingRatio

• **dailySpendingRatio**: (...`args`: []) => `Promise`\<`BigNumber`\>

#### Type declaration

▸ (`...args`): `Promise`\<`BigNumber`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [] |

##### Returns

`Promise`\<`BigNumber`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/Reserve.ts:33](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Reserve.ts#L33)

___

### eventTypes

• **eventTypes**: `EventsEnum`\<`Reserve`\>

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
| `AssetAllocationSet` | `ContractEvent`\<\{ `0`: `string`[] ; `1`: `string`[] ; `symbols`: `string`[] ; `weights`: `string`[]  }\> |
| `DailySpendingRatioSet` | `ContractEvent`\<`string`\> |
| `ExchangeSpenderAdded` | `ContractEvent`\<`string`\> |
| `ExchangeSpenderRemoved` | `ContractEvent`\<`string`\> |
| `OtherReserveAddressAdded` | `ContractEvent`\<`string`\> |
| `OtherReserveAddressRemoved` | `ContractEvent`\<\{ `0`: `string` ; `1`: `string` ; `index`: `string` ; `otherReserveAddress`: `string`  }\> |
| `OwnershipTransferred` | `ContractEvent`\<\{ `0`: `string` ; `1`: `string` ; `newOwner`: `string` ; `previousOwner`: `string`  }\> |
| `RegistrySet` | `ContractEvent`\<`string`\> |
| `ReserveGoldTransferred` | `ContractEvent`\<\{ `0`: `string` ; `1`: `string` ; `2`: `string` ; `spender`: `string` ; `to`: `string` ; `value`: `string`  }\> |
| `SpenderAdded` | `ContractEvent`\<`string`\> |
| `SpenderRemoved` | `ContractEvent`\<`string`\> |
| `TobinTaxReserveRatioSet` | `ContractEvent`\<`string`\> |
| `TobinTaxSet` | `ContractEvent`\<`string`\> |
| `TobinTaxStalenessThresholdSet` | `ContractEvent`\<`string`\> |
| `TokenAdded` | `ContractEvent`\<`string`\> |
| `TokenRemoved` | `ContractEvent`\<\{ `0`: `string` ; `1`: `string` ; `index`: `string` ; `token`: `string`  }\> |
| `allEvents` | (`options?`: `EventOptions`, `cb?`: `Callback`\<`EventLog`\>) => `EventEmitter` |

#### Inherited from

[BaseWrapper](wrappers_BaseWrapper.BaseWrapper.md).[events](wrappers_BaseWrapper.BaseWrapper.md#events)

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:61](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L61)

___

### frozenReserveGoldDays

• **frozenReserveGoldDays**: (...`args`: []) => `Promise`\<`BigNumber`\>

#### Type declaration

▸ (`...args`): `Promise`\<`BigNumber`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [] |

##### Returns

`Promise`\<`BigNumber`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/Reserve.ts:51](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Reserve.ts#L51)

___

### frozenReserveGoldStartBalance

• **frozenReserveGoldStartBalance**: (...`args`: []) => `Promise`\<`BigNumber`\>

#### Type declaration

▸ (`...args`): `Promise`\<`BigNumber`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [] |

##### Returns

`Promise`\<`BigNumber`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/Reserve.ts:41](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Reserve.ts#L41)

___

### frozenReserveGoldStartDay

• **frozenReserveGoldStartDay**: (...`args`: []) => `Promise`\<`BigNumber`\>

#### Type declaration

▸ (`...args`): `Promise`\<`BigNumber`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [] |

##### Returns

`Promise`\<`BigNumber`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/Reserve.ts:46](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Reserve.ts#L46)

___

### getAssetAllocationSymbols

• **getAssetAllocationSymbols**: (...`args`: []) => `Promise`\<`string`[]\>

**`Notice`**

Returns a list of token symbols that have been allocated.

#### Type declaration

▸ (`...args`): `Promise`\<`string`[]\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [] |

##### Returns

`Promise`\<`string`[]\>

An array of token symbols that have been allocated.

**`Notice`**

Returns a list of token symbols that have been allocated.

#### Defined in

[packages/sdk/contractkit/src/wrappers/Reserve.ts:71](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Reserve.ts#L71)

___

### getAssetAllocationWeights

• **getAssetAllocationWeights**: (...`args`: []) => `Promise`\<`BigNumber`[]\>

**`Notice`**

Returns a list of weights used for the allocation of reserve assets.

#### Type declaration

▸ (`...args`): `Promise`\<`BigNumber`[]\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [] |

##### Returns

`Promise`\<`BigNumber`[]\>

An array of a list of weights used for the allocation of reserve assets.

**`Notice`**

Returns a list of weights used for the allocation of reserve assets.

#### Defined in

[packages/sdk/contractkit/src/wrappers/Reserve.ts:61](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Reserve.ts#L61)

___

### getOrComputeTobinTax

• **getOrComputeTobinTax**: (...`args`: []) => `CeloTransactionObject`\<\{ `0`: `string` ; `1`: `string`  }\>

#### Type declaration

▸ (`...args`): `CeloTransactionObject`\<\{ `0`: `string` ; `1`: `string`  }\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [] |

##### Returns

`CeloTransactionObject`\<\{ `0`: `string` ; `1`: `string`  }\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/Reserve.ts:40](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Reserve.ts#L40)

___

### getOtherReserveAddresses

• **getOtherReserveAddresses**: (...`args`: []) => `Promise`\<`string`[]\>

#### Type declaration

▸ (`...args`): `Promise`\<`string`[]\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [] |

##### Returns

`Promise`\<`string`[]\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/Reserve.ts:115](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Reserve.ts#L115)

___

### getReserveCeloBalance

• **getReserveCeloBalance**: (...`args`: []) => `Promise`\<`BigNumber`\>

**`Notice`**

Returns the amount of CELO included in the reserve

#### Type declaration

▸ (`...args`): `Promise`\<`BigNumber`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [] |

##### Returns

`Promise`\<`BigNumber`\>

The CELO amount included in the reserve.

**`Notice`**

Returns the amount of CELO included in the reserve

#### Defined in

[packages/sdk/contractkit/src/wrappers/Reserve.ts:90](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Reserve.ts#L90)

___

### getReserveGoldBalance

• **getReserveGoldBalance**: (...`args`: []) => `Promise`\<`BigNumber`\>

**`Alias`**

#### Type declaration

▸ (`...args`): `Promise`\<`BigNumber`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [] |

##### Returns

`Promise`\<`BigNumber`\>

**`Alias`**

#### Defined in

[packages/sdk/contractkit/src/wrappers/Reserve.ts:80](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Reserve.ts#L80)

___

### getUnfrozenBalance

• **getUnfrozenBalance**: (...`args`: []) => `Promise`\<`BigNumber`\>

**`Notice`**

Returns the amount of unfrozen CELO in the Reserve contract.

**`See`**

#### Type declaration

▸ (`...args`): `Promise`\<`BigNumber`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [] |

##### Returns

`Promise`\<`BigNumber`\>

amount in wei

**`Notice`**

Returns the amount of unfrozen CELO in the Reserve contract.

**`See`**

#### Defined in

[packages/sdk/contractkit/src/wrappers/Reserve.ts:97](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Reserve.ts#L97)

___

### getUnfrozenReserveCeloBalance

• **getUnfrozenReserveCeloBalance**: (...`args`: []) => `Promise`\<`BigNumber`\>

**`Notice`**

Returns the amount of unfrozen CELO included in the reserve
 contract and in other reserve addresses.

**`See`**

#### Type declaration

▸ (`...args`): `Promise`\<`BigNumber`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [] |

##### Returns

`Promise`\<`BigNumber`\>

amount in wei

**`Notice`**

Returns the amount of unfrozen CELO included in the reserve
 contract and in other reserve addresses.

**`See`**

#### Defined in

[packages/sdk/contractkit/src/wrappers/Reserve.ts:109](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Reserve.ts#L109)

___

### isOtherReserveAddress

• **isOtherReserveAddress**: (...`args`: [arg0: string]) => `Promise`\<`boolean`\>

#### Type declaration

▸ (`...args`): `Promise`\<`boolean`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [arg0: string] |

##### Returns

`Promise`\<`boolean`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/Reserve.ts:130](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Reserve.ts#L130)

___

### isSpender

• **isSpender**: (`account`: `string`) => `Promise`\<`boolean`\>

#### Type declaration

▸ (`account`): `Promise`\<`boolean`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `account` | `string` |

##### Returns

`Promise`\<`boolean`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/Reserve.ts:38](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Reserve.ts#L38)

___

### methodIds

• **methodIds**: `Record`\<``"tobinTaxStalenessThreshold"`` \| ``"frozenReserveGoldStartBalance"`` \| ``"frozenReserveGoldStartDay"`` \| ``"frozenReserveGoldDays"`` \| ``"otherReserveAddresses"`` \| ``"initialized"`` \| ``"isOwner"`` \| ``"owner"`` \| ``"registry"`` \| ``"renounceOwnership"`` \| ``"setRegistry"`` \| ``"transferOwnership"`` \| ``"getVersionNumber"`` \| ``"initialize"`` \| ``"assetAllocationSymbols"`` \| ``"assetAllocationWeights"`` \| ``"exchangeSpenderAddresses"`` \| ``"isExchangeSpender"`` \| ``"isOtherReserveAddress"`` \| ``"isSpender"`` \| ``"isToken"`` \| ``"lastSpendingDay"`` \| ``"spendingLimit"`` \| ``"tobinTax"`` \| ``"tobinTaxCache"`` \| ``"tobinTaxReserveRatio"`` \| ``"setTobinTaxStalenessThreshold"`` \| ``"setTobinTax"`` \| ``"setTobinTaxReserveRatio"`` \| ``"setDailySpendingRatio"`` \| ``"getDailySpendingRatio"`` \| ``"setFrozenGold"`` \| ``"setAssetAllocations"`` \| ``"addToken"`` \| ``"removeToken"`` \| ``"addOtherReserveAddress"`` \| ``"removeOtherReserveAddress"`` \| ``"addSpender"`` \| ``"removeSpender"`` \| ``"addExchangeSpender"`` \| ``"removeExchangeSpender"`` \| ``"getExchangeSpenders"`` \| ``"transferGold"`` \| ``"transferExchangeGold"`` \| ``"getOrComputeTobinTax"`` \| ``"getTokens"`` \| ``"getOtherReserveAddresses"`` \| ``"getAssetAllocationSymbols"`` \| ``"getAssetAllocationWeights"`` \| ``"getUnfrozenBalance"`` \| ``"getReserveGoldBalance"`` \| ``"getOtherReserveAddressesGoldBalance"`` \| ``"getUnfrozenReserveGoldBalance"`` \| ``"getFrozenReserveGoldBalance"`` \| ``"getReserveRatio"``, `string`\>

#### Inherited from

[BaseWrapper](wrappers_BaseWrapper.BaseWrapper.md).[methodIds](wrappers_BaseWrapper.BaseWrapper.md#methodids)

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:68](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L68)

___

### tobinTaxStalenessThreshold

• **tobinTaxStalenessThreshold**: (...`args`: []) => `Promise`\<`BigNumber`\>

Query Tobin tax staleness threshold parameter.

#### Type declaration

▸ (`...args`): `Promise`\<`BigNumber`\>

Query Tobin tax staleness threshold parameter.

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [] |

##### Returns

`Promise`\<`BigNumber`\>

Current Tobin tax staleness threshold.

#### Defined in

[packages/sdk/contractkit/src/wrappers/Reserve.ts:28](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Reserve.ts#L28)

___

### transferGold

• **transferGold**: (...`args`: [to: string, value: string \| number]) => `CeloTransactionObject`\<`boolean`\>

#### Type declaration

▸ (`...args`): `CeloTransactionObject`\<`boolean`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [to: string, value: string \| number] |

##### Returns

`CeloTransactionObject`\<`boolean`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/Reserve.ts:39](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Reserve.ts#L39)

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

### getConfig

▸ **getConfig**(): `Promise`\<[`ReserveConfig`](../interfaces/wrappers_Reserve.ReserveConfig.md)\>

Returns current configuration parameters.

#### Returns

`Promise`\<[`ReserveConfig`](../interfaces/wrappers_Reserve.ReserveConfig.md)\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/Reserve.ts:120](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Reserve.ts#L120)

___

### getPastEvents

▸ **getPastEvents**(`event`, `options`): `Promise`\<`EventLog`[]\>

Contract getPastEvents

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"OwnershipTransferred"`` \| ``"RegistrySet"`` \| ``"allEvents"`` \| ``"AssetAllocationSet"`` \| ``"DailySpendingRatioSet"`` \| ``"ExchangeSpenderAdded"`` \| ``"ExchangeSpenderRemoved"`` \| ``"OtherReserveAddressAdded"`` \| ``"OtherReserveAddressRemoved"`` \| ``"ReserveGoldTransferred"`` \| ``"SpenderAdded"`` \| ``"SpenderRemoved"`` \| ``"TobinTaxReserveRatioSet"`` \| ``"TobinTaxSet"`` \| ``"TobinTaxStalenessThresholdSet"`` \| ``"TokenAdded"`` \| ``"TokenRemoved"`` |
| `options` | `PastEventOptions` |

#### Returns

`Promise`\<`EventLog`[]\>

#### Inherited from

[BaseWrapper](wrappers_BaseWrapper.BaseWrapper.md).[getPastEvents](wrappers_BaseWrapper.BaseWrapper.md#getpastevents)

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:57](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L57)

___

### getSpenders

▸ **getSpenders**(): `Promise`\<`string`[]\>

#### Returns

`Promise`\<`string`[]\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/Reserve.ts:132](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Reserve.ts#L132)

___

### version

▸ **version**(): `Promise`\<[`ContractVersion`](versions.ContractVersion.md)\>

#### Returns

`Promise`\<[`ContractVersion`](versions.ContractVersion.md)\>

#### Inherited from

[BaseWrapper](wrappers_BaseWrapper.BaseWrapper.md).[version](wrappers_BaseWrapper.BaseWrapper.md#version)

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:41](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L41)
