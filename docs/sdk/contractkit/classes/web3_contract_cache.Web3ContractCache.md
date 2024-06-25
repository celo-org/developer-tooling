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
- [getContract](web3_contract_cache.Web3ContractCache.md#getcontract)
- [getDoubleSigningSlasher](web3_contract_cache.Web3ContractCache.md#getdoublesigningslasher)
- [getDowntimeSlasher](web3_contract_cache.Web3ContractCache.md#getdowntimeslasher)
- [getElection](web3_contract_cache.Web3ContractCache.md#getelection)
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
- [getLockedGold](web3_contract_cache.Web3ContractCache.md#getlockedgold)
- [getMultiSig](web3_contract_cache.Web3ContractCache.md#getmultisig)
- [getOdisPayments](web3_contract_cache.Web3ContractCache.md#getodispayments)
- [getRandom](web3_contract_cache.Web3ContractCache.md#getrandom)
- [getRegistry](web3_contract_cache.Web3ContractCache.md#getregistry)
- [getReserve](web3_contract_cache.Web3ContractCache.md#getreserve)
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

[packages/sdk/contractkit/src/web3-contract-cache.ts:92](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/web3-contract-cache.ts#L92)

## Properties

### registry

• `Readonly` **registry**: [`AddressRegistry`](address_registry.AddressRegistry.md)

#### Defined in

[packages/sdk/contractkit/src/web3-contract-cache.ts:92](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/web3-contract-cache.ts#L92)

## Methods

### getAccounts

▸ **getAccounts**(): `Promise`\<`Accounts`\>

#### Returns

`Promise`\<`Accounts`\>

#### Defined in

[packages/sdk/contractkit/src/web3-contract-cache.ts:93](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/web3-contract-cache.ts#L93)

___

### getAttestations

▸ **getAttestations**(): `Promise`\<`Attestations`\>

#### Returns

`Promise`\<`Attestations`\>

#### Defined in

[packages/sdk/contractkit/src/web3-contract-cache.ts:96](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/web3-contract-cache.ts#L96)

___

### getBlockchainParameters

▸ **getBlockchainParameters**(): `Promise`\<`BlockchainParameters`\>

#### Returns

`Promise`\<`BlockchainParameters`\>

#### Defined in

[packages/sdk/contractkit/src/web3-contract-cache.ts:99](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/web3-contract-cache.ts#L99)

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

[packages/sdk/contractkit/src/web3-contract-cache.ts:174](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/web3-contract-cache.ts#L174)

___

### getDoubleSigningSlasher

▸ **getDoubleSigningSlasher**(): `Promise`\<`DoubleSigningSlasher`\>

#### Returns

`Promise`\<`DoubleSigningSlasher`\>

#### Defined in

[packages/sdk/contractkit/src/web3-contract-cache.ts:102](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/web3-contract-cache.ts#L102)

___

### getDowntimeSlasher

▸ **getDowntimeSlasher**(): `Promise`\<`DowntimeSlasher`\>

#### Returns

`Promise`\<`DowntimeSlasher`\>

#### Defined in

[packages/sdk/contractkit/src/web3-contract-cache.ts:105](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/web3-contract-cache.ts#L105)

___

### getElection

▸ **getElection**(): `Promise`\<`Election`\>

#### Returns

`Promise`\<`Election`\>

#### Defined in

[packages/sdk/contractkit/src/web3-contract-cache.ts:108](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/web3-contract-cache.ts#L108)

___

### getEpochRewards

▸ **getEpochRewards**(): `Promise`\<`EpochRewards`\>

#### Returns

`Promise`\<`EpochRewards`\>

#### Defined in

[packages/sdk/contractkit/src/web3-contract-cache.ts:111](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/web3-contract-cache.ts#L111)

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

[packages/sdk/contractkit/src/web3-contract-cache.ts:114](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/web3-contract-cache.ts#L114)

___

### getEscrow

▸ **getEscrow**(): `Promise`\<`Escrow`\>

#### Returns

`Promise`\<`Escrow`\>

#### Defined in

[packages/sdk/contractkit/src/web3-contract-cache.ts:117](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/web3-contract-cache.ts#L117)

___

### getFederatedAttestations

▸ **getFederatedAttestations**(): `Promise`\<`FederatedAttestations`\>

#### Returns

`Promise`\<`FederatedAttestations`\>

#### Defined in

[packages/sdk/contractkit/src/web3-contract-cache.ts:121](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/web3-contract-cache.ts#L121)

___

### getFeeCurrencyWhitelist

▸ **getFeeCurrencyWhitelist**(): `Promise`\<`FeeCurrencyWhitelist`\>

#### Returns

`Promise`\<`FeeCurrencyWhitelist`\>

#### Defined in

[packages/sdk/contractkit/src/web3-contract-cache.ts:124](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/web3-contract-cache.ts#L124)

___

### getFeeHandler

▸ **getFeeHandler**(): `Promise`\<`FeeHandler`\>

#### Returns

`Promise`\<`FeeHandler`\>

#### Defined in

[packages/sdk/contractkit/src/web3-contract-cache.ts:130](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/web3-contract-cache.ts#L130)

___

### getFreezer

▸ **getFreezer**(): `Promise`\<`Freezer`\>

#### Returns

`Promise`\<`Freezer`\>

#### Defined in

[packages/sdk/contractkit/src/web3-contract-cache.ts:127](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/web3-contract-cache.ts#L127)

___

### getGasPriceMinimum

▸ **getGasPriceMinimum**(): `Promise`\<`GasPriceMinimum`\>

#### Returns

`Promise`\<`GasPriceMinimum`\>

#### Defined in

[packages/sdk/contractkit/src/web3-contract-cache.ts:133](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/web3-contract-cache.ts#L133)

___

### getGoldToken

▸ **getGoldToken**(): `Promise`\<`GoldToken`\>

#### Returns

`Promise`\<`GoldToken`\>

#### Defined in

[packages/sdk/contractkit/src/web3-contract-cache.ts:136](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/web3-contract-cache.ts#L136)

___

### getGovernance

▸ **getGovernance**(): `Promise`\<`Governance`\>

#### Returns

`Promise`\<`Governance`\>

#### Defined in

[packages/sdk/contractkit/src/web3-contract-cache.ts:139](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/web3-contract-cache.ts#L139)

___

### getLockedGold

▸ **getLockedGold**(): `Promise`\<`LockedGold`\>

#### Returns

`Promise`\<`LockedGold`\>

#### Defined in

[packages/sdk/contractkit/src/web3-contract-cache.ts:143](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/web3-contract-cache.ts#L143)

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

[packages/sdk/contractkit/src/web3-contract-cache.ts:146](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/web3-contract-cache.ts#L146)

___

### getOdisPayments

▸ **getOdisPayments**(): `Promise`\<`OdisPayments`\>

#### Returns

`Promise`\<`OdisPayments`\>

#### Defined in

[packages/sdk/contractkit/src/web3-contract-cache.ts:149](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/web3-contract-cache.ts#L149)

___

### getRandom

▸ **getRandom**(): `Promise`\<`Random`\>

#### Returns

`Promise`\<`Random`\>

#### Defined in

[packages/sdk/contractkit/src/web3-contract-cache.ts:152](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/web3-contract-cache.ts#L152)

___

### getRegistry

▸ **getRegistry**(): `Promise`\<`Registry`\>

#### Returns

`Promise`\<`Registry`\>

#### Defined in

[packages/sdk/contractkit/src/web3-contract-cache.ts:155](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/web3-contract-cache.ts#L155)

___

### getReserve

▸ **getReserve**(): `Promise`\<`Reserve`\>

#### Returns

`Promise`\<`Reserve`\>

#### Defined in

[packages/sdk/contractkit/src/web3-contract-cache.ts:158](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/web3-contract-cache.ts#L158)

___

### getSortedOracles

▸ **getSortedOracles**(): `Promise`\<`SortedOracles`\>

#### Returns

`Promise`\<`SortedOracles`\>

#### Defined in

[packages/sdk/contractkit/src/web3-contract-cache.ts:161](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/web3-contract-cache.ts#L161)

___

### getStableToken

▸ **getStableToken**(`stableToken?`): `Promise`\<`NonNullable`\<`undefined` \| `Registry` \| `Accounts` \| `IERC20` \| `GoldToken` \| `StableToken` \| `Attestations` \| `BlockchainParameters` \| `DoubleSigningSlasher` \| `DowntimeSlasher` \| `Election` \| `EpochRewards` \| `Escrow` \| `FederatedAttestations` \| `FeeCurrencyDirectory` \| `FeeCurrencyWhitelist` \| `Freezer` \| `FeeHandler` \| `MentoFeeHandlerSeller` \| `UniswapFeeHandlerSeller` \| `GasPriceMinimum` \| `Governance` \| `LockedGold` \| `MultiSig` \| `OdisPayments` \| `Random` \| `Reserve` \| `SortedOracles` \| `Validators`\>\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `stableToken` | [`StableToken`](../enums/celo_tokens.StableToken.md) | `StableToken.cUSD` |

#### Returns

`Promise`\<`NonNullable`\<`undefined` \| `Registry` \| `Accounts` \| `IERC20` \| `GoldToken` \| `StableToken` \| `Attestations` \| `BlockchainParameters` \| `DoubleSigningSlasher` \| `DowntimeSlasher` \| `Election` \| `EpochRewards` \| `Escrow` \| `FederatedAttestations` \| `FeeCurrencyDirectory` \| `FeeCurrencyWhitelist` \| `Freezer` \| `FeeHandler` \| `MentoFeeHandlerSeller` \| `UniswapFeeHandlerSeller` \| `GasPriceMinimum` \| `Governance` \| `LockedGold` \| `MultiSig` \| `OdisPayments` \| `Random` \| `Reserve` \| `SortedOracles` \| `Validators`\>\>

#### Defined in

[packages/sdk/contractkit/src/web3-contract-cache.ts:164](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/web3-contract-cache.ts#L164)

___

### getValidators

▸ **getValidators**(): `Promise`\<`Validators`\>

#### Returns

`Promise`\<`Validators`\>

#### Defined in

[packages/sdk/contractkit/src/web3-contract-cache.ts:167](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/web3-contract-cache.ts#L167)

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

[packages/sdk/contractkit/src/web3-contract-cache.ts:193](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/web3-contract-cache.ts#L193)
