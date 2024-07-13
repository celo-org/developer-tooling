import { ux } from '@oclif/core'
import chalk from 'chalk'
import { BaseCommand } from '../../base'
import { CeloConfig, readConfig, writeConfig } from '../../utils/config'
export default class Set extends BaseCommand {
  static description = 'Configure running node information for propagating transactions to network'

  static flags = {
    ...BaseCommand.flags,
    node: {
      ...BaseCommand.flags.node,
      hidden: false,
    },
  }

  static examples = [
    'set --node mainnet # alias for `forno`',
    'set --node forno # alias for https://forno.celo.org',
    'set --node baklava # alias for https://baklava-forno.celo-testnet.org',
    'set --node alfajores # alias for https://alfajores-forno.celo-testnet.org',
    'set --node localhost # alias for `local`',
    'set --node local # alias for http://localhost:8545',
    'set --node ws://localhost:2500',
    'set --node <geth-location>/geth.ipc',
  ]

  requireSynced = false

  async run() {
    const res = await this.parse(Set)
    const curr = readConfig(this.config.configDir)
    const node = res.flags.node ?? curr.node
    const gasCurrency = res.flags.gasCurrency

    if (gasCurrency) {
      ux.warn(
        `\nSetting a default gasCurrency has been removed from the config, you may still use the --gasCurrency on every command.\nDid you value this feature a lot and would like to see it back? Let us know at ${chalk.cyan(
          chalk.bold(`https://github.com/celo-org/developer-tooling/discussions/92`)
        )}`
      )
    }

    await writeConfig(this.config.configDir, {
      node,
    } as CeloConfig)
  }
}
