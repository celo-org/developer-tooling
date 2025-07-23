import { getCeloERC20Contract } from '@celo/actions/contracts/celo-erc20'
import { getMultiSigContract } from '@celo/actions/contracts/multisig'
import { Flags } from '@oclif/core'
import { Address, encodeFunctionData } from 'viem'
import { BaseCommand } from '../../base'
import { displayViemTx } from '../../utils/cli'
import { CustomArgs, CustomFlags } from '../../utils/command'

export default class MultiSigTransfer extends BaseCommand {
  static description =
    'Ability to approve CELO transfers to and from multisig. Submit transaction or approve a matching existing transaction'

  static flags = {
    ...BaseCommand.flags,
    to: CustomFlags.address({ required: true, description: 'Recipient of transfer' }),
    amount: CustomFlags.bigint({ required: true, description: 'Amount to transfer, e.g. 10e18' }),
    transferFrom: Flags.boolean({
      description: 'Perform transferFrom instead of transfer in the ERC-20 interface',
    }),
    sender: CustomFlags.address({ description: 'Identify sender if performing transferFrom' }),
    from: CustomFlags.address({
      required: true,
      description: 'Account transferring value to the recipient',
    }),
  }

  static args = {
    arg1: CustomArgs.address('address'),
  }

  static examples = [
    'transfer <multiSigAddr> --to 0x5409ed021d9299bf6814279a6a1411a7e866a631 --amount 200000e18 --from 0x123abc',
    'transfer <multiSigAddr> --transferFrom --sender 0x123abc --to 0x5409ed021d9299bf6814279a6a1411a7e866a631 --amount 200000e18 --from 0x123abc',
  ]

  async run() {
    const {
      args,
      flags: { to, sender, amount, transferFrom },
    } = await this.parse(MultiSigTransfer)
    const wallets = {
      public: await this.getPublicClient(),
      wallet: await this.getWalletClient(),
    }

    const mutlisigAddress = args.arg1 as Address
    const celoToken = await getCeloERC20Contract(wallets)
    const multisig = await getMultiSigContract(wallets, mutlisigAddress)

    let transferTx
    if (transferFrom) {
      if (!sender) this.error("Must submit 'sender' when submitting TransferFrom tx")
      transferTx = encodeFunctionData({
        abi: celoToken.abi,
        functionName: 'transferFrom',
        args: [sender, to, amount],
      })
    } else {
      transferTx = encodeFunctionData({
        abi: celoToken.abi,
        functionName: 'transfer',
        args: [to, amount],
      })
    }

    await displayViemTx(
      `multisig.transfer`,
      multisig.write.submitTransaction([celoToken.address, 0n, transferTx]),
      wallets.public
    )
  }
}
