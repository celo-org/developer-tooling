import { Flags } from '@oclif/core'
import { BaseCommand } from '../../base'
import { newCheckBuilder } from '../../utils/checks'
import { displaySendTx } from '../../utils/cli'
import { CustomFlags } from '../../utils/command'

export default class Cancel extends BaseCommand {
  static description = 'Cancels a Granda Mento exchange proposal'

  static flags = {
    ...BaseCommand.flags,
    from: CustomFlags.address({
      required: true,
      description: 'The address allowed to cancel the proposal',
    }),
    proposalID: Flags.string({
      required: true,
      exclusive: ['account', 'hotfix'],
      description: 'UUID of proposal to view',
    }),
  }

  async run() {
    const kit = await this.getKit()
    const grandaMento = await kit.contracts.getGrandaMento()

    const res = await this.parse(Cancel)
    const proposalID = res.flags.proposalID

    await newCheckBuilder(this).grandaMentoProposalExists(proposalID).runChecks()

    await displaySendTx(
      'cancelExchangeProposal',
      grandaMento.cancelExchangeProposal(proposalID),
      undefined,
      'ExchangeProposalCancelled'
    )
  }
}
