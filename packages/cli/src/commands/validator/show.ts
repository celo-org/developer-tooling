import { BaseCommand } from '../../base'
import { newCheckBuilder } from '../../utils/checks'
import { printValueMap } from '../../utils/cli'
import { Args } from '../../utils/command'

export default class ValidatorShow extends BaseCommand {
  static description = 'Show information about a registered Validator.'

  static flags = {
    ...BaseCommand.flags,
  }

  static args = [Args.address('validatorAddress', { description: "Validator's address" })]

  static examples = ['show 0x97f7333c51897469E8D98E7af8653aAb468050a3']

  async run() {
    const kit = await this.getKit()
    const { args } = await this.parse(ValidatorShow)
    const address = args.validatorAddress
    const validators = await kit.contracts.getValidators()

    await newCheckBuilder(this).isValidator(address).runChecks()

    const validator = await validators.getValidator(address)
    printValueMap(validator)
  }
}
