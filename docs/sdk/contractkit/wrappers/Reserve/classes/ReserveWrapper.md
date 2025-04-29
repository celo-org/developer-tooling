[**@celo/contractkit**](../../../README.md)

***

[@celo/contractkit](../../../modules.md) / [wrappers/Reserve](../README.md) / ReserveWrapper

# Class: ReserveWrapper

Defined in: [packages/sdk/contractkit/src/wrappers/Reserve.ts:23](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Reserve.ts#L23)

Contract for handling reserve for stable currencies

## Extends

- [`BaseWrapper`](../../BaseWrapper/classes/BaseWrapper.md)\<`Reserve`\>

## Constructors

### Constructor

> **new ReserveWrapper**(`connection`, `contract`): `ReserveWrapper`

Defined in: [packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:34](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L34)

#### Parameters

##### connection

`Connection`

##### contract

`Reserve`

#### Returns

`ReserveWrapper`

#### Inherited from

[`BaseWrapper`](../../BaseWrapper/classes/BaseWrapper.md).[`constructor`](../../BaseWrapper/classes/BaseWrapper.md#constructor)

## Properties

### dailySpendingRatio()

> **dailySpendingRatio**: (...`args`) => `Promise`\<`BigNumber`\>

Defined in: [packages/sdk/contractkit/src/wrappers/Reserve.ts:33](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Reserve.ts#L33)

#### Parameters

##### args

...\[\]

#### Returns

`Promise`\<`BigNumber`\>

***

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

#### AssetAllocationSet

> **AssetAllocationSet**: `ContractEvent`\<\{ `0`: `string`[]; `1`: `string`[]; `symbols`: `string`[]; `weights`: `string`[]; \}\>

#### DailySpendingRatioSet

> **DailySpendingRatioSet**: `ContractEvent`\<`string`\>

#### ExchangeSpenderAdded

> **ExchangeSpenderAdded**: `ContractEvent`\<`string`\>

#### ExchangeSpenderRemoved

> **ExchangeSpenderRemoved**: `ContractEvent`\<`string`\>

#### OtherReserveAddressAdded

> **OtherReserveAddressAdded**: `ContractEvent`\<`string`\>

#### OtherReserveAddressRemoved

> **OtherReserveAddressRemoved**: `ContractEvent`\<\{ `0`: `string`; `1`: `string`; `index`: `string`; `otherReserveAddress`: `string`; \}\>

#### OwnershipTransferred

> **OwnershipTransferred**: `ContractEvent`\<\{ `0`: `string`; `1`: `string`; `newOwner`: `string`; `previousOwner`: `string`; \}\>

#### RegistrySet

> **RegistrySet**: `ContractEvent`\<`string`\>

#### ReserveGoldTransferred

> **ReserveGoldTransferred**: `ContractEvent`\<\{ `0`: `string`; `1`: `string`; `2`: `string`; `spender`: `string`; `to`: `string`; `value`: `string`; \}\>

#### SpenderAdded

> **SpenderAdded**: `ContractEvent`\<`string`\>

#### SpenderRemoved

> **SpenderRemoved**: `ContractEvent`\<`string`\>

#### TobinTaxReserveRatioSet

> **TobinTaxReserveRatioSet**: `ContractEvent`\<`string`\>

#### TobinTaxSet

> **TobinTaxSet**: `ContractEvent`\<`string`\>

#### TobinTaxStalenessThresholdSet

> **TobinTaxStalenessThresholdSet**: `ContractEvent`\<`string`\>

#### TokenAdded

> **TokenAdded**: `ContractEvent`\<`string`\>

#### TokenRemoved

> **TokenRemoved**: `ContractEvent`\<\{ `0`: `string`; `1`: `string`; `index`: `string`; `token`: `string`; \}\>

#### Inherited from

[`BaseWrapper`](../../BaseWrapper/classes/BaseWrapper.md).[`events`](../../BaseWrapper/classes/BaseWrapper.md#events)

***

### eventTypes

> **eventTypes**: `EventsEnum`\<`Reserve`\>

Defined in: [packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:63](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L63)

#### Inherited from

[`BaseWrapper`](../../BaseWrapper/classes/BaseWrapper.md).[`eventTypes`](../../BaseWrapper/classes/BaseWrapper.md#eventtypes)

***

### frozenReserveGoldDays()

> **frozenReserveGoldDays**: (...`args`) => `Promise`\<`BigNumber`\>

Defined in: [packages/sdk/contractkit/src/wrappers/Reserve.ts:51](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Reserve.ts#L51)

#### Parameters

##### args

...\[\]

#### Returns

`Promise`\<`BigNumber`\>

***

### frozenReserveGoldStartBalance()

> **frozenReserveGoldStartBalance**: (...`args`) => `Promise`\<`BigNumber`\>

Defined in: [packages/sdk/contractkit/src/wrappers/Reserve.ts:41](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Reserve.ts#L41)

#### Parameters

##### args

...\[\]

#### Returns

`Promise`\<`BigNumber`\>

***

### frozenReserveGoldStartDay()

> **frozenReserveGoldStartDay**: (...`args`) => `Promise`\<`BigNumber`\>

Defined in: [packages/sdk/contractkit/src/wrappers/Reserve.ts:46](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Reserve.ts#L46)

#### Parameters

##### args

...\[\]

#### Returns

`Promise`\<`BigNumber`\>

***

### getAssetAllocationSymbols()

> **getAssetAllocationSymbols**: (...`args`) => `Promise`\<`string`[]\>

Defined in: [packages/sdk/contractkit/src/wrappers/Reserve.ts:71](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Reserve.ts#L71)

#### Parameters

##### args

...\[\]

#### Returns

`Promise`\<`string`[]\>

An array of token symbols that have been allocated.

#### Notice

Returns a list of token symbols that have been allocated.

***

### getAssetAllocationWeights()

> **getAssetAllocationWeights**: (...`args`) => `Promise`\<`BigNumber`[]\>

Defined in: [packages/sdk/contractkit/src/wrappers/Reserve.ts:61](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Reserve.ts#L61)

#### Parameters

##### args

...\[\]

#### Returns

`Promise`\<`BigNumber`[]\>

An array of a list of weights used for the allocation of reserve assets.

#### Notice

Returns a list of weights used for the allocation of reserve assets.

***

### getOrComputeTobinTax()

> **getOrComputeTobinTax**: (...`args`) => `CeloTransactionObject`\<\{ `0`: `string`; `1`: `string`; \}\>

Defined in: [packages/sdk/contractkit/src/wrappers/Reserve.ts:40](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Reserve.ts#L40)

#### Parameters

##### args

...\[\]

#### Returns

`CeloTransactionObject`\<\{ `0`: `string`; `1`: `string`; \}\>

***

### getOtherReserveAddresses()

> **getOtherReserveAddresses**: (...`args`) => `Promise`\<`string`[]\>

Defined in: [packages/sdk/contractkit/src/wrappers/Reserve.ts:115](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Reserve.ts#L115)

#### Parameters

##### args

...\[\]

#### Returns

`Promise`\<`string`[]\>

***

### getReserveCeloBalance()

> **getReserveCeloBalance**: (...`args`) => `Promise`\<`BigNumber`\>

Defined in: [packages/sdk/contractkit/src/wrappers/Reserve.ts:90](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Reserve.ts#L90)

#### Parameters

##### args

...\[\]

#### Returns

`Promise`\<`BigNumber`\>

The CELO amount included in the reserve.

#### Notice

Returns the amount of CELO included in the reserve

***

### getReserveGoldBalance()

> **getReserveGoldBalance**: (...`args`) => `Promise`\<`BigNumber`\>

Defined in: [packages/sdk/contractkit/src/wrappers/Reserve.ts:80](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Reserve.ts#L80)

#### Parameters

##### args

...\[\]

#### Returns

`Promise`\<`BigNumber`\>

#### Alias

***

### getUnfrozenBalance()

> **getUnfrozenBalance**: (...`args`) => `Promise`\<`BigNumber`\>

Defined in: [packages/sdk/contractkit/src/wrappers/Reserve.ts:97](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Reserve.ts#L97)

#### Parameters

##### args

...\[\]

#### Returns

`Promise`\<`BigNumber`\>

amount in wei

#### Notice

Returns the amount of unfrozen CELO in the Reserve contract.

#### See

***

### getUnfrozenReserveCeloBalance()

> **getUnfrozenReserveCeloBalance**: (...`args`) => `Promise`\<`BigNumber`\>

Defined in: [packages/sdk/contractkit/src/wrappers/Reserve.ts:109](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Reserve.ts#L109)

#### Parameters

##### args

...\[\]

#### Returns

`Promise`\<`BigNumber`\>

amount in wei

#### Notice

Returns the amount of unfrozen CELO included in the reserve
 contract and in other reserve addresses.

#### See

***

### isOtherReserveAddress()

> **isOtherReserveAddress**: (...`args`) => `Promise`\<`boolean`\>

Defined in: [packages/sdk/contractkit/src/wrappers/Reserve.ts:130](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Reserve.ts#L130)

#### Parameters

##### args

...\[`string`\]

#### Returns

`Promise`\<`boolean`\>

***

### isSpender()

> **isSpender**: (`account`) => `Promise`\<`boolean`\>

Defined in: [packages/sdk/contractkit/src/wrappers/Reserve.ts:38](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Reserve.ts#L38)

#### Parameters

##### account

`string`

#### Returns

`Promise`\<`boolean`\>

***

### methodIds

> **methodIds**: `Record`\<`"tobinTaxStalenessThreshold"` \| `"frozenReserveGoldStartBalance"` \| `"frozenReserveGoldStartDay"` \| `"frozenReserveGoldDays"` \| `"otherReserveAddresses"` \| `"initialized"` \| `"isOwner"` \| `"owner"` \| `"registry"` \| `"renounceOwnership"` \| `"setRegistry"` \| `"transferOwnership"` \| `"initialize"` \| `"getVersionNumber"` \| `"assetAllocationSymbols"` \| `"assetAllocationWeights"` \| `"exchangeSpenderAddresses"` \| `"isExchangeSpender"` \| `"isOtherReserveAddress"` \| `"isSpender"` \| `"isToken"` \| `"lastSpendingDay"` \| `"spendingLimit"` \| `"tobinTax"` \| `"tobinTaxCache"` \| `"tobinTaxReserveRatio"` \| `"setTobinTaxStalenessThreshold"` \| `"setTobinTax"` \| `"setTobinTaxReserveRatio"` \| `"setDailySpendingRatio"` \| `"getDailySpendingRatio"` \| `"setFrozenGold"` \| `"setAssetAllocations"` \| `"addToken"` \| `"removeToken"` \| `"addOtherReserveAddress"` \| `"removeOtherReserveAddress"` \| `"addSpender"` \| `"removeSpender"` \| `"addExchangeSpender"` \| `"removeExchangeSpender"` \| `"getExchangeSpenders"` \| `"transferGold"` \| `"transferExchangeGold"` \| `"getOrComputeTobinTax"` \| `"getTokens"` \| `"getOtherReserveAddresses"` \| `"getAssetAllocationSymbols"` \| `"getAssetAllocationWeights"` \| `"getUnfrozenBalance"` \| `"getReserveGoldBalance"` \| `"getOtherReserveAddressesGoldBalance"` \| `"getUnfrozenReserveGoldBalance"` \| `"getFrozenReserveGoldBalance"` \| `"getReserveRatio"`, `string`\>

Defined in: [packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:68](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L68)

#### Inherited from

[`BaseWrapper`](../../BaseWrapper/classes/BaseWrapper.md).[`methodIds`](../../BaseWrapper/classes/BaseWrapper.md#methodids)

***

### tobinTaxStalenessThreshold()

> **tobinTaxStalenessThreshold**: (...`args`) => `Promise`\<`BigNumber`\>

Defined in: [packages/sdk/contractkit/src/wrappers/Reserve.ts:28](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Reserve.ts#L28)

Query Tobin tax staleness threshold parameter.

#### Parameters

##### args

...\[\]

#### Returns

`Promise`\<`BigNumber`\>

Current Tobin tax staleness threshold.

***

### transferGold()

> **transferGold**: (...`args`) => `CeloTransactionObject`\<`boolean`\>

Defined in: [packages/sdk/contractkit/src/wrappers/Reserve.ts:39](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Reserve.ts#L39)

#### Parameters

##### args

...\[`string`, `string` \| `number`\]

#### Returns

`CeloTransactionObject`\<`boolean`\>

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

### getConfig()

> **getConfig**(): `Promise`\<[`ReserveConfig`](../interfaces/ReserveConfig.md)\>

Defined in: [packages/sdk/contractkit/src/wrappers/Reserve.ts:120](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Reserve.ts#L120)

Returns current configuration parameters.

#### Returns

`Promise`\<[`ReserveConfig`](../interfaces/ReserveConfig.md)\>

***

### getPastEvents()

> **getPastEvents**(`event`, `options`): `Promise`\<`EventLog`[]\>

Defined in: [packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:57](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L57)

Contract getPastEvents

#### Parameters

##### event

`"OwnershipTransferred"` | `"RegistrySet"` | `"allEvents"` | `"AssetAllocationSet"` | `"DailySpendingRatioSet"` | `"ExchangeSpenderAdded"` | `"ExchangeSpenderRemoved"` | `"OtherReserveAddressAdded"` | `"OtherReserveAddressRemoved"` | `"ReserveGoldTransferred"` | `"SpenderAdded"` | `"SpenderRemoved"` | `"TobinTaxReserveRatioSet"` | `"TobinTaxSet"` | `"TobinTaxStalenessThresholdSet"` | `"TokenAdded"` | `"TokenRemoved"`

##### options

`PastEventOptions`

#### Returns

`Promise`\<`EventLog`[]\>

#### Inherited from

[`BaseWrapper`](../../BaseWrapper/classes/BaseWrapper.md).[`getPastEvents`](../../BaseWrapper/classes/BaseWrapper.md#getpastevents)

***

### getSpenders()

> **getSpenders**(): `Promise`\<`string`[]\>

Defined in: [packages/sdk/contractkit/src/wrappers/Reserve.ts:132](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Reserve.ts#L132)

#### Returns

`Promise`\<`string`[]\>

***

### version()

> **version**(): `Promise`\<[`ContractVersion`](../../../versions/classes/ContractVersion.md)\>

Defined in: [packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:41](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L41)

#### Returns

`Promise`\<[`ContractVersion`](../../../versions/classes/ContractVersion.md)\>

#### Inherited from

[`BaseWrapper`](../../BaseWrapper/classes/BaseWrapper.md).[`version`](../../BaseWrapper/classes/BaseWrapper.md#version)
