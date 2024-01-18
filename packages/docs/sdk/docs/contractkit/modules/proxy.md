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

[packages/sdk/contractkit/src/proxy.ts:33](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/proxy.ts#L33)

___

### PROXY\_ABI

• `Const` **PROXY\_ABI**: `ABIDefinition`[]

#### Defined in

[packages/sdk/contractkit/src/proxy.ts:85](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/proxy.ts#L85)

___

### PROXY\_SET\_AND\_INITIALIZE\_IMPLEMENTATION\_SIGNATURE

• `Const` **PROXY\_SET\_AND\_INITIALIZE\_IMPLEMENTATION\_SIGNATURE**: `string` = `SET_AND_INITIALIZE_IMPLEMENTATION_ABI.signature`

#### Defined in

[packages/sdk/contractkit/src/proxy.ts:92](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/proxy.ts#L92)

___

### PROXY\_SET\_IMPLEMENTATION\_SIGNATURE

• `Const` **PROXY\_SET\_IMPLEMENTATION\_SIGNATURE**: `string` = `SET_IMPLEMENTATION_ABI.signature`

#### Defined in

[packages/sdk/contractkit/src/proxy.ts:91](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/proxy.ts#L91)

___

### SET\_AND\_INITIALIZE\_IMPLEMENTATION\_ABI

• `Const` **SET\_AND\_INITIALIZE\_IMPLEMENTATION\_ABI**: `ABIDefinition`

#### Defined in

[packages/sdk/contractkit/src/proxy.ts:65](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/proxy.ts#L65)

___

### SET\_IMPLEMENTATION\_ABI

• `Const` **SET\_IMPLEMENTATION\_ABI**: `ABIDefinition`

#### Defined in

[packages/sdk/contractkit/src/proxy.ts:49](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/proxy.ts#L49)

## Functions

### getInitializeAbiOfImplementation

▸ **getInitializeAbiOfImplementation**(`proxyContractName`): `AbiItem`

#### Parameters

| Name | Type |
| :------ | :------ |
| `proxyContractName` | ``"AccountsProxy"`` \| ``"AttestationsProxy"`` \| ``"BlockchainParametersProxy"`` \| ``"DoubleSigningSlasherProxy"`` \| ``"DowntimeSlasherProxy"`` \| ``"ElectionProxy"`` \| ``"EpochRewardsProxy"`` \| ``"EscrowProxy"`` \| ``"ExchangeProxy"`` \| ``"ExchangeEURProxy"`` \| ``"ExchangeBRLProxy"`` \| ``"FederatedAttestationsProxy"`` \| ``"FeeCurrencyWhitelistProxy"`` \| ``"FeeHandlerProxy"`` \| ``"FreezerProxy"`` \| ``"GasPriceMinimumProxy"`` \| ``"GoldTokenProxy"`` \| ``"GovernanceProxy"`` \| ``"LockedGoldProxy"`` \| ``"MentoFeeHandlerSellerProxy"`` \| ``"UniswapFeeHandlerSellerProxy"`` \| ``"MultiSigProxy"`` \| ``"OdisPaymentsProxy"`` \| ``"RandomProxy"`` \| ``"RegistryProxy"`` \| ``"ReserveProxy"`` \| ``"SortedOraclesProxy"`` \| ``"StableTokenProxy"`` \| ``"StableTokenEURProxy"`` \| ``"StableTokenBRLProxy"`` \| ``"ValidatorsProxy"`` \| ``"ProxyProxy"`` |

#### Returns

`AbiItem`

#### Defined in

[packages/sdk/contractkit/src/proxy.ts:132](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/proxy.ts#L132)

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

[packages/sdk/contractkit/src/proxy.ts:142](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/proxy.ts#L142)
