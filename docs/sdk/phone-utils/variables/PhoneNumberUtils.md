[**@celo/phone-utils v6.0.7**](../README.md)

***

[@celo/phone-utils](../globals.md) / PhoneNumberUtils

# Variable: PhoneNumberUtils

> `const` **PhoneNumberUtils**: `object`

Defined in: [packages/sdk/phone-utils/src/phoneNumbers.ts:239](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/phone-utils/src/phoneNumbers.ts#L239)

## Type declaration

### getCountryCode()

> **getCountryCode**: (`e164PhoneNumber`) => `undefined` \| `null` \| `number`

#### Parameters

##### e164PhoneNumber

`string`

#### Returns

`undefined` \| `null` \| `number`

### getDisplayPhoneNumber()

> **getDisplayPhoneNumber**: (`phoneNumber`, `defaultCountryCode`) => `string`

#### Parameters

##### phoneNumber

`string`

##### defaultCountryCode

`string`

#### Returns

`string`

### getE164Number()

> **getE164Number**: (`phoneNumber`, `defaultCountryCode`) => `null` \| `string`

#### Parameters

##### phoneNumber

`string`

##### defaultCountryCode

`string`

#### Returns

`null` \| `string`

### getRegionCode()

> **getRegionCode**: (`e164PhoneNumber`) => `undefined` \| `null` \| `string`

#### Parameters

##### e164PhoneNumber

`string`

#### Returns

`undefined` \| `null` \| `string`

### isE164Number()

> **isE164Number**: (`phoneNumber`) => `boolean`

#### Parameters

##### phoneNumber

`string`

#### Returns

`boolean`

### parsePhoneNumber()

> **parsePhoneNumber**: (`phoneNumberRaw`, `defaultCountryCode?`) => `null` \| `ParsedPhoneNumber`

#### Parameters

##### phoneNumberRaw

`string`

##### defaultCountryCode?

`string`

#### Returns

`null` \| `ParsedPhoneNumber`
