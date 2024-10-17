import { Flags } from '@oclif/core'
import { BaseCommand } from '../../base'
import { ViemCommand } from '../../viem'

export default class Info extends ViemCommand {
  static description = 'View general network information such as the current block number'

  static flags = {
    ...BaseCommand.flags,
    lastN: Flags.integer({
      // We cannot use char: 'n' here because it conflicts with the node flag
      description: 'Fetch info about the last n epochs',
      required: false,
      default: 1,
    }),
  }

  async run() {}
}
