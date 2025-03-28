import { ux } from '@oclif/core'
import { PublicClient } from 'viem'
import { BaseCommand } from '../../base'
import { getEpochManagerContract } from '../../packages-to-be/contracts'

export default class EpochStatus extends BaseCommand {
  static description = 'View epoch info.'

  static flags = {
    node: BaseCommand.flags.node,
    ...(ux.table.flags() as object),
  }

  static aliases: string[] = ['epochs:current']

  static args = {}

  static examples = []

  async run() {
    const res = await this.parse(EpochStatus)

    const client = await this.getPublicClient()
    ux.action.start('Fetching current epoch information')

    const epochManager = await getEpochManagerContract(client as unknown as PublicClient)

    const results = await Promise.allSettled([
      epochManager.read.getCurrentEpoch(),
      epochManager.read.getCurrentEpochNumber(),
      epochManager.read.isEpochProcessingStarted(),
      epochManager.read.isOnEpochProcess(),
      epochManager.read.isIndividualProcessing(),
      epochManager.read.isTimeForNextEpoch(),
    ])
    ux.action.stop('Done\n')

    const [
      currentEpoch,
      currentEpochNumber,
      isEpochProcessingStarted,
      isOnEpochProcess,
      isIndividualProcessing,
      isTimeForNextEpoch,
    ] = results.map((result) => (result.status === 'fulfilled' ? result.value : result.reason))

    const [firstBlock, lastBlock, startTimestamp] = currentEpoch

    ux.table(
      [
        { key: 'Current Epoch Number', value: currentEpochNumber },
        { key: 'First Block of Epoch', value: firstBlock },
        { key: 'Last Block of Epoch', value: lastBlock },
        { key: 'Has Epoch Processing Begun?', value: isEpochProcessingStarted },
        { key: 'Is In Epoch Process?', value: isOnEpochProcess },
        { key: 'Is Processing Individually?', value: isIndividualProcessing },
        { key: 'Is Time for Next Epoch', value: isTimeForNextEpoch },
        {
          key: 'Epoch Start Time',
          value:
            typeof startTimestamp === 'bigint'
              ? new Date(Number(startTimestamp.toString()) * 1000).toISOString()
              : startTimestamp,
        },
      ],
      {
        key: {
          header: 'Query',
        },
        value: {
          header: 'Response',
        },
      },
      res.flags
    )
    return true
  }
}
