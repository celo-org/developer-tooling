import { CeloContract } from '@celo/contractkit'
import { Args } from '@oclif/core'
import { BaseCommand } from '../../base'
import { displaySendTx, failWith } from '../../utils/cli'
import { CustomFlags } from '../../utils/command'

export default class RemoveExpiredReports extends BaseCommand {
  static description = 'Remove expired oracle reports for a specified token'

  static args = {
    arg1: Args.string({
      name: 'token',
      required: true,
      default: CeloContract.StableToken,
      description: 'Token to remove expired reports for',
    }),
  }
  static flags = {
    ...BaseCommand.flags,
    from: CustomFlags.address({
      required: true,
      description: 'Address of the account removing oracle reports',
    }),
  }

  static example = [
    'remove-expired-reports StableToken --from 0x8c349AAc7065a35B7166f2659d6C35D75A3893C1',
    'remove-expired-reports --from 0x8c349AAc7065a35B7166f2659d6C35D75A3893C1',
    'remove-expired-reports StableTokenEUR --from 0x8c349AAc7065a35B7166f2659d6C35D75A3893C1',
  ]

  async run() {
    const kit = await this.getKit()
    const res = await this.parse(RemoveExpiredReports)

    const sortedOracles = await kit.contracts.getSortedOracles().catch((e) => failWith(e))
    const txo = await sortedOracles.removeExpiredReports(res.args.arg1 as string)
    await displaySendTx('removeExpiredReports', txo)
  }
}
