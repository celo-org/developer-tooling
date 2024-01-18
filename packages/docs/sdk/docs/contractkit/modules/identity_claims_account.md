[@celo/contractkit](../README.md) / [Exports](../modules.md) / identity/claims/account

# Module: identity/claims/account

## Table of contents

### Type Aliases

- [AccountClaim](identity_claims_account.md#accountclaim)

### Variables

- [AccountClaimType](identity_claims_account.md#accountclaimtype)
- [AccountClaimTypeH](identity_claims_account.md#accountclaimtypeh)

### Functions

- [createAccountClaim](identity_claims_account.md#createaccountclaim)

## Type Aliases

### AccountClaim

Ƭ **AccountClaim**: `t.TypeOf`\<typeof [`AccountClaimTypeH`](identity_claims_account.md#accountclaimtypeh)\>

#### Defined in

[packages/sdk/contractkit/src/identity/claims/account.ts:35](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/identity/claims/account.ts#L35)

## Variables

### AccountClaimType

• `Const` **AccountClaimType**: `Type`\<\{ `address`: `string` = AddressType; `publicKey`: `undefined` \| `string` ; `timestamp`: `number` = TimestampType; `type`: [`ACCOUNT`](../enums/identity_claims_types.ClaimTypes.md#account)  }, `any`, `unknown`\>

#### Defined in

[packages/sdk/contractkit/src/identity/claims/account.ts:19](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/identity/claims/account.ts#L19)

___

### AccountClaimTypeH

• `Const` **AccountClaimTypeH**: `TypeC`\<\{ `address`: `Type`\<`string`, `string`, `unknown`\> = AddressType; `publicKey`: `UnionC`\<[`UndefinedC`, `Type`\<`string`, `string`, `unknown`\>]\> ; `timestamp`: `NumberC` = TimestampType; `type`: `LiteralC`\<[`ACCOUNT`](../enums/identity_claims_types.ClaimTypes.md#account)\>  }\>

Provide the type minus the validation that the public key and address are derived from the same private key

#### Defined in

[packages/sdk/contractkit/src/identity/claims/account.ts:11](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/identity/claims/account.ts#L11)

## Functions

### createAccountClaim

▸ **createAccountClaim**(`address`, `publicKey?`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |
| `publicKey?` | `string` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `address` | `string` |
| `publicKey` | `undefined` \| `string` |
| `timestamp` | `number` |
| `type` | [`ACCOUNT`](../enums/identity_claims_types.ClaimTypes.md#account) |

#### Defined in

[packages/sdk/contractkit/src/identity/claims/account.ts:37](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/identity/claims/account.ts#L37)
