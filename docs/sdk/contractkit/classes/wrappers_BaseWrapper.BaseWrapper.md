[@celo/contractkit](../README.md) / [Exports](../modules.md) / [wrappers/BaseWrapper](../modules/wrappers_BaseWrapper.md) / BaseWrapper

# Class: BaseWrapper\<T\>

[wrappers/BaseWrapper](../modules/wrappers_BaseWrapper.md).BaseWrapper

-- use its children

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Contract` |

## Hierarchy

- **`BaseWrapper`**

  ↳ [`AccountsWrapper`](wrappers_Accounts.AccountsWrapper.md)

  ↳ [`AttestationsWrapper`](wrappers_Attestations.AttestationsWrapper.md)

  ↳ [`BaseWrapperForGoverning`](wrappers_BaseWrapperForGoverning.BaseWrapperForGoverning.md)

  ↳ [`BlockchainParametersWrapper`](wrappers_BlockchainParameters.BlockchainParametersWrapper.md)

  ↳ [`EpochRewardsWrapper`](wrappers_EpochRewards.EpochRewardsWrapper.md)

  ↳ [`Erc20Wrapper`](wrappers_Erc20Wrapper.Erc20Wrapper.md)

  ↳ [`EscrowWrapper`](wrappers_Escrow.EscrowWrapper.md)

  ↳ [`FederatedAttestationsWrapper`](wrappers_FederatedAttestations.FederatedAttestationsWrapper.md)

  ↳ [`FeeCurrencyWhitelistWrapper`](wrappers_FeeCurrencyWhitelistWrapper.FeeCurrencyWhitelistWrapper.md)

  ↳ [`FeeHandlerWrapper`](wrappers_FeeHandler.FeeHandlerWrapper.md)

  ↳ [`FreezerWrapper`](wrappers_Freezer.FreezerWrapper.md)

  ↳ [`GasPriceMinimumWrapper`](wrappers_GasPriceMinimum.GasPriceMinimumWrapper.md)

  ↳ [`MultiSigWrapper`](wrappers_MultiSig.MultiSigWrapper.md)

  ↳ [`OdisPaymentsWrapper`](wrappers_OdisPayments.OdisPaymentsWrapper.md)

  ↳ [`ReserveWrapper`](wrappers_Reserve.ReserveWrapper.md)

  ↳ [`SortedOraclesWrapper`](wrappers_SortedOracles.SortedOraclesWrapper.md)

## Table of contents

### Constructors

- [constructor](wrappers_BaseWrapper.BaseWrapper.md#constructor)

### Properties

- [eventTypes](wrappers_BaseWrapper.BaseWrapper.md#eventtypes)
- [events](wrappers_BaseWrapper.BaseWrapper.md#events)
- [methodIds](wrappers_BaseWrapper.BaseWrapper.md#methodids)

### Accessors

- [address](wrappers_BaseWrapper.BaseWrapper.md#address)

### Methods

- [getPastEvents](wrappers_BaseWrapper.BaseWrapper.md#getpastevents)
- [version](wrappers_BaseWrapper.BaseWrapper.md#version)

## Constructors

### constructor

• **new BaseWrapper**\<`T`\>(`connection`, `contract`): [`BaseWrapper`](wrappers_BaseWrapper.BaseWrapper.md)\<`T`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Contract` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `connection` | `Connection` |
| `contract` | `T` |

#### Returns

[`BaseWrapper`](wrappers_BaseWrapper.BaseWrapper.md)\<`T`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:34](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L34)

## Properties

### eventTypes

• **eventTypes**: `EventsEnum`\<`T`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:63](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L63)

___

### events

• **events**: `T`[``"events"``]

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:61](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L61)

___

### methodIds

• **methodIds**: `Record`\<keyof `T`[``"methods"``], `string`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:68](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L68)

## Accessors

### address

• `get` **address**(): \`0x$\{string}\`

Contract address

#### Returns

\`0x$\{string}\`

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:37](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L37)

## Methods

### getPastEvents

▸ **getPastEvents**(`event`, `options`): `Promise`\<`EventLog`[]\>

Contract getPastEvents

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | keyof `T`[``"events"``] |
| `options` | `PastEventOptions` |

#### Returns

`Promise`\<`EventLog`[]\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:57](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L57)

___

### version

▸ **version**(): `Promise`\<`T`[``"methods"``] extends \{ `getVersionNumber`: () => `CeloTxObject`\<\{ `0`: `string` ; `1`: `string` ; `2`: `string` ; `3`: `string`  }\>  } ? [`ContractVersion`](versions.ContractVersion.md) : `never`\>

#### Returns

`Promise`\<`T`[``"methods"``] extends \{ `getVersionNumber`: () => `CeloTxObject`\<\{ `0`: `string` ; `1`: `string` ; `2`: `string` ; `3`: `string`  }\>  } ? [`ContractVersion`](versions.ContractVersion.md) : `never`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:41](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L41)
