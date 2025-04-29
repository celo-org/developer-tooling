[**@celo/utils**](../../README.md)

***

[@celo/utils](../../README.md) / [sign-typed-data-utils](../README.md) / EIP712Optional

# Type Alias: EIP712Optional\<T\>

> **EIP712Optional**\<`T`\> = `object`

Defined in: [packages/sdk/utils/src/sign-typed-data-utils.ts:80](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/utils/src/sign-typed-data-utils.ts#L80)

Utility type representing an optional value in a EIP-712 compatible manner, as long as the
concrete type T is a subtype of EIP712ObjectValue.

## Remarks

EIP712Optonal is not part of the EIP712 standard, but is fully compatible with it.

## Type Parameters

### T

`T` *extends* [`EIP712ObjectValue`](EIP712ObjectValue.md)

## Properties

### defined

> **defined**: `boolean`

Defined in: [packages/sdk/utils/src/sign-typed-data-utils.ts:81](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/utils/src/sign-typed-data-utils.ts#L81)

***

### value

> **value**: `T`

Defined in: [packages/sdk/utils/src/sign-typed-data-utils.ts:82](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/utils/src/sign-typed-data-utils.ts#L82)
