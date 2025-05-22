import { StrongAddress as Address, eqAddress, NULL_ADDRESS } from '@celo/base/lib/address'
import { zip } from '@celo/base/lib/collections'
import { HexString } from '@celo/base/lib/string'

export type VoteAdapter = {
  vote: (
    validatorGroup: Address,
    value: bigint,
    lesser: Address,
    greater: Address
  ) => Promise<HexString>
  getTotalVotesForEligibleValidatorGroups: () => Promise<
    Readonly<[Readonly<Address[]>, Readonly<bigint[]>]>
  >
}

export interface GroupVotes {
  address: Address
  votes: bigint
}

/**
 * Casts a vote for a specified validator group using the provided adapter.
 *
 * This function retrieves the current votes for all eligible validator groups,
 * determines the correct ordering for the new vote (using `findLesserAndGreaterAfterVote`),
 * and submits the vote transaction via the adapter.
 *
 * @param adapter - An implementation of the `VoteAdapter` interface, responsible for interacting with the underlying blockchain.
 * @param validatorGroup - The address of the validator group to vote for.
 * @param value - The amount of votes (as a bigint) to cast for the validator group.
 * @returns A promise that resolves to a `HexString` representing the transaction hash or identifier.
 *
 * @example
 * ```typescript
 * import { ethers } from 'ethers';
 * import { vote, VoteAdapter, Address, HexString } from './vote';
 *
 * // Example implementation of VoteAdapter using ethers.js
 * class EthersVoteAdapter implements VoteAdapter {
 *   constructor(private contract: ethers.Contract) {}
 *
 *   async getTotalVotesForEligibleValidatorGroups(): Promise<[Address[], bigint[]]> {
 *     // Replace with actual contract call
 *     const [groups, votes] = await  this.contract.getTotalVotesForEligibleValidatorGroups();
 *     return [groups, votes.map((v: ethers.BigNumber) => v.toBigInt())];
 *   }
 *
 *   async vote(
 *     validatorGroup: Address,
 *     value: bigint,
 *     lesser: Address,
 *     greater: Address
 *   ): Promise<HexString> {
 *     const tx = await this.contract.vote(validatorGroup, value, lesser, greater);
 *     return tx.hash as HexString;
 *   }
 * }
 *
 * // Usage
 * const contract = new ethers.Contract(address, abi, signer);
 * const adapter = new EthersVoteAdapter(contract);
 * const txHash = await vote(adapter, '0xValidatorGroupAddress', 1000n);
 * console.log('Vote transaction hash:', txHash);
 * ```
 */
export async function vote(
  adapter: VoteAdapter,
  validatorGroup: Address,
  value: bigint
): Promise<HexString> {
  const [groups, votes] = await adapter.getTotalVotesForEligibleValidatorGroups()

  const currentVotes = zip(
    (a, b) => ({
      address: a,
      votes: BigInt(b),
    }),
    groups as Address[],
    votes as bigint[]
  )

  const { lesser, greater } = findLesserAndGreaterAfterVote(validatorGroup, value, currentVotes)
  return adapter.vote(validatorGroup, value, lesser, greater)
}

function findLesserAndGreaterAfterVote(
  votedGroup: Address,
  voteWeight: bigint,
  currentVotes: GroupVotes[]
): { lesser: Address; greater: Address } {
  const selectedGroup = currentVotes.find((votes) => eqAddress(votes.address, votedGroup))
  const voteTotal = selectedGroup ? selectedGroup.votes + voteWeight : voteWeight
  let greaterKey: Address = NULL_ADDRESS
  let lesserKey: Address = NULL_ADDRESS

  // This leverages the fact that the currentVotes are already sorted from
  // greatest to lowest value
  for (const vote of currentVotes) {
    if (!eqAddress(vote.address, votedGroup)) {
      if (vote.votes <= voteTotal) {
        lesserKey = vote.address
        break
      }
      greaterKey = vote.address
    }
  }

  return { lesser: lesserKey, greater: greaterKey }
}
