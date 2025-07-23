import { getMultiSigContract } from "@celo/actions/contracts/multisig"
import { CeloContract } from "@celo/contractkit"
import { newBlockExplorer } from '@celo/explorer/lib/block-explorer'
import { Flags } from '@oclif/core'
import { Address } from "viem"
import { BaseCommand } from '../../base'
import { printValueMapRecursive } from '../../utils/cli'
import { CustomArgs } from '../../utils/command'
import { ViewCommmandFlags } from '../../utils/flags'

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

    const wallets = {
      public: await this.getPublicClient(),
    }

    const multisig = await getMultiSigContract(wallets, multisigAddress)
    const txs = await multisig.read.getTransactionCount([true, true])
    const explorer = await newBlockExplorer(await this.getKit())
    await explorer.updateContractDetailsMapping(CeloContract.MultiSig, multisigAddress)
    const process = async (txdata: Awaited<ReturnType<typeof multisig.read.transactions>>) => {
      if (raw) return txdata
      return { ...txdata, data: await explorer.tryParseTxInput(txdata[0], txdata[2]) }
    }
    const txinfo =
      tx !== undefined
        ? await process(await multisig.read.transactions([BigInt(tx)]))
        : all
          ? (await Promise.all((await Promise.all((await multisig.read.getTransactionIds([BigInt(0), txs, true, true])).map(tx => multisig.read.transactions([tx])))).map(process)))
          : txs
    const info = {
      Owners: await multisig.read.getOwners(),
      'Required confirmations': await multisig.read.required(),
      'Required confirmations (internal)': await multisig.read.internalRequired(),
      Transactions: txinfo,
    }
    printValueMapRecursive(info)
  }
}
