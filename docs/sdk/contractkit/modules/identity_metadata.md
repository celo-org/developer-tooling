[@celo/contractkit](../README.md) / [Exports](../modules.md) / identity/metadata

# Module: identity/metadata

## Table of contents

### References

- [ClaimTypes](identity_metadata.md#claimtypes)

### Classes

- [IdentityMetadataWrapper](../classes/identity_metadata.IdentityMetadataWrapper.md)

### Type Aliases

- [IdentityMetadata](identity_metadata.md#identitymetadata)

### Variables

- [IdentityMetadataType](identity_metadata.md#identitymetadatatype)

## References

### ClaimTypes

Re-exports [ClaimTypes](../enums/identity_claims_types.ClaimTypes.md)

## Type Aliases

### IdentityMetadata

Ƭ **IdentityMetadata**: `t.TypeOf`\<typeof [`IdentityMetadataType`](identity_metadata.md#identitymetadatatype)\>

#### Defined in

[packages/sdk/contractkit/src/identity/metadata.ts:29](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/identity/metadata.ts#L29)

## Variables

### IdentityMetadataType

• `Const` **IdentityMetadataType**: `TypeC`\<\{ `claims`: `ArrayC`\<`UnionC`\<[`Type`\<\{ `address`: `string` = AddressType; `publicKey`: `undefined` \| `string` ; `timestamp`: `number` = TimestampType; `type`: [`ACCOUNT`](../enums/identity_claims_types.ClaimTypes.md#account)  }, `any`, `unknown`\>, `TypeC`\<\{ `domain`: `StringC` = t.string; `timestamp`: `NumberC` = TimestampType; `type`: `LiteralC`\<[`DOMAIN`](../enums/identity_claims_types.ClaimTypes.md#domain)\>  }\>, `TypeC`\<\{ `timestamp`: `NumberC` = TimestampType; `type`: `LiteralC`\<[`KEYBASE`](../enums/identity_claims_types.ClaimTypes.md#keybase)\> ; `username`: `StringC` = t.string }\>, `TypeC`\<\{ `name`: `StringC` = t.string; `timestamp`: `NumberC` = TimestampType; `type`: `LiteralC`\<[`NAME`](../enums/identity_claims_types.ClaimTypes.md#name)\>  }\>, `TypeC`\<\{ `address`: `StringC` = t.string; `filteredDataPaths`: `StringC` = t.string; `timestamp`: `NumberC` = TimestampType; `type`: `LiteralC`\<[`STORAGE`](../enums/identity_claims_types.ClaimTypes.md#storage)\>  }\>]\>\> ; `meta`: `TypeC`\<\{ `address`: `Type`\<`string`, `string`, `unknown`\> = AddressType; `signature`: `StringC` = SignatureType }\> = MetaType }\>

#### Defined in

[packages/sdk/contractkit/src/identity/metadata.ts:24](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/identity/metadata.ts#L24)
