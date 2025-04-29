[**@celo/utils**](../../README.md)

***

[@celo/utils](../../README.md) / [signatureUtils](../README.md) / recoverEIP712TypedDataSignerRsv

# Function: recoverEIP712TypedDataSignerRsv()

> **recoverEIP712TypedDataSignerRsv**(`typedData`, `signature`): `string`

Defined in: [packages/sdk/utils/src/signatureUtils.ts:153](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/utils/src/signatureUtils.ts#L153)

Recover signer from RSV-serialized signature over signed typed data.

## Parameters

### typedData

[`EIP712TypedData`](../../sign-typed-data-utils/interfaces/EIP712TypedData.md)

EIP712 typed data

### signature

`string`

RSV signature of signed type data by signer

## Returns

`string`

string signer, or throws error if parsing fails
