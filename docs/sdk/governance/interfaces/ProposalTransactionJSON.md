[**@celo/governance v5.1.11**](../README.md)

***

[@celo/governance](../README.md) / ProposalTransactionJSON

# Interface: ProposalTransactionJSON

Defined in: [proposals.ts:60](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/governance/src/proposals.ts#L60)

JSON encoding of a proposal transaction.

Example:
```json
{
  "contract": "Election",
  "function": "setElectableValidators",
  "args": [ "1", "120" ],
  "value": "0"
}
```

## Properties

### address?

> `optional` **address**: `string`

Defined in: [proposals.ts:62](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/governance/src/proposals.ts#L62)

***

### args

> **args**: `any`[]

Defined in: [proposals.ts:64](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/governance/src/proposals.ts#L64)

***

### contract

> **contract**: `CeloContract`

Defined in: [proposals.ts:61](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/governance/src/proposals.ts#L61)

***

### function

> **function**: `string`

Defined in: [proposals.ts:63](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/governance/src/proposals.ts#L63)

***

### params?

> `optional` **params**: `Record`\<`string`, `any`\>

Defined in: [proposals.ts:65](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/governance/src/proposals.ts#L65)

***

### value

> **value**: `string`

Defined in: [proposals.ts:66](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/governance/src/proposals.ts#L66)
