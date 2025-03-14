import { BaseCommand } from '../../base'
import { displaySendTx } from '../../utils/cli'
import { CustomFlags } from '../../utils/command'

export default class Finish extends BaseCommand {
  static description = 'Finishes next epoch process.'

  static flags = {
    ...BaseCommand.flags,
    from: CustomFlags.address({ required: true }),
  }

  static args = {}

  static examples = ['finish --from 0x47e172F6CfB6c7D01C1574fa3E2Be7CC73269D95']

  async run() {
    const kit = await this.getKit()
    const res = await this.parse(Finish)
    const address = res.flags.from

    kit.defaultAccount = address

    const epochManager = await kit.contracts.getEpochManager()

    if (!(await epochManager.isOnEpochProcess())) {
      this.error('Epoch process is not started yet')
    }

    await displaySendTx('finishNextEpoch', await epochManager.finishNextEpochProcessTx())
  }
}
