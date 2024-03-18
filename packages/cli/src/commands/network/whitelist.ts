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

    const feeCurrencyWhitelist = await kit.contracts.getFeeCurrencyWhitelist()
    const validFeeCurrencies = await feeCurrencyWhitelist.getWhitelist()
    const pairs = (await feeCurrencyWhitelist.getFeeCurrencyInformation(validFeeCurrencies)).map(
      ({ name, symbol, address }) => `${address} - ${name || 'unknown name'} (${symbol || 'N/A'})`
    )
    console.log(`Available currencies:\n${pairs.join('\n')}`)
  }
}
