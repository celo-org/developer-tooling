import { vote as coreVote, VoteAdapter } from '@celo/core'
import { Address, Hex } from 'viem'
import { WalletCeloClient } from '../../client'
import { getElectionContract } from '../../contracts/election'

export async function vote(
  client: WalletCeloClient,
  validatorGroup: Address,
  value: bigint
): Promise<Hex> {
  const election = await getElectionContract(client)
  const adapter: VoteAdapter = {
    vote: async (validatorGroup, value, lesser, greater) => {
      return election.write.vote([validatorGroup, value, lesser, greater])
    },
    getTotalVotesForEligibleValidatorGroups: async () => {
      return election.read.getTotalVotesForEligibleValidatorGroups()
    },
  }
  return coreVote(adapter, validatorGroup, value)
}
