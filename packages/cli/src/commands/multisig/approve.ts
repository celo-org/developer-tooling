import { Flags } from '@oclif/core'
import { BaseCommand } from '../../base'
import { newCheckBuilder } from '../../utils/checks'
import { displaySendTx } from '../../utils/cli'
import { CustomFlags } from '../../utils/command'

export default class ApproveMultiSig extends BaseCommand {
  static description = 'Approves an existing transaction on a multi-sig contract'

  static flags = {
    ...BaseCommand.flags,
    from: CustomFlags.address({
      required: true,
      description: 'Account approving the multi-sig transaction',
    }),
    for: CustomFlags.address({
      required: true,
      description: 'Address of the multi-sig contract',
    }),
    tx: Flags.integer({
      required: true,
      description: 'Transaction to approve',
    }),
  }

  static examples = [
    'approve --from 0x6ecbe1db9ef729cbe972c83fb886247691fb6beb --for 0x5409ed021d9299bf6814279a6a1411a7e866a631 --tx 3',
  ]

  async run() {
    const kit = await this.getKit()
    const res = await this.parse(ApproveMultiSig)
    const account = res.flags.from
    kit.defaultAccount = account

    const multisig = await kit.contracts.getMultiSig(res.flags.for)

    const checkBuilder = newCheckBuilder(this)
      .isMultiSigOwner(account, multisig)
      .addCheck(
        `Checking that ${res.flags.tx} is an existing transaction.`,
        async () => {
          const max = await multisig.getTransactionCount(true, true)
          return res.flags.tx < max
        },
        `(Failed: No transaction with index ${res.flags.tx} found)`
      )

    await checkBuilder.runChecks()

    const tx = await multisig.confirmTransaction(res.flags.tx)
    await displaySendTx<string | void | boolean>('approveTx', tx, {}, 'ApproveTx')
  }
}
