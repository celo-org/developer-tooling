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

[packages/sdk/contractkit/src/proxy.ts:34](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/proxy.ts#L34)

___

### PROXY\_ABI

• `Const` **PROXY\_ABI**: `ABIDefinition`[]

#### Defined in

[packages/sdk/contractkit/src/proxy.ts:102](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/proxy.ts#L102)

___

### PROXY\_SET\_AND\_INITIALIZE\_IMPLEMENTATION\_SIGNATURE

• `Const` **PROXY\_SET\_AND\_INITIALIZE\_IMPLEMENTATION\_SIGNATURE**: `string` = `SET_AND_INITIALIZE_IMPLEMENTATION_ABI.signature`

#### Defined in

[packages/sdk/contractkit/src/proxy.ts:110](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/proxy.ts#L110)

___

### PROXY\_SET\_IMPLEMENTATION\_SIGNATURE

• `Const` **PROXY\_SET\_IMPLEMENTATION\_SIGNATURE**: `string` = `SET_IMPLEMENTATION_ABI.signature`

#### Defined in

[packages/sdk/contractkit/src/proxy.ts:109](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/proxy.ts#L109)

___

### SET\_AND\_INITIALIZE\_IMPLEMENTATION\_ABI

• `Const` **SET\_AND\_INITIALIZE\_IMPLEMENTATION\_ABI**: `ABIDefinition`

#### Defined in

[packages/sdk/contractkit/src/proxy.ts:66](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/proxy.ts#L66)

___

### SET\_IMPLEMENTATION\_ABI

• `Const` **SET\_IMPLEMENTATION\_ABI**: `ABIDefinition`

#### Defined in

[packages/sdk/contractkit/src/proxy.ts:50](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/proxy.ts#L50)

___

### TRANSFER\_OWNERSHIP\_ABI

• `Const` **TRANSFER\_OWNERSHIP\_ABI**: `ABIDefinition`

#### Defined in

[packages/sdk/contractkit/src/proxy.ts:86](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/proxy.ts#L86)

## Functions

### getInitializeAbiOfImplementation

▸ **getInitializeAbiOfImplementation**(`proxyContractName`): `AbiItem`

#### Parameters

| Name | Type |
| :------ | :------ |
| `proxyContractName` | ``"AccountsProxy"`` \| ``"AttestationsProxy"`` \| ``"CeloUnreleasedTreasuryProxy"`` \| ``"ElectionProxy"`` \| ``"EpochRewardsProxy"`` \| ``"EscrowProxy"`` \| ``"EpochManagerProxy"`` \| ``"EpochManagerEnablerProxy"`` \| ``"FederatedAttestationsProxy"`` \| ``"FeeCurrencyDirectoryProxy"`` \| ``"FeeHandlerProxy"`` \| ``"FreezerProxy"`` \| ``"GoldTokenProxy"`` \| ``"GovernanceProxy"`` \| ``"LockedGoldProxy"`` \| ``"MentoFeeHandlerSellerProxy"`` \| ``"UniswapFeeHandlerSellerProxy"`` \| ``"MultiSigProxy"`` \| ``"OdisPaymentsProxy"`` \| ``"RegistryProxy"`` \| ``"ReserveProxy"`` \| ``"ScoreManagerProxy"`` \| ``"SortedOraclesProxy"`` \| ``"StableTokenProxy"`` \| ``"StableTokenEURProxy"`` \| ``"StableTokenBRLProxy"`` \| ``"ValidatorsProxy"`` \| ``"DoubleSigningSlasherProxy"`` \| ``"DowntimeSlasherProxy"`` \| ``"FeeCurrencyWhitelistProxy"`` \| ``"ProxyProxy"`` |

#### Returns

`AbiItem`

#### Defined in

[packages/sdk/contractkit/src/proxy.ts:149](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/proxy.ts#L149)

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

[packages/sdk/contractkit/src/proxy.ts:159](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/proxy.ts#L159)
