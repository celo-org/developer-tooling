import { BaseCommand } from '../../base'
import { newCheckBuilder } from '../../utils/checks'
import { printValueMapRecursive } from '../../utils/cli'
import { CustomArgs } from '../../utils/command'

export default class Show extends BaseCommand {
  static description =
    'Show Locked Gold information for a given account. This includes the total amount of locked celo, the amount being used for voting in Validator Elections, the Locked Gold balance this account is required to maintain due to a registered Validator or Validator Group, and any pending withdrawals that have been initiated via "lockedgold:unlock".'

  static flags = {
    ...BaseCommand.flags,
  }

  static args = {
    arg1: CustomArgs.address('account'),
  }

  static examples = ['show 0x5409ed021d9299bf6814279a6a1411a7e866a631']

  async run() {
    const kit = await this.getKit()
    const { args } = await this.parse(Show)
    const account = args.arg1 as string
    const lockedGold = await kit.contracts.getLockedGold()

    await newCheckBuilder(this).isAccount(account).runChecks()

    printValueMapRecursive(await lockedGold.getAccountSummary(account))
  }
}
