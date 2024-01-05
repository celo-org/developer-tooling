import { BaseCommand } from '../../base'
import { CustomArgs } from '../../utils/command'

export default class Lock extends BaseCommand {
  static description = 'Lock an account which was previously unlocked'

  static flags = {
    ...BaseCommand.flags,
  }

  static args = {
    arg1: CustomArgs.address('account', { description: 'Account address' }),
  }

  static examples = ['lock 0x5409ed021d9299bf6814279a6a1411a7e866a631']

  requireSynced = false

  async run() {
    const web3 = await this.getWeb3()
    const res = await this.parse(Lock)
    if (res.flags.useLedger) {
      console.warn('Warning: account:lock not implemented for Ledger')
    }

    await web3.eth.personal.lockAccount(res.args.arg1 as string)
  }
}
