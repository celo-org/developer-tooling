[**@celo/utils**](../../README.md)

***

[@celo/utils](../../README.md) / [sign-typed-data-utils](../README.md) / zeroValue

# Function: zeroValue()

> **zeroValue**(`primaryType`, `types`): [`EIP712ObjectValue`](../type-aliases/EIP712ObjectValue.md)

Defined in: [packages/sdk/utils/src/sign-typed-data-utils.ts:276](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/utils/src/sign-typed-data-utils.ts#L276)

Produce the zero value for a given type.

## Parameters

### primaryType

`string`

### types

[`EIP712Types`](../interfaces/EIP712Types.md) = `{}`

## Returns

[`EIP712ObjectValue`](../type-aliases/EIP712ObjectValue.md)

## Remarks

All atomic types will encode as the 32-byte zero value. Dynamic types as an empty hash.
Dynamic arrays will return an empty array. Fixed length arrays will have members set to zero.
Structs will have the values of all fields set to zero recursively.

Note that EIP-712 does not specify zero values, and so this is non-standard.
