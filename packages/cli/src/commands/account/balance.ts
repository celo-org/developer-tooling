import { BaseCommand } from '../../base'
import { failWith, printValueMap } from '../../utils/cli'
import { CustomArgs, CustomFlags } from '../../utils/command'

export default class Balance extends BaseCommand {
  static description = 'View Celo Stables and CELO balances for an address'

  static flags = {
    ...BaseCommand.flags,
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
    const kit = await this.getKit()
    const { args, flags } = await this.parse(Balance)

    console.log('All balances expressed in units of 10^-18.')
    printValueMap(await kit.getTotalBalance(args.arg1 as string))
    if (flags.erc20Address) {
      try {
        const erc20 = await kit.contracts.getErc20(flags.erc20Address)
        printValueMap({ erc20: await erc20.balanceOf(args.arg1 as string) })
      } catch {
        failWith('Invalid erc20 address')
      }
    }
  }
}
