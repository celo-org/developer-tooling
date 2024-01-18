[@celo/contractkit](../README.md) / [Exports](../modules.md) / [wrappers/StableTokenWrapper](../modules/wrappers_StableTokenWrapper.md) / StableTokenWrapper

# Class: StableTokenWrapper

[wrappers/StableTokenWrapper](../modules/wrappers_StableTokenWrapper.md).StableTokenWrapper

Stable token with variable supply

## Hierarchy

- [`CeloTokenWrapper`](wrappers_CeloTokenWrapper.CeloTokenWrapper.md)\<`StableToken`\>

  ↳ **`StableTokenWrapper`**

## Table of contents

### Constructors

- [constructor](wrappers_StableTokenWrapper.StableTokenWrapper.md#constructor)

### Properties

- [allowance](wrappers_StableTokenWrapper.StableTokenWrapper.md#allowance)
- [approve](wrappers_StableTokenWrapper.StableTokenWrapper.md#approve)
- [balanceOf](wrappers_StableTokenWrapper.StableTokenWrapper.md#balanceof)
- [burn](wrappers_StableTokenWrapper.StableTokenWrapper.md#burn)
- [decimals](wrappers_StableTokenWrapper.StableTokenWrapper.md#decimals)
- [decreaseAllowance](wrappers_StableTokenWrapper.StableTokenWrapper.md#decreaseallowance)
- [eventTypes](wrappers_StableTokenWrapper.StableTokenWrapper.md#eventtypes)
- [events](wrappers_StableTokenWrapper.StableTokenWrapper.md#events)
- [increaseAllowance](wrappers_StableTokenWrapper.StableTokenWrapper.md#increaseallowance)
- [methodIds](wrappers_StableTokenWrapper.StableTokenWrapper.md#methodids)
- [mint](wrappers_StableTokenWrapper.StableTokenWrapper.md#mint)
- [name](wrappers_StableTokenWrapper.StableTokenWrapper.md#name)
- [owner](wrappers_StableTokenWrapper.StableTokenWrapper.md#owner)
- [setInflationParameters](wrappers_StableTokenWrapper.StableTokenWrapper.md#setinflationparameters)
- [symbol](wrappers_StableTokenWrapper.StableTokenWrapper.md#symbol)
- [totalSupply](wrappers_StableTokenWrapper.StableTokenWrapper.md#totalsupply)
- [transfer](wrappers_StableTokenWrapper.StableTokenWrapper.md#transfer)
- [transferFrom](wrappers_StableTokenWrapper.StableTokenWrapper.md#transferfrom)
- [transferWithComment](wrappers_StableTokenWrapper.StableTokenWrapper.md#transferwithcomment)
- [unitsToValue](wrappers_StableTokenWrapper.StableTokenWrapper.md#unitstovalue)
- [valueToUnits](wrappers_StableTokenWrapper.StableTokenWrapper.md#valuetounits)

### Accessors

- [address](wrappers_StableTokenWrapper.StableTokenWrapper.md#address)

### Methods

- [getConfig](wrappers_StableTokenWrapper.StableTokenWrapper.md#getconfig)
- [getHumanReadableConfig](wrappers_StableTokenWrapper.StableTokenWrapper.md#gethumanreadableconfig)
- [getInflationParameters](wrappers_StableTokenWrapper.StableTokenWrapper.md#getinflationparameters)
- [getPastEvents](wrappers_StableTokenWrapper.StableTokenWrapper.md#getpastevents)
- [version](wrappers_StableTokenWrapper.StableTokenWrapper.md#version)

## Constructors

### constructor

• **new StableTokenWrapper**(`connection`, `contract`): [`StableTokenWrapper`](wrappers_StableTokenWrapper.StableTokenWrapper.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `connection` | `Connection` |
| `contract` | `StableToken` |

#### Returns

[`StableTokenWrapper`](wrappers_StableTokenWrapper.StableTokenWrapper.md)

#### Inherited from

[CeloTokenWrapper](wrappers_CeloTokenWrapper.CeloTokenWrapper.md).[constructor](wrappers_CeloTokenWrapper.CeloTokenWrapper.md#constructor)

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:34](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L34)

## Properties

### allowance

• **allowance**: (...`args`: [owner: string, spender: string]) => `Promise`\<`BigNumber`\>

Querying allowance.

**`Param`**

Account who has given the allowance.

**`Param`**

Address of account to whom the allowance was given.

#### Type declaration

▸ (`...args`): `Promise`\<`BigNumber`\>

Querying allowance.

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [owner: string, spender: string] |

##### Returns

`Promise`\<`BigNumber`\>

Amount of allowance.

#### Inherited from

[CeloTokenWrapper](wrappers_CeloTokenWrapper.CeloTokenWrapper.md).[allowance](wrappers_CeloTokenWrapper.CeloTokenWrapper.md#allowance)

#### Defined in

[packages/sdk/contractkit/src/wrappers/Erc20Wrapper.ts:18](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Erc20Wrapper.ts#L18)

___

### approve

• **approve**: (...`args`: [spender: string, amount: string \| number]) => `CeloTransactionObject`\<`boolean`\>

Approve a user to transfer the token on behalf of another user.

**`Param`**

The address which is being approved to spend the token.

**`Param`**

The amount of the token approved to the spender.

#### Type declaration

▸ (`...args`): `CeloTransactionObject`\<`boolean`\>

Approve a user to transfer the token on behalf of another user.

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [spender: string, amount: string \| number] |

##### Returns

`CeloTransactionObject`\<`boolean`\>

True if the transaction succeeds.

#### Inherited from

[CeloTokenWrapper](wrappers_CeloTokenWrapper.CeloTokenWrapper.md).[approve](wrappers_CeloTokenWrapper.CeloTokenWrapper.md#approve)

#### Defined in

[packages/sdk/contractkit/src/wrappers/Erc20Wrapper.ts:32](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Erc20Wrapper.ts#L32)

___

### balanceOf

• **balanceOf**: (`owner`: `string`) => `Promise`\<`BigNumber`\>

Gets the balance of the specified address.

**`Param`**

The address to query the balance of.

#### Type declaration

▸ (`owner`): `Promise`\<`BigNumber`\>

Gets the balance of the specified address.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `owner` | `string` | The address to query the balance of. |

##### Returns

`Promise`\<`BigNumber`\>

The balance of the specified address.

#### Inherited from

[CeloTokenWrapper](wrappers_CeloTokenWrapper.CeloTokenWrapper.md).[balanceOf](wrappers_CeloTokenWrapper.CeloTokenWrapper.md#balanceof)

#### Defined in

[packages/sdk/contractkit/src/wrappers/Erc20Wrapper.ts:56](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Erc20Wrapper.ts#L56)

___

### burn

• **burn**: (...`args`: [value: string \| number]) => `CeloTransactionObject`\<`boolean`\>

#### Type declaration

▸ (`...args`): `CeloTransactionObject`\<`boolean`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [value: string \| number] |

##### Returns

`CeloTransactionObject`\<`boolean`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/StableTokenWrapper.ts:83](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/StableTokenWrapper.ts#L83)

___

### decimals

• **decimals**: (...`args`: []) => `Promise`\<`number`\>

Returns the number of decimals used in the token.

#### Type declaration

▸ (`...args`): `Promise`\<`number`\>

Returns the number of decimals used in the token.

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [] |

##### Returns

`Promise`\<`number`\>

Number of decimals.

#### Inherited from

[CeloTokenWrapper](wrappers_CeloTokenWrapper.CeloTokenWrapper.md).[decimals](wrappers_CeloTokenWrapper.CeloTokenWrapper.md#decimals)

#### Defined in

[packages/sdk/contractkit/src/wrappers/CeloTokenWrapper.ts:29](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/CeloTokenWrapper.ts#L29)

___

### decreaseAllowance

• **decreaseAllowance**: (...`args`: [spender: string, value: string \| number]) => `CeloTransactionObject`\<`boolean`\>

Decreases the allowance of another user.

**`Param`**

The address which is being approved to spend StableToken.

**`Param`**

The decrement of the amount of StableToken approved to the spender.

#### Type declaration

▸ (`...args`): `CeloTransactionObject`\<`boolean`\>

Decreases the allowance of another user.

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [spender: string, value: string \| number] |

##### Returns

`CeloTransactionObject`\<`boolean`\>

true if success.

#### Defined in

[packages/sdk/contractkit/src/wrappers/StableTokenWrapper.ts:81](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/StableTokenWrapper.ts#L81)

___

### eventTypes

• **eventTypes**: `EventsEnum`\<`StableToken`\>

#### Inherited from

[CeloTokenWrapper](wrappers_CeloTokenWrapper.CeloTokenWrapper.md).[eventTypes](wrappers_CeloTokenWrapper.CeloTokenWrapper.md#eventtypes)

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:63](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L63)

___

### events

• **events**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `Approval` | `ContractEvent`\<\{ `0`: `string` ; `1`: `string` ; `2`: `string` ; `owner`: `string` ; `spender`: `string` ; `value`: `string`  }\> |
| `InflationFactorUpdated` | `ContractEvent`\<\{ `0`: `string` ; `1`: `string` ; `factor`: `string` ; `lastUpdated`: `string`  }\> |
| `InflationParametersUpdated` | `ContractEvent`\<\{ `0`: `string` ; `1`: `string` ; `2`: `string` ; `lastUpdated`: `string` ; `rate`: `string` ; `updatePeriod`: `string`  }\> |
| `OwnershipTransferred` | `ContractEvent`\<\{ `0`: `string` ; `1`: `string` ; `newOwner`: `string` ; `previousOwner`: `string`  }\> |
| `RegistrySet` | `ContractEvent`\<`string`\> |
| `Transfer` | `ContractEvent`\<\{ `0`: `string` ; `1`: `string` ; `2`: `string` ; `from`: `string` ; `to`: `string` ; `value`: `string`  }\> |
| `TransferComment` | `ContractEvent`\<`string`\> |
| `allEvents` | (`options?`: `EventOptions`, `cb?`: `Callback`\<`EventLog`\>) => `EventEmitter` |

#### Inherited from

[CeloTokenWrapper](wrappers_CeloTokenWrapper.CeloTokenWrapper.md).[events](wrappers_CeloTokenWrapper.CeloTokenWrapper.md#events)

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:61](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L61)

___

### increaseAllowance

• **increaseAllowance**: (...`args`: [`string`, `Value`]) => `CeloTransactionObject`\<`boolean`\>

Increases the allowance of another user.

**`Param`**

The address which is being approved to spend StableToken.

**`Param`**

The increment of the amount of StableToken approved to the spender.

#### Type declaration

▸ (`...args`): `CeloTransactionObject`\<`boolean`\>

Increases the allowance of another user.

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [`string`, `Value`] |

##### Returns

`CeloTransactionObject`\<`boolean`\>

true if success.

#### Defined in

[packages/sdk/contractkit/src/wrappers/StableTokenWrapper.ts:70](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/StableTokenWrapper.ts#L70)

___

### methodIds

• **methodIds**: `Record`\<``"symbol"`` \| ``"name"`` \| ``"decimals"`` \| ``"checkProofOfPossession"`` \| ``"fractionMulExp"`` \| ``"getBlockNumberFromHeader"`` \| ``"getEpochNumber"`` \| ``"getEpochNumberOfBlock"`` \| ``"getEpochSize"`` \| ``"getParentSealBitmap"`` \| ``"getVerifiedSealBitmapFromHeader"`` \| ``"hashHeader"`` \| ``"initialized"`` \| ``"isOwner"`` \| ``"minQuorumSize"`` \| ``"minQuorumSizeInCurrentSet"`` \| ``"numberValidatorsInCurrentSet"`` \| ``"numberValidatorsInSet"`` \| ``"owner"`` \| ``"registry"`` \| ``"renounceOwnership"`` \| ``"setRegistry"`` \| ``"transferOwnership"`` \| ``"validatorSignerAddressFromCurrentSet"`` \| ``"validatorSignerAddressFromSet"`` \| ``"getVersionNumber"`` \| ``"initialize"`` \| ``"approve"`` \| ``"transfer"`` \| ``"setInflationParameters"`` \| ``"increaseAllowance"`` \| ``"decreaseAllowance"`` \| ``"mint"`` \| ``"transferWithComment"`` \| ``"burn"`` \| ``"transferFrom"`` \| ``"allowance"`` \| ``"balanceOf"`` \| ``"totalSupply"`` \| ``"getInflationParameters"`` \| ``"valueToUnits"`` \| ``"getExchangeRegistryId"`` \| ``"unitsToValue"`` \| ``"debitGasFees"`` \| ``"creditGasFees"``, `string`\>

#### Inherited from

[CeloTokenWrapper](wrappers_CeloTokenWrapper.CeloTokenWrapper.md).[methodIds](wrappers_CeloTokenWrapper.CeloTokenWrapper.md#methodids)

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:68](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L68)

___

### mint

• **mint**: (...`args`: [to: string, value: string \| number]) => `CeloTransactionObject`\<`boolean`\>

#### Type declaration

▸ (`...args`): `CeloTransactionObject`\<`boolean`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [to: string, value: string \| number] |

##### Returns

`CeloTransactionObject`\<`boolean`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/StableTokenWrapper.ts:82](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/StableTokenWrapper.ts#L82)

___

### name

• **name**: (...`args`: []) => `Promise`\<`string`\>

Returns the name of the token.

#### Type declaration

▸ (`...args`): `Promise`\<`string`\>

Returns the name of the token.

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [] |

##### Returns

`Promise`\<`string`\>

Name of the token.

#### Inherited from

[CeloTokenWrapper](wrappers_CeloTokenWrapper.CeloTokenWrapper.md).[name](wrappers_CeloTokenWrapper.CeloTokenWrapper.md#name)

#### Defined in

[packages/sdk/contractkit/src/wrappers/CeloTokenWrapper.ts:18](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/CeloTokenWrapper.ts#L18)

___

### owner

• **owner**: (...`args`: []) => `Promise`\<`string`\>

Returns the address of the owner of the contract.

#### Type declaration

▸ (`...args`): `Promise`\<`string`\>

Returns the address of the owner of the contract.

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [] |

##### Returns

`Promise`\<`string`\>

the address of the owner of the contract.

#### Defined in

[packages/sdk/contractkit/src/wrappers/StableTokenWrapper.ts:38](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/StableTokenWrapper.ts#L38)

___

### setInflationParameters

• **setInflationParameters**: (...`args`: [rate: string \| number, updatePeriod: string \| number]) => `CeloTransactionObject`\<`void`\>

#### Type declaration

▸ (`...args`): `CeloTransactionObject`\<`void`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [rate: string \| number, updatePeriod: string \| number] |

##### Returns

`CeloTransactionObject`\<`void`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/StableTokenWrapper.ts:85](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/StableTokenWrapper.ts#L85)

___

### symbol

• **symbol**: (...`args`: []) => `Promise`\<`string`\>

Returns the three letter symbol of the token.

#### Type declaration

▸ (`...args`): `Promise`\<`string`\>

Returns the three letter symbol of the token.

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [] |

##### Returns

`Promise`\<`string`\>

Symbol of the token.

#### Inherited from

[CeloTokenWrapper](wrappers_CeloTokenWrapper.CeloTokenWrapper.md).[symbol](wrappers_CeloTokenWrapper.CeloTokenWrapper.md#symbol)

#### Defined in

[packages/sdk/contractkit/src/wrappers/CeloTokenWrapper.ts:24](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/CeloTokenWrapper.ts#L24)

___

### totalSupply

• **totalSupply**: (...`args`: []) => `Promise`\<`BigNumber`\>

Returns the total supply of the token, that is, the amount of tokens currently minted.

#### Type declaration

▸ (`...args`): `Promise`\<`BigNumber`\>

Returns the total supply of the token, that is, the amount of tokens currently minted.

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [] |

##### Returns

`Promise`\<`BigNumber`\>

Total supply.

#### Inherited from

[CeloTokenWrapper](wrappers_CeloTokenWrapper.CeloTokenWrapper.md).[totalSupply](wrappers_CeloTokenWrapper.CeloTokenWrapper.md#totalsupply)

#### Defined in

[packages/sdk/contractkit/src/wrappers/Erc20Wrapper.ts:24](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Erc20Wrapper.ts#L24)

___

### transfer

• **transfer**: (...`args`: [recipient: string, amount: string \| number]) => `CeloTransactionObject`\<`boolean`\>

Transfers the token from one address to another.

**`Param`**

The address to transfer the token to.

**`Param`**

The amount of the token to transfer.

#### Type declaration

▸ (`...args`): `CeloTransactionObject`\<`boolean`\>

Transfers the token from one address to another.

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [recipient: string, amount: string \| number] |

##### Returns

`CeloTransactionObject`\<`boolean`\>

True if the transaction succeeds.

#### Inherited from

[CeloTokenWrapper](wrappers_CeloTokenWrapper.CeloTokenWrapper.md).[transfer](wrappers_CeloTokenWrapper.CeloTokenWrapper.md#transfer)

#### Defined in

[packages/sdk/contractkit/src/wrappers/Erc20Wrapper.ts:40](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Erc20Wrapper.ts#L40)

___

### transferFrom

• **transferFrom**: (...`args`: [sender: string, recipient: string, amount: string \| number]) => `CeloTransactionObject`\<`boolean`\>

Transfers the token from one address to another on behalf of a user.

**`Param`**

The address to transfer the token from.

**`Param`**

The address to transfer the token to.

**`Param`**

The amount of the token to transfer.

#### Type declaration

▸ (`...args`): `CeloTransactionObject`\<`boolean`\>

Transfers the token from one address to another on behalf of a user.

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [sender: string, recipient: string, amount: string \| number] |

##### Returns

`CeloTransactionObject`\<`boolean`\>

True if the transaction succeeds.

#### Inherited from

[CeloTokenWrapper](wrappers_CeloTokenWrapper.CeloTokenWrapper.md).[transferFrom](wrappers_CeloTokenWrapper.CeloTokenWrapper.md#transferfrom)

#### Defined in

[packages/sdk/contractkit/src/wrappers/Erc20Wrapper.ts:49](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Erc20Wrapper.ts#L49)

___

### transferWithComment

• **transferWithComment**: (...`args`: [arg0: string, arg1: string \| number, arg2: string]) => `CeloTransactionObject`\<`boolean`\>

Transfers the token from one address to another with a comment.

**`Param`**

The address to transfer the token to.

**`Param`**

The amount of the token to transfer.

**`Param`**

The transfer comment

#### Type declaration

▸ (`...args`): `CeloTransactionObject`\<`boolean`\>

Transfers the token from one address to another with a comment.

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [arg0: string, arg1: string \| number, arg2: string] |

##### Returns

`CeloTransactionObject`\<`boolean`\>

True if the transaction succeeds.

#### Inherited from

[CeloTokenWrapper](wrappers_CeloTokenWrapper.CeloTokenWrapper.md).[transferWithComment](wrappers_CeloTokenWrapper.CeloTokenWrapper.md#transferwithcomment)

#### Defined in

[packages/sdk/contractkit/src/wrappers/CeloTokenWrapper.ts:38](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/CeloTokenWrapper.ts#L38)

___

### unitsToValue

• **unitsToValue**: (`units`: `Value`) => `Promise`\<`BigNumber`\>

Returns the value of a given number of units given the current inflation factor.

**`Param`**

The units to convert to value.

#### Type declaration

▸ (`units`): `Promise`\<`BigNumber`\>

Returns the value of a given number of units given the current inflation factor.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `units` | `Value` | The units to convert to value. |

##### Returns

`Promise`\<`BigNumber`\>

The value corresponding to `units` given the current inflation factor.

#### Defined in

[packages/sdk/contractkit/src/wrappers/StableTokenWrapper.ts:58](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/StableTokenWrapper.ts#L58)

___

### valueToUnits

• **valueToUnits**: (`value`: `Value`) => `Promise`\<`BigNumber`\>

Returns the units for a given value given the current inflation factor.

**`Param`**

The value to convert to units.

**`Dev`**

We don't compute the updated inflationFactor here because
we assume any function calling this will have updated the inflation factor.

#### Type declaration

▸ (`value`): `Promise`\<`BigNumber`\>

Returns the units for a given value given the current inflation factor.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `Value` | The value to convert to units. |

##### Returns

`Promise`\<`BigNumber`\>

The units corresponding to `value` given the current inflation factor.

**`Dev`**

We don't compute the updated inflationFactor here because
we assume any function calling this will have updated the inflation factor.

#### Defined in

[packages/sdk/contractkit/src/wrappers/StableTokenWrapper.ts:47](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/StableTokenWrapper.ts#L47)

## Accessors

### address

• `get` **address**(): `string`

Contract address

#### Returns

`string`

#### Inherited from

CeloTokenWrapper.address

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:37](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L37)

## Methods

### getConfig

▸ **getConfig**(): `Promise`\<[`StableTokenConfig`](../interfaces/wrappers_StableTokenWrapper.StableTokenConfig.md)\>

Returns current configuration parameters.

#### Returns

`Promise`\<[`StableTokenConfig`](../interfaces/wrappers_StableTokenWrapper.StableTokenConfig.md)\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/StableTokenWrapper.ts:104](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/StableTokenWrapper.ts#L104)

___

### getHumanReadableConfig

▸ **getHumanReadableConfig**(): `Promise`\<\{ `decimals`: `number` ; `inflationParameters`: \{ `factor`: `BigNumber` ; `factorLastUpdated`: `string` ; `rate`: `BigNumber` ; `updatePeriod`: `string`  } ; `name`: `string` ; `symbol`: `string`  }\>

#### Returns

`Promise`\<\{ `decimals`: `number` ; `inflationParameters`: \{ `factor`: `BigNumber` ; `factorLastUpdated`: `string` ; `rate`: `BigNumber` ; `updatePeriod`: `string`  } ; `name`: `string` ; `symbol`: `string`  }\>

StableTokenConfig object

**`Dev`**

Returns human readable configuration of the stabletoken contract

#### Defined in

[packages/sdk/contractkit/src/wrappers/StableTokenWrapper.ts:123](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/StableTokenWrapper.ts#L123)

___

### getInflationParameters

▸ **getInflationParameters**(): `Promise`\<[`InflationParameters`](../interfaces/wrappers_StableTokenWrapper.InflationParameters.md)\>

Querying the inflation parameters.

#### Returns

`Promise`\<[`InflationParameters`](../interfaces/wrappers_StableTokenWrapper.InflationParameters.md)\>

Inflation rate, inflation factor, inflation update period and the last time factor was updated.

#### Defined in

[packages/sdk/contractkit/src/wrappers/StableTokenWrapper.ts:91](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/StableTokenWrapper.ts#L91)

___

### getPastEvents

▸ **getPastEvents**(`event`, `options`): `Promise`\<`EventLog`[]\>

Contract getPastEvents

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"OwnershipTransferred"`` \| ``"RegistrySet"`` \| ``"allEvents"`` \| ``"Approval"`` \| ``"Transfer"`` \| ``"InflationFactorUpdated"`` \| ``"InflationParametersUpdated"`` \| ``"TransferComment"`` |
| `options` | `PastEventOptions` |

#### Returns

`Promise`\<`EventLog`[]\>

#### Inherited from

[CeloTokenWrapper](wrappers_CeloTokenWrapper.CeloTokenWrapper.md).[getPastEvents](wrappers_CeloTokenWrapper.CeloTokenWrapper.md#getpastevents)

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:57](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L57)

___

### version

▸ **version**(): `Promise`\<[`ContractVersion`](versions.ContractVersion.md)\>

#### Returns

`Promise`\<[`ContractVersion`](versions.ContractVersion.md)\>

#### Inherited from

[CeloTokenWrapper](wrappers_CeloTokenWrapper.CeloTokenWrapper.md).[version](wrappers_CeloTokenWrapper.CeloTokenWrapper.md#version)

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:41](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L41)
