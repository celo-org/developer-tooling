import { toBuffer } from '@ethereumjs/util'
import { Flags } from '@oclif/core'
import { BaseCommand } from '../../base'
import { newCheckBuilder } from '../../utils/checks'
import { displaySendTx } from '../../utils/cli'
import { CustomFlags } from '../../utils/command'

export default class PrepareHotfix extends BaseCommand {
  static description = 'Prepare a governance hotfix for execution in the current epoch'

  static flags = {
    ...BaseCommand.flags,
    from: CustomFlags.address({ required: true, description: "Preparer's address" }),
    hash: Flags.string({ required: true, description: 'Hash of hotfix transactions' }),
  }

  static examples = [
    'preparehotfix --hash 0x614dccb5ac13cba47c2430bdee7829bb8c8f3603a8ace22e7680d317b39e3658 --from 0x5409ed021d9299bf6814279a6a1411a7e866a631',
  ]

  async run() {
    const kit = await this.getKit()
    const res = await this.parse(PrepareHotfix)
    const account = res.flags.from
    kit.defaultAccount = account

    const governance = await kit.contracts.getGovernance()
    const hash = toBuffer(res.flags.hash) as Buffer

    await newCheckBuilder(this, account)
      .hotfixApproved(hash)
      .hotfixCouncilApproved(hash)
      .hotfixNotExecuted(hash)
      .runChecks()

    await displaySendTx('prepareHotfixTx', governance.prepareHotfix(hash), {}, 'HotfixPrepared')
  }
}
