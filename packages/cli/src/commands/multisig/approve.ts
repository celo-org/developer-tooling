import { getMultiSigContract } from '@celo/actions/contracts/multisig'
import { BaseCommand } from '../../base'
import { newCheckBuilder } from '../../utils/checks'
import { displayViemTx } from '../../utils/cli'
import { CustomFlags } from '../../utils/command'

export default class ApproveMultiSig extends BaseCommand {
  static description = 'Approves an existing transaction on a multi-sig contract'

  static flags = {
    ...BaseCommand.flags,
    from: CustomFlags.address({
      required: true,
      description: 'Account approving the multi-sig transaction',
    }),
    for: CustomFlags.address({
      required: true,
      description: 'Address of the multi-sig contract',
    }),
    tx: CustomFlags.bigint({
      required: true,
      description: 'Transaction to approve (index)',
    }),
  }

  static examples = [
    'approve --from 0x6ecbe1db9ef729cbe972c83fb886247691fb6beb --for 0x5409ed021d9299bf6814279a6a1411a7e866a631 --tx 3',
  ]

  async run() {
    const {
      flags: { from, for: multisigAddress, tx: txIndex },
    } = await this.parse(ApproveMultiSig)

    const wallets = {
      public: await this.getPublicClient(),
      wallet: await this.getWalletClient(),
    }

    const multisig = await getMultiSigContract(wallets, multisigAddress)

    const checkBuilder = newCheckBuilder(this)
      .isMultiSigOwner(from, multisigAddress)
      .addCheck(
        `Checking that ${txIndex} is an existing transaction.`,
        async () => {
          const max = await multisig.read.getTransactionCount([true, true])
          return txIndex < max
        },
        `(Failed: No transaction with index ${txIndex} found)`
      )

    await checkBuilder.runChecks()

    await displayViemTx(
      'multisig: approving transaction',
      multisig.write.confirmTransaction([BigInt(txIndex)]),
      wallets.public
    )
  }
}
