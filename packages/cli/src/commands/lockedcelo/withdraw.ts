import { BaseCommand } from '../../base'
import { newCheckBuilder } from '../../utils/checks'
import { displayViemTx } from '../../utils/cli'
import { CustomFlags } from '../../utils/command'

export default class Withdraw extends BaseCommand {
  static description =
    'Withdraw any pending withdrawals created via "lockedgold:unlock" that have become available.'

  static flags = {
    ...BaseCommand.flags,
    from: CustomFlags.address({ required: true }),
  }

  static aliases = ['lockedgold:withdraw']

  static examples = ['withdraw --from 0x47e172F6CfB6c7D01C1574fa3E2Be7CC73269D95']

  async run() {
    const kit = await this.getKit()
    const publicClient = await this.getPublicClient()
    const { flags } = await this.parse(Withdraw)
    kit.defaultAccount = flags.from
    const lockedgold = await kit.contracts.getLockedGold()

    await newCheckBuilder(this).isAccount(flags.from).isNotSanctioned(flags.from).runChecks()

    const currentTime = Math.round(new Date().getTime() / 1000)
    let madeWithdrawal = false
    // Withdraw available pending withdrawals one at a time, re-fetching after
    // each because withdrawing index i shifts the on-chain list. Stop once none
    // are available (otherwise this spins forever when nothing is ready).
    while (true) {
      const pendingWithdrawals = await lockedgold.getPendingWithdrawals(flags.from)
      const i = pendingWithdrawals.findIndex((w) => w.time.isLessThan(currentTime))
      if (i === -1) {
        break
      }
      console.log(
        `Found available pending withdrawal of value ${pendingWithdrawals[i].value.toFixed()}, withdrawing`
      )
      await displayViemTx('withdraw', lockedgold.withdraw(i), publicClient)
      madeWithdrawal = true
    }
    if (!madeWithdrawal) {
      console.log('No pending withdrawals are available for withdrawal yet.')
    }
    const remainingPendingWithdrawals = await lockedgold.getPendingWithdrawals(flags.from)
    for (const pendingWithdrawal of remainingPendingWithdrawals) {
      console.log(
        `Pending withdrawal of value ${pendingWithdrawal.value.toFixed()} available for withdrawal in ${pendingWithdrawal.time
          .minus(currentTime)
          .toFixed()} seconds.`
      )
    }
  }
}
