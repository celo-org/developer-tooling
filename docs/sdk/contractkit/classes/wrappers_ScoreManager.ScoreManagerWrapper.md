[@celo/contractkit](../README.md) / [Exports](../modules.md) / [wrappers/ScoreManager](../modules/wrappers_ScoreManager.md) / ScoreManagerWrapper

# Class: ScoreManagerWrapper

[wrappers/ScoreManager](../modules/wrappers_ScoreManager.md).ScoreManagerWrapper

Contract handling validator scores.

## Hierarchy

- [`BaseWrapper`](wrappers_BaseWrapper.BaseWrapper.md)\<`ScoreManager`\>

  ↳ **`ScoreManagerWrapper`**

## Table of contents

### Constructors

- [constructor](wrappers_ScoreManager.ScoreManagerWrapper.md#constructor)

### Properties

- [eventTypes](wrappers_ScoreManager.ScoreManagerWrapper.md#eventtypes)
- [events](wrappers_ScoreManager.ScoreManagerWrapper.md#events)
- [getGroupScore](wrappers_ScoreManager.ScoreManagerWrapper.md#getgroupscore)
- [getValidatorScore](wrappers_ScoreManager.ScoreManagerWrapper.md#getvalidatorscore)
- [methodIds](wrappers_ScoreManager.ScoreManagerWrapper.md#methodids)

### Accessors

- [address](wrappers_ScoreManager.ScoreManagerWrapper.md#address)

### Methods

- [getPastEvents](wrappers_ScoreManager.ScoreManagerWrapper.md#getpastevents)
- [version](wrappers_ScoreManager.ScoreManagerWrapper.md#version)

## Constructors

### constructor

• **new ScoreManagerWrapper**(`connection`, `contract`): [`ScoreManagerWrapper`](wrappers_ScoreManager.ScoreManagerWrapper.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `connection` | `Connection` |
| `contract` | `ScoreManager` |

#### Returns

[`ScoreManagerWrapper`](wrappers_ScoreManager.ScoreManagerWrapper.md)

#### Inherited from

[BaseWrapper](wrappers_BaseWrapper.BaseWrapper.md).[constructor](wrappers_BaseWrapper.BaseWrapper.md#constructor)

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:34](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L34)

## Properties

### eventTypes

• **eventTypes**: `EventsEnum`\<`ScoreManager`\>

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
| `GroupScoreSet` | `ContractEvent`\<\{ `0`: `string` ; `1`: `string` ; `group`: `string` ; `score`: `string`  }\> |
| `OwnershipTransferred` | `ContractEvent`\<\{ `0`: `string` ; `1`: `string` ; `newOwner`: `string` ; `previousOwner`: `string`  }\> |
| `ValidatorScoreSet` | `ContractEvent`\<\{ `0`: `string` ; `1`: `string` ; `score`: `string` ; `validator`: `string`  }\> |
| `allEvents` | (`options?`: `EventOptions`, `cb?`: `Callback`\<`EventLog`\>) => `EventEmitter` |

#### Inherited from

[BaseWrapper](wrappers_BaseWrapper.BaseWrapper.md).[events](wrappers_BaseWrapper.BaseWrapper.md#events)

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:61](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L61)

___

### getGroupScore

• **getGroupScore**: (...`args`: [group: string]) => `Promise`\<`BigNumber`\>

#### Type declaration

▸ (`...args`): `Promise`\<`BigNumber`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [group: string] |

##### Returns

`Promise`\<`BigNumber`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/ScoreManager.ts:8](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/ScoreManager.ts#L8)

___

### getValidatorScore

• **getValidatorScore**: (...`args`: [validator: string]) => `Promise`\<`BigNumber`\>

#### Type declaration

▸ (`...args`): `Promise`\<`BigNumber`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [validator: string] |

##### Returns

`Promise`\<`BigNumber`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/ScoreManager.ts:13](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/ScoreManager.ts#L13)

___

### methodIds

• **methodIds**: `Record`\<``"initialized"`` \| ``"owner"`` \| ``"renounceOwnership"`` \| ``"transferOwnership"`` \| ``"initialize"`` \| ``"getVersionNumber"`` \| ``"groupScores"`` \| ``"validatorScores"`` \| ``"setGroupScore"`` \| ``"setValidatorScore"`` \| ``"getGroupScore"`` \| ``"getValidatorScore"``, `string`\>

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

### getPastEvents

▸ **getPastEvents**(`event`, `options`): `Promise`\<`EventLog`[]\>

Contract getPastEvents

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"OwnershipTransferred"`` \| ``"allEvents"`` \| ``"GroupScoreSet"`` \| ``"ValidatorScoreSet"`` |
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
