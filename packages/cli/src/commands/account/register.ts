import { Flags } from '@oclif/core'
import { BaseCommand } from '../../base'
import { newCheckBuilder } from '../../utils/checks'
import { displaySendTx } from '../../utils/cli'
import { CustomFlags } from '../../utils/command'

export default class Register extends BaseCommand {
  static description =
    'Register an account on-chain. This allows you to lock Gold, which is a pre-requisite for registering a Validator or Group, participating in Validator elections and on-chain Governance, and earning epoch rewards.'

  static flags = {
    ...BaseCommand.flags,
    name: Flags.string(),
    from: CustomFlags.address({ required: true }),
  }

  static args = {}

  static examples = [
    'register --from 0x5409ed021d9299bf6814279a6a1411a7e866a631',
    'register --from 0x5409ed021d9299bf6814279a6a1411a7e866a631 --name test-account',
  ]

  async run() {
    const kit = await this.getKit()
    const res = await this.parse(Register)

    const accounts = await kit.contracts.getAccounts()

    await newCheckBuilder(this).isNotAccount(res.flags.from).runChecks()
    await displaySendTx('register', accounts.createAccount())
    if (res.flags.name) {
      await displaySendTx('setName', accounts.setName(res.flags.name))
    }
  }
}
