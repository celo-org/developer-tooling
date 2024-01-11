import { BaseCommand } from '../../base'
import { newCheckBuilder } from '../../utils/checks'
import { printValueMapRecursive } from '../../utils/cli'
import { CustomArgs } from '../../utils/command'

export default class Show extends BaseCommand {
  static description =
    'Show information for an account, including name, authorized vote, validator, and attestation signers, the URL at which account metadata is hosted, the address the account is using with the mobile wallet, and a public key that can be used to encrypt information for the account.'

  static flags = {
    ...BaseCommand.flags,
  }

  static args = {
    arg1: CustomArgs.address('address'),
  }

  static examples = ['show 0x5409ed021d9299bf6814279a6a1411a7e866a631']

  async run() {
    const kit = await this.getKit()
    const { args } = await this.parse(Show)
    const addressArg = args.arg1 as string
    await newCheckBuilder(this, addressArg).isSignerOrAccount().runChecks()
    const accounts = await kit.contracts.getAccounts()
    const address = await accounts.signerToAccount(addressArg)
    printValueMapRecursive(await accounts.getAccountSummary(address))
  }
}
