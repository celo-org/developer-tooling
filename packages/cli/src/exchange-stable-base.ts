import { consoleLogger } from '@celo/base'
import { CeloContract, StableToken } from '@celo/contractkit'
import { stableTokenInfos } from '@celo/contractkit/lib/celo-tokens'
import BigNumber from 'bignumber.js'
import { BaseCommand } from './base'
import { newCheckBuilder } from './utils/checks'
import { binaryPrompt, displaySendEthersTxViaCK, displaySendTx } from './utils/cli'
import { CustomFlags } from './utils/command'
import { checkNotDangerousExchange } from './utils/exchange'
import { getMentoBroker } from './utils/mento-broker-adaptor'

const depeggedPricePercentage = 20
export default class ExchangeStableBase extends BaseCommand {
  static flags = {
    ...BaseCommand.flags,
    from: CustomFlags.address({
      required: true,
      description: 'The address with the Stable Token to exchange',
    }),
    value: CustomFlags.wei({
      required: true,
      description: 'The value of Stable Tokens to exchange for CELO',
    }),
    forAtLeast: CustomFlags.wei({
      description: 'Optional, the minimum value of CELO to receive in return',
      default: new BigNumber(0),
    }),
  }

  protected _stableCurrency: StableToken | null = null

  async run() {
    const kit = await this.getKit()
    const res = await this.parse()
    const sellAmount = res.flags.value as BigNumber
    const minBuyAmount = res.flags.forAtLeast as BigNumber

    if (!this._stableCurrency) {
      throw new Error('Stable currency not set')
    }
    await newCheckBuilder(this)
      .hasEnoughStable(res.flags.from, sellAmount, this._stableCurrency)
      .runChecks()

    const [stableToken, celoNativeTokenAddress, { mento, brokerAddress }] = await Promise.all([
      kit.contracts.getStableToken(this._stableCurrency),
      kit.registry.addressFor(CeloContract.GoldToken),
      getMentoBroker(kit.connection),
    ])

    console.info(`Prepare to exchange ${stableToken.address} for ${celoNativeTokenAddress}`)

    // note using getAmountIn here to match way rate is shown in the oracles
    async function getQuote(tokenIn: string, tokenOut: string, amount: string) {
      const quoteAmountOut = await mento.getAmountIn(tokenIn, tokenOut, amount)
      const expectedAmountOut = quoteAmountOut.mul(99).div(100)
      return expectedAmountOut
    }

    consoleLogger('Fetching quote')
    const expectedAmountToReceive = await getQuote(
      stableToken.address,
      celoNativeTokenAddress,
      sellAmount.toFixed()
    )

    if (minBuyAmount.toNumber() === 0) {
      const check = await checkNotDangerousExchange(
        kit,
        sellAmount,
        new BigNumber(expectedAmountToReceive.toString()),
        depeggedPricePercentage,
        stableTokenInfos[this._stableCurrency as StableToken]
      )

      if (!check) {
        consoleLogger('Cancelled')
        return
      }
    } else if (expectedAmountToReceive.lt(minBuyAmount.toString())) {
      const check = await binaryPrompt(
        'Warning: the expected amount to receive is less than the minimum amount to receive. Are you sure you want to continue?',
        false
      )
      if (!check) {
        consoleLogger('Cancelled')
        return
      }
    }

    await displaySendTx(
      'increaseAllowance',
      stableToken.increaseAllowance(brokerAddress, sellAmount.toFixed())
    )

    consoleLogger(
      'Swapping',
      sellAmount.toFixed(),
      'for at least',
      expectedAmountToReceive.toString()
    )
    const tx = await mento.swapIn(
      stableToken.address,
      celoNativeTokenAddress,
      sellAmount.toFixed(),
      expectedAmountToReceive
    )
    await displaySendEthersTxViaCK('exchange', tx, kit.connection)
  }
}
