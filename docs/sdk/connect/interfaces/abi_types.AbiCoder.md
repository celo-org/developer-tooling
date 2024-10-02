[@celo/connect](../README.md) / [Exports](../modules.md) / [abi-types](../modules/abi_types.md) / AbiCoder

# Interface: AbiCoder

[abi-types](../modules/abi_types.md).AbiCoder

## Table of contents

### Methods

- [decodeLog](abi_types.AbiCoder.md#decodelog)
- [decodeParameter](abi_types.AbiCoder.md#decodeparameter)
- [decodeParameters](abi_types.AbiCoder.md#decodeparameters)
- [encodeEventSignature](abi_types.AbiCoder.md#encodeeventsignature)
- [encodeFunctionCall](abi_types.AbiCoder.md#encodefunctioncall)
- [encodeFunctionSignature](abi_types.AbiCoder.md#encodefunctionsignature)
- [encodeParameter](abi_types.AbiCoder.md#encodeparameter)
- [encodeParameters](abi_types.AbiCoder.md#encodeparameters)

## Methods

### decodeLog

▸ **decodeLog**(`inputs`, `hexString`, `topics`): [`EventLog`](index.EventLog.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `inputs` | [`AbiInput`](abi_types.AbiInput.md)[] |
| `hexString` | `string` |
| `topics` | `string`[] |

#### Returns

[`EventLog`](index.EventLog.md)

#### Defined in

[packages/sdk/connect/src/abi-types.ts:55](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/abi-types.ts#L55)

___

### decodeParameter

▸ **decodeParameter**(`type`, `hex`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `string` |
| `hex` | `string` |

#### Returns

`any`

#### Defined in

[packages/sdk/connect/src/abi-types.ts:64](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/abi-types.ts#L64)

___

### decodeParameters

▸ **decodeParameters**(`types`, `hex`): [`DecodedParamsArray`](abi_types.DecodedParamsArray.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `types` | `string`[] |
| `hex` | `string` |

#### Returns

[`DecodedParamsArray`](abi_types.DecodedParamsArray.md)

#### Defined in

[packages/sdk/connect/src/abi-types.ts:66](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/abi-types.ts#L66)

▸ **decodeParameters**(`types`, `hex`): [`DecodedParamsObject`](abi_types.DecodedParamsObject.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `types` | [`AbiInput`](abi_types.AbiInput.md)[] |
| `hex` | `string` |

#### Returns

[`DecodedParamsObject`](abi_types.DecodedParamsObject.md)

#### Defined in

[packages/sdk/connect/src/abi-types.ts:67](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/abi-types.ts#L67)

___

### encodeEventSignature

▸ **encodeEventSignature**(`name`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` \| `object` |

#### Returns

`string`

#### Defined in

[packages/sdk/connect/src/abi-types.ts:60](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/abi-types.ts#L60)

___

### encodeFunctionCall

▸ **encodeFunctionCall**(`jsonInterface`, `parameters`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `jsonInterface` | `object` |
| `parameters` | `any`[] |

#### Returns

`string`

#### Defined in

[packages/sdk/connect/src/abi-types.ts:61](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/abi-types.ts#L61)

___

### encodeFunctionSignature

▸ **encodeFunctionSignature**(`name`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` \| `object` |

#### Returns

`string`

#### Defined in

[packages/sdk/connect/src/abi-types.ts:62](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/abi-types.ts#L62)

___

### encodeParameter

▸ **encodeParameter**(`type`, `parameter`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `string` |
| `parameter` | `any` |

#### Returns

`string`

#### Defined in

[packages/sdk/connect/src/abi-types.ts:57](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/abi-types.ts#L57)

___

### encodeParameters

▸ **encodeParameters**(`types`, `paramaters`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `types` | `string`[] |
| `paramaters` | `any`[] |

#### Returns

`string`

#### Defined in

[packages/sdk/connect/src/abi-types.ts:58](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/abi-types.ts#L58)
