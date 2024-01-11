import { BasicDataWrapper } from '@celo/identity/lib/offchain-data-wrapper'
import { PrivateNameAccessor, PublicNameAccessor } from '@celo/identity/lib/offchain/accessors/name'
import { Flags } from '@oclif/core'
import { BaseCommand } from '../../base'
import { CustomArgs, CustomFlags } from '../../utils/command'
import { OffchainDataCommand } from '../../utils/off-chain-data'

export default class OffchainRead extends BaseCommand {
  static description = 'DEV: Reads the name from offchain storage'

  static flags = {
    ...OffchainDataCommand.flags,

    // private accessor parameters
    from: CustomFlags.address({ required: false }),
    privateDEK: Flags.string({ required: false }),
  }

  static args = {
    arg1: CustomArgs.address('address'),
  }

  static examples = ['offchain-read 0x...', 'offchain-read 0x... --from 0x... --privateKey 0x...']

  async run() {
    const kit = await this.getKit()
    const {
      args: { arg1: address },
      flags: { from, privateDEK },
    } = await this.parse(OffchainRead)
    // @ts-ignore
    const provider = new BasicDataWrapper(from!, kit)

    if (privateDEK) {
      kit.addAccount(privateDEK)
    }

    const nameApplication = privateDEK
      ? new PrivateNameAccessor(provider)
      : new PublicNameAccessor(provider)
    const data = await nameApplication.read(address as string)
    console.log(data)
  }
}
