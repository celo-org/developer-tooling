[@celo/contractkit](../README.md) / [Exports](../modules.md) / [wrappers/FeeHandler](../modules/wrappers_FeeHandler.md) / FeeHandlerWrapper

# Class: FeeHandlerWrapper

[wrappers/FeeHandler](../modules/wrappers_FeeHandler.md).FeeHandlerWrapper

-- use its children

## Hierarchy

- [`BaseWrapper`](wrappers_BaseWrapper.BaseWrapper.md)\<`FeeHandler`\>

  ↳ **`FeeHandlerWrapper`**

## Table of contents

### Constructors

- [constructor](wrappers_FeeHandler.FeeHandlerWrapper.md#constructor)

### Properties

- [burnCelo](wrappers_FeeHandler.FeeHandlerWrapper.md#burncelo)
- [eventTypes](wrappers_FeeHandler.FeeHandlerWrapper.md#eventtypes)
- [events](wrappers_FeeHandler.FeeHandlerWrapper.md#events)
- [handleAll](wrappers_FeeHandler.FeeHandlerWrapper.md#handleall)
- [methodIds](wrappers_FeeHandler.FeeHandlerWrapper.md#methodids)
- [owner](wrappers_FeeHandler.FeeHandlerWrapper.md#owner)

### Accessors

- [address](wrappers_FeeHandler.FeeHandlerWrapper.md#address)

### Methods

- [distribute](wrappers_FeeHandler.FeeHandlerWrapper.md#distribute)
- [getPastEvents](wrappers_FeeHandler.FeeHandlerWrapper.md#getpastevents)
- [handle](wrappers_FeeHandler.FeeHandlerWrapper.md#handle)
- [sell](wrappers_FeeHandler.FeeHandlerWrapper.md#sell)
- [version](wrappers_FeeHandler.FeeHandlerWrapper.md#version)

## Constructors

### constructor

• **new FeeHandlerWrapper**(`connection`, `contract`): [`FeeHandlerWrapper`](wrappers_FeeHandler.FeeHandlerWrapper.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `connection` | `Connection` |
| `contract` | `FeeHandler` |

#### Returns

[`FeeHandlerWrapper`](wrappers_FeeHandler.FeeHandlerWrapper.md)

#### Inherited from

[BaseWrapper](wrappers_BaseWrapper.BaseWrapper.md).[constructor](wrappers_BaseWrapper.BaseWrapper.md#constructor)

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:34](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L34)

## Properties

### burnCelo

• **burnCelo**: (...`args`: []) => `CeloTransactionObject`\<`void`\>

#### Type declaration

▸ (`...args`): `CeloTransactionObject`\<`void`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [] |

##### Returns

`CeloTransactionObject`\<`void`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/FeeHandler.ts:47](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/FeeHandler.ts#L47)

___

### eventTypes

• **eventTypes**: `EventsEnum`\<`FeeHandler`\>

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
| `BurnFractionSet` | `ContractEvent`\<`string`\> |
| `DailyLimitHit` | `ContractEvent`\<\{ `0`: `string` ; `1`: `string` ; `burning`: `string` ; `token`: `string`  }\> |
| `DailyLimitSet` | `ContractEvent`\<\{ `0`: `string` ; `1`: `string` ; `newLimit`: `string` ; `tokenAddress`: `string`  }\> |
| `DailySellLimitUpdated` | `ContractEvent`\<`string`\> |
| `FeeBeneficiarySet` | `ContractEvent`\<`string`\> |
| `MaxSlippageSet` | `ContractEvent`\<\{ `0`: `string` ; `1`: `string` ; `maxSlippage`: `string` ; `token`: `string`  }\> |
| `OwnershipTransferred` | `ContractEvent`\<\{ `0`: `string` ; `1`: `string` ; `newOwner`: `string` ; `previousOwner`: `string`  }\> |
| `RegistrySet` | `ContractEvent`\<`string`\> |
| `SoldAndBurnedToken` | `ContractEvent`\<\{ `0`: `string` ; `1`: `string` ; `token`: `string` ; `value`: `string`  }\> |
| `TokenAdded` | `ContractEvent`\<\{ `0`: `string` ; `1`: `string` ; `handlerAddress`: `string` ; `tokenAddress`: `string`  }\> |
| `TokenRemoved` | `ContractEvent`\<`string`\> |
| `allEvents` | (`options?`: `EventOptions`, `cb?`: `Callback`\<`EventLog`\>) => `EventEmitter` |

#### Inherited from

[BaseWrapper](wrappers_BaseWrapper.BaseWrapper.md).[events](wrappers_BaseWrapper.BaseWrapper.md#events)

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:61](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L61)

___

### handleAll

• **handleAll**: (...`args`: []) => `CeloTransactionObject`\<`void`\>

#### Type declaration

▸ (`...args`): `CeloTransactionObject`\<`void`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [] |

##### Returns

`CeloTransactionObject`\<`void`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/FeeHandler.ts:46](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/FeeHandler.ts#L46)

___

### methodIds

• **methodIds**: `Record`\<``"initialized"`` \| ``"isOwner"`` \| ``"owner"`` \| ``"registry"`` \| ``"renounceOwnership"`` \| ``"setRegistry"`` \| ``"transferOwnership"`` \| ``"getVersionNumber"`` \| ``"initialize"`` \| ``"addToken"`` \| ``"removeToken"`` \| ``"transfer"`` \| ``"FIXED1_UINT"`` \| ``"MIN_BURN"`` \| ``"burnFraction"`` \| ``"celoToBeBurned"`` \| ``"feeBeneficiary"`` \| ``"lastLimitDay"`` \| ``"getTokenHandler"`` \| ``"getTokenActive"`` \| ``"getTokenMaxSlippage"`` \| ``"getTokenDailySellLimit"`` \| ``"getTokenCurrentDaySellLimit"`` \| ``"getTokenToDistribute"`` \| ``"getActiveTokens"`` \| ``"setFeeBeneficiary"`` \| ``"setBurnFraction"`` \| ``"sell"`` \| ``"activateToken"`` \| ``"deactivateToken"`` \| ``"setHandler"`` \| ``"distribute"`` \| ``"setMaxSplippage"`` \| ``"setDailySellLimit"`` \| ``"burnCelo"`` \| ``"distributeAll"`` \| ``"handleAll"`` \| ``"handle"`` \| ``"getPastBurnForToken"`` \| ``"dailySellLimitHit"``, `string`\>

#### Inherited from

[BaseWrapper](wrappers_BaseWrapper.BaseWrapper.md).[methodIds](wrappers_BaseWrapper.BaseWrapper.md#methodids)

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:68](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L68)

___

### owner

• **owner**: (...`args`: []) => `Promise`\<`string`\>

#### Type declaration

▸ (`...args`): `Promise`\<`string`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [] |

##### Returns

`Promise`\<`string`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/FeeHandler.ts:44](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/FeeHandler.ts#L44)

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

### distribute

▸ **distribute**(`tokenAddress`): `Promise`\<`CeloTransactionObject`\<`void`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `tokenAddress` | `string` |

#### Returns

`Promise`\<`CeloTransactionObject`\<`void`\>\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/FeeHandler.ts:59](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/FeeHandler.ts#L59)

___

### getPastEvents

▸ **getPastEvents**(`event`, `options`): `Promise`\<`EventLog`[]\>

Contract getPastEvents

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"OwnershipTransferred"`` \| ``"RegistrySet"`` \| ``"allEvents"`` \| ``"TokenAdded"`` \| ``"TokenRemoved"`` \| ``"BurnFractionSet"`` \| ``"DailyLimitHit"`` \| ``"DailyLimitSet"`` \| ``"DailySellLimitUpdated"`` \| ``"FeeBeneficiarySet"`` \| ``"MaxSlippageSet"`` \| ``"SoldAndBurnedToken"`` |
| `options` | `PastEventOptions` |

#### Returns

`Promise`\<`EventLog`[]\>

#### Inherited from

[BaseWrapper](wrappers_BaseWrapper.BaseWrapper.md).[getPastEvents](wrappers_BaseWrapper.BaseWrapper.md#getpastevents)

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:57](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L57)

___

### handle

▸ **handle**(`tokenAddress`): `Promise`\<`CeloTransactionObject`\<`void`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `tokenAddress` | `string` |

#### Returns

`Promise`\<`CeloTransactionObject`\<`void`\>\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/FeeHandler.ts:49](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/FeeHandler.ts#L49)

___

### sell

▸ **sell**(`tokenAddress`): `Promise`\<`CeloTransactionObject`\<`void`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `tokenAddress` | `string` |

#### Returns

`Promise`\<`CeloTransactionObject`\<`void`\>\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/FeeHandler.ts:54](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/FeeHandler.ts#L54)

___

### version

▸ **version**(): `Promise`\<[`ContractVersion`](versions.ContractVersion.md)\>

#### Returns

`Promise`\<[`ContractVersion`](versions.ContractVersion.md)\>

#### Inherited from

[BaseWrapper](wrappers_BaseWrapper.BaseWrapper.md).[version](wrappers_BaseWrapper.BaseWrapper.md#version)

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:41](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L41)
