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
      const { request } = await election.simulate.vote([validatorGroup, value, lesser, greater])
      const gasLimit = await election.estimateGas.vote(request.args)
      return election.write.vote(request.args, { gas: gasLimit })
    },
    getTotalVotesForEligibleValidatorGroups: async () => {
      return election.read.getTotalVotesForEligibleValidatorGroups()
    },
  }
  return coreVote(adapter, validatorGroup, value)
}
