[@celo/contractkit](../README.md) / [Exports](../modules.md) / [wrappers/GoldTokenWrapper](../modules/wrappers_GoldTokenWrapper.md) / GoldTokenWrapper

# Class: GoldTokenWrapper

[wrappers/GoldTokenWrapper](../modules/wrappers_GoldTokenWrapper.md).GoldTokenWrapper

ERC-20 contract for Celo native currency.

## Hierarchy

- [`CeloTokenWrapper`](wrappers_CeloTokenWrapper.CeloTokenWrapper.md)\<`GoldToken`\>

  ↳ **`GoldTokenWrapper`**

## Table of contents

### Constructors

- [constructor](wrappers_GoldTokenWrapper.GoldTokenWrapper.md#constructor)

### Properties

- [allowance](wrappers_GoldTokenWrapper.GoldTokenWrapper.md#allowance)
- [approve](wrappers_GoldTokenWrapper.GoldTokenWrapper.md#approve)
- [decimals](wrappers_GoldTokenWrapper.GoldTokenWrapper.md#decimals)
- [decreaseAllowance](wrappers_GoldTokenWrapper.GoldTokenWrapper.md#decreaseallowance)
- [eventTypes](wrappers_GoldTokenWrapper.GoldTokenWrapper.md#eventtypes)
- [events](wrappers_GoldTokenWrapper.GoldTokenWrapper.md#events)
- [increaseAllowance](wrappers_GoldTokenWrapper.GoldTokenWrapper.md#increaseallowance)
- [methodIds](wrappers_GoldTokenWrapper.GoldTokenWrapper.md#methodids)
- [name](wrappers_GoldTokenWrapper.GoldTokenWrapper.md#name)
- [symbol](wrappers_GoldTokenWrapper.GoldTokenWrapper.md#symbol)
- [totalSupply](wrappers_GoldTokenWrapper.GoldTokenWrapper.md#totalsupply)
- [transfer](wrappers_GoldTokenWrapper.GoldTokenWrapper.md#transfer)
- [transferFrom](wrappers_GoldTokenWrapper.GoldTokenWrapper.md#transferfrom)
- [transferWithComment](wrappers_GoldTokenWrapper.GoldTokenWrapper.md#transferwithcomment)

### Accessors

- [address](wrappers_GoldTokenWrapper.GoldTokenWrapper.md#address)

### Methods

- [balanceOf](wrappers_GoldTokenWrapper.GoldTokenWrapper.md#balanceof)
- [getPastEvents](wrappers_GoldTokenWrapper.GoldTokenWrapper.md#getpastevents)
- [version](wrappers_GoldTokenWrapper.GoldTokenWrapper.md#version)

## Constructors

### constructor

• **new GoldTokenWrapper**(`connection`, `contract`): [`GoldTokenWrapper`](wrappers_GoldTokenWrapper.GoldTokenWrapper.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `connection` | `Connection` |
| `contract` | `GoldToken` |

#### Returns

[`GoldTokenWrapper`](wrappers_GoldTokenWrapper.GoldTokenWrapper.md)

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

The address which is being approved to spend CELO.

**`Param`**

The decrement of the amount of CELO approved to the spender.

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

[packages/sdk/contractkit/src/wrappers/GoldTokenWrapper.ts:37](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/GoldTokenWrapper.ts#L37)

___

### eventTypes

• **eventTypes**: `EventsEnum`\<`GoldToken`\>

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

The address which is being approved to spend CELO.

**`Param`**

The increment of the amount of CELO approved to the spender.

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

[packages/sdk/contractkit/src/wrappers/GoldTokenWrapper.ts:26](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/GoldTokenWrapper.ts#L26)

___

### methodIds

• **methodIds**: `Record`\<``"symbol"`` \| ``"name"`` \| ``"decimals"`` \| ``"initialized"`` \| ``"isOwner"`` \| ``"owner"`` \| ``"registry"`` \| ``"renounceOwnership"`` \| ``"setRegistry"`` \| ``"transferOwnership"`` \| ``"getVersionNumber"`` \| ``"initialize"`` \| ``"approve"`` \| ``"transfer"`` \| ``"increaseAllowance"`` \| ``"decreaseAllowance"`` \| ``"mint"`` \| ``"transferWithComment"`` \| ``"burn"`` \| ``"transferFrom"`` \| ``"allowance"`` \| ``"balanceOf"`` \| ``"totalSupply"`` \| ``"circulatingSupply"`` \| ``"increaseSupply"`` \| ``"getBurnedAmount"``, `string`\>

#### Inherited from

[CeloTokenWrapper](wrappers_CeloTokenWrapper.CeloTokenWrapper.md).[methodIds](wrappers_CeloTokenWrapper.CeloTokenWrapper.md#methodids)

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

#### Inherited from

[CeloTokenWrapper](wrappers_CeloTokenWrapper.CeloTokenWrapper.md).[name](wrappers_CeloTokenWrapper.CeloTokenWrapper.md#name)

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

## Accessors

### address

• `get` **address**(): \`0x$\{string}\`

Contract address

#### Returns

\`0x$\{string}\`

#### Inherited from

CeloTokenWrapper.address

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:37](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L37)

## Methods

### balanceOf

▸ **balanceOf**(`account`): `Promise`\<`BigNumber`\>

Gets the balance of the specified address.
WARNING: The actual call to the Gold contract of the balanceOf:
`balanceOf = proxyCall(this.contract.methods.balanceOf, undefined, valueToBigNumber)`
has issues with web3. Keep the one calling getBalance

#### Parameters

| Name | Type |
| :------ | :------ |
| `account` | `string` |

#### Returns

`Promise`\<`BigNumber`\>

The balance of the specified address.

#### Overrides

CeloTokenWrapper.balanceOf

#### Defined in

[packages/sdk/contractkit/src/wrappers/GoldTokenWrapper.ts:47](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/GoldTokenWrapper.ts#L47)

___

### getPastEvents

▸ **getPastEvents**(`event`, `options`): `Promise`\<`EventLog`[]\>

Contract getPastEvents

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"OwnershipTransferred"`` \| ``"RegistrySet"`` \| ``"allEvents"`` \| ``"Approval"`` \| ``"Transfer"`` \| ``"TransferComment"`` |
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
