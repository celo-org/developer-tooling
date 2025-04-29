[**@celo/contractkit**](../../../README.md)

***

[@celo/contractkit](../../../modules.md) / [utils/getParsedSignatureOfAddress](../README.md) / getParsedSignatureOfAddress

# Function: getParsedSignatureOfAddress()

> **getParsedSignatureOfAddress**(`sha3`, `sign`, `address`, `signer`): `Promise`\<\{ `r`: `string`; `s`: `string`; `v`: `number`; \}\>

Defined in: [packages/sdk/contractkit/src/utils/getParsedSignatureOfAddress.ts:5](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/utils/getParsedSignatureOfAddress.ts#L5)

## Parameters

### sha3

(...`val`) => `null` \| `string`

### sign

(`dataToSign`, `address`) => `Promise`\<`string`\>

### address

`string`

### signer

`string`

## Returns

`Promise`\<\{ `r`: `string`; `s`: `string`; `v`: `number`; \}\>
