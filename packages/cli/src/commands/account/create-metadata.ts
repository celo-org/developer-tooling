import { IdentityMetadataWrapper } from '@celo/contractkit'
import { writeFileSync } from 'fs'
import { CustomArgs } from '../../utils/command'
import { ClaimCommand } from '../../utils/identity'

export default class CreateMetadata extends ClaimCommand {
  static description =
    'Create an empty identity metadata file. Use this metadata file to store claims attesting to ownership of off-chain resources. Claims can be generated with the account:claim-* commands.'
  static flags = ClaimCommand.flags
  static args = {
    arg1: CustomArgs.newFile('file', { description: 'Path where the metadata should be saved' }),
  }

  static examples = [
    'create-metadata ~/metadata.json --from 0x47e172F6CfB6c7D01C1574fa3E2Be7CC73269D95',
  ]

  async run() {
    const res = await this.parse(CreateMetadata)
    const metadata = IdentityMetadataWrapper.fromEmpty(res.flags.from)
    writeFileSync(res.args.arg1 as string, metadata.toString())
  }
}
