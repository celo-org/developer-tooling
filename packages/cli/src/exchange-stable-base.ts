import { CeloContract, StableToken } from '@celo/contractkit'
import { stableTokenInfos } from '@celo/contractkit/lib/celo-tokens'
import BigNumber from 'bignumber.js'
import { BaseCommand } from './base'
import { newCheckBuilder } from './utils/checks'
import { displaySendEthersTxViaCK, displaySendTx } from './utils/cli'
import { CustomFlags } from './utils/command'
import { checkNotDangerousExchange } from './utils/exchange'
import { getMentoBroker } from './utils/mento-broker-adaptor'

const largeOrderPercentage = 1
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
    const sellAmount = res.flags.value
    const minBuyAmount = res.flags.forAtLeast

    if (!this._stableCurrency) {
      throw new Error('Stable currency not set')
    }
    await newCheckBuilder(this)
      .hasEnoughStable(res.flags.from, sellAmount, this._stableCurrency)
      .runChecks()

    const [stableToken, celoNativeTokenAddress] = await Promise.all([
      kit.contracts.getStableToken(this._stableCurrency),
      kit.registry.addressFor(CeloContract.GoldToken),
    ])

    console.info(`Exchange ${stableToken.address} for ${celoNativeTokenAddress}`)

    // TODO mento temp disable
    if (false) {
      const check = await checkNotDangerousExchange(
        kit,
        sellAmount,
        largeOrderPercentage,
        depeggedPricePercentage,
        false,
        stableTokenInfos[this._stableCurrency as StableToken]
      )

      if (!check) {
        console.log('Cancelled')
        return
      }
    }

    const { mento, brokerAddress, getQuote } = await getMentoBroker(kit.connection)
    console.info('Using mento broker', brokerAddress)

    await displaySendTx(
      'increaseAllowance',
      stableToken.increaseAllowance(brokerAddress, sellAmount.toFixed())
    )

    const expected = await getQuote(
      stableToken.address,
      celoNativeTokenAddress,
      sellAmount.toFixed()
    )

    console.log('Swapping', sellAmount.toFixed(), 'for at least', expected)
    const tx = await mento.swapIn(
      stableToken.address,
      celoNativeTokenAddress,
      sellAmount.toFixed(),
      expected || minBuyAmount // TODO use minBuyAmount if given / not zero
    )
    console.info('original tx', tx)
    // Set explicit gas based on github.com/celo-org/celo-monorepo/issues/2541
    await displaySendEthersTxViaCK('exchange', tx, kit.connection, { gas: '300000' })
  }
}
