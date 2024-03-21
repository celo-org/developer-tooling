import { createDomainClaim, serializeClaim } from '@celo/contractkit/lib/identity/claims/claim'
import { Flags } from '@oclif/core'
import { ClaimCommand } from '../../utils/identity'
export default class ClaimDomain extends ClaimCommand {
  static description = 'Claim a domain and add the claim to a local metadata file'
  static flags = {
    ...ClaimCommand.flags,
    domain: Flags.string({
      required: true,
      description: 'The domain you want to claim',
    }),
  }
  static args = ClaimCommand.args
  static examples = [
    'claim-domain ~/metadata.json --domain example.com --from 0x47e172F6CfB6c7D01C1574fa3E2Be7CC73269D95',
  ]
  self = ClaimDomain
  async run() {
    const res = await this.parse(ClaimDomain)
    const metadata = await this.readMetadata()
    const signer = await this.getSigner()

    // If the domain claim already exists we return the existing one allowing to generate always the same
    // signature for the same domain name
    const addedClaim = await this.addClaim(metadata, createDomainClaim(res.flags.domain))
    await this.writeMetadata(metadata)

    const signature = await signer.sign(serializeClaim(addedClaim))
    const signatureBase64 = Buffer.from(signature.toString(), 'binary').toString('base64')

    console.info('Please add the following TXT record to your domain:')
    console.info('celo-site-verification=' + signatureBase64 + '\n')
  }
}
