[@celo/phone-utils](../README.md) / [Exports](../modules.md) / [countries](../modules/countries.md) / LocalizedCountry

# Interface: LocalizedCountry

[countries](../modules/countries.md).LocalizedCountry

## Hierarchy

- `Omit`\<`countryData.Country`, ``"countryCallingCodes"``\>

  ↳ **`LocalizedCountry`**

## Table of contents

### Properties

- [alpha2](countries.LocalizedCountry.md#alpha2)
- [alpha3](countries.LocalizedCountry.md#alpha3)
- [countryCallingCode](countries.LocalizedCountry.md#countrycallingcode)
- [countryPhonePlaceholder](countries.LocalizedCountry.md#countryphoneplaceholder)
- [currencies](countries.LocalizedCountry.md#currencies)
- [displayName](countries.LocalizedCountry.md#displayname)
- [displayNameNoDiacritics](countries.LocalizedCountry.md#displaynamenodiacritics)
- [emoji](countries.LocalizedCountry.md#emoji)
- [ioc](countries.LocalizedCountry.md#ioc)
- [languages](countries.LocalizedCountry.md#languages)
- [name](countries.LocalizedCountry.md#name)
- [names](countries.LocalizedCountry.md#names)
- [status](countries.LocalizedCountry.md#status)

## Properties

### alpha2

• `Readonly` **alpha2**: `string`

#### Inherited from

Omit.alpha2

#### Defined in

node_modules/@types/country-data/index.d.ts:7

___

### alpha3

• `Readonly` **alpha3**: `string`

#### Inherited from

Omit.alpha3

#### Defined in

node_modules/@types/country-data/index.d.ts:8

___

### countryCallingCode

• **countryCallingCode**: `string`

#### Defined in

[packages/sdk/phone-utils/src/countries.ts:18](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/phone-utils/src/countries.ts#L18)

___

### countryPhonePlaceholder

• **countryPhonePlaceholder**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `international?` | `string` |
| `national?` | `string` |

#### Defined in

[packages/sdk/phone-utils/src/countries.ts:14](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/phone-utils/src/countries.ts#L14)

___

### currencies

• `Readonly` **currencies**: readonly `string`[]

#### Inherited from

Omit.currencies

#### Defined in

node_modules/@types/country-data/index.d.ts:10

___

### displayName

• **displayName**: `string`

#### Defined in

[packages/sdk/phone-utils/src/countries.ts:11](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/phone-utils/src/countries.ts#L11)

___

### displayNameNoDiacritics

• **displayNameNoDiacritics**: `string`

#### Defined in

[packages/sdk/phone-utils/src/countries.ts:12](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/phone-utils/src/countries.ts#L12)

___

### emoji

• `Readonly` **emoji**: `string`

#### Inherited from

Omit.emoji

#### Defined in

node_modules/@types/country-data/index.d.ts:11

___

### ioc

• `Readonly` **ioc**: `string`

#### Inherited from

Omit.ioc

#### Defined in

node_modules/@types/country-data/index.d.ts:12

___

### languages

• `Readonly` **languages**: readonly `string`[]

#### Inherited from

Omit.languages

#### Defined in

node_modules/@types/country-data/index.d.ts:13

___

### name

• `Readonly` **name**: `string`

#### Inherited from

Omit.name

#### Defined in

node_modules/@types/country-data/index.d.ts:14

___

### names

• **names**: `CountryNames`

#### Defined in

[packages/sdk/phone-utils/src/countries.ts:13](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/phone-utils/src/countries.ts#L13)

___

### status

• `Readonly` **status**: `string`

#### Inherited from

Omit.status

#### Defined in

node_modules/@types/country-data/index.d.ts:15
