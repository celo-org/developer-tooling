import { BaseCommand } from '../../base'
import { newCheckBuilder } from '../../utils/checks'
import { displaySendTx } from '../../utils/cli'
import { CustomFlags } from '../../utils/command'

export default class SendValidatorPayment extends BaseCommand {
  static description =
    'Sends the allocated epoch payment to a validator, their group, and delegation beneficiary.'

  static flags = {
    ...BaseCommand.flags,
    from: CustomFlags.address({
      description: 'Address of the sender',
      required: true,
    }),
    for: CustomFlags.address({
      description: 'Address of the validator to send the payment to',
      required: true,
    }),
  }

  static args = {}

  static examples = ['send-validator-payment --for 0x47e172F6CfB6c7D01C1574fa3E2Be7CC73269D95']

  static aliases: string[] = ['validator:send-payment']

  async run() {
    const kit = await this.getKit()
    const res = await this.parse(SendValidatorPayment)

    const epochManager = await kit.contracts.getEpochManager()

    // TODO(L2): Remove once migrated to L2
    if (!(await epochManager.systemAlreadyInitialized())) {
      this.error('This command is only available on L2')
    }

    await newCheckBuilder(this).isValidator(res.flags.for).runChecks()

    const tx = epochManager.sendValidatorPayment(res.flags.for)

    await displaySendTx('sendValidatorPayment', tx, {}, 'ValidatorEpochPaymentDistributed')
  }
}
