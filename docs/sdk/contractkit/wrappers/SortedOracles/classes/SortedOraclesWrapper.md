[**@celo/contractkit**](../../../README.md)

***

[@celo/contractkit](../../../modules.md) / [wrappers/SortedOracles](../README.md) / SortedOraclesWrapper

# Class: SortedOraclesWrapper

Defined in: [packages/sdk/contractkit/src/wrappers/SortedOracles.ts:57](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/SortedOracles.ts#L57)

Currency price oracle contract.

## Extends

- [`BaseWrapper`](../../BaseWrapper/classes/BaseWrapper.md)\<`SortedOracles`\>

## Constructors

### Constructor

> **new SortedOraclesWrapper**(`connection`, `contract`, `registry`): `SortedOraclesWrapper`

Defined in: [packages/sdk/contractkit/src/wrappers/SortedOracles.ts:58](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/SortedOracles.ts#L58)

#### Parameters

##### connection

`Connection`

##### contract

`SortedOracles`

##### registry

[`AddressRegistry`](../../../address-registry/classes/AddressRegistry.md)

#### Returns

`SortedOraclesWrapper`

#### Overrides

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

#### BreakerBoxUpdated

> **BreakerBoxUpdated**: `ContractEvent`\<`string`\>

#### EquivalentTokenSet

> **EquivalentTokenSet**: `ContractEvent`\<\{ `0`: `string`; `1`: `string`; `equivalentToken`: `string`; `token`: `string`; \}\>

#### MedianUpdated

> **MedianUpdated**: `ContractEvent`\<\{ `0`: `string`; `1`: `string`; `token`: `string`; `value`: `string`; \}\>

#### OracleAdded

> **OracleAdded**: `ContractEvent`\<\{ `0`: `string`; `1`: `string`; `oracleAddress`: `string`; `token`: `string`; \}\>

#### OracleRemoved

> **OracleRemoved**: `ContractEvent`\<\{ `0`: `string`; `1`: `string`; `oracleAddress`: `string`; `token`: `string`; \}\>

#### OracleReported

> **OracleReported**: `ContractEvent`\<\{ `0`: `string`; `1`: `string`; `2`: `string`; `3`: `string`; `oracle`: `string`; `timestamp`: `string`; `token`: `string`; `value`: `string`; \}\>

#### OracleReportRemoved

> **OracleReportRemoved**: `ContractEvent`\<\{ `0`: `string`; `1`: `string`; `oracle`: `string`; `token`: `string`; \}\>

#### OwnershipTransferred

> **OwnershipTransferred**: `ContractEvent`\<\{ `0`: `string`; `1`: `string`; `newOwner`: `string`; `previousOwner`: `string`; \}\>

#### ReportExpirySet

> **ReportExpirySet**: `ContractEvent`\<`string`\>

#### TokenReportExpirySet

> **TokenReportExpirySet**: `ContractEvent`\<\{ `0`: `string`; `1`: `string`; `reportExpiry`: `string`; `token`: `string`; \}\>

#### Inherited from

[`BaseWrapper`](../../BaseWrapper/classes/BaseWrapper.md).[`events`](../../BaseWrapper/classes/BaseWrapper.md#events)

***

### eventTypes

> **eventTypes**: `EventsEnum`\<`SortedOracles`\>

Defined in: [packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:63](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L63)

#### Inherited from

[`BaseWrapper`](../../BaseWrapper/classes/BaseWrapper.md).[`eventTypes`](../../BaseWrapper/classes/BaseWrapper.md#eventtypes)

***

### methodIds

> **methodIds**: `Record`\<`"reportExpirySeconds"` \| `"initialized"` \| `"isOwner"` \| `"owner"` \| `"renounceOwnership"` \| `"transferOwnership"` \| `"initialize"` \| `"getVersionNumber"` \| `"breakerBox"` \| `"equivalentTokens"` \| `"isOracle"` \| `"oracles"` \| `"tokenReportExpirySeconds"` \| `"setReportExpiry"` \| `"setTokenReportExpiry"` \| `"setBreakerBox"` \| `"addOracle"` \| `"removeOracle"` \| `"removeExpiredReports"` \| `"isOldestReportExpired"` \| `"setEquivalentToken"` \| `"deleteEquivalentToken"` \| `"getEquivalentToken"` \| `"report"` \| `"numRates"` \| `"medianRateWithoutEquivalentMapping"` \| `"medianRate"` \| `"getRates"` \| `"numTimestamps"` \| `"medianTimestamp"` \| `"getTimestamps"` \| `"getOracles"` \| `"getTokenReportExpirySeconds"`, `string`\>

Defined in: [packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:68](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L68)

#### Inherited from

[`BaseWrapper`](../../BaseWrapper/classes/BaseWrapper.md).[`methodIds`](../../BaseWrapper/classes/BaseWrapper.md#methodids)

***

### reportExpirySeconds()

> **reportExpirySeconds**: (...`args`) => `Promise`\<`BigNumber`\>

Defined in: [packages/sdk/contractkit/src/wrappers/SortedOracles.ts:115](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/SortedOracles.ts#L115)

Returns the report expiry parameter.

#### Parameters

##### args

...\[\]

#### Returns

`Promise`\<`BigNumber`\>

Current report expiry.

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

> **getConfig**(): `Promise`\<[`SortedOraclesConfig`](../interfaces/SortedOraclesConfig.md)\>

Defined in: [packages/sdk/contractkit/src/wrappers/SortedOracles.ts:207](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/SortedOracles.ts#L207)

Returns current configuration parameters.

#### Returns

`Promise`\<[`SortedOraclesConfig`](../interfaces/SortedOraclesConfig.md)\>

***

### getHumanReadableConfig()

> **getHumanReadableConfig**(): `Promise`\<\{ `reportExpiry`: `string`; \}\>

Defined in: [packages/sdk/contractkit/src/wrappers/SortedOracles.ts:217](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/SortedOracles.ts#L217)

#### Returns

`Promise`\<\{ `reportExpiry`: `string`; \}\>

SortedOraclesConfig object

#### Dev

Returns human readable configuration of the sortedoracles contract

***

### getOracles()

> **getOracles**(`target`): `Promise`\<`string`[]\>

Defined in: [packages/sdk/contractkit/src/wrappers/SortedOracles.ts:106](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/SortedOracles.ts#L106)

Returns the list of whitelisted oracles for a given target

#### Parameters

##### target

`string`

The ReportTarget, either CeloToken or currency pair

#### Returns

`Promise`\<`string`[]\>

The list of whitelisted oracles for a given token.

***

### getPastEvents()

> **getPastEvents**(`event`, `options`): `Promise`\<`EventLog`[]\>

Defined in: [packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:57](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L57)

Contract getPastEvents

#### Parameters

##### event

`"OwnershipTransferred"` | `"allEvents"` | `"BreakerBoxUpdated"` | `"EquivalentTokenSet"` | `"MedianUpdated"` | `"OracleAdded"` | `"OracleRemoved"` | `"OracleReportRemoved"` | `"OracleReported"` | `"ReportExpirySet"` | `"TokenReportExpirySet"`

##### options

`PastEventOptions`

#### Returns

`Promise`\<`EventLog`[]\>

#### Inherited from

[`BaseWrapper`](../../BaseWrapper/classes/BaseWrapper.md).[`getPastEvents`](../../BaseWrapper/classes/BaseWrapper.md#getpastevents)

***

### getRates()

> **getRates**(`target`): `Promise`\<[`OracleRate`](../interfaces/OracleRate.md)[]\>

Defined in: [packages/sdk/contractkit/src/wrappers/SortedOracles.ts:235](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/SortedOracles.ts#L235)

Gets all elements from the doubly linked list.

#### Parameters

##### target

`string`

The ReportTarget, either CeloToken or currency pair in question

#### Returns

`Promise`\<[`OracleRate`](../interfaces/OracleRate.md)[]\>

An unpacked list of elements from largest to smallest.

***

### getReports()

> **getReports**(`target`): `Promise`\<[`OracleReport`](../interfaces/OracleReport.md)[]\>

Defined in: [packages/sdk/contractkit/src/wrappers/SortedOracles.ts:270](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/SortedOracles.ts#L270)

#### Parameters

##### target

`string`

#### Returns

`Promise`\<[`OracleReport`](../interfaces/OracleReport.md)[]\>

***

### getStableTokenRates()

> **getStableTokenRates**(): `Promise`\<[`OracleRate`](../interfaces/OracleRate.md)[]\>

Defined in: [packages/sdk/contractkit/src/wrappers/SortedOracles.ts:228](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/SortedOracles.ts#L228)

Helper function to get the rates for StableToken, by passing the address
of StableToken to `getRates`.

#### Returns

`Promise`\<[`OracleRate`](../interfaces/OracleRate.md)[]\>

***

### getTimestamps()

> **getTimestamps**(`target`): `Promise`\<[`OracleTimestamp`](../interfaces/OracleTimestamp.md)[]\>

Defined in: [packages/sdk/contractkit/src/wrappers/SortedOracles.ts:255](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/SortedOracles.ts#L255)

Gets all elements from the doubly linked list.

#### Parameters

##### target

`string`

The ReportTarget, either CeloToken or currency pair in question

#### Returns

`Promise`\<[`OracleTimestamp`](../interfaces/OracleTimestamp.md)[]\>

An unpacked list of elements from largest to smallest.

***

### getTokenReportExpirySeconds()

> **getTokenReportExpirySeconds**(`target`): `Promise`\<`BigNumber`\>

Defined in: [packages/sdk/contractkit/src/wrappers/SortedOracles.ts:126](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/SortedOracles.ts#L126)

Returns the expiry for the target if exists, if not the default.

#### Parameters

##### target

`string`

The ReportTarget, either CeloToken or currency pair

#### Returns

`Promise`\<`BigNumber`\>

The report expiry in seconds.

***

### isOldestReportExpired()

> **isOldestReportExpired**(`target`): `Promise`\<\[`boolean`, `string`\]\>

Defined in: [packages/sdk/contractkit/src/wrappers/SortedOracles.ts:136](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/SortedOracles.ts#L136)

Checks if the oldest report for a given target is expired

#### Parameters

##### target

`string`

The ReportTarget, either CeloToken or currency pair

#### Returns

`Promise`\<\[`boolean`, `string`\]\>

***

### isOracle()

> **isOracle**(`target`, `oracle`): `Promise`\<`boolean`\>

Defined in: [packages/sdk/contractkit/src/wrappers/SortedOracles.ts:96](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/SortedOracles.ts#L96)

Checks if the given address is whitelisted as an oracle for the target

#### Parameters

##### target

`string`

The ReportTarget, either CeloToken or currency pair

##### oracle

`string`

The address that we're checking the oracle status of

#### Returns

`Promise`\<`boolean`\>

boolean describing whether this account is an oracle

***

### medianRate()

> **medianRate**(`target`): `Promise`\<[`MedianRate`](../interfaces/MedianRate.md)\>

Defined in: [packages/sdk/contractkit/src/wrappers/SortedOracles.ts:82](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/SortedOracles.ts#L82)

Returns the median rate for the given target

#### Parameters

##### target

`string`

The ReportTarget, either CeloToken or currency pair

#### Returns

`Promise`\<[`MedianRate`](../interfaces/MedianRate.md)\>

The median exchange rate for `token`, expressed as:
  amount of that token / equivalent amount in CELO

***

### numRates()

> **numRates**(`target`): `Promise`\<`number`\>

Defined in: [packages/sdk/contractkit/src/wrappers/SortedOracles.ts:70](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/SortedOracles.ts#L70)

Gets the number of rates that have been reported for the given target

#### Parameters

##### target

`string`

The ReportTarget, either CeloToken or currency pair

#### Returns

`Promise`\<`number`\>

The number of reported oracle rates for `token`.

***

### removeExpiredReports()

> **removeExpiredReports**(`target`, `numReports?`): `Promise`\<`CeloTransactionObject`\<`void`\>\>

Defined in: [packages/sdk/contractkit/src/wrappers/SortedOracles.ts:150](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/SortedOracles.ts#L150)

Removes expired reports, if any exist

#### Parameters

##### target

`string`

The ReportTarget, either CeloToken or currency pair

##### numReports?

`number`

The upper-limit of reports to remove. For example, if there
are 2 expired reports, and this param is 5, it will only remove the 2 that
are expired.

#### Returns

`Promise`\<`CeloTransactionObject`\<`void`\>\>

***

### report()

> **report**(`target`, `value`, `oracleAddress`): `Promise`\<`CeloTransactionObject`\<`void`\>\>

Defined in: [packages/sdk/contractkit/src/wrappers/SortedOracles.ts:169](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/SortedOracles.ts#L169)

Updates an oracle value and the median.

#### Parameters

##### target

`string`

The ReportTarget, either CeloToken or currency pair

##### value

`Value`

The amount of `token` equal to one CELO.

##### oracleAddress

`string`

#### Returns

`Promise`\<`CeloTransactionObject`\<`void`\>\>

***

### reportStableToken()

> **reportStableToken**(`value`, `oracleAddress`, `token`): `Promise`\<`CeloTransactionObject`\<`void`\>\>

Defined in: [packages/sdk/contractkit/src/wrappers/SortedOracles.ts:196](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/SortedOracles.ts#L196)

Updates an oracle value and the median.

#### Parameters

##### value

`Value`

The amount of US Dollars equal to one CELO.

##### oracleAddress

`string`

The address to report as

##### token

[`StableToken`](../../../celo-tokens/enumerations/StableToken.md) = `StableToken.cUSD`

The token to report for

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
