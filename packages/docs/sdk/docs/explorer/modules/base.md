[@celo/explorer](../README.md) / base

# Module: base

## Table of contents

### Interfaces

- [ContractDetails](../interfaces/base.ContractDetails.md)
- [ContractMapping](../interfaces/base.ContractMapping.md)

### Variables

- [getContractDetailsFromContract](base.md#getcontractdetailsfromcontract)

### Functions

- [mapFromPairs](base.md#mapfrompairs)
- [obtainKitContractDetails](base.md#obtainkitcontractdetails)

## Variables

### getContractDetailsFromContract

• `Const` **getContractDetailsFromContract**: `any`

#### Defined in

[packages/sdk/explorer/src/base.ts:17](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/explorer/src/base.ts#L17)

## Functions

### mapFromPairs

▸ **mapFromPairs**\<`A`, `B`\>(`pairs`): `Map`\<`A`, `B`\>

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `pairs` | [`A`, `B`][] |

#### Returns

`Map`\<`A`, `B`\>

#### Defined in

[packages/sdk/explorer/src/base.ts:38](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/explorer/src/base.ts#L38)

___

### obtainKitContractDetails

▸ **obtainKitContractDetails**(`kit`): `Promise`\<[`ContractDetails`](../interfaces/base.ContractDetails.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `kit` | `ContractKit` |

#### Returns

`Promise`\<[`ContractDetails`](../interfaces/base.ContractDetails.md)[]\>

#### Defined in

[packages/sdk/explorer/src/base.ts:31](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/explorer/src/base.ts#L31)
