import { StableToken } from '@celo/contractkit'
import { stableTokenInfos } from '@celo/contractkit/lib/celo-tokens'
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
    if (!res.flags.gasCurrency) {
      await kit.setFeeCurrency(stableTokenInfos[this._stableCurrency].contract)
    }

    const tx = res.flags.comment
      ? stableToken.transferWithComment(to, value.toFixed(), res.flags.comment)
      : stableToken.transfer(to, value.toFixed())

    await newCheckBuilder(this)
      .hasEnoughStable(from, value, this._stableCurrency)
      .addConditionalCheck(
        `Account can afford transfer and gas paid in ${this._stableCurrency}`,
        kit.connection.defaultFeeCurrency === stableToken.address,
        async () => {
          const [gas, gasPrice, balance] = await Promise.all([
            tx.txo.estimateGas({ feeCurrency: stableToken.address }),
            kit.connection.gasPrice(stableToken.address),
            stableToken.balanceOf(from),
          ])
          const gasValue = new BigNumber(gas).times(gasPrice as string)
          return balance.gte(value.plus(gasValue))
        },
        `Cannot afford transfer with ${this._stableCurrency} gasCurrency; try reducing value slightly or using gasCurrency=CELO`
      )
      .runChecks()

    await displaySendTx(res.flags.comment ? 'transferWithComment' : 'transfer', tx)
  }
}
