[@celo/contractkit](../README.md) / [Exports](../modules.md) / [wrappers/SortedOracles](../modules/wrappers_SortedOracles.md) / SortedOraclesWrapper

# Class: SortedOraclesWrapper

[wrappers/SortedOracles](../modules/wrappers_SortedOracles.md).SortedOraclesWrapper

Currency price oracle contract.

## Hierarchy

- [`BaseWrapper`](wrappers_BaseWrapper.BaseWrapper.md)\<`SortedOracles`\>

  ↳ **`SortedOraclesWrapper`**

## Table of contents

### Constructors

- [constructor](wrappers_SortedOracles.SortedOraclesWrapper.md#constructor)

### Properties

- [eventTypes](wrappers_SortedOracles.SortedOraclesWrapper.md#eventtypes)
- [events](wrappers_SortedOracles.SortedOraclesWrapper.md#events)
- [methodIds](wrappers_SortedOracles.SortedOraclesWrapper.md#methodids)
- [reportExpirySeconds](wrappers_SortedOracles.SortedOraclesWrapper.md#reportexpiryseconds)

### Accessors

- [address](wrappers_SortedOracles.SortedOraclesWrapper.md#address)

### Methods

- [getConfig](wrappers_SortedOracles.SortedOraclesWrapper.md#getconfig)
- [getHumanReadableConfig](wrappers_SortedOracles.SortedOraclesWrapper.md#gethumanreadableconfig)
- [getOracles](wrappers_SortedOracles.SortedOraclesWrapper.md#getoracles)
- [getPastEvents](wrappers_SortedOracles.SortedOraclesWrapper.md#getpastevents)
- [getRates](wrappers_SortedOracles.SortedOraclesWrapper.md#getrates)
- [getReports](wrappers_SortedOracles.SortedOraclesWrapper.md#getreports)
- [getStableTokenRates](wrappers_SortedOracles.SortedOraclesWrapper.md#getstabletokenrates)
- [getTimestamps](wrappers_SortedOracles.SortedOraclesWrapper.md#gettimestamps)
- [getTokenReportExpirySeconds](wrappers_SortedOracles.SortedOraclesWrapper.md#gettokenreportexpiryseconds)
- [isOldestReportExpired](wrappers_SortedOracles.SortedOraclesWrapper.md#isoldestreportexpired)
- [isOracle](wrappers_SortedOracles.SortedOraclesWrapper.md#isoracle)
- [medianRate](wrappers_SortedOracles.SortedOraclesWrapper.md#medianrate)
- [numRates](wrappers_SortedOracles.SortedOraclesWrapper.md#numrates)
- [removeExpiredReports](wrappers_SortedOracles.SortedOraclesWrapper.md#removeexpiredreports)
- [report](wrappers_SortedOracles.SortedOraclesWrapper.md#report)
- [reportStableToken](wrappers_SortedOracles.SortedOraclesWrapper.md#reportstabletoken)
- [version](wrappers_SortedOracles.SortedOraclesWrapper.md#version)

## Constructors

### constructor

• **new SortedOraclesWrapper**(`connection`, `contract`, `registry`): [`SortedOraclesWrapper`](wrappers_SortedOracles.SortedOraclesWrapper.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `connection` | `Connection` |
| `contract` | `SortedOracles` |
| `registry` | [`AddressRegistry`](address_registry.AddressRegistry.md) |

#### Returns

[`SortedOraclesWrapper`](wrappers_SortedOracles.SortedOraclesWrapper.md)

#### Overrides

[BaseWrapper](wrappers_BaseWrapper.BaseWrapper.md).[constructor](wrappers_BaseWrapper.BaseWrapper.md#constructor)

#### Defined in

[packages/sdk/contractkit/src/wrappers/SortedOracles.ts:58](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/SortedOracles.ts#L58)

## Properties

### eventTypes

• **eventTypes**: `EventsEnum`\<`SortedOracles`\>

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
| `BreakerBoxUpdated` | `ContractEvent`\<`string`\> |
| `EquivalentTokenSet` | `ContractEvent`\<\{ `0`: `string` ; `1`: `string` ; `equivalentToken`: `string` ; `token`: `string`  }\> |
| `MedianUpdated` | `ContractEvent`\<\{ `0`: `string` ; `1`: `string` ; `token`: `string` ; `value`: `string`  }\> |
| `OracleAdded` | `ContractEvent`\<\{ `0`: `string` ; `1`: `string` ; `oracleAddress`: `string` ; `token`: `string`  }\> |
| `OracleRemoved` | `ContractEvent`\<\{ `0`: `string` ; `1`: `string` ; `oracleAddress`: `string` ; `token`: `string`  }\> |
| `OracleReportRemoved` | `ContractEvent`\<\{ `0`: `string` ; `1`: `string` ; `oracle`: `string` ; `token`: `string`  }\> |
| `OracleReported` | `ContractEvent`\<\{ `0`: `string` ; `1`: `string` ; `2`: `string` ; `3`: `string` ; `oracle`: `string` ; `timestamp`: `string` ; `token`: `string` ; `value`: `string`  }\> |
| `OwnershipTransferred` | `ContractEvent`\<\{ `0`: `string` ; `1`: `string` ; `newOwner`: `string` ; `previousOwner`: `string`  }\> |
| `ReportExpirySet` | `ContractEvent`\<`string`\> |
| `TokenReportExpirySet` | `ContractEvent`\<\{ `0`: `string` ; `1`: `string` ; `reportExpiry`: `string` ; `token`: `string`  }\> |
| `allEvents` | (`options?`: `EventOptions`, `cb?`: `Callback`\<`EventLog`\>) => `EventEmitter` |

#### Inherited from

[BaseWrapper](wrappers_BaseWrapper.BaseWrapper.md).[events](wrappers_BaseWrapper.BaseWrapper.md#events)

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:61](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L61)

___

### methodIds

• **methodIds**: `Record`\<``"reportExpirySeconds"`` \| ``"initialized"`` \| ``"isOwner"`` \| ``"owner"`` \| ``"renounceOwnership"`` \| ``"transferOwnership"`` \| ``"getVersionNumber"`` \| ``"initialize"`` \| ``"breakerBox"`` \| ``"equivalentTokens"`` \| ``"isOracle"`` \| ``"oracles"`` \| ``"tokenReportExpirySeconds"`` \| ``"setReportExpiry"`` \| ``"setTokenReportExpiry"`` \| ``"setBreakerBox"`` \| ``"addOracle"`` \| ``"removeOracle"`` \| ``"removeExpiredReports"`` \| ``"isOldestReportExpired"`` \| ``"setEquivalentToken"`` \| ``"deleteEquivalentToken"`` \| ``"getEquivalentToken"`` \| ``"report"`` \| ``"numRates"`` \| ``"medianRateWithoutEquivalentMapping"`` \| ``"medianRate"`` \| ``"getRates"`` \| ``"numTimestamps"`` \| ``"medianTimestamp"`` \| ``"getTimestamps"`` \| ``"getOracles"`` \| ``"getTokenReportExpirySeconds"``, `string`\>

#### Inherited from

[BaseWrapper](wrappers_BaseWrapper.BaseWrapper.md).[methodIds](wrappers_BaseWrapper.BaseWrapper.md#methodids)

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:68](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L68)

___

### reportExpirySeconds

• **reportExpirySeconds**: (...`args`: []) => `Promise`\<`BigNumber`\>

Returns the report expiry parameter.

#### Type declaration

▸ (`...args`): `Promise`\<`BigNumber`\>

Returns the report expiry parameter.

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [] |

##### Returns

`Promise`\<`BigNumber`\>

Current report expiry.

#### Defined in

[packages/sdk/contractkit/src/wrappers/SortedOracles.ts:115](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/SortedOracles.ts#L115)

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

▸ **getConfig**(): `Promise`\<[`SortedOraclesConfig`](../interfaces/wrappers_SortedOracles.SortedOraclesConfig.md)\>

Returns current configuration parameters.

#### Returns

`Promise`\<[`SortedOraclesConfig`](../interfaces/wrappers_SortedOracles.SortedOraclesConfig.md)\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/SortedOracles.ts:207](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/SortedOracles.ts#L207)

___

### getHumanReadableConfig

▸ **getHumanReadableConfig**(): `Promise`\<\{ `reportExpiry`: `string`  }\>

#### Returns

`Promise`\<\{ `reportExpiry`: `string`  }\>

SortedOraclesConfig object

**`Dev`**

Returns human readable configuration of the sortedoracles contract

#### Defined in

[packages/sdk/contractkit/src/wrappers/SortedOracles.ts:217](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/SortedOracles.ts#L217)

___

### getOracles

▸ **getOracles**(`target`): `Promise`\<`string`[]\>

Returns the list of whitelisted oracles for a given target

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `target` | `string` | The ReportTarget, either CeloToken or currency pair |

#### Returns

`Promise`\<`string`[]\>

The list of whitelisted oracles for a given token.

#### Defined in

[packages/sdk/contractkit/src/wrappers/SortedOracles.ts:106](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/SortedOracles.ts#L106)

___

### getPastEvents

▸ **getPastEvents**(`event`, `options`): `Promise`\<`EventLog`[]\>

Contract getPastEvents

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"OwnershipTransferred"`` \| ``"allEvents"`` \| ``"BreakerBoxUpdated"`` \| ``"EquivalentTokenSet"`` \| ``"MedianUpdated"`` \| ``"OracleAdded"`` \| ``"OracleRemoved"`` \| ``"OracleReportRemoved"`` \| ``"OracleReported"`` \| ``"ReportExpirySet"`` \| ``"TokenReportExpirySet"`` |
| `options` | `PastEventOptions` |

#### Returns

`Promise`\<`EventLog`[]\>

#### Inherited from

[BaseWrapper](wrappers_BaseWrapper.BaseWrapper.md).[getPastEvents](wrappers_BaseWrapper.BaseWrapper.md#getpastevents)

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:57](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L57)

___

### getRates

▸ **getRates**(`target`): `Promise`\<[`OracleRate`](../interfaces/wrappers_SortedOracles.OracleRate.md)[]\>

Gets all elements from the doubly linked list.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `target` | `string` | The ReportTarget, either CeloToken or currency pair in question |

#### Returns

`Promise`\<[`OracleRate`](../interfaces/wrappers_SortedOracles.OracleRate.md)[]\>

An unpacked list of elements from largest to smallest.

#### Defined in

[packages/sdk/contractkit/src/wrappers/SortedOracles.ts:235](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/SortedOracles.ts#L235)

___

### getReports

▸ **getReports**(`target`): `Promise`\<[`OracleReport`](../interfaces/wrappers_SortedOracles.OracleReport.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `target` | `string` |

#### Returns

`Promise`\<[`OracleReport`](../interfaces/wrappers_SortedOracles.OracleReport.md)[]\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/SortedOracles.ts:270](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/SortedOracles.ts#L270)

___

### getStableTokenRates

▸ **getStableTokenRates**(): `Promise`\<[`OracleRate`](../interfaces/wrappers_SortedOracles.OracleRate.md)[]\>

Helper function to get the rates for StableToken, by passing the address
of StableToken to `getRates`.

#### Returns

`Promise`\<[`OracleRate`](../interfaces/wrappers_SortedOracles.OracleRate.md)[]\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/SortedOracles.ts:228](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/SortedOracles.ts#L228)

___

### getTimestamps

▸ **getTimestamps**(`target`): `Promise`\<[`OracleTimestamp`](../interfaces/wrappers_SortedOracles.OracleTimestamp.md)[]\>

Gets all elements from the doubly linked list.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `target` | `string` | The ReportTarget, either CeloToken or currency pair in question |

#### Returns

`Promise`\<[`OracleTimestamp`](../interfaces/wrappers_SortedOracles.OracleTimestamp.md)[]\>

An unpacked list of elements from largest to smallest.

#### Defined in

[packages/sdk/contractkit/src/wrappers/SortedOracles.ts:255](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/SortedOracles.ts#L255)

___

### getTokenReportExpirySeconds

▸ **getTokenReportExpirySeconds**(`target`): `Promise`\<`BigNumber`\>

Returns the expiry for the target if exists, if not the default.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `target` | `string` | The ReportTarget, either CeloToken or currency pair |

#### Returns

`Promise`\<`BigNumber`\>

The report expiry in seconds.

#### Defined in

[packages/sdk/contractkit/src/wrappers/SortedOracles.ts:126](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/SortedOracles.ts#L126)

___

### isOldestReportExpired

▸ **isOldestReportExpired**(`target`): `Promise`\<[`boolean`, `string`]\>

Checks if the oldest report for a given target is expired

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `target` | `string` | The ReportTarget, either CeloToken or currency pair |

#### Returns

`Promise`\<[`boolean`, `string`]\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/SortedOracles.ts:136](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/SortedOracles.ts#L136)

___

### isOracle

▸ **isOracle**(`target`, `oracle`): `Promise`\<`boolean`\>

Checks if the given address is whitelisted as an oracle for the target

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `target` | `string` | The ReportTarget, either CeloToken or currency pair |
| `oracle` | `string` | The address that we're checking the oracle status of |

#### Returns

`Promise`\<`boolean`\>

boolean describing whether this account is an oracle

#### Defined in

[packages/sdk/contractkit/src/wrappers/SortedOracles.ts:96](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/SortedOracles.ts#L96)

___

### medianRate

▸ **medianRate**(`target`): `Promise`\<[`MedianRate`](../interfaces/wrappers_SortedOracles.MedianRate.md)\>

Returns the median rate for the given target

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `target` | `string` | The ReportTarget, either CeloToken or currency pair |

#### Returns

`Promise`\<[`MedianRate`](../interfaces/wrappers_SortedOracles.MedianRate.md)\>

The median exchange rate for `token`, expressed as:
  amount of that token / equivalent amount in CELO

#### Defined in

[packages/sdk/contractkit/src/wrappers/SortedOracles.ts:82](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/SortedOracles.ts#L82)

___

### numRates

▸ **numRates**(`target`): `Promise`\<`number`\>

Gets the number of rates that have been reported for the given target

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `target` | `string` | The ReportTarget, either CeloToken or currency pair |

#### Returns

`Promise`\<`number`\>

The number of reported oracle rates for `token`.

#### Defined in

[packages/sdk/contractkit/src/wrappers/SortedOracles.ts:70](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/SortedOracles.ts#L70)

___

### removeExpiredReports

▸ **removeExpiredReports**(`target`, `numReports?`): `Promise`\<`CeloTransactionObject`\<`void`\>\>

Removes expired reports, if any exist

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `target` | `string` | The ReportTarget, either CeloToken or currency pair |
| `numReports?` | `number` | The upper-limit of reports to remove. For example, if there are 2 expired reports, and this param is 5, it will only remove the 2 that are expired. |

#### Returns

`Promise`\<`CeloTransactionObject`\<`void`\>\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/SortedOracles.ts:150](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/SortedOracles.ts#L150)

___

### report

▸ **report**(`target`, `value`, `oracleAddress`): `Promise`\<`CeloTransactionObject`\<`void`\>\>

Updates an oracle value and the median.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `target` | `string` | The ReportTarget, either CeloToken or currency pair |
| `value` | `Value` | The amount of `token` equal to one CELO. |
| `oracleAddress` | `string` | - |

#### Returns

`Promise`\<`CeloTransactionObject`\<`void`\>\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/SortedOracles.ts:169](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/SortedOracles.ts#L169)

___

### reportStableToken

▸ **reportStableToken**(`value`, `oracleAddress`, `token?`): `Promise`\<`CeloTransactionObject`\<`void`\>\>

Updates an oracle value and the median.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `value` | `Value` | `undefined` | The amount of US Dollars equal to one CELO. |
| `oracleAddress` | `string` | `undefined` | The address to report as |
| `token` | [`StableToken`](../enums/celo_tokens.StableToken.md) | `StableToken.cUSD` | The token to report for |

#### Returns

`Promise`\<`CeloTransactionObject`\<`void`\>\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/SortedOracles.ts:196](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/SortedOracles.ts#L196)

___

### version

▸ **version**(): `Promise`\<[`ContractVersion`](versions.ContractVersion.md)\>

#### Returns

`Promise`\<[`ContractVersion`](versions.ContractVersion.md)\>

#### Inherited from

[BaseWrapper](wrappers_BaseWrapper.BaseWrapper.md).[version](wrappers_BaseWrapper.BaseWrapper.md#version)

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:41](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L41)
