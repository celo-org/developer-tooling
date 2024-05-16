[@celo/utils](../README.md) / parsing

# Module: parsing

## Table of contents

### Functions

- [parseInputAmount](parsing.md#parseinputamount)
- [parseSolidityStringArray](parsing.md#parsesoliditystringarray)
- [stringToBoolean](parsing.md#stringtoboolean)

## Functions

### parseInputAmount

▸ **parseInputAmount**(`inputString`, `decimalSeparator?`): `BigNumber`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `inputString` | `string` | `undefined` |
| `decimalSeparator` | `string` | `'.'` |

#### Returns

`BigNumber`

#### Defined in

[packages/sdk/utils/src/parsing.ts:7](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/utils/src/parsing.ts#L7)

___

### parseSolidityStringArray

▸ **parseSolidityStringArray**(`stringLengths`, `data`): `string`[]

Parses an "array of strings" that is returned from a Solidity function

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `stringLengths` | `number`[] | length of each string in bytes |
| `data` | `string` | 0x-prefixed, hex-encoded string data in utf-8 bytes |

#### Returns

`string`[]

#### Defined in

packages/sdk/base/lib/parsing.d.ts:8

___

### stringToBoolean

▸ **stringToBoolean**(`inputString`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `inputString` | `string` |

#### Returns

`boolean`

#### Defined in

packages/sdk/base/lib/parsing.d.ts:1
