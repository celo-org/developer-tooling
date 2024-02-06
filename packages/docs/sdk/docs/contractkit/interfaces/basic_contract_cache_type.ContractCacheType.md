[@celo/contractkit](../README.md) / [Exports](../modules.md) / [basic-contract-cache-type](../modules/basic_contract_cache_type.md) / ContractCacheType

# Interface: ContractCacheType

[basic-contract-cache-type](../modules/basic_contract_cache_type.md).ContractCacheType

Interface for a class with the minimum required wrappers
to make a MiniContractKit or CeloTokens Class

## Implemented by

- [`MiniContractCache`](../classes/mini_contract_cache.MiniContractCache.md)
- [`WrapperCache`](../classes/contract_cache.WrapperCache.md)

## Table of contents

### Methods

- [getAccounts](basic_contract_cache_type.ContractCacheType.md#getaccounts)
- [getContract](basic_contract_cache_type.ContractCacheType.md#getcontract)
- [getGoldToken](basic_contract_cache_type.ContractCacheType.md#getgoldtoken)
- [getStableToken](basic_contract_cache_type.ContractCacheType.md#getstabletoken)

## Methods

### getAccounts

▸ **getAccounts**(): `Promise`\<[`AccountsWrapper`](../classes/wrappers_Accounts.AccountsWrapper.md)\>

#### Returns

`Promise`\<[`AccountsWrapper`](../classes/wrappers_Accounts.AccountsWrapper.md)\>

#### Defined in

[packages/sdk/contractkit/src/basic-contract-cache-type.ts:12](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/basic-contract-cache-type.ts#L12)

___

### getContract

▸ **getContract**(`contract`): `Promise`\<[`StableTokenWrapper`](../classes/wrappers_StableTokenWrapper.StableTokenWrapper.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `contract` | [`CeloTokenContract`](../modules/base.md#celotokencontract) |

#### Returns

`Promise`\<[`StableTokenWrapper`](../classes/wrappers_StableTokenWrapper.StableTokenWrapper.md)\>

#### Defined in

[packages/sdk/contractkit/src/basic-contract-cache-type.ts:18](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/basic-contract-cache-type.ts#L18)

▸ **getContract**(`contract`): `Promise`\<[`GoldTokenWrapper`](../classes/wrappers_GoldTokenWrapper.GoldTokenWrapper.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `contract` | [`GoldToken`](../enums/base.CeloContract.md#goldtoken) |

#### Returns

`Promise`\<[`GoldTokenWrapper`](../classes/wrappers_GoldTokenWrapper.GoldTokenWrapper.md)\>

#### Defined in

[packages/sdk/contractkit/src/basic-contract-cache-type.ts:19](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/basic-contract-cache-type.ts#L19)

___

### getGoldToken

▸ **getGoldToken**(): `Promise`\<[`GoldTokenWrapper`](../classes/wrappers_GoldTokenWrapper.GoldTokenWrapper.md)\>

#### Returns

`Promise`\<[`GoldTokenWrapper`](../classes/wrappers_GoldTokenWrapper.GoldTokenWrapper.md)\>

#### Defined in

[packages/sdk/contractkit/src/basic-contract-cache-type.ts:14](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/basic-contract-cache-type.ts#L14)

___

### getStableToken

▸ **getStableToken**(`stableToken`): `Promise`\<[`StableTokenWrapper`](../classes/wrappers_StableTokenWrapper.StableTokenWrapper.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `stableToken` | [`StableToken`](../enums/celo_tokens.StableToken.md) |

#### Returns

`Promise`\<[`StableTokenWrapper`](../classes/wrappers_StableTokenWrapper.StableTokenWrapper.md)\>

#### Defined in

[packages/sdk/contractkit/src/basic-contract-cache-type.ts:16](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/basic-contract-cache-type.ts#L16)
