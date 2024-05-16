[@celo/phone-utils](../README.md) / [Exports](../modules.md) / phoneNumbers

# Module: phoneNumbers

## Table of contents

### Variables

- [PhoneNumberUtils](phoneNumbers.md#phonenumberutils)

### Functions

- [getCountryCode](phoneNumbers.md#getcountrycode)
- [getDisplayNumberInternational](phoneNumbers.md#getdisplaynumberinternational)
- [getDisplayPhoneNumber](phoneNumbers.md#getdisplayphonenumber)
- [getE164DisplayNumber](phoneNumbers.md#gete164displaynumber)
- [getE164Number](phoneNumbers.md#gete164number)
- [getExampleNumber](phoneNumbers.md#getexamplenumber)
- [getRegionCode](phoneNumbers.md#getregioncode)
- [getRegionCodeFromCountryCode](phoneNumbers.md#getregioncodefromcountrycode)
- [isE164NumberStrict](phoneNumbers.md#ise164numberstrict)
- [parsePhoneNumber](phoneNumbers.md#parsephonenumber)

## Variables

### PhoneNumberUtils

• `Const` **PhoneNumberUtils**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `getCountryCode` | (`e164PhoneNumber`: `string`) => `undefined` \| ``null`` \| `number` |
| `getDisplayPhoneNumber` | (`phoneNumber`: `string`, `defaultCountryCode`: `string`) => `string` |
| `getE164Number` | (`phoneNumber`: `string`, `defaultCountryCode`: `string`) => ``null`` \| `string` |
| `getRegionCode` | (`e164PhoneNumber`: `string`) => `undefined` \| ``null`` \| `string` |
| `isE164Number` | (`phoneNumber`: `string`) => `boolean` |
| `parsePhoneNumber` | (`phoneNumberRaw`: `string`, `defaultCountryCode?`: `string`) => `ParsedPhoneNumber` \| ``null`` |

#### Defined in

[packages/sdk/phone-utils/src/phoneNumbers.ts:239](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/phone-utils/src/phoneNumbers.ts#L239)

## Functions

### getCountryCode

▸ **getCountryCode**(`e164PhoneNumber`): `undefined` \| ``null`` \| `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `e164PhoneNumber` | `string` |

#### Returns

`undefined` \| ``null`` \| `number`

#### Defined in

[packages/sdk/phone-utils/src/phoneNumbers.ts:12](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/phone-utils/src/phoneNumbers.ts#L12)

___

### getDisplayNumberInternational

▸ **getDisplayNumberInternational**(`e164PhoneNumber`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `e164PhoneNumber` | `string` |

#### Returns

`string`

#### Defined in

[packages/sdk/phone-utils/src/phoneNumbers.ts:58](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/phone-utils/src/phoneNumbers.ts#L58)

___

### getDisplayPhoneNumber

▸ **getDisplayPhoneNumber**(`phoneNumber`, `defaultCountryCode`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `phoneNumber` | `string` |
| `defaultCountryCode` | `string` |

#### Returns

`string`

#### Defined in

[packages/sdk/phone-utils/src/phoneNumbers.ts:48](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/phone-utils/src/phoneNumbers.ts#L48)

___

### getE164DisplayNumber

▸ **getE164DisplayNumber**(`e164PhoneNumber`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `e164PhoneNumber` | `string` |

#### Returns

`string`

#### Defined in

[packages/sdk/phone-utils/src/phoneNumbers.ts:69](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/phone-utils/src/phoneNumbers.ts#L69)

___

### getE164Number

▸ **getE164Number**(`phoneNumber`, `defaultCountryCode`): ``null`` \| `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `phoneNumber` | `string` |
| `defaultCountryCode` | `string` |

#### Returns

``null`` \| `string`

#### Defined in

[packages/sdk/phone-utils/src/phoneNumbers.ts:74](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/phone-utils/src/phoneNumbers.ts#L74)

___

### getExampleNumber

▸ **getExampleNumber**(`regionCode`, `useOnlyZeroes?`, `isInternational?`): `undefined` \| `string`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `regionCode` | `string` | `undefined` |
| `useOnlyZeroes` | `boolean` | `true` |
| `isInternational` | `boolean` | `false` |

#### Returns

`undefined` \| `string`

#### Defined in

[packages/sdk/phone-utils/src/phoneNumbers.ts:211](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/phone-utils/src/phoneNumbers.ts#L211)

___

### getRegionCode

▸ **getRegionCode**(`e164PhoneNumber`): `undefined` \| ``null`` \| `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `e164PhoneNumber` | `string` |

#### Returns

`undefined` \| ``null`` \| `string`

#### Defined in

[packages/sdk/phone-utils/src/phoneNumbers.ts:24](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/phone-utils/src/phoneNumbers.ts#L24)

___

### getRegionCodeFromCountryCode

▸ **getRegionCodeFromCountryCode**(`countryCode`): ``null`` \| `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `countryCode` | `string` |

#### Returns

``null`` \| `string`

#### Defined in

[packages/sdk/phone-utils/src/phoneNumbers.ts:36](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/phone-utils/src/phoneNumbers.ts#L36)

___

### isE164NumberStrict

▸ **isE164NumberStrict**(`phoneNumber`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `phoneNumber` | `string` |

#### Returns

`boolean`

#### Defined in

[packages/sdk/phone-utils/src/phoneNumbers.ts:84](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/phone-utils/src/phoneNumbers.ts#L84)

___

### parsePhoneNumber

▸ **parsePhoneNumber**(`phoneNumberRaw`, `defaultCountryCode?`): `ParsedPhoneNumber` \| ``null``

#### Parameters

| Name | Type |
| :------ | :------ |
| `phoneNumberRaw` | `string` |
| `defaultCountryCode?` | `string` |

#### Returns

`ParsedPhoneNumber` \| ``null``

#### Defined in

[packages/sdk/phone-utils/src/phoneNumbers.ts:96](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/phone-utils/src/phoneNumbers.ts#L96)
