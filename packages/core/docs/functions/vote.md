[**@celo/core v0.0.1-beta.0**](../README.md)

***

[@celo/core](../globals.md) / vote

# Function: vote()

> **vote**(`adapter`, `validatorGroup`, `value`): `Promise`\<`` `0x${string}` ``\>

Casts a vote for a specified validator group using the provided adapter.

This function retrieves the current votes for all eligible validator groups,
determines the correct ordering for the new vote (using `findLesserAndGreaterAfterVote`),
and submits the vote transaction via the adapter.

## Parameters

### adapter

`VoteAdapter`

An implementation of the `VoteAdapter` interface, responsible for interacting with the underlying blockchain.

### validatorGroup

`` `0x${string}` ``

The address of the validator group to vote for.

### value

`bigint`

The amount of votes (as a bigint) to cast for the validator group.

## Returns

`Promise`\<`` `0x${string}` ``\>

A promise that resolves to a `HexString` representing the transaction hash or identifier.

## Example

```typescript
import { ethers } from 'ethers';
import { vote, VoteAdapter, Address, HexString } from './vote';

// Example implementation of VoteAdapter using ethers.js
class EthersVoteAdapter implements VoteAdapter {
  constructor(private contract: ethers.Contract) {}

  async getTotalVotesForEligibleValidatorGroups(): Promise<[Address[], bigint[]]> {
    // Replace with actual contract call
    const [groups, votes] = await  this.contract.getTotalVotesForEligibleValidatorGroups();
    return [groups, votes.map((v: ethers.BigNumber) => v.toBigInt())];
  }

  async vote(
    validatorGroup: Address,
    value: bigint,
    lesser: Address,
    greater: Address
  ): Promise<HexString> {
    const tx = await this.contract.vote(validatorGroup, value, lesser, greater);
    return tx.hash as HexString;
  }
}

// Usage
const contract = new ethers.Contract(address, abi, signer);
const adapter = new EthersVoteAdapter(contract);
const txHash = await vote(adapter, '0xValidatorGroupAddress', 1000n);
console.log('Vote transaction hash:', txHash);
```
