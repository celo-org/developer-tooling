import { getAccountsContract } from '@celo/actions/contracts/accounts'
import { Flags } from '@oclif/core'
import { BaseCommand } from '../../base'
import { newCheckBuilder } from '../../utils/checks'
import { displayViemTx } from '../../utils/cli'
import { CustomFlags } from '../../utils/command'

export default class Register extends BaseCommand {
  static description =
    'Register an account on-chain. This allows you to lock CELO, which is a pre-requisite for registering a Validator or Group, participating in Validator elections and on-chain Governance, and earning epoch rewards.'

  static flags = {
    ...BaseCommand.flags,
    name: Flags.string(),
    from: CustomFlags.address({ required: true }),
  }

  static args = {}

  static examples = [
    'register --from 0x5409ed021d9299bf6814279a6a1411a7e866a631',
    'register --from 0x5409ed021d9299bf6814279a6a1411a7e866a631 --name test-account',
  ]

  async run() {
    const [publicClient, walletClient] = await Promise.all([
      this.getPublicClient(),
      this.getWalletClient(),
    ])
    const res = await this.parse(Register)

    const accountsContract = await getAccountsContract({
      public: publicClient,
      wallet: walletClient,
    })

    await newCheckBuilder(this).isNotAccount(res.flags.from).runChecks()

    await displayViemTx('register', accountsContract.write.createAccount(), publicClient)

    if (res.flags.name) {
      await displayViemTx('setName', accountsContract.write.setName([res.flags.name]), publicClient)
    }
  }
}
