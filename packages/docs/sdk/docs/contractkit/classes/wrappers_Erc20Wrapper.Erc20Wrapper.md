[@celo/contractkit](../README.md) / [Exports](../modules.md) / [wrappers/Erc20Wrapper](../modules/wrappers_Erc20Wrapper.md) / Erc20Wrapper

# Class: Erc20Wrapper\<T\>

[wrappers/Erc20Wrapper](../modules/wrappers_Erc20Wrapper.md).Erc20Wrapper

ERC-20 contract only containing the non-optional functions

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `IERC20` |

## Hierarchy

- [`BaseWrapper`](wrappers_BaseWrapper.BaseWrapper.md)\<`T`\>

  ↳ **`Erc20Wrapper`**

  ↳↳ [`CeloTokenWrapper`](wrappers_CeloTokenWrapper.CeloTokenWrapper.md)

## Table of contents

### Constructors

- [constructor](wrappers_Erc20Wrapper.Erc20Wrapper.md#constructor)

### Properties

- [allowance](wrappers_Erc20Wrapper.Erc20Wrapper.md#allowance)
- [approve](wrappers_Erc20Wrapper.Erc20Wrapper.md#approve)
- [balanceOf](wrappers_Erc20Wrapper.Erc20Wrapper.md#balanceof)
- [eventTypes](wrappers_Erc20Wrapper.Erc20Wrapper.md#eventtypes)
- [events](wrappers_Erc20Wrapper.Erc20Wrapper.md#events)
- [methodIds](wrappers_Erc20Wrapper.Erc20Wrapper.md#methodids)
- [totalSupply](wrappers_Erc20Wrapper.Erc20Wrapper.md#totalsupply)
- [transfer](wrappers_Erc20Wrapper.Erc20Wrapper.md#transfer)
- [transferFrom](wrappers_Erc20Wrapper.Erc20Wrapper.md#transferfrom)

### Accessors

- [address](wrappers_Erc20Wrapper.Erc20Wrapper.md#address)

### Methods

- [getPastEvents](wrappers_Erc20Wrapper.Erc20Wrapper.md#getpastevents)
- [version](wrappers_Erc20Wrapper.Erc20Wrapper.md#version)

## Constructors

### constructor

• **new Erc20Wrapper**\<`T`\>(`connection`, `contract`): [`Erc20Wrapper`](wrappers_Erc20Wrapper.Erc20Wrapper.md)\<`T`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `IERC20` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `connection` | `Connection` |
| `contract` | `T` |

#### Returns

[`Erc20Wrapper`](wrappers_Erc20Wrapper.Erc20Wrapper.md)\<`T`\>

#### Inherited from

[BaseWrapper](wrappers_BaseWrapper.BaseWrapper.md).[constructor](wrappers_BaseWrapper.BaseWrapper.md#constructor)

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

#### Defined in

[packages/sdk/contractkit/src/wrappers/Erc20Wrapper.ts:56](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Erc20Wrapper.ts#L56)

___

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

#### Defined in

[packages/sdk/contractkit/src/wrappers/Erc20Wrapper.ts:49](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Erc20Wrapper.ts#L49)

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
