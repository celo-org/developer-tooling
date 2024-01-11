import { ensureLeading0x } from '@celo/utils/lib/address'
import { Flags } from '@oclif/core'
import fs from 'fs'
import { BaseCommand } from '../../base'
import { displayWeb3Tx } from '../../utils/cli'
import { CustomFlags } from '../../utils/command'

const DKG = require('./DKG.json')

export default class DKGRegister extends BaseCommand {
  static description = 'Register a public key in the DKG'

  static flags = {
    ...BaseCommand.flags,
    blsKey: Flags.string({ required: true }),
    address: CustomFlags.address({ required: true, description: 'DKG Contract Address' }),
    from: CustomFlags.address({ required: true, description: 'Address of the sender' }),
  }

  async run() {
    const kit = await this.getKit()
    const res = await this.parse(DKGRegister)
    const web3 = kit.connection.web3

    const dkg = new web3.eth.Contract(DKG.abi, res.flags.address)

    // read the pubkey and publish it
    const blsKey = fs.readFileSync(res.flags.blsKey).toString('hex')
    await displayWeb3Tx('registerBlsKey', dkg.methods.register(ensureLeading0x(blsKey)), {
      from: res.flags.from,
    })
  }
}
