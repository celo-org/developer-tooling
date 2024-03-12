import { StrongAddress } from '@celo/base'
import { Flags } from '@oclif/core'
import { BaseCommand } from '../../base'
import { readConfig, writeConfig } from '../../utils/config'
export default class Set extends BaseCommand {
  static description = 'Configure running node information for propogating transactions to network'

  static flags = {
    ...BaseCommand.flags,
    node: {
      ...BaseCommand.flags.node,
      hidden: false,
    },
    gasCurrency: Flags.string({
      description:
        'Use a specific gas currency for transaction fees (defaults to CELO if no gas currency is supplied)',
      hidden: true,
    }),
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
    const gasCurrency = res.flags.gasCurrency as StrongAddress

    await writeConfig(
      this.config.configDir,
      {
        node,
        gasCurrency,
      },
      await this.getKit()
    )
  }
}
