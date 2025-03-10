[@celo/contractkit](../README.md) / [Exports](../modules.md) / [contract-cache](../modules/contract_cache.md) / WrapperCache

# Class: WrapperCache

[contract-cache](../modules/contract_cache.md).WrapperCache

Kit ContractWrappers factory & cache.

Provides access to all contract wrappers for celo core contracts

**`Remarks`**

Because it provides access to all contract wrappers it must load all wrappers and the contract ABIs for them
Consider Using MiniWrapperCache, building your own, or if you only need one Wrapper using it directly

## Implements

- [`ContractCacheType`](../interfaces/basic_contract_cache_type.ContractCacheType.md)

## Table of contents

### Constructors

- [constructor](contract_cache.WrapperCache.md#constructor)

### Properties

- [\_web3Contracts](contract_cache.WrapperCache.md#_web3contracts)
- [connection](contract_cache.WrapperCache.md#connection)
- [registry](contract_cache.WrapperCache.md#registry)

### Methods

- [getAccounts](contract_cache.WrapperCache.md#getaccounts)
- [getAttestations](contract_cache.WrapperCache.md#getattestations)
- [getBlockchainParameters](contract_cache.WrapperCache.md#getblockchainparameters)
- [getCeloToken](contract_cache.WrapperCache.md#getcelotoken)
- [getContract](contract_cache.WrapperCache.md#getcontract)
- [getDoubleSigningSlasher](contract_cache.WrapperCache.md#getdoublesigningslasher)
- [getDowntimeSlasher](contract_cache.WrapperCache.md#getdowntimeslasher)
- [getElection](contract_cache.WrapperCache.md#getelection)
- [getEpochManager](contract_cache.WrapperCache.md#getepochmanager)
- [getEpochRewards](contract_cache.WrapperCache.md#getepochrewards)
- [getErc20](contract_cache.WrapperCache.md#geterc20)
- [getEscrow](contract_cache.WrapperCache.md#getescrow)
- [getFederatedAttestations](contract_cache.WrapperCache.md#getfederatedattestations)
- [getFeeCurrencyDirectory](contract_cache.WrapperCache.md#getfeecurrencydirectory)
- [getFeeCurrencyWhitelist](contract_cache.WrapperCache.md#getfeecurrencywhitelist)
- [getFreezer](contract_cache.WrapperCache.md#getfreezer)
- [getGasPriceMinimum](contract_cache.WrapperCache.md#getgaspriceminimum)
- [getGoldToken](contract_cache.WrapperCache.md#getgoldtoken)
- [getGovernance](contract_cache.WrapperCache.md#getgovernance)
- [getLockedCelo](contract_cache.WrapperCache.md#getlockedcelo)
- [getLockedGold](contract_cache.WrapperCache.md#getlockedgold)
- [getMultiSig](contract_cache.WrapperCache.md#getmultisig)
- [getOdisPayments](contract_cache.WrapperCache.md#getodispayments)
- [getReserve](contract_cache.WrapperCache.md#getreserve)
- [getScoreManager](contract_cache.WrapperCache.md#getscoremanager)
- [getSortedOracles](contract_cache.WrapperCache.md#getsortedoracles)
- [getStableToken](contract_cache.WrapperCache.md#getstabletoken)
- [getValidators](contract_cache.WrapperCache.md#getvalidators)
- [invalidateContract](contract_cache.WrapperCache.md#invalidatecontract)

## Constructors

### constructor

• **new WrapperCache**(`connection`, `_web3Contracts`, `registry`): [`WrapperCache`](contract_cache.WrapperCache.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `connection` | `Connection` |
| `_web3Contracts` | [`Web3ContractCache`](web3_contract_cache.Web3ContractCache.md) |
| `registry` | [`AddressRegistry`](address_registry.AddressRegistry.md) |

#### Returns

[`WrapperCache`](contract_cache.WrapperCache.md)

#### Defined in

[packages/sdk/contractkit/src/contract-cache.ts:132](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/contract-cache.ts#L132)

## Properties

### \_web3Contracts

• `Readonly` **\_web3Contracts**: [`Web3ContractCache`](web3_contract_cache.Web3ContractCache.md)

#### Defined in

[packages/sdk/contractkit/src/contract-cache.ts:134](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/contract-cache.ts#L134)

___

### connection

• `Readonly` **connection**: `Connection`

#### Defined in

[packages/sdk/contractkit/src/contract-cache.ts:133](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/contract-cache.ts#L133)

___

### registry

• `Readonly` **registry**: [`AddressRegistry`](address_registry.AddressRegistry.md)

#### Defined in

[packages/sdk/contractkit/src/contract-cache.ts:135](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/contract-cache.ts#L135)

## Methods

### getAccounts

▸ **getAccounts**(): `Promise`\<[`AccountsWrapper`](wrappers_Accounts.AccountsWrapper.md)\>

#### Returns

`Promise`\<[`AccountsWrapper`](wrappers_Accounts.AccountsWrapper.md)\>

#### Implementation of

[ContractCacheType](../interfaces/basic_contract_cache_type.ContractCacheType.md).[getAccounts](../interfaces/basic_contract_cache_type.ContractCacheType.md#getaccounts)

#### Defined in

[packages/sdk/contractkit/src/contract-cache.ts:138](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/contract-cache.ts#L138)

___

### getAttestations

▸ **getAttestations**(): `Promise`\<[`AttestationsWrapper`](wrappers_Attestations.AttestationsWrapper.md)\>

#### Returns

`Promise`\<[`AttestationsWrapper`](wrappers_Attestations.AttestationsWrapper.md)\>

#### Defined in

[packages/sdk/contractkit/src/contract-cache.ts:141](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/contract-cache.ts#L141)

___

### getBlockchainParameters

▸ **getBlockchainParameters**(): `Promise`\<[`BlockchainParametersWrapper`](wrappers_BlockchainParameters.BlockchainParametersWrapper.md)\>

#### Returns

`Promise`\<[`BlockchainParametersWrapper`](wrappers_BlockchainParameters.BlockchainParametersWrapper.md)\>

#### Defined in

[packages/sdk/contractkit/src/contract-cache.ts:144](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/contract-cache.ts#L144)

___

### getCeloToken

▸ **getCeloToken**(): `Promise`\<[`GoldTokenWrapper`](wrappers_GoldTokenWrapper.GoldTokenWrapper.md)\>

#### Returns

`Promise`\<[`GoldTokenWrapper`](wrappers_GoldTokenWrapper.GoldTokenWrapper.md)\>

#### Defined in

[packages/sdk/contractkit/src/contract-cache.ts:188](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/contract-cache.ts#L188)

___

### getContract

▸ **getContract**\<`C`\>(`contract`, `address?`): `Promise`\<`NonNullable`\<`WrapperCacheMap`[`C`]\>\>

Get Contract wrapper

#### Type parameters

| Name | Type |
| :------ | :------ |
| `C` | extends [`ValidWrappers`](../modules/contract_cache.md#validwrappers) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `contract` | `C` |
| `address?` | `string` |

#### Returns

`Promise`\<`NonNullable`\<`WrapperCacheMap`[`C`]\>\>

#### Implementation of

[ContractCacheType](../interfaces/basic_contract_cache_type.ContractCacheType.md).[getContract](../interfaces/basic_contract_cache_type.ContractCacheType.md#getcontract)

#### Defined in

[packages/sdk/contractkit/src/contract-cache.ts:226](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/contract-cache.ts#L226)

___

### getDoubleSigningSlasher

▸ **getDoubleSigningSlasher**(): `Promise`\<[`DoubleSigningSlasherWrapper`](wrappers_DoubleSigningSlasher.DoubleSigningSlasherWrapper.md)\>

#### Returns

`Promise`\<[`DoubleSigningSlasherWrapper`](wrappers_DoubleSigningSlasher.DoubleSigningSlasherWrapper.md)\>

#### Defined in

[packages/sdk/contractkit/src/contract-cache.ts:147](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/contract-cache.ts#L147)

___

### getDowntimeSlasher

▸ **getDowntimeSlasher**(): `Promise`\<[`DowntimeSlasherWrapper`](wrappers_DowntimeSlasher.DowntimeSlasherWrapper.md)\>

#### Returns

`Promise`\<[`DowntimeSlasherWrapper`](wrappers_DowntimeSlasher.DowntimeSlasherWrapper.md)\>

#### Defined in

[packages/sdk/contractkit/src/contract-cache.ts:150](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/contract-cache.ts#L150)

___

### getElection

▸ **getElection**(): `Promise`\<[`ElectionWrapper`](wrappers_Election.ElectionWrapper.md)\>

#### Returns

`Promise`\<[`ElectionWrapper`](wrappers_Election.ElectionWrapper.md)\>

#### Defined in

[packages/sdk/contractkit/src/contract-cache.ts:153](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/contract-cache.ts#L153)

___

### getEpochManager

▸ **getEpochManager**(): `Promise`\<[`EpochManagerWrapper`](wrappers_EpochManager.EpochManagerWrapper.md)\>

#### Returns

`Promise`\<[`EpochManagerWrapper`](wrappers_EpochManager.EpochManagerWrapper.md)\>

#### Defined in

[packages/sdk/contractkit/src/contract-cache.ts:159](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/contract-cache.ts#L159)

___

### getEpochRewards

▸ **getEpochRewards**(): `Promise`\<[`EpochRewardsWrapper`](wrappers_EpochRewards.EpochRewardsWrapper.md)\>

#### Returns

`Promise`\<[`EpochRewardsWrapper`](wrappers_EpochRewards.EpochRewardsWrapper.md)\>

#### Defined in

[packages/sdk/contractkit/src/contract-cache.ts:156](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/contract-cache.ts#L156)

___

### getErc20

▸ **getErc20**(`address`): `Promise`\<[`Erc20Wrapper`](wrappers_Erc20Wrapper.Erc20Wrapper.md)\<`IERC20`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |

#### Returns

`Promise`\<[`Erc20Wrapper`](wrappers_Erc20Wrapper.Erc20Wrapper.md)\<`IERC20`\>\>

#### Defined in

[packages/sdk/contractkit/src/contract-cache.ts:162](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/contract-cache.ts#L162)

___

### getEscrow

▸ **getEscrow**(): `Promise`\<[`EscrowWrapper`](wrappers_Escrow.EscrowWrapper.md)\>

#### Returns

`Promise`\<[`EscrowWrapper`](wrappers_Escrow.EscrowWrapper.md)\>

#### Defined in

[packages/sdk/contractkit/src/contract-cache.ts:165](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/contract-cache.ts#L165)

___

### getFederatedAttestations

▸ **getFederatedAttestations**(): `Promise`\<[`FederatedAttestationsWrapper`](wrappers_FederatedAttestations.FederatedAttestationsWrapper.md)\>

#### Returns

`Promise`\<[`FederatedAttestationsWrapper`](wrappers_FederatedAttestations.FederatedAttestationsWrapper.md)\>

#### Defined in

[packages/sdk/contractkit/src/contract-cache.ts:172](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/contract-cache.ts#L172)

___

### getFeeCurrencyDirectory

▸ **getFeeCurrencyDirectory**(): `Promise`\<[`FeeCurrencyDirectoryWrapper`](wrappers_FeeCurrencyDirectoryWrapper.FeeCurrencyDirectoryWrapper.md)\>

#### Returns

`Promise`\<[`FeeCurrencyDirectoryWrapper`](wrappers_FeeCurrencyDirectoryWrapper.FeeCurrencyDirectoryWrapper.md)\>

#### Defined in

[packages/sdk/contractkit/src/contract-cache.ts:175](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/contract-cache.ts#L175)

___

### getFeeCurrencyWhitelist

▸ **getFeeCurrencyWhitelist**(): `Promise`\<[`FeeCurrencyWhitelistWrapper`](wrappers_FeeCurrencyWhitelistWrapper.FeeCurrencyWhitelistWrapper.md)\>

#### Returns

`Promise`\<[`FeeCurrencyWhitelistWrapper`](wrappers_FeeCurrencyWhitelistWrapper.FeeCurrencyWhitelistWrapper.md)\>

#### Defined in

[packages/sdk/contractkit/src/contract-cache.ts:178](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/contract-cache.ts#L178)

___

### getFreezer

▸ **getFreezer**(): `Promise`\<[`FreezerWrapper`](wrappers_Freezer.FreezerWrapper.md)\>

#### Returns

`Promise`\<[`FreezerWrapper`](wrappers_Freezer.FreezerWrapper.md)\>

#### Defined in

[packages/sdk/contractkit/src/contract-cache.ts:169](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/contract-cache.ts#L169)

___

### getGasPriceMinimum

▸ **getGasPriceMinimum**(): `Promise`\<[`GasPriceMinimumWrapper`](wrappers_GasPriceMinimum.GasPriceMinimumWrapper.md)\>

#### Returns

`Promise`\<[`GasPriceMinimumWrapper`](wrappers_GasPriceMinimum.GasPriceMinimumWrapper.md)\>

#### Defined in

[packages/sdk/contractkit/src/contract-cache.ts:181](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/contract-cache.ts#L181)

___

### getGoldToken

▸ **getGoldToken**(): `Promise`\<[`GoldTokenWrapper`](wrappers_GoldTokenWrapper.GoldTokenWrapper.md)\>

#### Returns

`Promise`\<[`GoldTokenWrapper`](wrappers_GoldTokenWrapper.GoldTokenWrapper.md)\>

#### Implementation of

[ContractCacheType](../interfaces/basic_contract_cache_type.ContractCacheType.md).[getGoldToken](../interfaces/basic_contract_cache_type.ContractCacheType.md#getgoldtoken)

#### Defined in

[packages/sdk/contractkit/src/contract-cache.ts:185](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/contract-cache.ts#L185)

___

### getGovernance

▸ **getGovernance**(): `Promise`\<[`GovernanceWrapper`](wrappers_Governance.GovernanceWrapper.md)\>

#### Returns

`Promise`\<[`GovernanceWrapper`](wrappers_Governance.GovernanceWrapper.md)\>

#### Defined in

[packages/sdk/contractkit/src/contract-cache.ts:191](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/contract-cache.ts#L191)

___

### getLockedCelo

▸ **getLockedCelo**(): `Promise`\<[`LockedGoldWrapper`](wrappers_LockedGold.LockedGoldWrapper.md)\>

#### Returns

`Promise`\<[`LockedGoldWrapper`](wrappers_LockedGold.LockedGoldWrapper.md)\>

#### Defined in

[packages/sdk/contractkit/src/contract-cache.ts:198](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/contract-cache.ts#L198)

___

### getLockedGold

▸ **getLockedGold**(): `Promise`\<[`LockedGoldWrapper`](wrappers_LockedGold.LockedGoldWrapper.md)\>

#### Returns

`Promise`\<[`LockedGoldWrapper`](wrappers_LockedGold.LockedGoldWrapper.md)\>

#### Defined in

[packages/sdk/contractkit/src/contract-cache.ts:195](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/contract-cache.ts#L195)

___

### getMultiSig

▸ **getMultiSig**(`address`): `Promise`\<[`MultiSigWrapper`](wrappers_MultiSig.MultiSigWrapper.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |

#### Returns

`Promise`\<[`MultiSigWrapper`](wrappers_MultiSig.MultiSigWrapper.md)\>

#### Defined in

[packages/sdk/contractkit/src/contract-cache.ts:201](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/contract-cache.ts#L201)

___

### getOdisPayments

▸ **getOdisPayments**(): `Promise`\<[`OdisPaymentsWrapper`](wrappers_OdisPayments.OdisPaymentsWrapper.md)\>

#### Returns

`Promise`\<[`OdisPaymentsWrapper`](wrappers_OdisPayments.OdisPaymentsWrapper.md)\>

#### Defined in

[packages/sdk/contractkit/src/contract-cache.ts:204](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/contract-cache.ts#L204)

___

### getReserve

▸ **getReserve**(): `Promise`\<[`ReserveWrapper`](wrappers_Reserve.ReserveWrapper.md)\>

#### Returns

`Promise`\<[`ReserveWrapper`](wrappers_Reserve.ReserveWrapper.md)\>

#### Defined in

[packages/sdk/contractkit/src/contract-cache.ts:207](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/contract-cache.ts#L207)

___

### getScoreManager

▸ **getScoreManager**(): `Promise`\<[`ScoreManagerWrapper`](wrappers_ScoreManager.ScoreManagerWrapper.md)\>

#### Returns

`Promise`\<[`ScoreManagerWrapper`](wrappers_ScoreManager.ScoreManagerWrapper.md)\>

#### Defined in

[packages/sdk/contractkit/src/contract-cache.ts:210](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/contract-cache.ts#L210)

___

### getSortedOracles

▸ **getSortedOracles**(): `Promise`\<[`SortedOraclesWrapper`](wrappers_SortedOracles.SortedOraclesWrapper.md)\>

#### Returns

`Promise`\<[`SortedOraclesWrapper`](wrappers_SortedOracles.SortedOraclesWrapper.md)\>

#### Defined in

[packages/sdk/contractkit/src/contract-cache.ts:213](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/contract-cache.ts#L213)

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

[packages/sdk/contractkit/src/contract-cache.ts:216](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/contract-cache.ts#L216)

___

### getValidators

▸ **getValidators**(): `Promise`\<[`ValidatorsWrapper`](wrappers_Validators.ValidatorsWrapper.md)\>

#### Returns

`Promise`\<[`ValidatorsWrapper`](wrappers_Validators.ValidatorsWrapper.md)\>

#### Defined in

[packages/sdk/contractkit/src/contract-cache.ts:219](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/contract-cache.ts#L219)

___

### invalidateContract

▸ **invalidateContract**\<`C`\>(`contract`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `C` | extends [`ValidWrappers`](../modules/contract_cache.md#validwrappers) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `contract` | `C` |

#### Returns

`void`

#### Defined in

[packages/sdk/contractkit/src/contract-cache.ts:250](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/contract-cache.ts#L250)
