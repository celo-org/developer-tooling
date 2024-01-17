import { Flags } from '@oclif/core'
import { BaseCommand } from '../../base'
export default class AccountList extends BaseCommand {
  static description = 'List the addresses from the node and the local instance'

  static flags = {
    ...BaseCommand.flags,
    local: Flags.boolean({
      allowNo: true,
      description:
        'If set, only show local and hardware wallet accounts. Use no-local to only show keystore addresses.',
    }),
  }
  requireSynced = false

  async run() {
    const kit = await this.getKit()
    const res = await this.parse(AccountList)
    // Retrieve accounts from the connected Celo node.
    const allAddresses = !res.flags.local ? await kit.connection.getAccounts() : []

    // Get addresses from the local wallet.
    const localAddresses = res.flags.local ?? true ? kit.connection.getLocalAccounts() : []

    // Display the addresses.
    const localName = res.flags.useLedger ? 'Ledger' : 'Local'
    if (res.flags.local === undefined) {
      console.log('All Addresses: ', allAddresses)
    }
    if (!res.flags.local) {
      const nodeAddresses = allAddresses.filter((address) => !localAddresses.includes(address))
      console.log('Keystore Addresses: ', nodeAddresses)
    }
    if (res.flags.local ?? true) {
      console.log(`${localName} Addresses: `, localAddresses)
    }
  }
}
