[@celo/base](../README.md) / account

# Module: account

## Table of contents

### Enumerations

- [DerivationPathAliases](../enums/account.DerivationPathAliases.md)
- [MnemonicLanguages](../enums/account.MnemonicLanguages.md)
- [MnemonicStrength](../enums/account.MnemonicStrength.md)

### Interfaces

- [Bip39](../interfaces/account.Bip39.md)

### Type Aliases

- [RandomNumberGenerator](account.md#randomnumbergenerator)

### Variables

- [CELO\_DERIVATION\_PATH\_BASE](account.md#celo_derivation_path_base)
- [ETHEREUM\_DERIVATION\_PATH](account.md#ethereum_derivation_path)

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

[packages/sdk/base/src/account.ts:27](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/base/src/account.ts#L27)

## Variables

### CELO\_DERIVATION\_PATH\_BASE

• `Const` **CELO\_DERIVATION\_PATH\_BASE**: ``"m/44'/52752'/0'"``

#### Defined in

[packages/sdk/base/src/account.ts:1](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/base/src/account.ts#L1)

___

### ETHEREUM\_DERIVATION\_PATH

• `Const` **ETHEREUM\_DERIVATION\_PATH**: ``"m/44'/60'/0'"``

#### Defined in

[packages/sdk/base/src/account.ts:3](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/base/src/account.ts#L3)
