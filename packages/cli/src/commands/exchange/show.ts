import { Flags, ux } from '@oclif/core'

import { BaseCommand } from '../../base'
import { getExchangeRates } from '../../utils/mento-broker-adaptor'

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
    const exchangeAmounts = await getExchangeRates(kit.connection, parsedFlags.amount as string)
    ux.action.stop()

    exchangeAmounts
      .filter((element) => element !== undefined)
      .forEach((element) => {
        this.log(`CELO/${element?.symbol}:`)
        this.log(`${parsedFlags.amount} CELO => ${element?.buy} ${element?.symbol}`)
        this.log(`${parsedFlags.amount} ${element?.symbol} => ${element?.sell} CELO`)
      })
    ux.exit(0)
  }
}
