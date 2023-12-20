import { Flags } from '@oclif/core'
import prompts from 'prompts'
import { newCheckBuilder } from '../../utils/checks'
import { displaySendTx } from '../../utils/cli'
import { ReleaseGoldBaseCommand } from '../../utils/release-gold-base'
export default class SetMaxDistribution extends ReleaseGoldBaseCommand {
  static description = 'Set the maximum distribution of celo for the given contract'

  static flags = {
    ...ReleaseGoldBaseCommand.flags,
    distributionRatio: Flags.string({
      required: true,
      description:
        'Amount in range [0, 1000] (3 significant figures) indicating % of total balance available for distribution.',
    }),
    yesreally: Flags.boolean({
      description: 'Override prompt to set new maximum distribution (be careful!)',
    }),
  }

  static args = {}

  static examples = [
    'set-max-distribution --contract 0x5409ED021D9299bf6814279A6A1411A7e866A631 --distributionRatio 1000',
  ]

  async run() {
    const kit = await this.getKit()
    // tslint:disable-next-line
    const { flags } = await this.parse(SetMaxDistribution)
    const distributionRatio = Number(flags.distributionRatio)

    await newCheckBuilder(this)
      .addCheck(
        'Distribution ratio must be within [0, 1000]',
        () => distributionRatio >= 0 && distributionRatio <= 1000
      )
      .runChecks()

    if (!flags.yesreally) {
      const response = await prompts({
        type: 'confirm',
        name: 'confirmation',
        message:
          'Are you sure you want to set the new maximum distribution ratio to ' +
          distributionRatio +
          '? (y/n)',
      })

      if (!response.confirmation) {
        console.info('Aborting due to user response')
        process.exit(0)
      }
    }

    kit.defaultAccount = await this.releaseGoldWrapper.getReleaseOwner()
    await displaySendTx(
      'setMaxDistribution',
      this.releaseGoldWrapper.setMaxDistribution(distributionRatio)
    )
  }
}
