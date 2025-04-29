[**@celo/contractkit**](../../../README.md)

***

[@celo/contractkit](../../../modules.md) / [wrappers/MultiSig](../README.md) / MultiSigWrapper

# Class: MultiSigWrapper

Defined in: [packages/sdk/contractkit/src/wrappers/MultiSig.ts:32](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/MultiSig.ts#L32)

Contract for handling multisig actions

## Extends

- [`BaseWrapper`](../../BaseWrapper/classes/BaseWrapper.md)\<`MultiSig`\>

## Constructors

### Constructor

> **new MultiSigWrapper**(`connection`, `contract`): `MultiSigWrapper`

Defined in: [packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:34](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L34)

#### Parameters

##### connection

`Connection`

##### contract

`MultiSig`

#### Returns

`MultiSigWrapper`

#### Inherited from

[`BaseWrapper`](../../BaseWrapper/classes/BaseWrapper.md).[`constructor`](../../BaseWrapper/classes/BaseWrapper.md#constructor)

## Properties

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

#### Confirmation

> **Confirmation**: `ContractEvent`\<\{ `0`: `string`; `1`: `string`; `sender`: `string`; `transactionId`: `string`; \}\>

#### Deposit

> **Deposit**: `ContractEvent`\<\{ `0`: `string`; `1`: `string`; `sender`: `string`; `value`: `string`; \}\>

#### Execution

> **Execution**: `ContractEvent`\<\{ `0`: `string`; `1`: `string`; `returnData`: `string`; `transactionId`: `string`; \}\>

#### InternalRequirementChange

> **InternalRequirementChange**: `ContractEvent`\<`string`\>

#### OwnerAddition

> **OwnerAddition**: `ContractEvent`\<`string`\>

#### OwnerRemoval

> **OwnerRemoval**: `ContractEvent`\<`string`\>

#### RequirementChange

> **RequirementChange**: `ContractEvent`\<`string`\>

#### Revocation

> **Revocation**: `ContractEvent`\<\{ `0`: `string`; `1`: `string`; `sender`: `string`; `transactionId`: `string`; \}\>

#### Submission

> **Submission**: `ContractEvent`\<`string`\>

#### Inherited from

[`BaseWrapper`](../../BaseWrapper/classes/BaseWrapper.md).[`events`](../../BaseWrapper/classes/BaseWrapper.md#events)

***

### eventTypes

> **eventTypes**: `EventsEnum`\<`MultiSig`\>

Defined in: [packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:63](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L63)

#### Inherited from

[`BaseWrapper`](../../BaseWrapper/classes/BaseWrapper.md).[`eventTypes`](../../BaseWrapper/classes/BaseWrapper.md#eventtypes)

***

### getInternalRequired()

> **getInternalRequired**: (...`args`) => `Promise`\<`BigNumber`\>

Defined in: [packages/sdk/contractkit/src/wrappers/MultiSig.ts:73](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/MultiSig.ts#L73)

#### Parameters

##### args

...\[\]

#### Returns

`Promise`\<`BigNumber`\>

***

### getOwners()

> **getOwners**: (...`args`) => `Promise`\<`string`[]\>

Defined in: [packages/sdk/contractkit/src/wrappers/MultiSig.ts:71](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/MultiSig.ts#L71)

#### Parameters

##### args

...\[\]

#### Returns

`Promise`\<`string`[]\>

***

### getRequired()

> **getRequired**: (...`args`) => `Promise`\<`BigNumber`\>

Defined in: [packages/sdk/contractkit/src/wrappers/MultiSig.ts:72](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/MultiSig.ts#L72)

#### Parameters

##### args

...\[\]

#### Returns

`Promise`\<`BigNumber`\>

***

### getTransactionCount()

> **getTransactionCount**: (...`args`) => `Promise`\<`number`\>

Defined in: [packages/sdk/contractkit/src/wrappers/MultiSig.ts:79](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/MultiSig.ts#L79)

#### Parameters

##### args

...\[`boolean`, `boolean`\]

#### Returns

`Promise`\<`number`\>

***

### isOwner()

> **isOwner**: (`owner`) => `Promise`\<`boolean`\>

Defined in: [packages/sdk/contractkit/src/wrappers/MultiSig.ts:70](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/MultiSig.ts#L70)

#### Parameters

##### owner

`string`

#### Returns

`Promise`\<`boolean`\>

***

### methodIds

> **methodIds**: `Record`\<`"confirmations"` \| `"initialized"` \| `"isOwner"` \| `"initialize"` \| `"MAX_OWNER_COUNT"` \| `"internalRequired"` \| `"owners"` \| `"required"` \| `"transactionCount"` \| `"transactions"` \| `"addOwner"` \| `"removeOwner"` \| `"replaceOwner"` \| `"changeRequirement"` \| `"changeInternalRequirement"` \| `"submitTransaction"` \| `"confirmTransaction"` \| `"revokeConfirmation"` \| `"executeTransaction"` \| `"isConfirmed"` \| `"getConfirmationCount"` \| `"getTransactionCount"` \| `"getOwners"` \| `"getConfirmations"` \| `"getTransactionIds"`, `string`\>

Defined in: [packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:68](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L68)

#### Inherited from

[`BaseWrapper`](../../BaseWrapper/classes/BaseWrapper.md).[`methodIds`](../../BaseWrapper/classes/BaseWrapper.md#methodids)

***

### replaceOwner()

> **replaceOwner**: (`owner`, `newOwner`) => `CeloTransactionObject`\<`void`\>

Defined in: [packages/sdk/contractkit/src/wrappers/MultiSig.ts:80](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/MultiSig.ts#L80)

#### Parameters

##### owner

`string`

##### newOwner

`string`

#### Returns

`CeloTransactionObject`\<`void`\>

***

### totalTransactionCount()

> **totalTransactionCount**: (...`args`) => `Promise`\<`number`\>

Defined in: [packages/sdk/contractkit/src/wrappers/MultiSig.ts:78](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/MultiSig.ts#L78)

#### Parameters

##### args

...\[\]

#### Returns

`Promise`\<`number`\>

## Accessors

### address

#### Get Signature

> **get** **address**(): `` `0x${string}` ``

Defined in: [packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:37](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L37)

Contract address

##### Returns

`` `0x${string}` ``

#### Inherited from

[`BaseWrapper`](../../BaseWrapper/classes/BaseWrapper.md).[`address`](../../BaseWrapper/classes/BaseWrapper.md#address)

## Methods

### confirmTransaction()

> **confirmTransaction**(`transactionId`): `Promise`\<`CeloTransactionObject`\<`void`\>\>

Defined in: [packages/sdk/contractkit/src/wrappers/MultiSig.ts:63](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/MultiSig.ts#L63)

#### Parameters

##### transactionId

`number`

#### Returns

`Promise`\<`CeloTransactionObject`\<`void`\>\>

***

### getConfirmations()

> **getConfirmations**(`txId`): `Promise`\<`string`[]\>

Defined in: [packages/sdk/contractkit/src/wrappers/MultiSig.ts:146](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/MultiSig.ts#L146)

#### Parameters

##### txId

`number`

#### Returns

`Promise`\<`string`[]\>

***

### getPastEvents()

> **getPastEvents**(`event`, `options`): `Promise`\<`EventLog`[]\>

Defined in: [packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:57](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L57)

Contract getPastEvents

#### Parameters

##### event

`"allEvents"` | `"Execution"` | `"Revocation"` | `"Confirmation"` | `"Deposit"` | `"InternalRequirementChange"` | `"OwnerAddition"` | `"OwnerRemoval"` | `"RequirementChange"` | `"Submission"`

##### options

`PastEventOptions`

#### Returns

`Promise`\<`EventLog`[]\>

#### Inherited from

[`BaseWrapper`](../../BaseWrapper/classes/BaseWrapper.md).[`getPastEvents`](../../BaseWrapper/classes/BaseWrapper.md#getpastevents)

***

### getTransaction()

#### Call Signature

> **getTransaction**(`i`): `Promise`\<[`TransactionData`](../interfaces/TransactionData.md)\>

Defined in: [packages/sdk/contractkit/src/wrappers/MultiSig.ts:114](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/MultiSig.ts#L114)

##### Parameters

###### i

`number`

##### Returns

`Promise`\<[`TransactionData`](../interfaces/TransactionData.md)\>

#### Call Signature

> **getTransaction**(`i`, `includeConfirmations`): `Promise`\<[`TransactionDataWithOutConfirmations`](../interfaces/TransactionDataWithOutConfirmations.md)\>

Defined in: [packages/sdk/contractkit/src/wrappers/MultiSig.ts:115](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/MultiSig.ts#L115)

##### Parameters

###### i

`number`

###### includeConfirmations

`false`

##### Returns

`Promise`\<[`TransactionDataWithOutConfirmations`](../interfaces/TransactionDataWithOutConfirmations.md)\>

***

### getTransactionDataByContent()

> **getTransactionDataByContent**(`destination`, `txo`, `value`): `Promise`\<`undefined` \| \{ `confirmations`: `string`[]; `data`: `string`; `destination`: `string`; `executed`: `boolean`; `index`: `number`; `value`: `BigNumber`; \}\>

Defined in: [packages/sdk/contractkit/src/wrappers/MultiSig.ts:86](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/MultiSig.ts#L86)

#### Parameters

##### destination

`string`

##### txo

`CeloTxObject`\<`any`\>

##### value

`Value` = `0`

#### Returns

`Promise`\<`undefined` \| \{ `confirmations`: `string`[]; `data`: `string`; `destination`: `string`; `executed`: `boolean`; `index`: `number`; `value`: `BigNumber`; \}\>

***

### getTransactions()

> **getTransactions**(): `Promise`\<[`TransactionData`](../interfaces/TransactionData.md)[]\>

Defined in: [packages/sdk/contractkit/src/wrappers/MultiSig.ts:162](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/MultiSig.ts#L162)

#### Returns

`Promise`\<[`TransactionData`](../interfaces/TransactionData.md)[]\>

***

### submitOrConfirmTransaction()

> **submitOrConfirmTransaction**(`destination`, `txObject`, `value`): `Promise`\<`CeloTransactionObject`\<`void`\> \| `CeloTransactionObject`\<`string`\>\>

Defined in: [packages/sdk/contractkit/src/wrappers/MultiSig.ts:39](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/MultiSig.ts#L39)

Allows an owner to submit and confirm a transaction.
If an unexecuted transaction matching `txObject` exists on the multisig, adds a confirmation to that tx ID.
Otherwise, submits the `txObject` to the multisig and add confirmation.

#### Parameters

##### destination

`string`

##### txObject

`CeloTxObject`\<`any`\>

##### value

`string` = `'0'`

#### Returns

`Promise`\<`CeloTransactionObject`\<`void`\> \| `CeloTransactionObject`\<`string`\>\>

***

### version()

> **version**(): `Promise`\<`never`\>

Defined in: [packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:41](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L41)

#### Returns

`Promise`\<`never`\>

#### Inherited from

[`BaseWrapper`](../../BaseWrapper/classes/BaseWrapper.md).[`version`](../../BaseWrapper/classes/BaseWrapper.md#version)
