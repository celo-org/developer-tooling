import { BaseCommand } from '../../base'
import { newCheckBuilder } from '../../utils/checks'
import { printValueMapRecursive } from '../../utils/cli'
import { CustomArgs } from '../../utils/command'
import { ViewCommmandFlags } from '../../utils/flags'

export default class Show extends BaseCommand {
  static description =
    'Show Locked Celo information for a given account. This includes the total amount of locked celo, the amount being used for voting in Validator Elections, the Locked Celo balance this account is required to maintain due to a registered Validator or Validator Group, and any pending withdrawals that have been initiated via "lockedcelo:unlock".'

  static aliases = ['lockedgold:show']

  static flags = {
    ...ViewCommmandFlags,
  }

  static args = {
    arg1: CustomArgs.address('account'),
  }

  static examples = ['show 0x5409ed021d9299bf6814279a6a1411a7e866a631']

  async run() {
    const kit = await this.getKit()
    const { args } = await this.parse(Show)
    const account = args.arg1 as string
    const lockedCELO = await kit.contracts.getLockedGold()

    await newCheckBuilder(this).isAccount(account).runChecks()

    printValueMapRecursive(await lockedCELO.getAccountSummary(account))
  }
}
