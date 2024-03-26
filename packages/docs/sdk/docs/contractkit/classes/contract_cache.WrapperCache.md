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
- [getContract](contract_cache.WrapperCache.md#getcontract)
- [getDoubleSigningSlasher](contract_cache.WrapperCache.md#getdoublesigningslasher)
- [getDowntimeSlasher](contract_cache.WrapperCache.md#getdowntimeslasher)
- [getElection](contract_cache.WrapperCache.md#getelection)
- [getEpochRewards](contract_cache.WrapperCache.md#getepochrewards)
- [getErc20](contract_cache.WrapperCache.md#geterc20)
- [getEscrow](contract_cache.WrapperCache.md#getescrow)
- [getFederatedAttestations](contract_cache.WrapperCache.md#getfederatedattestations)
- [getFeeCurrencyWhitelist](contract_cache.WrapperCache.md#getfeecurrencywhitelist)
- [getFreezer](contract_cache.WrapperCache.md#getfreezer)
- [getGasPriceMinimum](contract_cache.WrapperCache.md#getgaspriceminimum)
- [getGoldToken](contract_cache.WrapperCache.md#getgoldtoken)
- [getGovernance](contract_cache.WrapperCache.md#getgovernance)
- [getLockedGold](contract_cache.WrapperCache.md#getlockedgold)
- [getMultiSig](contract_cache.WrapperCache.md#getmultisig)
- [getOdisPayments](contract_cache.WrapperCache.md#getodispayments)
- [getReserve](contract_cache.WrapperCache.md#getreserve)
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

[packages/sdk/contractkit/src/contract-cache.ts:118](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/contract-cache.ts#L118)

## Properties

### \_web3Contracts

• `Readonly` **\_web3Contracts**: [`Web3ContractCache`](web3_contract_cache.Web3ContractCache.md)

#### Defined in

[packages/sdk/contractkit/src/contract-cache.ts:120](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/contract-cache.ts#L120)

___

### connection

• `Readonly` **connection**: `Connection`

#### Defined in

[packages/sdk/contractkit/src/contract-cache.ts:119](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/contract-cache.ts#L119)

___

### registry

• `Readonly` **registry**: [`AddressRegistry`](address_registry.AddressRegistry.md)

#### Defined in

[packages/sdk/contractkit/src/contract-cache.ts:121](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/contract-cache.ts#L121)

## Methods

### getAccounts

▸ **getAccounts**(): `Promise`\<[`AccountsWrapper`](wrappers_Accounts.AccountsWrapper.md)\>

#### Returns

`Promise`\<[`AccountsWrapper`](wrappers_Accounts.AccountsWrapper.md)\>

#### Implementation of

[ContractCacheType](../interfaces/basic_contract_cache_type.ContractCacheType.md).[getAccounts](../interfaces/basic_contract_cache_type.ContractCacheType.md#getaccounts)

#### Defined in

[packages/sdk/contractkit/src/contract-cache.ts:124](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/contract-cache.ts#L124)

___

### getAttestations

▸ **getAttestations**(): `Promise`\<[`AttestationsWrapper`](wrappers_Attestations.AttestationsWrapper.md)\>

#### Returns

`Promise`\<[`AttestationsWrapper`](wrappers_Attestations.AttestationsWrapper.md)\>

#### Defined in

[packages/sdk/contractkit/src/contract-cache.ts:127](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/contract-cache.ts#L127)

___

### getBlockchainParameters

▸ **getBlockchainParameters**(): `Promise`\<[`BlockchainParametersWrapper`](wrappers_BlockchainParameters.BlockchainParametersWrapper.md)\>

#### Returns

`Promise`\<[`BlockchainParametersWrapper`](wrappers_BlockchainParameters.BlockchainParametersWrapper.md)\>

#### Defined in

[packages/sdk/contractkit/src/contract-cache.ts:130](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/contract-cache.ts#L130)

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

[packages/sdk/contractkit/src/contract-cache.ts:195](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/contract-cache.ts#L195)

___

### getDoubleSigningSlasher

▸ **getDoubleSigningSlasher**(): `Promise`\<[`DoubleSigningSlasherWrapper`](wrappers_DoubleSigningSlasher.DoubleSigningSlasherWrapper.md)\>

#### Returns

`Promise`\<[`DoubleSigningSlasherWrapper`](wrappers_DoubleSigningSlasher.DoubleSigningSlasherWrapper.md)\>

#### Defined in

[packages/sdk/contractkit/src/contract-cache.ts:133](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/contract-cache.ts#L133)

___

### getDowntimeSlasher

▸ **getDowntimeSlasher**(): `Promise`\<[`DowntimeSlasherWrapper`](wrappers_DowntimeSlasher.DowntimeSlasherWrapper.md)\>

#### Returns

`Promise`\<[`DowntimeSlasherWrapper`](wrappers_DowntimeSlasher.DowntimeSlasherWrapper.md)\>

#### Defined in

[packages/sdk/contractkit/src/contract-cache.ts:136](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/contract-cache.ts#L136)

___

### getElection

▸ **getElection**(): `Promise`\<[`ElectionWrapper`](wrappers_Election.ElectionWrapper.md)\>

#### Returns

`Promise`\<[`ElectionWrapper`](wrappers_Election.ElectionWrapper.md)\>

#### Defined in

[packages/sdk/contractkit/src/contract-cache.ts:139](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/contract-cache.ts#L139)

___

### getEpochRewards

▸ **getEpochRewards**(): `Promise`\<[`EpochRewardsWrapper`](wrappers_EpochRewards.EpochRewardsWrapper.md)\>

#### Returns

`Promise`\<[`EpochRewardsWrapper`](wrappers_EpochRewards.EpochRewardsWrapper.md)\>

#### Defined in

[packages/sdk/contractkit/src/contract-cache.ts:142](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/contract-cache.ts#L142)

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

[packages/sdk/contractkit/src/contract-cache.ts:145](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/contract-cache.ts#L145)

___

### getEscrow

▸ **getEscrow**(): `Promise`\<[`EscrowWrapper`](wrappers_Escrow.EscrowWrapper.md)\>

#### Returns

`Promise`\<[`EscrowWrapper`](wrappers_Escrow.EscrowWrapper.md)\>

#### Defined in

[packages/sdk/contractkit/src/contract-cache.ts:148](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/contract-cache.ts#L148)

___

### getFederatedAttestations

▸ **getFederatedAttestations**(): `Promise`\<[`FederatedAttestationsWrapper`](wrappers_FederatedAttestations.FederatedAttestationsWrapper.md)\>

#### Returns

`Promise`\<[`FederatedAttestationsWrapper`](wrappers_FederatedAttestations.FederatedAttestationsWrapper.md)\>

#### Defined in

[packages/sdk/contractkit/src/contract-cache.ts:155](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/contract-cache.ts#L155)

___

### getFeeCurrencyWhitelist

▸ **getFeeCurrencyWhitelist**(): `Promise`\<[`FeeCurrencyWhitelistWrapper`](wrappers_FeeCurrencyWhitelistWrapper.FeeCurrencyWhitelistWrapper.md)\>

#### Returns

`Promise`\<[`FeeCurrencyWhitelistWrapper`](wrappers_FeeCurrencyWhitelistWrapper.FeeCurrencyWhitelistWrapper.md)\>

#### Defined in

[packages/sdk/contractkit/src/contract-cache.ts:158](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/contract-cache.ts#L158)

___

### getFreezer

▸ **getFreezer**(): `Promise`\<[`FreezerWrapper`](wrappers_Freezer.FreezerWrapper.md)\>

#### Returns

`Promise`\<[`FreezerWrapper`](wrappers_Freezer.FreezerWrapper.md)\>

#### Defined in

[packages/sdk/contractkit/src/contract-cache.ts:152](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/contract-cache.ts#L152)

___

### getGasPriceMinimum

▸ **getGasPriceMinimum**(): `Promise`\<[`GasPriceMinimumWrapper`](wrappers_GasPriceMinimum.GasPriceMinimumWrapper.md)\>

#### Returns

`Promise`\<[`GasPriceMinimumWrapper`](wrappers_GasPriceMinimum.GasPriceMinimumWrapper.md)\>

#### Defined in

[packages/sdk/contractkit/src/contract-cache.ts:161](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/contract-cache.ts#L161)

___

### getGoldToken

▸ **getGoldToken**(): `Promise`\<[`GoldTokenWrapper`](wrappers_GoldTokenWrapper.GoldTokenWrapper.md)\>

#### Returns

`Promise`\<[`GoldTokenWrapper`](wrappers_GoldTokenWrapper.GoldTokenWrapper.md)\>

#### Implementation of

[ContractCacheType](../interfaces/basic_contract_cache_type.ContractCacheType.md).[getGoldToken](../interfaces/basic_contract_cache_type.ContractCacheType.md#getgoldtoken)

#### Defined in

[packages/sdk/contractkit/src/contract-cache.ts:164](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/contract-cache.ts#L164)

___

### getGovernance

▸ **getGovernance**(): `Promise`\<[`GovernanceWrapper`](wrappers_Governance.GovernanceWrapper.md)\>

#### Returns

`Promise`\<[`GovernanceWrapper`](wrappers_Governance.GovernanceWrapper.md)\>

#### Defined in

[packages/sdk/contractkit/src/contract-cache.ts:167](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/contract-cache.ts#L167)

___

### getLockedGold

▸ **getLockedGold**(): `Promise`\<[`LockedGoldWrapper`](wrappers_LockedGold.LockedGoldWrapper.md)\>

#### Returns

`Promise`\<[`LockedGoldWrapper`](wrappers_LockedGold.LockedGoldWrapper.md)\>

#### Defined in

[packages/sdk/contractkit/src/contract-cache.ts:170](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/contract-cache.ts#L170)

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

[packages/sdk/contractkit/src/contract-cache.ts:173](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/contract-cache.ts#L173)

___

### getOdisPayments

▸ **getOdisPayments**(): `Promise`\<[`OdisPaymentsWrapper`](wrappers_OdisPayments.OdisPaymentsWrapper.md)\>

#### Returns

`Promise`\<[`OdisPaymentsWrapper`](wrappers_OdisPayments.OdisPaymentsWrapper.md)\>

#### Defined in

[packages/sdk/contractkit/src/contract-cache.ts:176](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/contract-cache.ts#L176)

___

### getReserve

▸ **getReserve**(): `Promise`\<[`ReserveWrapper`](wrappers_Reserve.ReserveWrapper.md)\>

#### Returns

`Promise`\<[`ReserveWrapper`](wrappers_Reserve.ReserveWrapper.md)\>

#### Defined in

[packages/sdk/contractkit/src/contract-cache.ts:179](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/contract-cache.ts#L179)

___

### getSortedOracles

▸ **getSortedOracles**(): `Promise`\<[`SortedOraclesWrapper`](wrappers_SortedOracles.SortedOraclesWrapper.md)\>

#### Returns

`Promise`\<[`SortedOraclesWrapper`](wrappers_SortedOracles.SortedOraclesWrapper.md)\>

#### Defined in

[packages/sdk/contractkit/src/contract-cache.ts:182](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/contract-cache.ts#L182)

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

[packages/sdk/contractkit/src/contract-cache.ts:185](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/contract-cache.ts#L185)

___

### getValidators

▸ **getValidators**(): `Promise`\<[`ValidatorsWrapper`](wrappers_Validators.ValidatorsWrapper.md)\>

#### Returns

`Promise`\<[`ValidatorsWrapper`](wrappers_Validators.ValidatorsWrapper.md)\>

#### Defined in

[packages/sdk/contractkit/src/contract-cache.ts:188](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/contract-cache.ts#L188)

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

[packages/sdk/contractkit/src/contract-cache.ts:219](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/contract-cache.ts#L219)
