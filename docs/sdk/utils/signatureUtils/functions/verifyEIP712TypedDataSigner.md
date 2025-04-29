[**@celo/utils**](../../README.md)

***

[@celo/utils](../../README.md) / [signatureUtils](../README.md) / verifyEIP712TypedDataSigner

# Function: verifyEIP712TypedDataSigner()

> **verifyEIP712TypedDataSigner**(`typedData`, `signature`, `signer`): `boolean`

Defined in: [packages/sdk/utils/src/signatureUtils.ts:179](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/utils/src/signatureUtils.ts#L179)

## Parameters

### typedData

[`EIP712TypedData`](../../sign-typed-data-utils/interfaces/EIP712TypedData.md)

EIP712 typed data

### signature

`string`

VRS or SRV signature of `typedData` by `signer`

### signer

`string`

address to verify signed the `typedData`

## Returns

`boolean`

boolean, true if `signer` is a possible signer of `signature`
