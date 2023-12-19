import { BaseCommand } from '../../base'
import { newCheckBuilder } from '../../utils/checks'
import { displaySendTx } from '../../utils/cli'
import { CustomFlags } from '../../utils/command'

export default class RevokeUpvote extends BaseCommand {
  static description = 'Revoke upvotes for queued governance proposals'

  static flags = {
    ...BaseCommand.flags,
    from: CustomFlags.address({ required: true, description: "Upvoter's address" }),
  }

  static examples = ['revokeupvote --from 0x5409ed021d9299bf6814279a6a1411a7e866a631']

  async run() {
    const kit = await this.getKit()
    const res = await this.parse(RevokeUpvote)
    const signer = res.flags.from
    kit.defaultAccount = signer

    await newCheckBuilder(this, signer).isVoteSignerOrAccount().runChecks()

    // TODO(nategraf): Check whether there are upvotes to revoke before sending transaction.
    const governance = await kit.contracts.getGovernance()
    const account = await (await kit.contracts.getAccounts()).voteSignerToAccount(signer)
    await displaySendTx(
      'revokeUpvoteTx',
      await governance.revokeUpvote(account),
      {},
      'ProposalUpvoteRevoked'
    )
  }
}
