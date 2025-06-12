[**@celo/core v0.0.1-beta.1**](../README.md)

***

[@celo/core](../globals.md) / voteProposal

# Function: voteProposal()

> **voteProposal**(`adapater`, `proposalId`, `voteValue`): `Promise`\<`` `0x${string}` ``\>

Casts a vote on a specified proposal using the provided adapter.

## Parameters

### adapater

`VoteProposalAdapter`

The adapter responsible for handling proposal voting operations. See Example for implementation.

### proposalId

`bigint`

The unique identifier of the proposal to vote on.

### voteValue

The value representing the type of vote to cast (e.g., Abstain, No, Yes).

`"None"` | `"Abstain"` | `"No"` | `"Yes"`

## Returns

`Promise`\<`` `0x${string}` ``\>

A promise that resolves with the has of the vote transaction.

## Example

```ts
const governanceAddress = "0x1234" 
const contract = getContract({client, address: governanceAddress, abi: governanceABI})
const adapter: VoteProposalAdapter =
{
 vote: async (proposalID, proposalIndex, voteValue) => {
   const { request } = await contract.simulate.vote([proposalID, proposalIndex, voteValue], {
     account: client.wallet.account.address})
   const gasLimit = await contract.estimateGas.vote(request.args)
   return contract.write.vote(request.args, { gas: gasLimit })
},
 getDequeue: async () => {
    contract.read.getDequeue()}
}

voteProposal(adapter, proposalId, 'Yes')
```
