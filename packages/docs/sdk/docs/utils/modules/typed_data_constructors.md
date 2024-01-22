[@celo/utils](../README.md) / typed-data-constructors

# Module: typed-data-constructors

## Table of contents

### Functions

- [authorizeSigner](typed_data_constructors.md#authorizesigner)
- [registerAttestation](typed_data_constructors.md#registerattestation)

## Functions

### authorizeSigner

▸ **authorizeSigner**(`«destructured»`): [`EIP712TypedData`](../interfaces/sign_typed_data_utils.EIP712TypedData.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `account` | `string` |
| › `accountsContractAddress` | `string` |
| › `chainId` | `number` |
| › `role` | `string` |
| › `signer` | `string` |

#### Returns

[`EIP712TypedData`](../interfaces/sign_typed_data_utils.EIP712TypedData.md)

#### Defined in

[packages/sdk/utils/src/typed-data-constructors.ts:4](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/utils/src/typed-data-constructors.ts#L4)

___

### registerAttestation

▸ **registerAttestation**(`chainId`, `contractAddress`, `message?`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `chainId` | `number` |
| `contractAddress` | `string` |
| `message?` | `AttestationDetails` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `domain` | \{ `chainId`: `number` ; `name`: `string` = 'FederatedAttestations'; `verifyingContract`: `string` = contractAddress; `version`: `string` = '1.0' } |
| `domain.chainId` | `number` |
| `domain.name` | `string` |
| `domain.verifyingContract` | `string` |
| `domain.version` | `string` |
| `message` | {} |
| `primaryType` | `string` |
| `types` | \{ `EIP712Domain`: \{ `name`: `string` = 'name'; `type`: `string` = 'string' }[] ; `OwnershipAttestation`: \{ `name`: `string` = 'identifier'; `type`: `string` = 'bytes32' }[]  } |
| `types.EIP712Domain` | \{ `name`: `string` = 'name'; `type`: `string` = 'string' }[] |
| `types.OwnershipAttestation` | \{ `name`: `string` = 'identifier'; `type`: `string` = 'bytes32' }[] |

#### Defined in

[packages/sdk/utils/src/typed-data-constructors.ts:52](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/utils/src/typed-data-constructors.ts#L52)
