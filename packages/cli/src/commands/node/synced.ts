import { Flags } from '@oclif/core'
import { BaseCommand } from '../../base'
import { nodeIsSynced } from '../../utils/helpers'

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
    const web3 = await this.getWeb3()
    const res = await this.parse(NodeSynced)

    if (res.flags.verbose) {
      const status = await web3.eth.isSyncing()
      if (typeof status !== 'boolean') {
        console.log(status)
      }
    }
    console.log(await nodeIsSynced(web3))
  }
}
