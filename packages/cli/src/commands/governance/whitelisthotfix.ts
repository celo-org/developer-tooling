import { toBuffer } from '@ethereumjs/util'
import { Flags } from '@oclif/core'
import { BaseCommand } from '../../base'
import { newCheckBuilder } from '../../utils/checks'
import { displaySendTx } from '../../utils/cli'
import { CustomFlags } from '../../utils/command'

export default class WhitelistHotfix extends BaseCommand {
  static description = 'Whitelist a governance hotfix'

  static flags = {
    ...BaseCommand.flags,
    from: CustomFlags.address({ required: true, description: "Whitelister's address" }),
    hash: Flags.string({ required: true, description: 'Hash of hotfix transactions' }),
  }

  static examples = [
    'whitelisthotfix --hash 0x614dccb5ac13cba47c2430bdee7829bb8c8f3603a8ace22e7680d317b39e3658 --from 0x5409ed021d9299bf6814279a6a1411a7e866a631',
  ]

  async run() {
    const kit = await this.getKit()
    const res = await this.parse(WhitelistHotfix)
    const hash = toBuffer(res.flags.hash) as Buffer
    const account = res.flags.from
    kit.defaultAccount = account

    await newCheckBuilder(this).hotfixNotExecuted(hash).runChecks()

    const governance = await kit.contracts.getGovernance()
    await displaySendTx(
      'whitelistHotfixTx',
      governance.whitelistHotfix(hash),
      {},
      'HotfixWhitelisted'
    )
  }
}
