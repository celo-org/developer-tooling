import { BaseCommand } from '../../base'

export default class NodeAccounts extends BaseCommand {
  static description = 'List the addresses that this node has the private keys for.'

  static flags = {
    ...BaseCommand.flags,
  }

  requireSynced = false

  async run() {
    const kit = await this.getKit()
    this.parse(NodeAccounts)

    const accounts = await kit.connection.getAccounts()
    console.log('***This command will be deprecated, please use "account:list" ***')
    console.log(accounts)
  }
}
