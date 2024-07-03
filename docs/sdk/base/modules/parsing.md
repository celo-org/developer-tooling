[@celo/base](../README.md) / parsing

# Module: parsing

## Table of contents

### Functions

- [parseSolidityStringArray](parsing.md#parsesoliditystringarray)
- [stringToBoolean](parsing.md#stringtoboolean)

## Functions

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

[packages/sdk/base/src/parsing.ts:17](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/base/src/parsing.ts#L17)

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

[packages/sdk/base/src/parsing.ts:1](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/base/src/parsing.ts#L1)
