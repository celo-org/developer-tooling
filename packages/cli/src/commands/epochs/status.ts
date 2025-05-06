import { ux } from '@oclif/core'
import { BaseError, PublicClient } from 'viem'
import { BaseCommand } from '../../base'
import { getEpochInfo } from '../../packages-to-be/getEpochInfo'
export default class EpochStatus extends BaseCommand {
  static description = 'View epoch info.'

  static flags = {
    node: BaseCommand.flags.node,
    ...(ux.table.flags() as object),
  } as (typeof BaseCommand)['flags']

  static aliases: string[] = ['epochs:current']

  static args = {}

  static examples = []

  async run() {
    const res = await this.parse(EpochStatus)

    const client = await this.getPublicClient()
    ux.action.start('Fetching current epoch information')
    const [
      currentEpoch,
      currentEpochNumber,
      isEpochProcessingStarted,
      isOnEpochProcess,
      isIndividualProcessing,
      isTimeForNextEpoch,
    ] = await getEpochInfo(client as unknown as PublicClient)
    ux.action.stop('Done\n')

    // if currentEpoch is a tuple, destructure it otherwise it would be an error message
    const [firstBlock, _, startTimestamp] = Array.isArray(currentEpoch)
      ? currentEpoch
      : [
          extractErrorMessage(currentEpoch),
          extractErrorMessage(currentEpoch),
          extractErrorMessage(currentEpoch),
        ]

    ux.table(
      [
        { key: 'Current Epoch Number', value: currentEpochNumber },
        { key: 'First Block of Epoch', value: firstBlock },
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

function extractErrorMessage(error: unknown): string {
  if (error instanceof BaseError) {
    return error.shortMessage
  } else if (error instanceof Error) {
    return error.message
  } else if (typeof error === 'string') {
    return error
  } else {
    return 'Unknown error'
  }
}
