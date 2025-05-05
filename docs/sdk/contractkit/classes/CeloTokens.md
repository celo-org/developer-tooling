[**@celo/contractkit v10.0.0-beta.1**](../README.md)

***

[@celo/contractkit](../globals.md) / CeloTokens

# Class: CeloTokens

Defined in: [contractkit/src/celo-tokens.ts:57](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/celo-tokens.ts#L57)

A helper class to interact with all Celo tokens, ie CELO and stable tokens

## Constructors

### Constructor

> **new CeloTokens**(`contracts`, `registry`): `CeloTokens`

Defined in: [contractkit/src/celo-tokens.ts:58](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/celo-tokens.ts#L58)

#### Parameters

##### contracts

`ContractCacheType`

##### registry

`AddressRegistry`

#### Returns

`CeloTokens`

## Properties

### contracts

> `readonly` **contracts**: `ContractCacheType`

Defined in: [contractkit/src/celo-tokens.ts:58](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/celo-tokens.ts#L58)

***

### isStableTokenContract()

> **isStableTokenContract**: (`contract`) => `boolean`

Defined in: [contractkit/src/celo-tokens.ts:248](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/celo-tokens.ts#L248)

#### Parameters

##### contract

[`CeloContract`](../enumerations/CeloContract.md)

#### Returns

`boolean`

***

### registry

> `readonly` **registry**: `AddressRegistry`

Defined in: [contractkit/src/celo-tokens.ts:58](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/celo-tokens.ts#L58)

## Methods

### balancesOf()

> **balancesOf**(`address`): `Promise`\<`EachCeloToken`\<`BigNumber`\>\>

Defined in: [contractkit/src/celo-tokens.ts:66](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/celo-tokens.ts#L66)

Gets an address's balance for each celo token.

#### Parameters

##### address

`string`

the address to look up the balances for

#### Returns

`Promise`\<`EachCeloToken`\<`BigNumber`\>\>

a promise resolving to an object containing the address's balance
 for each celo token

***

### forEachCeloToken()

> **forEachCeloToken**\<`T`\>(`fn`): `Promise`\<`EachCeloToken`\<`T`\>\>

Defined in: [contractkit/src/celo-tokens.ts:106](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/celo-tokens.ts#L106)

Runs fn for each celo token found in celoTokenInfos, and returns the
value of each call in an object keyed by the token.

#### Type Parameters

##### T

`T`

#### Parameters

##### fn

(`info`) => `T` \| `Promise`\<`T`\>

the function to be called for each CeloTokenInfo.

#### Returns

`Promise`\<`EachCeloToken`\<`T`\>\>

an object containing the resolved value the call to fn for each
 celo token.

***

### forStableCeloToken()

> **forStableCeloToken**\<`T`\>(`fn`): `Promise`\<`EachCeloToken`\<`T`\>\>

Defined in: [contractkit/src/celo-tokens.ts:129](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/celo-tokens.ts#L129)

Runs fn for each stable token found in stableTokenInfos, and returns the
value of each call in an object keyed by the token.

#### Type Parameters

##### T

`T`

#### Parameters

##### fn

(`info`) => `T` \| `Promise`\<`T`\>

the function to be called for each StableTokenInfo.

#### Returns

`Promise`\<`EachCeloToken`\<`T`\>\>

an object containing the resolved value the call to fn for each
 celo token.

***

### getAddress()

> **getAddress**(`token`): `Promise`\<`` `0x${string}` ``\>

Defined in: [contractkit/src/celo-tokens.ts:223](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/celo-tokens.ts#L223)

Gets the address of the contract for the provided token.

#### Parameters

##### token

[`CeloTokenType`](../type-aliases/CeloTokenType.md)

the token to get the (proxy) contract address for

#### Returns

`Promise`\<`` `0x${string}` ``\>

A promise resolving to the address of the token's contract

***

### getAddresses()

> **getAddresses**(): `Promise`\<`EachCeloToken`\<`string`\>\>

Defined in: [contractkit/src/celo-tokens.ts:85](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/celo-tokens.ts#L85)

Gets the address for each celo token proxy contract.

#### Returns

`Promise`\<`EachCeloToken`\<`string`\>\>

an promise resolving to an object containing the address for each celo token proxy.

***

### getContract()

> **getContract**(`token`): `StableTokenContract`

Defined in: [contractkit/src/celo-tokens.ts:213](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/celo-tokens.ts#L213)

Gets the contract for the provided token

#### Parameters

##### token

[`StableToken`](../enumerations/StableToken.md)

the token to get the contract of

#### Returns

`StableTokenContract`

The contract for the token

***

### getFeeCurrencyAddress()

> **getFeeCurrencyAddress**(`token`): `undefined` \| `Promise`\<`` `0x${string}` ``\>

Defined in: [contractkit/src/celo-tokens.ts:231](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/celo-tokens.ts#L231)

Gets the address to use as the feeCurrency when paying for gas with the
 provided token.

#### Parameters

##### token

[`CeloTokenType`](../type-aliases/CeloTokenType.md)

the token to get the feeCurrency address for

#### Returns

`undefined` \| `Promise`\<`` `0x${string}` ``\>

If not CELO, the address of the token's contract. If CELO, undefined.

***

### getStablesConfigs()

> **getStablesConfigs**(`humanReadable`): `Promise`\<`EachCeloToken`\<`StableTokenConfig`\>\>

Defined in: [contractkit/src/celo-tokens.ts:89](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/celo-tokens.ts#L89)

#### Parameters

##### humanReadable

`boolean` = `false`

#### Returns

`Promise`\<`EachCeloToken`\<`StableTokenConfig`\>\>

***

### getWrapper()

#### Call Signature

> **getWrapper**(`token`): `Promise`\<`StableTokenWrapper`\>

Defined in: [contractkit/src/celo-tokens.ts:201](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/celo-tokens.ts#L201)

Gets the wrapper for a given celo token.

##### Parameters

###### token

[`StableToken`](../enumerations/StableToken.md)

the token to get the appropriate wrapper for

##### Returns

`Promise`\<`StableTokenWrapper`\>

an promise resolving to the wrapper for the token

#### Call Signature

> **getWrapper**(`token`): `Promise`\<`GoldTokenWrapper`\>

Defined in: [contractkit/src/celo-tokens.ts:202](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/celo-tokens.ts#L202)

Gets the wrapper for a given celo token.

##### Parameters

###### token

[`CELO`](../enumerations/Token.md#celo)

the token to get the appropriate wrapper for

##### Returns

`Promise`\<`GoldTokenWrapper`\>

an promise resolving to the wrapper for the token

#### Call Signature

> **getWrapper**(`token`): `Promise`\<`CeloTokenWrapper`\>

Defined in: [contractkit/src/celo-tokens.ts:203](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/celo-tokens.ts#L203)

Gets the wrapper for a given celo token.

##### Parameters

###### token

[`CeloTokenType`](../type-aliases/CeloTokenType.md)

the token to get the appropriate wrapper for

##### Returns

`Promise`\<`CeloTokenWrapper`\>

an promise resolving to the wrapper for the token

***

### getWrappers()

> **getWrappers**(): `Promise`\<`EachCeloToken`\<`CeloTokenWrapper`\>\>

Defined in: [contractkit/src/celo-tokens.ts:77](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/celo-tokens.ts#L77)

Gets the wrapper for each celo token.

#### Returns

`Promise`\<`EachCeloToken`\<`CeloTokenWrapper`\>\>

an promise resolving to an object containing the wrapper for each celo token.

***

### isStableToken()

> **isStableToken**(`token`): `boolean`

Defined in: [contractkit/src/celo-tokens.ts:243](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/celo-tokens.ts#L243)

Returns if the provided token is a StableToken

#### Parameters

##### token

[`CeloTokenType`](../type-aliases/CeloTokenType.md)

the token

#### Returns

`boolean`

if token is a StableToken

***

### validCeloTokenInfos()

> **validCeloTokenInfos**(): `Promise`\<`CeloTokenInfo`[]\>

Defined in: [contractkit/src/celo-tokens.ts:162](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/celo-tokens.ts#L162)

#### Returns

`Promise`\<`CeloTokenInfo`[]\>

***

### validStableTokenInfos()

> **validStableTokenInfos**(): `Promise`\<`StableTokenInfo`[]\>

Defined in: [contractkit/src/celo-tokens.ts:179](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/celo-tokens.ts#L179)

#### Returns

`Promise`\<`StableTokenInfo`[]\>
