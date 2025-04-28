import { StrongAddress } from '@celo/base'
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
  isReadOnlyWallet = true

  async init() {
    const wallet = await this.getWalletClient()
    if (!wallet) {
      return super.init()
    } else {
      // noop - this maybe skips the --node check?
    }
  }

  async run() {
    const res = await this.parse(AccountList)
    const wallet = await this.getWalletClient()
    let addresses: StrongAddress[]
    if (wallet) {
      // Retrieve accounts from the connected Celo node.
      addresses = await wallet.getAddresses()
    } else {
      // TODO: remove me when useAKV implemented or deprecated
      // NOTE: Fallback to web3 for `useAKV` flag
      const kit = await this.getKit()
      addresses = await kit.connection.getAccounts()
    }
    // Display the addresses.
    const prefix = res.flags.useLedger ? 'Ledger' : 'All'
    console.log(`${prefix} Addresses: `, addresses)
  }
}
