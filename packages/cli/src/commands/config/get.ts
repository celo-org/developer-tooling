import { BaseCommand } from '../../base'
import { printValueMap } from '../../utils/cli'
import { readConfig } from '../../utils/config'

export default class Get extends BaseCommand {
  static description = 'Output network node configuration'

  static flags = {}

  requireSynced = false

  async init() {
    // no op -- this is here to overwrite connecting to a node which this command does not need to do
  }

  async run() {
    printValueMap(readConfig(this.config.configDir))
  }
}
