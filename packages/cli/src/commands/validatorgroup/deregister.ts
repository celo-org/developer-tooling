import { BaseCommand } from '../../base'
import { newCheckBuilder } from '../../utils/checks'
import { displaySendTx } from '../../utils/cli'
import { CustomFlags } from '../../utils/command'

export default class ValidatorGroupDeRegister extends BaseCommand {
  static description =
    'Deregister a Validator Group. After the group lock perioid has passed it will be possible to deregister it start unlocking the CELO. If you wish to deregister your validator group, you must first remove all members, then wait the required time before running this command.'

  static flags = {
    ...BaseCommand.flags,
    from: CustomFlags.address({
      required: true,
      description: "Signer or ValidatorGroup's address",
    }),
  }

  static examples = ['deregister --from 0x47e172f6cfb6c7d01c1574fa3e2be7cc73269d95']

  async run() {
    const kit = await this.getKit()
    const res = await this.parse(ValidatorGroupDeRegister)

    const validators = await kit.contracts.getValidators()

    const account = await validators.signerToAccount(res.flags.from)

    await newCheckBuilder(this, res.flags.from)
      .isSignerOrAccount()
      .canSignValidatorTxs()
      .signerAccountIsValidatorGroup()
      .validatorGroupDeregisterDurationPassed()
      .then((checks) => checks.runChecks())

    await displaySendTx('deregister', await validators.deregisterValidatorGroup(account))
  }
}
