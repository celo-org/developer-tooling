[**@celo/contractkit**](../../../README.md)

***

[@celo/contractkit](../../../modules.md) / [wrappers/StableTokenWrapper](../README.md) / StableTokenWrapper

# Class: StableTokenWrapper

Defined in: [packages/sdk/contractkit/src/wrappers/StableTokenWrapper.ts:14](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/StableTokenWrapper.ts#L14)

Stable token with variable supply

## Extends

- [`CeloTokenWrapper`](../../CeloTokenWrapper/classes/CeloTokenWrapper.md)\<`StableToken`\>

## Constructors

### Constructor

> **new StableTokenWrapper**(`connection`, `contract`): `StableTokenWrapper`

Defined in: [packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:34](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L34)

#### Parameters

##### connection

`Connection`

##### contract

`StableToken`

#### Returns

`StableTokenWrapper`

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

[`CeloTokenWrapper`](../../CeloTokenWrapper/classes/CeloTokenWrapper.md).[`balanceOf`](../../CeloTokenWrapper/classes/CeloTokenWrapper.md#balanceof)

***

### burn()

> **burn**: (...`args`) => `CeloTransactionObject`\<`boolean`\>

Defined in: [packages/sdk/contractkit/src/wrappers/StableTokenWrapper.ts:40](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/StableTokenWrapper.ts#L40)

#### Parameters

##### args

...\[`string` \| `number`\]

#### Returns

`CeloTransactionObject`\<`boolean`\>

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

Defined in: [packages/sdk/contractkit/src/wrappers/StableTokenWrapper.ts:38](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/StableTokenWrapper.ts#L38)

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

#### InflationFactorUpdated

> **InflationFactorUpdated**: `ContractEvent`\<\{ `0`: `string`; `1`: `string`; `factor`: `string`; `lastUpdated`: `string`; \}\>

#### InflationParametersUpdated

> **InflationParametersUpdated**: `ContractEvent`\<\{ `0`: `string`; `1`: `string`; `2`: `string`; `lastUpdated`: `string`; `rate`: `string`; `updatePeriod`: `string`; \}\>

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

> **eventTypes**: `EventsEnum`\<`StableToken`\>

Defined in: [packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:63](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L63)

#### Inherited from

[`CeloTokenWrapper`](../../CeloTokenWrapper/classes/CeloTokenWrapper.md).[`eventTypes`](../../CeloTokenWrapper/classes/CeloTokenWrapper.md#eventtypes)

***

### increaseAllowance()

> **increaseAllowance**: (...`args`) => `CeloTransactionObject`\<`boolean`\>

Defined in: [packages/sdk/contractkit/src/wrappers/StableTokenWrapper.ts:27](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/StableTokenWrapper.ts#L27)

Increases the allowance of another user.

#### Parameters

##### args

...\[`string`, `Value`\]

#### Returns

`CeloTransactionObject`\<`boolean`\>

true if success.

***

### methodIds

> **methodIds**: `Record`\<`"symbol"` \| `"name"` \| `"decimals"` \| `"checkProofOfPossession"` \| `"fractionMulExp"` \| `"getBlockNumberFromHeader"` \| `"getEpochNumber"` \| `"getEpochNumberOfBlock"` \| `"getEpochSize"` \| `"getParentSealBitmap"` \| `"getVerifiedSealBitmapFromHeader"` \| `"hashHeader"` \| `"initialized"` \| `"isOwner"` \| `"minQuorumSize"` \| `"minQuorumSizeInCurrentSet"` \| `"numberValidatorsInCurrentSet"` \| `"numberValidatorsInSet"` \| `"owner"` \| `"registry"` \| `"renounceOwnership"` \| `"setRegistry"` \| `"transferOwnership"` \| `"validatorSignerAddressFromCurrentSet"` \| `"validatorSignerAddressFromSet"` \| `"initialize"` \| `"approve"` \| `"getVersionNumber"` \| `"transfer"` \| `"setInflationParameters"` \| `"increaseAllowance"` \| `"decreaseAllowance"` \| `"mint"` \| `"transferWithComment"` \| `"burn"` \| `"transferFrom"` \| `"allowance"` \| `"balanceOf"` \| `"totalSupply"` \| `"getInflationParameters"` \| `"valueToUnits"` \| `"getExchangeRegistryId"` \| `"unitsToValue"` \| `"debitGasFees"` \| `"creditGasFees"`, `string`\>

Defined in: [packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:68](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L68)

#### Inherited from

[`CeloTokenWrapper`](../../CeloTokenWrapper/classes/CeloTokenWrapper.md).[`methodIds`](../../CeloTokenWrapper/classes/CeloTokenWrapper.md#methodids)

***

### mint()

> **mint**: (...`args`) => `CeloTransactionObject`\<`boolean`\>

Defined in: [packages/sdk/contractkit/src/wrappers/StableTokenWrapper.ts:39](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/StableTokenWrapper.ts#L39)

#### Parameters

##### args

...\[`string`, `string` \| `number`\]

#### Returns

`CeloTransactionObject`\<`boolean`\>

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

### owner()

> **owner**: (...`args`) => `Promise`\<`string`\>

Defined in: [packages/sdk/contractkit/src/wrappers/StableTokenWrapper.ts:19](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/StableTokenWrapper.ts#L19)

Returns the address of the owner of the contract.

#### Parameters

##### args

...\[\]

#### Returns

`Promise`\<`string`\>

the address of the owner of the contract.

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

### getConfig()

> **getConfig**(): `Promise`\<[`StableTokenConfig`](../interfaces/StableTokenConfig.md)\>

Defined in: [packages/sdk/contractkit/src/wrappers/StableTokenWrapper.ts:45](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/StableTokenWrapper.ts#L45)

Returns current configuration parameters.

#### Returns

`Promise`\<[`StableTokenConfig`](../interfaces/StableTokenConfig.md)\>

***

### getHumanReadableConfig()

> **getHumanReadableConfig**(): `Promise`\<[`StableTokenConfig`](../interfaces/StableTokenConfig.md)\>

Defined in: [packages/sdk/contractkit/src/wrappers/StableTokenWrapper.ts:58](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/StableTokenWrapper.ts#L58)

#### Returns

`Promise`\<[`StableTokenConfig`](../interfaces/StableTokenConfig.md)\>

StableTokenConfig object

#### Dev

Returns human readable configuration of the stabletoken contract

***

### getPastEvents()

> **getPastEvents**(`event`, `options`): `Promise`\<`EventLog`[]\>

Defined in: [packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:57](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L57)

Contract getPastEvents

#### Parameters

##### event

`"OwnershipTransferred"` | `"RegistrySet"` | `"allEvents"` | `"Approval"` | `"Transfer"` | `"InflationFactorUpdated"` | `"InflationParametersUpdated"` | `"TransferComment"`

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
