import { newCheckBuilder } from '../../utils/checks'
import { displaySendTx } from '../../utils/cli'
import { CustomFlags } from '../../utils/command'
import { ReleaseGoldBaseCommand } from '../../utils/release-gold-base'

export default class TransferDollars extends ReleaseGoldBaseCommand {
  static description =
    'Transfer Celo Dollars from the given contract address. Dollars may be accrued to the ReleaseGold contract via validator epoch rewards.'

  static flags = {
    ...ReleaseGoldBaseCommand.flags,
    to: CustomFlags.address({
      required: true,
      description: 'Address of the recipient of Celo Dollars transfer',
    }),
    value: CustomFlags.wei({
      required: true,
      description: 'Value (in Wei) of Celo Dollars to transfer',
    }),
  }

  static args = {}

  static examples = [
    'transfer-dollars --contract 0x5409ED021D9299bf6814279A6A1411A7e866A631 --to 0x6Ecbe1DB9EF729CBe972C83Fb886247691Fb6beb --value 10000000000000000000000',
  ]

  async run() {
    const kit = await this.getKit()
    const { flags } = await this.parse(TransferDollars)
    const isRevoked = await this.releaseGoldWrapper.isRevoked()
    kit.defaultAccount = isRevoked
      ? await this.releaseGoldWrapper.getReleaseOwner()
      : await this.releaseGoldWrapper.getBeneficiary()
    await newCheckBuilder(this)
      .isNotSanctioned(kit.defaultAccount)
      .isNotSanctioned(flags.to)
      .runChecks()
    await displaySendTx('transfer', this.releaseGoldWrapper.transfer(flags.to, flags.value))
  }
}
