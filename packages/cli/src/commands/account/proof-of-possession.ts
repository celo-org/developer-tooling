import { generateProofOfKeyPossession } from '@celo/actions'
import { serializeSignature } from '@celo/core'
import { BaseCommand } from '../../base'
import { printValueMap } from '../../utils/cli'
import { CustomFlags } from '../../utils/command'
export default class ProofOfPossession extends BaseCommand {
  static description =
    'Generate proof-of-possession to be used to authorize a signer. See the "account:authorize" command for more details.'

  static flags = {
    ...BaseCommand.flags,
    signer: CustomFlags.address({
      required: true,
      description: 'Address of the signer key to prove possession of.',
    }),
    account: CustomFlags.address({
      required: true,
      description: 'Address of the account that needs to prove possession of the signer key.',
    }),
  }

  static examples = [
    'proof-of-possession --account 0x5409ed021d9299bf6814279a6a1411a7e866a631 --signer 0x6ecbe1db9ef729cbe972c83fb886247691fb6beb',
  ]

  async run() {
    const res = await this.parse(ProofOfPossession)
    const walletClient = await this.getWalletClient()

    const pop = await generateProofOfKeyPossession(
      walletClient,
      res.flags.account,
      res.flags.signer
    )

    printValueMap({ signature: serializeSignature(pop) })
  }
}
