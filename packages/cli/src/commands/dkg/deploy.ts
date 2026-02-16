import { Flags } from '@oclif/core'
import { BaseCommand } from '../../base'
import { displayTx } from '../../utils/cli'
import { CustomFlags } from '../../utils/command'
import { deprecationOptions } from '../../utils/notice'
const DKG = require('./DKG.json')

export default class DKGDeploy extends BaseCommand {
  static description = 'Deploys the DKG smart contract'

  static hidden = true

  static deprecationOptions = deprecationOptions

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
    const dkg = kit.connection.createContract(DKG.abi, '0x0000000000000000000000000000000000000000')

    await displayTx(
      'deployDKG',
      dkg.deploy({ data: DKG.bytecode, arguments: [res.flags.threshold, res.flags.phaseDuration] }),
      { from: res.flags.from }
    )
  }
}
