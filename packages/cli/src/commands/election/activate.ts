import { sleep } from '@celo/utils/lib/async'
import { Flags, ux } from '@oclif/core'

import { signerToAccount } from '@celo/actions/contracts/accounts'
import { activatePendingVotes, getGroupsWithPendingVotes } from '@celo/actions/contracts/election'
import { getEpochManagerContract } from '@celo/actions/contracts/epoch-manager'
import humanizeDuration from 'humanize-duration'
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

  async init() {
    // noop
  }

  async run() {
    const client = await this.getPublicClient()
    const wallet = await this.getWalletClient()
    const clients = { public: client, wallet }
    const res = await this.parse(ElectionActivate)

    const forAccount = res.flags.for ?? res.flags.from
    await newCheckBuilder(this, forAccount).isSignerOrAccount().runChecks()

    const signerAccount = await signerToAccount(client, forAccount)
    const groupsWithPendingVotes = await getGroupsWithPendingVotes(clients, signerAccount)

    if (groupsWithPendingVotes.length > 0) {
      if (res.flags.wait) {
        const epochManager = await getEpochManagerContract(clients)
        const [currentEpochNumber, [_startBlock, _endBlock, startTimestamp], epochDuration] =
          await Promise.all([
            epochManager.read.getCurrentEpochNumber(),
            epochManager.read.getCurrentEpoch(),
            epochManager.read.epochDuration(),
          ])
        ux.action.stop()

        const message =
          'Waiting until pending votes can be activated.' + '\n' + 'Time until next epoch:'

        const endTimestamp = startTimestamp + epochDuration
        // NOTE: `remainingMs`can be negative as the epoch could end any time
        // after it is allowed to end. typically a few seconds later.
        let remainingMs = Math.max(Number(endTimestamp * 1000n) - Date.now(), 0)
        // Spin until pending votes become activatable.
        ux.action.start(`${message}…`)

        const interval = setInterval(() => {
          remainingMs = Math.max(Number(endTimestamp * 1000n) - Date.now(), 0)
          ux.action.status = `~${humanizeDuration(remainingMs)}`
        }, 5_000)

        await sleep(remainingMs)
        // It takes an epoch for pending votes to be activatable
        while (currentEpochNumber === (await epochManager.read.getCurrentEpochNumber())) {
          await sleep(1_000)
        }
        clearInterval(interval)
        ux.action.stop()
      }

      const txHashes = await activatePendingVotes(
        { public: client, wallet },
        await getGroupsWithPendingVotes(clients, signerAccount),
        signerAccount
      )

      for (const txHash of txHashes) {
        await displayViemTx('activate', Promise.resolve(txHash), client)
      }
      if (!res.flags.wait && txHashes.length === 0) {
        this.log(`Pending votes not yet activatable. Consider using the --wait flag.`)
      }
    } else {
      this.log(`No pending votes to activate`)
    }
  }
}
