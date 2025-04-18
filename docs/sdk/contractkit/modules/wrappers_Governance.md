[@celo/contractkit](../README.md) / [Exports](../modules.md) / wrappers/Governance

# Module: wrappers/Governance

## Table of contents

### Enumerations

- [ProposalStage](../enums/wrappers_Governance.ProposalStage.md)
- [VoteValue](../enums/wrappers_Governance.VoteValue.md)

### Classes

- [GovernanceWrapper](../classes/wrappers_Governance.GovernanceWrapper.md)

### Interfaces

- [GovernanceConfig](../interfaces/wrappers_Governance.GovernanceConfig.md)
- [HotfixRecord](../interfaces/wrappers_Governance.HotfixRecord.md)
- [L1HotfixRecord](../interfaces/wrappers_Governance.L1HotfixRecord.md)
- [ParticipationParameters](../interfaces/wrappers_Governance.ParticipationParameters.md)
- [ProposalMetadata](../interfaces/wrappers_Governance.ProposalMetadata.md)
- [ProposalRecord](../interfaces/wrappers_Governance.ProposalRecord.md)
- [UpvoteRecord](../interfaces/wrappers_Governance.UpvoteRecord.md)
- [VoteRecord](../interfaces/wrappers_Governance.VoteRecord.md)
- [Voter](../interfaces/wrappers_Governance.Voter.md)
- [Votes](../interfaces/wrappers_Governance.Votes.md)

### Type Aliases

- [GovernanceWrapperType](wrappers_Governance.md#governancewrappertype)
- [HotfixParams](wrappers_Governance.md#hotfixparams)
- [Proposal](wrappers_Governance.md#proposal)
- [ProposalParams](wrappers_Governance.md#proposalparams)
- [ProposalTransaction](wrappers_Governance.md#proposaltransaction)

### Functions

- [hotfixToParams](wrappers_Governance.md#hotfixtoparams)
- [proposalToParams](wrappers_Governance.md#proposaltoparams)

## Type Aliases

### GovernanceWrapperType

Ƭ **GovernanceWrapperType**: [`GovernanceWrapper`](../classes/wrappers_Governance.GovernanceWrapper.md)

#### Defined in

[packages/sdk/contractkit/src/wrappers/Governance.ts:1020](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Governance.ts#L1020)

___

### HotfixParams

Ƭ **HotfixParams**: `Parameters`\<`Governance`[``"methods"``][``"executeHotfix"``]\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/Governance.ts:125](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Governance.ts#L125)

___

### Proposal

Ƭ **Proposal**: [`ProposalTransaction`](wrappers_Governance.md#proposaltransaction)[]

#### Defined in

[packages/sdk/contractkit/src/wrappers/Governance.ts:77](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Governance.ts#L77)

___

### ProposalParams

Ƭ **ProposalParams**: `Parameters`\<`Governance`[``"methods"``][``"propose"``]\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/Governance.ts:75](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Governance.ts#L75)

___

### ProposalTransaction

Ƭ **ProposalTransaction**: `Pick`\<`CeloTxPending`, ``"to"`` \| ``"input"`` \| ``"value"``\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/Governance.ts:76](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Governance.ts#L76)

## Functions

### hotfixToParams

▸ **hotfixToParams**(`proposal`, `salt`): [values: (string \| number)[], destinations: string[], data: string \| number[], dataLengths: (string \| number)[], salt: string \| number[]]

#### Parameters

| Name | Type |
| :------ | :------ |
| `proposal` | [`Proposal`](wrappers_Governance.md#proposal) |
| `salt` | `Buffer` |

#### Returns

[values: (string \| number)[], destinations: string[], data: string \| number[], dataLengths: (string \| number)[], salt: string \| number[]]

#### Defined in

[packages/sdk/contractkit/src/wrappers/Governance.ts:126](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Governance.ts#L126)

___

### proposalToParams

▸ **proposalToParams**(`proposal`, `descriptionURL`): [values: (string \| number)[], destinations: string[], data: string \| number[], dataLengths: (string \| number)[], descriptionUrl: string]

#### Parameters

| Name | Type |
| :------ | :------ |
| `proposal` | [`Proposal`](wrappers_Governance.md#proposal) |
| `descriptionURL` | `string` |

#### Returns

[values: (string \| number)[], destinations: string[], data: string \| number[], dataLengths: (string \| number)[], descriptionUrl: string]

#### Defined in

[packages/sdk/contractkit/src/wrappers/Governance.ts:79](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Governance.ts#L79)
