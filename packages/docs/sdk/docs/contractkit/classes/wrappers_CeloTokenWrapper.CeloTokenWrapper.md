[@celo/contractkit](../README.md) / [Exports](../modules.md) / [wrappers/CeloTokenWrapper](../modules/wrappers_CeloTokenWrapper.md) / CeloTokenWrapper

# Class: CeloTokenWrapper\<T\>

[wrappers/CeloTokenWrapper](../modules/wrappers_CeloTokenWrapper.md).CeloTokenWrapper

Contract for Celo native currency that adheres to the ICeloToken and IERC20 interfaces.

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `IERC20` & `ICeloToken` |

## Hierarchy

- [`Erc20Wrapper`](wrappers_Erc20Wrapper.Erc20Wrapper.md)\<`T`\>

  ↳ **`CeloTokenWrapper`**

  ↳↳ [`GoldTokenWrapper`](wrappers_GoldTokenWrapper.GoldTokenWrapper.md)

  ↳↳ [`StableTokenWrapper`](wrappers_StableTokenWrapper.StableTokenWrapper.md)

## Table of contents

### Constructors

- [constructor](wrappers_CeloTokenWrapper.CeloTokenWrapper.md#constructor)

### Properties

- [allowance](wrappers_CeloTokenWrapper.CeloTokenWrapper.md#allowance)
- [approve](wrappers_CeloTokenWrapper.CeloTokenWrapper.md#approve)
- [balanceOf](wrappers_CeloTokenWrapper.CeloTokenWrapper.md#balanceof)
- [decimals](wrappers_CeloTokenWrapper.CeloTokenWrapper.md#decimals)
- [eventTypes](wrappers_CeloTokenWrapper.CeloTokenWrapper.md#eventtypes)
- [events](wrappers_CeloTokenWrapper.CeloTokenWrapper.md#events)
- [methodIds](wrappers_CeloTokenWrapper.CeloTokenWrapper.md#methodids)
- [name](wrappers_CeloTokenWrapper.CeloTokenWrapper.md#name)
- [symbol](wrappers_CeloTokenWrapper.CeloTokenWrapper.md#symbol)
- [totalSupply](wrappers_CeloTokenWrapper.CeloTokenWrapper.md#totalsupply)
- [transfer](wrappers_CeloTokenWrapper.CeloTokenWrapper.md#transfer)
- [transferFrom](wrappers_CeloTokenWrapper.CeloTokenWrapper.md#transferfrom)
- [transferWithComment](wrappers_CeloTokenWrapper.CeloTokenWrapper.md#transferwithcomment)

### Accessors

- [address](wrappers_CeloTokenWrapper.CeloTokenWrapper.md#address)

### Methods

- [getPastEvents](wrappers_CeloTokenWrapper.CeloTokenWrapper.md#getpastevents)
- [version](wrappers_CeloTokenWrapper.CeloTokenWrapper.md#version)

## Constructors

### constructor

• **new CeloTokenWrapper**\<`T`\>(`connection`, `contract`): [`CeloTokenWrapper`](wrappers_CeloTokenWrapper.CeloTokenWrapper.md)\<`T`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `IERC20` & `ICeloToken` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `connection` | `Connection` |
| `contract` | `T` |

#### Returns

[`CeloTokenWrapper`](wrappers_CeloTokenWrapper.CeloTokenWrapper.md)\<`T`\>

#### Inherited from

[Erc20Wrapper](wrappers_Erc20Wrapper.Erc20Wrapper.md).[constructor](wrappers_Erc20Wrapper.Erc20Wrapper.md#constructor)

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

[Erc20Wrapper](wrappers_Erc20Wrapper.Erc20Wrapper.md).[allowance](wrappers_Erc20Wrapper.Erc20Wrapper.md#allowance)

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

[Erc20Wrapper](wrappers_Erc20Wrapper.Erc20Wrapper.md).[approve](wrappers_Erc20Wrapper.Erc20Wrapper.md#approve)

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

[Erc20Wrapper](wrappers_Erc20Wrapper.Erc20Wrapper.md).[balanceOf](wrappers_Erc20Wrapper.Erc20Wrapper.md#balanceof)

#### Defined in

[packages/sdk/contractkit/src/wrappers/Erc20Wrapper.ts:56](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Erc20Wrapper.ts#L56)

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

#### Defined in

[packages/sdk/contractkit/src/wrappers/CeloTokenWrapper.ts:29](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/CeloTokenWrapper.ts#L29)

___

### eventTypes

• **eventTypes**: `EventsEnum`\<`T`\>

#### Inherited from

[Erc20Wrapper](wrappers_Erc20Wrapper.Erc20Wrapper.md).[eventTypes](wrappers_Erc20Wrapper.Erc20Wrapper.md#eventtypes)

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:63](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L63)

___

### events

• **events**: `T`[``"events"``]

#### Inherited from

[Erc20Wrapper](wrappers_Erc20Wrapper.Erc20Wrapper.md).[events](wrappers_Erc20Wrapper.Erc20Wrapper.md#events)

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:61](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L61)

___

### methodIds

• **methodIds**: `Record`\<keyof `T`[``"methods"``], `string`\>

#### Inherited from

[Erc20Wrapper](wrappers_Erc20Wrapper.Erc20Wrapper.md).[methodIds](wrappers_Erc20Wrapper.Erc20Wrapper.md#methodids)

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:68](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L68)

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

#### Defined in

[packages/sdk/contractkit/src/wrappers/CeloTokenWrapper.ts:18](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/CeloTokenWrapper.ts#L18)

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

[Erc20Wrapper](wrappers_Erc20Wrapper.Erc20Wrapper.md).[totalSupply](wrappers_Erc20Wrapper.Erc20Wrapper.md#totalsupply)

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

[Erc20Wrapper](wrappers_Erc20Wrapper.Erc20Wrapper.md).[transfer](wrappers_Erc20Wrapper.Erc20Wrapper.md#transfer)

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

[Erc20Wrapper](wrappers_Erc20Wrapper.Erc20Wrapper.md).[transferFrom](wrappers_Erc20Wrapper.Erc20Wrapper.md#transferfrom)

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

#### Defined in

[packages/sdk/contractkit/src/wrappers/CeloTokenWrapper.ts:38](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/CeloTokenWrapper.ts#L38)

## Accessors

### address

• `get` **address**(): `string`

Contract address

#### Returns

`string`

#### Inherited from

Erc20Wrapper.address

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

[Erc20Wrapper](wrappers_Erc20Wrapper.Erc20Wrapper.md).[getPastEvents](wrappers_Erc20Wrapper.Erc20Wrapper.md#getpastevents)

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:57](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L57)

___

### version

▸ **version**(): `Promise`\<`T`[``"methods"``] extends \{ `getVersionNumber`: () => `CeloTxObject`\<\{ `0`: `string` ; `1`: `string` ; `2`: `string` ; `3`: `string`  }\>  } ? [`ContractVersion`](versions.ContractVersion.md) : `never`\>

#### Returns

`Promise`\<`T`[``"methods"``] extends \{ `getVersionNumber`: () => `CeloTxObject`\<\{ `0`: `string` ; `1`: `string` ; `2`: `string` ; `3`: `string`  }\>  } ? [`ContractVersion`](versions.ContractVersion.md) : `never`\>

#### Inherited from

[Erc20Wrapper](wrappers_Erc20Wrapper.Erc20Wrapper.md).[version](wrappers_Erc20Wrapper.Erc20Wrapper.md#version)

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:41](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L41)
