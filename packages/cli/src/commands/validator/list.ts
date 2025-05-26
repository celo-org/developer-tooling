import { Validator } from '@celo/contractkit/lib/wrappers/Validators'
import { ux } from '@oclif/core'

import { BaseCommand } from '../../base'
import { getRegisteredValidators } from '../../packages-to-be/validators'
import { ViewCommmandFlags } from '../../utils/flags'

export const validatorTable: ux.Table.table.Columns<Record<'v', Validator>> = {
  address: { get: (row) => row.v.address },
  name: { get: (row) => row.v.name },
  affiliation: { get: (row) => row.v.affiliation },
  score: { get: (row) => row.v.score.toFixed() },
  ecdsaPublicKey: { get: (row) => row.v.ecdsaPublicKey },
  signer: { get: (row) => row.v.signer },
}

export default class ValidatorList extends BaseCommand {
  static description =
    'List registered Community Rpc Nodes (Formerly Validators), their name (if provided), affiliation, uptime score, and public keys. For rpc urls use "network:rpc-urls"'

  static flags = {
    ...ViewCommmandFlags,
    ...(ux.table.flags() as object),
  }

  static examples = ['list']

  async run() {
    const client = await this.getPublicClient()
    const res = await this.parse(ValidatorList)

    ux.action.start('Fetching Registered Community Rpc Nodes')

    const validatorList = await getRegisteredValidators(client)

    ux.action.stop()
    ux.table(
      validatorList.map((v) => ({ ['v']: v })),
      validatorTable,
      res.flags
    )
  }
}
