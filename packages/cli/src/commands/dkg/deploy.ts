import { Flags } from '@oclif/core'
import { BaseCommand } from '../../base'
import { displayWeb3Tx } from '../../utils/cli'
import { CustomFlags } from '../../utils/command'
const DKG = require('./DKG.json')

export default class DKGDeploy extends BaseCommand {
  static description = 'Deploys the DKG smart contract'

  static flags = {
    ...BaseCommand.flags,
    phaseDuration: Flags.integer({
      required: true,
      description: 'Duration of each DKG phase in blocks',
    }),
    threshold: Flags.integer({ required: true, description: 'The threshold to use for the DKG' }),
    from: CustomFlags.address({ required: true, description: 'Address of the sender' }),
  }

  async run() {
    const kit = await this.getKit()
    const res = await this.parse(DKGDeploy)
    const web3 = kit.connection.web3
    const dkg = new web3.eth.Contract(DKG.abi)

    await displayWeb3Tx(
      'deployDKG',
      dkg.deploy({ data: DKG.bytecode, arguments: [res.flags.threshold, res.flags.phaseDuration] }),
      { from: res.flags.from }
    )
  }
}
