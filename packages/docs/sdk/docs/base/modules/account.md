[@celo/base](../README.md) / account

# Module: account

## Table of contents

### Enumerations

- [MnemonicLanguages](../enums/account.MnemonicLanguages.md)
- [MnemonicStrength](../enums/account.MnemonicStrength.md)

### Interfaces

- [Bip39](../interfaces/account.Bip39.md)

### Type Aliases

- [RandomNumberGenerator](account.md#randomnumbergenerator)

### Variables

- [CELO\_DERIVATION\_PATH\_BASE](account.md#celo_derivation_path_base)

## Type Aliases

### RandomNumberGenerator

Ƭ **RandomNumberGenerator**: (`size`: `number`, `callback`: (`err`: `Error` \| ``null``, `buf`: `Buffer`) => `void`) => `void`

#### Type declaration

▸ (`size`, `callback`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `size` | `number` |
| `callback` | (`err`: `Error` \| ``null``, `buf`: `Buffer`) => `void` |

##### Returns

`void`

#### Defined in

[packages/sdk/base/src/account.ts:20](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/base/src/account.ts#L20)

## Variables

### CELO\_DERIVATION\_PATH\_BASE

• `Const` **CELO\_DERIVATION\_PATH\_BASE**: ``"m/44'/52752'/0'"``

#### Defined in

[packages/sdk/base/src/account.ts:1](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/base/src/account.ts#L1)
