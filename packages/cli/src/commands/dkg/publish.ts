import { ensureLeading0x } from '@celo/utils/lib/address'
import { Flags } from '@oclif/core'
import fs from 'fs'
import { BaseCommand } from '../../base'
import { displayWeb3Tx } from '../../utils/cli'
import { CustomFlags } from '../../utils/command'
const DKG = require('./DKG.json')

export default class DKGPublish extends BaseCommand {
  static description = 'Publishes data for each phase of the DKG'

  static flags = {
    ...BaseCommand.flags,
    data: Flags.string({ required: true, description: 'Path to the data being published' }),
    address: CustomFlags.address({ required: true, description: 'DKG Contract Address' }),
    from: CustomFlags.address({ required: true, description: 'Address of the sender' }),
  }

  async run() {
    const kit = await this.getKit()
    const res = await this.parse(DKGPublish)
    const web3 = kit.connection.web3

    const dkg = new web3.eth.Contract(DKG.abi, res.flags.address)

    const data = fs.readFileSync(res.flags.data).toString('hex')
    await displayWeb3Tx('publishData', dkg.methods.publish(ensureLeading0x(data)), {
      from: res.flags.from,
    })
  }
}
