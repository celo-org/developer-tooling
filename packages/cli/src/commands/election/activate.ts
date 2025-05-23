import { sleep } from '@celo/utils/lib/async'
import { Flags, ux } from '@oclif/core'

import { signerToAccount } from '@celo/actions/contracts/accounts'
import {
  activatePendingVotes,
  getActivatableGroups,
  getActivatePendingVotesRequests,
  hasPendingVotes,
} from '@celo/actions/contracts/election'
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
    const groupsWithPendingVotes = await hasPendingVotes(client as PublicClient, signerAccount)
    if (groupsWithPendingVotes.length > 0) {
      let txHashes: Hex[]
      if (res.flags.wait) {
        const requests = await getActivatePendingVotesRequests(
          { public: client as PublicClient, wallet },
          groupsWithPendingVotes,
          forAccount
        )

        // Spin until pending votes become activatable.
        ux.action.start(`Waiting until pending votes can be activated`)
        while (
          (
            await getActivatableGroups(
              { public: client as PublicClient, wallet },
              groupsWithPendingVotes,
              signerAccount
            )
          ).length === 0
        ) {
          await sleep(1000)
        }
        ux.action.stop()

        txHashes = await Promise.all(
          // @ts-expect-error - TODO why this is incorrect?
          requests.map((request) => wallet.writeContract(request))
        )
      } else {
        txHashes = await activatePendingVotes(
          { public: client as PublicClient, wallet },
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
