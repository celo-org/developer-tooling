[**@celo/governance v5.1.9-alpha.0**](../README.md)

***

[@celo/governance](../README.md) / proposalToJSON

# Function: proposalToJSON()

> **proposalToJSON**(`kit`, `proposal`, `registryAdditions?`): `Promise`\<[`ProposalTransactionJSON`](../interfaces/ProposalTransactionJSON.md)[]\>

Defined in: [proposals.ts:115](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/governance/src/proposals.ts#L115)

Convert a compiled proposal to a human-readable JSON form using network information.

## Parameters

### kit

`ContractKit`

Contract kit instance used to resolve addresses to contract names.

### proposal

`Proposal`

A constructed proposal object.

### registryAdditions?

[`RegistryAdditions`](../interfaces/RegistryAdditions.md)

Registry remappings prior to parsing the proposal as a map of name to corresponding contract address.

## Returns

`Promise`\<[`ProposalTransactionJSON`](../interfaces/ProposalTransactionJSON.md)[]\>

The JSON encoding of the proposal.
