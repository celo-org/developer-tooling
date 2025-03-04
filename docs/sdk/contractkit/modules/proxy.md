[@celo/contractkit](../README.md) / [Exports](../modules.md) / proxy

# Module: proxy

## Table of contents

### Variables

- [GET\_IMPLEMENTATION\_ABI](proxy.md#get_implementation_abi)
- [PROXY\_ABI](proxy.md#proxy_abi)
- [PROXY\_SET\_AND\_INITIALIZE\_IMPLEMENTATION\_SIGNATURE](proxy.md#proxy_set_and_initialize_implementation_signature)
- [PROXY\_SET\_IMPLEMENTATION\_SIGNATURE](proxy.md#proxy_set_implementation_signature)
- [SET\_AND\_INITIALIZE\_IMPLEMENTATION\_ABI](proxy.md#set_and_initialize_implementation_abi)
- [SET\_IMPLEMENTATION\_ABI](proxy.md#set_implementation_abi)
- [TRANSFER\_OWNERSHIP\_ABI](proxy.md#transfer_ownership_abi)

### Functions

- [getInitializeAbiOfImplementation](proxy.md#getinitializeabiofimplementation)
- [setImplementationOnProxy](proxy.md#setimplementationonproxy)

## Variables

### GET\_IMPLEMENTATION\_ABI

• `Const` **GET\_IMPLEMENTATION\_ABI**: `ABIDefinition`

#### Defined in

[packages/sdk/contractkit/src/proxy.ts:37](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/proxy.ts#L37)

___

### PROXY\_ABI

• `Const` **PROXY\_ABI**: `ABIDefinition`[]

#### Defined in

[packages/sdk/contractkit/src/proxy.ts:105](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/proxy.ts#L105)

___

### PROXY\_SET\_AND\_INITIALIZE\_IMPLEMENTATION\_SIGNATURE

• `Const` **PROXY\_SET\_AND\_INITIALIZE\_IMPLEMENTATION\_SIGNATURE**: `string` = `SET_AND_INITIALIZE_IMPLEMENTATION_ABI.signature`

#### Defined in

[packages/sdk/contractkit/src/proxy.ts:113](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/proxy.ts#L113)

___

### PROXY\_SET\_IMPLEMENTATION\_SIGNATURE

• `Const` **PROXY\_SET\_IMPLEMENTATION\_SIGNATURE**: `string` = `SET_IMPLEMENTATION_ABI.signature`

#### Defined in

[packages/sdk/contractkit/src/proxy.ts:112](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/proxy.ts#L112)

___

### SET\_AND\_INITIALIZE\_IMPLEMENTATION\_ABI

• `Const` **SET\_AND\_INITIALIZE\_IMPLEMENTATION\_ABI**: `ABIDefinition`

#### Defined in

[packages/sdk/contractkit/src/proxy.ts:69](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/proxy.ts#L69)

___

### SET\_IMPLEMENTATION\_ABI

• `Const` **SET\_IMPLEMENTATION\_ABI**: `ABIDefinition`

#### Defined in

[packages/sdk/contractkit/src/proxy.ts:53](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/proxy.ts#L53)

___

### TRANSFER\_OWNERSHIP\_ABI

• `Const` **TRANSFER\_OWNERSHIP\_ABI**: `ABIDefinition`

#### Defined in

[packages/sdk/contractkit/src/proxy.ts:89](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/proxy.ts#L89)

## Functions

### getInitializeAbiOfImplementation

▸ **getInitializeAbiOfImplementation**(`proxyContractName`): `AbiItem`

#### Parameters

| Name | Type |
| :------ | :------ |
| `proxyContractName` | ``"AccountsProxy"`` \| ``"AttestationsProxy"`` \| ``"BlockchainParametersProxy"`` \| ``"CeloUnreleasedTreasuryProxy"`` \| ``"DoubleSigningSlasherProxy"`` \| ``"DowntimeSlasherProxy"`` \| ``"ElectionProxy"`` \| ``"EpochRewardsProxy"`` \| ``"EscrowProxy"`` \| ``"EpochManagerProxy"`` \| ``"EpochManagerEnablerProxy"`` \| ``"FederatedAttestationsProxy"`` \| ``"FeeCurrencyDirectoryProxy"`` \| ``"FeeCurrencyWhitelistProxy"`` \| ``"FeeHandlerProxy"`` \| ``"FreezerProxy"`` \| ``"GasPriceMinimumProxy"`` \| ``"GoldTokenProxy"`` \| ``"GovernanceProxy"`` \| ``"LockedGoldProxy"`` \| ``"MentoFeeHandlerSellerProxy"`` \| ``"UniswapFeeHandlerSellerProxy"`` \| ``"MultiSigProxy"`` \| ``"OdisPaymentsProxy"`` \| ``"RandomProxy"`` \| ``"RegistryProxy"`` \| ``"ReserveProxy"`` \| ``"ScoreManagerProxy"`` \| ``"SortedOraclesProxy"`` \| ``"StableTokenProxy"`` \| ``"StableTokenEURProxy"`` \| ``"StableTokenBRLProxy"`` \| ``"ValidatorsProxy"`` \| ``"ProxyProxy"`` |

#### Returns

`AbiItem`

#### Defined in

[packages/sdk/contractkit/src/proxy.ts:155](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/proxy.ts#L155)

___

### setImplementationOnProxy

▸ **setImplementationOnProxy**(`address`, `web3`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |
| `web3` | `default` |

#### Returns

`any`

#### Defined in

[packages/sdk/contractkit/src/proxy.ts:165](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/proxy.ts#L165)
