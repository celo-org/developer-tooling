import { ContractKit } from '@celo/contractkit/lib'
import { ux } from '@oclif/core'

import { BaseCommand } from '../../base'
import { validatorTable } from '../validator/list'

async function performElections(kit: ContractKit) {
  const election = await kit.contracts.getElection()
  try {
    const signers = await election.electValidatorSigners()
    return signers
  } catch (err) {
    console.warn('Warning: error running actual elections, retrying with minimum validators at 0')
    return election.electValidatorSigners(0)
  }
}

export default class ElectionRun extends BaseCommand {
  static description =
    'Runs a "mock" election and prints out the validators that would be elected if the epoch ended right now.'

  static flags = {
    ...BaseCommand.flags,
    ...(ux.table.flags() as object),
  }

  async run() {
    const kit = await this.getKit()
    const res = await this.parse(ElectionRun)
    ux.action.start('Running mock election')
    const validators = await kit.contracts.getValidators()

    const signers = await performElections(kit)

    const validatorList = await Promise.all(
      signers.map((addr) => validators.getValidatorFromSigner(addr))
    )
    ux.action.stop()

    ux.table(
      validatorList.map((v) => ({ ['v']: v })),
      validatorTable,
      res.flags
    )
  }
}
