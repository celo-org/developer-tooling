[**@celo/contractkit**](../../../README.md)

***

[@celo/contractkit](../../../modules.md) / [wrappers/AbstractFeeCurrencyWrapper](../README.md) / AbstractFeeCurrencyWrapper

# Class: `abstract` AbstractFeeCurrencyWrapper\<TContract\>

Defined in: [packages/sdk/contractkit/src/wrappers/AbstractFeeCurrencyWrapper.ts:44](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/AbstractFeeCurrencyWrapper.ts#L44)

**`Internal`**

-- use its children

## Extends

- [`BaseWrapper`](../../BaseWrapper/classes/BaseWrapper.md)\<`TContract`\>

## Extended by

- [`FeeCurrencyDirectoryWrapper`](../../FeeCurrencyDirectoryWrapper/classes/FeeCurrencyDirectoryWrapper.md)

## Type Parameters

### TContract

`TContract` *extends* `Contract`

## Constructors

### Constructor

> **new AbstractFeeCurrencyWrapper**\<`TContract`\>(`connection`, `contract`): `AbstractFeeCurrencyWrapper`\<`TContract`\>

Defined in: [packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:34](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L34)

#### Parameters

##### connection

`Connection`

##### contract

`TContract`

#### Returns

`AbstractFeeCurrencyWrapper`\<`TContract`\>

#### Inherited from

[`BaseWrapper`](../../BaseWrapper/classes/BaseWrapper.md).[`constructor`](../../BaseWrapper/classes/BaseWrapper.md#constructor)

## Properties

### events

> **events**: `TContract`\[`"events"`\]

Defined in: [packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:61](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L61)

#### Inherited from

[`BaseWrapper`](../../BaseWrapper/classes/BaseWrapper.md).[`events`](../../BaseWrapper/classes/BaseWrapper.md#events)

***

### eventTypes

> **eventTypes**: `EventsEnum`\<`TContract`\>

Defined in: [packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:63](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L63)

#### Inherited from

[`BaseWrapper`](../../BaseWrapper/classes/BaseWrapper.md).[`eventTypes`](../../BaseWrapper/classes/BaseWrapper.md#eventtypes)

***

### methodIds

> **methodIds**: `Record`\<keyof `TContract`\[`"methods"`\], `string`\>

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

### getAddresses()

> `abstract` **getAddresses**(): `Promise`\<`` `0x${string}` ``[]\>

Defined in: [packages/sdk/contractkit/src/wrappers/AbstractFeeCurrencyWrapper.ts:47](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/AbstractFeeCurrencyWrapper.ts#L47)

#### Returns

`Promise`\<`` `0x${string}` ``[]\>

***

### getFeeCurrencyInformation()

> **getFeeCurrencyInformation**(`whitelist?`): `Promise`\<`object`[]\>

Defined in: [packages/sdk/contractkit/src/wrappers/AbstractFeeCurrencyWrapper.ts:49](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/AbstractFeeCurrencyWrapper.ts#L49)

#### Parameters

##### whitelist?

`` `0x${string}` ``[]

#### Returns

`Promise`\<`object`[]\>

***

### getPastEvents()

> **getPastEvents**(`event`, `options`): `Promise`\<`EventLog`[]\>

Defined in: [packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:57](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L57)

Contract getPastEvents

#### Parameters

##### event

keyof `TContract`\[`"events"`\]

##### options

`PastEventOptions`

#### Returns

`Promise`\<`EventLog`[]\>

#### Inherited from

[`BaseWrapper`](../../BaseWrapper/classes/BaseWrapper.md).[`getPastEvents`](../../BaseWrapper/classes/BaseWrapper.md#getpastevents)

***

### version()

> **version**(): `Promise`\<`TContract`\[`"methods"`\] *extends* `object` ? [`ContractVersion`](../../../versions/classes/ContractVersion.md) : `never`\>

Defined in: [packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:41](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L41)

#### Returns

`Promise`\<`TContract`\[`"methods"`\] *extends* `object` ? [`ContractVersion`](../../../versions/classes/ContractVersion.md) : `never`\>

#### Inherited from

[`BaseWrapper`](../../BaseWrapper/classes/BaseWrapper.md).[`version`](../../BaseWrapper/classes/BaseWrapper.md#version)
