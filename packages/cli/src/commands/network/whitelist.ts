import { isCel2 } from '@celo/connect'
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

    const feeCurrencyContract = await ((await isCel2(kit.web3))
      ? kit.contracts.getFeeCurrencyDirectory()
      : kit.contracts.getFeeCurrencyWhitelist())
    const validFeeCurrencies = await feeCurrencyContract.getAddresses()

    const pairs = (await feeCurrencyContract.getFeeCurrencyInformation(validFeeCurrencies)).map(
      ({ name, symbol, address, adaptedToken }) =>
        `${address} - ${name || 'unknown name'} (${symbol || 'N/A'})${
          adaptedToken ? ` (adapted token: ${adaptedToken})` : ''
        }`
    )
    console.log(`Available currencies:\n${pairs.join('\n')}`)
  }
}
