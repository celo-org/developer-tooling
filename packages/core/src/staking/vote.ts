import { StrongAddress as Address, eqAddress, NULL_ADDRESS } from '@celo/base/lib/address'
import { zip } from '@celo/base/lib/collections'
import { HexString } from '@celo/base/lib/string'

export type VoteAdapter = {
  // Todo what is the right return type for this? maybe the hash of the transaction?
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
