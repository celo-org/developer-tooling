import { eqAddress } from '@celo/utils/lib/address'
import { Flags } from '@oclif/core'
import { cli } from 'cli-ux'
import { BaseCommand } from '../../base'
import { validatorTable } from '../validator/list'

export const otherValidatorTable = {
  address: {},
  name: {},
  currentSigner: {},
  signer: {},
  changed: {},
}
export default class ElectionCurrent extends BaseCommand {
  static description =
    'Outputs the set of validators currently participating in BFT to create blocks. An election is run to select the validator set at the end of every epoch.'

  static flags = {
    ...BaseCommand.flags,
    valset: Flags.boolean({
      description:
        'Show currently used signers from valset (by default the authorized validator signers are shown). Useful for checking if keys have been rotated.',
    }),
    ...(cli.table.flags() as object),
  }

  async run() {
    const kit = await this.getKit()
    const res = await this.parse(ElectionCurrent)
    cli.action.start('Fetching currently elected Validators')
    const election = await kit.contracts.getElection()
    const validators = await kit.contracts.getValidators()
    const signers = await election.getCurrentValidatorSigners()
    if (res.flags.valset) {
      const validatorList = await Promise.all(
        signers.map(async (addr) => {
          const v = await validators.getValidatorFromSigner(addr)
          return { ...v, currentSigner: addr, changed: eqAddress(addr, v.signer) ? '' : 'CHANGING' }
        })
      )
      cli.action.stop()
      cli.table(validatorList, otherValidatorTable, res.flags)
    } else {
      const validatorList = await Promise.all(
        signers.map((addr) => validators.getValidatorFromSigner(addr))
      )
      cli.action.stop()
      cli.table(validatorList, validatorTable, res.flags)
    }
  }
}
