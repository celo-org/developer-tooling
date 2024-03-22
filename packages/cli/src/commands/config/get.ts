import { BaseCommand } from '../../base'
import { printValueMap } from '../../utils/cli'
import { readConfig } from '../../utils/config'

export default class Get extends BaseCommand {
  static description = 'Output network node configuration'

  static flags = {
    ...BaseCommand.flags,
  }

  requireSynced = false

  async run() {
    // TODO now that thee are multiple values for gas currency it needs to be printed out differently
    printValueMap(readConfig(this.config.configDir))
  }
}
