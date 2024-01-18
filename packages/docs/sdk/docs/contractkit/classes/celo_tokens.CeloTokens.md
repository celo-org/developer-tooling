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
- [getExchangeContract](celo_tokens.CeloTokens.md#getexchangecontract)
- [getExchangesConfigs](celo_tokens.CeloTokens.md#getexchangesconfigs)
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

[packages/sdk/contractkit/src/celo-tokens.ts:62](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/celo-tokens.ts#L62)

## Properties

### contracts

• `Readonly` **contracts**: [`ContractCacheType`](../interfaces/basic_contract_cache_type.ContractCacheType.md)

#### Defined in

[packages/sdk/contractkit/src/celo-tokens.ts:62](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/celo-tokens.ts#L62)

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

[packages/sdk/contractkit/src/celo-tokens.ts:272](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/celo-tokens.ts#L272)

___

### registry

• `Readonly` **registry**: [`AddressRegistry`](address_registry.AddressRegistry.md)

#### Defined in

[packages/sdk/contractkit/src/celo-tokens.ts:62](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/celo-tokens.ts#L62)

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

[packages/sdk/contractkit/src/celo-tokens.ts:70](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/celo-tokens.ts#L70)

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

[packages/sdk/contractkit/src/celo-tokens.ts:120](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/celo-tokens.ts#L120)

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

[packages/sdk/contractkit/src/celo-tokens.ts:143](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/celo-tokens.ts#L143)

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

[packages/sdk/contractkit/src/celo-tokens.ts:247](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/celo-tokens.ts#L247)

___

### getAddresses

▸ **getAddresses**(): `Promise`\<[`EachCeloToken`](../modules/celo_tokens.md#eachcelotoken)\<`string`\>\>

Gets the address for each celo token proxy contract.

#### Returns

`Promise`\<[`EachCeloToken`](../modules/celo_tokens.md#eachcelotoken)\<`string`\>\>

an promise resolving to an object containing the address for each celo token proxy.

#### Defined in

[packages/sdk/contractkit/src/celo-tokens.ts:89](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/celo-tokens.ts#L89)

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

[packages/sdk/contractkit/src/celo-tokens.ts:228](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/celo-tokens.ts#L228)

___

### getExchangeContract

▸ **getExchangeContract**(`token`): [`ExchangeContract`](../modules/base.md#exchangecontract)

Gets the exchange contract for the provided stable token

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `token` | [`StableToken`](../enums/celo_tokens.StableToken.md) | the stable token to get exchange contract of |

#### Returns

[`ExchangeContract`](../modules/base.md#exchangecontract)

The exchange contract for the token

#### Defined in

[packages/sdk/contractkit/src/celo-tokens.ts:238](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/celo-tokens.ts#L238)

___

### getExchangesConfigs

▸ **getExchangesConfigs**(`humanReadable?`): `Promise`\<[`EachCeloToken`](../modules/celo_tokens.md#eachcelotoken)\<[`ExchangeConfig`](../interfaces/wrappers_Exchange.ExchangeConfig.md) \| \{ `lastBucketUpdate`: `string` ; `minimumReports`: `BigNumber` ; `reserveFraction`: `BigNumber` ; `spread`: `BigNumber` ; `updateFrequency`: `string`  }\>\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `humanReadable` | `boolean` | `false` |

#### Returns

`Promise`\<[`EachCeloToken`](../modules/celo_tokens.md#eachcelotoken)\<[`ExchangeConfig`](../interfaces/wrappers_Exchange.ExchangeConfig.md) \| \{ `lastBucketUpdate`: `string` ; `minimumReports`: `BigNumber` ; `reserveFraction`: `BigNumber` ; `spread`: `BigNumber` ; `updateFrequency`: `string`  }\>\>

#### Defined in

[packages/sdk/contractkit/src/celo-tokens.ts:103](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/celo-tokens.ts#L103)

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

[packages/sdk/contractkit/src/celo-tokens.ts:255](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/celo-tokens.ts#L255)

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

[packages/sdk/contractkit/src/celo-tokens.ts:93](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/celo-tokens.ts#L93)

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

[packages/sdk/contractkit/src/celo-tokens.ts:216](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/celo-tokens.ts#L216)

▸ **getWrapper**(`token`): `Promise`\<[`GoldTokenWrapper`](wrappers_GoldTokenWrapper.GoldTokenWrapper.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `token` | [`CELO`](../enums/celo_tokens.Token.md#celo) |

#### Returns

`Promise`\<[`GoldTokenWrapper`](wrappers_GoldTokenWrapper.GoldTokenWrapper.md)\>

#### Defined in

[packages/sdk/contractkit/src/celo-tokens.ts:217](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/celo-tokens.ts#L217)

▸ **getWrapper**(`token`): `Promise`\<[`CeloTokenWrapper`](../modules/celo_tokens.md#celotokenwrapper)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `token` | [`CeloTokenType`](../modules/celo_tokens.md#celotokentype) |

#### Returns

`Promise`\<[`CeloTokenWrapper`](../modules/celo_tokens.md#celotokenwrapper)\>

#### Defined in

[packages/sdk/contractkit/src/celo-tokens.ts:218](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/celo-tokens.ts#L218)

___

### getWrappers

▸ **getWrappers**(): `Promise`\<[`EachCeloToken`](../modules/celo_tokens.md#eachcelotoken)\<[`CeloTokenWrapper`](../modules/celo_tokens.md#celotokenwrapper)\>\>

Gets the wrapper for each celo token.

#### Returns

`Promise`\<[`EachCeloToken`](../modules/celo_tokens.md#eachcelotoken)\<[`CeloTokenWrapper`](../modules/celo_tokens.md#celotokenwrapper)\>\>

an promise resolving to an object containing the wrapper for each celo token.

#### Defined in

[packages/sdk/contractkit/src/celo-tokens.ts:81](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/celo-tokens.ts#L81)

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

[packages/sdk/contractkit/src/celo-tokens.ts:267](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/celo-tokens.ts#L267)

___

### validCeloTokenInfos

▸ **validCeloTokenInfos**(): `Promise`\<[`CeloTokenInfo`](../interfaces/celo_tokens.CeloTokenInfo.md)[]\>

#### Returns

`Promise`\<[`CeloTokenInfo`](../interfaces/celo_tokens.CeloTokenInfo.md)[]\>

#### Defined in

[packages/sdk/contractkit/src/celo-tokens.ts:176](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/celo-tokens.ts#L176)

___

### validStableTokenInfos

▸ **validStableTokenInfos**(): `Promise`\<[`StableTokenInfo`](../interfaces/celo_tokens.StableTokenInfo.md)[]\>

#### Returns

`Promise`\<[`StableTokenInfo`](../interfaces/celo_tokens.StableTokenInfo.md)[]\>

#### Defined in

[packages/sdk/contractkit/src/celo-tokens.ts:193](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/celo-tokens.ts#L193)
