[@celo/base](../README.md) / currencies

# Module: currencies

## Table of contents

### Enumerations

- [CURRENCY\_ENUM](../enums/currencies.CURRENCY_ENUM.md)
- [SHORT\_CURRENCIES](../enums/currencies.SHORT_CURRENCIES.md)
- [StableToken](../enums/currencies.StableToken.md)
- [Token](../enums/currencies.Token.md)

### Type Aliases

- [CeloTokenType](currencies.md#celotokentype)

### Variables

- [CURRENCIES](currencies.md#currencies)
- [currencyToShortMap](currencies.md#currencytoshortmap)

### Functions

- [resolveCurrency](currencies.md#resolvecurrency)

## Type Aliases

### CeloTokenType

Ƭ **CeloTokenType**: [`StableToken`](../enums/currencies.StableToken.md) \| [`Token`](../enums/currencies.Token.md)

#### Defined in

[packages/sdk/base/src/currencies.ts:18](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/base/src/currencies.ts#L18)

## Variables

### CURRENCIES

• `Const` **CURRENCIES**: `CurrencyObject`

**`Deprecated`**

#### Defined in

[packages/sdk/base/src/currencies.ts:29](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/base/src/currencies.ts#L29)

___

### currencyToShortMap

• `Const` **currencyToShortMap**: `Object`

**`Deprecated`**

use StableToken and Token

#### Type declaration

| Name | Type |
| :------ | :------ |
| `Celo Dollar` | [`SHORT_CURRENCIES`](../enums/currencies.SHORT_CURRENCIES.md) |
| `Celo Euro` | [`SHORT_CURRENCIES`](../enums/currencies.SHORT_CURRENCIES.md) |
| `Celo Gold` | [`SHORT_CURRENCIES`](../enums/currencies.SHORT_CURRENCIES.md) |

#### Defined in

[packages/sdk/base/src/currencies.ts:68](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/base/src/currencies.ts#L68)

## Functions

### resolveCurrency

▸ **resolveCurrency**(`label`): [`CURRENCY_ENUM`](../enums/currencies.CURRENCY_ENUM.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `label` | `string` |

#### Returns

[`CURRENCY_ENUM`](../enums/currencies.CURRENCY_ENUM.md)

#### Defined in

[packages/sdk/base/src/currencies.ts:47](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/base/src/currencies.ts#L47)
