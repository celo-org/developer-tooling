import { goldTokenABI } from '@celo/abis'
import { Flags } from '@oclif/core'
import BigNumber from 'bignumber.js'
import assert from 'node:assert'
import { BaseCommand } from '../../base'
import { resolveAddress } from '../../packages-to-be/address-resolver'
import { bigNumberToBigInt } from '../../packages-to-be/utils'
import { newCheckBuilder } from '../../utils/checks'
import { displayViemTx } from '../../utils/cli'
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
    const client = await this.getPublicClient()
    const wallet = await this.getWalletClient()
    const res = await this.parse(TransferCelo)

    if (!wallet) {
      throw new Error('TODO: only AKV doesnt return a wallet')
    }

    const from = res.flags.from
    const to = res.flags.to
    const value = new BigNumber(res.flags.value)

    assert(
      wallet.account.address === res.flags.from,
      '--from address doesnt correspond to the wallet being used'
    )

    await newCheckBuilder(this)
      .isNotSanctioned(from)
      .isNotSanctioned(to)
      .hasEnoughCelo(from, value)
      .runChecks()

    const celoContract = {
      address: await resolveAddress(client, 'GoldToken'),
      abi: goldTokenABI,
      // TODO: get rid of kit here
      ...(kit.connection.defaultFeeCurrency
        ? { feeCurrency: kit.connection.defaultFeeCurrency }
        : {}),
    } as const

    await (res.flags.comment
      ? displayViemTx(
          'transferWithComment',
          {
            ...celoContract,
            functionName: 'transferWithComment',
            args: [to, bigNumberToBigInt(value), res.flags.comment],
            account: wallet.account,
          },
          client,
          wallet
        )
      : displayViemTx(
          'transfer',
          // NOTE: this used to be celoToken.transfer
          // but this way ledger considers this a native transfer and show the to and value properly
          // instead of a contract call
          // send: (_params) =>
          //   kit.sendTransaction({ to, value: value.toFixed(), from, ..._params }),

          // NOTE: refactor displayViemTx to accept raw txs
          {
            ...celoContract,
            functionName: 'transfer',
            args: [to, bigNumberToBigInt(value)],
            account: wallet.account,
          },
          client,
          wallet
        ))
  }
}
