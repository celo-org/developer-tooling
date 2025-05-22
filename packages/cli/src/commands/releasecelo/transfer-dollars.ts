import { getReleaseCeloContract } from '@celo/actions/contracts/release-celo'
import { newCheckBuilder } from '../../utils/checks'
import { displayViemTx } from '../../utils/cli'
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
    value: CustomFlags.bigint({
      required: true,
      description: 'Value (in Wei) of Celo Dollars to transfer',
    }),
  }

  static args = {}

  static examples = [
    'transfer-dollars --contract 0x5409ED021D9299bf6814279A6A1411A7e866A631 --to 0x6Ecbe1DB9EF729CBe972C83Fb886247691Fb6beb --value 10000000000000000000000',
  ]

  async run() {
    const { flags } = await this.parse(TransferDollars)
    const client = await this.getPublicClient()
    const wallet = await this.getWalletClient()
    const releaseCeloContract = await getReleaseCeloContract({public: client, wallet}, flags.contract)

    const isRevoked = await releaseCeloContract.read.isRevoked()

    const account = isRevoked
      ? await releaseCeloContract.read.releaseOwner()
      : await releaseCeloContract.read.beneficiary()

    await newCheckBuilder(this)
      .isNotSanctioned(account)
      .isNotSanctioned(flags.to)
      .hasEnoughStable(flags.contract, flags.value, 'cUSD')
      .runChecks()

    await displayViemTx(
      'transfer',
      releaseCeloContract.write.transfer([flags.to, flags.value], { account }),
      client
    )
  }
}
