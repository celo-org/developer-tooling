[@celo/contractkit](../README.md) / [Exports](../modules.md) / utils/getParsedSignatureOfAddress

# Module: utils/getParsedSignatureOfAddress

## Table of contents

### Functions

- [getParsedSignatureOfAddress](utils_getParsedSignatureOfAddress.md#getparsedsignatureofaddress)

## Functions

### getParsedSignatureOfAddress

▸ **getParsedSignatureOfAddress**(`sha3`, `sign`, `address`, `signer`): `Promise`\<\{ `r`: `string` ; `s`: `string` ; `v`: `number`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `sha3` | (...`val`: `Mixed`[]) => ``null`` \| `string` |
| `sign` | (`dataToSign`: `string`, `address`: `string` \| `number`) => `Promise`\<`string`\> |
| `address` | `string` |
| `signer` | `string` |

#### Returns

`Promise`\<\{ `r`: `string` ; `s`: `string` ; `v`: `number`  }\>

#### Defined in

[packages/sdk/contractkit/src/utils/getParsedSignatureOfAddress.ts:5](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/utils/getParsedSignatureOfAddress.ts#L5)
