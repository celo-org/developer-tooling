import { IdentityMetadataWrapper } from '@celo/contractkit'
import { ux } from '@oclif/core'

import { BaseCommand } from '../../base'
import { CustomArgs } from '../../utils/command'
import { displayMetadata } from '../../utils/identity'

export default class GetMetadata extends BaseCommand {
  static description =
    'Show information about an address. Retreives the metadata URL for an account from the on-chain, then fetches the metadata file off-chain and verifies proofs as able.'

  static flags = {
    ...BaseCommand.flags,
    ...(ux.table.flags() as object),
  }

  static args = {
    arg1: CustomArgs.address('address', { description: 'Address to get metadata for' }),
  }

  static examples = ['get-metadata 0x97f7333c51897469E8D98E7af8653aAb468050a3']

  async run() {
    const kit = await this.getKit()
    const { args, flags } = await this.parse(GetMetadata)
    const address = args.arg1 as string
    const accounts = await kit.contracts.getAccounts()
    const metadataURL = await accounts.getMetadataURL(address)

    if (!metadataURL) {
      console.info('No metadata set for address')
      return
    }

    try {
      const metadata = await IdentityMetadataWrapper.fetchFromURL(
        await kit.contracts.getAccounts(),
        metadataURL
      )
      console.info('Metadata contains the following claims: \n')
      await displayMetadata(metadata, kit, flags)
    } catch (error: any) {
      console.error(`Metadata could not be retrieved from ${metadataURL}: ${error.toString()}`)
    }
  }
}
