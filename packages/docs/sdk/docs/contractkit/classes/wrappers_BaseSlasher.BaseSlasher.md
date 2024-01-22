[@celo/contractkit](../README.md) / [Exports](../modules.md) / [wrappers/BaseSlasher](../modules/wrappers_BaseSlasher.md) / BaseSlasher

# Class: BaseSlasher\<T\>

[wrappers/BaseSlasher](../modules/wrappers_BaseSlasher.md).BaseSlasher

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `SlasherContract` |

## Hierarchy

- [`BaseWrapperForGoverning`](wrappers_BaseWrapperForGoverning.BaseWrapperForGoverning.md)\<`T`\>

  ↳ **`BaseSlasher`**

  ↳↳ [`DoubleSigningSlasherWrapper`](wrappers_DoubleSigningSlasher.DoubleSigningSlasherWrapper.md)

  ↳↳ [`DowntimeSlasherWrapper`](wrappers_DowntimeSlasher.DowntimeSlasherWrapper.md)

## Table of contents

### Constructors

- [constructor](wrappers_BaseSlasher.BaseSlasher.md#constructor)

### Properties

- [eventTypes](wrappers_BaseSlasher.BaseSlasher.md#eventtypes)
- [events](wrappers_BaseSlasher.BaseSlasher.md#events)
- [methodIds](wrappers_BaseSlasher.BaseSlasher.md#methodids)
- [slashingIncentives](wrappers_BaseSlasher.BaseSlasher.md#slashingincentives)

### Accessors

- [address](wrappers_BaseSlasher.BaseSlasher.md#address)

### Methods

- [getPastEvents](wrappers_BaseSlasher.BaseSlasher.md#getpastevents)
- [version](wrappers_BaseSlasher.BaseSlasher.md#version)

## Constructors

### constructor

• **new BaseSlasher**\<`T`\>(`connection`, `contract`, `contracts`): [`BaseSlasher`](wrappers_BaseSlasher.BaseSlasher.md)\<`T`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `SlasherContract` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `connection` | `Connection` |
| `contract` | `T` |
| `contracts` | `ContractWrappersForVotingAndRules` |

#### Returns

[`BaseSlasher`](wrappers_BaseSlasher.BaseSlasher.md)\<`T`\>

#### Inherited from

[BaseWrapperForGoverning](wrappers_BaseWrapperForGoverning.BaseWrapperForGoverning.md).[constructor](wrappers_BaseWrapperForGoverning.BaseWrapperForGoverning.md#constructor)

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapperForGoverning.ts:21](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapperForGoverning.ts#L21)

## Properties

### eventTypes

• **eventTypes**: `EventsEnum`\<`T`\>

#### Inherited from

[BaseWrapperForGoverning](wrappers_BaseWrapperForGoverning.BaseWrapperForGoverning.md).[eventTypes](wrappers_BaseWrapperForGoverning.BaseWrapperForGoverning.md#eventtypes)

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:63](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L63)

___

### events

• **events**: `T`[``"events"``]

#### Inherited from

[BaseWrapperForGoverning](wrappers_BaseWrapperForGoverning.BaseWrapperForGoverning.md).[events](wrappers_BaseWrapperForGoverning.BaseWrapperForGoverning.md#events)

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:61](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L61)

___

### methodIds

• **methodIds**: `Record`\<keyof `T`[``"methods"``], `string`\>

#### Inherited from

[BaseWrapperForGoverning](wrappers_BaseWrapperForGoverning.BaseWrapperForGoverning.md).[methodIds](wrappers_BaseWrapperForGoverning.BaseWrapperForGoverning.md#methodids)

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:68](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L68)

___

### slashingIncentives

• **slashingIncentives**: (...`args`: []) => `Promise`\<\{ `penalty`: `BigNumber` ; `reward`: `BigNumber`  }\>

Returns slashing incentives.

#### Type declaration

▸ (`...args`): `Promise`\<\{ `penalty`: `BigNumber` ; `reward`: `BigNumber`  }\>

Returns slashing incentives.

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [] |

##### Returns

`Promise`\<\{ `penalty`: `BigNumber` ; `reward`: `BigNumber`  }\>

Rewards and penalties for slashing.

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseSlasher.ts:70](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseSlasher.ts#L70)

## Accessors

### address

• `get` **address**(): `string`

Contract address

#### Returns

`string`

#### Inherited from

BaseWrapperForGoverning.address

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:37](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L37)

## Methods

### getPastEvents

▸ **getPastEvents**(`event`, `options`): `Promise`\<`EventLog`[]\>

Contract getPastEvents

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | keyof `T`[``"events"``] |
| `options` | `PastEventOptions` |

#### Returns

`Promise`\<`EventLog`[]\>

#### Inherited from

[BaseWrapperForGoverning](wrappers_BaseWrapperForGoverning.BaseWrapperForGoverning.md).[getPastEvents](wrappers_BaseWrapperForGoverning.BaseWrapperForGoverning.md#getpastevents)

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:57](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L57)

___

### version

▸ **version**(): `Promise`\<`T`[``"methods"``] extends \{ `getVersionNumber`: () => `CeloTxObject`\<\{ `0`: `string` ; `1`: `string` ; `2`: `string` ; `3`: `string`  }\>  } ? [`ContractVersion`](versions.ContractVersion.md) : `never`\>

#### Returns

`Promise`\<`T`[``"methods"``] extends \{ `getVersionNumber`: () => `CeloTxObject`\<\{ `0`: `string` ; `1`: `string` ; `2`: `string` ; `3`: `string`  }\>  } ? [`ContractVersion`](versions.ContractVersion.md) : `never`\>

#### Inherited from

[BaseWrapperForGoverning](wrappers_BaseWrapperForGoverning.BaseWrapperForGoverning.md).[version](wrappers_BaseWrapperForGoverning.BaseWrapperForGoverning.md#version)

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:41](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L41)
