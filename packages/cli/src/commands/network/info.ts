import { isCel2 } from '@celo/connect'
import { Flags, ux } from '@oclif/core'
import { BaseCommand } from '../../base'
import { printValueMapRecursive } from '../../utils/cli'

export default class Info extends BaseCommand {
  static description = 'View general network information such as the current block number'

  static flags = {
    ...BaseCommand.flags,
    lastN: Flags.integer({
      char: 'n',
      description: 'Fetch info about the last n epochs',
      required: false,
      default: 1,
    }),
  }

  async run() {
    const kit = await this.getKit()
    const res = await this.parse(Info)
    const isL2 = await isCel2(kit.connection.web3)

    const blockNumber = await kit.connection.getBlockNumber()

    if (isL2) {
      ux.info('Celo no longer has epochs')
      printValueMapRecursive({
        blockNumber,
      })
      return
    }

    const latestEpochNumber = await kit.getEpochNumberOfBlock(blockNumber)
    const epochSize = await kit.getEpochSize()

    const fetchEpochInfo = async (epochNumber: number) => ({
      number: epochNumber,
      start: await kit.getFirstBlockNumberForEpoch(epochNumber),
      end: await kit.getLastBlockNumberForEpoch(epochNumber),
    })

    const n = res.flags.lastN
    const epochs = []
    for (let i = latestEpochNumber; i > latestEpochNumber - n; i--) {
      epochs.push(await fetchEpochInfo(i))
    }

    printValueMapRecursive({
      blockNumber,
      epochSize,
      epochs: epochs.length === 1 ? epochs[0] : epochs,
    })
  }
}
