[@celo/contractkit](../README.md) / [Exports](../modules.md) / web3-contract-cache

# Module: web3-contract-cache

## Table of contents

### Classes

- [Web3ContractCache](../classes/web3_contract_cache.Web3ContractCache.md)

### Type Aliases

- [CFType](web3_contract_cache.md#cftype)

### Variables

- [ContractFactories](web3_contract_cache.md#contractfactories)

## Type Aliases

### CFType

Ƭ **CFType**: typeof [`ContractFactories`](web3_contract_cache.md#contractfactories)

#### Defined in

[packages/sdk/contractkit/src/web3-contract-cache.ts:88](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/web3-contract-cache.ts#L88)

## Variables

### ContractFactories

• `Const` **ContractFactories**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `Accounts` | (`web3`: `default`, `address`: `string`) => `Accounts` |
| `Attestations` | (`web3`: `default`, `address`: `string`) => `Attestations` |
| `BlockchainParameters` | (`web3`: `default`, `address`: `string`) => `BlockchainParameters` |
| `CeloToken` | (`web3`: `default`, `address`: `string`) => `GoldToken` |
| `CeloUnreleasedTreasury` | (`web3`: `default`, `address`: `string`) => `CeloUnreleasedTreasury` |
| `DoubleSigningSlasher` | (`web3`: `default`, `address`: `string`) => `DoubleSigningSlasher` |
| `DowntimeSlasher` | (`web3`: `default`, `address`: `string`) => `DowntimeSlasher` |
| `ERC20` | (`web3`: `default`, `address`: `string`) => `IERC20` |
| `Election` | (`web3`: `default`, `address`: `string`) => `Election` |
| `EpochManager` | (`web3`: `default`, `address`: `string`) => `EpochManager` |
| `EpochManagerEnabler` | (`web3`: `default`, `address`: `string`) => `EpochManagerEnabler` |
| `EpochRewards` | (`web3`: `default`, `address`: `string`) => `EpochRewards` |
| `Escrow` | (`web3`: `default`, `address`: `string`) => `Escrow` |
| `FederatedAttestations` | (`web3`: `default`, `address`: `string`) => `FederatedAttestations` |
| `FeeCurrencyDirectory` | (`web3`: `default`, `address`: `string`) => `FeeCurrencyDirectory` |
| `FeeCurrencyWhitelist` | (`web3`: `default`, `address`: `string`) => `FeeCurrencyWhitelist` |
| `FeeHandler` | (`web3`: `default`, `address`: `string`) => `FeeHandler` |
| `Freezer` | (`web3`: `default`, `address`: `string`) => `Freezer` |
| `GasPriceMinimum` | (`web3`: `default`, `address`: `string`) => `GasPriceMinimum` |
| `GoldToken` | (`web3`: `default`, `address`: `string`) => `GoldToken` |
| `Governance` | (`web3`: `default`, `address`: `string`) => `Governance` |
| `GovernanceSlasher` | (`web3`: `default`, `address`: `string`) => `GovernanceSlasher` |
| `LockedCelo` | (`web3`: `default`, `address`: `string`) => `LockedGold` |
| `LockedGold` | (`web3`: `default`, `address`: `string`) => `LockedGold` |
| `MentoFeeHandlerSeller` | (`web3`: `default`, `address`: `string`) => `MentoFeeHandlerSeller` |
| `MultiSig` | (`web3`: `default`, `address`: `string`) => `MultiSig` |
| `OdisPayments` | (`web3`: `default`, `address`: `string`) => `OdisPayments` |
| `Random` | (`web3`: `default`, `address`: `string`) => `Random` |
| `Registry` | (`web3`: `default`, `address`: `string`) => `Registry` |
| `Reserve` | (`web3`: `default`, `address`: `string`) => `Reserve` |
| `ScoreManager` | (`web3`: `default`, `address`: `string`) => `ScoreManager` |
| `SortedOracles` | (`web3`: `default`, `address`: `string`) => `SortedOracles` |
| `StableToken` | (`web3`: `default`, `address`: `string`) => `StableToken` |
| `StableTokenBRL` | (`web3`: `default`, `address`: `string`) => `StableToken` |
| `StableTokenEUR` | (`web3`: `default`, `address`: `string`) => `StableToken` |
| `UniswapFeeHandlerSeller` | (`web3`: `default`, `address`: `string`) => `UniswapFeeHandlerSeller` |
| `Validators` | (`web3`: `default`, `address`: `string`) => `Validators` |

#### Defined in

[packages/sdk/contractkit/src/web3-contract-cache.ts:42](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/web3-contract-cache.ts#L42)
