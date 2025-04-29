[**@celo/contractkit**](../../../README.md)

***

[@celo/contractkit](../../../modules.md) / [wrappers/CeloTokenWrapper](../README.md) / CeloTokenWrapper

# Class: CeloTokenWrapper\<T\>

Defined in: [packages/sdk/contractkit/src/wrappers/CeloTokenWrapper.ts:13](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/CeloTokenWrapper.ts#L13)

Contract for Celo native currency that adheres to the ICeloToken and IERC20 interfaces.

## Extends

- [`Erc20Wrapper`](../../Erc20Wrapper/classes/Erc20Wrapper.md)\<`T`\>

## Extended by

- [`GoldTokenWrapper`](../../GoldTokenWrapper/classes/GoldTokenWrapper.md)
- [`StableTokenWrapper`](../../StableTokenWrapper/classes/StableTokenWrapper.md)

## Type Parameters

### T

`T` *extends* `IERC20` & `ICeloToken`

## Constructors

### Constructor

> **new CeloTokenWrapper**\<`T`\>(`connection`, `contract`): `CeloTokenWrapper`\<`T`\>

Defined in: [packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:34](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L34)

#### Parameters

##### connection

`Connection`

##### contract

`T`

#### Returns

`CeloTokenWrapper`\<`T`\>

#### Inherited from

[`Erc20Wrapper`](../../Erc20Wrapper/classes/Erc20Wrapper.md).[`constructor`](../../Erc20Wrapper/classes/Erc20Wrapper.md#constructor)

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

[`Erc20Wrapper`](../../Erc20Wrapper/classes/Erc20Wrapper.md).[`allowance`](../../Erc20Wrapper/classes/Erc20Wrapper.md#allowance)

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

[`Erc20Wrapper`](../../Erc20Wrapper/classes/Erc20Wrapper.md).[`approve`](../../Erc20Wrapper/classes/Erc20Wrapper.md#approve)

***

### balanceOf()

> **balanceOf**: (`owner`) => `Promise`\<`BigNumber`\>

Defined in: [packages/sdk/contractkit/src/wrappers/Erc20Wrapper.ts:56](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Erc20Wrapper.ts#L56)

Gets the balance of the specified address.

#### Parameters

##### owner

`string`

The address to query the balance of.

#### Returns

`Promise`\<`BigNumber`\>

The balance of the specified address.

#### Inherited from

[`Erc20Wrapper`](../../Erc20Wrapper/classes/Erc20Wrapper.md).[`balanceOf`](../../Erc20Wrapper/classes/Erc20Wrapper.md#balanceof)

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

***

### events

> **events**: `T`\[`"events"`\]

Defined in: [packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:61](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L61)

#### Inherited from

[`Erc20Wrapper`](../../Erc20Wrapper/classes/Erc20Wrapper.md).[`events`](../../Erc20Wrapper/classes/Erc20Wrapper.md#events)

***

### eventTypes

> **eventTypes**: `EventsEnum`\<`T`\>

Defined in: [packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:63](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L63)

#### Inherited from

[`Erc20Wrapper`](../../Erc20Wrapper/classes/Erc20Wrapper.md).[`eventTypes`](../../Erc20Wrapper/classes/Erc20Wrapper.md#eventtypes)

***

### methodIds

> **methodIds**: `Record`\<keyof `T`\[`"methods"`\], `string`\>

Defined in: [packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:68](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L68)

#### Inherited from

[`Erc20Wrapper`](../../Erc20Wrapper/classes/Erc20Wrapper.md).[`methodIds`](../../Erc20Wrapper/classes/Erc20Wrapper.md#methodids)

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

[`Erc20Wrapper`](../../Erc20Wrapper/classes/Erc20Wrapper.md).[`totalSupply`](../../Erc20Wrapper/classes/Erc20Wrapper.md#totalsupply)

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

[`Erc20Wrapper`](../../Erc20Wrapper/classes/Erc20Wrapper.md).[`transfer`](../../Erc20Wrapper/classes/Erc20Wrapper.md#transfer)

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

[`Erc20Wrapper`](../../Erc20Wrapper/classes/Erc20Wrapper.md).[`transferFrom`](../../Erc20Wrapper/classes/Erc20Wrapper.md#transferfrom)

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

## Accessors

### address

#### Get Signature

> **get** **address**(): `` `0x${string}` ``

Defined in: [packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:37](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L37)

Contract address

##### Returns

`` `0x${string}` ``

#### Inherited from

[`Erc20Wrapper`](../../Erc20Wrapper/classes/Erc20Wrapper.md).[`address`](../../Erc20Wrapper/classes/Erc20Wrapper.md#address)

## Methods

### getPastEvents()

> **getPastEvents**(`event`, `options`): `Promise`\<`EventLog`[]\>

Defined in: [packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:57](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L57)

Contract getPastEvents

#### Parameters

##### event

keyof `T`\[`"events"`\]

##### options

`PastEventOptions`

#### Returns

`Promise`\<`EventLog`[]\>

#### Inherited from

[`Erc20Wrapper`](../../Erc20Wrapper/classes/Erc20Wrapper.md).[`getPastEvents`](../../Erc20Wrapper/classes/Erc20Wrapper.md#getpastevents)

***

### version()

> **version**(): `Promise`\<`T`\[`"methods"`\] *extends* `object` ? [`ContractVersion`](../../../versions/classes/ContractVersion.md) : `never`\>

Defined in: [packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:41](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L41)

#### Returns

`Promise`\<`T`\[`"methods"`\] *extends* `object` ? [`ContractVersion`](../../../versions/classes/ContractVersion.md) : `never`\>

#### Inherited from

[`Erc20Wrapper`](../../Erc20Wrapper/classes/Erc20Wrapper.md).[`version`](../../Erc20Wrapper/classes/Erc20Wrapper.md#version)
