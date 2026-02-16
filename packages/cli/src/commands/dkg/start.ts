import { BaseCommand } from '../../base'
import { displayTx } from '../../utils/cli'
import { CustomFlags } from '../../utils/command'
import { deprecationOptions } from '../../utils/notice'

const DKG = require('./DKG.json')

export default class DKGStart extends BaseCommand {
  static description = 'Starts the Decentralized Key Generation process'

  static hidden = true
  static deprecationOptions = deprecationOptions

  static flags = {
    ...BaseCommand.flags,
    address: CustomFlags.address({ required: true, description: 'DKG Contract Address' }),
    from: CustomFlags.address({ required: true, description: 'Address of the sender' }),
  }

  async run() {
    const kit = await this.getKit()
    const res = await this.parse(DKGStart)
    const dkg = kit.connection.createContract(DKG.abi, res.flags.address)

    await displayTx('start', dkg.methods.start(), { from: res.flags.from })
    this.log('DKG Started!')
  }
}
