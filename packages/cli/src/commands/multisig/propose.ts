import { getMultiSigContract } from '@celo/actions/contracts/multisig'
import { Address } from 'viem'
import { BaseCommand } from '../../base'
import { newCheckBuilder } from '../../utils/checks'
import { displayViemTx } from '../../utils/cli'
import { CustomArgs, CustomFlags } from '../../utils/command'

export default class ProposeMultiSig extends BaseCommand {
  static description = 'Propose a transaction to a multi-sig contract'

  static flags = {
    ...BaseCommand.flags,
    from: CustomFlags.address({
      required: true,
      description: 'Account proposing the transaction',
    }),
    to: CustomFlags.address({
      required: true,
      description: 'Destination address of the transaction',
    }),
    value: CustomFlags.bigint({
      description: 'Amount of Celo to send (in wei)',
    }),
    data: CustomFlags.hexString({
      default: '0x',
      description: 'Transaction data (hex encoded)',
    }),
  }

  static args = {
    arg1: CustomArgs.address('multisigAddress'),
  }

  static examples = [
    'propose 0x5409ed021d9299bf6814279a6a1411a7e866a631 --to 0x4f2ee3ea --value 200000e18 --from 0x123abc',
    'propose 0x5409ed021d9299bf6814279a6a1411a7e866a631 --to 0x4f2ee3ea --data 0xc0decafe --from 0x123abc',
  ]

  async run() {
    const {
      args,
      flags: { from, to, value, data },
    } = await this.parse(ProposeMultiSig)

    const multisigAddress = args.arg1 as Address
    const wallets = {
      public: await this.getPublicClient(),
      wallet: await this.getWalletClient(),
    }

    // Validate that the sender is an owner of the multisig
    const checkBuilder = newCheckBuilder(this).isMultiSigOwner(from, multisigAddress)
    await checkBuilder.runChecks()

    const multisig = await getMultiSigContract(wallets, multisigAddress)

    await displayViemTx(
      `multisig.submitTransaction`,
      multisig.write.submitTransaction([to, value ?? 0n, data]),
      wallets.public
    )
  }
}
