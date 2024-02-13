import { ux } from '@oclif/core'

import { BaseCommand } from '../../base'

export default class List extends BaseCommand {
  static description =
    'Prints the list of validator groups, the number of votes they have received, the number of additional votes they are able to receive, and whether or not they are eligible to elect validators.'

  static flags = {
    ...BaseCommand.flags,
    ...(ux.table.flags() as object),
  }

  static examples = ['list']

  async run() {
    const kit = await this.getKit()
    const res = await this.parse(List)
    ux.action.start('Fetching validator group vote totals')
    const election = await kit.contracts.getElection()
    const groupVotes = await election.getValidatorGroupsVotes()
    ux.action.stop()
    ux.table(
      groupVotes.map((g) => ({ group: g })),
      {
        address: { get: ({ group }) => group.address },
        name: { get: ({ group }) => group.name },
        votes: { get: ({ group }) => group.votes.toFixed() },
        capacity: { get: ({ group }) => group.capacity.toFixed() },
        eligible: { get: ({ group }) => group.eligible },
      },
      res.flags
    )
  }
}
