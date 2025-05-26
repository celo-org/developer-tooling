import { getEpochManagerContract } from '@celo/actions/contracts/epoch-manager'
import { BaseCommand } from '../../base'
import { newCheckBuilder } from '../../utils/checks'
import { displayViemTx } from '../../utils/cli'
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
    const client = await this.getPublicClient()
    const wallet = await this.getWalletClient()
    const res = await this.parse(SendValidatorPayment)

    const epochManagerContract = await getEpochManagerContract({ wallet, public: client })

    await newCheckBuilder(this).isValidator(res.flags.for).runChecks()

    const { request } = await epochManagerContract.simulate.sendValidatorPayment([res.flags.for])

    await displayViemTx<typeof epochManagerContract.abi>(
      'EpochManager->sendValidatorPayment',
      wallet.writeContract(request),
      client,
      { abi: epochManagerContract.abi, displayEventName: 'ValidatorEpochPaymentDistributed' }
    )
  }
}
