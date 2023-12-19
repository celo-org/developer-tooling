import { StableToken } from '@celo/contractkit'
import { Flags } from '@oclif/core'
import { BaseCommand } from '../../base'
import { newCheckBuilder } from '../../utils/checks'
import { displaySendTx } from '../../utils/cli'
import { CustomFlags } from '../../utils/command'
import { enumEntriesDupWithLowercase } from '../../utils/helpers'

const stableTokenOptions = enumEntriesDupWithLowercase(Object.entries(StableToken))

export default class Propose extends BaseCommand {
  static description = 'Proposes a Granda Mento exchange'

  static flags = {
    ...BaseCommand.flags,
    from: CustomFlags.address({
      required: true,
      description: 'The address with tokens to exchange',
    }),
    value: CustomFlags.wei({
      required: true,
      description: 'The value of the tokens to exchange',
    }),
    stableToken: Flags.enum({
      required: true,
      options: Object.keys(stableTokenOptions),
      description: 'Name of the stable to receive or send',
      default: 'cUSD',
    }),
    sellCelo: Flags.enum({
      options: ['true', 'false'],
      required: true,
      description: 'Sell or buy CELO',
    }),
  }

  async run() {
    const kit = await this.getKit()
    const celoToken = await kit.contracts.getGoldToken()
    const grandaMento = await kit.contracts.getGrandaMento()

    const res = await this.parse(Propose)
    const signer = res.flags.from
    const sellAmount = res.flags.value
    const stableToken = stableTokenOptions[res.flags.stableToken]
    const sellCelo = res.flags.sellCelo === 'true'

    kit.defaultAccount = signer

    const tokenToSell = sellCelo ? celoToken : await kit.contracts.getStableToken(stableToken)

    await newCheckBuilder(this, signer)
      .hasEnoughErc20(signer, sellAmount, tokenToSell.address)
      .runChecks()

    await displaySendTx(
      'increaseAllowance',
      tokenToSell.increaseAllowance(grandaMento.address, sellAmount.toFixed())
    )

    await displaySendTx(
      'createExchangeProposal',
      await grandaMento.createExchangeProposal(
        kit.celoTokens.getContract(stableToken),
        sellAmount,
        sellCelo
      ),
      undefined,
      'ExchangeProposalCreated'
    )
  }
}
