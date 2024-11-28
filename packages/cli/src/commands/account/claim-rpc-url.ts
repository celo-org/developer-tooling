import { createRpcUrlClaim } from '@celo/metadata-claims/lib/claim'
import { BaseCommand } from '../../base'
import { CustomFlags } from '../../utils/command'
import { ClaimCommand } from '../../utils/identity'

export default class ClaimRpcUrl extends ClaimCommand {
  static description = 'Claim a RPC URL and add the claim to a local metadata file'
  static flags = {
    ...BaseCommand.flags,
    from: CustomFlags.address({
      required: true,
      description:
        'Address of the account to set metadata for. Claiming address must be registered as validator',
    }),
    rpcUrl: CustomFlags.url({
      required: true,
      description: 'The RPC URL to claim',
    }),
  }
  static args = ClaimCommand.args
  static examples = [
    'claim-rpc-url ~/metadata.json --rpc-url example.com --from 0x5409ED021D9299bf6814279A6A1411A7e866A631',
  ]

  self = ClaimRpcUrl

  async run() {
    const res = await this.parse(ClaimRpcUrl)
    const metadata = await this.readMetadata()

    await this.addClaim(metadata, createRpcUrlClaim(res.flags.rpcUrl))

    await this.writeMetadata(metadata)
  }
}
