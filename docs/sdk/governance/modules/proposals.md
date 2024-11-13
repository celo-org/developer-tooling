[@celo/governance](../README.md) / proposals

# Module: proposals

## Table of contents

### References

- [InteractiveProposalBuilder](proposals.md#interactiveproposalbuilder)
- [ProposalBuilder](proposals.md#proposalbuilder)

### Interfaces

- [ProposalTransactionJSON](../interfaces/proposals.ProposalTransactionJSON.md)
- [RegistryAdditions](../interfaces/proposals.RegistryAdditions.md)

### Type Aliases

- [ExternalProposalTransactionJSON](proposals.md#externalproposaltransactionjson)
- [ProposalTxParams](proposals.md#proposaltxparams)

### Variables

- [hotfixExecuteAbi](proposals.md#hotfixexecuteabi)

### Functions

- [debug](proposals.md#debug)
- [hotfixToEncodedParams](proposals.md#hotfixtoencodedparams)
- [hotfixToHash](proposals.md#hotfixtohash)
- [isProxySetAndInitFunction](proposals.md#isproxysetandinitfunction)
- [isProxySetFunction](proposals.md#isproxysetfunction)
- [isRegistryRepoint](proposals.md#isregistryrepoint)
- [proposalToJSON](proposals.md#proposaltojson)
- [registryRepointArgs](proposals.md#registryrepointargs)

## References

### InteractiveProposalBuilder

Re-exports [InteractiveProposalBuilder](../classes/interactive_proposal_builder.InteractiveProposalBuilder.md)

___

### ProposalBuilder

Re-exports [ProposalBuilder](../classes/proposal_builder.ProposalBuilder.md)

## Type Aliases

### ExternalProposalTransactionJSON

Ƭ **ExternalProposalTransactionJSON**: `Omit`\<[`ProposalTransactionJSON`](../interfaces/proposals.ProposalTransactionJSON.md), ``"contract"``\> & \{ `contract?`: `string`  }

#### Defined in

[packages/sdk/governance/src/proposals.ts:62](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/governance/src/proposals.ts#L62)

___

### ProposalTxParams

Ƭ **ProposalTxParams**: `Pick`\<`ProposalTransaction`, ``"to"`` \| ``"value"``\>

#### Defined in

[packages/sdk/governance/src/proposals.ts:218](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/governance/src/proposals.ts#L218)

## Variables

### hotfixExecuteAbi

• `Const` **hotfixExecuteAbi**: `AbiItem`

#### Defined in

[packages/sdk/governance/src/proposals.ts:29](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/governance/src/proposals.ts#L29)

## Functions

### debug

▸ **debug**(`formatter`, `...args`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `formatter` | `any` |
| `...args` | `any`[] |

#### Returns

`void`

#### Defined in

[packages/sdk/governance/src/proposals.ts:27](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/governance/src/proposals.ts#L27)

___

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

[packages/sdk/governance/src/proposals.ts:31](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/governance/src/proposals.ts#L31)

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

[packages/sdk/governance/src/proposals.ts:37](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/governance/src/proposals.ts#L37)

___

### isProxySetAndInitFunction

▸ **isProxySetAndInitFunction**(`tx`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `tx` | `Pick`\<[`ProposalTransactionJSON`](../interfaces/proposals.ProposalTransactionJSON.md), ``"function"``\> |

#### Returns

`boolean`

#### Defined in

[packages/sdk/governance/src/proposals.ts:103](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/governance/src/proposals.ts#L103)

___

### isProxySetFunction

▸ **isProxySetFunction**(`tx`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `tx` | `Pick`\<[`ProposalTransactionJSON`](../interfaces/proposals.ProposalTransactionJSON.md), ``"function"``\> |

#### Returns

`boolean`

#### Defined in

[packages/sdk/governance/src/proposals.ts:106](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/governance/src/proposals.ts#L106)

___

### isRegistryRepoint

▸ **isRegistryRepoint**(`tx`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `tx` | `Pick`\<[`ExternalProposalTransactionJSON`](proposals.md#externalproposaltransactionjson), ``"function"`` \| ``"contract"``\> |

#### Returns

`boolean`

#### Defined in

[packages/sdk/governance/src/proposals.ts:66](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/governance/src/proposals.ts#L66)

___

### proposalToJSON

▸ **proposalToJSON**(`kit`, `proposal`, `registryAdditions?`): `Promise`\<[`ProposalTransactionJSON`](../interfaces/proposals.ProposalTransactionJSON.md)[]\>

Convert a compiled proposal to a human-readable JSON form using network information.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `kit` | `ContractKit` | Contract kit instance used to resolve addresses to contract names. |
| `proposal` | `Proposal` | A constructed proposal object. |
| `registryAdditions?` | [`RegistryAdditions`](../interfaces/proposals.RegistryAdditions.md) | Registry remappings prior to parsing the proposal as a map of name to corresponding contract address. |

#### Returns

`Promise`\<[`ProposalTransactionJSON`](../interfaces/proposals.ProposalTransactionJSON.md)[]\>

The JSON encoding of the proposal.

#### Defined in

[packages/sdk/governance/src/proposals.ts:116](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/governance/src/proposals.ts#L116)

___

### registryRepointArgs

▸ **registryRepointArgs**(`tx`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `tx` | `Pick`\<[`ExternalProposalTransactionJSON`](proposals.md#externalproposaltransactionjson), ``"function"`` \| ``"contract"`` \| ``"args"``\> |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `address` | `string` |
| `name` | `CeloContract` |

#### Defined in

[packages/sdk/governance/src/proposals.ts:74](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/governance/src/proposals.ts#L74)
