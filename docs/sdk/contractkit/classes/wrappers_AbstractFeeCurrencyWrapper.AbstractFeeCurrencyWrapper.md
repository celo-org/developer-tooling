[@celo/contractkit](../README.md) / [Exports](../modules.md) / [wrappers/AbstractFeeCurrencyWrapper](../modules/wrappers_AbstractFeeCurrencyWrapper.md) / AbstractFeeCurrencyWrapper

# Class: AbstractFeeCurrencyWrapper\<TContract\>

[wrappers/AbstractFeeCurrencyWrapper](../modules/wrappers_AbstractFeeCurrencyWrapper.md).AbstractFeeCurrencyWrapper

-- use its children

## Type parameters

| Name | Type |
| :------ | :------ |
| `TContract` | extends `Contract` |

## Hierarchy

- [`BaseWrapper`](wrappers_BaseWrapper.BaseWrapper.md)\<`TContract`\>

  ↳ **`AbstractFeeCurrencyWrapper`**

  ↳↳ [`FeeCurrencyDirectoryWrapper`](wrappers_FeeCurrencyDirectoryWrapper.FeeCurrencyDirectoryWrapper.md)

  ↳↳ [`FeeCurrencyWhitelistWrapper`](wrappers_FeeCurrencyWhitelistWrapper.FeeCurrencyWhitelistWrapper.md)

## Table of contents

### Constructors

- [constructor](wrappers_AbstractFeeCurrencyWrapper.AbstractFeeCurrencyWrapper.md#constructor)

### Properties

- [eventTypes](wrappers_AbstractFeeCurrencyWrapper.AbstractFeeCurrencyWrapper.md#eventtypes)
- [events](wrappers_AbstractFeeCurrencyWrapper.AbstractFeeCurrencyWrapper.md#events)
- [methodIds](wrappers_AbstractFeeCurrencyWrapper.AbstractFeeCurrencyWrapper.md#methodids)

### Accessors

- [address](wrappers_AbstractFeeCurrencyWrapper.AbstractFeeCurrencyWrapper.md#address)

### Methods

- [getAddresses](wrappers_AbstractFeeCurrencyWrapper.AbstractFeeCurrencyWrapper.md#getaddresses)
- [getFeeCurrencyInformation](wrappers_AbstractFeeCurrencyWrapper.AbstractFeeCurrencyWrapper.md#getfeecurrencyinformation)
- [getPastEvents](wrappers_AbstractFeeCurrencyWrapper.AbstractFeeCurrencyWrapper.md#getpastevents)
- [version](wrappers_AbstractFeeCurrencyWrapper.AbstractFeeCurrencyWrapper.md#version)

## Constructors

### constructor

• **new AbstractFeeCurrencyWrapper**\<`TContract`\>(`connection`, `contract`): [`AbstractFeeCurrencyWrapper`](wrappers_AbstractFeeCurrencyWrapper.AbstractFeeCurrencyWrapper.md)\<`TContract`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TContract` | extends `Contract` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `connection` | `Connection` |
| `contract` | `TContract` |

#### Returns

[`AbstractFeeCurrencyWrapper`](wrappers_AbstractFeeCurrencyWrapper.AbstractFeeCurrencyWrapper.md)\<`TContract`\>

#### Inherited from

[BaseWrapper](wrappers_BaseWrapper.BaseWrapper.md).[constructor](wrappers_BaseWrapper.BaseWrapper.md#constructor)

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:34](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L34)

## Properties

### eventTypes

• **eventTypes**: `EventsEnum`\<`TContract`\>

#### Inherited from

[BaseWrapper](wrappers_BaseWrapper.BaseWrapper.md).[eventTypes](wrappers_BaseWrapper.BaseWrapper.md#eventtypes)

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:63](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L63)

___

### events

• **events**: `TContract`[``"events"``]

#### Inherited from

[BaseWrapper](wrappers_BaseWrapper.BaseWrapper.md).[events](wrappers_BaseWrapper.BaseWrapper.md#events)

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:61](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L61)

___

### methodIds

• **methodIds**: `Record`\<keyof `TContract`[``"methods"``], `string`\>

#### Inherited from

[BaseWrapper](wrappers_BaseWrapper.BaseWrapper.md).[methodIds](wrappers_BaseWrapper.BaseWrapper.md#methodids)

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:68](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L68)

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

### getAddresses

▸ **getAddresses**(): `Promise`\<\`0x$\{string}\`[]\>

#### Returns

`Promise`\<\`0x$\{string}\`[]\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/AbstractFeeCurrencyWrapper.ts:39](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/AbstractFeeCurrencyWrapper.ts#L39)

___

### getFeeCurrencyInformation

▸ **getFeeCurrencyInformation**(`whitelist?`): `Promise`\<\{ `adaptedToken`: `undefined` \| \`0x$\{string}\` ; `address`: \`0x$\{string}\` ; `decimals`: `undefined` \| `number` ; `name`: `undefined` \| `string` ; `symbol`: `undefined` \| `string`  }[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `whitelist?` | \`0x$\{string}\`[] |

#### Returns

`Promise`\<\{ `adaptedToken`: `undefined` \| \`0x$\{string}\` ; `address`: \`0x$\{string}\` ; `decimals`: `undefined` \| `number` ; `name`: `undefined` \| `string` ; `symbol`: `undefined` \| `string`  }[]\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/AbstractFeeCurrencyWrapper.ts:41](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/AbstractFeeCurrencyWrapper.ts#L41)

___

### getPastEvents

▸ **getPastEvents**(`event`, `options`): `Promise`\<`EventLog`[]\>

Contract getPastEvents

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | keyof `TContract`[``"events"``] |
| `options` | `PastEventOptions` |

#### Returns

`Promise`\<`EventLog`[]\>

#### Inherited from

[BaseWrapper](wrappers_BaseWrapper.BaseWrapper.md).[getPastEvents](wrappers_BaseWrapper.BaseWrapper.md#getpastevents)

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:57](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L57)

___

### version

▸ **version**(): `Promise`\<`TContract`[``"methods"``] extends \{ `getVersionNumber`: () => `CeloTxObject`\<\{ `0`: `string` ; `1`: `string` ; `2`: `string` ; `3`: `string`  }\>  } ? [`ContractVersion`](versions.ContractVersion.md) : `never`\>

#### Returns

`Promise`\<`TContract`[``"methods"``] extends \{ `getVersionNumber`: () => `CeloTxObject`\<\{ `0`: `string` ; `1`: `string` ; `2`: `string` ; `3`: `string`  }\>  } ? [`ContractVersion`](versions.ContractVersion.md) : `never`\>

#### Inherited from

[BaseWrapper](wrappers_BaseWrapper.BaseWrapper.md).[version](wrappers_BaseWrapper.BaseWrapper.md#version)

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:41](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L41)
