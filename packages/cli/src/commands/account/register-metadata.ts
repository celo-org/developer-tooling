import { IdentityMetadataWrapper } from '@celo/metadata-claims'
import { Flags, ux } from '@oclif/core'

import { BaseCommand } from '../../base'
import { newCheckBuilder } from '../../utils/checks'
import { displaySendTx } from '../../utils/cli'
import { CustomFlags } from '../../utils/command'
import { displayMetadata } from '../../utils/identity'

export default class RegisterMetadata extends BaseCommand {
  static description =
    'Register metadata URL for an account where users will be able to retrieve the metadata file and verify your claims'

  static flags = {
    ...BaseCommand.flags,
    from: CustomFlags.address({
      required: true,
      description: 'Address of the account to set metadata for',
    }),
    url: Flags.url({
      required: true,
      description: 'The url to the metadata you want to register',
    }),
    force: Flags.boolean({ description: 'Ignore metadata validity checks' }),

    ...(ux.table.flags() as object),
  }

  static examples = [
    'register-metadata --url https://www.mywebsite.com/celo-metadata --from 0x47e172F6CfB6c7D01C1574fa3E2Be7CC73269D95',
  ]

  async run() {
    const kit = await this.getKit()
    const res = await this.parse(RegisterMetadata)

    await newCheckBuilder(this).isAccount(res.flags.from).runChecks()

    const metadataURL = res.flags.url
    const accounts = await kit.contracts.getAccounts()

    if (!res.flags.force) {
      try {
        const metadata = await IdentityMetadataWrapper.fetchFromURL(
          accounts,
          metadataURL.toString()
        )
        console.info('Metadata contains the following claims: \n')
        await displayMetadata(metadata, kit, res.flags)
        console.info() // Print a newline.
      } catch (error) {
        console.error(
          `Metadata could not be retrieved from ${metadataURL}: ${(error as Error).toString()}`
        )
        console.info('Exiting without performing changes...')
        process.exit(-1)
      }
    }

    await displaySendTx('registerMetadata', accounts.setMetadataURL(metadataURL.toString()))
  }
}
