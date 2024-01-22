[@celo/contractkit](../README.md) / [Exports](../modules.md) / [wrappers/Exchange](../modules/wrappers_Exchange.md) / ExchangeWrapper

# Class: ExchangeWrapper

[wrappers/Exchange](../modules/wrappers_Exchange.md).ExchangeWrapper

Contract that allows to exchange StableToken for GoldToken and vice versa
using a Constant Product Market Maker Model aka Mento

## Hierarchy

- [`BaseWrapper`](wrappers_BaseWrapper.BaseWrapper.md)\<`Exchange`\>

  ↳ **`ExchangeWrapper`**

## Table of contents

### Constructors

- [constructor](wrappers_Exchange.ExchangeWrapper.md#constructor)

### Properties

- [buy](wrappers_Exchange.ExchangeWrapper.md#buy)
- [buyDollar](wrappers_Exchange.ExchangeWrapper.md#buydollar)
- [eventTypes](wrappers_Exchange.ExchangeWrapper.md#eventtypes)
- [events](wrappers_Exchange.ExchangeWrapper.md#events)
- [exchange](wrappers_Exchange.ExchangeWrapper.md#exchange)
- [getBuyAndSellBuckets](wrappers_Exchange.ExchangeWrapper.md#getbuyandsellbuckets)
- [getUsdExchangeRate](wrappers_Exchange.ExchangeWrapper.md#getusdexchangerate)
- [lastBucketUpdate](wrappers_Exchange.ExchangeWrapper.md#lastbucketupdate)
- [methodIds](wrappers_Exchange.ExchangeWrapper.md#methodids)
- [minimumReports](wrappers_Exchange.ExchangeWrapper.md#minimumreports)
- [quoteUsdBuy](wrappers_Exchange.ExchangeWrapper.md#quoteusdbuy)
- [quoteUsdSell](wrappers_Exchange.ExchangeWrapper.md#quoteusdsell)
- [reserveFraction](wrappers_Exchange.ExchangeWrapper.md#reservefraction)
- [sell](wrappers_Exchange.ExchangeWrapper.md#sell)
- [sellDollar](wrappers_Exchange.ExchangeWrapper.md#selldollar)
- [spread](wrappers_Exchange.ExchangeWrapper.md#spread)
- [updateFrequency](wrappers_Exchange.ExchangeWrapper.md#updatefrequency)

### Accessors

- [address](wrappers_Exchange.ExchangeWrapper.md#address)

### Methods

- [buyGold](wrappers_Exchange.ExchangeWrapper.md#buygold)
- [buyStable](wrappers_Exchange.ExchangeWrapper.md#buystable)
- [getBuyTokenAmount](wrappers_Exchange.ExchangeWrapper.md#getbuytokenamount)
- [getConfig](wrappers_Exchange.ExchangeWrapper.md#getconfig)
- [getExchangeRate](wrappers_Exchange.ExchangeWrapper.md#getexchangerate)
- [getGoldExchangeRate](wrappers_Exchange.ExchangeWrapper.md#getgoldexchangerate)
- [getHumanReadableConfig](wrappers_Exchange.ExchangeWrapper.md#gethumanreadableconfig)
- [getPastEvents](wrappers_Exchange.ExchangeWrapper.md#getpastevents)
- [getSellTokenAmount](wrappers_Exchange.ExchangeWrapper.md#getselltokenamount)
- [getStableExchangeRate](wrappers_Exchange.ExchangeWrapper.md#getstableexchangerate)
- [quoteGoldBuy](wrappers_Exchange.ExchangeWrapper.md#quotegoldbuy)
- [quoteGoldSell](wrappers_Exchange.ExchangeWrapper.md#quotegoldsell)
- [quoteStableBuy](wrappers_Exchange.ExchangeWrapper.md#quotestablebuy)
- [quoteStableSell](wrappers_Exchange.ExchangeWrapper.md#quotestablesell)
- [sellGold](wrappers_Exchange.ExchangeWrapper.md#sellgold)
- [sellStable](wrappers_Exchange.ExchangeWrapper.md#sellstable)
- [version](wrappers_Exchange.ExchangeWrapper.md#version)

## Constructors

### constructor

• **new ExchangeWrapper**(`connection`, `contract`): [`ExchangeWrapper`](wrappers_Exchange.ExchangeWrapper.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `connection` | `Connection` |
| `contract` | `Exchange` |

#### Returns

[`ExchangeWrapper`](wrappers_Exchange.ExchangeWrapper.md)

#### Inherited from

[BaseWrapper](wrappers_BaseWrapper.BaseWrapper.md).[constructor](wrappers_BaseWrapper.BaseWrapper.md#constructor)

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:34](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L34)

## Properties

### buy

• **buy**: (`buyAmount`: `Value`, `maxSellAmount`: `Value`, `buyGold`: `boolean`) => `CeloTransactionObject`\<`string`\>

Sells sellAmount of sellToken in exchange for at least minBuyAmount of buyToken
Requires the sellAmount to have been approved to the exchange

**`Param`**

The amount of sellToken the user is selling to the exchange

**`Param`**

The maximum amount of sellToken the user will sell for this
transaction to succeed

**`Param`**

`true` if gold is the buy token

#### Type declaration

▸ (`buyAmount`, `maxSellAmount`, `buyGold`): `CeloTransactionObject`\<`string`\>

Sells sellAmount of sellToken in exchange for at least minBuyAmount of buyToken
Requires the sellAmount to have been approved to the exchange

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `buyAmount` | `Value` | The amount of sellToken the user is selling to the exchange |
| `maxSellAmount` | `Value` | The maximum amount of sellToken the user will sell for this transaction to succeed |
| `buyGold` | `boolean` | `true` if gold is the buy token |

##### Returns

`CeloTransactionObject`\<`string`\>

The amount of buyToken that was transfered

#### Defined in

[packages/sdk/contractkit/src/wrappers/Exchange.ts:112](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Exchange.ts#L112)

___

### buyDollar

• **buyDollar**: (`amount`: `Value`, `maxGoldAmount`: `Value`) => `CeloTransactionObject`\<`string`\>

Deprecated alias of buyStable.
Buy amount of the stable token in exchange for at least minGoldAmount of CELO
Requires the amount to have been approved to the exchange

**`Deprecated`**

use buyStable instead

**`Param`**

The amount of the stable token the user is selling to the exchange

**`Param`**

The maximum amount of CELO the user will pay for this
transaction to succeed

#### Type declaration

▸ (`amount`, `maxGoldAmount`): `CeloTransactionObject`\<`string`\>

Deprecated alias of buyStable.
Buy amount of the stable token in exchange for at least minGoldAmount of CELO
Requires the amount to have been approved to the exchange

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `amount` | `Value` | The amount of the stable token the user is selling to the exchange |
| `maxGoldAmount` | `Value` | The maximum amount of CELO the user will pay for this transaction to succeed |

##### Returns

`CeloTransactionObject`\<`string`\>

**`Deprecated`**

use buyStable instead

#### Defined in

[packages/sdk/contractkit/src/wrappers/Exchange.ts:226](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Exchange.ts#L226)

___

### eventTypes

• **eventTypes**: `EventsEnum`\<`Exchange`\>

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
| `BucketsUpdated` | `ContractEvent`\<\{ `0`: `string` ; `1`: `string` ; `goldBucket`: `string` ; `stableBucket`: `string`  }\> |
| `Exchanged` | `ContractEvent`\<\{ `0`: `string` ; `1`: `string` ; `2`: `string` ; `3`: `boolean` ; `buyAmount`: `string` ; `exchanger`: `string` ; `sellAmount`: `string` ; `soldGold`: `boolean`  }\> |
| `MinimumReportsSet` | `ContractEvent`\<`string`\> |
| `OwnershipTransferred` | `ContractEvent`\<\{ `0`: `string` ; `1`: `string` ; `newOwner`: `string` ; `previousOwner`: `string`  }\> |
| `RegistrySet` | `ContractEvent`\<`string`\> |
| `ReserveFractionSet` | `ContractEvent`\<`string`\> |
| `SpreadSet` | `ContractEvent`\<`string`\> |
| `StableTokenSet` | `ContractEvent`\<`string`\> |
| `UpdateFrequencySet` | `ContractEvent`\<`string`\> |
| `allEvents` | (`options?`: `EventOptions`, `cb?`: `Callback`\<`EventLog`\>) => `EventEmitter` |

#### Inherited from

[BaseWrapper](wrappers_BaseWrapper.BaseWrapper.md).[events](wrappers_BaseWrapper.BaseWrapper.md#events)

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:61](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L61)

___

### exchange

• **exchange**: (`sellAmount`: `Value`, `minBuyAmount`: `Value`, `sellGold`: `boolean`) => `CeloTransactionObject`\<`string`\>

DEPRECATED: use function sell
Exchanges sellAmount of sellToken in exchange for at least minBuyAmount of buyToken
Requires the sellAmount to have been approved to the exchange

**`Param`**

The amount of sellToken the user is selling to the exchange

**`Param`**

The minimum amount of buyToken the user has to receive for this
transaction to succeed

**`Param`**

`true` if gold is the sell token

#### Type declaration

▸ (`sellAmount`, `minBuyAmount`, `sellGold`): `CeloTransactionObject`\<`string`\>

DEPRECATED: use function sell
Exchanges sellAmount of sellToken in exchange for at least minBuyAmount of buyToken
Requires the sellAmount to have been approved to the exchange

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `sellAmount` | `Value` | The amount of sellToken the user is selling to the exchange |
| `minBuyAmount` | `Value` | The minimum amount of buyToken the user has to receive for this transaction to succeed |
| `sellGold` | `boolean` | `true` if gold is the sell token |

##### Returns

`CeloTransactionObject`\<`string`\>

The amount of buyToken that was transfered

#### Defined in

[packages/sdk/contractkit/src/wrappers/Exchange.ts:74](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Exchange.ts#L74)

___

### getBuyAndSellBuckets

• **getBuyAndSellBuckets**: (`sellGold`: `boolean`) => `Promise`\<[`BigNumber`, `BigNumber`]\>

Returns the buy token and sell token bucket sizes, in order. The ratio of
the two also represents the exchange rate between the two.

**`Param`**

`true` if gold is the sell token

#### Type declaration

▸ (`sellGold`): `Promise`\<[`BigNumber`, `BigNumber`]\>

Returns the buy token and sell token bucket sizes, in order. The ratio of
the two also represents the exchange rate between the two.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `sellGold` | `boolean` | `true` if gold is the sell token |

##### Returns

`Promise`\<[`BigNumber`, `BigNumber`]\>

[buyTokenBucket, sellTokenBucket]

#### Defined in

[packages/sdk/contractkit/src/wrappers/Exchange.ts:159](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Exchange.ts#L159)

___

### getUsdExchangeRate

• **getUsdExchangeRate**: (`buyAmount`: `Value`) => `Promise`\<`BigNumber`\>

Deprecated alias of getStableExchangeRate.
Returns the exchange rate for the stable token estimated at the buyAmount

**`Deprecated`**

Use getStableExchangeRate instead

**`Param`**

The amount of the stable token in wei to estimate the exchange rate at

#### Type declaration

▸ (`buyAmount`): `Promise`\<`BigNumber`\>

Deprecated alias of getStableExchangeRate.
Returns the exchange rate for the stable token estimated at the buyAmount

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `buyAmount` | `Value` | The amount of the stable token in wei to estimate the exchange rate at |

##### Returns

`Promise`\<`BigNumber`\>

The exchange rate (number of CELO received for one stable token)

**`Deprecated`**

Use getStableExchangeRate instead

#### Defined in

[packages/sdk/contractkit/src/wrappers/Exchange.ts:336](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Exchange.ts#L336)

___

### lastBucketUpdate

• **lastBucketUpdate**: (...`args`: []) => `Promise`\<`BigNumber`\>

Query last bucket update

#### Type declaration

▸ (`...args`): `Promise`\<`BigNumber`\>

Query last bucket update

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [] |

##### Returns

`Promise`\<`BigNumber`\>

The timestamp of the last time exchange buckets were updated.

#### Defined in

[packages/sdk/contractkit/src/wrappers/Exchange.ts:62](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Exchange.ts#L62)

___

### methodIds

• **methodIds**: `Record`\<``"spread"`` \| ``"reserveFraction"`` \| ``"updateFrequency"`` \| ``"minimumReports"`` \| ``"lastBucketUpdate"`` \| ``"initialized"`` \| ``"isOwner"`` \| ``"owner"`` \| ``"registry"`` \| ``"renounceOwnership"`` \| ``"setRegistry"`` \| ``"transferOwnership"`` \| ``"getVersionNumber"`` \| ``"initialize"`` \| ``"goldBucket"`` \| ``"stable"`` \| ``"stableBucket"`` \| ``"stableTokenRegistryId"`` \| ``"activateStable"`` \| ``"sell"`` \| ``"exchange"`` \| ``"buy"`` \| ``"getBuyTokenAmount"`` \| ``"getSellTokenAmount"`` \| ``"getBuyAndSellBuckets"`` \| ``"setUpdateFrequency"`` \| ``"setMinimumReports"`` \| ``"setStableToken"`` \| ``"setSpread"`` \| ``"setReserveFraction"``, `string`\>

#### Inherited from

[BaseWrapper](wrappers_BaseWrapper.BaseWrapper.md).[methodIds](wrappers_BaseWrapper.BaseWrapper.md#methodids)

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:68](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L68)

___

### minimumReports

• **minimumReports**: (...`args`: []) => `Promise`\<`BigNumber`\>

Query minimum reports parameter

#### Type declaration

▸ (`...args`): `Promise`\<`BigNumber`\>

Query minimum reports parameter

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [] |

##### Returns

`Promise`\<`BigNumber`\>

The minimum number of fresh reports that need to be
present in the oracle to update buckets
commit to the gold bucket

#### Defined in

[packages/sdk/contractkit/src/wrappers/Exchange.ts:57](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Exchange.ts#L57)

___

### quoteUsdBuy

• **quoteUsdBuy**: (`buyAmount`: `Value`) => `Promise`\<`BigNumber`\>

Deprecated alias of quoteStableBuy.
Returns the amount of CELO a user would need to exchange to receive buyAmount of
the stable token.

**`Deprecated`**

Use quoteStableBuy instead

**`Param`**

The amount of the stable token the user would like to purchase.

#### Type declaration

▸ (`buyAmount`): `Promise`\<`BigNumber`\>

Deprecated alias of quoteStableBuy.
Returns the amount of CELO a user would need to exchange to receive buyAmount of
the stable token.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `buyAmount` | `Value` | The amount of the stable token the user would like to purchase. |

##### Returns

`Promise`\<`BigNumber`\>

The corresponding CELO amount.

**`Deprecated`**

Use quoteStableBuy instead

#### Defined in

[packages/sdk/contractkit/src/wrappers/Exchange.ts:267](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Exchange.ts#L267)

___

### quoteUsdSell

• **quoteUsdSell**: (`sellAmount`: `Value`) => `Promise`\<`BigNumber`\>

Deprecated alias of quoteStableSell.
Returns the amount of CELO a user would get for sellAmount of the stable token

**`Deprecated`**

Use quoteStableSell instead

**`Param`**

The amount of the stable token the user is selling to the exchange

#### Type declaration

▸ (`sellAmount`): `Promise`\<`BigNumber`\>

Deprecated alias of quoteStableSell.
Returns the amount of CELO a user would get for sellAmount of the stable token

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `sellAmount` | `Value` | The amount of the stable token the user is selling to the exchange |

##### Returns

`Promise`\<`BigNumber`\>

The corresponding CELO amount.

**`Deprecated`**

Use quoteStableSell instead

#### Defined in

[packages/sdk/contractkit/src/wrappers/Exchange.ts:242](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Exchange.ts#L242)

___

### reserveFraction

• **reserveFraction**: (...`args`: []) => `Promise`\<`BigNumber`\>

Query reserve fraction parameter

#### Type declaration

▸ (`...args`): `Promise`\<`BigNumber`\>

Query reserve fraction parameter

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [] |

##### Returns

`Promise`\<`BigNumber`\>

Current fraction to commit to the gold bucket

#### Defined in

[packages/sdk/contractkit/src/wrappers/Exchange.ts:40](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Exchange.ts#L40)

___

### sell

• **sell**: (`sellAmount`: `Value`, `minBuyAmount`: `Value`, `sellGold`: `boolean`) => `CeloTransactionObject`\<`string`\>

Sells sellAmount of sellToken in exchange for at least minBuyAmount of buyToken
Requires the sellAmount to have been approved to the exchange

**`Param`**

The amount of sellToken the user is selling to the exchange

**`Param`**

The minimum amount of buyToken the user has to receive for this
transaction to succeed

**`Param`**

`true` if gold is the sell token

#### Type declaration

▸ (`sellAmount`, `minBuyAmount`, `sellGold`): `CeloTransactionObject`\<`string`\>

Sells sellAmount of sellToken in exchange for at least minBuyAmount of buyToken
Requires the sellAmount to have been approved to the exchange

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `sellAmount` | `Value` | The amount of sellToken the user is selling to the exchange |
| `minBuyAmount` | `Value` | The minimum amount of buyToken the user has to receive for this transaction to succeed |
| `sellGold` | `boolean` | `true` if gold is the sell token |

##### Returns

`CeloTransactionObject`\<`string`\>

The amount of buyToken that was transfered

#### Defined in

[packages/sdk/contractkit/src/wrappers/Exchange.ts:93](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Exchange.ts#L93)

___

### sellDollar

• **sellDollar**: (`amount`: `Value`, `minGoldAmount`: `Value`) => `CeloTransactionObject`\<`string`\>

Deprecated alias of sellStable.
Sell amount of the stable token in exchange for at least minGoldAmount of CELO
Requires the amount to have been approved to the exchange

**`Deprecated`**

use sellStable instead

**`Param`**

The amount of the stable token the user is selling to the exchange

**`Param`**

The minimum amount of CELO the user has to receive for this
transaction to succeed

#### Type declaration

▸ (`amount`, `minGoldAmount`): `CeloTransactionObject`\<`string`\>

Deprecated alias of sellStable.
Sell amount of the stable token in exchange for at least minGoldAmount of CELO
Requires the amount to have been approved to the exchange

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `amount` | `Value` | The amount of the stable token the user is selling to the exchange |
| `minGoldAmount` | `Value` | The minimum amount of CELO the user has to receive for this transaction to succeed |

##### Returns

`CeloTransactionObject`\<`string`\>

**`Deprecated`**

use sellStable instead

#### Defined in

[packages/sdk/contractkit/src/wrappers/Exchange.ts:195](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Exchange.ts#L195)

___

### spread

• **spread**: (...`args`: []) => `Promise`\<`BigNumber`\>

Query spread parameter

#### Type declaration

▸ (`...args`): `Promise`\<`BigNumber`\>

Query spread parameter

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [] |

##### Returns

`Promise`\<`BigNumber`\>

Current spread charged on exchanges

#### Defined in

[packages/sdk/contractkit/src/wrappers/Exchange.ts:35](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Exchange.ts#L35)

___

### updateFrequency

• **updateFrequency**: (...`args`: []) => `Promise`\<`BigNumber`\>

Query update frequency parameter

#### Type declaration

▸ (`...args`): `Promise`\<`BigNumber`\>

Query update frequency parameter

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [] |

##### Returns

`Promise`\<`BigNumber`\>

The time period that needs to elapse between bucket
updates

#### Defined in

[packages/sdk/contractkit/src/wrappers/Exchange.ts:50](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Exchange.ts#L50)

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

### buyGold

▸ **buyGold**(`amount`, `maxStableAmount`): `CeloTransactionObject`\<`string`\>

Buy amount of CELO in exchange for at most maxStableAmount of the stable token
Requires the amount to have been approved to the exchange

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `amount` | `Value` | The amount of CELO the user is buying from the exchange |
| `maxStableAmount` | `Value` | The maximum amount of the stable token the user will pay for this transaction to succeed |

#### Returns

`CeloTransactionObject`\<`string`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/Exchange.ts:204](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Exchange.ts#L204)

___

### buyStable

▸ **buyStable**(`amount`, `maxGoldAmount`): `CeloTransactionObject`\<`string`\>

Buy amount of the stable token in exchange for at least minGoldAmount of CELO
Requires the amount to have been approved to the exchange

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `amount` | `Value` | The amount of the stable token the user is selling to the exchange |
| `maxGoldAmount` | `Value` | The maximum amount of CELO the user will pay for this transaction to succeed |

#### Returns

`CeloTransactionObject`\<`string`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/Exchange.ts:214](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Exchange.ts#L214)

___

### getBuyTokenAmount

▸ **getBuyTokenAmount**(`sellAmount`, `sellGold`): `Promise`\<`BigNumber`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `sellAmount` | `Value` | The amount of sellToken the user is selling to the exchange |
| `sellGold` | `boolean` | `true` if gold is the sell token |

#### Returns

`Promise`\<`BigNumber`\>

The corresponding buyToken amount.

**`Dev`**

Returns the amount of buyToken a user would get for sellAmount of sellToken

#### Defined in

[packages/sdk/contractkit/src/wrappers/Exchange.ts:128](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Exchange.ts#L128)

___

### getConfig

▸ **getConfig**(): `Promise`\<[`ExchangeConfig`](../interfaces/wrappers_Exchange.ExchangeConfig.md)\>

#### Returns

`Promise`\<[`ExchangeConfig`](../interfaces/wrappers_Exchange.ExchangeConfig.md)\>

ExchangeConfig object

**`Dev`**

Returns the current configuration of the exchange contract

#### Defined in

[packages/sdk/contractkit/src/wrappers/Exchange.ts:281](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Exchange.ts#L281)

___

### getExchangeRate

▸ **getExchangeRate**(`buyAmount`, `sellGold`): `Promise`\<`BigNumber`\>

Returns the exchange rate estimated at buyAmount.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `buyAmount` | `Value` | The amount of buyToken in wei to estimate the exchange rate at |
| `sellGold` | `boolean` | `true` if gold is the sell token |

#### Returns

`Promise`\<`BigNumber`\>

The exchange rate (number of sellTokens received for one buyToken).

#### Defined in

[packages/sdk/contractkit/src/wrappers/Exchange.ts:317](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Exchange.ts#L317)

___

### getGoldExchangeRate

▸ **getGoldExchangeRate**(`buyAmount`): `Promise`\<`BigNumber`\>

Returns the exchange rate for CELO estimated at the buyAmount

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `buyAmount` | `Value` | The amount of CELO in wei to estimate the exchange rate at |

#### Returns

`Promise`\<`BigNumber`\>

The exchange rate (number of stable tokens received for one CELO)

#### Defined in

[packages/sdk/contractkit/src/wrappers/Exchange.ts:343](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Exchange.ts#L343)

___

### getHumanReadableConfig

▸ **getHumanReadableConfig**(): `Promise`\<\{ `lastBucketUpdate`: `string` ; `minimumReports`: `BigNumber` ; `reserveFraction`: `BigNumber` ; `spread`: `BigNumber` ; `updateFrequency`: `string`  }\>

#### Returns

`Promise`\<\{ `lastBucketUpdate`: `string` ; `minimumReports`: `BigNumber` ; `reserveFraction`: `BigNumber` ; `spread`: `BigNumber` ; `updateFrequency`: `string`  }\>

ExchangeConfig object

**`Dev`**

Returns human readable configuration of the exchange contract

#### Defined in

[packages/sdk/contractkit/src/wrappers/Exchange.ts:302](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Exchange.ts#L302)

___

### getPastEvents

▸ **getPastEvents**(`event`, `options`): `Promise`\<`EventLog`[]\>

Contract getPastEvents

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"OwnershipTransferred"`` \| ``"RegistrySet"`` \| ``"allEvents"`` \| ``"BucketsUpdated"`` \| ``"Exchanged"`` \| ``"MinimumReportsSet"`` \| ``"ReserveFractionSet"`` \| ``"SpreadSet"`` \| ``"StableTokenSet"`` \| ``"UpdateFrequencySet"`` |
| `options` | `PastEventOptions` |

#### Returns

`Promise`\<`EventLog`[]\>

#### Inherited from

[BaseWrapper](wrappers_BaseWrapper.BaseWrapper.md).[getPastEvents](wrappers_BaseWrapper.BaseWrapper.md#getpastevents)

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:57](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L57)

___

### getSellTokenAmount

▸ **getSellTokenAmount**(`buyAmount`, `sellGold`): `Promise`\<`BigNumber`\>

Returns the amount of sellToken a user would need to exchange to receive buyAmount of
buyToken.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `buyAmount` | `Value` | The amount of buyToken the user would like to purchase. |
| `sellGold` | `boolean` | `true` if gold is the sell token |

#### Returns

`Promise`\<`BigNumber`\>

The corresponding sellToken amount.

#### Defined in

[packages/sdk/contractkit/src/wrappers/Exchange.ts:144](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Exchange.ts#L144)

___

### getStableExchangeRate

▸ **getStableExchangeRate**(`buyAmount`): `Promise`\<`BigNumber`\>

Returns the exchange rate for the stable token estimated at the buyAmount

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `buyAmount` | `Value` | The amount of the stable token in wei to estimate the exchange rate at |

#### Returns

`Promise`\<`BigNumber`\>

The exchange rate (number of CELO received for one stable token)

#### Defined in

[packages/sdk/contractkit/src/wrappers/Exchange.ts:327](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Exchange.ts#L327)

___

### quoteGoldBuy

▸ **quoteGoldBuy**(`buyAmount`): `Promise`\<`BigNumber`\>

Returns the amount of the stable token a user would need to exchange to receive buyAmount of
CELO.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `buyAmount` | `Value` | The amount of CELO the user would like to purchase. |

#### Returns

`Promise`\<`BigNumber`\>

The corresponding stable token amount.

#### Defined in

[packages/sdk/contractkit/src/wrappers/Exchange.ts:275](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Exchange.ts#L275)

___

### quoteGoldSell

▸ **quoteGoldSell**(`sellAmount`): `Promise`\<`BigNumber`\>

Returns the amount of the stable token a user would get for sellAmount of CELO

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `sellAmount` | `Value` | The amount of CELO the user is selling to the exchange |

#### Returns

`Promise`\<`BigNumber`\>

The corresponding stable token amount.

#### Defined in

[packages/sdk/contractkit/src/wrappers/Exchange.ts:249](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Exchange.ts#L249)

___

### quoteStableBuy

▸ **quoteStableBuy**(`buyAmount`): `Promise`\<`BigNumber`\>

Returns the amount of CELO a user would need to exchange to receive buyAmount of
the stable token.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `buyAmount` | `Value` | The amount of the stable token the user would like to purchase. |

#### Returns

`Promise`\<`BigNumber`\>

The corresponding CELO amount.

#### Defined in

[packages/sdk/contractkit/src/wrappers/Exchange.ts:257](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Exchange.ts#L257)

___

### quoteStableSell

▸ **quoteStableSell**(`sellAmount`): `Promise`\<`BigNumber`\>

Returns the amount of CELO a user would get for sellAmount of the stable token

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `sellAmount` | `Value` | The amount of the stable token the user is selling to the exchange |

#### Returns

`Promise`\<`BigNumber`\>

The corresponding CELO amount.

#### Defined in

[packages/sdk/contractkit/src/wrappers/Exchange.ts:233](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Exchange.ts#L233)

___

### sellGold

▸ **sellGold**(`amount`, `minStableAmount`): `CeloTransactionObject`\<`string`\>

Sell amount of CELO in exchange for at least minStableAmount of the stable token
Requires the amount to have been approved to the exchange

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `amount` | `Value` | The amount of CELO the user is selling to the exchange |
| `minStableAmount` | `Value` | The minimum amount of the stable token the user has to receive for this transaction to succeed |

#### Returns

`CeloTransactionObject`\<`string`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/Exchange.ts:173](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Exchange.ts#L173)

___

### sellStable

▸ **sellStable**(`amount`, `minGoldAmount`): `CeloTransactionObject`\<`string`\>

Sell amount of the stable token in exchange for at least minGoldAmount of CELO
Requires the amount to have been approved to the exchange

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `amount` | `Value` | The amount of the stable token the user is selling to the exchange |
| `minGoldAmount` | `Value` | The minimum amount of CELO the user has to receive for this transaction to succeed |

#### Returns

`CeloTransactionObject`\<`string`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/Exchange.ts:183](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Exchange.ts#L183)

___

### version

▸ **version**(): `Promise`\<[`ContractVersion`](versions.ContractVersion.md)\>

#### Returns

`Promise`\<[`ContractVersion`](versions.ContractVersion.md)\>

#### Inherited from

[BaseWrapper](wrappers_BaseWrapper.BaseWrapper.md).[version](wrappers_BaseWrapper.BaseWrapper.md#version)

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:41](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L41)
