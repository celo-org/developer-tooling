[**@celo/contractkit**](../../README.md)

***

[@celo/contractkit](../../modules.md) / [mini-contract-cache](../README.md) / MiniContractCache

# Class: MiniContractCache

Defined in: [packages/sdk/contractkit/src/mini-contract-cache.ts:63](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/mini-contract-cache.ts#L63)

Alternative Contract Cache with Minimal Contracts

Provides access to a subset of wrappers: [AccountsWrapper](../../wrappers/Accounts/classes/AccountsWrapper.md), GasPriceMinimumWrapper and Celo Token contracts
Used internally by MiniContractKit

## Param

– Connection

## Param

– [AddressRegistry](../../address-registry/classes/AddressRegistry.md)

## Implements

- [`ContractCacheType`](../../basic-contract-cache-type/interfaces/ContractCacheType.md)

## Constructors

### Constructor

> **new MiniContractCache**(`connection`, `registry`, `contractClasses`): `MiniContractCache`

Defined in: [packages/sdk/contractkit/src/mini-contract-cache.ts:66](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/mini-contract-cache.ts#L66)

#### Parameters

##### connection

`Connection`

##### registry

[`AddressRegistry`](../../address-registry/classes/AddressRegistry.md)

##### contractClasses

###### Accounts

\{ `newInstance`: (`web3`, `address`) => `Accounts`; `wrapper`: *typeof* [`AccountsWrapper`](../../wrappers/Accounts/classes/AccountsWrapper.md); \} = `...`

###### Accounts.newInstance

(`web3`, `address`) => `Accounts` = `newAccounts`

###### Accounts.wrapper

*typeof* [`AccountsWrapper`](../../wrappers/Accounts/classes/AccountsWrapper.md) = `AccountsWrapper`

###### CeloToken

\{ `newInstance`: (`web3`, `address`) => `GoldToken`; `wrapper`: *typeof* [`GoldTokenWrapper`](../../wrappers/GoldTokenWrapper/classes/GoldTokenWrapper.md); \} = `...`

###### CeloToken.newInstance

(`web3`, `address`) => `GoldToken` = `newGoldToken`

###### CeloToken.wrapper

*typeof* [`GoldTokenWrapper`](../../wrappers/GoldTokenWrapper/classes/GoldTokenWrapper.md) = `GoldTokenWrapper`

###### StableToken

\{ `newInstance`: (`web3`, `address`) => `StableToken`; `wrapper`: *typeof* [`StableTokenWrapper`](../../wrappers/StableTokenWrapper/classes/StableTokenWrapper.md); \} = `...`

###### StableToken.newInstance

(`web3`, `address`) => `StableToken` = `newStableToken`

###### StableToken.wrapper

*typeof* [`StableTokenWrapper`](../../wrappers/StableTokenWrapper/classes/StableTokenWrapper.md) = `StableTokenWrapper`

###### StableTokenBRL

\{ `newInstance`: (`web3`, `address`) => `StableTokenBRL`; `wrapper`: *typeof* [`StableTokenWrapper`](../../wrappers/StableTokenWrapper/classes/StableTokenWrapper.md); \} = `...`

###### StableTokenBRL.newInstance

(`web3`, `address`) => `StableTokenBRL` = `newStableTokenBRL`

###### StableTokenBRL.wrapper

*typeof* [`StableTokenWrapper`](../../wrappers/StableTokenWrapper/classes/StableTokenWrapper.md) = `StableTokenWrapper`

###### StableTokenEUR

\{ `newInstance`: (`web3`, `address`) => `StableTokenEUR`; `wrapper`: *typeof* [`StableTokenWrapper`](../../wrappers/StableTokenWrapper/classes/StableTokenWrapper.md); \} = `...`

###### StableTokenEUR.newInstance

(`web3`, `address`) => `StableTokenEUR` = `newStableTokenEUR`

###### StableTokenEUR.wrapper

*typeof* [`StableTokenWrapper`](../../wrappers/StableTokenWrapper/classes/StableTokenWrapper.md) = `StableTokenWrapper`

#### Returns

`MiniContractCache`

## Properties

### connection

> `readonly` **connection**: `Connection`

Defined in: [packages/sdk/contractkit/src/mini-contract-cache.ts:67](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/mini-contract-cache.ts#L67)

***

### registry

> `readonly` **registry**: [`AddressRegistry`](../../address-registry/classes/AddressRegistry.md)

Defined in: [packages/sdk/contractkit/src/mini-contract-cache.ts:68](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/mini-contract-cache.ts#L68)

## Methods

### getAccounts()

> **getAccounts**(): `Promise`\<[`AccountsWrapper`](../../wrappers/Accounts/classes/AccountsWrapper.md)\>

Defined in: [packages/sdk/contractkit/src/mini-contract-cache.ts:72](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/mini-contract-cache.ts#L72)

#### Returns

`Promise`\<[`AccountsWrapper`](../../wrappers/Accounts/classes/AccountsWrapper.md)\>

#### Implementation of

[`ContractCacheType`](../../basic-contract-cache-type/interfaces/ContractCacheType.md).[`getAccounts`](../../basic-contract-cache-type/interfaces/ContractCacheType.md#getaccounts)

***

### getContract()

> **getContract**\<`ContractKey`\>(`contract`, `address?`): `Promise`\<`InstanceType`\<`object`\[`ContractKey`\]\[`"wrapper"`\]\>\>

Defined in: [packages/sdk/contractkit/src/mini-contract-cache.ts:87](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/mini-contract-cache.ts#L87)

Get Contract wrapper

#### Type Parameters

##### ContractKey

`ContractKey` *extends* [`Accounts`](../../base/enumerations/CeloContract.md#accounts) \| [`CeloToken`](../../base/enumerations/CeloContract.md#celotoken) \| [`StableToken`](../../base/enumerations/CeloContract.md#stabletoken) \| [`StableTokenEUR`](../../base/enumerations/CeloContract.md#stabletokeneur) \| [`StableTokenBRL`](../../base/enumerations/CeloContract.md#stabletokenbrl)

#### Parameters

##### contract

`ContractKey`

##### address?

`string`

#### Returns

`Promise`\<`InstanceType`\<`object`\[`ContractKey`\]\[`"wrapper"`\]\>\>

#### Implementation of

[`ContractCacheType`](../../basic-contract-cache-type/interfaces/ContractCacheType.md).[`getContract`](../../basic-contract-cache-type/interfaces/ContractCacheType.md#getcontract)

***

### getGoldToken()

> **getGoldToken**(): `Promise`\<[`GoldTokenWrapper`](../../wrappers/GoldTokenWrapper/classes/GoldTokenWrapper.md)\>

Defined in: [packages/sdk/contractkit/src/mini-contract-cache.ts:76](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/mini-contract-cache.ts#L76)

#### Returns

`Promise`\<[`GoldTokenWrapper`](../../wrappers/GoldTokenWrapper/classes/GoldTokenWrapper.md)\>

#### Implementation of

[`ContractCacheType`](../../basic-contract-cache-type/interfaces/ContractCacheType.md).[`getGoldToken`](../../basic-contract-cache-type/interfaces/ContractCacheType.md#getgoldtoken)

***

### getStableToken()

> **getStableToken**(`stableToken`): `Promise`\<[`StableTokenWrapper`](../../wrappers/StableTokenWrapper/classes/StableTokenWrapper.md)\>

Defined in: [packages/sdk/contractkit/src/mini-contract-cache.ts:80](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/mini-contract-cache.ts#L80)

#### Parameters

##### stableToken

[`StableToken`](../../celo-tokens/enumerations/StableToken.md) = `StableToken.cUSD`

#### Returns

`Promise`\<[`StableTokenWrapper`](../../wrappers/StableTokenWrapper/classes/StableTokenWrapper.md)\>

#### Implementation of

[`ContractCacheType`](../../basic-contract-cache-type/interfaces/ContractCacheType.md).[`getStableToken`](../../basic-contract-cache-type/interfaces/ContractCacheType.md#getstabletoken)

***

### invalidateContract()

> **invalidateContract**\<`C`\>(`contract`): `void`

Defined in: [packages/sdk/contractkit/src/mini-contract-cache.ts:127](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/mini-contract-cache.ts#L127)

#### Type Parameters

##### C

`C` *extends* [`Accounts`](../../base/enumerations/CeloContract.md#accounts) \| [`CeloToken`](../../base/enumerations/CeloContract.md#celotoken) \| [`StableToken`](../../base/enumerations/CeloContract.md#stabletoken) \| [`StableTokenEUR`](../../base/enumerations/CeloContract.md#stabletokeneur) \| [`StableTokenBRL`](../../base/enumerations/CeloContract.md#stabletokenbrl)

#### Parameters

##### contract

`C`

#### Returns

`void`
