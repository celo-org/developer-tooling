import { getMultiSigContract } from '@celo/actions/contracts/multisig'
import { CeloContract } from '@celo/contractkit'
import { newBlockExplorer } from '@celo/explorer/lib/block-explorer'
import { Flags } from '@oclif/core'
import { Address, zeroAddress } from 'viem'
import { BaseCommand } from '../../base'
import { printValueMapRecursive } from '../../utils/cli'
import { CustomArgs } from '../../utils/command'
import { ViewCommmandFlags } from '../../utils/flags'
import { getConfirmationProgress } from '../../utils/multisig-utils'

export default class ShowMultiSig extends BaseCommand {
  static description = 'Shows information about multi-sig contract'

  static flags = {
    ...ViewCommmandFlags,
    tx: Flags.integer({
      default: undefined,
      description: 'Show info for a transaction',
    }),
    all: Flags.boolean({ default: false, description: 'Show info about all transactions' }),
    raw: Flags.boolean({ default: false, description: 'Do not attempt to parse transactions' }),
  }

  static args = {
    arg1: CustomArgs.address('address'),
  }

  static examples = [
    'show 0x5409ed021d9299bf6814279a6a1411a7e866a631',
    'show 0x5409ed021d9299bf6814279a6a1411a7e866a631 --tx 3',
    'show 0x5409ed021d9299bf6814279a6a1411a7e866a631 --all --raw',
  ]

  async run() {
    const {
      args,
      flags: { tx, all, raw },
    } = await this.parse(ShowMultiSig)
    const multisigAddress = args.arg1 as Address

    const clients = {
      public: await this.getPublicClient(),
    }

    const multisig = await getMultiSigContract(clients, multisigAddress)
    const txCount = await multisig.read.getTransactionCount([true, true])
    const [required, internalRequired] = await Promise.all([
      multisig.read.required(),
      multisig.read.internalRequired(),
    ])
    const explorer = await newBlockExplorer(await this.getKit())
    await explorer.updateContractDetailsMapping(CeloContract.MultiSig, multisigAddress)
    const confirmationStatus = async (txId: bigint, destination: Address, executed: boolean) => {
      if (destination === zeroAddress) {
        // transaction does not exist, there is nothing to confirm
        return {}
      }
      const progress = await getConfirmationProgress(
        multisig.read,
        txId,
        { destination, executed },
        { required, internalRequired },
        multisigAddress
      )
      // prefixed keys: a bare `required` next to the multisig-wide
      // 'Required confirmations' lines would be ambiguous
      return {
        confirmations: progress.confirmations,
        confirmationsRequired: progress.required,
        confirmationsRemaining: progress.remaining,
      }
    }
    const process = async (
      txId: bigint,
      txdata: Awaited<ReturnType<typeof multisig.read.transactions>>
    ) => {
      const [destination, , input, executed] = txdata
      const withConfirmations = {
        ...txdata,
        ...(await confirmationStatus(txId, destination, executed)),
      }
      if (raw) return withConfirmations
      return { ...withConfirmations, data: await explorer.tryParseTxInput(destination, input) }
    }
    const txinfo =
      tx !== undefined
        ? await process(BigInt(tx), await multisig.read.transactions([BigInt(tx)]))
        : all
          ? await Promise.all(
              (await multisig.read.getTransactionIds([BigInt(0), txCount, true, true])).map(
                async (txId) => process(txId, await multisig.read.transactions([txId]))
              )
            )
          : txCount
    const info = {
      Owners: await multisig.read.getOwners(),
      'Required confirmations': required,
      'Required confirmations (internal)': internalRequired,
      Transactions: txinfo,
    }
    printValueMapRecursive(info)
  }
}
