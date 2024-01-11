import { BaseCommand } from '../../base'
import { displayWeb3Tx } from '../../utils/cli'
import { CustomFlags } from '../../utils/command'

const DKG = require('./DKG.json')

export default class DKGStart extends BaseCommand {
  static description = 'Starts the DKG'

  static flags = {
    ...BaseCommand.flags,
    address: CustomFlags.address({ required: true, description: 'DKG Contract Address' }),
    from: CustomFlags.address({ required: true, description: 'Address of the sender' }),
  }

  async run() {
    const kit = await this.getKit()
    const res = await this.parse(DKGStart)
    const web3 = kit.connection.web3

    const dkg = new web3.eth.Contract(DKG.abi, res.flags.address)

    await displayWeb3Tx('start', dkg.methods.start(), { from: res.flags.from })
    this.log('DKG Started!')
  }
}
