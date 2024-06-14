[@celo/contractkit](../README.md) / [Exports](../modules.md) / utils/estimateMaxFeeInToken

# Module: utils/estimateMaxFeeInToken

## Table of contents

### Functions

- [estimateMaxFeeInFeeToken](utils_estimateMaxFeeInToken.md#estimatemaxfeeinfeetoken)
- [getConversionRateFromCeloToToken](utils_estimateMaxFeeInToken.md#getconversionratefromcelototoken)

## Functions

### estimateMaxFeeInFeeToken

▸ **estimateMaxFeeInFeeToken**(`web3`, `«destructured»`): `Promise`\<`bigint`\>

For cip 66 transactions (the prefered way to pay for gas with fee tokens on Cel2) it is necessary
to provide the absolute limit one is willing to pay denominated in the token.
In contrast with earlier tx types for fee currencies (celo legacy, cip42, cip 64).

Calulating Estimation requires the gas, maxfeePerGas and the conversion rate from CELO to feeToken
https://github.com/celo-org/celo-proposals/blob/master/CIPs/cip-0066.md

#### Parameters

| Name | Type |
| :------ | :------ |
| `web3` | `default` |
| `«destructured»` | `Object` |
| › `feeCurrency` | `string` |
| › `gasLimit` | `bigint` |
| › `maxFeePerGas` | `bigint` |

#### Returns

`Promise`\<`bigint`\>

#### Defined in

[packages/sdk/contractkit/src/utils/estimateMaxFeeInToken.ts:31](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/utils/estimateMaxFeeInToken.ts#L31)

___

### getConversionRateFromCeloToToken

▸ **getConversionRateFromCeloToToken**(`tokenAddress`, `web3`): `Promise`\<[`bigint`, `bigint`]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `tokenAddress` | `string` |
| `web3` | `default` |

#### Returns

`Promise`\<[`bigint`, `bigint`]\>

#### Defined in

[packages/sdk/contractkit/src/utils/estimateMaxFeeInToken.ts:8](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/utils/estimateMaxFeeInToken.ts#L8)
