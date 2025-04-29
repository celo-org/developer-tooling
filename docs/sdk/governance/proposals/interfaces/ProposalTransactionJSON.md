[**@celo/governance**](../../README.md)

***

[@celo/governance](../../README.md) / [proposals](../README.md) / ProposalTransactionJSON

# Interface: ProposalTransactionJSON

Defined in: [proposals.ts:53](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/governance/src/proposals.ts#L53)

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

Defined in: [proposals.ts:55](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/governance/src/proposals.ts#L55)

***

### args

> **args**: `any`[]

Defined in: [proposals.ts:57](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/governance/src/proposals.ts#L57)

***

### contract

> **contract**: `CeloContract`

Defined in: [proposals.ts:54](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/governance/src/proposals.ts#L54)

***

### function

> **function**: `string`

Defined in: [proposals.ts:56](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/governance/src/proposals.ts#L56)

***

### params?

> `optional` **params**: `Record`\<`string`, `any`\>

Defined in: [proposals.ts:58](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/governance/src/proposals.ts#L58)

***

### value

> **value**: `string`

Defined in: [proposals.ts:59](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/governance/src/proposals.ts#L59)
