import { L1HotfixRecord } from '@celo/contractkit/lib/wrappers/Governance'
import { ProposalBuilder, ProposalTransactionJSON } from '@celo/governance'
import { hexToBuffer } from '@celo/utils/lib/address'
import { Flags } from '@oclif/core'
import { readFileSync } from 'fs-extra'
import { BaseCommand } from '../../base'
import { newCheckBuilder } from '../../utils/checks'
import { displaySendTx } from '../../utils/cli'
import { CustomFlags } from '../../utils/command'

export default class ExecuteHotfix extends BaseCommand {
  static description = 'Execute a governance hotfix prepared for the current epoch'

  static flags = {
    ...BaseCommand.flags,
    from: CustomFlags.address({ required: true, description: "Executors's address" }),
    jsonTransactions: Flags.string({ required: true, description: 'Path to json transactions' }),
    salt: Flags.string({ required: true, description: 'Secret salt associated with hotfix' }),
  }

  static examples = [
    'executehotfix --jsonTransactions ./transactions.json --salt 0x614dccb5ac13cba47c2430bdee7829bb8c8f3603a8ace22e7680d317b39e3658 --from 0x5409ed021d9299bf6814279a6a1411a7e866a631',
  ]

  async run() {
    const kit = await this.getKit()
    const res = await this.parse(ExecuteHotfix)
    const account = res.flags.from
    kit.defaultAccount = account

    const jsonString = readFileSync(res.flags.jsonTransactions).toString()
    const jsonTransactions: ProposalTransactionJSON[] = JSON.parse(jsonString)

    const builder = new ProposalBuilder(kit)
    jsonTransactions.forEach((tx) => builder.addJsonTx(tx))
    const hotfix = await builder.build()
    const saltBuff = hexToBuffer(res.flags.salt)
    const governance = await kit.contracts.getGovernance()
    const hash = hexToBuffer(await governance.getHotfixHash(hotfix, saltBuff))
    const record = await governance.getHotfixRecord(hash)
    const isCel2 = await this.isCel2()

    if (isCel2) {
      await newCheckBuilder(this, account)
        .hotfixApproved(hash)
        .hotfixCouncilApproved(hash)
        .hotfixNotExecuted(hash)
        .hotfixExecutionTimeLimitNotReached(hash)
        .runChecks()
    } else {
      await newCheckBuilder(this, account)
        .hotfixIsPassing(hash)
        .hotfixNotExecuted(hash)
        .addCheck(`Hotfix 0x${hash.toString('hex')} is prepared for current epoch`, async () => {
          const validators = await kit.contracts.getValidators()
          const currentEpoch = await validators.getEpochNumber()
          return (record as L1HotfixRecord).preparedEpoch.eq(currentEpoch)
        })
        .addCheck(`Hotfix 0x${hash.toString('hex')} is approved`, () => record.approved)
        .runChecks()
    }

    await displaySendTx(
      'executeHotfixTx',
      governance.executeHotfix(hotfix, saltBuff),
      {},
      'HotfixExecuted'
    )
  }
}
