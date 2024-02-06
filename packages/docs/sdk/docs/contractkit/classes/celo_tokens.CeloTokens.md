[@celo/contractkit](../README.md) / [Exports](../modules.md) / [celo-tokens](../modules/celo_tokens.md) / CeloTokens

# Class: CeloTokens

[celo-tokens](../modules/celo_tokens.md).CeloTokens

A helper class to interact with all Celo tokens, ie CELO and stable tokens

## Table of contents

### Constructors

- [constructor](celo_tokens.CeloTokens.md#constructor)

### Properties

- [contracts](celo_tokens.CeloTokens.md#contracts)
- [isStableTokenContract](celo_tokens.CeloTokens.md#isstabletokencontract)
- [registry](celo_tokens.CeloTokens.md#registry)

### Methods

- [balancesOf](celo_tokens.CeloTokens.md#balancesof)
- [forEachCeloToken](celo_tokens.CeloTokens.md#foreachcelotoken)
- [forStableCeloToken](celo_tokens.CeloTokens.md#forstablecelotoken)
- [getAddress](celo_tokens.CeloTokens.md#getaddress)
- [getAddresses](celo_tokens.CeloTokens.md#getaddresses)
- [getContract](celo_tokens.CeloTokens.md#getcontract)
- [getFeeCurrencyAddress](celo_tokens.CeloTokens.md#getfeecurrencyaddress)
- [getStablesConfigs](celo_tokens.CeloTokens.md#getstablesconfigs)
- [getWrapper](celo_tokens.CeloTokens.md#getwrapper)
- [getWrappers](celo_tokens.CeloTokens.md#getwrappers)
- [isStableToken](celo_tokens.CeloTokens.md#isstabletoken)
- [validCeloTokenInfos](celo_tokens.CeloTokens.md#validcelotokeninfos)
- [validStableTokenInfos](celo_tokens.CeloTokens.md#validstabletokeninfos)

## Constructors

### constructor

• **new CeloTokens**(`contracts`, `registry`): [`CeloTokens`](celo_tokens.CeloTokens.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `contracts` | [`ContractCacheType`](../interfaces/basic_contract_cache_type.ContractCacheType.md) |
| `registry` | [`AddressRegistry`](address_registry.AddressRegistry.md) |

#### Returns

[`CeloTokens`](celo_tokens.CeloTokens.md)

#### Defined in

[packages/sdk/contractkit/src/celo-tokens.ts:58](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/celo-tokens.ts#L58)

## Properties

### contracts

• `Readonly` **contracts**: [`ContractCacheType`](../interfaces/basic_contract_cache_type.ContractCacheType.md)

#### Defined in

[packages/sdk/contractkit/src/celo-tokens.ts:58](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/celo-tokens.ts#L58)

___

### isStableTokenContract

• **isStableTokenContract**: (`contract`: [`CeloContract`](../enums/base.CeloContract.md)) => `boolean` = `isStableTokenContract`

#### Type declaration

▸ (`contract`): `boolean`

##### Parameters

| Name | Type |
| :------ | :------ |
| `contract` | [`CeloContract`](../enums/base.CeloContract.md) |

##### Returns

`boolean`

#### Defined in

[packages/sdk/contractkit/src/celo-tokens.ts:248](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/celo-tokens.ts#L248)

___

### registry

• `Readonly` **registry**: [`AddressRegistry`](address_registry.AddressRegistry.md)

#### Defined in

[packages/sdk/contractkit/src/celo-tokens.ts:58](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/celo-tokens.ts#L58)

## Methods

### balancesOf

▸ **balancesOf**(`address`): `Promise`\<[`EachCeloToken`](../modules/celo_tokens.md#eachcelotoken)\<`BigNumber`\>\>

Gets an address's balance for each celo token.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `address` | `string` | the address to look up the balances for |

#### Returns

`Promise`\<[`EachCeloToken`](../modules/celo_tokens.md#eachcelotoken)\<`BigNumber`\>\>

a promise resolving to an object containing the address's balance
 for each celo token

#### Defined in

[packages/sdk/contractkit/src/celo-tokens.ts:66](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/celo-tokens.ts#L66)

___

### forEachCeloToken

▸ **forEachCeloToken**\<`T`\>(`fn`): `Promise`\<[`EachCeloToken`](../modules/celo_tokens.md#eachcelotoken)\<`T`\>\>

Runs fn for each celo token found in celoTokenInfos, and returns the
value of each call in an object keyed by the token.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `fn` | (`info`: [`CeloTokenInfo`](../interfaces/celo_tokens.CeloTokenInfo.md)) => `T` \| `Promise`\<`T`\> | the function to be called for each CeloTokenInfo. |

#### Returns

`Promise`\<[`EachCeloToken`](../modules/celo_tokens.md#eachcelotoken)\<`T`\>\>

an object containing the resolved value the call to fn for each
 celo token.

#### Defined in

[packages/sdk/contractkit/src/celo-tokens.ts:106](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/celo-tokens.ts#L106)

___

### forStableCeloToken

▸ **forStableCeloToken**\<`T`\>(`fn`): `Promise`\<[`EachCeloToken`](../modules/celo_tokens.md#eachcelotoken)\<`T`\>\>

Runs fn for each stable token found in stableTokenInfos, and returns the
value of each call in an object keyed by the token.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `fn` | (`info`: [`StableTokenInfo`](../interfaces/celo_tokens.StableTokenInfo.md)) => `T` \| `Promise`\<`T`\> | the function to be called for each StableTokenInfo. |

#### Returns

`Promise`\<[`EachCeloToken`](../modules/celo_tokens.md#eachcelotoken)\<`T`\>\>

an object containing the resolved value the call to fn for each
 celo token.

#### Defined in

[packages/sdk/contractkit/src/celo-tokens.ts:129](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/celo-tokens.ts#L129)

___

### getAddress

▸ **getAddress**(`token`): `Promise`\<`string`\>

Gets the address of the contract for the provided token.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `token` | [`CeloTokenType`](../modules/celo_tokens.md#celotokentype) | the token to get the (proxy) contract address for |

#### Returns

`Promise`\<`string`\>

A promise resolving to the address of the token's contract

#### Defined in

[packages/sdk/contractkit/src/celo-tokens.ts:223](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/celo-tokens.ts#L223)

___

### getAddresses

▸ **getAddresses**(): `Promise`\<[`EachCeloToken`](../modules/celo_tokens.md#eachcelotoken)\<`string`\>\>

Gets the address for each celo token proxy contract.

#### Returns

`Promise`\<[`EachCeloToken`](../modules/celo_tokens.md#eachcelotoken)\<`string`\>\>

an promise resolving to an object containing the address for each celo token proxy.

#### Defined in

[packages/sdk/contractkit/src/celo-tokens.ts:85](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/celo-tokens.ts#L85)

___

### getContract

▸ **getContract**(`token`): [`StableTokenContract`](../modules/base.md#stabletokencontract)

Gets the contract for the provided token

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `token` | [`StableToken`](../enums/celo_tokens.StableToken.md) | the token to get the contract of |

#### Returns

[`StableTokenContract`](../modules/base.md#stabletokencontract)

The contract for the token

#### Defined in

[packages/sdk/contractkit/src/celo-tokens.ts:213](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/celo-tokens.ts#L213)

___

### getFeeCurrencyAddress

▸ **getFeeCurrencyAddress**(`token`): `undefined` \| `Promise`\<`string`\>

Gets the address to use as the feeCurrency when paying for gas with the
 provided token.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `token` | [`CeloTokenType`](../modules/celo_tokens.md#celotokentype) | the token to get the feeCurrency address for |

#### Returns

`undefined` \| `Promise`\<`string`\>

If not CELO, the address of the token's contract. If CELO, undefined.

#### Defined in

[packages/sdk/contractkit/src/celo-tokens.ts:231](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/celo-tokens.ts#L231)

___

### getStablesConfigs

▸ **getStablesConfigs**(`humanReadable?`): `Promise`\<[`EachCeloToken`](../modules/celo_tokens.md#eachcelotoken)\<[`StableTokenConfig`](../interfaces/wrappers_StableTokenWrapper.StableTokenConfig.md) \| \{ `decimals`: `number` ; `inflationParameters`: \{ `factor`: `BigNumber` ; `factorLastUpdated`: `string` ; `rate`: `BigNumber` ; `updatePeriod`: `string`  } ; `name`: `string` ; `symbol`: `string`  }\>\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `humanReadable` | `boolean` | `false` |

#### Returns

`Promise`\<[`EachCeloToken`](../modules/celo_tokens.md#eachcelotoken)\<[`StableTokenConfig`](../interfaces/wrappers_StableTokenWrapper.StableTokenConfig.md) \| \{ `decimals`: `number` ; `inflationParameters`: \{ `factor`: `BigNumber` ; `factorLastUpdated`: `string` ; `rate`: `BigNumber` ; `updatePeriod`: `string`  } ; `name`: `string` ; `symbol`: `string`  }\>\>

#### Defined in

[packages/sdk/contractkit/src/celo-tokens.ts:89](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/celo-tokens.ts#L89)

___

### getWrapper

▸ **getWrapper**(`token`): `Promise`\<[`StableTokenWrapper`](wrappers_StableTokenWrapper.StableTokenWrapper.md)\>

Gets the wrapper for a given celo token.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `token` | [`StableToken`](../enums/celo_tokens.StableToken.md) | the token to get the appropriate wrapper for |

#### Returns

`Promise`\<[`StableTokenWrapper`](wrappers_StableTokenWrapper.StableTokenWrapper.md)\>

an promise resolving to the wrapper for the token

#### Defined in

[packages/sdk/contractkit/src/celo-tokens.ts:201](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/celo-tokens.ts#L201)

▸ **getWrapper**(`token`): `Promise`\<[`GoldTokenWrapper`](wrappers_GoldTokenWrapper.GoldTokenWrapper.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `token` | [`CELO`](../enums/celo_tokens.Token.md#celo) |

#### Returns

`Promise`\<[`GoldTokenWrapper`](wrappers_GoldTokenWrapper.GoldTokenWrapper.md)\>

#### Defined in

[packages/sdk/contractkit/src/celo-tokens.ts:202](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/celo-tokens.ts#L202)

▸ **getWrapper**(`token`): `Promise`\<[`CeloTokenWrapper`](../modules/celo_tokens.md#celotokenwrapper)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `token` | [`CeloTokenType`](../modules/celo_tokens.md#celotokentype) |

#### Returns

`Promise`\<[`CeloTokenWrapper`](../modules/celo_tokens.md#celotokenwrapper)\>

#### Defined in

[packages/sdk/contractkit/src/celo-tokens.ts:203](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/celo-tokens.ts#L203)

___

### getWrappers

▸ **getWrappers**(): `Promise`\<[`EachCeloToken`](../modules/celo_tokens.md#eachcelotoken)\<[`CeloTokenWrapper`](../modules/celo_tokens.md#celotokenwrapper)\>\>

Gets the wrapper for each celo token.

#### Returns

`Promise`\<[`EachCeloToken`](../modules/celo_tokens.md#eachcelotoken)\<[`CeloTokenWrapper`](../modules/celo_tokens.md#celotokenwrapper)\>\>

an promise resolving to an object containing the wrapper for each celo token.

#### Defined in

[packages/sdk/contractkit/src/celo-tokens.ts:77](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/celo-tokens.ts#L77)

___

### isStableToken

▸ **isStableToken**(`token`): `boolean`

Returns if the provided token is a StableToken

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `token` | [`CeloTokenType`](../modules/celo_tokens.md#celotokentype) | the token |

#### Returns

`boolean`

if token is a StableToken

#### Defined in

[packages/sdk/contractkit/src/celo-tokens.ts:243](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/celo-tokens.ts#L243)

___

### validCeloTokenInfos

▸ **validCeloTokenInfos**(): `Promise`\<[`CeloTokenInfo`](../interfaces/celo_tokens.CeloTokenInfo.md)[]\>

#### Returns

`Promise`\<[`CeloTokenInfo`](../interfaces/celo_tokens.CeloTokenInfo.md)[]\>

#### Defined in

[packages/sdk/contractkit/src/celo-tokens.ts:162](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/celo-tokens.ts#L162)

___

### validStableTokenInfos

▸ **validStableTokenInfos**(): `Promise`\<[`StableTokenInfo`](../interfaces/celo_tokens.StableTokenInfo.md)[]\>

#### Returns

`Promise`\<[`StableTokenInfo`](../interfaces/celo_tokens.StableTokenInfo.md)[]\>

#### Defined in

[packages/sdk/contractkit/src/celo-tokens.ts:179](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/celo-tokens.ts#L179)
