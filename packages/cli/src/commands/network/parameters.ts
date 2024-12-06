import { Flags } from '@oclif/core'
import { BaseCommand } from '../../base'
import { printValueMapRecursive } from '../../utils/cli'
import { ViewCommmandFlags } from '../../utils/flags'

export default class Parameters extends BaseCommand {
  static description =
    'View parameters of the network, including but not limited to configuration for the various Celo core smart contracts.'

  static flags = {
    ...ViewCommmandFlags,
    raw: Flags.boolean({
      description: 'Display raw numerical configuration',
      required: false,
      default: false,
    }),
  }

  async run() {
    const kit = await this.getKit()
    const res = await this.parse(Parameters)
    const config = await kit.getNetworkConfig(!res.flags.raw)
    printValueMapRecursive(config)
  }
}
