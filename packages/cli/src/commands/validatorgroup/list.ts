import { ux } from '@oclif/core'

import { BaseCommand } from '../../base'

export default class ValidatorGroupList extends BaseCommand {
  static description =
    'List registered Validator Groups, their names (if provided), commission, and members.'

  static flags = {
    ...BaseCommand.flags,
    ...(ux.table.flags() as object),
  }

  static examples = ['list']

  async run() {
    const kit = await this.getKit()
    const res = await this.parse(ValidatorGroupList)

    ux.action.start('Fetching Validator Groups')
    const validators = await kit.contracts.getValidators()
    const vgroups = await validators.getRegisteredValidatorGroups()
    ux.action.stop()

    ux.table(
      vgroups.map((vg) => ({ group: vg })),
      {
        address: {},
        name: {},
        commission: { get: (r) => r.group.commission.toFixed() },
        members: { get: (r) => r.group.members.length },
      },
      res.flags
    )
  }
}
