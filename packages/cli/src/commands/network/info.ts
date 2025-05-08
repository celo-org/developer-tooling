import { Flags } from '@oclif/core'
import { PublicClient } from 'viem'
import { BaseCommand } from '../../base'
import { getEpochManagerContract } from '../../packages-to-be/contracts'
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
    const client = (await this.getPublicClient()) as PublicClient
    const res = await this.parse(Info)
    let latestEpochNumber: bigint
    let epochSize: bigint

    const blockNumber = await client.getBlockNumber()

    const epochManagerContract = await getEpochManagerContract(client)

    latestEpochNumber = await epochManagerContract.read.getCurrentEpochNumber()
    epochSize = await epochManagerContract.read.epochDuration()

    const fetchEpochInfo = async (epochNumber: bigint) => {
      const epochData: Record<string, number> = {
        number: Number(epochNumber),
        start: Number(await epochManagerContract.read.getFirstBlockAtEpoch([epochNumber])),
      }

      // for L2 we cannot fetch the end block of the current epoch
      if (epochNumber < latestEpochNumber) {
        epochData.end = Number(await epochManagerContract.read.getLastBlockAtEpoch([epochNumber]))
      }

      return epochData
    }

    const n = BigInt(res.flags.lastN)
    const minEpoch = await epochManagerContract.read.firstKnownEpoch()
    const epochs = []
    for (let i = latestEpochNumber; i > latestEpochNumber - n && i >= minEpoch; i--) {
      epochs.push(await fetchEpochInfo(i))
    }

    printValueMapRecursive({
      blockNumber: Number(blockNumber),
      epochs: epochs.length === 1 ? epochs[0] : epochs,
      epochDuration: Number(epochSize),
    })
  }
}
