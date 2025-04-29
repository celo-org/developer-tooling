[**@celo/contractkit**](../../../README.md)

***

[@celo/contractkit](../../../modules.md) / [wrappers/OdisPayments](../README.md) / OdisPaymentsWrapper

# Class: OdisPaymentsWrapper

Defined in: [packages/sdk/contractkit/src/wrappers/OdisPayments.ts:6](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/OdisPayments.ts#L6)

**`Internal`**

-- use its children

## Extends

- [`BaseWrapper`](../../BaseWrapper/classes/BaseWrapper.md)\<`OdisPayments`\>

## Constructors

### Constructor

> **new OdisPaymentsWrapper**(`connection`, `contract`): `OdisPaymentsWrapper`

Defined in: [packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:34](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L34)

#### Parameters

##### connection

`Connection`

##### contract

`OdisPayments`

#### Returns

`OdisPaymentsWrapper`

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

#### OwnershipTransferred

> **OwnershipTransferred**: `ContractEvent`\<\{ `0`: `string`; `1`: `string`; `newOwner`: `string`; `previousOwner`: `string`; \}\>

#### PaymentMade

> **PaymentMade**: `ContractEvent`\<\{ `0`: `string`; `1`: `string`; `account`: `string`; `valueInCUSD`: `string`; \}\>

#### Inherited from

[`BaseWrapper`](../../BaseWrapper/classes/BaseWrapper.md).[`events`](../../BaseWrapper/classes/BaseWrapper.md#events)

***

### eventTypes

> **eventTypes**: `EventsEnum`\<`OdisPayments`\>

Defined in: [packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:63](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L63)

#### Inherited from

[`BaseWrapper`](../../BaseWrapper/classes/BaseWrapper.md).[`eventTypes`](../../BaseWrapper/classes/BaseWrapper.md#eventtypes)

***

### methodIds

> **methodIds**: `Record`\<`"initialized"` \| `"isOwner"` \| `"owner"` \| `"renounceOwnership"` \| `"transferOwnership"` \| `"initialize"` \| `"getVersionNumber"` \| `"registryContract"` \| `"totalPaidCUSD"` \| `"payInCUSD"`, `string`\>

Defined in: [packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:68](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L68)

#### Inherited from

[`BaseWrapper`](../../BaseWrapper/classes/BaseWrapper.md).[`methodIds`](../../BaseWrapper/classes/BaseWrapper.md#methodids)

***

### payInCUSD()

> **payInCUSD**: (`account`, `value`) => `CeloTransactionObject`\<`void`\>

Defined in: [packages/sdk/contractkit/src/wrappers/OdisPayments.ts:23](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/OdisPayments.ts#L23)

#### Parameters

##### account

`string`

The account whose balance to increment.

##### value

The amount in cUSD to pay.

`string` | `number`

#### Returns

`CeloTransactionObject`\<`void`\>

#### Notice

Sends cUSD to this contract to pay for ODIS quota (for queries).

#### Dev

Throws if cUSD transfer fails.

***

### totalPaidCUSD()

> **totalPaidCUSD**: (`account`) => `Promise`\<`BigNumber`\>

Defined in: [packages/sdk/contractkit/src/wrappers/OdisPayments.ts:11](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/OdisPayments.ts#L11)

#### Parameters

##### account

`string`

The account to fetch total amount of funds sent

#### Returns

`Promise`\<`BigNumber`\>

#### Notice

Fetches total amount sent (all-time) for given account to odisPayments

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

### getPastEvents()

> **getPastEvents**(`event`, `options`): `Promise`\<`EventLog`[]\>

Defined in: [packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:57](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L57)

Contract getPastEvents

#### Parameters

##### event

`"OwnershipTransferred"` | `"allEvents"` | `"PaymentMade"`

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
