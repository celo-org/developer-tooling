import { BaseCommand } from '../../base'
import { displaySendTx } from '../../utils/cli'
import { CustomFlags } from '../../utils/command'

export default class Dequeue extends BaseCommand {
  static description = 'Try to dequeue governance proposal'

  static flags = {
    ...BaseCommand.flags,
    from: CustomFlags.address({ required: true, description: 'From address' }),
  }

  static examples = ['dequeue --from 0x5409ed021d9299bf6814279a6a1411a7e866a631']

  async run() {
    const kit = await this.getKit()
    const res = await this.parse(Dequeue)
    const account = res.flags.from
    kit.defaultAccount = account
    const governance = await kit.contracts.getGovernance()

    await displaySendTx('dequeue', governance.dequeueProposalsIfReady(), {}, 'ProposalsDequeued')
  }
}
