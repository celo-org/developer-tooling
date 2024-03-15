import { toFixed } from '@celo/utils/lib/fixidity'
import { Flags } from '@oclif/core'
import BigNumber from 'bignumber.js'
import { BaseCommand } from '../../base'
import { newCheckBuilder } from '../../utils/checks'
import { displaySendTx } from '../../utils/cli'
import { CustomFlags } from '../../utils/command'
import { LockedGoldArgs } from '../../utils/lockedgold'

export default class Delegate extends BaseCommand {
  static description = 'Delegate locked celo.'

  static flags = {
    ...BaseCommand.flags,
    from: CustomFlags.address({ ...CustomFlags.address, required: true }),
    to: CustomFlags.address({ ...CustomFlags.address, required: true }),
    percent: Flags.string({
      ...LockedGoldArgs.valueArg,
      required: true,
      description: '1-100% of locked celo to be delegated',
    }),
  }

  static args = {}

  static examples = [
    'delegate --from 0x47e172F6CfB6c7D01C1574fa3E2Be7CC73269D95 --to 0xc0ffee254729296a45a3885639AC7E10F9d54979 --percent 100',
  ]

  async run() {
    const kit = await this.getKit()
    const res = await this.parse(Delegate)
    const address = res.flags.from
    const to = res.flags.to

    kit.defaultAccount = address
    const percent = new BigNumber(res.flags.percent).div(100)
    const percentFixed = toFixed(percent)

    await newCheckBuilder(this)
      .addCheck(`Value [${percentFixed}] is > 0 and <=100`, () => percent.gt(0) && percent.lte(100))
      .isAccount(address)
      .isAccount(to)
      .runChecks()

    const lockedGold = await kit.contracts.getLockedGold()

    console.log('value', percent.toString())
    console.log('valueFixed', percentFixed.toFixed())

    const tx = lockedGold.delegate(to, percentFixed.toFixed())
    await displaySendTx('delegate', tx)
  }
}
