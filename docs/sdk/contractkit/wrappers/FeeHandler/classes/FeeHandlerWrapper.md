[**@celo/contractkit**](../../../README.md)

***

[@celo/contractkit](../../../modules.md) / [wrappers/FeeHandler](../README.md) / FeeHandlerWrapper

# Class: FeeHandlerWrapper

Defined in: [packages/sdk/contractkit/src/wrappers/FeeHandler.ts:43](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/FeeHandler.ts#L43)

**`Internal`**

-- use its children

## Extends

- [`BaseWrapper`](../../BaseWrapper/classes/BaseWrapper.md)\<`FeeHandler`\>

## Constructors

### Constructor

> **new FeeHandlerWrapper**(`connection`, `contract`): `FeeHandlerWrapper`

Defined in: [packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:34](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L34)

#### Parameters

##### connection

`Connection`

##### contract

`FeeHandler`

#### Returns

`FeeHandlerWrapper`

#### Inherited from

[`BaseWrapper`](../../BaseWrapper/classes/BaseWrapper.md).[`constructor`](../../BaseWrapper/classes/BaseWrapper.md#constructor)

## Properties

### burnCelo()

> **burnCelo**: (...`args`) => `CeloTransactionObject`\<`void`\>

Defined in: [packages/sdk/contractkit/src/wrappers/FeeHandler.ts:47](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/FeeHandler.ts#L47)

#### Parameters

##### args

...\[\]

#### Returns

`CeloTransactionObject`\<`void`\>

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

#### BurnFractionSet

> **BurnFractionSet**: `ContractEvent`\<`string`\>

#### DailyLimitHit

> **DailyLimitHit**: `ContractEvent`\<\{ `0`: `string`; `1`: `string`; `burning`: `string`; `token`: `string`; \}\>

#### DailyLimitSet

> **DailyLimitSet**: `ContractEvent`\<\{ `0`: `string`; `1`: `string`; `newLimit`: `string`; `tokenAddress`: `string`; \}\>

#### DailySellLimitUpdated

> **DailySellLimitUpdated**: `ContractEvent`\<`string`\>

#### FeeBeneficiarySet

> **FeeBeneficiarySet**: `ContractEvent`\<`string`\>

#### MaxSlippageSet

> **MaxSlippageSet**: `ContractEvent`\<\{ `0`: `string`; `1`: `string`; `maxSlippage`: `string`; `token`: `string`; \}\>

#### OwnershipTransferred

> **OwnershipTransferred**: `ContractEvent`\<\{ `0`: `string`; `1`: `string`; `newOwner`: `string`; `previousOwner`: `string`; \}\>

#### RegistrySet

> **RegistrySet**: `ContractEvent`\<`string`\>

#### SoldAndBurnedToken

> **SoldAndBurnedToken**: `ContractEvent`\<\{ `0`: `string`; `1`: `string`; `token`: `string`; `value`: `string`; \}\>

#### TokenAdded

> **TokenAdded**: `ContractEvent`\<\{ `0`: `string`; `1`: `string`; `handlerAddress`: `string`; `tokenAddress`: `string`; \}\>

#### TokenRemoved

> **TokenRemoved**: `ContractEvent`\<`string`\>

#### Inherited from

[`BaseWrapper`](../../BaseWrapper/classes/BaseWrapper.md).[`events`](../../BaseWrapper/classes/BaseWrapper.md#events)

***

### eventTypes

> **eventTypes**: `EventsEnum`\<`FeeHandler`\>

Defined in: [packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:63](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L63)

#### Inherited from

[`BaseWrapper`](../../BaseWrapper/classes/BaseWrapper.md).[`eventTypes`](../../BaseWrapper/classes/BaseWrapper.md#eventtypes)

***

### handleAll()

> **handleAll**: (...`args`) => `CeloTransactionObject`\<`void`\>

Defined in: [packages/sdk/contractkit/src/wrappers/FeeHandler.ts:46](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/FeeHandler.ts#L46)

#### Parameters

##### args

...\[\]

#### Returns

`CeloTransactionObject`\<`void`\>

***

### methodIds

> **methodIds**: `Record`\<`"initialized"` \| `"isOwner"` \| `"owner"` \| `"registry"` \| `"renounceOwnership"` \| `"setRegistry"` \| `"transferOwnership"` \| `"initialize"` \| `"getVersionNumber"` \| `"addToken"` \| `"removeToken"` \| `"transfer"` \| `"FIXED1_UINT"` \| `"MIN_BURN"` \| `"burnFraction"` \| `"celoToBeBurned"` \| `"feeBeneficiary"` \| `"lastLimitDay"` \| `"getTokenHandler"` \| `"getTokenActive"` \| `"getTokenMaxSlippage"` \| `"getTokenDailySellLimit"` \| `"getTokenCurrentDaySellLimit"` \| `"getTokenToDistribute"` \| `"getActiveTokens"` \| `"setFeeBeneficiary"` \| `"setBurnFraction"` \| `"sell"` \| `"activateToken"` \| `"deactivateToken"` \| `"setHandler"` \| `"distribute"` \| `"setMaxSplippage"` \| `"setDailySellLimit"` \| `"burnCelo"` \| `"distributeAll"` \| `"handleAll"` \| `"handle"` \| `"getPastBurnForToken"` \| `"dailySellLimitHit"`, `string`\>

Defined in: [packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:68](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L68)

#### Inherited from

[`BaseWrapper`](../../BaseWrapper/classes/BaseWrapper.md).[`methodIds`](../../BaseWrapper/classes/BaseWrapper.md#methodids)

***

### owner()

> **owner**: (...`args`) => `Promise`\<`string`\>

Defined in: [packages/sdk/contractkit/src/wrappers/FeeHandler.ts:44](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/FeeHandler.ts#L44)

#### Parameters

##### args

...\[\]

#### Returns

`Promise`\<`string`\>

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

### distribute()

> **distribute**(`tokenAddress`): `Promise`\<`CeloTransactionObject`\<`void`\>\>

Defined in: [packages/sdk/contractkit/src/wrappers/FeeHandler.ts:59](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/FeeHandler.ts#L59)

#### Parameters

##### tokenAddress

`string`

#### Returns

`Promise`\<`CeloTransactionObject`\<`void`\>\>

***

### getPastEvents()

> **getPastEvents**(`event`, `options`): `Promise`\<`EventLog`[]\>

Defined in: [packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:57](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L57)

Contract getPastEvents

#### Parameters

##### event

`"OwnershipTransferred"` | `"RegistrySet"` | `"allEvents"` | `"TokenAdded"` | `"TokenRemoved"` | `"BurnFractionSet"` | `"DailyLimitHit"` | `"DailyLimitSet"` | `"DailySellLimitUpdated"` | `"FeeBeneficiarySet"` | `"MaxSlippageSet"` | `"SoldAndBurnedToken"`

##### options

`PastEventOptions`

#### Returns

`Promise`\<`EventLog`[]\>

#### Inherited from

[`BaseWrapper`](../../BaseWrapper/classes/BaseWrapper.md).[`getPastEvents`](../../BaseWrapper/classes/BaseWrapper.md#getpastevents)

***

### handle()

> **handle**(`tokenAddress`): `Promise`\<`CeloTransactionObject`\<`void`\>\>

Defined in: [packages/sdk/contractkit/src/wrappers/FeeHandler.ts:49](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/FeeHandler.ts#L49)

#### Parameters

##### tokenAddress

`string`

#### Returns

`Promise`\<`CeloTransactionObject`\<`void`\>\>

***

### sell()

> **sell**(`tokenAddress`): `Promise`\<`CeloTransactionObject`\<`void`\>\>

Defined in: [packages/sdk/contractkit/src/wrappers/FeeHandler.ts:54](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/FeeHandler.ts#L54)

#### Parameters

##### tokenAddress

`string`

#### Returns

`Promise`\<`CeloTransactionObject`\<`void`\>\>

***

### version()

> **version**(): `Promise`\<[`ContractVersion`](../../../versions/classes/ContractVersion.md)\>

Defined in: [packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:41](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L41)

#### Returns

`Promise`\<[`ContractVersion`](../../../versions/classes/ContractVersion.md)\>

#### Inherited from

[`BaseWrapper`](../../BaseWrapper/classes/BaseWrapper.md).[`version`](../../BaseWrapper/classes/BaseWrapper.md#version)
