import { Flags } from '@oclif/core'
import { BaseCommand } from '../../base'
import { newCheckBuilder } from '../../utils/checks'
import { displaySendTx } from '../../utils/cli'
import { CustomFlags } from '../../utils/command'

export default class SetName extends BaseCommand {
  static description =
    "Sets the name of a registered account on-chain. An account's name is an optional human readable identifier"

  static flags = {
    ...BaseCommand.flags,
    account: CustomFlags.address({ required: true }),
    name: Flags.string({ required: true }),
  }

  static args = []

  static examples = [
    'set-name --account 0x5409ed021d9299bf6814279a6a1411a7e866a631 --name test-account',
  ]

  async run() {
    const kit = await this.getKit()
    const res = await this.parse(SetName)
    kit.defaultAccount = res.flags.account
    const accounts = await kit.contracts.getAccounts()

    await newCheckBuilder(this).isAccount(res.flags.account).runChecks()
    await displaySendTx('setName', accounts.setName(res.flags.name))
  }
}
