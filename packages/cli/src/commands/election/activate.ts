import { resolveAddress } from '@celo/actions'
import { signerToAccount } from '@celo/actions/contracts/accounts'
import { activatePendingVotes, getGroupsWithPendingVotes } from '@celo/actions/contracts/election'
import { getEpochManagerContract } from '@celo/actions/contracts/epoch-manager'
import { multiplyBigIntByPercent } from '@celo/base'
import { sleep } from '@celo/utils/lib/async'
import { Flags, ux } from '@oclif/core'
import humanizeDuration from 'humanize-duration'
import { Hex, nonceManager } from 'viem'
import { CeloTransactionSerialized } from 'viem/celo'
import { BaseCommand } from '../../base'
import { getAllPendingVotesCallData } from '../../packages-to-be/election'
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

  // async init() {

  // }

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
      let txHashes: Hex[]
      if (res.flags.wait) {
        const contractCalls = await getAllPendingVotesCallData(
          { public: client, wallet },
          groupsWithPendingVotes,
          signerAccount
        )

        const epochManager = await getEpochManagerContract(clients)
        const [currentEpochNumber, [_startBlock, _endBlock, startTimestamp], epochDuration] =
          await Promise.all([
            epochManager.read.getCurrentEpochNumber(),
            epochManager.read.getCurrentEpoch(),
            epochManager.read.epochDuration(),
          ])

        const rawTxs: CeloTransactionSerialized[] = []

        const [electionAddress, { maxFeePerGas, maxPriorityFeePerGas }] = await Promise.all([
          resolveAddress(clients.public, 'Election'),
          client.estimateFeesPerGas(),
        ])

        ux.action.start(
          'Signing transactions…' + res.flags.useLedger ? ' Make sure to unlock your Ledger' : ''
        )

        for (const contractCall of contractCalls) {
          ux.action.status = `Signing transactions… ${rawTxs.length + 1} / ${contractCalls.length}`
          if (wallet.account === undefined) {
            throw new Error(
              'Wallet account is not defined. Please ensure you are connected to a wallet.'
            )
          }

          const nonce = await nonceManager.consume({
            chainId: client.chain.id,
            client,
            address: res.flags.from,
          })

          const result = await wallet.signTransaction!({
            data: contractCall,
            gas: 190_000n, // cant estimate gas since the votes are pending this should be enough
            type: 'eip1559',
            to: electionAddress,
            account: wallet.account,
            maxFeePerGas: multiplyBigIntByPercent(maxFeePerGas, 110),
            maxPriorityFeePerGas: multiplyBigIntByPercent(maxPriorityFeePerGas, 110),
            nonce,
          })
          rawTxs.push(result)
        }
        ux.action.stop()

        const message =
          'Waiting until pending votes can be activated.' +
          '\n' +
          'DO NOT SUBMIT FURTHER TRANSACTIONS FROM THIS WALLET until this command has completed.' +
          '\n' +
          'Time until next epoch:'

        const endTimestamp = startTimestamp + epochDuration
        // `remainingMs`can be negative as the epoch could end any time after it is allowed to end. typically a few seconds later.
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

        // NOTE: these may fail if the wallet submit txs meanwhile (eg: nonce would be too low)
        txHashes = []
        for (const rawTx of rawTxs) {
          await displayViemTx(
            `activate ${rawTxs.indexOf(rawTx) + 1}/${rawTxs.length}`,
            wallet.sendRawTransaction({ serializedTransaction: rawTx }),
            client
          )
        }
      } else {
        txHashes = await activatePendingVotes(
          { public: client, wallet },
          groupsWithPendingVotes,
          signerAccount
        )
        if (txHashes.length === 0) {
          this.log(`Pending votes not yet activatable. Consider using the --wait flag.`)
        }
        for (const txHash of txHashes) {
          await displayViemTx(
            `activate ${txHashes.indexOf(txHash) + 1}/${txHashes.length}`,
            Promise.resolve(txHash),
            client
          )
        }
      }
    } else {
      this.log(`No pending votes to activate`)
    }
  }
}
