import { ux } from '@oclif/core'
import { BaseCommand } from '../../base'
import { getFeeCurrencyContractWrapper } from '../../utils/fee-currency'

export default class Whitelist extends BaseCommand {
  static description = 'List the whitelisted fee currencies'

  static flags = {
    ...BaseCommand.flags,
    ...(ux.table.flags() as object),
  }

  static args = {}

  static examples = ['whitelist']

  async run() {
    const kit = await this.getKit()
    const { flags } = await this.parse(Whitelist)

    const feeCurrencyContract = await getFeeCurrencyContractWrapper(kit, await this.isCel2())
    const validFeeCurrencies = await feeCurrencyContract.getAddresses()

    const pairs = await feeCurrencyContract.getFeeCurrencyInformation(validFeeCurrencies)

    ux.table(
      pairs.map((token) => token),
      {
        name: { get: (token) => token.name },
        symbol: { get: (token) => token.symbol },
        whitelisted: { get: (token) => token.address, header: 'Whitelisted Address' },
        token: { get: (token) => token.adaptedToken || token.address, header: 'Token Address' },
        decimals: { get: (token) => token.decimals },
        usesAdapter: { get: (token) => !!token.adaptedToken, header: 'Uses Adapter?' },
      },
      flags
    )
  }
}
