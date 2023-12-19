import { CeloContract } from '@celo/contractkit'
import { Flags } from '@oclif/core'
import BigNumber from 'bignumber.js'
import { BaseCommand } from '../../base'
import { displaySendTx, failWith } from '../../utils/cli'
import { CustomFlags } from '../../utils/command'

export default class ReportPrice extends BaseCommand {
  static description = 'Report the price of CELO in a specified token'

  static args = [
    {
      name: 'token',
      required: true,
      default: CeloContract.StableToken,
      description: 'Token to report on',
    },
  ]
  static flags = {
    ...BaseCommand.flags,
    from: CustomFlags.address({ required: true, description: 'Address of the oracle account' }),
    value: Flags.string({
      required: true,
      description: 'Amount of the specified token equal to 1 CELO',
    }),
  }

  static example = [
    'report StableToken --value 1.02 --from 0x8c349AAc7065a35B7166f2659d6C35D75A3893C1',
    'report --value 0.99 --from 0x8c349AAc7065a35B7166f2659d6C35D75A3893C1',
    'report StableTokenEUR --value 1.02 --from 0x8c349AAc7065a35B7166f2659d6C35D75A3893C1',
  ]

  async run() {
    const kit = await this.getKit()
    const res = await this.parse(ReportPrice)
    const sortedOracles = await kit.contracts.getSortedOracles()
    const value = new BigNumber(res.flags.value)

    await displaySendTx(
      'sortedOracles.report',
      await sortedOracles.report(res.args.token, value, res.flags.from).catch((e) => failWith(e))
    )
    this.log(`Reported oracle value: ${value.toString()} ${res.args.token} == 1 CELO`)
  }
}
