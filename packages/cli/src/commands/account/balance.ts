import { Address, erc20Abi, getContract, PublicClient } from 'viem'
import { BaseCommand } from '../../base'
import { getTotalBalance } from '../../packages-to-be/account'
import { failWith, printValueMapRecursive } from '../../utils/cli'
import { CustomArgs, CustomFlags } from '../../utils/command'
import { ViewCommmandFlags } from '../../utils/flags'

export default class Balance extends BaseCommand {
  static description = 'View Celo Stables and CELO balances for an address'

  static flags = {
    ...ViewCommmandFlags,
    erc20Address: CustomFlags.address({
      description: 'Address of generic ERC-20 token to also check balance for',
    }),
  }

  static args = {
    arg1: CustomArgs.address('address'),
  }

  static examples = [
    'balance 0x5409ed021d9299bf6814279a6a1411a7e866a631',
    'balance 0x5409ed021d9299bf6814279a6a1411a7e866a631 --erc20Address 0x765DE816845861e75A25fCA122bb6898B8B1282a',
  ]

  async run() {
    const client = await this.getPublicClient()
    const { args, flags } = await this.parse(Balance)

    console.log('All balances expressed in units of wei.')

    // TODO this typing needs to be handled better...
    printValueMapRecursive(
      await getTotalBalance(client as any as PublicClient, args.arg1 as Address)
    )

    if (flags.erc20Address) {
      const erc20Contract = getContract({
        client,
        address: flags.erc20Address,
        abi: erc20Abi,
      })

      try {
        printValueMapRecursive({
          erc20: await erc20Contract.read.balanceOf([args.arg1 as Address]),
        })
      } catch {
        failWith('Invalid erc20 address')
      }
    }
  }
}
