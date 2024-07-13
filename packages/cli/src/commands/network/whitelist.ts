import { BaseCommand } from '../../base'
import { getFeeCurrencyContractWrapper } from '../../utils/fee-currency'

export default class Whitelist extends BaseCommand {
  static description = 'List the whitelisted fee currencies'

  static flags = {
    ...BaseCommand.flags,
  }

  static args = {}

  static examples = ['whitelist']

  async run() {
    const kit = await this.getKit()
    const feeCurrencyContract = await getFeeCurrencyContractWrapper(kit, await this.isCel2())
    const validFeeCurrencies = await feeCurrencyContract.getAddresses()

    const pairs = (await feeCurrencyContract.getFeeCurrencyInformation(validFeeCurrencies)).map(
      ({ name, symbol, address, adaptedToken, decimals }) =>
        `${address} - ${name || 'unknown name'} (${symbol || 'N/A'})${
          adaptedToken ? ` (adapted token: ${adaptedToken})` : ''
        } - ${decimals} decimals`
    )
    // if we use ux.table for this instead then people could pass --csv or --json to get the data how they need it
    console.log(`Available currencies:\n${pairs.join('\n')}`)
  }
}
