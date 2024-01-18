[@celo/contractkit](../README.md) / [Exports](../modules.md) / [wrappers/BaseWrapperForGoverning](../modules/wrappers_BaseWrapperForGoverning.md) / BaseWrapperForGoverning

# Class: BaseWrapperForGoverning\<T\>

[wrappers/BaseWrapperForGoverning](../modules/wrappers_BaseWrapperForGoverning.md).BaseWrapperForGoverning

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Contract` |

## Hierarchy

- [`BaseWrapper`](wrappers_BaseWrapper.BaseWrapper.md)\<`T`\>

  ↳ **`BaseWrapperForGoverning`**

  ↳↳ [`BaseSlasher`](wrappers_BaseSlasher.BaseSlasher.md)

  ↳↳ [`ElectionWrapper`](wrappers_Election.ElectionWrapper.md)

  ↳↳ [`GovernanceWrapper`](wrappers_Governance.GovernanceWrapper.md)

  ↳↳ [`LockedGoldWrapper`](wrappers_LockedGold.LockedGoldWrapper.md)

  ↳↳ [`ReleaseGoldWrapper`](wrappers_ReleaseGold.ReleaseGoldWrapper.md)

  ↳↳ [`ValidatorsWrapper`](wrappers_Validators.ValidatorsWrapper.md)

## Table of contents

### Constructors

- [constructor](wrappers_BaseWrapperForGoverning.BaseWrapperForGoverning.md#constructor)

### Properties

- [eventTypes](wrappers_BaseWrapperForGoverning.BaseWrapperForGoverning.md#eventtypes)
- [events](wrappers_BaseWrapperForGoverning.BaseWrapperForGoverning.md#events)
- [methodIds](wrappers_BaseWrapperForGoverning.BaseWrapperForGoverning.md#methodids)

### Accessors

- [address](wrappers_BaseWrapperForGoverning.BaseWrapperForGoverning.md#address)

### Methods

- [getPastEvents](wrappers_BaseWrapperForGoverning.BaseWrapperForGoverning.md#getpastevents)
- [version](wrappers_BaseWrapperForGoverning.BaseWrapperForGoverning.md#version)

## Constructors

### constructor

• **new BaseWrapperForGoverning**\<`T`\>(`connection`, `contract`, `contracts`): [`BaseWrapperForGoverning`](wrappers_BaseWrapperForGoverning.BaseWrapperForGoverning.md)\<`T`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Contract` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `connection` | `Connection` |
| `contract` | `T` |
| `contracts` | `ContractWrappersForVotingAndRules` |

#### Returns

[`BaseWrapperForGoverning`](wrappers_BaseWrapperForGoverning.BaseWrapperForGoverning.md)\<`T`\>

#### Overrides

[BaseWrapper](wrappers_BaseWrapper.BaseWrapper.md).[constructor](wrappers_BaseWrapper.BaseWrapper.md#constructor)

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapperForGoverning.ts:21](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapperForGoverning.ts#L21)

## Properties

### eventTypes

• **eventTypes**: `EventsEnum`\<`T`\>

#### Inherited from

[BaseWrapper](wrappers_BaseWrapper.BaseWrapper.md).[eventTypes](wrappers_BaseWrapper.BaseWrapper.md#eventtypes)

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:63](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L63)

___

### events

• **events**: `T`[``"events"``]

#### Inherited from

[BaseWrapper](wrappers_BaseWrapper.BaseWrapper.md).[events](wrappers_BaseWrapper.BaseWrapper.md#events)

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:61](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L61)

___

### methodIds

• **methodIds**: `Record`\<keyof `T`[``"methods"``], `string`\>

#### Inherited from

[BaseWrapper](wrappers_BaseWrapper.BaseWrapper.md).[methodIds](wrappers_BaseWrapper.BaseWrapper.md#methodids)

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:68](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L68)

## Accessors

### address

• `get` **address**(): `string`

Contract address

#### Returns

`string`

#### Inherited from

BaseWrapper.address

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

[BaseWrapper](wrappers_BaseWrapper.BaseWrapper.md).[getPastEvents](wrappers_BaseWrapper.BaseWrapper.md#getpastevents)

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:57](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L57)

___

### version

▸ **version**(): `Promise`\<`T`[``"methods"``] extends \{ `getVersionNumber`: () => `CeloTxObject`\<\{ `0`: `string` ; `1`: `string` ; `2`: `string` ; `3`: `string`  }\>  } ? [`ContractVersion`](versions.ContractVersion.md) : `never`\>

#### Returns

`Promise`\<`T`[``"methods"``] extends \{ `getVersionNumber`: () => `CeloTxObject`\<\{ `0`: `string` ; `1`: `string` ; `2`: `string` ; `3`: `string`  }\>  } ? [`ContractVersion`](versions.ContractVersion.md) : `never`\>

#### Inherited from

[BaseWrapper](wrappers_BaseWrapper.BaseWrapper.md).[version](wrappers_BaseWrapper.BaseWrapper.md#version)

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:41](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L41)
