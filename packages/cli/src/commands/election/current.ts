import { Flags, ux } from '@oclif/core'

import { PublicClient } from 'viem'
import { BaseCommand } from '../../base'
import { getElectedValidators } from '../../packages-to-be/elected'
import { validatorTable } from '../validator/list'

export const otherValidatorTable: ux.Table.table.Columns<{ address: string }> = {
  address: {},
  name: {},
  currentSigner: {},
  signer: {},
  changed: {},
}
export default class ElectionCurrent extends BaseCommand {
  static description =
    'Outputs the set of validators currently elected. An election is run to select the validator set at the end of every epoch.'

  static flags = {
    ...BaseCommand.flags,
    valset: Flags.boolean({
      description:
        'Show currently used signers from valset (by default the authorized validator signers are shown). Useful for checking if keys have been rotated.',
    }),
    ...(ux.table.flags() as object),
  }

  async run() {
    const client = await this.getPublicClient()
    const res = await this.parse(ElectionCurrent)
    ux.action.start('Fetching currently elected Validators')
    const validatorList = await getElectedValidators(client as unknown as PublicClient, {
      showChanges: res.flags.valset,
    })
    ux.action.stop()
    if (res.flags.valset) {
      ux.table(validatorList, otherValidatorTable, res.flags)
    } else {
      ux.table(
        validatorList.map((v) => ({ v })),
        // @ts-ignore
        validatorTable,
        res.flags
      )
    }
  }
}
