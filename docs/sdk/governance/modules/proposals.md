[@celo/governance](../README.md) / proposals

# Module: proposals

## Table of contents

### Classes

- [InteractiveProposalBuilder](../classes/proposals.InteractiveProposalBuilder.md)
- [ProposalBuilder](../classes/proposals.ProposalBuilder.md)

### Interfaces

- [ProposalTransactionJSON](../interfaces/proposals.ProposalTransactionJSON.md)

### Variables

- [hotfixExecuteAbi](proposals.md#hotfixexecuteabi)

### Functions

- [hotfixToEncodedParams](proposals.md#hotfixtoencodedparams)
- [hotfixToHash](proposals.md#hotfixtohash)
- [proposalToJSON](proposals.md#proposaltojson)

## Variables

### hotfixExecuteAbi

• `Const` **hotfixExecuteAbi**: `AbiItem`

#### Defined in

[proposals.ts:49](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/governance/src/proposals.ts#L49)

## Functions

### hotfixToEncodedParams

▸ **hotfixToEncodedParams**(`kit`, `proposal`, `salt`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `kit` | `ContractKit` |
| `proposal` | `Proposal` |
| `salt` | `Buffer` |

#### Returns

`string`

#### Defined in

[proposals.ts:51](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/governance/src/proposals.ts#L51)

___

### hotfixToHash

▸ **hotfixToHash**(`kit`, `proposal`, `salt`): `Buffer`

#### Parameters

| Name | Type |
| :------ | :------ |
| `kit` | `ContractKit` |
| `proposal` | `Proposal` |
| `salt` | `Buffer` |

#### Returns

`Buffer`

#### Defined in

[proposals.ts:57](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/governance/src/proposals.ts#L57)

___

### proposalToJSON

▸ **proposalToJSON**(`kit`, `proposal`, `registryAdditions?`): `Promise`\<[`ProposalTransactionJSON`](../interfaces/proposals.ProposalTransactionJSON.md)[]\>

Convert a compiled proposal to a human-readable JSON form using network information.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `kit` | `ContractKit` | Contract kit instance used to resolve addresses to contract names. |
| `proposal` | `Proposal` | A constructed proposal object. |
| `registryAdditions?` | `RegistryAdditions` | Registry remappings prior to parsing the proposal as a map of name to corresponding contract address. |

#### Returns

`Promise`\<[`ProposalTransactionJSON`](../interfaces/proposals.ProposalTransactionJSON.md)[]\>

The JSON encoding of the proposal.

#### Defined in

[proposals.ts:128](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/governance/src/proposals.ts#L128)
