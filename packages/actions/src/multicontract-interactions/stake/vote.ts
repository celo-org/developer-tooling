import { vote as coreVote, VoteAdapter } from '@celo/core'
import { Address, Hex } from 'viem'
import { Clients } from '../../client'
import { getElectionContract } from '../../contracts/election'

/**
 * Casts a vote for a specified validator group using the provided wallet client.
 *
 * This function interacts with the Election contract to submit a vote for the given
 * validator group with the specified value. It uses a VoteAdapter to abstract the
 * voting logic and gas estimation, and delegates the business logic of voting to `@celo/vote`.
 *
 * @param client - The WalletCeloClient instance used to interact with the blockchain.
 * @param validatorGroup - The address of the validator group to vote for.
 * @param value - The amount of votes in wei (as a bigint) to cast for the validator group.
 * @returns A promise that resolves to a Hex string representing the transaction hash.
 */
export async function vote(
  clients: Required<Clients>,
  validatorGroup: Address,
  value: bigint
): Promise<Hex> {
  const election = await getElectionContract(clients)
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
