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

### Functions

- [getInitializeAbiOfImplementation](proxy.md#getinitializeabiofimplementation)
- [setImplementationOnProxy](proxy.md#setimplementationonproxy)

## Variables

### GET\_IMPLEMENTATION\_ABI

• `Const` **GET\_IMPLEMENTATION\_ABI**: `ABIDefinition`

#### Defined in

[packages/sdk/contractkit/src/proxy.ts:32](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/proxy.ts#L32)

___

### PROXY\_ABI

• `Const` **PROXY\_ABI**: `ABIDefinition`[]

#### Defined in

[packages/sdk/contractkit/src/proxy.ts:84](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/proxy.ts#L84)

___

### PROXY\_SET\_AND\_INITIALIZE\_IMPLEMENTATION\_SIGNATURE

• `Const` **PROXY\_SET\_AND\_INITIALIZE\_IMPLEMENTATION\_SIGNATURE**: `string` = `SET_AND_INITIALIZE_IMPLEMENTATION_ABI.signature`

#### Defined in

[packages/sdk/contractkit/src/proxy.ts:91](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/proxy.ts#L91)

___

### PROXY\_SET\_IMPLEMENTATION\_SIGNATURE

• `Const` **PROXY\_SET\_IMPLEMENTATION\_SIGNATURE**: `string` = `SET_IMPLEMENTATION_ABI.signature`

#### Defined in

[packages/sdk/contractkit/src/proxy.ts:90](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/proxy.ts#L90)

___

### SET\_AND\_INITIALIZE\_IMPLEMENTATION\_ABI

• `Const` **SET\_AND\_INITIALIZE\_IMPLEMENTATION\_ABI**: `ABIDefinition`

#### Defined in

[packages/sdk/contractkit/src/proxy.ts:64](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/proxy.ts#L64)

___

### SET\_IMPLEMENTATION\_ABI

• `Const` **SET\_IMPLEMENTATION\_ABI**: `ABIDefinition`

#### Defined in

[packages/sdk/contractkit/src/proxy.ts:48](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/proxy.ts#L48)

## Functions

### getInitializeAbiOfImplementation

▸ **getInitializeAbiOfImplementation**(`proxyContractName`): `AbiItem`

#### Parameters

| Name | Type |
| :------ | :------ |
| `proxyContractName` | ``"AccountsProxy"`` \| ``"AttestationsProxy"`` \| ``"BlockchainParametersProxy"`` \| ``"DoubleSigningSlasherProxy"`` \| ``"DowntimeSlasherProxy"`` \| ``"ElectionProxy"`` \| ``"EpochRewardsProxy"`` \| ``"EscrowProxy"`` \| ``"FederatedAttestationsProxy"`` \| ``"FeeCurrencyWhitelistProxy"`` \| ``"FeeHandlerProxy"`` \| ``"FreezerProxy"`` \| ``"GasPriceMinimumProxy"`` \| ``"GoldTokenProxy"`` \| ``"GovernanceProxy"`` \| ``"LockedGoldProxy"`` \| ``"MentoFeeHandlerSellerProxy"`` \| ``"UniswapFeeHandlerSellerProxy"`` \| ``"MultiSigProxy"`` \| ``"OdisPaymentsProxy"`` \| ``"RandomProxy"`` \| ``"RegistryProxy"`` \| ``"ReserveProxy"`` \| ``"SortedOraclesProxy"`` \| ``"StableTokenProxy"`` \| ``"StableTokenEURProxy"`` \| ``"StableTokenBRLProxy"`` \| ``"ValidatorsProxy"`` \| ``"ProxyProxy"`` |

#### Returns

`AbiItem`

#### Defined in

[packages/sdk/contractkit/src/proxy.ts:128](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/proxy.ts#L128)

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

[packages/sdk/contractkit/src/proxy.ts:138](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/proxy.ts#L138)
