import { cli } from 'cli-ux'
import { BaseCommand } from '../../base'

export default class ValidatorGroupList extends BaseCommand {
  static description =
    'List registered Validator Groups, their names (if provided), commission, and members.'

  static flags = {
    ...BaseCommand.flags,
    ...(cli.table.flags() as object),
  }

  static examples = ['list']

  async run() {
    const kit = await this.getKit()
    const res = await this.parse(ValidatorGroupList)

    cli.action.start('Fetching Validator Groups')
    const validators = await kit.contracts.getValidators()
    const vgroups = await validators.getRegisteredValidatorGroups()
    cli.action.stop()

    cli.table(
      vgroups,
      {
        address: {},
        name: {},
        commission: { get: (r) => r.commission.toFixed() },
        members: { get: (r) => r.members.length },
      },
      res.flags
    )
  }
}
