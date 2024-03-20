import { BaseCommand } from '../../base'
import { newCheckBuilder } from '../../utils/checks'
import { displaySendTx } from '../../utils/cli'
import { CustomFlags } from '../../utils/command'

export default class UpdateDelegatedAmount extends BaseCommand {
  static description =
    'Updates the amount of delegated locked celo. There might be discrepancy between the amount of locked celo and the amount of delegated locked celo because of received rewards.'

  static flags = {
    ...BaseCommand.flags,
    from: CustomFlags.address({ required: true }),
    to: CustomFlags.address({ required: true }),
  }

  static args = {}

  static examples = [
    'update-delegated-amount --from 0x47e172F6CfB6c7D01C1574fa3E2Be7CC73269D95 --to 0xc0ffee254729296a45a3885639AC7E10F9d54979',
  ]

  async run() {
    const kit = await this.getKit()
    const res = await this.parse(UpdateDelegatedAmount)
    const address = res.flags.from
    const to = res.flags.to

    kit.defaultAccount = address

    await newCheckBuilder(this).isAccount(address).isAccount(to).runChecks()

    const lockedGold = await kit.contracts.getLockedGold()

    const tx = lockedGold.updateDelegatedAmount(address, to)
    await displaySendTx('updateDelegatedAmount', tx)
  }
}
