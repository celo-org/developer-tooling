[@celo/contractkit](../README.md) / [Exports](../modules.md) / [web3-contract-cache](../modules/web3_contract_cache.md) / Web3ContractCache

# Class: Web3ContractCache

[web3-contract-cache](../modules/web3_contract_cache.md).Web3ContractCache

Native Web3 contracts factory and cache.

Exposes accessors to all `CeloContract` web3 contracts.

Mostly a private cache, kit users would normally use
a contract wrapper

## Table of contents

### Constructors

- [constructor](web3_contract_cache.Web3ContractCache.md#constructor)

### Properties

- [registry](web3_contract_cache.Web3ContractCache.md#registry)

### Methods

- [getAccounts](web3_contract_cache.Web3ContractCache.md#getaccounts)
- [getAttestations](web3_contract_cache.Web3ContractCache.md#getattestations)
- [getBlockchainParameters](web3_contract_cache.Web3ContractCache.md#getblockchainparameters)
- [getCeloToken](web3_contract_cache.Web3ContractCache.md#getcelotoken)
- [getCeloUnreleasedTreasury](web3_contract_cache.Web3ContractCache.md#getcelounreleasedtreasury)
- [getContract](web3_contract_cache.Web3ContractCache.md#getcontract)
- [getDoubleSigningSlasher](web3_contract_cache.Web3ContractCache.md#getdoublesigningslasher)
- [getDowntimeSlasher](web3_contract_cache.Web3ContractCache.md#getdowntimeslasher)
- [getElection](web3_contract_cache.Web3ContractCache.md#getelection)
- [getEpochManager](web3_contract_cache.Web3ContractCache.md#getepochmanager)
- [getEpochManagerEnabler](web3_contract_cache.Web3ContractCache.md#getepochmanagerenabler)
- [getEpochRewards](web3_contract_cache.Web3ContractCache.md#getepochrewards)
- [getErc20](web3_contract_cache.Web3ContractCache.md#geterc20)
- [getEscrow](web3_contract_cache.Web3ContractCache.md#getescrow)
- [getFederatedAttestations](web3_contract_cache.Web3ContractCache.md#getfederatedattestations)
- [getFeeCurrencyWhitelist](web3_contract_cache.Web3ContractCache.md#getfeecurrencywhitelist)
- [getFeeHandler](web3_contract_cache.Web3ContractCache.md#getfeehandler)
- [getFreezer](web3_contract_cache.Web3ContractCache.md#getfreezer)
- [getGasPriceMinimum](web3_contract_cache.Web3ContractCache.md#getgaspriceminimum)
- [getGoldToken](web3_contract_cache.Web3ContractCache.md#getgoldtoken)
- [getGovernance](web3_contract_cache.Web3ContractCache.md#getgovernance)
- [getLockedCelo](web3_contract_cache.Web3ContractCache.md#getlockedcelo)
- [getLockedGold](web3_contract_cache.Web3ContractCache.md#getlockedgold)
- [getMultiSig](web3_contract_cache.Web3ContractCache.md#getmultisig)
- [getOdisPayments](web3_contract_cache.Web3ContractCache.md#getodispayments)
- [getRandom](web3_contract_cache.Web3ContractCache.md#getrandom)
- [getRegistry](web3_contract_cache.Web3ContractCache.md#getregistry)
- [getReserve](web3_contract_cache.Web3ContractCache.md#getreserve)
- [getScoreManager](web3_contract_cache.Web3ContractCache.md#getscoremanager)
- [getSortedOracles](web3_contract_cache.Web3ContractCache.md#getsortedoracles)
- [getStableToken](web3_contract_cache.Web3ContractCache.md#getstabletoken)
- [getValidators](web3_contract_cache.Web3ContractCache.md#getvalidators)
- [invalidateContract](web3_contract_cache.Web3ContractCache.md#invalidatecontract)

## Constructors

### constructor

• **new Web3ContractCache**(`registry`): [`Web3ContractCache`](web3_contract_cache.Web3ContractCache.md)

core contract's address registry

#### Parameters

| Name | Type |
| :------ | :------ |
| `registry` | [`AddressRegistry`](address_registry.AddressRegistry.md) |

#### Returns

[`Web3ContractCache`](web3_contract_cache.Web3ContractCache.md)

#### Defined in

[packages/sdk/contractkit/src/web3-contract-cache.ts:100](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/web3-contract-cache.ts#L100)

## Properties

### registry

• `Readonly` **registry**: [`AddressRegistry`](address_registry.AddressRegistry.md)

#### Defined in

[packages/sdk/contractkit/src/web3-contract-cache.ts:100](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/web3-contract-cache.ts#L100)

## Methods

### getAccounts

▸ **getAccounts**(): `Promise`\<`Accounts`\>

#### Returns

`Promise`\<`Accounts`\>

#### Defined in

[packages/sdk/contractkit/src/web3-contract-cache.ts:101](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/web3-contract-cache.ts#L101)

___

### getAttestations

▸ **getAttestations**(): `Promise`\<`Attestations`\>

#### Returns

`Promise`\<`Attestations`\>

#### Defined in

[packages/sdk/contractkit/src/web3-contract-cache.ts:104](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/web3-contract-cache.ts#L104)

___

### getBlockchainParameters

▸ **getBlockchainParameters**(): `Promise`\<`BlockchainParameters`\>

#### Returns

`Promise`\<`BlockchainParameters`\>

#### Defined in

[packages/sdk/contractkit/src/web3-contract-cache.ts:107](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/web3-contract-cache.ts#L107)

___

### getCeloToken

▸ **getCeloToken**(): `Promise`\<`GoldToken`\>

#### Returns

`Promise`\<`GoldToken`\>

#### Defined in

[packages/sdk/contractkit/src/web3-contract-cache.ts:157](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/web3-contract-cache.ts#L157)

___

### getCeloUnreleasedTreasury

▸ **getCeloUnreleasedTreasury**(): `Promise`\<`CeloUnreleasedTreasury`\>

#### Returns

`Promise`\<`CeloUnreleasedTreasury`\>

#### Defined in

[packages/sdk/contractkit/src/web3-contract-cache.ts:110](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/web3-contract-cache.ts#L110)

___

### getContract

▸ **getContract**\<`C`\>(`contract`, `address?`): `Promise`\<`NonNullable`\<`ContractCacheMap`[`C`]\>\>

Get native web3 contract wrapper

#### Type parameters

| Name | Type |
| :------ | :------ |
| `C` | extends `CeloContract` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `contract` | `C` |
| `address?` | `string` |

#### Returns

`Promise`\<`NonNullable`\<`ContractCacheMap`[`C`]\>\>

#### Defined in

[packages/sdk/contractkit/src/web3-contract-cache.ts:201](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/web3-contract-cache.ts#L201)

___

### getDoubleSigningSlasher

▸ **getDoubleSigningSlasher**(): `Promise`\<`DoubleSigningSlasher`\>

#### Returns

`Promise`\<`DoubleSigningSlasher`\>

#### Defined in

[packages/sdk/contractkit/src/web3-contract-cache.ts:113](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/web3-contract-cache.ts#L113)

___

### getDowntimeSlasher

▸ **getDowntimeSlasher**(): `Promise`\<`DowntimeSlasher`\>

#### Returns

`Promise`\<`DowntimeSlasher`\>

#### Defined in

[packages/sdk/contractkit/src/web3-contract-cache.ts:116](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/web3-contract-cache.ts#L116)

___

### getElection

▸ **getElection**(): `Promise`\<`Election`\>

#### Returns

`Promise`\<`Election`\>

#### Defined in

[packages/sdk/contractkit/src/web3-contract-cache.ts:119](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/web3-contract-cache.ts#L119)

___

### getEpochManager

▸ **getEpochManager**(): `Promise`\<`EpochManager`\>

#### Returns

`Promise`\<`EpochManager`\>

#### Defined in

[packages/sdk/contractkit/src/web3-contract-cache.ts:122](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/web3-contract-cache.ts#L122)

___

### getEpochManagerEnabler

▸ **getEpochManagerEnabler**(): `Promise`\<`EpochManagerEnabler`\>

#### Returns

`Promise`\<`EpochManagerEnabler`\>

#### Defined in

[packages/sdk/contractkit/src/web3-contract-cache.ts:125](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/web3-contract-cache.ts#L125)

___

### getEpochRewards

▸ **getEpochRewards**(): `Promise`\<`EpochRewards`\>

#### Returns

`Promise`\<`EpochRewards`\>

#### Defined in

[packages/sdk/contractkit/src/web3-contract-cache.ts:128](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/web3-contract-cache.ts#L128)

___

### getErc20

▸ **getErc20**(`address`): `Promise`\<`IERC20`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |

#### Returns

`Promise`\<`IERC20`\>

#### Defined in

[packages/sdk/contractkit/src/web3-contract-cache.ts:131](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/web3-contract-cache.ts#L131)

___

### getEscrow

▸ **getEscrow**(): `Promise`\<`Escrow`\>

#### Returns

`Promise`\<`Escrow`\>

#### Defined in

[packages/sdk/contractkit/src/web3-contract-cache.ts:134](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/web3-contract-cache.ts#L134)

___

### getFederatedAttestations

▸ **getFederatedAttestations**(): `Promise`\<`FederatedAttestations`\>

#### Returns

`Promise`\<`FederatedAttestations`\>

#### Defined in

[packages/sdk/contractkit/src/web3-contract-cache.ts:138](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/web3-contract-cache.ts#L138)

___

### getFeeCurrencyWhitelist

▸ **getFeeCurrencyWhitelist**(): `Promise`\<`FeeCurrencyWhitelist`\>

#### Returns

`Promise`\<`FeeCurrencyWhitelist`\>

#### Defined in

[packages/sdk/contractkit/src/web3-contract-cache.ts:141](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/web3-contract-cache.ts#L141)

___

### getFeeHandler

▸ **getFeeHandler**(): `Promise`\<`FeeHandler`\>

#### Returns

`Promise`\<`FeeHandler`\>

#### Defined in

[packages/sdk/contractkit/src/web3-contract-cache.ts:147](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/web3-contract-cache.ts#L147)

___

### getFreezer

▸ **getFreezer**(): `Promise`\<`Freezer`\>

#### Returns

`Promise`\<`Freezer`\>

#### Defined in

[packages/sdk/contractkit/src/web3-contract-cache.ts:144](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/web3-contract-cache.ts#L144)

___

### getGasPriceMinimum

▸ **getGasPriceMinimum**(): `Promise`\<`GasPriceMinimum`\>

#### Returns

`Promise`\<`GasPriceMinimum`\>

#### Defined in

[packages/sdk/contractkit/src/web3-contract-cache.ts:150](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/web3-contract-cache.ts#L150)

___

### getGoldToken

▸ **getGoldToken**(): `Promise`\<`GoldToken`\>

#### Returns

`Promise`\<`GoldToken`\>

#### Defined in

[packages/sdk/contractkit/src/web3-contract-cache.ts:154](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/web3-contract-cache.ts#L154)

___

### getGovernance

▸ **getGovernance**(): `Promise`\<`Governance`\>

#### Returns

`Promise`\<`Governance`\>

#### Defined in

[packages/sdk/contractkit/src/web3-contract-cache.ts:160](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/web3-contract-cache.ts#L160)

___

### getLockedCelo

▸ **getLockedCelo**(): `Promise`\<`LockedGold`\>

#### Returns

`Promise`\<`LockedGold`\>

#### Defined in

[packages/sdk/contractkit/src/web3-contract-cache.ts:167](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/web3-contract-cache.ts#L167)

___

### getLockedGold

▸ **getLockedGold**(): `Promise`\<`LockedGold`\>

#### Returns

`Promise`\<`LockedGold`\>

#### Defined in

[packages/sdk/contractkit/src/web3-contract-cache.ts:164](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/web3-contract-cache.ts#L164)

___

### getMultiSig

▸ **getMultiSig**(`address`): `Promise`\<`MultiSig`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |

#### Returns

`Promise`\<`MultiSig`\>

#### Defined in

[packages/sdk/contractkit/src/web3-contract-cache.ts:170](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/web3-contract-cache.ts#L170)

___

### getOdisPayments

▸ **getOdisPayments**(): `Promise`\<`OdisPayments`\>

#### Returns

`Promise`\<`OdisPayments`\>

#### Defined in

[packages/sdk/contractkit/src/web3-contract-cache.ts:173](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/web3-contract-cache.ts#L173)

___

### getRandom

▸ **getRandom**(): `Promise`\<`Random`\>

#### Returns

`Promise`\<`Random`\>

#### Defined in

[packages/sdk/contractkit/src/web3-contract-cache.ts:176](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/web3-contract-cache.ts#L176)

___

### getRegistry

▸ **getRegistry**(): `Promise`\<`Registry`\>

#### Returns

`Promise`\<`Registry`\>

#### Defined in

[packages/sdk/contractkit/src/web3-contract-cache.ts:179](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/web3-contract-cache.ts#L179)

___

### getReserve

▸ **getReserve**(): `Promise`\<`Reserve`\>

#### Returns

`Promise`\<`Reserve`\>

#### Defined in

[packages/sdk/contractkit/src/web3-contract-cache.ts:182](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/web3-contract-cache.ts#L182)

___

### getScoreManager

▸ **getScoreManager**(): `Promise`\<`ScoreManager`\>

#### Returns

`Promise`\<`ScoreManager`\>

#### Defined in

[packages/sdk/contractkit/src/web3-contract-cache.ts:185](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/web3-contract-cache.ts#L185)

___

### getSortedOracles

▸ **getSortedOracles**(): `Promise`\<`SortedOracles`\>

#### Returns

`Promise`\<`SortedOracles`\>

#### Defined in

[packages/sdk/contractkit/src/web3-contract-cache.ts:188](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/web3-contract-cache.ts#L188)

___

### getStableToken

▸ **getStableToken**(`stableToken?`): `Promise`\<`NonNullable`\<`undefined` \| `Registry` \| `Accounts` \| `IERC20` \| `GoldToken` \| `StableToken` \| `Attestations` \| `BlockchainParameters` \| `CeloUnreleasedTreasury` \| `DoubleSigningSlasher` \| `DowntimeSlasher` \| `Election` \| `EpochManager` \| `EpochManagerEnabler` \| `EpochRewards` \| `Escrow` \| `FederatedAttestations` \| `FeeCurrencyDirectory` \| `FeeCurrencyWhitelist` \| `Freezer` \| `FeeHandler` \| `MentoFeeHandlerSeller` \| `UniswapFeeHandlerSeller` \| `GasPriceMinimum` \| `Governance` \| `GovernanceSlasher` \| `LockedGold` \| `MultiSig` \| `OdisPayments` \| `Random` \| `Reserve` \| `ScoreManager` \| `SortedOracles` \| `Validators`\>\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `stableToken` | [`StableToken`](../enums/celo_tokens.StableToken.md) | `StableToken.cUSD` |

#### Returns

`Promise`\<`NonNullable`\<`undefined` \| `Registry` \| `Accounts` \| `IERC20` \| `GoldToken` \| `StableToken` \| `Attestations` \| `BlockchainParameters` \| `CeloUnreleasedTreasury` \| `DoubleSigningSlasher` \| `DowntimeSlasher` \| `Election` \| `EpochManager` \| `EpochManagerEnabler` \| `EpochRewards` \| `Escrow` \| `FederatedAttestations` \| `FeeCurrencyDirectory` \| `FeeCurrencyWhitelist` \| `Freezer` \| `FeeHandler` \| `MentoFeeHandlerSeller` \| `UniswapFeeHandlerSeller` \| `GasPriceMinimum` \| `Governance` \| `GovernanceSlasher` \| `LockedGold` \| `MultiSig` \| `OdisPayments` \| `Random` \| `Reserve` \| `ScoreManager` \| `SortedOracles` \| `Validators`\>\>

#### Defined in

[packages/sdk/contractkit/src/web3-contract-cache.ts:191](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/web3-contract-cache.ts#L191)

___

### getValidators

▸ **getValidators**(): `Promise`\<`Validators`\>

#### Returns

`Promise`\<`Validators`\>

#### Defined in

[packages/sdk/contractkit/src/web3-contract-cache.ts:194](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/web3-contract-cache.ts#L194)

___

### invalidateContract

▸ **invalidateContract**\<`C`\>(`contract`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `C` | extends `CeloContract` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `contract` | `C` |

#### Returns

`void`

#### Defined in

[packages/sdk/contractkit/src/web3-contract-cache.ts:220](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/web3-contract-cache.ts#L220)
