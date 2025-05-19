import { governanceABI } from '@celo/abis'
import { vote } from '@celo/actions/contracts/governance'
import { Flags } from '@oclif/core'
import { BaseCommand } from '../../base'
import { newCheckBuilder } from '../../utils/checks'
import { displayViemTx } from '../../utils/cli'
import { CustomFlags } from '../../utils/command'

export default class Vote extends BaseCommand {
  static description = 'Vote on an approved governance proposal'

  static voteOptions = ['Abstain', 'No', 'Yes'] as const

  static flags = {
    ...BaseCommand.flags,
    proposalID: CustomFlags.bigint({ required: true, description: 'UUID of proposal to vote on' }),
    value: Flags.option({ options: Vote.voteOptions, required: true, description: 'Vote' })(),
    from: CustomFlags.address({ required: true, description: "Voter's address" }),
  }

  static examples = [
    'vote --proposalID 99 --value Yes --from 0x5409ed021d9299bf6814279a6a1411a7e866a631',
  ]

  async run() {
    const res = await this.parse(Vote)
    const signer = res.flags.from
    const id = res.flags.proposalID
    const voteValue = res.flags.value

    await newCheckBuilder(this, signer)
      .isVoteSignerOrAccount()
      .proposalExists(id)
      .proposalInStage(id, 'Referendum')
      .runChecks()

    const walletClient = await this.getWalletClient()
    const publicClient = await this.getPublicClient()

    // do not wait this. it will be awiated in the displayViemTx
    const pendingVote = vote(walletClient, id, voteValue)
    await displayViemTx('Governance -> vote', pendingVote, publicClient, {
      abi: governanceABI,
      displayEventName: 'ProposalVoted',
    })
  }
}
