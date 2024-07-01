[@celo/contractkit](../README.md) / [Exports](../modules.md) / [wrappers/FeeCurrencyDirectoryWrapper](../modules/wrappers_FeeCurrencyDirectoryWrapper.md) / FeeCurrencyDirectoryWrapper

# Class: FeeCurrencyDirectoryWrapper

[wrappers/FeeCurrencyDirectoryWrapper](../modules/wrappers_FeeCurrencyDirectoryWrapper.md).FeeCurrencyDirectoryWrapper

FeeCurrencyDirectory contract listing available currencies usable to pay fees

## Hierarchy

- [`AbstractFeeCurrencyWrapper`](wrappers_AbstractFeeCurrencyWrapper.AbstractFeeCurrencyWrapper.md)\<`FeeCurrencyDirectory`\>

  ↳ **`FeeCurrencyDirectoryWrapper`**

## Table of contents

### Constructors

- [constructor](wrappers_FeeCurrencyDirectoryWrapper.FeeCurrencyDirectoryWrapper.md#constructor)

### Properties

- [eventTypes](wrappers_FeeCurrencyDirectoryWrapper.FeeCurrencyDirectoryWrapper.md#eventtypes)
- [events](wrappers_FeeCurrencyDirectoryWrapper.FeeCurrencyDirectoryWrapper.md#events)
- [getCurrencies](wrappers_FeeCurrencyDirectoryWrapper.FeeCurrencyDirectoryWrapper.md#getcurrencies)
- [getCurrencyConfig](wrappers_FeeCurrencyDirectoryWrapper.FeeCurrencyDirectoryWrapper.md#getcurrencyconfig)
- [getExchangeRate](wrappers_FeeCurrencyDirectoryWrapper.FeeCurrencyDirectoryWrapper.md#getexchangerate)
- [methodIds](wrappers_FeeCurrencyDirectoryWrapper.FeeCurrencyDirectoryWrapper.md#methodids)

### Accessors

- [address](wrappers_FeeCurrencyDirectoryWrapper.FeeCurrencyDirectoryWrapper.md#address)

### Methods

- [getAddresses](wrappers_FeeCurrencyDirectoryWrapper.FeeCurrencyDirectoryWrapper.md#getaddresses)
- [getConfig](wrappers_FeeCurrencyDirectoryWrapper.FeeCurrencyDirectoryWrapper.md#getconfig)
- [getFeeCurrencyInformation](wrappers_FeeCurrencyDirectoryWrapper.FeeCurrencyDirectoryWrapper.md#getfeecurrencyinformation)
- [getPastEvents](wrappers_FeeCurrencyDirectoryWrapper.FeeCurrencyDirectoryWrapper.md#getpastevents)
- [version](wrappers_FeeCurrencyDirectoryWrapper.FeeCurrencyDirectoryWrapper.md#version)

## Constructors

### constructor

• **new FeeCurrencyDirectoryWrapper**(`connection`, `contract`): [`FeeCurrencyDirectoryWrapper`](wrappers_FeeCurrencyDirectoryWrapper.FeeCurrencyDirectoryWrapper.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `connection` | `Connection` |
| `contract` | `FeeCurrencyDirectory` |

#### Returns

[`FeeCurrencyDirectoryWrapper`](wrappers_FeeCurrencyDirectoryWrapper.FeeCurrencyDirectoryWrapper.md)

#### Inherited from

[AbstractFeeCurrencyWrapper](wrappers_AbstractFeeCurrencyWrapper.AbstractFeeCurrencyWrapper.md).[constructor](wrappers_AbstractFeeCurrencyWrapper.AbstractFeeCurrencyWrapper.md#constructor)

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:34](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L34)

## Properties

### eventTypes

• **eventTypes**: `EventsEnum`\<`FeeCurrencyDirectory`\>

#### Inherited from

[AbstractFeeCurrencyWrapper](wrappers_AbstractFeeCurrencyWrapper.AbstractFeeCurrencyWrapper.md).[eventTypes](wrappers_AbstractFeeCurrencyWrapper.AbstractFeeCurrencyWrapper.md#eventtypes)

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:63](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L63)

___

### events

• **events**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `OwnershipTransferred` | `ContractEvent`\<\{ `0`: `string` ; `1`: `string` ; `newOwner`: `string` ; `previousOwner`: `string`  }\> |
| `allEvents` | (`options?`: `EventOptions`, `cb?`: `Callback`\<`EventLog`\>) => `EventEmitter` |

#### Inherited from

[AbstractFeeCurrencyWrapper](wrappers_AbstractFeeCurrencyWrapper.AbstractFeeCurrencyWrapper.md).[events](wrappers_AbstractFeeCurrencyWrapper.AbstractFeeCurrencyWrapper.md#events)

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:61](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L61)

___

### getCurrencies

• **getCurrencies**: (...`args`: []) => `Promise`\<\`0x$\{string}\`[]\>

#### Type declaration

▸ (`...args`): `Promise`\<\`0x$\{string}\`[]\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [] |

##### Returns

`Promise`\<\`0x$\{string}\`[]\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/FeeCurrencyDirectoryWrapper.ts:17](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/FeeCurrencyDirectoryWrapper.ts#L17)

___

### getCurrencyConfig

• **getCurrencyConfig**: (`token`: \`0x$\{string}\`) => `Promise`\<\{ `intrinsicGas`: `BigNumber` ; `oracle`: \`0x$\{string}\`  }\>

#### Type declaration

▸ (`token`): `Promise`\<\{ `intrinsicGas`: `BigNumber` ; `oracle`: \`0x$\{string}\`  }\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `token` | \`0x$\{string}\` |

##### Returns

`Promise`\<\{ `intrinsicGas`: `BigNumber` ; `oracle`: \`0x$\{string}\`  }\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/FeeCurrencyDirectoryWrapper.ts:38](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/FeeCurrencyDirectoryWrapper.ts#L38)

___

### getExchangeRate

• **getExchangeRate**: (`token`: \`0x$\{string}\`) => `Promise`\<\{ `denominator`: `BigNumber` ; `numerator`: `BigNumber`  }\>

#### Type declaration

▸ (`token`): `Promise`\<\{ `denominator`: `BigNumber` ; `numerator`: `BigNumber`  }\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `token` | \`0x$\{string}\` |

##### Returns

`Promise`\<\{ `denominator`: `BigNumber` ; `numerator`: `BigNumber`  }\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/FeeCurrencyDirectoryWrapper.ts:27](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/FeeCurrencyDirectoryWrapper.ts#L27)

___

### methodIds

• **methodIds**: `Record`\<``"initialized"`` \| ``"owner"`` \| ``"renounceOwnership"`` \| ``"transferOwnership"`` \| ``"getVersionNumber"`` \| ``"initialize"`` \| ``"currencies"`` \| ``"setCurrencyConfig"`` \| ``"removeCurrencies"`` \| ``"getCurrencies"`` \| ``"getCurrencyConfig"`` \| ``"getExchangeRate"``, `string`\>

#### Inherited from

[AbstractFeeCurrencyWrapper](wrappers_AbstractFeeCurrencyWrapper.AbstractFeeCurrencyWrapper.md).[methodIds](wrappers_AbstractFeeCurrencyWrapper.AbstractFeeCurrencyWrapper.md#methodids)

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:68](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L68)

## Accessors

### address

• `get` **address**(): \`0x$\{string}\`

Contract address

#### Returns

\`0x$\{string}\`

#### Inherited from

AbstractFeeCurrencyWrapper.address

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:37](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L37)

## Methods

### getAddresses

▸ **getAddresses**(): `Promise`\<\`0x$\{string}\`[]\>

#### Returns

`Promise`\<\`0x$\{string}\`[]\>

#### Overrides

[AbstractFeeCurrencyWrapper](wrappers_AbstractFeeCurrencyWrapper.AbstractFeeCurrencyWrapper.md).[getAddresses](wrappers_AbstractFeeCurrencyWrapper.AbstractFeeCurrencyWrapper.md#getaddresses)

#### Defined in

[packages/sdk/contractkit/src/wrappers/FeeCurrencyDirectoryWrapper.ts:23](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/FeeCurrencyDirectoryWrapper.ts#L23)

___

### getConfig

▸ **getConfig**(): `Promise`\<[`FeeCurrencyDirectoryConfig`](../interfaces/wrappers_FeeCurrencyDirectoryWrapper.FeeCurrencyDirectoryConfig.md)\>

Returns current configuration parameters.

#### Returns

`Promise`\<[`FeeCurrencyDirectoryConfig`](../interfaces/wrappers_FeeCurrencyDirectoryWrapper.FeeCurrencyDirectoryConfig.md)\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/FeeCurrencyDirectoryWrapper.ts:52](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/FeeCurrencyDirectoryWrapper.ts#L52)

___

### getFeeCurrencyInformation

▸ **getFeeCurrencyInformation**(`whitelist?`): `Promise`\<\{ `adaptedToken`: `undefined` \| \`0x$\{string}\` ; `address`: \`0x$\{string}\` ; `decimals`: `undefined` \| `number` ; `name`: `undefined` \| `string` ; `symbol`: `undefined` \| `string`  }[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `whitelist?` | \`0x$\{string}\`[] |

#### Returns

`Promise`\<\{ `adaptedToken`: `undefined` \| \`0x$\{string}\` ; `address`: \`0x$\{string}\` ; `decimals`: `undefined` \| `number` ; `name`: `undefined` \| `string` ; `symbol`: `undefined` \| `string`  }[]\>

#### Inherited from

[AbstractFeeCurrencyWrapper](wrappers_AbstractFeeCurrencyWrapper.AbstractFeeCurrencyWrapper.md).[getFeeCurrencyInformation](wrappers_AbstractFeeCurrencyWrapper.AbstractFeeCurrencyWrapper.md#getfeecurrencyinformation)

#### Defined in

[packages/sdk/contractkit/src/wrappers/AbstractFeeCurrencyWrapper.ts:49](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/AbstractFeeCurrencyWrapper.ts#L49)

___

### getPastEvents

▸ **getPastEvents**(`event`, `options`): `Promise`\<`EventLog`[]\>

Contract getPastEvents

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"OwnershipTransferred"`` \| ``"allEvents"`` |
| `options` | `PastEventOptions` |

#### Returns

`Promise`\<`EventLog`[]\>

#### Inherited from

[AbstractFeeCurrencyWrapper](wrappers_AbstractFeeCurrencyWrapper.AbstractFeeCurrencyWrapper.md).[getPastEvents](wrappers_AbstractFeeCurrencyWrapper.AbstractFeeCurrencyWrapper.md#getpastevents)

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:57](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L57)

___

### version

▸ **version**(): `Promise`\<[`ContractVersion`](versions.ContractVersion.md)\>

#### Returns

`Promise`\<[`ContractVersion`](versions.ContractVersion.md)\>

#### Inherited from

[AbstractFeeCurrencyWrapper](wrappers_AbstractFeeCurrencyWrapper.AbstractFeeCurrencyWrapper.md).[version](wrappers_AbstractFeeCurrencyWrapper.AbstractFeeCurrencyWrapper.md#version)

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:41](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L41)
