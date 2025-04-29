[**@celo/contractkit**](../../../README.md)

***

[@celo/contractkit](../../../modules.md) / [wrappers/FeeCurrencyDirectoryWrapper](../README.md) / FeeCurrencyDirectoryWrapper

# Class: FeeCurrencyDirectoryWrapper

Defined in: [packages/sdk/contractkit/src/wrappers/FeeCurrencyDirectoryWrapper.ts:16](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/FeeCurrencyDirectoryWrapper.ts#L16)

FeeCurrencyDirectory contract listing available currencies usable to pay fees

## Extends

- [`AbstractFeeCurrencyWrapper`](../../AbstractFeeCurrencyWrapper/classes/AbstractFeeCurrencyWrapper.md)\<`FeeCurrencyDirectory`\>

## Constructors

### Constructor

> **new FeeCurrencyDirectoryWrapper**(`connection`, `contract`): `FeeCurrencyDirectoryWrapper`

Defined in: [packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:34](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L34)

#### Parameters

##### connection

`Connection`

##### contract

`FeeCurrencyDirectory`

#### Returns

`FeeCurrencyDirectoryWrapper`

#### Inherited from

[`AbstractFeeCurrencyWrapper`](../../AbstractFeeCurrencyWrapper/classes/AbstractFeeCurrencyWrapper.md).[`constructor`](../../AbstractFeeCurrencyWrapper/classes/AbstractFeeCurrencyWrapper.md#constructor)

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

#### CurrencyConfigSet

> **CurrencyConfigSet**: `ContractEvent`\<\{ `0`: `string`; `1`: `string`; `2`: `string`; `intrinsicGas`: `string`; `oracle`: `string`; `token`: `string`; \}\>

#### CurrencyRemoved

> **CurrencyRemoved**: `ContractEvent`\<`string`\>

#### OwnershipTransferred

> **OwnershipTransferred**: `ContractEvent`\<\{ `0`: `string`; `1`: `string`; `newOwner`: `string`; `previousOwner`: `string`; \}\>

#### Inherited from

[`AbstractFeeCurrencyWrapper`](../../AbstractFeeCurrencyWrapper/classes/AbstractFeeCurrencyWrapper.md).[`events`](../../AbstractFeeCurrencyWrapper/classes/AbstractFeeCurrencyWrapper.md#events)

***

### eventTypes

> **eventTypes**: `EventsEnum`\<`FeeCurrencyDirectory`\>

Defined in: [packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:63](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L63)

#### Inherited from

[`AbstractFeeCurrencyWrapper`](../../AbstractFeeCurrencyWrapper/classes/AbstractFeeCurrencyWrapper.md).[`eventTypes`](../../AbstractFeeCurrencyWrapper/classes/AbstractFeeCurrencyWrapper.md#eventtypes)

***

### getCurrencies()

> **getCurrencies**: (...`args`) => `Promise`\<`` `0x${string}` ``[]\>

Defined in: [packages/sdk/contractkit/src/wrappers/FeeCurrencyDirectoryWrapper.ts:17](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/FeeCurrencyDirectoryWrapper.ts#L17)

#### Parameters

##### args

...\[\]

#### Returns

`Promise`\<`` `0x${string}` ``[]\>

***

### getCurrencyConfig()

> **getCurrencyConfig**: (`token`) => `Promise`\<\{ `intrinsicGas`: `BigNumber`; `oracle`: `` `0x${string}` ``; \}\>

Defined in: [packages/sdk/contractkit/src/wrappers/FeeCurrencyDirectoryWrapper.ts:38](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/FeeCurrencyDirectoryWrapper.ts#L38)

#### Parameters

##### token

`` `0x${string}` ``

#### Returns

`Promise`\<\{ `intrinsicGas`: `BigNumber`; `oracle`: `` `0x${string}` ``; \}\>

***

### getExchangeRate()

> **getExchangeRate**: (`token`) => `Promise`\<\{ `denominator`: `BigNumber`; `numerator`: `BigNumber`; \}\>

Defined in: [packages/sdk/contractkit/src/wrappers/FeeCurrencyDirectoryWrapper.ts:27](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/FeeCurrencyDirectoryWrapper.ts#L27)

#### Parameters

##### token

`` `0x${string}` ``

#### Returns

`Promise`\<\{ `denominator`: `BigNumber`; `numerator`: `BigNumber`; \}\>

***

### methodIds

> **methodIds**: `Record`\<`"initialized"` \| `"owner"` \| `"renounceOwnership"` \| `"transferOwnership"` \| `"initialize"` \| `"getVersionNumber"` \| `"currencies"` \| `"setCurrencyConfig"` \| `"removeCurrencies"` \| `"getCurrencies"` \| `"getCurrencyConfig"` \| `"getExchangeRate"`, `string`\>

Defined in: [packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:68](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L68)

#### Inherited from

[`AbstractFeeCurrencyWrapper`](../../AbstractFeeCurrencyWrapper/classes/AbstractFeeCurrencyWrapper.md).[`methodIds`](../../AbstractFeeCurrencyWrapper/classes/AbstractFeeCurrencyWrapper.md#methodids)

## Accessors

### address

#### Get Signature

> **get** **address**(): `` `0x${string}` ``

Defined in: [packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:37](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L37)

Contract address

##### Returns

`` `0x${string}` ``

#### Inherited from

[`AbstractFeeCurrencyWrapper`](../../AbstractFeeCurrencyWrapper/classes/AbstractFeeCurrencyWrapper.md).[`address`](../../AbstractFeeCurrencyWrapper/classes/AbstractFeeCurrencyWrapper.md#address)

## Methods

### getAddresses()

> **getAddresses**(): `Promise`\<`` `0x${string}` ``[]\>

Defined in: [packages/sdk/contractkit/src/wrappers/FeeCurrencyDirectoryWrapper.ts:23](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/FeeCurrencyDirectoryWrapper.ts#L23)

#### Returns

`Promise`\<`` `0x${string}` ``[]\>

#### Overrides

[`AbstractFeeCurrencyWrapper`](../../AbstractFeeCurrencyWrapper/classes/AbstractFeeCurrencyWrapper.md).[`getAddresses`](../../AbstractFeeCurrencyWrapper/classes/AbstractFeeCurrencyWrapper.md#getaddresses)

***

### getConfig()

> **getConfig**(): `Promise`\<[`FeeCurrencyDirectoryConfig`](../interfaces/FeeCurrencyDirectoryConfig.md)\>

Defined in: [packages/sdk/contractkit/src/wrappers/FeeCurrencyDirectoryWrapper.ts:52](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/FeeCurrencyDirectoryWrapper.ts#L52)

Returns current configuration parameters.

#### Returns

`Promise`\<[`FeeCurrencyDirectoryConfig`](../interfaces/FeeCurrencyDirectoryConfig.md)\>

***

### getFeeCurrencyInformation()

> **getFeeCurrencyInformation**(`whitelist?`): `Promise`\<`object`[]\>

Defined in: [packages/sdk/contractkit/src/wrappers/AbstractFeeCurrencyWrapper.ts:49](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/AbstractFeeCurrencyWrapper.ts#L49)

#### Parameters

##### whitelist?

`` `0x${string}` ``[]

#### Returns

`Promise`\<`object`[]\>

#### Inherited from

[`AbstractFeeCurrencyWrapper`](../../AbstractFeeCurrencyWrapper/classes/AbstractFeeCurrencyWrapper.md).[`getFeeCurrencyInformation`](../../AbstractFeeCurrencyWrapper/classes/AbstractFeeCurrencyWrapper.md#getfeecurrencyinformation)

***

### getPastEvents()

> **getPastEvents**(`event`, `options`): `Promise`\<`EventLog`[]\>

Defined in: [packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:57](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L57)

Contract getPastEvents

#### Parameters

##### event

`"OwnershipTransferred"` | `"allEvents"` | `"CurrencyConfigSet"` | `"CurrencyRemoved"`

##### options

`PastEventOptions`

#### Returns

`Promise`\<`EventLog`[]\>

#### Inherited from

[`AbstractFeeCurrencyWrapper`](../../AbstractFeeCurrencyWrapper/classes/AbstractFeeCurrencyWrapper.md).[`getPastEvents`](../../AbstractFeeCurrencyWrapper/classes/AbstractFeeCurrencyWrapper.md#getpastevents)

***

### version()

> **version**(): `Promise`\<[`ContractVersion`](../../../versions/classes/ContractVersion.md)\>

Defined in: [packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:41](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L41)

#### Returns

`Promise`\<[`ContractVersion`](../../../versions/classes/ContractVersion.md)\>

#### Inherited from

[`AbstractFeeCurrencyWrapper`](../../AbstractFeeCurrencyWrapper/classes/AbstractFeeCurrencyWrapper.md).[`version`](../../AbstractFeeCurrencyWrapper/classes/AbstractFeeCurrencyWrapper.md#version)
