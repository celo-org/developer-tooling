import { Flags } from '@oclif/core'
import { BaseCommand } from '../../base'
import { newCheckBuilder } from '../../utils/checks'
import { displaySendTx } from '../../utils/cli'
import { CustomFlags } from '../../utils/command'

export default class Execute extends BaseCommand {
  static description = 'Executes a Granda Mento exchange proposal'

  static flags = {
    ...BaseCommand.flags,
    from: CustomFlags.address({
      required: true,
      description: 'The address to execute the exchange proposal',
    }),
    proposalID: Flags.string({
      required: true,
      description: 'UUID of proposal to view',
    }),
  }

  async run() {
    const kit = await this.getKit()
    const grandaMento = await kit.contracts.getGrandaMento()

    const res = await this.parse(Execute)
    const proposalID = res.flags.proposalID

    await newCheckBuilder(this)
      .grandaMentoProposalExists(proposalID)
      .grandaMentoProposalIsExecutable(proposalID)
      .runChecks()

    await displaySendTx(
      'executeExchangeProposal',
      grandaMento.executeExchangeProposal(proposalID),
      undefined,
      'ExchangeProposalExecuted'
    )
  }
}
