import { CliUx, Flags } from '@oclif/core'

import { BaseCommand } from '../../base'
import { Args } from '../../utils/command'

const { ux } = CliUx
export default class Unlock extends BaseCommand {
  static description = 'Unlock an account address to send transactions or validate blocks'

  static flags = {
    ...BaseCommand.flags,
    password: Flags.string({
      required: false,
      description:
        'Password used to unlock the account. If not specified, you will be prompted for a password.',
    }),
    duration: Flags.integer({
      required: false,
      default: 0,
      description:
        'Duration in seconds to leave the account unlocked. Unlocks until the node exits by default.',
    }),
  }

  static args = [Args.address('account', { description: 'Account address' })]

  static examples = [
    'unlock 0x5409ed021d9299bf6814279a6a1411a7e866a631',
    'unlock 0x5409ed021d9299bf6814279a6a1411a7e866a631 --duration 600',
  ]

  requireSynced = false

  async run() {
    const res = await this.parse(Unlock)
    const web3 = await this.getWeb3()
    if (res.flags.useLedger) {
      console.warn('Warning: account:unlock not implemented for Ledger')
    }

    const password =
      res.flags.password || (await ux.prompt('Password', { type: 'hide', required: false }))
    await web3.eth.personal.unlockAccount(res.args.account, password, res.flags.duration)
  }
}
