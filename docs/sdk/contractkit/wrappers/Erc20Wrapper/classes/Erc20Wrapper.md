[**@celo/contractkit**](../../../README.md)

***

[@celo/contractkit](../../../modules.md) / [wrappers/Erc20Wrapper](../README.md) / Erc20Wrapper

# Class: Erc20Wrapper\<T\>

Defined in: [packages/sdk/contractkit/src/wrappers/Erc20Wrapper.ts:11](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Erc20Wrapper.ts#L11)

ERC-20 contract only containing the non-optional functions

## Extends

- [`BaseWrapper`](../../BaseWrapper/classes/BaseWrapper.md)\<`T`\>

## Extended by

- [`CeloTokenWrapper`](../../CeloTokenWrapper/classes/CeloTokenWrapper.md)

## Type Parameters

### T

`T` *extends* `IERC20`

## Constructors

### Constructor

> **new Erc20Wrapper**\<`T`\>(`connection`, `contract`): `Erc20Wrapper`\<`T`\>

Defined in: [packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:34](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L34)

#### Parameters

##### connection

`Connection`

##### contract

`T`

#### Returns

`Erc20Wrapper`\<`T`\>

#### Inherited from

[`BaseWrapper`](../../BaseWrapper/classes/BaseWrapper.md).[`constructor`](../../BaseWrapper/classes/BaseWrapper.md#constructor)

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

***

### events

> **events**: `T`\[`"events"`\]

Defined in: [packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:61](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L61)

#### Inherited from

[`BaseWrapper`](../../BaseWrapper/classes/BaseWrapper.md).[`events`](../../BaseWrapper/classes/BaseWrapper.md#events)

***

### eventTypes

> **eventTypes**: `EventsEnum`\<`T`\>

Defined in: [packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:63](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L63)

#### Inherited from

[`BaseWrapper`](../../BaseWrapper/classes/BaseWrapper.md).[`eventTypes`](../../BaseWrapper/classes/BaseWrapper.md#eventtypes)

***

### methodIds

> **methodIds**: `Record`\<keyof `T`\[`"methods"`\], `string`\>

Defined in: [packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:68](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L68)

#### Inherited from

[`BaseWrapper`](../../BaseWrapper/classes/BaseWrapper.md).[`methodIds`](../../BaseWrapper/classes/BaseWrapper.md#methodids)

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

[`BaseWrapper`](../../BaseWrapper/classes/BaseWrapper.md).[`getPastEvents`](../../BaseWrapper/classes/BaseWrapper.md#getpastevents)

***

### version()

> **version**(): `Promise`\<`T`\[`"methods"`\] *extends* `object` ? [`ContractVersion`](../../../versions/classes/ContractVersion.md) : `never`\>

Defined in: [packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:41](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L41)

#### Returns

`Promise`\<`T`\[`"methods"`\] *extends* `object` ? [`ContractVersion`](../../../versions/classes/ContractVersion.md) : `never`\>

#### Inherited from

[`BaseWrapper`](../../BaseWrapper/classes/BaseWrapper.md).[`version`](../../BaseWrapper/classes/BaseWrapper.md#version)
