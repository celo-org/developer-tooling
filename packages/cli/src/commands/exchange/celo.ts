import { StableToken } from '@celo/contractkit'
import { stableTokenInfos } from '@celo/contractkit/lib/celo-tokens'
import { Flags } from '@oclif/core'
import BigNumber from 'bignumber.js'
import { BaseCommand } from '../../base'
import { newCheckBuilder } from '../../utils/checks'
import { displaySendEthersTxViaCK, displaySendTx } from '../../utils/cli'
import { CustomFlags } from '../../utils/command'
import { checkNotDangerousExchange } from '../../utils/exchange'
import { enumEntriesDupWithLowercase } from '../../utils/helpers'
import { getMentoBroker } from '../../utils/mento-broker-adaptor'

const depeggedPricePercentage = 20

const stableTokenOptions = enumEntriesDupWithLowercase(Object.entries(StableToken))
export default class ExchangeCelo extends BaseCommand {
  static description =
    'Exchange CELO for StableTokens via the stability mechanism. (Note: this is the equivalent of the old exchange:gold)'

  static flags = {
    ...BaseCommand.flags,
    from: CustomFlags.address({ required: true, description: 'The address with CELO to exchange' }),
    value: CustomFlags.wei({
      required: true,
      description: 'The value of CELO to exchange for a StableToken',
    }),
    forAtLeast: CustomFlags.wei({
      description: 'Optional, the minimum value of StableTokens to receive in return',
      default: new BigNumber(0),
    }),
    stableToken: Flags.option({
      options: Object.keys(stableTokenOptions) as (StableToken | Lowercase<StableToken>)[],
      description: 'Name of the stable to receive',
      default: 'cusd',
    })(),
  }

  static args = {}

  static examples = [
    'celo --value 5000000000000 --from 0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d',
    'celo --value 5000000000000 --forAtLeast 100000000000000 --from 0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d --stableToken cStableTokenSymbol',
  ]

  async run() {
    const kit = await this.getKit()
    const res = await this.parse(ExchangeCelo)
    const sellAmount = res.flags.value
    const minBuyAmount = res.flags.forAtLeast
    const stableToken = stableTokenOptions[res.flags.stableToken]

    await newCheckBuilder(this).hasEnoughCelo(res.flags.from, sellAmount).runChecks()

    const [celoToken, stableTokenAddress, { mento, brokerAddress, getQuote }] = await Promise.all([
      kit.contracts.getGoldToken(),
      kit.registry.addressFor(stableTokenInfos[stableToken].contract),
      getMentoBroker(kit.connection),
    ])

    console.info(`Fetching Quote`)
    const expectedAmountToReceive = await getQuote(
      celoToken.address,
      stableTokenAddress,
      sellAmount.toFixed()
    )

    if (minBuyAmount.toNumber() === 0) {
      const check = await checkNotDangerousExchange(
        kit,
        sellAmount,
        new BigNumber(expectedAmountToReceive.toString()),
        depeggedPricePercentage,
        stableTokenInfos[stableToken]
      )

      if (!check) {
        console.log('Cancelled')
        return
      }
    }

    await displaySendTx(
      'increaseAllowance',
      celoToken.increaseAllowance(brokerAddress, sellAmount.toFixed())
    )

    console.log('Swapping', sellAmount.toFixed(), 'for at least', expectedAmountToReceive)
    const tx = await mento.swapIn(
      celoToken.address,
      stableTokenAddress,
      sellAmount.toFixed(),
      expectedAmountToReceive
    )
    await displaySendEthersTxViaCK('exchange', tx, kit.connection)
  }
}
