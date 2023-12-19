import { IdentityMetadataWrapper } from '@celo/contractkit'
import { cli } from 'cli-ux'
import { BaseCommand } from '../../base'
import { Args } from '../../utils/command'
import { displayMetadata } from '../../utils/identity'

export default class ShowMetadata extends BaseCommand {
  static description = 'Show the data in a local metadata file'
  static flags = {
    ...BaseCommand.flags,
    ...(cli.table.flags() as object),
  }
  static args = [Args.file('file', { description: 'Path of the metadata file' })]
  static examples = ['show-metadata ~/metadata.json']
  public requireSynced: boolean = false

  async run() {
    const kit = await this.getKit()
    const res = await this.parse(ShowMetadata)
    const metadata = await IdentityMetadataWrapper.fromFile(
      await kit.contracts.getAccounts(),
      res.args.file
    )
    console.info(`Metadata at ${res.args.file} contains the following claims: \n`)
    await displayMetadata(metadata, kit, res.flags)
  }
}
