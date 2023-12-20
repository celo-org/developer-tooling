import { CeloContract } from '@celo/contractkit'
import { Args, ux } from '@oclif/core'

import { BaseCommand } from '../../base'
import { failWith } from '../../utils/cli'

export default class Reports extends BaseCommand {
  static description = 'List oracle reports for a given token'

  static flags = {
    ...BaseCommand.flags,
    ...(ux.table.flags() as object),
  }

  static args = {
    arg1: Args.string({
      name: 'token',
      required: true,
      description: 'Token to list the reports for',
      default: CeloContract.StableToken,
    }),
  }

  static example = ['reports StableToken', 'reports', 'reports StableTokenEUR']

  async run() {
    const kit = await this.getKit()
    const res = await this.parse(Reports)
    const sortedOracles = await kit.contracts.getSortedOracles()

    const reports = await sortedOracles.getReports(res.args.arg1).catch((e) => failWith(e))
    ux.table(
      // @ts-expect-error
      reports,
      {
        address: {},
        // @ts-expect-error
        rate: { get: (r) => r.rate.toNumber() },
        // @ts-expect-error
        timestamp: { get: (r) => r.timestamp.toNumber() },
      },
      res.flags
    )
  }
}
