[**@celo/utils**](../../README.md)

***

[@celo/utils](../../README.md) / [sign-typed-data-utils](../README.md) / generateTypedDataHash

# Function: generateTypedDataHash()

> **generateTypedDataHash**(`typedData`): `Buffer`

Defined in: [packages/sdk/utils/src/sign-typed-data-utils.ts:136](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/utils/src/sign-typed-data-utils.ts#L136)

Generates the EIP712 Typed Data hash for signing

## Parameters

### typedData

[`EIP712TypedData`](../interfaces/EIP712TypedData.md)

An object that conforms to the EIP712TypedData interface

## Returns

`Buffer`

A Buffer containing the hash of the typed data.
