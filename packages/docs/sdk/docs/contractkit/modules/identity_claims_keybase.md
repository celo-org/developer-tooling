[@celo/contractkit](../README.md) / [Exports](../modules.md) / identity/claims/keybase

# Module: identity/claims/keybase

## Table of contents

### Variables

- [keybaseFilePathToProof](identity_claims_keybase.md#keybasefilepathtoproof)

### Functions

- [createKeybaseClaim](identity_claims_keybase.md#createkeybaseclaim)
- [proofFileName](identity_claims_keybase.md#prooffilename)
- [targetURL](identity_claims_keybase.md#targeturl)
- [verifyKeybaseClaim](identity_claims_keybase.md#verifykeybaseclaim)

## Variables

### keybaseFilePathToProof

• `Const` **keybaseFilePathToProof**: ``".well-known/celo/"``

#### Defined in

[packages/sdk/contractkit/src/identity/claims/keybase.ts:9](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/identity/claims/keybase.ts#L9)

## Functions

### createKeybaseClaim

▸ **createKeybaseClaim**(`username`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `username` | `string` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `timestamp` | `number` |
| `type` | [`KEYBASE`](../enums/identity_claims_types.ClaimTypes.md#keybase) |
| `username` | `string` |

#### Defined in

[packages/sdk/contractkit/src/identity/claims/keybase.ts:72](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/identity/claims/keybase.ts#L72)

___

### proofFileName

▸ **proofFileName**(`address`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |

#### Returns

`string`

#### Defined in

[packages/sdk/contractkit/src/identity/claims/keybase.ts:10](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/identity/claims/keybase.ts#L10)

___

### targetURL

▸ **targetURL**(`username`, `address`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `username` | `string` |
| `address` | `string` |

#### Returns

`string`

#### Defined in

[packages/sdk/contractkit/src/identity/claims/keybase.ts:11](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/identity/claims/keybase.ts#L11)

___

### verifyKeybaseClaim

▸ **verifyKeybaseClaim**(`kit`, `claim`, `signer`): `Promise`\<`string` \| `undefined`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `kit` | [`ContractKit`](../classes/kit.ContractKit.md) | `undefined` |
| `claim` | `Object` | `undefined` |
| `claim.timestamp` | `number` | `TimestampType` |
| `claim.type` | [`KEYBASE`](../enums/identity_claims_types.ClaimTypes.md#keybase) | `undefined` |
| `claim.username` | `string` | `t.string` |
| `signer` | `string` | `undefined` |

#### Returns

`Promise`\<`string` \| `undefined`\>

a human readable string with claims (non)verifiability or undefined

**`Remarks`**

If verification encounters an error, returns the error message as a string
otherwise returns undefined when successful

#### Defined in

[packages/sdk/contractkit/src/identity/claims/keybase.ts:26](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/identity/claims/keybase.ts#L26)
