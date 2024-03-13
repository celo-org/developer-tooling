import { StableToken } from '@celo/contractkit'
import { StableTokenWrapper } from '@celo/contractkit/lib/wrappers/StableTokenWrapper'
import { Flags } from '@oclif/core'
import BigNumber from 'bignumber.js'
import { BaseCommand } from './base'
import { newCheckBuilder } from './utils/checks'
import { displaySendTx, failWith } from './utils/cli'
import { CustomFlags } from './utils/command'

export abstract class TransferStableBase extends BaseCommand {
  static flags = {
    ...BaseCommand.flags,
    from: CustomFlags.address({ required: true, description: 'Address of the sender' }),
    to: CustomFlags.address({ required: true, description: 'Address of the receiver' }),
    value: Flags.string({ required: true, description: 'Amount to transfer (in wei)' }),
    comment: Flags.string({ description: 'Transfer comment' }),
  }

  protected _stableCurrency: StableToken | null = null

  async run() {
    const kit = await this.getKit()
    const res = await this.parse()

    const from: string = res.flags.from
    const to: string = res.flags.to
    const value = new BigNumber(res.flags.value)

    if (!this._stableCurrency) {
      throw new Error('Stable currency not set')
    }
    let stableToken: StableTokenWrapper
    try {
      stableToken = await kit.contracts.getStableToken(this._stableCurrency)
    } catch {
      failWith(`The ${this._stableCurrency} token was not deployed yet`)
    }

    // If gasCurrency is not set, use the transferring token
    if (res.flags.gasCurrency) {
      kit.connection.defaultFeeCurrency = res.flags.gasCurrency
    } else {
      kit.connection.defaultFeeCurrency = (
        await kit.contracts.getStableToken(this._stableCurrency)
      ).address
    }

    const tx = res.flags.comment
      ? stableToken.transferWithComment(to, value.toFixed(), res.flags.comment)
      : stableToken.transfer(to, value.toFixed())

    let gas: number
    let gasPrice: string
    let gasBalance: BigNumber
    let valueBalance: BigNumber
    await newCheckBuilder(this)
      .hasEnoughStable(from, value, this._stableCurrency)
      .isNotSanctioned(from)
      .isNotSanctioned(to)
      .addCheck(
        `Account can afford transfer and gas paid in ${
          res.flags.gasCurrency || this._stableCurrency
        }`,
        async () => {
          ;[gas, gasPrice, gasBalance, valueBalance] = await Promise.all([
            tx.txo.estimateGas({ feeCurrency: kit.connection.defaultFeeCurrency }),
            kit.connection.gasPrice(kit.connection.defaultFeeCurrency),
            kit.contracts
              .getErc20(kit.connection.defaultFeeCurrency!)
              .then((erc20) => erc20.balanceOf(from)),
            kit.contracts
              .getStableToken(this._stableCurrency!)
              .then((token) => token.balanceOf(from)),
          ])
          const gasValue = new BigNumber(gas).times(gasPrice as string)
          if (res.flags.gasCurrency) {
            return gasBalance.gte(gasValue) && valueBalance.gte(value)
          }
          return valueBalance.gte(value.plus(gasValue))
        },
        `Cannot afford transfer with ${this._stableCurrency} gasCurrency; try reducing value slightly or using gasCurrency=CELO`
      )
      .runChecks()

    await displaySendTx(res.flags.comment ? 'transferWithComment' : 'transfer', tx, {
      feeCurrency: kit.connection.defaultFeeCurrency,
      // NOTE: passing this makes the tx a modern tx rather than legacy-celo
      maxFeePerGas: gasPrice!,
      maxPriorityFeePerGas: gasPrice!,
    })
  }
}
