[@celo/base](../README.md) / phoneNumbers

# Module: phoneNumbers

## Table of contents

### Interfaces

- [ParsedPhoneNumber](../interfaces/phoneNumbers.ParsedPhoneNumber.md)

### Variables

- [PhoneNumberBase](phoneNumbers.md#phonenumberbase)

### Functions

- [anonymizedPhone](phoneNumbers.md#anonymizedphone)
- [isE164Number](phoneNumbers.md#ise164number)

## Variables

### PhoneNumberBase

• `Const` **PhoneNumberBase**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `isE164Number` | (`phoneNumber`: `string`) => `boolean` |

#### Defined in

[packages/sdk/base/src/phoneNumbers.ts:19](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/base/src/phoneNumbers.ts#L19)

## Functions

### anonymizedPhone

▸ **anonymizedPhone**(`phoneNumber`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `phoneNumber` | `string` |

#### Returns

`string`

#### Defined in

[packages/sdk/base/src/phoneNumbers.ts:15](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/base/src/phoneNumbers.ts#L15)

___

### isE164Number

▸ **isE164Number**(`phoneNumber`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `phoneNumber` | `string` |

#### Returns

`boolean`

#### Defined in

[packages/sdk/base/src/phoneNumbers.ts:11](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/base/src/phoneNumbers.ts#L11)
