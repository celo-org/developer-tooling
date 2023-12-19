import { Flags } from '@oclif/core'
import { BaseCommand } from '../../base'
import { displaySendTx } from '../../utils/cli'
import { CustomFlags } from '../../utils/command'

export default class Deauthorize extends BaseCommand {
  static description = "Remove an account's authorized attestation signer role."

  static flags = {
    ...BaseCommand.flags,
    from: CustomFlags.address({ required: true }),
    role: Flags.string({
      char: 'r',
      options: ['attestation'],
      description: 'Role to remove',
      required: true,
    }),
    signer: CustomFlags.address({ required: true }),
  }

  static args = []

  static examples = [
    'deauthorize --from 0x5409ED021D9299bf6814279A6A1411A7e866A631 --role attestation --signer 0x6ecbe1db9ef729cbe972c83fb886247691fb6beb',
  ]

  async run() {
    const kit = await this.getKit()
    const res = await this.parse(Deauthorize)

    const accounts = await kit.contracts.getAccounts()

    if (res.flags.role !== 'attestation') {
      this.error(`Invalid role provided`)
      return
    }

    const attestationSigner = await accounts.getAttestationSigner(res.flags.from)

    if (res.flags.signer !== attestationSigner) {
      this.error(
        `Invalid signer argument: ${res.flags.signer}. The current signer for this role is: ${attestationSigner}`
      )
      return
    }

    const tx = await accounts.removeAttestationSigner()

    await displaySendTx('deauthorizeTx', tx)
  }
}
