import { encodeFunctionData } from 'viem'
import { ensureLeading0x } from '@celo/utils/lib/address'
import { Flags } from '@oclif/core'
import fs from 'fs'
import { BaseCommand } from '../../base'
import { displayTx } from '../../utils/cli'
import { CustomFlags } from '../../utils/command'
import { deprecationOptions } from '../../utils/notice'
const DKG = require('./DKG.json')

export default class DKGPublish extends BaseCommand {
  static description = 'Publishes data for each phase of the DKG'

  static hidden = true
  static deprecationOptions = deprecationOptions

  static flags = {
    ...BaseCommand.flags,
    data: Flags.string({ required: true, description: 'Path to the data being published' }),
    address: CustomFlags.address({ required: true, description: 'DKG Contract Address' }),
    from: CustomFlags.address({ required: true, description: 'Address of the sender' }),
  }

  async run() {
    const kit = await this.getKit()
    const res = await this.parse(DKGPublish)
    const dkg = kit.connection.getCeloContract(DKG.abi, res.flags.address)

    const data = fs.readFileSync(res.flags.data).toString('hex')
    const publishData = encodeFunctionData({
      abi: dkg.abi,
      functionName: 'publish',
      args: [ensureLeading0x(data)],
    })
    await displayTx(
      'publishData',
      {
        send: (tx: any) =>
          kit.connection
            .sendTransaction({ ...tx, to: dkg.address, data: publishData })
            .then((r) => r),
      },
      { from: res.flags.from }
    )
  }
}
