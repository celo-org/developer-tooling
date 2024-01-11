import { StableTokenInfo } from '@celo/contractkit/lib/celo-tokens'
import { Flags, ux } from '@oclif/core'

import { BaseCommand } from '../../base'

export default class ExchangeShow extends BaseCommand {
  static description = 'Show the current exchange rates offered by the Exchange'

  static flags = {
    ...BaseCommand.flags,
    amount: Flags.string({
      description: 'Amount of the token being exchanged to report rates for',
      default: '1000000000000000000',
    }),
  }

  static args = {}

  static examples = ['list']

  async run() {
    const kit = await this.getKit()
    const { flags: parsedFlags } = await this.parse(ExchangeShow)

    ux.action.start('Fetching exchange rates...')
    const exchangeAmounts = await kit.celoTokens.forStableCeloToken(
      async (info: StableTokenInfo) => {
        const exchange = await kit.contracts.getContract(info.exchangeContract)
        return {
          buy: await exchange.getBuyTokenAmount(parsedFlags.amount as string, true),
          sell: await exchange.getBuyTokenAmount(parsedFlags.amount as string, false),
        }
      }
    )
    ux.action.stop()

    Object.entries(exchangeAmounts).forEach((element) => {
      this.log(`CELO/${element[0]}:`)
      this.log(`${parsedFlags.amount} CELO => ${element[1]!.buy} ${element[0]}`)
      this.log(`${parsedFlags.amount} ${element[0]} => ${element[1]!.sell} CELO`)
    })
  }
}
