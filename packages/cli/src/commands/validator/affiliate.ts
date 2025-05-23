import { Flags } from '@oclif/core'
import prompts from 'prompts'
import { BaseCommand } from '../../base'
import { newCheckBuilder } from '../../utils/checks'
import { displaySendTx, humanizeRequirements } from '../../utils/cli'
import { CustomArgs, CustomFlags } from '../../utils/command'

export default class ValidatorAffiliate extends BaseCommand {
  static description =
    "Affiliate a Validator with a Validator Group. This allows the Validator Group to add that Validator as a member. If the Validator is already a member of a Validator Group, affiliating with a different Group will remove the Validator from the first group's members."

  static flags = {
    ...BaseCommand.flags,
    from: CustomFlags.address({ required: true, description: "Signer or Validator's address" }),
    yes: Flags.boolean({ description: 'Answer yes to prompt' }),
  }

  static args = {
    arg1: CustomArgs.address('groupAddress', {
      description: "ValidatorGroup's address",
      required: true,
    }),
  }

  static examples = [
    'affiliate --from 0x47e172f6cfb6c7d01c1574fa3e2be7cc73269d95 0x97f7333c51897469e8d98e7af8653aab468050a3',
  ]

  async run() {
    const kit = await this.getKit()
    const res = await this.parse(ValidatorAffiliate)

    const validators = await kit.contracts.getValidators()
    const groupAddress = res.args.arg1 as string
    await newCheckBuilder(this, res.flags.from)
      .isSignerOrAccount()
      .canSignValidatorTxs()
      .signerAccountIsValidator()
      .isValidatorGroup(groupAddress)
      .runChecks()

    const requirements = await validators.getValidatorLockedGoldRequirements()
    const { requiredCelo, requiredDays } = humanizeRequirements(requirements)
    if (!res.flags.yes) {
      const response = await prompts({
        type: 'confirm',
        name: 'confirmation',
        message: `Are you sure you want to affiliate with this group?
Affiliating with a Validator Group could result in Locked Gold requirements of up to ${requiredCelo} CELO for ${requiredDays}. (y/n)`,
      })

      if (!response.confirmation) {
        console.info('Aborting due to user response')
        process.exit(0)
      }
    }
    await displaySendTx('affiliate', validators.affiliate(groupAddress))
  }
}
