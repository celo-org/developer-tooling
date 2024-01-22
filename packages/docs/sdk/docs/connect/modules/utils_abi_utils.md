[@celo/connect](../README.md) / [Exports](../modules.md) / utils/abi-utils

# Module: utils/abi-utils

## Table of contents

### Functions

- [decodeStringParameter](utils_abi_utils.md#decodestringparameter)
- [getAbiByName](utils_abi_utils.md#getabibyname)
- [parseDecodedParams](utils_abi_utils.md#parsedecodedparams)
- [signatureToAbiDefinition](utils_abi_utils.md#signaturetoabidefinition)

## Functions

### decodeStringParameter

▸ **decodeStringParameter**(`ethAbi`, `str`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `ethAbi` | [`AbiCoder`](../interfaces/abi_types.AbiCoder.md) |
| `str` | `string` |

#### Returns

`any`

#### Defined in

[packages/sdk/connect/src/utils/abi-utils.ts:55](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/utils/abi-utils.ts#L55)

___

### getAbiByName

▸ **getAbiByName**(`abi`, `methodName`): [`AbiItem`](../interfaces/abi_types.AbiItem.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `abi` | [`AbiItem`](../interfaces/abi_types.AbiItem.md)[] |
| `methodName` | `string` |

#### Returns

[`AbiItem`](../interfaces/abi_types.AbiItem.md)

#### Defined in

[packages/sdk/connect/src/utils/abi-utils.ts:5](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/utils/abi-utils.ts#L5)

___

### parseDecodedParams

▸ **parseDecodedParams**(`params`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`DecodedParamsObject`](../interfaces/abi_types.DecodedParamsObject.md) |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `args` | `any`[] |
| `params` | [`DecodedParamsObject`](../interfaces/abi_types.DecodedParamsObject.md) |

#### Defined in

[packages/sdk/connect/src/utils/abi-utils.ts:9](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/utils/abi-utils.ts#L9)

___

### signatureToAbiDefinition

▸ **signatureToAbiDefinition**(`fnSignature`): [`ABIDefinition`](../interfaces/abi_types.ABIDefinition.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `fnSignature` | `string` |

#### Returns

[`ABIDefinition`](../interfaces/abi_types.ABIDefinition.md)

#### Defined in

[packages/sdk/connect/src/utils/abi-utils.ts:25](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/utils/abi-utils.ts#L25)
