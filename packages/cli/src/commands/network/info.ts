import { flags } from '@oclif/command'
import { BaseCommand } from '../../base'
import { printValueMapRecursive } from '../../utils/cli'

export default class Info extends BaseCommand {
  static description = 'View general network information such as the current block number'

  static flags = {
    ...BaseCommand.flags,
    lastN: flags.integer({
      char: 'n',
      description: 'Fetch info about the last n epochs',
      required: false,
      default: 1,
    }),
  }

  async run() {
    const res = this.parse(Info)

    const blockNumber = await this.kit.connection.getBlockNumber()
    const latestEpochNumber = await this.kit.getEpochNumberOfBlock(blockNumber)
    const epochSize = await this.kit.getEpochSize()

    const fetchEpochInfo = async (epochNumber: number) => ({
      number: epochNumber,
      start: await this.kit.getFirstBlockNumberForEpoch(epochNumber),
      end: await this.kit.getLastBlockNumberForEpoch(epochNumber),
    })

    const n = res.flags.lastN
    const epochs = []
    for (let i = latestEpochNumber; i > latestEpochNumber - n; i--) {
      epochs.push(await fetchEpochInfo(i))
    }

    console.log('Adding test comment, to test new CHANGELOG.md configuration looks as expected')
    console.log('Adding another test comment')

    printValueMapRecursive({
      blockNumber,
      epochSize,
      epochs: epochs.length === 1 ? epochs[0] : epochs,
    })
  }
}
