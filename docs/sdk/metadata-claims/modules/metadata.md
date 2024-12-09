[@celo/metadata-claims](../README.md) / metadata

# Module: metadata

## Table of contents

### References

- [ClaimTypes](metadata.md#claimtypes)

### Classes

- [IdentityMetadataWrapper](../classes/metadata.IdentityMetadataWrapper.md)

### Type Aliases

- [IdentityMetadata](metadata.md#identitymetadata)

### Variables

- [IdentityMetadataType](metadata.md#identitymetadatatype)

## References

### ClaimTypes

Re-exports [ClaimTypes](../enums/types.ClaimTypes.md)

## Type Aliases

### IdentityMetadata

Ƭ **IdentityMetadata**: `t.TypeOf`\<typeof [`IdentityMetadataType`](metadata.md#identitymetadatatype)\>

#### Defined in

[packages/sdk/metadata-claims/src/metadata.ts:32](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/metadata-claims/src/metadata.ts#L32)

## Variables

### IdentityMetadataType

• `Const` **IdentityMetadataType**: `TypeC`\<\{ `claims`: `ArrayC`\<`UnionC`\<[`Type`\<\{ `address`: `string` = AddressType; `publicKey`: `undefined` \| `string` ; `timestamp`: `number` = TimestampType; `type`: [`ACCOUNT`](../enums/types.ClaimTypes.md#account)  }, `any`, `unknown`\>, `TypeC`\<\{ `domain`: `StringC` = t.string; `timestamp`: `NumberC` = TimestampType; `type`: `LiteralC`\<[`DOMAIN`](../enums/types.ClaimTypes.md#domain)\>  }\>, `TypeC`\<\{ `rpcUrl`: `StringC` = t.string; `timestamp`: `NumberC` = TimestampType; `type`: `LiteralC`\<[`RPC_URL`](../enums/types.ClaimTypes.md#rpc_url)\>  }\>, `TypeC`\<\{ `timestamp`: `NumberC` = TimestampType; `type`: `LiteralC`\<[`KEYBASE`](../enums/types.ClaimTypes.md#keybase)\> ; `username`: `StringC` = t.string }\>]\>\> ; `meta`: `TypeC`\<\{ `address`: `Type`\<`string`, `string`, `unknown`\> = AddressType; `signature`: `StringC` = SignatureType }\> = MetaType }\>

#### Defined in

[packages/sdk/metadata-claims/src/metadata.ts:27](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/metadata-claims/src/metadata.ts#L27)
