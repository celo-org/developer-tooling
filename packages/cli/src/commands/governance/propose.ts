import { ProposalBuilder, proposalToJSON, ProposalTransactionJSON } from '@celo/governance'
import { Flags } from '@oclif/core'
import { BigNumber } from 'bignumber.js'
import { readFileSync } from 'fs'
import { BaseCommand } from '../../base'
import { newCheckBuilder } from '../../utils/checks'
import { displaySendTx, printValueMapRecursive } from '../../utils/cli'
import { CustomFlags } from '../../utils/command'
import { MultiSigFlags, SafeFlags } from '../../utils/flags'
import {
  addExistingProposalIDToBuilder,
  addExistingProposalJSONFileToBuilder,
  checkProposal,
} from '../../utils/governance'
import {
  createSafeFromWeb3,
  performSafeTransaction,
  safeTransactionMetadataFromCeloTransactionObject,
} from '../../utils/safe'
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
    force: Flags.boolean({ description: 'Skip execution check', default: false }),
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

    await newCheckBuilder(this, proposer)
      .descriptionUrlReturns200(res.flags.descriptionURL)
      .hasEnoughCelo(proposer, deposit)
      .exceedsProposalMinDeposit(deposit)
      .addConditionalCheck(`${account} is multisig signatory`, useMultiSig, () =>
        proposerMultiSig!.isOwner(account)
      )
      .addConditionalCheck(`${account} is a safe owner`, useSafe, async () => {
        const safe = await createSafeFromWeb3(await this.getWeb3(), account, proposer)
        return safe.isOwner(account)
      })
      .runChecks()

    if (!res.flags.force) {
      const ok = await checkProposal(proposal, kit)
      if (!ok) {
        return
      }
    }

    const governanceTx = governance.propose(proposal, res.flags.descriptionURL)

    if (useMultiSig) {
      const multiSigTx = await proposerMultiSig!.submitOrConfirmTransaction(
        governance.address,
        governanceTx.txo,
        deposit.toFixed()
      )
      await displaySendTx<string | void | boolean>('proposeTx', multiSigTx, {}, 'ProposalQueued')
    } else if (useSafe) {
      await performSafeTransaction(
        await this.getWeb3(),
        proposer,
        account,
        await safeTransactionMetadataFromCeloTransactionObject(
          governanceTx,
          governance.address,
          deposit.toFixed()
        )
      )
    } else {
      await displaySendTx<string | void | boolean>(
        'proposeTx',
        governanceTx,
        { value: deposit.toFixed() },
        'ProposalQueued'
      )
    }
  }
}
