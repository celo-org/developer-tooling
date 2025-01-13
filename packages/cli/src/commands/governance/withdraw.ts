import { StrongAddress } from '@celo/base'
import { Flags } from '@oclif/core'
import { BaseCommand } from '../../base'
import { newCheckBuilder } from '../../utils/checks'
import { displaySendTx } from '../../utils/cli'
import { CustomFlags } from '../../utils/command'

export default class Withdraw extends BaseCommand {
  static description = 'Withdraw refunded governance proposal deposits.'

  static flags = {
    ...BaseCommand.flags,
    from: CustomFlags.address({ required: true, description: "Proposer's address" }),
    // TODO move the flags to a separate file vide ViewCommmandFlags
    useMultiSig: Flags.boolean({
      description: 'True means the request will be sent through multisig.',
    }),
    for: CustomFlags.address({
      dependsOn: ['useMultiSig'],
      description: 'Address of the multi-sig contract',
    }),
  }

  static examples = ['withdraw --from 0x5409ed021d9299bf6814279a6a1411a7e866a631']

  async run() {
    const kit = await this.getKit()
    const res = await this.parse(Withdraw)
    const addressToRefund = res.flags.useMultiSig
      ? (res.flags.for as StrongAddress)
      : res.flags.from
    const multisigWrapper = res.flags.for
      ? await kit.contracts.getMultiSig(res.flags.for)
      : undefined

    await newCheckBuilder(this, res.flags.from)
      .hasRefundedDeposits(addressToRefund)
      .addConditionalCheck(`${res.flags.from} is multisig signatory`, res.flags.useMultiSig, () => {
        // This should essentialy never happen
        if (!multisigWrapper) {
          throw new Error('Invalid multisig address')
        }

        return multisigWrapper.isOwner(res.flags.from)
      })
      .runChecks()

    const governance = await kit.contracts.getGovernance()
    const tx = governance.withdraw()

    if (res.flags.useMultiSig) {
      // TODO don't like the forcing here
      const multiSigTx = await multisigWrapper!.submitOrConfirmTransaction(
        governance.address,
        tx.txo
      )

      await displaySendTx<string | void | boolean>('withdraw', multiSigTx, {}, 'DepositWithdrawn')
    } else {
      await displaySendTx('withdraw', tx, {}, 'DepositWithdrawn')
    }
  }
}
