[@celo/contractkit](../README.md) / [Exports](../modules.md) / [wrappers/FeeCurrencyWhitelistWrapper](../modules/wrappers_FeeCurrencyWhitelistWrapper.md) / FeeCurrencyWhitelistWrapper

# Class: FeeCurrencyWhitelistWrapper

[wrappers/FeeCurrencyWhitelistWrapper](../modules/wrappers_FeeCurrencyWhitelistWrapper.md).FeeCurrencyWhitelistWrapper

FeeCurrencyWhitelist contract listing available currencies usable to pay fees

## Hierarchy

- [`BaseWrapper`](wrappers_BaseWrapper.BaseWrapper.md)\<`FeeCurrencyWhitelist`\>

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

[BaseWrapper](wrappers_BaseWrapper.BaseWrapper.md).[constructor](wrappers_BaseWrapper.BaseWrapper.md#constructor)

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

[packages/sdk/contractkit/src/wrappers/FeeCurrencyWhitelistWrapper.ts:78](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/FeeCurrencyWhitelistWrapper.ts#L78)

___

### eventTypes

• **eventTypes**: `EventsEnum`\<`FeeCurrencyWhitelist`\>

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
| `FeeCurrencyWhitelistRemoved` | `ContractEvent`\<`string`\> |
| `FeeCurrencyWhitelisted` | `ContractEvent`\<`string`\> |
| `OwnershipTransferred` | `ContractEvent`\<\{ `0`: `string` ; `1`: `string` ; `newOwner`: `string` ; `previousOwner`: `string`  }\> |
| `allEvents` | (`options?`: `EventOptions`, `cb?`: `Callback`\<`EventLog`\>) => `EventEmitter` |

#### Inherited from

[BaseWrapper](wrappers_BaseWrapper.BaseWrapper.md).[events](wrappers_BaseWrapper.BaseWrapper.md#events)

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

[packages/sdk/contractkit/src/wrappers/FeeCurrencyWhitelistWrapper.ts:34](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/FeeCurrencyWhitelistWrapper.ts#L34)

___

### methodIds

• **methodIds**: `Record`\<``"initialized"`` \| ``"isOwner"`` \| ``"owner"`` \| ``"renounceOwnership"`` \| ``"transferOwnership"`` \| ``"getVersionNumber"`` \| ``"initialize"`` \| ``"addToken"`` \| ``"removeToken"`` \| ``"whitelist"`` \| ``"getWhitelist"``, `string`\>

#### Inherited from

[BaseWrapper](wrappers_BaseWrapper.BaseWrapper.md).[methodIds](wrappers_BaseWrapper.BaseWrapper.md#methodids)

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

[packages/sdk/contractkit/src/wrappers/FeeCurrencyWhitelistWrapper.ts:77](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/FeeCurrencyWhitelistWrapper.ts#L77)

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

### getFeeCurrencyInformation

▸ **getFeeCurrencyInformation**(`whitelist?`): `Promise`\<\{ `adaptedToken`: `undefined` \| \`0x$\{string}\` ; `address`: \`0x$\{string}\` ; `name`: `undefined` \| `string` ; `symbol`: `undefined` \| `string`  }[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `whitelist?` | \`0x$\{string}\`[] |

#### Returns

`Promise`\<\{ `adaptedToken`: `undefined` \| \`0x$\{string}\` ; `address`: \`0x$\{string}\` ; `name`: `undefined` \| `string` ; `symbol`: `undefined` \| `string`  }[]\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/FeeCurrencyWhitelistWrapper.ts:40](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/FeeCurrencyWhitelistWrapper.ts#L40)

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

[BaseWrapper](wrappers_BaseWrapper.BaseWrapper.md).[getPastEvents](wrappers_BaseWrapper.BaseWrapper.md#getpastevents)

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:57](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L57)

___

### version

▸ **version**(): `Promise`\<[`ContractVersion`](versions.ContractVersion.md)\>

#### Returns

`Promise`\<[`ContractVersion`](versions.ContractVersion.md)\>

#### Inherited from

[BaseWrapper](wrappers_BaseWrapper.BaseWrapper.md).[version](wrappers_BaseWrapper.BaseWrapper.md#version)

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:41](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L41)
