[**@celo/contractkit**](../../../README.md)

***

[@celo/contractkit](../../../modules.md) / [wrappers/GoldTokenWrapper](../README.md) / GoldTokenWrapper

# Class: GoldTokenWrapper

Defined in: [packages/sdk/contractkit/src/wrappers/GoldTokenWrapper.ts:19](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/GoldTokenWrapper.ts#L19)

ERC-20 contract for Celo native currency.

## Extends

- [`CeloTokenWrapper`](../../CeloTokenWrapper/classes/CeloTokenWrapper.md)\<`GoldToken`\>

## Constructors

### Constructor

> **new GoldTokenWrapper**(`connection`, `contract`): `GoldTokenWrapper`

Defined in: [packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:34](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L34)

#### Parameters

##### connection

`Connection`

##### contract

`GoldToken`

#### Returns

`GoldTokenWrapper`

#### Inherited from

[`CeloTokenWrapper`](../../CeloTokenWrapper/classes/CeloTokenWrapper.md).[`constructor`](../../CeloTokenWrapper/classes/CeloTokenWrapper.md#constructor)

## Properties

### allowance()

> **allowance**: (...`args`) => `Promise`\<`BigNumber`\>

Defined in: [packages/sdk/contractkit/src/wrappers/Erc20Wrapper.ts:18](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Erc20Wrapper.ts#L18)

Querying allowance.

#### Parameters

##### args

...\[`string`, `string`\]

#### Returns

`Promise`\<`BigNumber`\>

Amount of allowance.

#### Inherited from

[`CeloTokenWrapper`](../../CeloTokenWrapper/classes/CeloTokenWrapper.md).[`allowance`](../../CeloTokenWrapper/classes/CeloTokenWrapper.md#allowance)

***

### approve()

> **approve**: (...`args`) => `CeloTransactionObject`\<`boolean`\>

Defined in: [packages/sdk/contractkit/src/wrappers/Erc20Wrapper.ts:32](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Erc20Wrapper.ts#L32)

Approve a user to transfer the token on behalf of another user.

#### Parameters

##### args

...\[`string`, `string` \| `number`\]

#### Returns

`CeloTransactionObject`\<`boolean`\>

True if the transaction succeeds.

#### Inherited from

[`CeloTokenWrapper`](../../CeloTokenWrapper/classes/CeloTokenWrapper.md).[`approve`](../../CeloTokenWrapper/classes/CeloTokenWrapper.md#approve)

***

### decimals()

> **decimals**: (...`args`) => `Promise`\<`number`\>

Defined in: [packages/sdk/contractkit/src/wrappers/CeloTokenWrapper.ts:29](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/CeloTokenWrapper.ts#L29)

Returns the number of decimals used in the token.

#### Parameters

##### args

...\[\]

#### Returns

`Promise`\<`number`\>

Number of decimals.

#### Inherited from

[`CeloTokenWrapper`](../../CeloTokenWrapper/classes/CeloTokenWrapper.md).[`decimals`](../../CeloTokenWrapper/classes/CeloTokenWrapper.md#decimals)

***

### decreaseAllowance()

> **decreaseAllowance**: (...`args`) => `CeloTransactionObject`\<`boolean`\>

Defined in: [packages/sdk/contractkit/src/wrappers/GoldTokenWrapper.ts:37](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/GoldTokenWrapper.ts#L37)

Decreases the allowance of another user.

#### Parameters

##### args

...\[`string`, `string` \| `number`\]

#### Returns

`CeloTransactionObject`\<`boolean`\>

true if success.

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

#### Approval

> **Approval**: `ContractEvent`\<\{ `0`: `string`; `1`: `string`; `2`: `string`; `owner`: `string`; `spender`: `string`; `value`: `string`; \}\>

#### OwnershipTransferred

> **OwnershipTransferred**: `ContractEvent`\<\{ `0`: `string`; `1`: `string`; `newOwner`: `string`; `previousOwner`: `string`; \}\>

#### RegistrySet

> **RegistrySet**: `ContractEvent`\<`string`\>

#### Transfer

> **Transfer**: `ContractEvent`\<\{ `0`: `string`; `1`: `string`; `2`: `string`; `from`: `string`; `to`: `string`; `value`: `string`; \}\>

#### TransferComment

> **TransferComment**: `ContractEvent`\<`string`\>

#### Inherited from

[`CeloTokenWrapper`](../../CeloTokenWrapper/classes/CeloTokenWrapper.md).[`events`](../../CeloTokenWrapper/classes/CeloTokenWrapper.md#events)

***

### eventTypes

> **eventTypes**: `EventsEnum`\<`GoldToken`\>

Defined in: [packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:63](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L63)

#### Inherited from

[`CeloTokenWrapper`](../../CeloTokenWrapper/classes/CeloTokenWrapper.md).[`eventTypes`](../../CeloTokenWrapper/classes/CeloTokenWrapper.md#eventtypes)

***

### increaseAllowance()

> **increaseAllowance**: (...`args`) => `CeloTransactionObject`\<`boolean`\>

Defined in: [packages/sdk/contractkit/src/wrappers/GoldTokenWrapper.ts:26](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/GoldTokenWrapper.ts#L26)

Increases the allowance of another user.

#### Parameters

##### args

...\[`string`, `Value`\]

#### Returns

`CeloTransactionObject`\<`boolean`\>

true if success.

***

### methodIds

> **methodIds**: `Record`\<`"symbol"` \| `"name"` \| `"decimals"` \| `"initialized"` \| `"isOwner"` \| `"owner"` \| `"registry"` \| `"renounceOwnership"` \| `"setRegistry"` \| `"transferOwnership"` \| `"initialize"` \| `"approve"` \| `"getVersionNumber"` \| `"transfer"` \| `"increaseAllowance"` \| `"decreaseAllowance"` \| `"mint"` \| `"transferWithComment"` \| `"burn"` \| `"transferFrom"` \| `"allowance"` \| `"balanceOf"` \| `"totalSupply"` \| `"increaseSupply"` \| `"circulatingSupply"` \| `"getBurnedAmount"` \| `"allocatedSupply"`, `string`\>

Defined in: [packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:68](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L68)

#### Inherited from

[`CeloTokenWrapper`](../../CeloTokenWrapper/classes/CeloTokenWrapper.md).[`methodIds`](../../CeloTokenWrapper/classes/CeloTokenWrapper.md#methodids)

***

### name()

> **name**: (...`args`) => `Promise`\<`string`\>

Defined in: [packages/sdk/contractkit/src/wrappers/CeloTokenWrapper.ts:18](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/CeloTokenWrapper.ts#L18)

Returns the name of the token.

#### Parameters

##### args

...\[\]

#### Returns

`Promise`\<`string`\>

Name of the token.

#### Inherited from

[`CeloTokenWrapper`](../../CeloTokenWrapper/classes/CeloTokenWrapper.md).[`name`](../../CeloTokenWrapper/classes/CeloTokenWrapper.md#name)

***

### symbol()

> **symbol**: (...`args`) => `Promise`\<`string`\>

Defined in: [packages/sdk/contractkit/src/wrappers/CeloTokenWrapper.ts:24](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/CeloTokenWrapper.ts#L24)

Returns the three letter symbol of the token.

#### Parameters

##### args

...\[\]

#### Returns

`Promise`\<`string`\>

Symbol of the token.

#### Inherited from

[`CeloTokenWrapper`](../../CeloTokenWrapper/classes/CeloTokenWrapper.md).[`symbol`](../../CeloTokenWrapper/classes/CeloTokenWrapper.md#symbol)

***

### totalSupply()

> **totalSupply**: (...`args`) => `Promise`\<`BigNumber`\>

Defined in: [packages/sdk/contractkit/src/wrappers/Erc20Wrapper.ts:24](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Erc20Wrapper.ts#L24)

Returns the total supply of the token, that is, the amount of tokens currently minted.

#### Parameters

##### args

...\[\]

#### Returns

`Promise`\<`BigNumber`\>

Total supply.

#### Inherited from

[`CeloTokenWrapper`](../../CeloTokenWrapper/classes/CeloTokenWrapper.md).[`totalSupply`](../../CeloTokenWrapper/classes/CeloTokenWrapper.md#totalsupply)

***

### transfer()

> **transfer**: (...`args`) => `CeloTransactionObject`\<`boolean`\>

Defined in: [packages/sdk/contractkit/src/wrappers/Erc20Wrapper.ts:40](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Erc20Wrapper.ts#L40)

Transfers the token from one address to another.

#### Parameters

##### args

...\[`string`, `string` \| `number`\]

#### Returns

`CeloTransactionObject`\<`boolean`\>

True if the transaction succeeds.

#### Inherited from

[`CeloTokenWrapper`](../../CeloTokenWrapper/classes/CeloTokenWrapper.md).[`transfer`](../../CeloTokenWrapper/classes/CeloTokenWrapper.md#transfer)

***

### transferFrom()

> **transferFrom**: (...`args`) => `CeloTransactionObject`\<`boolean`\>

Defined in: [packages/sdk/contractkit/src/wrappers/Erc20Wrapper.ts:49](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Erc20Wrapper.ts#L49)

Transfers the token from one address to another on behalf of a user.

#### Parameters

##### args

...\[`string`, `string`, `string` \| `number`\]

#### Returns

`CeloTransactionObject`\<`boolean`\>

True if the transaction succeeds.

#### Inherited from

[`CeloTokenWrapper`](../../CeloTokenWrapper/classes/CeloTokenWrapper.md).[`transferFrom`](../../CeloTokenWrapper/classes/CeloTokenWrapper.md#transferfrom)

***

### transferWithComment()

> **transferWithComment**: (...`args`) => `CeloTransactionObject`\<`boolean`\>

Defined in: [packages/sdk/contractkit/src/wrappers/CeloTokenWrapper.ts:38](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/CeloTokenWrapper.ts#L38)

Transfers the token from one address to another with a comment.

#### Parameters

##### args

...\[`string`, `string` \| `number`, `string`\]

#### Returns

`CeloTransactionObject`\<`boolean`\>

True if the transaction succeeds.

#### Inherited from

[`CeloTokenWrapper`](../../CeloTokenWrapper/classes/CeloTokenWrapper.md).[`transferWithComment`](../../CeloTokenWrapper/classes/CeloTokenWrapper.md#transferwithcomment)

## Accessors

### address

#### Get Signature

> **get** **address**(): `` `0x${string}` ``

Defined in: [packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:37](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L37)

Contract address

##### Returns

`` `0x${string}` ``

#### Inherited from

[`CeloTokenWrapper`](../../CeloTokenWrapper/classes/CeloTokenWrapper.md).[`address`](../../CeloTokenWrapper/classes/CeloTokenWrapper.md#address)

## Methods

### balanceOf()

> **balanceOf**(`account`): `Promise`\<`BigNumber`\>

Defined in: [packages/sdk/contractkit/src/wrappers/GoldTokenWrapper.ts:47](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/GoldTokenWrapper.ts#L47)

Gets the balance of the specified address.

#### Parameters

##### account

`string`

#### Returns

`Promise`\<`BigNumber`\>

The balance of the specified address.

#### Overrides

`CeloTokenWrapper.balanceOf`

***

### getPastEvents()

> **getPastEvents**(`event`, `options`): `Promise`\<`EventLog`[]\>

Defined in: [packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:57](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L57)

Contract getPastEvents

#### Parameters

##### event

`"OwnershipTransferred"` | `"RegistrySet"` | `"allEvents"` | `"Approval"` | `"Transfer"` | `"TransferComment"`

##### options

`PastEventOptions`

#### Returns

`Promise`\<`EventLog`[]\>

#### Inherited from

[`CeloTokenWrapper`](../../CeloTokenWrapper/classes/CeloTokenWrapper.md).[`getPastEvents`](../../CeloTokenWrapper/classes/CeloTokenWrapper.md#getpastevents)

***

### version()

> **version**(): `Promise`\<[`ContractVersion`](../../../versions/classes/ContractVersion.md)\>

Defined in: [packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:41](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L41)

#### Returns

`Promise`\<[`ContractVersion`](../../../versions/classes/ContractVersion.md)\>

#### Inherited from

[`CeloTokenWrapper`](../../CeloTokenWrapper/classes/CeloTokenWrapper.md).[`version`](../../CeloTokenWrapper/classes/CeloTokenWrapper.md#version)
