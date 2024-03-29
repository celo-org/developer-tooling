import { Flags } from '@oclif/core'
import { BaseCommand } from '../../base'
import { newCheckBuilder } from '../../utils/checks'
import { displaySendTx } from '../../utils/cli'
import { CustomFlags } from '../../utils/command'

export default class SetBitmapsCommand extends BaseCommand {
  static description = 'Set validator signature bitmaps for provided intervals'

  static flags = {
    ...BaseCommand.flags,
    from: CustomFlags.address({
      required: true,
      description: 'From address to sign set bitmap transactions',
    }),
    slashableDowntimeBeforeBlock: Flags.integer({
      description: 'Set all bitmaps for slashable downtime window before provided block',
      exclusive: ['intervals', 'slashableDowntimeBeforeLatest'],
    }),
    slashableDowntimeBeforeLatest: Flags.boolean({
      description: 'Set all bitmaps for slashable downtime window before latest block',
      exclusive: ['intervals', 'slashableDowntimeBeforeBlock'],
    }),
    intervals: CustomFlags.intRangeArray({
      description: 'Array of intervals, ordered by min start to max end',
      exclusive: ['beforeBlock'],
    }),
  }

  static examples = [
    'set-bitmaps --from 0x47e172f6cfb6c7d01c1574fa3e2be7cc73269d95 --slashableDowntimeBeforeBlock 10000',
    'set-bitmaps --from 0x47e172f6cfb6c7d01c1574fa3e2be7cc73269d95 --intervals "[0:100], (100:200]"',
  ]

  async run() {
    const kit = await this.getKit()
    const res = await this.parse(SetBitmapsCommand)

    const downtimeSlasher = await kit.contracts.getDowntimeSlasher()

    const intervals =
      res.flags.slashableDowntimeBeforeLatest || res.flags.slashableDowntimeBeforeBlock
        ? await downtimeSlasher.slashableDowntimeIntervalsBefore(
            res.flags.slashableDowntimeBeforeBlock
          )
        : res.flags.intervals!

    await newCheckBuilder(this)
      .addCheck(
        'bitmaps are not already set for intervals',
        async () => !(await downtimeSlasher.isBitmapSetForIntervals(intervals))
      )
      .runChecks()

    for (const interval of intervals) {
      const tx = downtimeSlasher.setBitmapForInterval(interval)
      await displaySendTx('setBitmap', tx, undefined, 'BitmapSetForInterval')
    }
  }
}
