import { Flags } from '@oclif/core'
import { BaseCommand } from '../../base'
import { printValueMapRecursive } from '../../utils/cli'
import { ViewCommmandFlags } from '../../utils/flags'

export default class Info extends BaseCommand {
  static description = 'View general network information such as the current block number'

  static flags = {
    ...ViewCommmandFlags,
    lastN: Flags.integer({
      // We cannot use char: 'n' here because it conflicts with the node flag
      description: 'Fetch info about the last n epochs',
      required: false,
      default: 1,
    }),
  }

  async run() {
    const kit = await this.getKit()
    const res = await this.parse(Info)
    let latestEpochNumber: number
    let epochSize: number

    const blockNumber = await kit.connection.getBlockNumber()

    const epochManagerWrapper = await kit.contracts.getEpochManager()

    latestEpochNumber = await epochManagerWrapper.getCurrentEpochNumber()
    epochSize = await epochManagerWrapper.epochDuration()

    const fetchEpochInfo = async (epochNumber: number) => {
      const epochData: Record<string, number> = {
        number: epochNumber,
        start: await epochManagerWrapper.getFirstBlockAtEpoch(epochNumber),
      }

      // for L2 we cannot fetch the end block of the current epoch
      if (epochNumber < latestEpochNumber) {
        epochData.end = await epochManagerWrapper.getLastBlockAtEpoch(epochNumber)
      }

      return epochData
    }

    const n = res.flags.lastN
    const minEpoch = await epochManagerWrapper.firstKnownEpoch()
    const epochs = []
    for (let i = latestEpochNumber; i > latestEpochNumber - n && i >= minEpoch; i--) {
      epochs.push(await fetchEpochInfo(i))
    }

    printValueMapRecursive({
      blockNumber,
      epochs: epochs.length === 1 ? epochs[0] : epochs,
      epochDuration: epochSize,
    })
  }
}
