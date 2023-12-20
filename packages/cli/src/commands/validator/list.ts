import { Validator } from '@celo/contractkit/lib/wrappers/Validators'
import { ux } from '@oclif/core'

import { BaseCommand } from '../../base'

export const validatorTable: ux.Table.table.Columns<Record<'v', Validator>> = {
  address: { get: (row) => row.v.address },
  name: { get: (row) => row.v.name },
  affiliation: { get: (row) => row.v.affiliation },
  score: { get: (row) => row.v.score.toFixed() },
  ecdsaPublicKey: { get: (row) => row.v.ecdsaPublicKey },
  blsPublicKey: { get: (row) => row.v.blsPublicKey },
  signer: { get: (row) => row.v.signer },
}

export default class ValidatorList extends BaseCommand {
  static description =
    'List registered Validators, their name (if provided), affiliation, uptime score, and public keys used for validating.'

  static flags = {
    ...BaseCommand.flags,
    ...(ux.table.flags() as object),
  }

  static examples = ['list']

  async run() {
    const kit = await this.getKit()
    const res = await this.parse(ValidatorList)

    ux.action.start('Fetching Validators')
    const validators = await kit.contracts.getValidators()
    const validatorList = await validators.getRegisteredValidators()

    ux.action.stop()
    ux.table(
      validatorList.map((v) => ({ ['v']: v })),
      validatorTable,
      res.flags
    )
  }
}
