[@celo/metadata-claims](../README.md) / keybase

# Module: keybase

## Table of contents

### Variables

- [keybaseFilePathToProof](keybase.md#keybasefilepathtoproof)

### Functions

- [createKeybaseClaim](keybase.md#createkeybaseclaim)
- [proofFileName](keybase.md#prooffilename)
- [targetURL](keybase.md#targeturl)
- [verifyKeybaseClaim](keybase.md#verifykeybaseclaim)

## Variables

### keybaseFilePathToProof

• `Const` **keybaseFilePathToProof**: ``".well-known/celo/"``

#### Defined in

[packages/sdk/metadata-claims/src/keybase.ts:8](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/metadata-claims/src/keybase.ts#L8)

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
| `type` | [`KEYBASE`](../enums/types.ClaimTypes.md#keybase) |
| `username` | `string` |

#### Defined in

[packages/sdk/metadata-claims/src/keybase.ts:71](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/metadata-claims/src/keybase.ts#L71)

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

[packages/sdk/metadata-claims/src/keybase.ts:9](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/metadata-claims/src/keybase.ts#L9)

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

[packages/sdk/metadata-claims/src/keybase.ts:10](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/metadata-claims/src/keybase.ts#L10)

___

### verifyKeybaseClaim

▸ **verifyKeybaseClaim**(`accountsInfoGetters`, `claim`, `signer`): `Promise`\<`string` \| `undefined`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `accountsInfoGetters` | [`AccountMetadataSignerGetters`](types.md#accountmetadatasignergetters) | `undefined` |
| `claim` | `Object` | `undefined` |
| `claim.timestamp` | `number` | `TimestampType` |
| `claim.type` | [`KEYBASE`](../enums/types.ClaimTypes.md#keybase) | `undefined` |
| `claim.username` | `string` | `t.string` |
| `signer` | `string` | `undefined` |

#### Returns

`Promise`\<`string` \| `undefined`\>

a human readable string with claims (non)verifiability or undefined

**`Remarks`**

If verification encounters an error, returns the error message as a string
otherwise returns undefined when successful

#### Defined in

[packages/sdk/metadata-claims/src/keybase.ts:25](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/metadata-claims/src/keybase.ts#L25)
