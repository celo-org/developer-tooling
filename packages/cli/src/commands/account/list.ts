import { StrongAddress } from '@celo/base'
import { deriveLedgerAccounts } from '@celo/viem-account-ledger'
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
  isOnlyReadingWallet = true

  async init() {
    const res = await this.parse(AccountList)
    if (res.flags.useLedger) {
      // noop - this skip the --node
      return
    }
    return super.init()
  }

  async run() {
    let addresses: StrongAddress[]
    const res = await this.parse(AccountList)

    if (res.flags.useLedger) {
      const ledgerOptions = await this.ledgerOptions()
      const accounts = await deriveLedgerAccounts(ledgerOptions)
      addresses = accounts.map((account) => account.address)
      console.log(`Ledger Addresses: `, addresses)
      return
    }

    const wallet = await this.getWalletClient()
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
    console.log(`All Addresses: `, addresses)
  }
}
