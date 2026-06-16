import { governanceABI, multiSigABI } from '@celo/abis'
import { proposalToParams } from '@celo/contractkit/lib/wrappers/Governance'
import { ProposalBuilder, ProposalTransactionJSON, proposalToJSON } from '@celo/governance'
import { Flags } from '@oclif/core'
import { BigNumber } from 'bignumber.js'
import { readFileSync } from 'fs'
import { BaseCommand } from '../../base'
import { withAnvilFork } from '../../utils/anvil-fork'
import { newCheckBuilder } from '../../utils/checks'
import { displayViemTx, printValueMapRecursive } from '../../utils/cli'
import { CustomFlags } from '../../utils/command'
import { MultiSigFlags, SafeFlags } from '../../utils/flags'
import {
  addExistingProposalIDToBuilder,
  addExistingProposalJSONFileToBuilder,
  checkProposal,
  simulateProposalOnRpc,
} from '../../utils/governance'
import { createSafe, performSafeTransaction, safeTransactionMetadata } from '../../utils/safe'
export default class Propose extends BaseCommand {
  static description = 'Submit a governance proposal'

  static flags = {
    ...BaseCommand.flags,
    ...MultiSigFlags,
    ...SafeFlags,
    jsonTransactions: Flags.string({
      required: true,
      description: 'Path to json transactions',
    }),
    deposit: Flags.string({
      required: true,
      description: 'Amount of Celo to attach to proposal',
    }),
    from: CustomFlags.address({ required: true, description: "Proposer's address" }),
    force: Flags.boolean({
      description: 'Skip execution check',
      default: false,
      exclusive: ['simulate'],
    }),
    simulate: Flags.string({
      required: false,
      description:
        'RPC URL of a forked node (e.g. anvil) to simulate the proposal against. Each proposal transaction is actually sent (not eth_call) from the Governance contract address, which the node must have unlocked (e.g. anvil --auto-impersonate). Overrides the default bundled-anvil fork simulation. Useful for proposals where the success of one tx depends on a previous one succeeding.',
      exclusive: ['force', 'noSimulate'],
    }),
    noSimulate: Flags.boolean({
      description:
        'Disable the default local fork simulation and fall back to independent per-transaction eth_call checks (which cannot see the effect of earlier transactions in the proposal).',
      default: false,
      exclusive: ['force', 'simulate'],
    }),
    noInfo: Flags.boolean({ description: 'Skip printing the proposal info', default: false }),
    descriptionURL: CustomFlags.proposalDescriptionURL({
      required: true,
    }),
    afterExecutingProposal: Flags.string({
      required: false,
      description: 'Path to proposal which will be executed prior to proposal',
      exclusive: ['afterExecutingID'],
    }),
    afterExecutingID: Flags.string({
      required: false,
      description: 'Governance proposal identifier which will be executed prior to proposal',
      exclusive: ['afterExecutingProposal'],
    }),
  }

  static examples = [
    'propose --jsonTransactions ./transactions.json --deposit 10000e18 --from 0x5409ed021d9299bf6814279a6a1411a7e866a631 --descriptionURL https://github.com/celo-org/governance/blob/main/CGPs/cgp-00000.md',
    'propose --jsonTransactions ./transactions.json --deposit 10000e18 --from 0x5409ed021d9299bf6814279a6a1411a7e866a631  --useMultiSig --for 0x6c3dDFB1A9e73B5F49eDD46624F4954Bf66CAe93 --descriptionURL https://github.com/celo-org/governance/blob/main/CGPs/gcp-00000.md',
  ]

