[@celo/contractkit](../README.md) / [Exports](../modules.md) / [wrappers/Freezer](../modules/wrappers_Freezer.md) / FreezerWrapper

# Class: FreezerWrapper

[wrappers/Freezer](../modules/wrappers_Freezer.md).FreezerWrapper

-- use its children

## Hierarchy

- [`BaseWrapper`](wrappers_BaseWrapper.BaseWrapper.md)\<`Freezer`\>

  ↳ **`FreezerWrapper`**

## Table of contents

### Constructors

- [constructor](wrappers_Freezer.FreezerWrapper.md#constructor)

### Properties

- [eventTypes](wrappers_Freezer.FreezerWrapper.md#eventtypes)
- [events](wrappers_Freezer.FreezerWrapper.md#events)
- [freeze](wrappers_Freezer.FreezerWrapper.md#freeze)
- [isFrozen](wrappers_Freezer.FreezerWrapper.md#isfrozen)
- [methodIds](wrappers_Freezer.FreezerWrapper.md#methodids)
- [unfreeze](wrappers_Freezer.FreezerWrapper.md#unfreeze)

### Accessors

- [address](wrappers_Freezer.FreezerWrapper.md#address)

### Methods

- [getPastEvents](wrappers_Freezer.FreezerWrapper.md#getpastevents)
- [version](wrappers_Freezer.FreezerWrapper.md#version)

## Constructors

### constructor

• **new FreezerWrapper**(`connection`, `contract`): [`FreezerWrapper`](wrappers_Freezer.FreezerWrapper.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `connection` | `Connection` |
| `contract` | `Freezer` |

#### Returns

[`FreezerWrapper`](wrappers_Freezer.FreezerWrapper.md)

#### Inherited from

[BaseWrapper](wrappers_BaseWrapper.BaseWrapper.md).[constructor](wrappers_BaseWrapper.BaseWrapper.md#constructor)

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:34](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L34)

## Properties

### eventTypes

• **eventTypes**: `EventsEnum`\<`Freezer`\>

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
| `OwnershipTransferred` | `ContractEvent`\<\{ `0`: `string` ; `1`: `string` ; `newOwner`: `string` ; `previousOwner`: `string`  }\> |
| `allEvents` | (`options?`: `EventOptions`, `cb?`: `Callback`\<`EventLog`\>) => `EventEmitter` |

#### Inherited from

[BaseWrapper](wrappers_BaseWrapper.BaseWrapper.md).[events](wrappers_BaseWrapper.BaseWrapper.md#events)

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:61](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L61)

___

### freeze

• **freeze**: (...`args`: [target: string]) => `CeloTransactionObject`\<`void`\>

#### Type declaration

▸ (`...args`): `CeloTransactionObject`\<`void`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [target: string] |

##### Returns

`CeloTransactionObject`\<`void`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/Freezer.ts:5](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Freezer.ts#L5)

___

### isFrozen

• **isFrozen**: (...`args`: [arg0: string]) => `Promise`\<`boolean`\>

#### Type declaration

▸ (`...args`): `Promise`\<`boolean`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [arg0: string] |

##### Returns

`Promise`\<`boolean`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/Freezer.ts:7](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Freezer.ts#L7)

___

### methodIds

• **methodIds**: `Record`\<``"initialized"`` \| ``"isOwner"`` \| ``"owner"`` \| ``"renounceOwnership"`` \| ``"transferOwnership"`` \| ``"initialize"`` \| ``"isFrozen"`` \| ``"freeze"`` \| ``"unfreeze"``, `string`\>

#### Inherited from

[BaseWrapper](wrappers_BaseWrapper.BaseWrapper.md).[methodIds](wrappers_BaseWrapper.BaseWrapper.md#methodids)

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:68](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L68)

___

### unfreeze

• **unfreeze**: (...`args`: [target: string]) => `CeloTransactionObject`\<`void`\>

#### Type declaration

▸ (`...args`): `CeloTransactionObject`\<`void`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [target: string] |

##### Returns

`CeloTransactionObject`\<`void`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/Freezer.ts:6](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Freezer.ts#L6)

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
| `event` | ``"OwnershipTransferred"`` \| ``"allEvents"`` |
| `options` | `PastEventOptions` |

#### Returns

`Promise`\<`EventLog`[]\>

#### Inherited from

[BaseWrapper](wrappers_BaseWrapper.BaseWrapper.md).[getPastEvents](wrappers_BaseWrapper.BaseWrapper.md#getpastevents)

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:57](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L57)

___

### version

▸ **version**(): `Promise`\<`never`\>

#### Returns

`Promise`\<`never`\>

#### Inherited from

[BaseWrapper](wrappers_BaseWrapper.BaseWrapper.md).[version](wrappers_BaseWrapper.BaseWrapper.md#version)

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:41](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L41)
