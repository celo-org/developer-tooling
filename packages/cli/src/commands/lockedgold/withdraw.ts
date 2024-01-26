import { BaseCommand } from '../../base'
import { newCheckBuilder } from '../../utils/checks'
import { displaySendTx } from '../../utils/cli'
import { CustomFlags } from '../../utils/command'

export default class Withdraw extends BaseCommand {
  static description =
    'Withdraw any pending withdrawals created via "lockedgold:unlock" that have become available.'

  static flags = {
    ...BaseCommand.flags,
    from: CustomFlags.address({ required: true }),
  }

  static examples = ['withdraw --from 0x47e172F6CfB6c7D01C1574fa3E2Be7CC73269D95']

  async run() {
    const kit = await this.getKit()
    const { flags } = await this.parse(Withdraw)
    kit.defaultAccount = flags.from
    const lockedgold = await kit.contracts.getLockedGold()

    await newCheckBuilder(this).isAccount(flags.from).runChecks()

    const currentTime = Math.round(new Date().getTime() / 1000)
    let madeWithdrawal = false
    while (!madeWithdrawal) {
      const pendingWithdrawals = await lockedgold.getPendingWithdrawals(flags.from)
      for (let i = 0; i < pendingWithdrawals.length; i++) {
        const pendingWithdrawal = pendingWithdrawals[i]
        if (pendingWithdrawal.time.isLessThan(currentTime)) {
          console.log(
            `Found available pending withdrawal of value ${pendingWithdrawal.value.toFixed()}, withdrawing`
          )
          await displaySendTx('withdraw', lockedgold.withdraw(i))
          madeWithdrawal = true
        }
      }
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
