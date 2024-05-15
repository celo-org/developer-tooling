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

[proposals.ts:75](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/governance/src/proposals.ts#L75)

___

### args

• **args**: `any`[]

#### Defined in

[proposals.ts:77](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/governance/src/proposals.ts#L77)

___

### contract

• **contract**: `CeloContract`

#### Defined in

[proposals.ts:74](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/governance/src/proposals.ts#L74)

___

### function

• **function**: `string`

#### Defined in

[proposals.ts:76](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/governance/src/proposals.ts#L76)

___

### params

• `Optional` **params**: `Record`\<`string`, `any`\>

#### Defined in

[proposals.ts:78](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/governance/src/proposals.ts#L78)

___

### value

• **value**: `string`

#### Defined in

[proposals.ts:79](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/governance/src/proposals.ts#L79)
