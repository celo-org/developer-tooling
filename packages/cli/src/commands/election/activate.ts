import { sleep } from '@celo/utils/lib/async'
import { Flags, ux } from '@oclif/core'

import { BaseCommand } from '../../base'
import { newCheckBuilder } from '../../utils/checks'
import { displaySendTx } from '../../utils/cli'
import { CustomFlags } from '../../utils/command'

export default class ElectionVote extends BaseCommand {
  static description =
    'Activate pending votes in validator elections to begin earning rewards. To earn rewards as a voter, it is required to activate your pending votes at some point after the end of the epoch in which they were made.'

  static flags = {
    ...BaseCommand.flags,
    from: CustomFlags.address({
      required: true,
      description: "Address sending transaction (and voter's address if --for not specified)",
    }),
    for: CustomFlags.address({
      required: false,
      description: 'Optional: use this to activate votes for another address',
    }),
    wait: Flags.boolean({ description: 'Wait until all pending votes can be activated' }),
  }

  static examples = [
    'activate --from 0x4443d0349e8b3075cba511a0a87796597602a0f1',
    'activate --from 0x4443d0349e8b3075cba511a0a87796597602a0f1 --for 0x5409ed021d9299bf6814279a6a1411a7e866a631',
    'activate --from 0x4443d0349e8b3075cba511a0a87796597602a0f1 --wait',
  ]

  async run() {
    const kit = await this.getKit()
    const res = await this.parse(ElectionVote)

    const forAccount = res.flags.for ?? res.flags.from
    await newCheckBuilder(this, forAccount).isSignerOrAccount().runChecks()

    const accounts = await kit.contracts.getAccounts()
    const signerAccount = await accounts.voteSignerToAccount(forAccount)

    const election = await kit.contracts.getElection()
    const hasPendingVotes = await election.hasPendingVotes(signerAccount)
    if (hasPendingVotes) {
      if (res.flags.wait) {
        // Spin until pending votes become activatable.
        ux.action.start(`Waiting until pending votes can be activated`)
        while (!(await election.hasActivatablePendingVotes(signerAccount))) {
          await sleep(1000)
        }
        ux.action.stop()
      }
      const txos = await election.activate(signerAccount, res.flags.for != null)
      for (const txo of txos) {
        await displaySendTx('activate', txo, { from: res.flags.from })
      }
      if (txos.length === 0) {
        this.log(`Pending votes not yet activatable. Consider using the --wait flag.`)
      }
    } else {
      this.log(`No pending votes to activate`)
    }
  }
}
