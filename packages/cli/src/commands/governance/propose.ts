import { ProposalBuilder, proposalToJSON, ProposalTransactionJSON } from '@celo/governance'
import { Flags } from '@oclif/core'
import { BigNumber } from 'bignumber.js'
import { readFileSync } from 'fs'
import { BaseCommand } from '../../base'
import { newCheckBuilder } from '../../utils/checks'
import { displaySendTx, printValueMapRecursive } from '../../utils/cli'
import { CustomFlags } from '../../utils/command'
import {
  addExistingProposalIDToBuilder,
  addExistingProposalJSONFileToBuilder,
  checkProposal,
} from '../../utils/governance'
export default class Propose extends BaseCommand {
  static description = 'Submit a governance proposal'

  static flags = {
    ...BaseCommand.flags,
    jsonTransactions: Flags.string({
      required: true,
      description: 'Path to json transactions',
    }),
    deposit: Flags.string({
      required: true,
      description: 'Amount of Celo to attach to proposal',
    }),
    from: CustomFlags.address({ required: true, description: "Proposer's address" }),
    useMultiSig: Flags.boolean({
      description: 'True means the request will be sent through multisig.',
    }),
    for: CustomFlags.address({
      dependsOn: ['useMultiSig'],
      description: 'Address of the multi-sig contract',
      /* 
      TODO(Arthur): check this syntax is correct.
      The goal is to ensure `--for` is only used if `--useMultiSig` is used
      */
    }),
    force: Flags.boolean({ description: 'Skip execution check', default: false }),
    noInfo: Flags.boolean({ description: 'Skip printing the proposal info', default: false }),
    descriptionURL: Flags.string({
      required: true,
      description: 'A URL where further information about the proposal can be viewed',
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
    'propose --jsonTransactions ./transactions.json --deposit 10000e18 --from 0x5409ed021d9299bf6814279a6a1411a7e866a631 --descriptionURL https://gist.github.com/yorhodes/46430eacb8ed2f73f7bf79bef9d58a33',
    'propose --jsonTransactions ./transactions.json --deposit 10000e18 --from 0x5409ed021d9299bf6814279a6a1411a7e866a631  --useMultiSig --for 0x6c3dDFB1A9e73B5F49eDD46624F4954Bf66CAe93 --descriptionURL https://gist.github.com/yorhodes/46430eacb8ed2f73f7bf79bef9d58a33',
  ]

  async run() {
    const kit = await this.getKit()
    const res = await this.parse(Propose)
    const account = res.flags.from
    const useMultiSig = res.flags.useMultiSig
    const deposit = new BigNumber(res.flags.deposit)
    kit.defaultAccount = account
    /* 
    TODO(Arthur): Check that I'm handling edge cases 
    where --useMultiSig and --for are defined/undefined
    correctly.
    */
    const proposerMultiSig = res.flags.for
      ? await kit.contracts.getMultiSig(res.flags.for)
      : undefined
    const proposer = useMultiSig ? proposerMultiSig!.address : account

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

    // BUILD FROM CONTRACTKIT FUNCTIONS
    // const params = await kit.contracts.getBlockchainParameters()
    // builder.addTx(params.setMinimumClientVersion(1, 8, 24), { to: params.address })
    // builder.addWeb3Tx()
    // builder.addProxyRepointingTx
    const proposal = await builder.build()
    if (!res.flags.noInfo) {
      printValueMapRecursive(await proposalToJSON(kit, proposal, builder.registryAdditions))
    }

    const governance = await kit.contracts.getGovernance()

    await newCheckBuilder(this, proposer)
      .hasEnoughCelo(proposer, deposit)
      .exceedsProposalMinDeposit(deposit)
      .addConditionalCheck(`${account} is multisig signatory`, useMultiSig, () =>
        proposerMultiSig!.isOwner(account)
      )
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
