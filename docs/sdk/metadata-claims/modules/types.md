[@celo/metadata-claims](../README.md) / types

# Module: types

## Table of contents

### Enumerations

- [ClaimTypes](../enums/types.ClaimTypes.md)

### Type Aliases

- [AccountMetadataSignerGetters](types.md#accountmetadatasignergetters)
- [AccountSignerGetters](types.md#accountsignergetters)

### Variables

- [SINGULAR\_CLAIM\_TYPES](types.md#singular_claim_types)
- [SignatureType](types.md#signaturetype)
- [TimestampType](types.md#timestamptype)
- [VERIFIABLE\_CLAIM\_TYPES](types.md#verifiable_claim_types)

### Functions

- [now](types.md#now)

## Type Aliases

### AccountMetadataSignerGetters

Ƭ **AccountMetadataSignerGetters**: \{ `getMetadataURL`: (`address`: `string`) => `Promise`\<`string`\>  } & [`AccountSignerGetters`](types.md#accountsignergetters)

#### Defined in

[packages/sdk/metadata-claims/src/types.ts:32](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/metadata-claims/src/types.ts#L32)

___

### AccountSignerGetters

Ƭ **AccountSignerGetters**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `getAttestationSigner` | (`address`: `Address`) => `Promise`\<`StrongAddress`\> |
| `getValidatorSigner` | (`address`: `Address`) => `Promise`\<`StrongAddress`\> |
| `getVoteSigner` | (`address`: `Address`) => `Promise`\<`StrongAddress`\> |
| `isAccount` | (`address`: `Address`) => `Promise`\<`boolean`\> |

#### Defined in

[packages/sdk/metadata-claims/src/types.ts:25](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/metadata-claims/src/types.ts#L25)

## Variables

### SINGULAR\_CLAIM\_TYPES

• `Const` **SINGULAR\_CLAIM\_TYPES**: [`ClaimTypes`](../enums/types.ClaimTypes.md)[]

#### Defined in

[packages/sdk/metadata-claims/src/types.ts:23](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/metadata-claims/src/types.ts#L23)

___

### SignatureType

• `Const` **SignatureType**: `StringC` = `t.string`

#### Defined in

[packages/sdk/metadata-claims/src/types.ts:5](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/metadata-claims/src/types.ts#L5)

___

### TimestampType

• `Const` **TimestampType**: `NumberC` = `t.number`

#### Defined in

[packages/sdk/metadata-claims/src/types.ts:6](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/metadata-claims/src/types.ts#L6)

___

### VERIFIABLE\_CLAIM\_TYPES

• `Const` **VERIFIABLE\_CLAIM\_TYPES**: [`ClaimTypes`](../enums/types.ClaimTypes.md)[]

#### Defined in

[packages/sdk/metadata-claims/src/types.ts:22](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/metadata-claims/src/types.ts#L22)

## Functions

### now

▸ **now**(): `number`

#### Returns

`number`

#### Defined in

[packages/sdk/metadata-claims/src/types.ts:9](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/metadata-claims/src/types.ts#L9)
