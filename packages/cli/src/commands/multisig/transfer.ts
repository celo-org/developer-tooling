import { getCeloERC20Contract } from '@celo/actions/contracts/celo-erc20'
import { getMultiSigContract } from '@celo/actions/contracts/multisig'
import { Flags } from '@oclif/core'
import { Address, encodeFunctionData } from 'viem'
import { BaseCommand } from '../../base'
import { newCheckBuilder } from '../../utils/checks'
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
      dependsOn: ['sender'],
    }),
    sender: CustomFlags.address({
      description: 'Identify sender if performing transferFrom',
      dependsOn: ['transferFrom'],
    }),
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
      flags: { to, sender, amount, transferFrom, from },
    } = await this.parse(MultiSigTransfer)
    const clients = {
      public: await this.getPublicClient(),
      wallet: await this.getWalletClient(),
    }

    const multisigAddress = args.arg1 as Address

    const celoToken = await getCeloERC20Contract(clients)
    const multisig = await getMultiSigContract(clients, multisigAddress)

    await newCheckBuilder(this).isMultiSigOwner(from, multisigAddress).runChecks()

    let transferTx
    if (transferFrom && sender) {
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

    const destination = celoToken.address
    const value = 0n
    const data = transferTx

    const txCount = await multisig.read.getTransactionCount([true, false])
    const txs = await multisig.read.getTransactionIds([BigInt(0), txCount, true, false])
    const existingTx = (
      await Promise.all(
        txs.map(async (tx) => {
          const [txDest, txValue, txData] = await multisig.read.transactions([tx])
          return txDest === destination && txValue === value && txData === data ? tx : null
        })
      )
    ).find((tx) => tx !== null)

    if (existingTx) {
      await displayViemTx(
        `multisig: approving existing transfer`,
        multisig.write.confirmTransaction([existingTx]),
        clients.public
      )
    } else {
      await displayViemTx(
        `multisig: proposing transfer`,
        multisig.write.submitTransaction([celoToken.address, 0n, transferTx]),
        clients.public
      )
    }
  }
}
