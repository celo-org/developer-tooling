[@celo/utils](../README.md) / istanbul

# Module: istanbul

## Table of contents

### Interfaces

- [IstanbulExtra](../interfaces/istanbul.IstanbulExtra.md)
- [Seal](../interfaces/istanbul.Seal.md)

### Type Aliases

- [Bitmap](istanbul.md#bitmap)

### Variables

- [IstanbulUtils](istanbul.md#istanbulutils)

### Functions

- [bitIsSet](istanbul.md#bitisset)
- [parseBlockExtraData](istanbul.md#parseblockextradata)

## Type Aliases

### Bitmap

Ƭ **Bitmap**: `BigNumber`

#### Defined in

[packages/sdk/utils/src/istanbul.ts:12](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/utils/src/istanbul.ts#L12)

## Variables

### IstanbulUtils

• `Const` **IstanbulUtils**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `bitIsSet` | (`bitmap`: `BigNumber`, `index`: `number`) => `boolean` |
| `parseBlockExtraData` | (`data`: `string`) => [`IstanbulExtra`](../interfaces/istanbul.IstanbulExtra.md) |

#### Defined in

[packages/sdk/utils/src/istanbul.ts:72](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/utils/src/istanbul.ts#L72)

## Functions

### bitIsSet

▸ **bitIsSet**(`bitmap`, `index`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `bitmap` | `BigNumber` |
| `index` | `number` |

#### Returns

`boolean`

#### Defined in

[packages/sdk/utils/src/istanbul.ts:62](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/utils/src/istanbul.ts#L62)

___

### parseBlockExtraData

▸ **parseBlockExtraData**(`data`): [`IstanbulExtra`](../interfaces/istanbul.IstanbulExtra.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `string` |

#### Returns

[`IstanbulExtra`](../interfaces/istanbul.IstanbulExtra.md)

#### Defined in

[packages/sdk/utils/src/istanbul.ts:44](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/utils/src/istanbul.ts#L44)
