import { Flags } from '@oclif/core'
import { PublicClient } from 'viem'
import { BaseCommand } from '../../base'
import { getERC20Contract, getGoldTokenContract } from '../../packages-to-be/contracts'
import { newCheckBuilder } from '../../utils/checks'
import { displaySendViemContractCall, displayViemTx } from '../../utils/cli'
import { CustomFlags } from '../../utils/command'

export default class TransferCelo extends BaseCommand {
  static description =
    'Transfer CELO to a specified address. (Note: this is the equivalent of the old transfer:gold)'

  static flags = {
    ...BaseCommand.flags,
    from: CustomFlags.address({ required: true, description: 'Address of the sender' }),
    to: CustomFlags.address({ required: true, description: 'Address of the receiver' }),
    value: CustomFlags.bigint({ required: true, description: 'Amount to transfer (in wei)' }),
    comment: Flags.string({ description: 'Transfer comment' }),
  }

  static examples = [
    'celo --from 0xa0Af2E71cECc248f4a7fD606F203467B500Dd53B --to 0x5409ed021d9299bf6814279a6a1411a7e866a631 --value 10000000000000000000',
  ]

  async run() {
    const client = await this.getPublicClient()
    const wallet = await this.getWalletClient()
    const res = await this.parse(TransferCelo)

    if (!wallet) {
      throw new Error('TODO: only AKV doesnt return a wallet')
    }

    const from = res.flags.from
    const to = res.flags.to
    const value = res.flags.value
    const feeCurrency = res.flags.gasCurrency

    const params = feeCurrency ? { feeCurrency } : {}

    const goldTokenContract = await getGoldTokenContract(client as PublicClient)
    const transferWithCommentContractData = {
      address: goldTokenContract.address,
      abi: goldTokenContract.abi,
      account: from,
      functionName: 'transferWithComment',
      args: [to, value, res.flags.comment!],
      ...params,
    } as const

    const transferParams = { to, value: value, ...params } as const

    await newCheckBuilder(this)
      .isNotSanctioned(from)
      .isNotSanctioned(to)
      .isValidWalletSigner(from)
      .hasEnoughCelo(from, value)
      .addCheck(
        `Account can afford to transfer CELO with gas paid in ${feeCurrency || 'CELO'}`,
        async () => {
          const [gas, gasPrice, balanceOfTokenForGas] = await Promise.all([
            res.flags.comment
              ? client.estimateContractGas(transferWithCommentContractData)
              : client.estimateGas(transferParams),
            client.getGasPrice(),
            (feeCurrency
              ? await getERC20Contract(client as PublicClient, feeCurrency)
              : goldTokenContract
            ).read.balanceOf([from]),
          ])

          const totalSpentOnGas = gas * gasPrice
          if (feeCurrency) {
            return balanceOfTokenForGas >= totalSpentOnGas
          }
          return balanceOfTokenForGas >= totalSpentOnGas + value
        },
        `Cannot afford to transfer CELO ${
          feeCurrency ? 'with' + ' ' + feeCurrency + ' ' + 'gasCurrency' : ''
        }; try reducing value slightly or using a different gasCurrency`
      )
      .runChecks()

    await (res.flags.comment
      ? displaySendViemContractCall(
          'GoldToken',
          transferWithCommentContractData,
          client,
          wallet,
          params
        )
      : displayViemTx(
          'transfer',
          // NOTE: this used to be celoToken.transfer
          // but this way ledger considers this a native transfer and show the to and value properly
          // instead of a contract call
          transferParams,
          client,
          wallet
        ))
  }
}
