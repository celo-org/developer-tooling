import { Flags } from '@oclif/core'
import prompts from 'prompts'
import { newCheckBuilder } from '../../utils/checks'
import { displaySendTx } from '../../utils/cli'
import { ReleaseGoldBaseCommand } from '../../utils/release-gold-base'
export default class SetLiquidityProvision extends ReleaseGoldBaseCommand {
  static description =
    'Set the liquidity provision to true, allowing the beneficiary to withdraw released gold.'

  static flags = {
    ...ReleaseGoldBaseCommand.flags,
    yesreally: Flags.boolean({ description: 'Override prompt to set liquidity (be careful!)' }),
  }

  static args = {}

  static examples = [
    'set-liquidity-provision --contract 0x5409ED021D9299bf6814279A6A1411A7e866A631',
  ]

  async run() {
    const kit = await this.getKit()
    const { flags } = await this.parse(SetLiquidityProvision)

    await newCheckBuilder(this)
      .addCheck('The liquidity provision has not already been set', async () => {
        const liquidityProvisionMet = await this.releaseGoldWrapper.getLiquidityProvisionMet()
        return !liquidityProvisionMet
      })
      .runChecks()

    if (!flags.yesreally) {
      const response = await prompts({
        type: 'confirm',
        name: 'confirmation',
        message: 'Are you sure you want to enable the liquidity provision? (y/n)',
      })

      if (!response.confirmation) {
        console.info('Aborting due to user response')
        process.exit(0)
      }
    }

    kit.defaultAccount = await this.releaseGoldWrapper.getReleaseOwner()
    await displaySendTx('setLiquidityProvision', this.releaseGoldWrapper.setLiquidityProvision())
  }
}
