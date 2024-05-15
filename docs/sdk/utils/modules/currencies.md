[@celo/utils](../README.md) / currencies

# Module: currencies

## Table of contents

### Enumerations

- [CURRENCY\_ENUM](../enums/currencies.CURRENCY_ENUM.md)
- [SHORT\_CURRENCIES](../enums/currencies.SHORT_CURRENCIES.md)

### Variables

- [CURRENCIES](currencies.md#currencies)
- [currencyToShortMap](currencies.md#currencytoshortmap)

### Functions

- [resolveCurrency](currencies.md#resolvecurrency)

## Variables

### CURRENCIES

• `Const` **CURRENCIES**: `CurrencyObject`

**`Deprecated`**

#### Defined in

packages/sdk/base/lib/currencies.d.ts:25

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

packages/sdk/base/lib/currencies.d.ts:34

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

packages/sdk/base/lib/currencies.d.ts:26
