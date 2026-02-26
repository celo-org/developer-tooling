import { createViemTxObject } from '@celo/connect'
import { ensureLeading0x } from '@celo/utils/lib/address'
import { Flags } from '@oclif/core'
import fs from 'fs'
import { BaseCommand } from '../../base'
import { displayTx } from '../../utils/cli'
import { CustomFlags } from '../../utils/command'
import { deprecationOptions } from '../../utils/notice'

const DKG = require('./DKG.json')

export default class DKGRegister extends BaseCommand {
  static description = 'Register a public key in the DKG'

  static hidden = true
  static deprecationOptions = deprecationOptions

  static flags = {
    ...BaseCommand.flags,
    blsKey: Flags.string({ required: true, deprecated: true }),
    address: CustomFlags.address({ required: true, description: 'DKG Contract Address' }),
    from: CustomFlags.address({ required: true, description: 'Address of the sender' }),
  }

  async run() {
    const kit = await this.getKit()
    const res = await this.parse(DKGRegister)
    const dkg = kit.connection.getViemContract(DKG.abi, res.flags.address)

    // read the pubkey and publish it
    const blsKey = fs.readFileSync(res.flags.blsKey).toString('hex')
    await displayTx(
      'registerBlsKey',
      createViemTxObject(kit.connection, dkg, 'register', [ensureLeading0x(blsKey)]),
      { from: res.flags.from }
    )
  }
}
