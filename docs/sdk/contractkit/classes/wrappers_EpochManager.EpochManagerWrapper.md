[@celo/contractkit](../README.md) / [Exports](../modules.md) / [wrappers/EpochManager](../modules/wrappers_EpochManager.md) / EpochManagerWrapper

# Class: EpochManagerWrapper

[wrappers/EpochManager](../modules/wrappers_EpochManager.md).EpochManagerWrapper

Contract handling epoch management.

## Hierarchy

- [`BaseWrapperForGoverning`](wrappers_BaseWrapperForGoverning.BaseWrapperForGoverning.md)\<`EpochManager`\>

  ↳ **`EpochManagerWrapper`**

## Table of contents

### Constructors

- [constructor](wrappers_EpochManager.EpochManagerWrapper.md#constructor)

### Properties

- [epochDuration](wrappers_EpochManager.EpochManagerWrapper.md#epochduration)
- [eventTypes](wrappers_EpochManager.EpochManagerWrapper.md#eventtypes)
- [events](wrappers_EpochManager.EpochManagerWrapper.md#events)
- [finishNextEpochProcess](wrappers_EpochManager.EpochManagerWrapper.md#finishnextepochprocess)
- [firstKnownEpoch](wrappers_EpochManager.EpochManagerWrapper.md#firstknownepoch)
- [getCurrentEpochNumber](wrappers_EpochManager.EpochManagerWrapper.md#getcurrentepochnumber)
- [getElectedAccounts](wrappers_EpochManager.EpochManagerWrapper.md#getelectedaccounts)
- [getEpochProcessingStatus](wrappers_EpochManager.EpochManagerWrapper.md#getepochprocessingstatus)
- [getFirstBlockAtEpoch](wrappers_EpochManager.EpochManagerWrapper.md#getfirstblockatepoch)
- [getLastBlockAtEpoch](wrappers_EpochManager.EpochManagerWrapper.md#getlastblockatepoch)
- [isOnEpochProcess](wrappers_EpochManager.EpochManagerWrapper.md#isonepochprocess)
- [isTimeForNextEpoch](wrappers_EpochManager.EpochManagerWrapper.md#istimefornextepoch)
- [methodIds](wrappers_EpochManager.EpochManagerWrapper.md#methodids)
- [startNextEpochProcess](wrappers_EpochManager.EpochManagerWrapper.md#startnextepochprocess)

### Accessors

- [address](wrappers_EpochManager.EpochManagerWrapper.md#address)

### Methods

- [finishNextEpochProcessTx](wrappers_EpochManager.EpochManagerWrapper.md#finishnextepochprocesstx)
- [getConfig](wrappers_EpochManager.EpochManagerWrapper.md#getconfig)
- [getLessersAndGreaters](wrappers_EpochManager.EpochManagerWrapper.md#getlessersandgreaters)
- [getPastEvents](wrappers_EpochManager.EpochManagerWrapper.md#getpastevents)
- [version](wrappers_EpochManager.EpochManagerWrapper.md#version)

## Constructors

### constructor

• **new EpochManagerWrapper**(`connection`, `contract`, `contracts`): [`EpochManagerWrapper`](wrappers_EpochManager.EpochManagerWrapper.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `connection` | `Connection` |
| `contract` | `EpochManager` |
| `contracts` | `ContractWrappersForVotingAndRules` |

#### Returns

[`EpochManagerWrapper`](wrappers_EpochManager.EpochManagerWrapper.md)

#### Inherited from

[BaseWrapperForGoverning](wrappers_BaseWrapperForGoverning.BaseWrapperForGoverning.md).[constructor](wrappers_BaseWrapperForGoverning.BaseWrapperForGoverning.md#constructor)

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapperForGoverning.ts:23](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapperForGoverning.ts#L23)

## Properties

### epochDuration

• **epochDuration**: (...`args`: []) => `Promise`\<`number`\>

#### Type declaration

▸ (`...args`): `Promise`\<`number`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [] |

##### Returns

`Promise`\<`number`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/EpochManager.ts:30](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/EpochManager.ts#L30)

___

### eventTypes

• **eventTypes**: `EventsEnum`\<`EpochManager`\>

#### Inherited from

[BaseWrapperForGoverning](wrappers_BaseWrapperForGoverning.BaseWrapperForGoverning.md).[eventTypes](wrappers_BaseWrapperForGoverning.BaseWrapperForGoverning.md#eventtypes)

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:63](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L63)

___

### events

• **events**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `EpochDurationSet` | `ContractEvent`\<`string`\> |
| `EpochProcessingEnded` | `ContractEvent`\<`string`\> |
| `EpochProcessingStarted` | `ContractEvent`\<`string`\> |
| `OracleAddressSet` | `ContractEvent`\<`string`\> |
| `OwnershipTransferred` | `ContractEvent`\<\{ `0`: `string` ; `1`: `string` ; `newOwner`: `string` ; `previousOwner`: `string`  }\> |
| `RegistrySet` | `ContractEvent`\<`string`\> |
| `ValidatorEpochPaymentDistributed` | `ContractEvent`\<\{ `0`: `string` ; `1`: `string` ; `2`: `string` ; `3`: `string` ; `4`: `string` ; `5`: `string` ; `beneficiary`: `string` ; `delegatedPayment`: `string` ; `group`: `string` ; `groupPayment`: `string` ; `validator`: `string` ; `validatorPayment`: `string`  }\> |
| `allEvents` | (`options?`: `EventOptions`, `cb?`: `Callback`\<`EventLog`\>) => `EventEmitter` |

#### Inherited from

[BaseWrapperForGoverning](wrappers_BaseWrapperForGoverning.BaseWrapperForGoverning.md).[events](wrappers_BaseWrapperForGoverning.BaseWrapperForGoverning.md#events)

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:61](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L61)

___

### finishNextEpochProcess

• **finishNextEpochProcess**: (...`args`: [groups: string[], lessers: string[], greaters: string[]]) => `CeloTransactionObject`\<`void`\>

#### Type declaration

▸ (`...args`): `CeloTransactionObject`\<`void`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [groups: string[], lessers: string[], greaters: string[]] |

##### Returns

`CeloTransactionObject`\<`void`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/EpochManager.ts:61](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/EpochManager.ts#L61)

___

### firstKnownEpoch

• **firstKnownEpoch**: (...`args`: []) => `Promise`\<`number`\>

#### Type declaration

▸ (`...args`): `Promise`\<`number`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [] |

##### Returns

`Promise`\<`number`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/EpochManager.ts:31](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/EpochManager.ts#L31)

___

### getCurrentEpochNumber

• **getCurrentEpochNumber**: (...`args`: []) => `Promise`\<`number`\>

#### Type declaration

▸ (`...args`): `Promise`\<`number`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [] |

##### Returns

`Promise`\<`number`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/EpochManager.ts:32](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/EpochManager.ts#L32)

___

### getElectedAccounts

• **getElectedAccounts**: (...`args`: []) => `Promise`\<`string`[]\>

#### Type declaration

▸ (`...args`): `Promise`\<`string`[]\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [] |

##### Returns

`Promise`\<`string`[]\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/EpochManager.ts:45](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/EpochManager.ts#L45)

___

### getEpochProcessingStatus

• **getEpochProcessingStatus**: (...`args`: []) => `Promise`\<[`EpochProcessState`](../interfaces/wrappers_EpochManager.EpochProcessState.md)\>

#### Type declaration

▸ (`...args`): `Promise`\<[`EpochProcessState`](../interfaces/wrappers_EpochManager.EpochProcessState.md)\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [] |

##### Returns

`Promise`\<[`EpochProcessState`](../interfaces/wrappers_EpochManager.EpochProcessState.md)\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/EpochManager.ts:46](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/EpochManager.ts#L46)

___

### getFirstBlockAtEpoch

• **getFirstBlockAtEpoch**: (...`args`: [epoch: string \| number]) => `Promise`\<`number`\>

#### Type declaration

▸ (`...args`): `Promise`\<`number`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [epoch: string \| number] |

##### Returns

`Promise`\<`number`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/EpochManager.ts:37](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/EpochManager.ts#L37)

___

### getLastBlockAtEpoch

• **getLastBlockAtEpoch**: (...`args`: [epoch: string \| number]) => `Promise`\<`number`\>

#### Type declaration

▸ (`...args`): `Promise`\<`number`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [epoch: string \| number] |

##### Returns

`Promise`\<`number`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/EpochManager.ts:42](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/EpochManager.ts#L42)

___

### isOnEpochProcess

• **isOnEpochProcess**: (...`args`: []) => `Promise`\<`boolean`\>

#### Type declaration

▸ (`...args`): `Promise`\<`boolean`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [] |

##### Returns

`Promise`\<`boolean`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/EpochManager.ts:43](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/EpochManager.ts#L43)

___

### isTimeForNextEpoch

• **isTimeForNextEpoch**: (...`args`: []) => `Promise`\<`boolean`\>

#### Type declaration

▸ (`...args`): `Promise`\<`boolean`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [] |

##### Returns

`Promise`\<`boolean`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/EpochManager.ts:44](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/EpochManager.ts#L44)

___

### methodIds

• **methodIds**: `Record`\<``"epochDuration"`` \| ``"isTimeForNextEpoch"`` \| ``"getEpochNumberOfBlock"`` \| ``"initialized"`` \| ``"owner"`` \| ``"registry"`` \| ``"renounceOwnership"`` \| ``"setRegistry"`` \| ``"transferOwnership"`` \| ``"initialize"`` \| ``"getVersionNumber"`` \| ``"electedAccounts"`` \| ``"electedSigners"`` \| ``"epochProcessing"`` \| ``"firstKnownEpoch"`` \| ``"isSystemInitialized"`` \| ``"oracleAddress"`` \| ``"processedGroups"`` \| ``"toProcessGroups"`` \| ``"validatorPendingPayments"`` \| ``"initializeSystem"`` \| ``"startNextEpochProcess"`` \| ``"setToProcessGroups"`` \| ``"processGroups"`` \| ``"processGroup"`` \| ``"finishNextEpochProcess"`` \| ``"sendValidatorPayment"`` \| ``"getCurrentEpoch"`` \| ``"getCurrentEpochNumber"`` \| ``"getEpochProcessingState"`` \| ``"isBlocked"`` \| ``"numberOfElectedInCurrentSet"`` \| ``"getElectedAccounts"`` \| ``"getElectedAccountByIndex"`` \| ``"getElectedSigners"`` \| ``"getElectedSignerByIndex"`` \| ``"getFirstBlockAtEpoch"`` \| ``"getLastBlockAtEpoch"`` \| ``"getEpochByBlockNumber"`` \| ``"setEpochDuration"`` \| ``"setOracleAddress"`` \| ``"isOnEpochProcess"`` \| ``"systemAlreadyInitialized"`` \| ``"getEpochByNumber"``, `string`\>

#### Inherited from

[BaseWrapperForGoverning](wrappers_BaseWrapperForGoverning.BaseWrapperForGoverning.md).[methodIds](wrappers_BaseWrapperForGoverning.BaseWrapperForGoverning.md#methodids)

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:68](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L68)

___

### startNextEpochProcess

• **startNextEpochProcess**: (...`args`: []) => `CeloTransactionObject`\<`void`\>

#### Type declaration

▸ (`...args`): `CeloTransactionObject`\<`void`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [] |

##### Returns

`CeloTransactionObject`\<`void`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/EpochManager.ts:60](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/EpochManager.ts#L60)

## Accessors

### address

• `get` **address**(): \`0x$\{string}\`

Contract address

#### Returns

\`0x$\{string}\`

#### Inherited from

BaseWrapperForGoverning.address

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:37](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L37)

## Methods

### finishNextEpochProcessTx

▸ **finishNextEpochProcessTx**(): `Promise`\<`CeloTransactionObject`\<`void`\>\>

#### Returns

`Promise`\<`CeloTransactionObject`\<`void`\>\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/EpochManager.ts:63](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/EpochManager.ts#L63)

___

### getConfig

▸ **getConfig**(): `Promise`\<[`EpochManagerConfig`](../interfaces/wrappers_EpochManager.EpochManagerConfig.md)\>

#### Returns

`Promise`\<[`EpochManagerConfig`](../interfaces/wrappers_EpochManager.EpochManagerConfig.md)\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/EpochManager.ts:125](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/EpochManager.ts#L125)

___

### getLessersAndGreaters

▸ **getLessersAndGreaters**(`groups`): `Promise`\<`string`[][]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `groups` | `string`[] |

#### Returns

`Promise`\<`string`[][]\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/EpochManager.ts:76](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/EpochManager.ts#L76)

___

### getPastEvents

▸ **getPastEvents**(`event`, `options`): `Promise`\<`EventLog`[]\>

Contract getPastEvents

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"OwnershipTransferred"`` \| ``"RegistrySet"`` \| ``"ValidatorEpochPaymentDistributed"`` \| ``"allEvents"`` \| ``"EpochDurationSet"`` \| ``"EpochProcessingEnded"`` \| ``"EpochProcessingStarted"`` \| ``"OracleAddressSet"`` |
| `options` | `PastEventOptions` |

#### Returns

`Promise`\<`EventLog`[]\>

#### Inherited from

[BaseWrapperForGoverning](wrappers_BaseWrapperForGoverning.BaseWrapperForGoverning.md).[getPastEvents](wrappers_BaseWrapperForGoverning.BaseWrapperForGoverning.md#getpastevents)

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:57](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L57)

___

### version

▸ **version**(): `Promise`\<[`ContractVersion`](versions.ContractVersion.md)\>

#### Returns

`Promise`\<[`ContractVersion`](versions.ContractVersion.md)\>

#### Inherited from

[BaseWrapperForGoverning](wrappers_BaseWrapperForGoverning.BaseWrapperForGoverning.md).[version](wrappers_BaseWrapperForGoverning.BaseWrapperForGoverning.md#version)

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:41](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L41)
