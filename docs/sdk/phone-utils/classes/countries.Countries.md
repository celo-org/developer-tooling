[@celo/phone-utils](../README.md) / [Exports](../modules.md) / [countries](../modules/countries.md) / Countries

# Class: Countries

[countries](../modules/countries.md).Countries

## Table of contents

### Constructors

- [constructor](countries.Countries.md#constructor)

### Properties

- [countryMap](countries.Countries.md#countrymap)
- [language](countries.Countries.md#language)
- [localizedCountries](countries.Countries.md#localizedcountries)

### Methods

- [getCountry](countries.Countries.md#getcountry)
- [getCountryByCodeAlpha2](countries.Countries.md#getcountrybycodealpha2)
- [getFilteredCountries](countries.Countries.md#getfilteredcountries)

## Constructors

### constructor

• **new Countries**(`language?`): [`Countries`](countries.Countries.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `language?` | `string` |

#### Returns

[`Countries`](countries.Countries.md)

#### Defined in

[packages/sdk/phone-utils/src/countries.ts:42](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/phone-utils/src/countries.ts#L42)

## Properties

### countryMap

• **countryMap**: `Map`\<`string`, [`LocalizedCountry`](../interfaces/countries.LocalizedCountry.md)\>

#### Defined in

[packages/sdk/phone-utils/src/countries.ts:39](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/phone-utils/src/countries.ts#L39)

___

### language

• **language**: `string`

#### Defined in

[packages/sdk/phone-utils/src/countries.ts:38](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/phone-utils/src/countries.ts#L38)

___

### localizedCountries

• **localizedCountries**: [`LocalizedCountry`](../interfaces/countries.LocalizedCountry.md)[]

#### Defined in

[packages/sdk/phone-utils/src/countries.ts:40](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/phone-utils/src/countries.ts#L40)

## Methods

### getCountry

▸ **getCountry**(`countryName?`): `undefined` \| [`LocalizedCountry`](../interfaces/countries.LocalizedCountry.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `countryName?` | ``null`` \| `string` |

#### Returns

`undefined` \| [`LocalizedCountry`](../interfaces/countries.LocalizedCountry.md)

#### Defined in

[packages/sdk/phone-utils/src/countries.ts:50](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/phone-utils/src/countries.ts#L50)

___

### getCountryByCodeAlpha2

▸ **getCountryByCodeAlpha2**(`countryCode`): `undefined` \| [`LocalizedCountry`](../interfaces/countries.LocalizedCountry.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `countryCode` | `string` |

#### Returns

`undefined` \| [`LocalizedCountry`](../interfaces/countries.LocalizedCountry.md)

#### Defined in

[packages/sdk/phone-utils/src/countries.ts:60](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/phone-utils/src/countries.ts#L60)

___

### getFilteredCountries

▸ **getFilteredCountries**(`query`): [`LocalizedCountry`](../interfaces/countries.LocalizedCountry.md)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `query` | `string` |

#### Returns

[`LocalizedCountry`](../interfaces/countries.LocalizedCountry.md)[]

#### Defined in

[packages/sdk/phone-utils/src/countries.ts:64](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/phone-utils/src/countries.ts#L64)
