[**@celo/utils**](../../README.md)

***

[@celo/utils](../../README.md) / [sign-typed-data-utils](../README.md) / eip712OptionalType

# Function: eip712OptionalType()

> **eip712OptionalType**(`typeName`): [`EIP712Types`](../interfaces/EIP712Types.md)

Defined in: [packages/sdk/utils/src/sign-typed-data-utils.ts:90](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/utils/src/sign-typed-data-utils.ts#L90)

Utility to build EIP712Optional<T> types to insert in EIP-712 type arrays.

## Parameters

### typeName

`string`

EIP-712 string type name. Should be builtin or defined in the EIP712Types
structure into which this type will be merged.

## Returns

[`EIP712Types`](../interfaces/EIP712Types.md)
