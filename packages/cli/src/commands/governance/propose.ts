import { StrongAddress } from '@celo/base'
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
    'propose --jsonTransactions ./transactions.json --deposit 10000 --from 0x5409ed021d9299bf6814279a6a1411a7e866a631 --descriptionURL https://gist.github.com/yorhodes/46430eacb8ed2f73f7bf79bef9d58a33',
  ]

  async run() {
    const kit = await this.getKit()
    const res = await this.parse(Propose)
    const account = res.flags.from
    const deposit = new BigNumber(res.flags.deposit)
    kit.defaultAccount = account as StrongAddress

    await newCheckBuilder(this, account)
      .hasEnoughCelo(account, deposit)
      .exceedsProposalMinDeposit(deposit)
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

    if (!res.flags.force) {
      const ok = await checkProposal(proposal, kit)
      if (!ok) {
        return
      }
    }

    await displaySendTx(
      'proposeTx',
      governance.propose(proposal, res.flags.descriptionURL),
      { value: deposit.toFixed() },
      'ProposalQueued'
    )
  }
}
