import { newCheckBuilder } from '../../utils/checks'
import { displaySendTx } from '../../utils/cli'
import { ReleaseGoldBaseCommand } from '../../utils/release-gold-base'
export default class CreateAccount extends ReleaseGoldBaseCommand {
  static description = 'Creates a new account for the ReleaseGold instance'

  static flags = {
    ...ReleaseGoldBaseCommand.flags,
  }

  static args = {}

  static examples = ['create-account --contract 0x5409ED021D9299bf6814279A6A1411A7e866A631']

  async run() {
    const kit = await this.getKit()
    const isRevoked = await this.releaseGoldWrapper.isRevoked()
    await newCheckBuilder(this)
      .isNotAccount(this.releaseGoldWrapper.address)
      .addCheck('Contract is not revoked', () => !isRevoked)
      .runChecks()

    kit.defaultAccount = await this.releaseGoldWrapper.getBeneficiary()
    await displaySendTx('createAccount', this.releaseGoldWrapper.createAccount())
  }
}
