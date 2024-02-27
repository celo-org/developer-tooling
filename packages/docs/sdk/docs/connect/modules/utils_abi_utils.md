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

[packages/sdk/connect/src/utils/abi-utils.ts:98](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/utils/abi-utils.ts#L98)

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

Parses solidity function signature

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `fnSignature` | `string` | The function signature |

#### Returns

[`ABIDefinition`](../interfaces/abi_types.ABIDefinition.md)

AbiItem structure that can be used to encode/decode

**`Dev`**

example of input function signature: transfer(address,uint256)
example of output structure can be found in propose.test.ts variable `structAbiDefinition`
supports tuples eg. mint(uint256, (uint256, uint256))
and structs eg. mint(uint256, (uint256 a, uint256 b))

#### Defined in

[packages/sdk/connect/src/utils/abi-utils.ts:34](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/utils/abi-utils.ts#L34)
