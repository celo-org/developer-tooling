import { ensureLeading0x } from '@celo/utils/lib/address'
import { Flags } from '@oclif/core'
import { BaseCommand } from '../../base'
import { displayWeb3Tx } from '../../utils/cli'
import { CustomFlags } from '../../utils/command'
import DKG from './DKG.json'

export default class DKGRegister extends BaseCommand {
  static description = 'Allowlist an address in the DKG'

  static flags = {
    ...BaseCommand.flags,
    participantAddress: Flags.string({
      required: true,
      description: 'Address of the participant to allowlist',
    }),
    address: CustomFlags.address({ required: true, description: 'DKG Contract Address' }),
    from: CustomFlags.address({ required: true, description: 'Address of the sender' }),
  }

  async run() {
    const kit = await this.getKit()
    const res = await this.parse(DKGRegister)
    const web3 = kit.connection.web3

    const dkg = new web3.eth.Contract(DKG.abi as any, res.flags.address)

    const participantAddress = res.flags.participantAddress
    await displayWeb3Tx('allowlist', dkg.methods.allowlist(ensureLeading0x(participantAddress)), {
      from: res.flags.from,
    })
  }
}
