import { Address } from '@celo/connect'
import { CustomFlags } from '../../utils/command'
import { BaseCommand } from '../../base'
import { printValueMapRecursive } from '../../utils/cli'

export default class DelegateInfo extends BaseCommand {
  static description = 'Delegate info about account.'

  static flags = {
    ...BaseCommand.flags,
    account: CustomFlags.address({ required: true }),
  }

  static args = []

  static examples = ['delegate-info --account 0x47e172F6CfB6c7D01C1574fa3E2Be7CC73269D95']

  async run() {
    const kit = await this.getKit()
    const res = await this.parse(DelegateInfo)
    const address: Address = res.flags.account

    const lockedGold = await kit.contracts.getLockedGold()
    const delegateInfo = await lockedGold.getDelegateInfo(address)

    printValueMapRecursive(delegateInfo)
  }
}
