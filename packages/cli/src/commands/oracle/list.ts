import { CeloContract } from '@celo/contractkit'
import { Args } from '@oclif/core'
import { BaseCommand } from '../../base'
import { failWith } from '../../utils/cli'

export default class List extends BaseCommand {
  static description = 'List oracle addresses for a given token'

  static flags = {
    ...BaseCommand.flags,
  }

  static args = {
    arg1: Args.string({
      name: 'token',
      required: true,
      description: 'Token to list the oracles for',
      default: CeloContract.StableToken,
    }),
  }

  static example = ['list StableToken', 'list', 'list StableTokenEUR']

  async run() {
    const kit = await this.getKit()
    const res = await this.parse(List)
    const sortedOracles = await kit.contracts.getSortedOracles()

    const oracles = await sortedOracles.getOracles(res.args.arg1).catch((e) => failWith(e))
    console.log(oracles)
  }
}
