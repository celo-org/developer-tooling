import { Flags } from '@oclif/core'
import { BaseCommand } from '../../base'
import { displaySendTx } from '../../utils/cli'
import { CustomFlags } from '../../utils/command'

export default class Switch extends BaseCommand {
  static description = 'Finishes current epoch and starts a new one.'

  static flags = {
    ...BaseCommand.flags,
    from: CustomFlags.address({ required: true }),
    delay: Flags.integer({
      description: 'Delay in milliseconds before finishing the epoch',
      default: 2000,
    }),
  }

  static args = {}

  static examples = ['switch --from 0x47e172F6CfB6c7D01C1574fa3E2Be7CC73269D95']

  async run() {
    const kit = await this.getKit()
    const res = await this.parse(Switch)
    const address = res.flags.from

    kit.defaultAccount = address

    const epochManager = await kit.contracts.getEpochManager()

    if (!(await epochManager.isTimeForNextEpoch())) {
      this.error('It is not time for the next epoch yet')
    }

    const isEpochProcessStarted = await epochManager.isOnEpochProcess()
    if (!isEpochProcessStarted) {
      const startProcessTx = await epochManager.startNextEpochProcessTx()
      if (startProcessTx === undefined) {
        return
      }
      await displaySendTx('startNextEpoch', startProcessTx)
      await this.delay(res.flags.delay)
    }
    await displaySendTx('finishNextEpoch', await epochManager.finishNextEpochProcessTx())
  }

  delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }
}
