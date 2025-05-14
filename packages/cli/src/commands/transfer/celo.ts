import { Flags } from '@oclif/core'
import { PublicClient } from 'viem'
import { CeloTransactionRequest } from 'viem/celo'
import { BaseCommand } from '../../base'
import { getERC20Contract, getGoldTokenContract } from '../../packages-to-be/contracts'
import { getGasPriceOnCelo } from '../../packages-to-be/utils'
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

  async init() {
    // noop - skips ContractKit initialization
  }

  async run() {
    const client = await this.getPublicClient()
    const wallet = await this.getWalletClient()
    const res = await this.parse(TransferCelo)

    const from = res.flags.from
    const to = res.flags.to
    const value = res.flags.value
    const feeCurrency = res.flags.gasCurrency

    const params = feeCurrency ? { feeCurrency } : {}

    const goldTokenContract = await getGoldTokenContract(client as PublicClient)
    const transferWithCommentContractData = {
      address: goldTokenContract.address,
      abi: goldTokenContract.abi,
      account: wallet.account,
      functionName: 'transferWithComment',
      args: [to, value, res.flags.comment!],
      ...params,
    } as Parameters<typeof client.estimateContractGas>[0]

    const transferParams = { to, value: value, ...params } as CeloTransactionRequest

    await newCheckBuilder(this)
      .isNotSanctioned(from)
      .isNotSanctioned(to)
      .isValidWalletSigner(from)
      .hasEnoughCelo(from, value)
      .usesWhitelistedFeeCurrency(feeCurrency)
      .addCheck(
        `Account can afford to transfer CELO with gas paid in ${feeCurrency || 'CELO'}`,
        async () => {
          const [gas, gasPrice, balanceOfTokenForGas] = await Promise.all([
            res.flags.comment
              ? client.estimateContractGas(transferWithCommentContractData)
              : client.estimateGas(transferParams),
            getGasPriceOnCelo(client, feeCurrency),
            (feeCurrency
              ? await getERC20Contract(client as PublicClient, feeCurrency)
              : goldTokenContract
            ).read.balanceOf([from]),
          ])
          transferParams.gas = gas
          transferParams.maxFeePerGas = gasPrice

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
      // NOTE: fast fail in case feeCurrency isn't whitelisted or invalid
      // the gas estimation will fail
      .runChecks({ failFast: true })

    await (res.flags.comment
      ? displaySendViemContractCall(
          'CeloToken',
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
