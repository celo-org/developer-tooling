# Decisions — Kill CeloTransactionObject

## Architectural Decisions
- Eager sending: wrapper write methods return Promise<`0x${string}`> (tx hash), not CeloTransactionObject
- encodeFunctionData for encoding: ProposalBuilder/multisig use BaseWrapper.encodeFunctionData()
- connection.callContract() for reads: replaces createViemTxObject(...).call()
- Hard break: no deprecated aliases
- No custom wrapper types
