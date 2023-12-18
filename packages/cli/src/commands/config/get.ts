import { BaseCommand } from '../../base'
import { printValueMap } from '../../utils/cli'
import { readConfig } from '../../utils/config'

export default class Get extends BaseCommand {
  static description = 'Output network node configuration'

  static flags: { [name: string]: any } = {
    ...BaseCommand.flags,
  }

  requireSynced = false

  async run() {
    printValueMap(readConfig(this.config.configDir))
  }
}