  async run() {
    const kit = await this.getKit()
    const publicClient = await this.getPublicClient()
    const res = await this.parse(Propose)
    const account = res.flags.from

    kit.defaultAccount = account
    const deposit = new BigNumber(res.flags.deposit)
    if (res.flags.useMultiSig && !res.flags.for) {
      this.error(
        'If the --useMultiSig flag is set, then the --for flag has to also be set to a Multisig address.'
      )
    }
    const useMultiSig = res.flags.useMultiSig
    if (res.flags.for && !useMultiSig) {
      this.error('If the --for flag is set, then the --useMultiSig flag has to also be set.')
    }
    const proposerMultiSig = res.flags.for
      ? await kit.contracts.getMultiSig(res.flags.for)
      : undefined
    const useSafe = res.flags.useSafe
    const governance = await kit.contracts.getGovernance()
    const proposer = useMultiSig
      ? proposerMultiSig!.address
      : useSafe
        ? res.flags.safeAddress!
        : account

    await newCheckBuilder(this, proposer)
      .urlDestinationExists(res.flags.descriptionURL)
      .hasEnoughCelo(proposer, deposit)
      .exceedsProposalMinDeposit(deposit)
      .addConditionalCheck(`${account} is multisig signatory`, useMultiSig, () =>
        proposerMultiSig!.isOwner(account)
      )
      .addConditionalCheck(`${account} is a safe owner`, useSafe, async () => {
        const safe = await createSafe(
          (await this.getKit()).connection.currentProvider,
          account,
          proposer
        )
        return safe.isOwner(account)
      })
      .runChecks()

    const builder = new ProposalBuilder(kit)

    if (res.flags.afterExecutingID) {
      await addExistingProposalIDToBuilder(kit, builder, res.flags.afterExecutingID)
    } else if (res.flags.afterExecutingProposal) {
      await addExistingProposalJSONFileToBuilder(builder, res.flags.afterExecutingProposal)
    }

    // BUILD FROM JSON
    const jsonString = readFileSync(res.flags.jsonTransactions).toString()
    const jsonTransactions: ProposalTransactionJSON[] = JSON.parse(jsonString)
    jsonTransactions.forEach((tx) => builder.addJsonTx(tx))

    const proposal = await builder.build()
    if (!res.flags.noInfo) {
      printValueMapRecursive(await proposalToJSON(kit, proposal, builder.registryAdditions))
    }

    if (!res.flags.force) {
      let ok: boolean
      if (res.flags.simulate) {
        // Explicit external fork RPC.
        ok = await simulateProposalOnRpc(proposal, res.flags.simulate, governance.address)
      } else if (res.flags.noSimulate) {
        // Opt-out: independent per-tx eth_call checks (legacy behaviour).
        ok = await checkProposal(proposal, kit, governance.address)
      } else {
        // Default: spin up a bundled-anvil fork of the connected node and apply
        // the proposal transactions sequentially, so transactions that depend on
        // the effect of earlier ones (e.g. a method added by a prior upgrade tx)
        // simulate correctly. Falls back to eth_call checks for non-http nodes.
        const forkUrl = await this.getNodeUrl()
        if (forkUrl?.startsWith('http')) {
          ok = await withAnvilFork(forkUrl, (rpcUrl) =>
            simulateProposalOnRpc(proposal, rpcUrl, governance.address)
          )
        } else {
          ok = await checkProposal(proposal, kit, governance.address)
        }
      }
      if (!ok) {
        return
      }
    }

    if (useMultiSig || useSafe) {
      const proposeData = governance.encodeFunctionData(
        'propose',
        proposalToParams(proposal, res.flags.descriptionURL) as unknown[]
      )

      if (useMultiSig) {
        await displayViemTx(
          'proposeTx',
          proposerMultiSig!.submitOrConfirmTransaction(
            governance.address,
            proposeData,
            deposit.toFixed()
          ),
          publicClient,
          // Surfaces the multisig transaction id. submitOrConfirmTransaction
          // emits Submission on the first submit and Confirmation when a later
          // signer confirms an already-submitted tx; surface both. When the
          // multisig reaches its threshold, the underlying governance.propose
          // executes in the same receipt, so also surface the new proposal id
          // (ProposalQueued.proposalId) from that path.
          {
            abi: [...multiSigABI, ...governanceABI],
            displayEventName: ['Submission', 'Confirmation', 'ProposalQueued'],
          }
        )
      } else {
        await performSafeTransaction(
          (await this.getKit()).connection.currentProvider,
          proposer,
          account,
          safeTransactionMetadata(proposeData, governance.address, deposit.toFixed()),
          // surfaces the new proposal id when the Safe execution reaches threshold
          { abi: governanceABI, displayEventName: 'ProposalQueued' }
        )
      }
    } else {
      await displayViemTx(
        'proposeTx',
        governance.propose(proposal, res.flags.descriptionURL, { value: deposit.toFixed() }),
        publicClient,
        // surfaces the new proposal id (ProposalQueued.proposalId)
        { abi: governanceABI, displayEventName: 'ProposalQueued' }
      )
    }
  }
}
