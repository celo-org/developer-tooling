import { sleep } from '@celo/utils/lib/async'
import { Flags, ux } from '@oclif/core'

import { signerToAccount } from '@celo/actions/contracts/accounts'
import {
  activatePendingVotes,
  getActivatablePendingVotes,
  getGroupsWithPendingVotes,
} from '@celo/actions/contracts/election'
import { getEpochManagerContract } from '@celo/actions/contracts/epoch-manager'
import { Hex, PublicClient } from 'viem'
import { BaseCommand } from '../../base'
import { newCheckBuilder } from '../../utils/checks'
import { displayViemTx } from '../../utils/cli'
import { CustomFlags } from '../../utils/command'

export default class ElectionActivate extends BaseCommand {
  static description =
    'Activate pending votes in validator elections to begin earning rewards. To earn rewards as a voter, it is required to activate your pending votes at some point after the end of the epoch in which they were made.'

  static flags = {
    ...BaseCommand.flags,
    from: CustomFlags.address({
      required: true,
      description: "Address sending transaction (and voter's address if --for not specified)",
    }),
    for: CustomFlags.address({
      required: false,
      description: 'Optional: use this to activate votes for another address',
    }),
    wait: Flags.boolean({ description: 'Wait until all pending votes can be activated' }),
  }

  static examples = [
    'activate --from 0x4443d0349e8b3075cba511a0a87796597602a0f1',
    'activate --from 0x4443d0349e8b3075cba511a0a87796597602a0f1 --for 0x5409ed021d9299bf6814279a6a1411a7e866a631',
    'activate --from 0x4443d0349e8b3075cba511a0a87796597602a0f1 --wait',
  ]

  async run() {
    const client = await this.getPublicClient()
    const wallet = await this.getWalletClient()
    const res = await this.parse(ElectionActivate)

    const forAccount = res.flags.for ?? res.flags.from
    await newCheckBuilder(this, forAccount).isSignerOrAccount().runChecks()

    const signerAccount = await signerToAccount(client as PublicClient, forAccount)
    const groupsWithPendingVotes = await getGroupsWithPendingVotes(client, signerAccount)
    if (groupsWithPendingVotes.length > 0) {
      let txHashes: Hex[]
      if (res.flags.wait) {
        const requests = await getActivatablePendingVotes(
          { public: client, wallet },
          groupsWithPendingVotes,
          forAccount
        )

        const epochManager = await getEpochManagerContract(client)
        const [currentEpochNumber, [_startBlock, _endBlock, startTimestamp], epochDuration] =
          await Promise.all([
            epochManager.read.getCurrentEpochNumber(),
            epochManager.read.getCurrentEpoch(),
            epochManager.read.epochDuration(),
          ])

        // @ts-expect-error
        const rawTxs = await Promise.all(requests.map((request) => wallet.signTransaction(request)))

        // Spin until pending votes become activatable.
        ux.action.start(
          `Waiting until pending votes can be activated.\nDO NOT SUBMIT FURTHER TRANSACTIONS FROM THIS WALLET until this command has completed.`
        )
        const endTimestamp = startTimestamp + epochDuration
        const remaining = Number(endTimestamp) - Date.now() / 1000
        await sleep(remaining)
        // It takes an epoch for pending votes to be activatable
        while (currentEpochNumber === (await epochManager.read.getCurrentEpochNumber())) {
          await sleep(1_000)
        }
        ux.action.stop()

        // NOTE: these may fail if the wallet submit txs meanwhile (eg: nonce would change)
        txHashes = await Promise.all(
          rawTxs.map((rawTx) => wallet.sendRawTransaction({ serializedTransaction: rawTx }))
        )
      } else {
        txHashes = await activatePendingVotes(
          { public: client, wallet },
          groupsWithPendingVotes,
          forAccount
        )
      }

      for (const txHash of txHashes) {
        await displayViemTx('activate', Promise.resolve(txHash), client)
      }
      if (txHashes.length === 0) {
        this.log(`Pending votes not yet activatable. Consider using the --wait flag.`)
      }
    } else {
      this.log(`No pending votes to activate`)
    }
  }
}
