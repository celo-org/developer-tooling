[**@celo/phone-utils v6.0.7**](../README.md)

***

[@celo/phone-utils](../globals.md) / Countries

# Class: Countries

Defined in: [packages/sdk/phone-utils/src/countries.ts:37](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/phone-utils/src/countries.ts#L37)

## Constructors

### Constructor

> **new Countries**(`language?`): `Countries`

Defined in: [packages/sdk/phone-utils/src/countries.ts:42](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/phone-utils/src/countries.ts#L42)

#### Parameters

##### language?

`string`

#### Returns

`Countries`

## Properties

### countryMap

> **countryMap**: `Map`\<`string`, [`LocalizedCountry`](../interfaces/LocalizedCountry.md)\>

Defined in: [packages/sdk/phone-utils/src/countries.ts:39](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/phone-utils/src/countries.ts#L39)

***

### language

> **language**: `string`

Defined in: [packages/sdk/phone-utils/src/countries.ts:38](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/phone-utils/src/countries.ts#L38)

***

### localizedCountries

> **localizedCountries**: [`LocalizedCountry`](../interfaces/LocalizedCountry.md)[]

Defined in: [packages/sdk/phone-utils/src/countries.ts:40](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/phone-utils/src/countries.ts#L40)

## Methods

### getCountry()

> **getCountry**(`countryName?`): `undefined` \| [`LocalizedCountry`](../interfaces/LocalizedCountry.md)

Defined in: [packages/sdk/phone-utils/src/countries.ts:50](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/phone-utils/src/countries.ts#L50)

#### Parameters

##### countryName?

`null` | `string`

#### Returns

`undefined` \| [`LocalizedCountry`](../interfaces/LocalizedCountry.md)

***

### getCountryByCodeAlpha2()

> **getCountryByCodeAlpha2**(`countryCode`): `undefined` \| [`LocalizedCountry`](../interfaces/LocalizedCountry.md)

Defined in: [packages/sdk/phone-utils/src/countries.ts:60](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/phone-utils/src/countries.ts#L60)

#### Parameters

##### countryCode

`string`

#### Returns

`undefined` \| [`LocalizedCountry`](../interfaces/LocalizedCountry.md)

***

### getFilteredCountries()

> **getFilteredCountries**(`query`): [`LocalizedCountry`](../interfaces/LocalizedCountry.md)[]

Defined in: [packages/sdk/phone-utils/src/countries.ts:64](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/phone-utils/src/countries.ts#L64)

#### Parameters

##### query

`string`

#### Returns

[`LocalizedCountry`](../interfaces/LocalizedCountry.md)[]
