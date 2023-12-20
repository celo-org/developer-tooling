import { BaseCommand } from '../../base'
import { newCheckBuilder } from '../../utils/checks'
import { printValueMap } from '../../utils/cli'
import { CustomArgs } from '../../utils/command'

export default class ValidatorGroupShow extends BaseCommand {
  static description = 'Show information about an existing Validator Group'

  static flags = {
    ...BaseCommand.flags,
  }

  static args = {
    arg1: CustomArgs.address('groupAddress', { description: "ValidatorGroup's address" }),
  }

  static examples = ['show 0x97f7333c51897469E8D98E7af8653aAb468050a3']

  async run() {
    const kit = await this.getKit()
    const res = await this.parse(ValidatorGroupShow)
    const validators = await kit.contracts.getValidators()
    const groupAddress = res.args.arg1 as string
    await newCheckBuilder(this).isValidatorGroup(groupAddress).runChecks()

    const validatorGroup = await validators.getValidatorGroup(groupAddress)
    printValueMap(validatorGroup)
  }
}
