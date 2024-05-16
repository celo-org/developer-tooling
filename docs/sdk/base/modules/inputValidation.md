[@celo/base](../README.md) / inputValidation

# Module: inputValidation

## Table of contents

### Enumerations

- [ValidatorKind](../enums/inputValidation.ValidatorKind.md)

### Interfaces

- [BaseProps](../interfaces/inputValidation.BaseProps.md)

### Functions

- [validateDecimal](inputValidation.md#validatedecimal)
- [validateInteger](inputValidation.md#validateinteger)

## Functions

### validateDecimal

▸ **validateDecimal**(`input`, `decimalSeparator?`): `string`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `input` | `string` | `undefined` |
| `decimalSeparator` | `string` | `'.'` |

#### Returns

`string`

#### Defined in

[packages/sdk/base/src/inputValidation.ts:19](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/base/src/inputValidation.ts#L19)

___

### validateInteger

▸ **validateInteger**(`input`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `input` | `string` |

#### Returns

`string`

#### Defined in

[packages/sdk/base/src/inputValidation.ts:15](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/base/src/inputValidation.ts#L15)
