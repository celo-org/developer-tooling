[**@celo/utils**](../../README.md)

***

[@celo/utils](../../README.md) / [sign-typed-data-utils](../README.md) / eip712OptionalSchema

# Function: eip712OptionalSchema()

> **eip712OptionalSchema**\<`S`\>(`schema`): `TypeC`\<\{ `defined`: `BooleanC`; `value`: `S`; \}\>

Defined in: [packages/sdk/utils/src/sign-typed-data-utils.ts:101](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/utils/src/sign-typed-data-utils.ts#L101)

Utility to build EIP712Optional<T> schemas for encoding and decoding with io-ts.

## Type Parameters

### S

`S` *extends* `Mixed`

## Parameters

### schema

`S`

io-ts type (a.k.a. schema or codec) describing the inner type.

## Returns

`TypeC`\<\{ `defined`: `BooleanC`; `value`: `S`; \}\>
