import { isCel2 } from '@celo/connect'
import { Flags } from '@oclif/core'
import { BaseCommand } from '../../base'
import { printValueMapRecursive } from '../../utils/cli'

export default class Info extends BaseCommand {
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

  async run() {
    const kit = await this.getKit()
    const res = await this.parse(Info)
    const isL2 = await isCel2(kit.connection.web3)
    let latestEpochNumber: number
    let epochSize: number

    const blockNumber = await kit.connection.getBlockNumber()

    if (isL2) {
      const epochManagerWrapper = await kit.contracts.getEpochManager()

      latestEpochNumber = await epochManagerWrapper.getCurrentEpochNumber()
      epochSize = await epochManagerWrapper.epochDuration()
    } else {
      latestEpochNumber = await kit.getEpochNumberOfBlock(blockNumber)
      epochSize = await kit.getEpochSize()
    }

    const fetchEpochInfo = async (epochNumber: number) => {
      if (isL2) {
        const epochManagerWrapper = await kit.contracts.getEpochManager()

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

      return {
        number: epochNumber,
        start: await kit.getFirstBlockNumberForEpoch(epochNumber),
        end: await kit.getLastBlockNumberForEpoch(epochNumber),
      }
    }

    const n = res.flags.lastN
    const minEpoch = isL2 ? await (await kit.contracts.getEpochManager()).firstKnownEpoch() : 1
    const epochs = []
    for (let i = latestEpochNumber; i > latestEpochNumber - n && i >= minEpoch; i--) {
      epochs.push(await fetchEpochInfo(i))
    }

    printValueMapRecursive({
      blockNumber,
      epochSize,
      epochs: epochs.length === 1 ? epochs[0] : epochs,
    })
  }
}
