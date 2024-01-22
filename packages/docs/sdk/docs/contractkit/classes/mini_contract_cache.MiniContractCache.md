[@celo/contractkit](../README.md) / [Exports](../modules.md) / [mini-contract-cache](../modules/mini_contract_cache.md) / MiniContractCache

# Class: MiniContractCache

[mini-contract-cache](../modules/mini_contract_cache.md).MiniContractCache

Alternative Contract Cache with Minimal Contracts

Provides access to a subset of wrappers: [AccountsWrapper](wrappers_Accounts.AccountsWrapper.md),  [ExchangeWrapper](wrappers_Exchange.ExchangeWrapper.md), [GasPriceMinimumWrapper](wrappers_GasPriceMinimum.GasPriceMinimumWrapper.md) and Celo Token contracts
Used internally by MiniContractKit

**`Param`**

– Connection

**`Param`**

– [AddressRegistry](address_registry.AddressRegistry.md)

## Implements

- [`ContractCacheType`](../interfaces/basic_contract_cache_type.ContractCacheType.md)

## Table of contents

### Constructors

- [constructor](mini_contract_cache.MiniContractCache.md#constructor)

### Properties

- [connection](mini_contract_cache.MiniContractCache.md#connection)
- [registry](mini_contract_cache.MiniContractCache.md#registry)

### Methods

- [getAccounts](mini_contract_cache.MiniContractCache.md#getaccounts)
- [getContract](mini_contract_cache.MiniContractCache.md#getcontract)
- [getExchange](mini_contract_cache.MiniContractCache.md#getexchange)
- [getGoldToken](mini_contract_cache.MiniContractCache.md#getgoldtoken)
- [getStableToken](mini_contract_cache.MiniContractCache.md#getstabletoken)
- [invalidateContract](mini_contract_cache.MiniContractCache.md#invalidatecontract)

## Constructors

### constructor

• **new MiniContractCache**(`connection`, `registry`, `contractClasses?`): [`MiniContractCache`](mini_contract_cache.MiniContractCache.md)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `connection` | `Connection` | `undefined` |
| `registry` | [`AddressRegistry`](address_registry.AddressRegistry.md) | `undefined` |
| `contractClasses` | `Object` | `MINIMUM_CONTRACTS` |
| `contractClasses.Accounts` | `Object` | `undefined` |
| `contractClasses.Accounts.newInstance` | (`web3`: `default`, `address`: `string`) => `Accounts` | `newAccounts` |
| `contractClasses.Accounts.wrapper` | typeof [`AccountsWrapper`](wrappers_Accounts.AccountsWrapper.md) | `AccountsWrapper` |
| `contractClasses.Exchange` | `Object` | `undefined` |
| `contractClasses.Exchange.newInstance` | (`web3`: `default`, `address`: `string`) => `Exchange` | `newExchange` |
| `contractClasses.Exchange.wrapper` | typeof [`ExchangeWrapper`](wrappers_Exchange.ExchangeWrapper.md) | `ExchangeWrapper` |
| `contractClasses.ExchangeBRL` | `Object` | `undefined` |
| `contractClasses.ExchangeBRL.newInstance` | (`web3`: `default`, `address`: `string`) => `ExchangeBRL` | `newExchangeBRL` |
| `contractClasses.ExchangeBRL.wrapper` | typeof [`ExchangeWrapper`](wrappers_Exchange.ExchangeWrapper.md) | `ExchangeWrapper` |
| `contractClasses.ExchangeEUR` | `Object` | `undefined` |
| `contractClasses.ExchangeEUR.newInstance` | (`web3`: `default`, `address`: `string`) => `ExchangeEUR` | `newExchangeEUR` |
| `contractClasses.ExchangeEUR.wrapper` | typeof [`ExchangeWrapper`](wrappers_Exchange.ExchangeWrapper.md) | `ExchangeWrapper` |
| `contractClasses.GasPriceMinimum` | `Object` | `undefined` |
| `contractClasses.GasPriceMinimum.newInstance` | (`web3`: `default`, `address`: `string`) => `GasPriceMinimum` | `newGasPriceMinimum` |
| `contractClasses.GasPriceMinimum.wrapper` | typeof [`GasPriceMinimumWrapper`](wrappers_GasPriceMinimum.GasPriceMinimumWrapper.md) | `GasPriceMinimumWrapper` |
| `contractClasses.GoldToken` | `Object` | `undefined` |
| `contractClasses.GoldToken.newInstance` | (`web3`: `default`, `address`: `string`) => `GoldToken` | `newGoldToken` |
| `contractClasses.GoldToken.wrapper` | typeof [`GoldTokenWrapper`](wrappers_GoldTokenWrapper.GoldTokenWrapper.md) | `GoldTokenWrapper` |
| `contractClasses.StableToken` | `Object` | `undefined` |
| `contractClasses.StableToken.newInstance` | (`web3`: `default`, `address`: `string`) => `StableToken` | `newStableToken` |
| `contractClasses.StableToken.wrapper` | typeof [`StableTokenWrapper`](wrappers_StableTokenWrapper.StableTokenWrapper.md) | `StableTokenWrapper` |
| `contractClasses.StableTokenBRL` | `Object` | `undefined` |
| `contractClasses.StableTokenBRL.newInstance` | (`web3`: `default`, `address`: `string`) => `StableTokenBRL` | `newStableTokenBRL` |
| `contractClasses.StableTokenBRL.wrapper` | typeof [`StableTokenWrapper`](wrappers_StableTokenWrapper.StableTokenWrapper.md) | `StableTokenWrapper` |
| `contractClasses.StableTokenEUR` | `Object` | `undefined` |
| `contractClasses.StableTokenEUR.newInstance` | (`web3`: `default`, `address`: `string`) => `StableTokenEUR` | `newStableTokenEUR` |
| `contractClasses.StableTokenEUR.wrapper` | typeof [`StableTokenWrapper`](wrappers_StableTokenWrapper.StableTokenWrapper.md) | `StableTokenWrapper` |

#### Returns

[`MiniContractCache`](mini_contract_cache.MiniContractCache.md)

#### Defined in

[packages/sdk/contractkit/src/mini-contract-cache.ts:90](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/mini-contract-cache.ts#L90)

## Properties

### connection

• `Readonly` **connection**: `Connection`

#### Defined in

[packages/sdk/contractkit/src/mini-contract-cache.ts:91](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/mini-contract-cache.ts#L91)

___

### registry

• `Readonly` **registry**: [`AddressRegistry`](address_registry.AddressRegistry.md)

#### Defined in

[packages/sdk/contractkit/src/mini-contract-cache.ts:92](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/mini-contract-cache.ts#L92)

## Methods

### getAccounts

▸ **getAccounts**(): `Promise`\<[`AccountsWrapper`](wrappers_Accounts.AccountsWrapper.md)\>

#### Returns

`Promise`\<[`AccountsWrapper`](wrappers_Accounts.AccountsWrapper.md)\>

#### Implementation of

[ContractCacheType](../interfaces/basic_contract_cache_type.ContractCacheType.md).[getAccounts](../interfaces/basic_contract_cache_type.ContractCacheType.md#getaccounts)

#### Defined in

[packages/sdk/contractkit/src/mini-contract-cache.ts:96](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/mini-contract-cache.ts#L96)

___

### getContract

▸ **getContract**\<`ContractKey`\>(`contract`, `address?`): `Promise`\<`InstanceType`\<\{ `Accounts`: \{ `newInstance`: (`web3`: `default`, `address`: `string`) => `Accounts` = newAccounts; `wrapper`: typeof [`AccountsWrapper`](wrappers_Accounts.AccountsWrapper.md) = AccountsWrapper } ; `Exchange`: \{ `newInstance`: (`web3`: `default`, `address`: `string`) => `Exchange` = newExchange; `wrapper`: typeof [`ExchangeWrapper`](wrappers_Exchange.ExchangeWrapper.md) = ExchangeWrapper } ; `ExchangeBRL`: \{ `newInstance`: (`web3`: `default`, `address`: `string`) => `ExchangeBRL` = newExchangeBRL; `wrapper`: typeof [`ExchangeWrapper`](wrappers_Exchange.ExchangeWrapper.md) = ExchangeWrapper } ; `ExchangeEUR`: \{ `newInstance`: (`web3`: `default`, `address`: `string`) => `ExchangeEUR` = newExchangeEUR; `wrapper`: typeof [`ExchangeWrapper`](wrappers_Exchange.ExchangeWrapper.md) = ExchangeWrapper } ; `GasPriceMinimum`: \{ `newInstance`: (`web3`: `default`, `address`: `string`) => `GasPriceMinimum` = newGasPriceMinimum; `wrapper`: typeof [`GasPriceMinimumWrapper`](wrappers_GasPriceMinimum.GasPriceMinimumWrapper.md) = GasPriceMinimumWrapper } ; `GoldToken`: \{ `newInstance`: (`web3`: `default`, `address`: `string`) => `GoldToken` = newGoldToken; `wrapper`: typeof [`GoldTokenWrapper`](wrappers_GoldTokenWrapper.GoldTokenWrapper.md) = GoldTokenWrapper } ; `StableToken`: \{ `newInstance`: (`web3`: `default`, `address`: `string`) => `StableToken` = newStableToken; `wrapper`: typeof [`StableTokenWrapper`](wrappers_StableTokenWrapper.StableTokenWrapper.md) = StableTokenWrapper } ; `StableTokenBRL`: \{ `newInstance`: (`web3`: `default`, `address`: `string`) => `StableTokenBRL` = newStableTokenBRL; `wrapper`: typeof [`StableTokenWrapper`](wrappers_StableTokenWrapper.StableTokenWrapper.md) = StableTokenWrapper } ; `StableTokenEUR`: \{ `newInstance`: (`web3`: `default`, `address`: `string`) => `StableTokenEUR` = newStableTokenEUR; `wrapper`: typeof [`StableTokenWrapper`](wrappers_StableTokenWrapper.StableTokenWrapper.md) = StableTokenWrapper }  }[`ContractKey`][``"wrapper"``]\>\>

Get Contract wrapper

#### Type parameters

| Name | Type |
| :------ | :------ |
| `ContractKey` | extends [`Accounts`](../enums/base.CeloContract.md#accounts) \| [`Exchange`](../enums/base.CeloContract.md#exchange) \| [`ExchangeEUR`](../enums/base.CeloContract.md#exchangeeur) \| [`ExchangeBRL`](../enums/base.CeloContract.md#exchangebrl) \| [`GasPriceMinimum`](../enums/base.CeloContract.md#gaspriceminimum) \| [`GoldToken`](../enums/base.CeloContract.md#goldtoken) \| [`StableToken`](../enums/base.CeloContract.md#stabletoken) \| [`StableTokenEUR`](../enums/base.CeloContract.md#stabletokeneur) \| [`StableTokenBRL`](../enums/base.CeloContract.md#stabletokenbrl) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `contract` | `ContractKey` |
| `address?` | `string` |

#### Returns

`Promise`\<`InstanceType`\<\{ `Accounts`: \{ `newInstance`: (`web3`: `default`, `address`: `string`) => `Accounts` = newAccounts; `wrapper`: typeof [`AccountsWrapper`](wrappers_Accounts.AccountsWrapper.md) = AccountsWrapper } ; `Exchange`: \{ `newInstance`: (`web3`: `default`, `address`: `string`) => `Exchange` = newExchange; `wrapper`: typeof [`ExchangeWrapper`](wrappers_Exchange.ExchangeWrapper.md) = ExchangeWrapper } ; `ExchangeBRL`: \{ `newInstance`: (`web3`: `default`, `address`: `string`) => `ExchangeBRL` = newExchangeBRL; `wrapper`: typeof [`ExchangeWrapper`](wrappers_Exchange.ExchangeWrapper.md) = ExchangeWrapper } ; `ExchangeEUR`: \{ `newInstance`: (`web3`: `default`, `address`: `string`) => `ExchangeEUR` = newExchangeEUR; `wrapper`: typeof [`ExchangeWrapper`](wrappers_Exchange.ExchangeWrapper.md) = ExchangeWrapper } ; `GasPriceMinimum`: \{ `newInstance`: (`web3`: `default`, `address`: `string`) => `GasPriceMinimum` = newGasPriceMinimum; `wrapper`: typeof [`GasPriceMinimumWrapper`](wrappers_GasPriceMinimum.GasPriceMinimumWrapper.md) = GasPriceMinimumWrapper } ; `GoldToken`: \{ `newInstance`: (`web3`: `default`, `address`: `string`) => `GoldToken` = newGoldToken; `wrapper`: typeof [`GoldTokenWrapper`](wrappers_GoldTokenWrapper.GoldTokenWrapper.md) = GoldTokenWrapper } ; `StableToken`: \{ `newInstance`: (`web3`: `default`, `address`: `string`) => `StableToken` = newStableToken; `wrapper`: typeof [`StableTokenWrapper`](wrappers_StableTokenWrapper.StableTokenWrapper.md) = StableTokenWrapper } ; `StableTokenBRL`: \{ `newInstance`: (`web3`: `default`, `address`: `string`) => `StableTokenBRL` = newStableTokenBRL; `wrapper`: typeof [`StableTokenWrapper`](wrappers_StableTokenWrapper.StableTokenWrapper.md) = StableTokenWrapper } ; `StableTokenEUR`: \{ `newInstance`: (`web3`: `default`, `address`: `string`) => `StableTokenEUR` = newStableTokenEUR; `wrapper`: typeof [`StableTokenWrapper`](wrappers_StableTokenWrapper.StableTokenWrapper.md) = StableTokenWrapper }  }[`ContractKey`][``"wrapper"``]\>\>

#### Implementation of

[ContractCacheType](../interfaces/basic_contract_cache_type.ContractCacheType.md).[getContract](../interfaces/basic_contract_cache_type.ContractCacheType.md#getcontract)

#### Defined in

[packages/sdk/contractkit/src/mini-contract-cache.ts:114](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/mini-contract-cache.ts#L114)

___

### getExchange

▸ **getExchange**(`stableToken?`): `Promise`\<[`ExchangeWrapper`](wrappers_Exchange.ExchangeWrapper.md)\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `stableToken` | [`StableToken`](../enums/celo_tokens.StableToken.md) | `StableToken.cUSD` |

#### Returns

`Promise`\<[`ExchangeWrapper`](wrappers_Exchange.ExchangeWrapper.md)\>

#### Implementation of

[ContractCacheType](../interfaces/basic_contract_cache_type.ContractCacheType.md).[getExchange](../interfaces/basic_contract_cache_type.ContractCacheType.md#getexchange)

#### Defined in

[packages/sdk/contractkit/src/mini-contract-cache.ts:99](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/mini-contract-cache.ts#L99)

___

### getGoldToken

▸ **getGoldToken**(): `Promise`\<[`GoldTokenWrapper`](wrappers_GoldTokenWrapper.GoldTokenWrapper.md)\>

#### Returns

`Promise`\<[`GoldTokenWrapper`](wrappers_GoldTokenWrapper.GoldTokenWrapper.md)\>

#### Implementation of

[ContractCacheType](../interfaces/basic_contract_cache_type.ContractCacheType.md).[getGoldToken](../interfaces/basic_contract_cache_type.ContractCacheType.md#getgoldtoken)

#### Defined in

[packages/sdk/contractkit/src/mini-contract-cache.ts:103](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/mini-contract-cache.ts#L103)

___

### getStableToken

▸ **getStableToken**(`stableToken?`): `Promise`\<[`StableTokenWrapper`](wrappers_StableTokenWrapper.StableTokenWrapper.md)\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `stableToken` | [`StableToken`](../enums/celo_tokens.StableToken.md) | `StableToken.cUSD` |

#### Returns

`Promise`\<[`StableTokenWrapper`](wrappers_StableTokenWrapper.StableTokenWrapper.md)\>

#### Implementation of

[ContractCacheType](../interfaces/basic_contract_cache_type.ContractCacheType.md).[getStableToken](../interfaces/basic_contract_cache_type.ContractCacheType.md#getstabletoken)

#### Defined in

[packages/sdk/contractkit/src/mini-contract-cache.ts:107](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/mini-contract-cache.ts#L107)

___

### invalidateContract

▸ **invalidateContract**\<`C`\>(`contract`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `C` | extends [`Accounts`](../enums/base.CeloContract.md#accounts) \| [`Exchange`](../enums/base.CeloContract.md#exchange) \| [`ExchangeEUR`](../enums/base.CeloContract.md#exchangeeur) \| [`ExchangeBRL`](../enums/base.CeloContract.md#exchangebrl) \| [`GasPriceMinimum`](../enums/base.CeloContract.md#gaspriceminimum) \| [`GoldToken`](../enums/base.CeloContract.md#goldtoken) \| [`StableToken`](../enums/base.CeloContract.md#stabletoken) \| [`StableTokenEUR`](../enums/base.CeloContract.md#stabletokeneur) \| [`StableTokenBRL`](../enums/base.CeloContract.md#stabletokenbrl) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `contract` | `C` |

#### Returns

`void`

#### Defined in

[packages/sdk/contractkit/src/mini-contract-cache.ts:154](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/mini-contract-cache.ts#L154)
