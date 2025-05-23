import { getGasPriceOnCelo } from '@celo/actions'
import { getCeloERC20Contract } from '@celo/actions/contracts/celo-erc20'
import { getERC20Contract } from '@celo/actions/contracts/erc20'
import { Flags } from '@oclif/core'
import { isAddressEqual, publicActions } from 'viem'
import { CeloTransactionRequest } from 'viem/celo'
import { BaseCommand } from './base'
import {
  StableToken,
  StableTokenContract,
  StableTokenContractGetter,
  StableTokens,
} from './packages-to-be/stable-tokens'
import { newCheckBuilder } from './utils/checks'
import { displayViemTx, failWith } from './utils/cli'
import { CustomFlags } from './utils/command'
import { enumEntriesDupWithLowercase } from './utils/helpers'

const stableTokenOptions = enumEntriesDupWithLowercase(Object.entries(StableTokens))
export abstract class TransferStableBase extends BaseCommand {
  static flags = {
    ...BaseCommand.flags,
    from: CustomFlags.address({ required: true, description: 'Address of the sender' }),
    to: CustomFlags.address({ required: true, description: 'Address of the receiver' }),
    value: CustomFlags.bigint({ required: true, description: 'Amount to transfer (in wei)' }),
    comment: Flags.string({ description: 'Transfer comment' }),

    // NOTE: adding the stableToken here as hidden to be used in TransferStable
    // solves lots of typing headaches related to oclif and
    // `this.parse(TransferStableBase)` throwing NonExistentFlag --stableToken
    stableToken: Flags.option({
      options: Object.keys(stableTokenOptions) as StableToken[],
      description: 'Name of the stable to be transferred',
      hidden: true,
    })(),
  } as const

  protected _stableCurrencyContract: StableTokenContractGetter | null = null

  async init() {
    // noop - skips ContractKit initialization
  }

  async run() {
    const client = await this.getPublicClient()
    const wallet = await this.getWalletClient()!
    const res = await this.parse(TransferStableBase)

    if (!wallet) {
      failWith('--useAKV flag is no longer support on transfer commands')
    }

    const from = res.flags.from
    const to = res.flags.to
    const value = res.flags.value
    const feeCurrency = res.flags.gasCurrency

    if (!this._stableCurrencyContract) {
      throw new Error('Stable currency not set')
    }
    const stableToken = Object.entries(StableTokens).find(
      ([_, fn]) => fn === this._stableCurrencyContract
    )![0] as StableToken
    let stableTokenContract: StableTokenContract<typeof wallet>
    try {
      // @ts-expect-error - this should be StableTokenContract by for some
      // reason it returns `any`
      stableTokenContract = await this._stableCurrencyContract(wallet.extend(publicActions))
    } catch {
      failWith(`The ${stableToken} token was not deployed yet`)
    }
    const celoContract = await getCeloERC20Contract({ public: client, wallet })

    const transferParams = (feeCurrency ? { feeCurrency } : {}) as Pick<
      CeloTransactionRequest,
      'gas' | 'feeCurrency' | 'maxFeePerGas'
    >

    await newCheckBuilder(this)
      .hasEnoughStable(from, value, stableToken)
      .isNotSanctioned(from)
      .isNotSanctioned(to)
      .isValidWalletSigner(from)
      .usesWhitelistedFeeCurrency(feeCurrency)
      .addCheck(
        `Account can afford to transfer ${stableToken} with gas paid in ${feeCurrency || 'CELO'}`,
        async () => {
          const feeInSameStableTokenAsTransfer =
            feeCurrency && isAddressEqual(feeCurrency, stableTokenContract.address)

          const [gas, gasPrice, balanceOfTokenForGas, balanceOfTokenToSend] = await Promise.all([
            // gas estimation
            res.flags.comment
              ? stableTokenContract.estimateGas.transferWithComment(
                  [to, value, res.flags.comment],
                  transferParams
                )
              : stableTokenContract.estimateGas.transfer([to, value], transferParams),
            // fee estimation
            getGasPriceOnCelo(client, feeCurrency),
            //  balanceOfTokenForGas
            (feeCurrency
              ? feeInSameStableTokenAsTransfer
                ? stableTokenContract
                : await getERC20Contract({ public: client }, feeCurrency)
              : celoContract
            ).read.balanceOf([from]),
            stableTokenContract.read.balanceOf([from]),
          ])
          transferParams.gas = gas
          transferParams.maxFeePerGas = gasPrice

          const totalSpentOnGas = gas * gasPrice

          if (feeInSameStableTokenAsTransfer) {
            return balanceOfTokenToSend >= value + totalSpentOnGas
          }
          return balanceOfTokenForGas >= totalSpentOnGas && balanceOfTokenToSend >= value
        },
        `Cannot afford to transfer ${stableToken} ${
          res.flags.feeCurrency ? 'with' + ' ' + res.flags.feeCurrency + ' ' + 'feeCurrency' : ''
        }; try reducing value slightly or using a different feeCurrency`
      )
      // NOTE: fast fail in case feeCurrency isn't whitelisted or invalid
      // the gas estimation will fail
      .runChecks({ failFast: true })

    await (res.flags.comment
      ? displayViemTx(
          `${stableToken}->TransferWithComment`,
          stableTokenContract.write.transferWithComment(
            [to, value, res.flags.comment],
            transferParams
          ),
          client
        )
      : displayViemTx(
          `${stableToken}->Transfer`,
          // NOTE: this used to be celoToken.transfer
          // but this way ledger considers this a native transfer and show the to and value properly
          // instead of a contract call
          stableTokenContract.write.transfer([to, value], transferParams),
          client
        ))
  }
}
