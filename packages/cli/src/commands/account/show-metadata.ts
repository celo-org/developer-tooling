import { IdentityMetadataWrapper } from '@celo/contractkit'
import { ux } from '@oclif/core'

import { BaseCommand } from '../../base'
import { CustomArgs } from '../../utils/command'
import { displayMetadata } from '../../utils/identity'

export default class ShowMetadata extends BaseCommand {
  static description = 'Show the data in a local metadata file'
  static flags = {
    ...BaseCommand.flags,
    ...(ux.table.flags() as object),
  }
  static args = {
    arg1: CustomArgs.file('file', { description: 'Path of the metadata file' }),
  }
  static examples = ['show-metadata ~/metadata.json']
  public requireSynced: boolean = false

  async run() {
    const kit = await this.getKit()
    const res = await this.parse(ShowMetadata)
    const metadata = await IdentityMetadataWrapper.fromFile(
      await kit.contracts.getAccounts(),
      res.args.arg1 as string
    )
    console.info(`Metadata at ${res.args.arg1} contains the following claims: \n`)
    await displayMetadata(metadata, kit, res.flags)
  }
}
