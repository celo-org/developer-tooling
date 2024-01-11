import { Flags } from '@oclif/core'
import prompts from 'prompts'
import { BaseCommand } from '../../base'
import { newCheckBuilder } from '../../utils/checks'
import { displaySendTx } from '../../utils/cli'
import { CustomArgs, CustomFlags } from '../../utils/command'

export default class ValidatorGroupMembers extends BaseCommand {
  static description = 'Add or remove members from a Validator Group'

  static flags = {
    ...BaseCommand.flags,
    from: CustomFlags.address({ required: true, description: "ValidatorGroup's address" }),
    yes: Flags.boolean({ description: 'Answer yes to prompt' }),
    accept: Flags.boolean({
      exclusive: ['remove', 'reorder'],
      description: 'Accept a validator whose affiliation is already set to the group',
    }),
    remove: Flags.boolean({
      exclusive: ['accept', 'reorder'],
      description: 'Remove a validator from the members list',
    }),
    reorder: Flags.integer({
      exclusive: ['accept', 'remove'],
      description: 'Reorder a validator within the members list. Indices are 0 based',
    }),
  }

  static args = {
    arg1: CustomArgs.address('validatorAddress', { description: "Validator's address" }),
  }

  static examples = [
    'member --from 0x47e172f6cfb6c7d01c1574fa3e2be7cc73269d95 --accept 0x97f7333c51897469e8d98e7af8653aab468050a3',
    'member --from 0x47e172f6cfb6c7d01c1574fa3e2be7cc73269d95 --remove 0x97f7333c51897469e8d98e7af8653aab468050a3',
    'member --from 0x47e172f6cfb6c7d01c1574fa3e2be7cc73269d95 --reorder 3 0x47e172f6cfb6c7d01c1574fa3e2be7cc73269d95',
  ]

  async run() {
    const kit = await this.getKit()
    const res = await this.parse(ValidatorGroupMembers)
    const validatorAddress = res.args.arg1 as string
    if (!(res.flags.accept || res.flags.remove || typeof res.flags.reorder === 'number')) {
      this.error(`Specify action: --accept, --remove or --reorder`)
      return
    }

    const validators = await kit.contracts.getValidators()

    await newCheckBuilder(this, res.flags.from)
      .isSignerOrAccount()
      .canSignValidatorTxs()
      .signerAccountIsValidatorGroup()
      .isValidator(validatorAddress)
      .runChecks()

    const validatorGroup = await validators.signerToAccount(res.flags.from)
    if (res.flags.accept) {
      if (!res.flags.yes) {
        const response = await prompts({
          type: 'confirm',
          name: 'confirmation',
          message:
            'Are you sure you want to accept this member?\nValidator Group Locked Gold requirements increase per member. Adding an additional member could result in an increase in Locked Gold requirements of up to 10,000 CELO for 180 days. (y/n)',
        })

        if (!response.confirmation) {
          console.info('Aborting due to user response')
          process.exit(0)
        }
      }
      const tx = await validators.addMember(validatorGroup, validatorAddress)
      await displaySendTx('addMember', tx)
    } else if (res.flags.remove) {
      await displaySendTx('removeMember', validators.removeMember(validatorAddress))
    } else if (res.flags.reorder != null) {
      await displaySendTx(
        'reorderMember',
        await validators.reorderMember(validatorGroup, validatorAddress, res.flags.reorder)
      )
    }
  }
}
