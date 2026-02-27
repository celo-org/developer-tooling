import { Flags, ux } from '@oclif/core'
import { encodeDeployData } from 'viem'
import { BaseCommand } from '../../base'
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
    const data = encodeDeployData({
      abi: DKG.abi,
      bytecode: DKG.bytecode,
      args: [res.flags.threshold, res.flags.phaseDuration],
    })

    ux.action.start('Sending Transaction: deployDKG')
    const txResult = await kit.connection.sendTransaction({
      from: res.flags.from,
      data,
    })
    const receipt = await txResult.waitReceipt()
    console.log(receipt)
    ux.action.stop()
  }
}
