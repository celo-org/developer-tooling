import { getGasPriceOnCelo } from '@celo/actions'
import { getCeloERC20Contract } from '@celo/actions/contracts/celo-erc20'
import { getERC20Contract } from '@celo/actions/contracts/erc20'
import { Flags } from '@oclif/core'
import { CeloTransactionRequest } from 'viem/celo'
import { BaseCommand } from '../../base'
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

    const celoERC20Contract = await getCeloERC20Contract({ public: client, wallet })

    const transferParams = (feeCurrency ? { feeCurrency } : {}) as Pick<
      CeloTransactionRequest,
      'gas' | 'feeCurrency' | 'maxFeePerGas'
    >

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
              ? celoERC20Contract.estimateGas.transferWithComment([to, value, res.flags.comment!], {
                  feeCurrency,
                })
              : client.estimateGas({ to, value, ...transferParams }),
            getGasPriceOnCelo(client, feeCurrency),
            (feeCurrency
              ? await getERC20Contract({ public: client }, feeCurrency)
              : celoERC20Contract
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
      ? displayViemTx(
          'CeloToken->TransferWithComment',
          celoERC20Contract.write.transferWithComment(
            [to, value, res.flags.comment],
            transferParams
          ),
          client
        )
      : displayViemTx(
          'transfer',
          // NOTE: this used to be celoToken.transfer
          // but this way ledger considers this a native transfer and show the to and value properly
          // instead of a contract call
          wallet.sendTransaction({ to, value, ...transferParams }),
          client
        ))
  }
}
