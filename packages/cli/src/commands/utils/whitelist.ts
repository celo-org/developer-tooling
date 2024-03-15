import { BaseCommand } from '../../base'

export default class Whitelist extends BaseCommand {
  static description = 'List the whitelisted fee currencies'

  static flags = {
    ...BaseCommand.flags,
  }

  static args = {}

  static examples = ['whitelist']

  async run() {
    const kit = await this.getKit()

    const validFeeCurrencies = await kit.getFeeCurrencyWhitelist()
    const pairs = (await kit.getFeeCurrencyInformation(validFeeCurrencies)).map(
      ({ name, symbol, address }) => `${address} - ${name} (${symbol})`
    )
    console.log(`Available currencies:\n${pairs.join('\n')}`)
  }
}
