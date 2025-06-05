import { ux } from '@oclif/core'

import { getRegisteredStakingGroups } from '@celo/actions/staking'
import { fromFixed } from '@celo/utils/lib/fixidity'
import { BaseCommand } from '../../base'
import { bigintToBigNumber, formatFixidity } from '../../packages-to-be/utils'
import { ViewCommmandFlags } from '../../utils/flags'

export default class ValidatorGroupList extends BaseCommand {
  static description =
    'List registered Validator Groups, their names (if provided), commission, and members.'

  static flags = {
    ...ViewCommmandFlags,
    ...(ux.table.flags() as object),
  }

  static examples = ['list']

  async run() {
    const client = await this.getPublicClient()
    const res = await this.parse(ValidatorGroupList)

    ux.action.start('Fetching Validator Groups')
    const vgroups = await getRegisteredStakingGroups(client, { withNames: true, withScores: true })
    ux.action.stop()

    ux.table(
      vgroups.map((vg) => ({ group: vg })),
      {
        address: { get: ({ group }) => group.address },
        name: { get: ({ group }) => group.name },
        commission: {
          get: ({ group }) => fromFixed(bigintToBigNumber(group.commission)).toFixed(),
        },
        members: { get: ({ group }) => group.members.length },
        score: { get: ({ group }) => formatFixidity(group.score!) },
      },
      res.flags
    )
  }
}
