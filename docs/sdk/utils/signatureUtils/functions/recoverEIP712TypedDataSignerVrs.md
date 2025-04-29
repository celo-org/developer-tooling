[**@celo/utils**](../../README.md)

***

[@celo/utils](../../README.md) / [signatureUtils](../README.md) / recoverEIP712TypedDataSignerVrs

# Function: recoverEIP712TypedDataSignerVrs()

> **recoverEIP712TypedDataSignerVrs**(`typedData`, `signature`): `string`

Defined in: [packages/sdk/utils/src/signatureUtils.ts:166](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/utils/src/signatureUtils.ts#L166)

Recover signer from VRS-serialized signature over signed typed data.

## Parameters

### typedData

[`EIP712TypedData`](../../sign-typed-data-utils/interfaces/EIP712TypedData.md)

EIP712 typed data

### signature

`string`

VRS signature of signed type data by signer

## Returns

`string`

string signer, or throws error if parsing fails
