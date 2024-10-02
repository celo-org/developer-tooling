[@celo/contractkit](../README.md) / [Exports](../modules.md) / [wrappers/MultiSig](../modules/wrappers_MultiSig.md) / MultiSigWrapper

# Class: MultiSigWrapper

[wrappers/MultiSig](../modules/wrappers_MultiSig.md).MultiSigWrapper

Contract for handling multisig actions

## Hierarchy

- [`BaseWrapper`](wrappers_BaseWrapper.BaseWrapper.md)\<`MultiSig`\>

  ↳ **`MultiSigWrapper`**

## Table of contents

### Constructors

- [constructor](wrappers_MultiSig.MultiSigWrapper.md#constructor)

### Properties

- [eventTypes](wrappers_MultiSig.MultiSigWrapper.md#eventtypes)
- [events](wrappers_MultiSig.MultiSigWrapper.md#events)
- [getInternalRequired](wrappers_MultiSig.MultiSigWrapper.md#getinternalrequired)
- [getOwners](wrappers_MultiSig.MultiSigWrapper.md#getowners)
- [getRequired](wrappers_MultiSig.MultiSigWrapper.md#getrequired)
- [getTransactionCount](wrappers_MultiSig.MultiSigWrapper.md#gettransactioncount)
- [isOwner](wrappers_MultiSig.MultiSigWrapper.md#isowner)
- [methodIds](wrappers_MultiSig.MultiSigWrapper.md#methodids)
- [replaceOwner](wrappers_MultiSig.MultiSigWrapper.md#replaceowner)
- [totalTransactionCount](wrappers_MultiSig.MultiSigWrapper.md#totaltransactioncount)

### Accessors

- [address](wrappers_MultiSig.MultiSigWrapper.md#address)

### Methods

- [confirmTransaction](wrappers_MultiSig.MultiSigWrapper.md#confirmtransaction)
- [getConfirmations](wrappers_MultiSig.MultiSigWrapper.md#getconfirmations)
- [getPastEvents](wrappers_MultiSig.MultiSigWrapper.md#getpastevents)
- [getTransaction](wrappers_MultiSig.MultiSigWrapper.md#gettransaction)
- [getTransactionDataByContent](wrappers_MultiSig.MultiSigWrapper.md#gettransactiondatabycontent)
- [getTransactions](wrappers_MultiSig.MultiSigWrapper.md#gettransactions)
- [submitOrConfirmTransaction](wrappers_MultiSig.MultiSigWrapper.md#submitorconfirmtransaction)
- [version](wrappers_MultiSig.MultiSigWrapper.md#version)

## Constructors

### constructor

• **new MultiSigWrapper**(`connection`, `contract`): [`MultiSigWrapper`](wrappers_MultiSig.MultiSigWrapper.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `connection` | `Connection` |
| `contract` | `MultiSig` |

#### Returns

[`MultiSigWrapper`](wrappers_MultiSig.MultiSigWrapper.md)

#### Inherited from

[BaseWrapper](wrappers_BaseWrapper.BaseWrapper.md).[constructor](wrappers_BaseWrapper.BaseWrapper.md#constructor)

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:34](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L34)

## Properties

### eventTypes

• **eventTypes**: `EventsEnum`\<`MultiSig`\>

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
| `Confirmation` | `ContractEvent`\<\{ `0`: `string` ; `1`: `string` ; `sender`: `string` ; `transactionId`: `string`  }\> |
| `Deposit` | `ContractEvent`\<\{ `0`: `string` ; `1`: `string` ; `sender`: `string` ; `value`: `string`  }\> |
| `Execution` | `ContractEvent`\<\{ `0`: `string` ; `1`: `string` ; `returnData`: `string` ; `transactionId`: `string`  }\> |
| `InternalRequirementChange` | `ContractEvent`\<`string`\> |
| `OwnerAddition` | `ContractEvent`\<`string`\> |
| `OwnerRemoval` | `ContractEvent`\<`string`\> |
| `RequirementChange` | `ContractEvent`\<`string`\> |
| `Revocation` | `ContractEvent`\<\{ `0`: `string` ; `1`: `string` ; `sender`: `string` ; `transactionId`: `string`  }\> |
| `Submission` | `ContractEvent`\<`string`\> |
| `allEvents` | (`options?`: `EventOptions`, `cb?`: `Callback`\<`EventLog`\>) => `EventEmitter` |

#### Inherited from

[BaseWrapper](wrappers_BaseWrapper.BaseWrapper.md).[events](wrappers_BaseWrapper.BaseWrapper.md#events)

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:61](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L61)

___

### getInternalRequired

• **getInternalRequired**: (...`args`: []) => `Promise`\<`BigNumber`\>

#### Type declaration

▸ (`...args`): `Promise`\<`BigNumber`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [] |

##### Returns

`Promise`\<`BigNumber`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/MultiSig.ts:73](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/MultiSig.ts#L73)

___

### getOwners

• **getOwners**: (...`args`: []) => `Promise`\<`string`[]\>

#### Type declaration

▸ (`...args`): `Promise`\<`string`[]\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [] |

##### Returns

`Promise`\<`string`[]\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/MultiSig.ts:71](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/MultiSig.ts#L71)

___

### getRequired

• **getRequired**: (...`args`: []) => `Promise`\<`BigNumber`\>

#### Type declaration

▸ (`...args`): `Promise`\<`BigNumber`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [] |

##### Returns

`Promise`\<`BigNumber`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/MultiSig.ts:72](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/MultiSig.ts#L72)

___

### getTransactionCount

• **getTransactionCount**: (...`args`: [pending: boolean, executed: boolean]) => `Promise`\<`number`\>

#### Type declaration

▸ (`...args`): `Promise`\<`number`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [pending: boolean, executed: boolean] |

##### Returns

`Promise`\<`number`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/MultiSig.ts:79](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/MultiSig.ts#L79)

___

### isOwner

• **isOwner**: (`owner`: `string`) => `Promise`\<`boolean`\>

#### Type declaration

▸ (`owner`): `Promise`\<`boolean`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `owner` | `string` |

##### Returns

`Promise`\<`boolean`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/MultiSig.ts:70](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/MultiSig.ts#L70)

___

### methodIds

• **methodIds**: `Record`\<``"confirmations"`` \| ``"initialized"`` \| ``"isOwner"`` \| ``"initialize"`` \| ``"MAX_OWNER_COUNT"`` \| ``"internalRequired"`` \| ``"owners"`` \| ``"required"`` \| ``"transactionCount"`` \| ``"transactions"`` \| ``"addOwner"`` \| ``"removeOwner"`` \| ``"replaceOwner"`` \| ``"changeRequirement"`` \| ``"changeInternalRequirement"`` \| ``"submitTransaction"`` \| ``"confirmTransaction"`` \| ``"revokeConfirmation"`` \| ``"executeTransaction"`` \| ``"isConfirmed"`` \| ``"getConfirmationCount"`` \| ``"getTransactionCount"`` \| ``"getOwners"`` \| ``"getConfirmations"`` \| ``"getTransactionIds"``, `string`\>

#### Inherited from

[BaseWrapper](wrappers_BaseWrapper.BaseWrapper.md).[methodIds](wrappers_BaseWrapper.BaseWrapper.md#methodids)

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:68](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L68)

___

### replaceOwner

• **replaceOwner**: (`owner`: `string`, `newOwner`: `string`) => `CeloTransactionObject`\<`void`\>

#### Type declaration

▸ (`owner`, `newOwner`): `CeloTransactionObject`\<`void`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `owner` | `string` |
| `newOwner` | `string` |

##### Returns

`CeloTransactionObject`\<`void`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/MultiSig.ts:80](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/MultiSig.ts#L80)

___

### totalTransactionCount

• **totalTransactionCount**: (...`args`: []) => `Promise`\<`number`\>

#### Type declaration

▸ (`...args`): `Promise`\<`number`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [] |

##### Returns

`Promise`\<`number`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/MultiSig.ts:78](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/MultiSig.ts#L78)

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

### confirmTransaction

▸ **confirmTransaction**(`transactionId`): `Promise`\<`CeloTransactionObject`\<`void`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `transactionId` | `number` |

#### Returns

`Promise`\<`CeloTransactionObject`\<`void`\>\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/MultiSig.ts:63](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/MultiSig.ts#L63)

___

### getConfirmations

▸ **getConfirmations**(`txId`): `Promise`\<`string`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `txId` | `number` |

#### Returns

`Promise`\<`string`[]\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/MultiSig.ts:146](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/MultiSig.ts#L146)

___

### getPastEvents

▸ **getPastEvents**(`event`, `options`): `Promise`\<`EventLog`[]\>

Contract getPastEvents

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"allEvents"`` \| ``"Execution"`` \| ``"Revocation"`` \| ``"Confirmation"`` \| ``"Deposit"`` \| ``"InternalRequirementChange"`` \| ``"OwnerAddition"`` \| ``"OwnerRemoval"`` \| ``"RequirementChange"`` \| ``"Submission"`` |
| `options` | `PastEventOptions` |

#### Returns

`Promise`\<`EventLog`[]\>

#### Inherited from

[BaseWrapper](wrappers_BaseWrapper.BaseWrapper.md).[getPastEvents](wrappers_BaseWrapper.BaseWrapper.md#getpastevents)

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:57](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L57)

___

### getTransaction

▸ **getTransaction**(`i`): `Promise`\<[`TransactionData`](../interfaces/wrappers_MultiSig.TransactionData.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `i` | `number` |

#### Returns

`Promise`\<[`TransactionData`](../interfaces/wrappers_MultiSig.TransactionData.md)\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/MultiSig.ts:114](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/MultiSig.ts#L114)

▸ **getTransaction**(`i`, `includeConfirmations`): `Promise`\<[`TransactionDataWithOutConfirmations`](../interfaces/wrappers_MultiSig.TransactionDataWithOutConfirmations.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `i` | `number` |
| `includeConfirmations` | ``false`` |

#### Returns

`Promise`\<[`TransactionDataWithOutConfirmations`](../interfaces/wrappers_MultiSig.TransactionDataWithOutConfirmations.md)\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/MultiSig.ts:115](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/MultiSig.ts#L115)

___

### getTransactionDataByContent

▸ **getTransactionDataByContent**(`destination`, `txo`, `value?`): `Promise`\<`undefined` \| \{ `confirmations`: `string`[] ; `data`: `string` ; `destination`: `string` ; `executed`: `boolean` ; `index`: `number` ; `value`: `BigNumber`  }\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `destination` | `string` | `undefined` |
| `txo` | `CeloTxObject`\<`any`\> | `undefined` |
| `value` | `Value` | `0` |

#### Returns

`Promise`\<`undefined` \| \{ `confirmations`: `string`[] ; `data`: `string` ; `destination`: `string` ; `executed`: `boolean` ; `index`: `number` ; `value`: `BigNumber`  }\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/MultiSig.ts:86](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/MultiSig.ts#L86)

___

### getTransactions

▸ **getTransactions**(): `Promise`\<[`TransactionData`](../interfaces/wrappers_MultiSig.TransactionData.md)[]\>

#### Returns

`Promise`\<[`TransactionData`](../interfaces/wrappers_MultiSig.TransactionData.md)[]\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/MultiSig.ts:162](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/MultiSig.ts#L162)

___

### submitOrConfirmTransaction

▸ **submitOrConfirmTransaction**(`destination`, `txObject`, `value?`): `Promise`\<`CeloTransactionObject`\<`void`\> \| `CeloTransactionObject`\<`string`\>\>

Allows an owner to submit and confirm a transaction.
If an unexecuted transaction matching `txObject` exists on the multisig, adds a confirmation to that tx ID.
Otherwise, submits the `txObject` to the multisig and add confirmation.

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `destination` | `string` | `undefined` |
| `txObject` | `CeloTxObject`\<`any`\> | `undefined` |
| `value` | `string` | `'0'` |

#### Returns

`Promise`\<`CeloTransactionObject`\<`void`\> \| `CeloTransactionObject`\<`string`\>\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/MultiSig.ts:39](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/MultiSig.ts#L39)

___

### version

▸ **version**(): `Promise`\<`never`\>

#### Returns

`Promise`\<`never`\>

#### Inherited from

[BaseWrapper](wrappers_BaseWrapper.BaseWrapper.md).[version](wrappers_BaseWrapper.BaseWrapper.md#version)

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:41](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L41)
