import chalk from 'chalk'
import { BaseCommand } from '../../base'
import { displaySendTx } from '../../utils/cli'
import { CustomFlags } from '../../utils/command'

export default class Start extends BaseCommand {
  static description = 'Starts next epoch process.'

  static flags = {
    ...BaseCommand.flags,
    from: CustomFlags.address({ required: true }),
  }

  static args = {}

  static examples = ['start --from 0x47e172F6CfB6c7D01C1574fa3E2Be7CC73269D95']

  async run() {
    const kit = await this.getKit()
    const res = await this.parse(Start)
    const address = res.flags.from

    kit.defaultAccount = address

    const epochManager = await kit.contracts.getEpochManager()

    const isTimeForNextEpoch = await epochManager.isTimeForNextEpoch()
    if (!isTimeForNextEpoch) {
      const msg = 'It is not time for the next epoch yet'
      console.info(chalk.red.bold(msg))
      return msg
    }

    const isEpochProcessStarted = await epochManager.isOnEpochProcess()
    if (isEpochProcessStarted) {
      const msg = 'Epoch process has already started.'
      console.info(chalk.red.bold(msg))
      return msg
    }

    await displaySendTx('startNextEpoch', epochManager.startNextEpochProcess())
  }
}
