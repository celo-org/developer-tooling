[**@celo/utils**](../../README.md)

***

[@celo/utils](../../README.md) / [sign-typed-data-utils](../README.md) / encodeType

# Function: encodeType()

> **encodeType**(`primaryType`, `types`): `string`

Defined in: [packages/sdk/utils/src/sign-typed-data-utils.ts:184](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/utils/src/sign-typed-data-utils.ts#L184)

Creates a string encoding of the primary type, including all dependencies.
E.g. "Transaction(Person from,Person to,Asset tx)Asset(address token,uint256 amount)Person(address wallet,string name)"

## Parameters

### primaryType

`string`

### types

[`EIP712Types`](../interfaces/EIP712Types.md)

## Returns

`string`
