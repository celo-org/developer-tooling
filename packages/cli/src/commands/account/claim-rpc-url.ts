import { createRpcUrlClaim } from '@celo/metadata-claims/lib/claim'
import { Flags } from '@oclif/core'
import { ClaimCommand } from '../../utils/identity'

export default class ClaimRpcUrl extends ClaimCommand {
  static description = 'Claim a RPC URL and add the claim to a local metadata file'
  static flags = {
    ...ClaimCommand.flags,
    rpcUrl: Flags.string({
      required: true,
      description: 'The RPC URL you want to claim',
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
