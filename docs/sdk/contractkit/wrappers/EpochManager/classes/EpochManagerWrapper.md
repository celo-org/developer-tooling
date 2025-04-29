[**@celo/contractkit**](../../../README.md)

***

[@celo/contractkit](../../../modules.md) / [wrappers/EpochManager](../README.md) / EpochManagerWrapper

# Class: EpochManagerWrapper

Defined in: [packages/sdk/contractkit/src/wrappers/EpochManager.ts:30](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/EpochManager.ts#L30)

Contract handling epoch management.

## Extends

- [`BaseWrapperForGoverning`](../../BaseWrapperForGoverning/classes/BaseWrapperForGoverning.md)\<`EpochManager`\>

## Constructors

### Constructor

> **new EpochManagerWrapper**(`connection`, `contract`, `contracts`): `EpochManagerWrapper`

Defined in: [packages/sdk/contractkit/src/wrappers/BaseWrapperForGoverning.ts:23](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapperForGoverning.ts#L23)

#### Parameters

##### connection

`Connection`

##### contract

`EpochManager`

##### contracts

`ContractWrappersForVotingAndRules`

#### Returns

`EpochManagerWrapper`

#### Inherited from

[`BaseWrapperForGoverning`](../../BaseWrapperForGoverning/classes/BaseWrapperForGoverning.md).[`constructor`](../../BaseWrapperForGoverning/classes/BaseWrapperForGoverning.md#constructor)

## Properties

### epochDuration()

> **epochDuration**: (...`args`) => `Promise`\<`number`\>

Defined in: [packages/sdk/contractkit/src/wrappers/EpochManager.ts:31](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/EpochManager.ts#L31)

#### Parameters

##### args

...\[\]

#### Returns

`Promise`\<`number`\>

***

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

#### EpochDurationSet

> **EpochDurationSet**: `ContractEvent`\<`string`\>

#### EpochProcessingEnded

> **EpochProcessingEnded**: `ContractEvent`\<`string`\>

#### EpochProcessingStarted

> **EpochProcessingStarted**: `ContractEvent`\<`string`\>

#### GroupMarkedForProcessing

> **GroupMarkedForProcessing**: `ContractEvent`\<\{ `0`: `string`; `1`: `string`; `epochNumber`: `string`; `group`: `string`; \}\>

#### GroupProcessed

> **GroupProcessed**: `ContractEvent`\<\{ `0`: `string`; `1`: `string`; `epochNumber`: `string`; `group`: `string`; \}\>

#### OracleAddressSet

> **OracleAddressSet**: `ContractEvent`\<`string`\>

#### OwnershipTransferred

> **OwnershipTransferred**: `ContractEvent`\<\{ `0`: `string`; `1`: `string`; `newOwner`: `string`; `previousOwner`: `string`; \}\>

#### RegistrySet

> **RegistrySet**: `ContractEvent`\<`string`\>

#### ValidatorEpochPaymentDistributed

> **ValidatorEpochPaymentDistributed**: `ContractEvent`\<\{ `0`: `string`; `1`: `string`; `2`: `string`; `3`: `string`; `4`: `string`; `5`: `string`; `beneficiary`: `string`; `delegatedPayment`: `string`; `group`: `string`; `groupPayment`: `string`; `validator`: `string`; `validatorPayment`: `string`; \}\>

#### Inherited from

[`BaseWrapperForGoverning`](../../BaseWrapperForGoverning/classes/BaseWrapperForGoverning.md).[`events`](../../BaseWrapperForGoverning/classes/BaseWrapperForGoverning.md#events)

***

### eventTypes

> **eventTypes**: `EventsEnum`\<`EpochManager`\>

Defined in: [packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:63](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L63)

#### Inherited from

[`BaseWrapperForGoverning`](../../BaseWrapperForGoverning/classes/BaseWrapperForGoverning.md).[`eventTypes`](../../BaseWrapperForGoverning/classes/BaseWrapperForGoverning.md#eventtypes)

***

### finishNextEpochProcess()

> **finishNextEpochProcess**: (...`args`) => `CeloTransactionObject`\<`void`\>

Defined in: [packages/sdk/contractkit/src/wrappers/EpochManager.ts:71](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/EpochManager.ts#L71)

#### Parameters

##### args

...\[`string`[], `string`[], `string`[]\]

#### Returns

`CeloTransactionObject`\<`void`\>

***

### firstKnownEpoch()

> **firstKnownEpoch**: (...`args`) => `Promise`\<`number`\>

Defined in: [packages/sdk/contractkit/src/wrappers/EpochManager.ts:32](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/EpochManager.ts#L32)

#### Parameters

##### args

...\[\]

#### Returns

`Promise`\<`number`\>

***

### getCurrentEpochNumber()

> **getCurrentEpochNumber**: (...`args`) => `Promise`\<`number`\>

Defined in: [packages/sdk/contractkit/src/wrappers/EpochManager.ts:33](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/EpochManager.ts#L33)

#### Parameters

##### args

...\[\]

#### Returns

`Promise`\<`number`\>

***

### getElectedAccounts()

> **getElectedAccounts**: (...`args`) => `Promise`\<`string`[]\>

Defined in: [packages/sdk/contractkit/src/wrappers/EpochManager.ts:54](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/EpochManager.ts#L54)

#### Parameters

##### args

...\[\]

#### Returns

`Promise`\<`string`[]\>

***

### getElectedSigners()

> **getElectedSigners**: (...`args`) => `Promise`\<`string`[]\>

Defined in: [packages/sdk/contractkit/src/wrappers/EpochManager.ts:55](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/EpochManager.ts#L55)

#### Parameters

##### args

...\[\]

#### Returns

`Promise`\<`string`[]\>

***

### getEpochNumberOfBlock()

> **getEpochNumberOfBlock**: (...`args`) => `Promise`\<`number`\>

Defined in: [packages/sdk/contractkit/src/wrappers/EpochManager.ts:44](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/EpochManager.ts#L44)

#### Parameters

##### args

...\[`string` \| `number`\]

#### Returns

`Promise`\<`number`\>

***

### getEpochProcessingStatus()

> **getEpochProcessingStatus**: (...`args`) => `Promise`\<[`EpochProcessState`](../interfaces/EpochProcessState.md)\>

Defined in: [packages/sdk/contractkit/src/wrappers/EpochManager.ts:56](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/EpochManager.ts#L56)

#### Parameters

##### args

...\[\]

#### Returns

`Promise`\<[`EpochProcessState`](../interfaces/EpochProcessState.md)\>

***

### getFirstBlockAtEpoch()

> **getFirstBlockAtEpoch**: (...`args`) => `Promise`\<`number`\>

Defined in: [packages/sdk/contractkit/src/wrappers/EpochManager.ts:38](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/EpochManager.ts#L38)

#### Parameters

##### args

...\[`string` \| `number`\]

#### Returns

`Promise`\<`number`\>

***

### getLastBlockAtEpoch()

> **getLastBlockAtEpoch**: (...`args`) => `Promise`\<`number`\>

Defined in: [packages/sdk/contractkit/src/wrappers/EpochManager.ts:43](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/EpochManager.ts#L43)

#### Parameters

##### args

...\[`string` \| `number`\]

#### Returns

`Promise`\<`number`\>

***

### isEpochProcessingStarted()

> **isEpochProcessingStarted**: (...`args`) => `Promise`\<`boolean`\>

Defined in: [packages/sdk/contractkit/src/wrappers/EpochManager.ts:51](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/EpochManager.ts#L51)

#### Parameters

##### args

...\[\]

#### Returns

`Promise`\<`boolean`\>

***

### isIndividualProcessing()

> **isIndividualProcessing**: (...`args`) => `Promise`\<`boolean`\>

Defined in: [packages/sdk/contractkit/src/wrappers/EpochManager.ts:52](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/EpochManager.ts#L52)

#### Parameters

##### args

...\[\]

#### Returns

`Promise`\<`boolean`\>

***

### isOnEpochProcess()

> **isOnEpochProcess**: (...`args`) => `Promise`\<`boolean`\>

Defined in: [packages/sdk/contractkit/src/wrappers/EpochManager.ts:50](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/EpochManager.ts#L50)

#### Parameters

##### args

...\[\]

#### Returns

`Promise`\<`boolean`\>

***

### isTimeForNextEpoch()

> **isTimeForNextEpoch**: (...`args`) => `Promise`\<`boolean`\>

Defined in: [packages/sdk/contractkit/src/wrappers/EpochManager.ts:53](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/EpochManager.ts#L53)

#### Parameters

##### args

...\[\]

#### Returns

`Promise`\<`boolean`\>

***

### methodIds

> **methodIds**: `Record`\<`"epochDuration"` \| `"isTimeForNextEpoch"` \| `"getEpochNumberOfBlock"` \| `"initialized"` \| `"owner"` \| `"registry"` \| `"renounceOwnership"` \| `"setRegistry"` \| `"transferOwnership"` \| `"initialize"` \| `"getVersionNumber"` \| `"isBlocked"` \| `"electedAccounts"` \| `"electedSigners"` \| `"epochProcessing"` \| `"firstKnownEpoch"` \| `"isSystemInitialized"` \| `"oracleAddress"` \| `"processedGroups"` \| `"toProcessGroups"` \| `"validatorPendingPayments"` \| `"initializeSystem"` \| `"startNextEpochProcess"` \| `"setToProcessGroups"` \| `"processGroups"` \| `"processGroup"` \| `"finishNextEpochProcess"` \| `"sendValidatorPayment"` \| `"getCurrentEpoch"` \| `"getCurrentEpochNumber"` \| `"getEpochProcessingState"` \| `"numberOfElectedInCurrentSet"` \| `"getElectedAccounts"` \| `"getElectedAccountByIndex"` \| `"getElectedSigners"` \| `"getElectedSignerByIndex"` \| `"getFirstBlockAtEpoch"` \| `"getLastBlockAtEpoch"` \| `"getEpochByBlockNumber"` \| `"setEpochDuration"` \| `"setOracleAddress"` \| `"isIndividualProcessing"` \| `"isEpochProcessingStarted"` \| `"isOnEpochProcess"` \| `"systemAlreadyInitialized"` \| `"getEpochByNumber"`, `string`\>

Defined in: [packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:68](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L68)

#### Inherited from

[`BaseWrapperForGoverning`](../../BaseWrapperForGoverning/classes/BaseWrapperForGoverning.md).[`methodIds`](../../BaseWrapperForGoverning/classes/BaseWrapperForGoverning.md#methodids)

***

### processedGroups()

> **processedGroups**: (...`args`) => `Promise`\<`string`\>

Defined in: [packages/sdk/contractkit/src/wrappers/EpochManager.ts:49](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/EpochManager.ts#L49)

#### Parameters

##### args

...\[`string`\]

#### Returns

`Promise`\<`string`\>

***

### processGroups()

> **processGroups**: (...`args`) => `CeloTransactionObject`\<`void`\>

Defined in: [packages/sdk/contractkit/src/wrappers/EpochManager.ts:74](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/EpochManager.ts#L74)

#### Parameters

##### args

...\[`string`[], `string`[], `string`[]\]

#### Returns

`CeloTransactionObject`\<`void`\>

***

### sendValidatorPayment()

> **sendValidatorPayment**: (...`args`) => `CeloTransactionObject`\<`void`\>

Defined in: [packages/sdk/contractkit/src/wrappers/EpochManager.ts:72](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/EpochManager.ts#L72)

#### Parameters

##### args

...\[`string`\]

#### Returns

`CeloTransactionObject`\<`void`\>

***

### setToProcessGroups()

> **setToProcessGroups**: (...`args`) => `CeloTransactionObject`\<`void`\>

Defined in: [packages/sdk/contractkit/src/wrappers/EpochManager.ts:73](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/EpochManager.ts#L73)

#### Parameters

##### args

...\[\]

#### Returns

`CeloTransactionObject`\<`void`\>

***

### startNextEpochProcess()

> **startNextEpochProcess**: (...`args`) => `CeloTransactionObject`\<`void`\>

Defined in: [packages/sdk/contractkit/src/wrappers/EpochManager.ts:70](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/EpochManager.ts#L70)

#### Parameters

##### args

...\[\]

#### Returns

`CeloTransactionObject`\<`void`\>

## Accessors

### address

#### Get Signature

> **get** **address**(): `` `0x${string}` ``

Defined in: [packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:37](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L37)

Contract address

##### Returns

`` `0x${string}` ``

#### Inherited from

[`BaseWrapperForGoverning`](../../BaseWrapperForGoverning/classes/BaseWrapperForGoverning.md).[`address`](../../BaseWrapperForGoverning/classes/BaseWrapperForGoverning.md#address)

## Methods

### finishNextEpochProcessTx()

> **finishNextEpochProcessTx**(): `Promise`\<`CeloTransactionObject`\<`void`\>\>

Defined in: [packages/sdk/contractkit/src/wrappers/EpochManager.ts:105](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/EpochManager.ts#L105)

#### Returns

`Promise`\<`CeloTransactionObject`\<`void`\>\>

***

### getConfig()

> **getConfig**(): `Promise`\<[`EpochManagerConfig`](../interfaces/EpochManagerConfig.md)\>

Defined in: [packages/sdk/contractkit/src/wrappers/EpochManager.ts:208](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/EpochManager.ts#L208)

#### Returns

`Promise`\<[`EpochManagerConfig`](../interfaces/EpochManagerConfig.md)\>

***

### getEpochGroupsAndSorting()

> **getEpochGroupsAndSorting**(): `Promise`\<\{ `greaters`: `string`[]; `groups`: `string`[]; `lessers`: `string`[]; \}\>

Defined in: [packages/sdk/contractkit/src/wrappers/EpochManager.ts:182](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/EpochManager.ts#L182)

#### Returns

`Promise`\<\{ `greaters`: `string`[]; `groups`: `string`[]; `lessers`: `string`[]; \}\>

***

### getLessersAndGreaters()

> **getLessersAndGreaters**(`groups`): `Promise`\<`string`[][]\>

Defined in: [packages/sdk/contractkit/src/wrappers/EpochManager.ts:117](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/EpochManager.ts#L117)

#### Parameters

##### groups

`string`[]

#### Returns

`Promise`\<`string`[][]\>

***

### getPastEvents()

> **getPastEvents**(`event`, `options`): `Promise`\<`EventLog`[]\>

Defined in: [packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:57](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L57)

Contract getPastEvents

#### Parameters

##### event

`"GroupProcessed"` | `"OwnershipTransferred"` | `"RegistrySet"` | `"allEvents"` | `"ValidatorEpochPaymentDistributed"` | `"EpochDurationSet"` | `"EpochProcessingEnded"` | `"EpochProcessingStarted"` | `"GroupMarkedForProcessing"` | `"OracleAddressSet"`

##### options

`PastEventOptions`

#### Returns

`Promise`\<`EventLog`[]\>

#### Inherited from

[`BaseWrapperForGoverning`](../../BaseWrapperForGoverning/classes/BaseWrapperForGoverning.md).[`getPastEvents`](../../BaseWrapperForGoverning/classes/BaseWrapperForGoverning.md#getpastevents)

***

### processGroupsTx()

> **processGroupsTx**(): `Promise`\<`CeloTransactionObject`\<`void`\>\>

Defined in: [packages/sdk/contractkit/src/wrappers/EpochManager.ts:111](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/EpochManager.ts#L111)

#### Returns

`Promise`\<`CeloTransactionObject`\<`void`\>\>

***

### startNextEpochProcessTx()

> **startNextEpochProcessTx**(): `Promise`\<`undefined` \| `CeloTransactionObject`\<`void`\>\>

Defined in: [packages/sdk/contractkit/src/wrappers/EpochManager.ts:76](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/EpochManager.ts#L76)

#### Returns

`Promise`\<`undefined` \| `CeloTransactionObject`\<`void`\>\>

***

### version()

> **version**(): `Promise`\<[`ContractVersion`](../../../versions/classes/ContractVersion.md)\>

Defined in: [packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:41](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L41)

#### Returns

`Promise`\<[`ContractVersion`](../../../versions/classes/ContractVersion.md)\>

#### Inherited from

[`BaseWrapperForGoverning`](../../BaseWrapperForGoverning/classes/BaseWrapperForGoverning.md).[`version`](../../BaseWrapperForGoverning/classes/BaseWrapperForGoverning.md#version)
