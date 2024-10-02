[@celo/contractkit](../README.md) / [Exports](../modules.md) / [versions](../modules/versions.md) / ContractVersion

# Class: ContractVersion

[versions](../modules/versions.md).ContractVersion

## Table of contents

### Constructors

- [constructor](versions.ContractVersion.md#constructor)

### Properties

- [major](versions.ContractVersion.md#major)
- [minor](versions.ContractVersion.md#minor)
- [patch](versions.ContractVersion.md#patch)
- [storage](versions.ContractVersion.md#storage)

### Methods

- [isAtLeast](versions.ContractVersion.md#isatleast)
- [toRaw](versions.ContractVersion.md#toraw)
- [toString](versions.ContractVersion.md#tostring)
- [fromRaw](versions.ContractVersion.md#fromraw)

## Constructors

### constructor

• **new ContractVersion**(`storage`, `major`, `minor`, `patch`): [`ContractVersion`](versions.ContractVersion.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `storage` | `string` \| `number` |
| `major` | `string` \| `number` |
| `minor` | `string` \| `number` |
| `patch` | `string` \| `number` |

#### Returns

[`ContractVersion`](versions.ContractVersion.md)

#### Defined in

[packages/sdk/contractkit/src/versions.ts:5](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/versions.ts#L5)

## Properties

### major

• `Readonly` **major**: `string` \| `number`

#### Defined in

[packages/sdk/contractkit/src/versions.ts:7](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/versions.ts#L7)

___

### minor

• `Readonly` **minor**: `string` \| `number`

#### Defined in

[packages/sdk/contractkit/src/versions.ts:8](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/versions.ts#L8)

___

### patch

• `Readonly` **patch**: `string` \| `number`

#### Defined in

[packages/sdk/contractkit/src/versions.ts:9](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/versions.ts#L9)

___

### storage

• `Readonly` **storage**: `string` \| `number`

#### Defined in

[packages/sdk/contractkit/src/versions.ts:6](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/versions.ts#L6)

## Methods

### isAtLeast

▸ **isAtLeast**(`other`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `other` | [`ContractVersion`](versions.ContractVersion.md) |

#### Returns

`any`

#### Defined in

[packages/sdk/contractkit/src/versions.ts:12](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/versions.ts#L12)

___

### toRaw

▸ **toRaw**(): (`string` \| `number`)[]

#### Returns

(`string` \| `number`)[]

#### Defined in

[packages/sdk/contractkit/src/versions.ts:14](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/versions.ts#L14)

___

### toString

▸ **toString**(): `string`

#### Returns

`string`

#### Defined in

[packages/sdk/contractkit/src/versions.ts:13](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/versions.ts#L13)

___

### fromRaw

▸ **fromRaw**(`raw`): [`ContractVersion`](versions.ContractVersion.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `raw` | (`string` \| `number`)[] |

#### Returns

[`ContractVersion`](versions.ContractVersion.md)

#### Defined in

[packages/sdk/contractkit/src/versions.ts:15](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/versions.ts#L15)
