import { Flags } from '@oclif/core'
import { BaseCommand } from '../../base'
import { nodeIsSynced, nodeIsSyncedRaw } from '../../utils/helpers'

export default class NodeSynced extends BaseCommand {
  static description = 'Check if the node is synced'

  static flags = {
    ...BaseCommand.flags,
    verbose: Flags.boolean({
      description: 'output the full status if syncing',
    }),
  }

  requireSynced = false

  async run() {
    const res = await this.parse(NodeSynced)
    const client = await this.getPublicClient()

    if (res.flags.verbose) {
      const status = await nodeIsSyncedRaw(client)
      if (typeof status !== 'boolean') {
        console.log(status)
      }
    }
    console.log(await nodeIsSynced(client))
  }
}
