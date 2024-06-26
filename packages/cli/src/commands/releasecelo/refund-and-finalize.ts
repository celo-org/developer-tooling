import { newCheckBuilder } from '../../utils/checks'
import { displaySendTx } from '../../utils/cli'
import { ReleaseGoldBaseCommand } from '../../utils/release-gold-base'

export default class RefundAndFinalize extends ReleaseGoldBaseCommand {
  static description =
    "Refund the given contract's balance to the appropriate parties and destroy the contact. Can only be called by the release owner of revocable ReleaseGold instances."

  static flags = {
    ...ReleaseGoldBaseCommand.flags,
  }

  static args = {}

  static examples = ['refund-and-finalize --contract 0x5409ED021D9299bf6814279A6A1411A7e866A631']

  async run() {
    const kit = await this.getKit()
    const isRevoked = await this.releaseGoldWrapper.isRevoked()
    const remainingLockedBalance = await this.releaseGoldWrapper.getRemainingLockedBalance()

    await newCheckBuilder(this)
      .addCheck('Contract is revoked', () => isRevoked)
      .addCheck('All contract celo is unlocked', () => remainingLockedBalance.eq(0))
      .runChecks()

    kit.defaultAccount = await this.releaseGoldWrapper.getReleaseOwner()
    await displaySendTx('refundAndFinalize', await this.releaseGoldWrapper.refundAndFinalize())
  }
}
