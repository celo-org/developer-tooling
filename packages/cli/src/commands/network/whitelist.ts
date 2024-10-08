import { ux } from '@oclif/core'
import { BaseCommand } from '../../base'
import { ViemCommand } from '../../viem'

export default class Whitelist extends ViemCommand {
  static description = 'List the whitelisted fee currencies'

  static flags = {
    ...BaseCommand.flags,
    ...(ux.table.flags() as object),
  }

  static args = {}

  static examples = ['whitelist']

  async run() {
    const { flags } = await this.parse(Whitelist)

    const validFeeCurrencies = await this.getSupportedFeeCurrencyAddresses()
    const feeCurrencyProvider = await this.getFeeCurrencyProvider()
    const pairs = await feeCurrencyProvider.getFeeCurrencyInformation(validFeeCurrencies)

    // Sort to have deterministic output
    pairs.sort((a, b) => a.address.localeCompare(b.address))

    ux.table(
      pairs.map((token) => ({ ...token })),
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
