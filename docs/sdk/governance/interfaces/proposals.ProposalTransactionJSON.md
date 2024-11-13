[@celo/governance](../README.md) / [proposals](../modules/proposals.md) / ProposalTransactionJSON

# Interface: ProposalTransactionJSON

[proposals](../modules/proposals.md).ProposalTransactionJSON

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

## Table of contents

### Properties

- [address](proposals.ProposalTransactionJSON.md#address)
- [args](proposals.ProposalTransactionJSON.md#args)
- [contract](proposals.ProposalTransactionJSON.md#contract)
- [function](proposals.ProposalTransactionJSON.md#function)
- [params](proposals.ProposalTransactionJSON.md#params)
- [value](proposals.ProposalTransactionJSON.md#value)

## Properties

### address

• `Optional` **address**: `string`

#### Defined in

[packages/sdk/governance/src/proposals.ts:55](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/governance/src/proposals.ts#L55)

___

### args

• **args**: `any`[]

#### Defined in

[packages/sdk/governance/src/proposals.ts:57](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/governance/src/proposals.ts#L57)

___

### contract

• **contract**: `CeloContract`

#### Defined in

[packages/sdk/governance/src/proposals.ts:54](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/governance/src/proposals.ts#L54)

___

### function

• **function**: `string`

#### Defined in

[packages/sdk/governance/src/proposals.ts:56](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/governance/src/proposals.ts#L56)

___

### params

• `Optional` **params**: `Record`\<`string`, `any`\>

#### Defined in

[packages/sdk/governance/src/proposals.ts:58](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/governance/src/proposals.ts#L58)

___

### value

• **value**: `string`

#### Defined in

[packages/sdk/governance/src/proposals.ts:59](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/governance/src/proposals.ts#L59)
