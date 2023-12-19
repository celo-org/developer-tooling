import { Flags } from '@oclif/core'
import { BaseCommand } from '../../base'
import { newCheckBuilder } from '../../utils/checks'
import { printValueMap } from '../../utils/cli'

export default class Show extends BaseCommand {
  static description = 'Shows details of a Granda Mento exchange proposal'

  static flags = {
    ...BaseCommand.flags,
    proposalID: Flags.string({
      required: true,
      description: 'UUID of proposal to view',
    }),
  }

  async run() {
    const kit = await this.getKit()
    const grandaMento = await kit.contracts.getGrandaMento()

    const res = await this.parse(Show)
    const proposalID = res.flags.proposalID

    await newCheckBuilder(this).grandaMentoProposalExists(proposalID).runChecks()

    const proposal = await grandaMento.getHumanReadableExchangeProposal(proposalID)

    printValueMap(proposal)
  }
}
