[@celo/contractkit](../README.md) / [Exports](../modules.md) / [wrappers/FeeCurrencyWhitelistWrapper](../modules/wrappers_FeeCurrencyWhitelistWrapper.md) / FeeCurrencyWhitelistWrapper

# Class: FeeCurrencyWhitelistWrapper

[wrappers/FeeCurrencyWhitelistWrapper](../modules/wrappers_FeeCurrencyWhitelistWrapper.md).FeeCurrencyWhitelistWrapper

FeeCurrencyWhitelist contract listing available currencies usable to pay fees

## Hierarchy

- [`AbstractFeeCurrencyWrapper`](wrappers_AbstractFeeCurrencyWrapper.AbstractFeeCurrencyWrapper.md)\<`FeeCurrencyWhitelist`\>

  ↳ **`FeeCurrencyWhitelistWrapper`**

## Table of contents

### Constructors

- [constructor](wrappers_FeeCurrencyWhitelistWrapper.FeeCurrencyWhitelistWrapper.md#constructor)

### Properties

- [addToken](wrappers_FeeCurrencyWhitelistWrapper.FeeCurrencyWhitelistWrapper.md#addtoken)
- [eventTypes](wrappers_FeeCurrencyWhitelistWrapper.FeeCurrencyWhitelistWrapper.md#eventtypes)
- [events](wrappers_FeeCurrencyWhitelistWrapper.FeeCurrencyWhitelistWrapper.md#events)
- [getWhitelist](wrappers_FeeCurrencyWhitelistWrapper.FeeCurrencyWhitelistWrapper.md#getwhitelist)
- [methodIds](wrappers_FeeCurrencyWhitelistWrapper.FeeCurrencyWhitelistWrapper.md#methodids)
- [removeToken](wrappers_FeeCurrencyWhitelistWrapper.FeeCurrencyWhitelistWrapper.md#removetoken)

### Accessors

- [address](wrappers_FeeCurrencyWhitelistWrapper.FeeCurrencyWhitelistWrapper.md#address)

### Methods

- [getAddresses](wrappers_FeeCurrencyWhitelistWrapper.FeeCurrencyWhitelistWrapper.md#getaddresses)
- [getFeeCurrencyInformation](wrappers_FeeCurrencyWhitelistWrapper.FeeCurrencyWhitelistWrapper.md#getfeecurrencyinformation)
- [getPastEvents](wrappers_FeeCurrencyWhitelistWrapper.FeeCurrencyWhitelistWrapper.md#getpastevents)
- [version](wrappers_FeeCurrencyWhitelistWrapper.FeeCurrencyWhitelistWrapper.md#version)

## Constructors

### constructor

• **new FeeCurrencyWhitelistWrapper**(`connection`, `contract`): [`FeeCurrencyWhitelistWrapper`](wrappers_FeeCurrencyWhitelistWrapper.FeeCurrencyWhitelistWrapper.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `connection` | `Connection` |
| `contract` | `FeeCurrencyWhitelist` |

#### Returns

[`FeeCurrencyWhitelistWrapper`](wrappers_FeeCurrencyWhitelistWrapper.FeeCurrencyWhitelistWrapper.md)

#### Inherited from

[AbstractFeeCurrencyWrapper](wrappers_AbstractFeeCurrencyWrapper.AbstractFeeCurrencyWrapper.md).[constructor](wrappers_AbstractFeeCurrencyWrapper.AbstractFeeCurrencyWrapper.md#constructor)

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:34](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L34)

## Properties

### addToken

• **addToken**: (...`args`: [tokenAddress: string]) => `Promise`\<`void`\>

#### Type declaration

▸ (`...args`): `Promise`\<`void`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [tokenAddress: string] |

##### Returns

`Promise`\<`void`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/FeeCurrencyWhitelistWrapper.ts:17](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/FeeCurrencyWhitelistWrapper.ts#L17)

___

### eventTypes

• **eventTypes**: `EventsEnum`\<`FeeCurrencyWhitelist`\>

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
| `FeeCurrencyWhitelistRemoved` | `ContractEvent`\<`string`\> |
| `FeeCurrencyWhitelisted` | `ContractEvent`\<`string`\> |
| `OwnershipTransferred` | `ContractEvent`\<\{ `0`: `string` ; `1`: `string` ; `newOwner`: `string` ; `previousOwner`: `string`  }\> |
| `allEvents` | (`options?`: `EventOptions`, `cb?`: `Callback`\<`EventLog`\>) => `EventEmitter` |

#### Inherited from

[AbstractFeeCurrencyWrapper](wrappers_AbstractFeeCurrencyWrapper.AbstractFeeCurrencyWrapper.md).[events](wrappers_AbstractFeeCurrencyWrapper.AbstractFeeCurrencyWrapper.md#events)

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:61](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L61)

___

### getWhitelist

• **getWhitelist**: (...`args`: []) => `Promise`\<\`0x$\{string}\`[]\>

#### Type declaration

▸ (`...args`): `Promise`\<\`0x$\{string}\`[]\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [] |

##### Returns

`Promise`\<\`0x$\{string}\`[]\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/FeeCurrencyWhitelistWrapper.ts:10](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/FeeCurrencyWhitelistWrapper.ts#L10)

___

### methodIds

• **methodIds**: `Record`\<``"initialized"`` \| ``"isOwner"`` \| ``"owner"`` \| ``"renounceOwnership"`` \| ``"transferOwnership"`` \| ``"getVersionNumber"`` \| ``"initialize"`` \| ``"addToken"`` \| ``"removeToken"`` \| ``"whitelist"`` \| ``"getWhitelist"``, `string`\>

#### Inherited from

[AbstractFeeCurrencyWrapper](wrappers_AbstractFeeCurrencyWrapper.AbstractFeeCurrencyWrapper.md).[methodIds](wrappers_AbstractFeeCurrencyWrapper.AbstractFeeCurrencyWrapper.md#methodids)

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:68](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L68)

___

### removeToken

• **removeToken**: (...`args`: [tokenAddress: string, index: string \| number]) => `Promise`\<`void`\>

#### Type declaration

▸ (`...args`): `Promise`\<`void`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [tokenAddress: string, index: string \| number] |

##### Returns

`Promise`\<`void`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/FeeCurrencyWhitelistWrapper.ts:16](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/FeeCurrencyWhitelistWrapper.ts#L16)

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

[packages/sdk/contractkit/src/wrappers/FeeCurrencyWhitelistWrapper.ts:19](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/FeeCurrencyWhitelistWrapper.ts#L19)

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

[packages/sdk/contractkit/src/wrappers/AbstractFeeCurrencyWrapper.ts:41](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/AbstractFeeCurrencyWrapper.ts#L41)

___

### getPastEvents

▸ **getPastEvents**(`event`, `options`): `Promise`\<`EventLog`[]\>

Contract getPastEvents

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"OwnershipTransferred"`` \| ``"allEvents"`` \| ``"FeeCurrencyWhitelistRemoved"`` \| ``"FeeCurrencyWhitelisted"`` |
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
