import { newCheckBuilder } from '../../utils/checks'
import { displaySendTx } from '../../utils/cli'
import { CustomFlags } from '../../utils/command'
import { ReleaseGoldBaseCommand } from '../../utils/release-gold-base'

export default class Withdraw extends ReleaseGoldBaseCommand {
  static description =
    'Withdraws `value` released celo to the beneficiary address. Fails if `value` worth of celo has not been released yet.'

  static flags = {
    ...ReleaseGoldBaseCommand.flags,
    value: CustomFlags.wei({
      required: true,
      description: 'Amount of released celo (in wei) to withdraw',
    }),
  }

  static args = {}

  static examples = [
    'withdraw --contract 0x5409ED021D9299bf6814279A6A1411A7e866A631 --value 10000000000000000000000',
  ]

  async run() {
    const kit = await this.getKit()
    const { flags } = await this.parse(Withdraw)
    const value = flags.value

    const remainingUnlockedBalance = await this.releaseGoldWrapper.getRemainingUnlockedBalance()
    const maxDistribution = await this.releaseGoldWrapper.getMaxDistribution()
    const totalWithdrawn = await this.releaseGoldWrapper.getTotalWithdrawn()
    kit.defaultAccount = await this.releaseGoldWrapper.getBeneficiary()
    await newCheckBuilder(this)
      .addCheck('Value does not exceed available unlocked celo', () =>
        value.lte(remainingUnlockedBalance)
      )
      .addCheck('Value would not exceed maximum distribution', () =>
        value.plus(totalWithdrawn).lte(maxDistribution)
      )
      .addCheck('Contract has met liquidity provision if applicable', () =>
        this.releaseGoldWrapper.getLiquidityProvisionMet()
      )
      .addCheck(
        'Contract would self-destruct with cUSD left when withdrawing the whole balance',
        async () => {
          if (value.eq(remainingUnlockedBalance)) {
            const stableToken = await kit.contracts.getStableToken()
            const stableBalance = await stableToken.balanceOf(this.releaseGoldWrapper.address)
            if (stableBalance.gt(0)) {
              return false
            }
          }

          return true
        }
      )
      .isNotSanctioned(kit.defaultAccount as string)
      .runChecks()

    await displaySendTx('withdrawTx', this.releaseGoldWrapper.withdraw(value))
  }
}
