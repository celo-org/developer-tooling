import { Flags } from '@oclif/core'
import BigNumber from 'bignumber.js'
import { BaseCommand } from '../../base'
import { newCheckBuilder } from '../../utils/checks'
import { displaySendTx } from '../../utils/cli'
import { CustomFlags } from '../../utils/command'

export default class TransferCelo extends BaseCommand {
  static description =
    'Transfer CELO to a specified address. (Note: this is the equivalent of the old transfer:gold)'

  static flags = {
    ...BaseCommand.flags,
    from: CustomFlags.address({ required: true, description: 'Address of the sender' }),
    to: CustomFlags.address({ required: true, description: 'Address of the receiver' }),
    value: Flags.string({ required: true, description: 'Amount to transfer (in wei)' }),
    comment: Flags.string({ description: 'Transfer comment' }),
  }

  static examples = [
    'celo --from 0xa0Af2E71cECc248f4a7fD606F203467B500Dd53B --to 0x5409ed021d9299bf6814279a6a1411a7e866a631 --value 10000000000000000000',
  ]

  async run() {
    const kit = await this.getKit()
    const res = await this.parse(TransferCelo)

    const from = res.flags.from
    const to = res.flags.to
    const value = new BigNumber(res.flags.value)

    kit.defaultAccount = from
    const celoToken = await kit.contracts.getGoldToken()

    const params = await kit.connection.setFeeMarketGas(
      kit.connection.defaultFeeCurrency ? { feeCurrency: kit.connection.defaultFeeCurrency } : {}
    )

    await newCheckBuilder(this)
      .isNotSanctioned(from)
      .isNotSanctioned(to)
      .hasEnoughCelo(from, value)
      .runChecks()

    await (res.flags.comment
      ? displaySendTx(
          'transferWithComment',
          celoToken.transferWithComment(to, value.toFixed(), res.flags.comment)
        )
      : displaySendTx(
          'transfer',
          // @ts-expect-error
          {
            // NOTE: this used to be celoToken.transfer
            // but this way ledger considers this a native transfer and show the to and value properly
            // instead of a contract call
            send: (_params) =>
              kit.sendTransaction({ to, value: value.toFixed(), from, ..._params }),
          },
          params
        ))
  }
}
