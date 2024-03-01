import { BaseCommand, gasOptions } from '../../base'
import { readConfig, writeConfig } from '../../utils/config'
export default class Set extends BaseCommand {
  static description = 'Configure running node information for propogating transactions to network'

  static flags = {
    ...BaseCommand.flags,
    node: {
      ...BaseCommand.flags.node,
      hidden: false,
    },
    gasCurrency: {
      ...BaseCommand.flags.gasCurrency,
      hidden: false,
    },
  }

  static examples = [
    'set --node ws://localhost:2500',
    'set --node <geth-location>/geth.ipc',
    'set --gasCurrency 0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1',
  ]

  requireSynced = false

  async run() {
    const res = await this.parse(Set)
    const curr = readConfig(this.config.configDir)
    const node = res.flags.node ?? curr.node
    // TODO(Arthur): Check `gasCurrency` logic works as expected here
    const gasCurrency = res.flags.gasCurrency
      ? (gasOptions as any)[res.flags.gasCurrency as string]
      : curr.gasCurrency
    /**
     * TODO(Arthur): Consider if this is a good place to implement a runtime check that
     * asserts the `gasCurrency` argument is a valid fee currency, before writing config.
     */
    writeConfig(this.config.configDir, {
      node,
      gasCurrency,
    })
  }
}
