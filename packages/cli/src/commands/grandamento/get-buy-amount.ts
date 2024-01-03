import { StableToken } from '@celo/contractkit'
import { toFixed } from '@celo/utils/lib/fixidity'
import { Flags } from '@oclif/core'
import { BaseCommand } from '../../base'
import { printValueMap } from '../../utils/cli'
import { CustomFlags } from '../../utils/command'
import { enumEntriesDupWithLowercase } from '../../utils/helpers'

const stableTokenOptions = enumEntriesDupWithLowercase(Object.entries(StableToken))

export default class GetBuyAmount extends BaseCommand {
  static description = 'Gets the buy amount for a prospective Granda Mento exchange'

  static flags = {
    ...BaseCommand.flags,
    value: CustomFlags.wei({
      required: true,
      description: 'The value of the tokens to exchange',
    }),
    stableToken: Flags.option({
      options: Object.keys(stableTokenOptions) as (StableToken | Lowercase<StableToken>)[],
      description: 'Name of the stable to receive or send',
    })({ required: true, default: 'cusd' }),
    sellCelo: Flags.boolean({
      required: true,
      description: 'Sell or buy CELO',
    }),
  }

  async run() {
    const kit = await this.getKit()
    const grandaMento = await kit.contracts.getGrandaMento()

    const res = await this.parse(GetBuyAmount)
    const sellAmount = res.flags.value
    const stableToken = stableTokenOptions[res.flags.stableToken]
    const sellCelo = res.flags.sellCelo

    const stableTokenAddress = await kit.celoTokens.getAddress(stableToken)
    const sortedOracles = await kit.contracts.getSortedOracles()
    const celoStableTokenOracleRate = (await sortedOracles.medianRate(stableTokenAddress)).rate

    const buyAmount = await grandaMento.getBuyAmount(
      toFixed(celoStableTokenOracleRate),
      sellAmount,
      sellCelo
    )

    printValueMap({
      buyAmount,
    })
  }
}
