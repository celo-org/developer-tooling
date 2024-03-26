import { CeloTransactionObject } from '@celo/connect'
import { toBuffer } from '@ethereumjs/util'
import { Flags } from '@oclif/core'
import { BaseCommand } from '../../base'
import { newCheckBuilder } from '../../utils/checks'
import { displaySendTx, failWith } from '../../utils/cli'
import { CustomFlags } from '../../utils/command'

export default class Approve extends BaseCommand {
  static description = 'Approve a dequeued governance proposal (or hotfix)'

  static aliases = ['governance:approve', 'governance:approvehotfix']

  // Only authorized approvers need to know about this command.
  static hidden = true

  static flags = {
    ...BaseCommand.flags,
    proposalID: Flags.string({
      description: 'UUID of proposal to approve',
      exclusive: ['hotfix'],
    }),
    from: CustomFlags.address({ required: true, description: "Approver's address" }),
    useMultiSig: Flags.boolean({
      description: 'True means the request will be sent through multisig.',
    }),
    hotfix: Flags.string({
      exclusive: ['proposalID'],
      description: 'Hash of hotfix proposal',
    }),
  }

  static examples = [
    'approve --proposalID 99 --from 0x5409ed021d9299bf6814279a6a1411a7e866a631',
    'approve --proposalID 99 --from 0x5409ed021d9299bf6814279a6a1411a7e866a631 --useMultiSig',
    'approve --hotfix 0xfcfc98ec3db7c56f0866a7149e811bf7f9e30c9d40008b0def497fcc6fe90649 --from 0xCc50EaC48bA71343dC76852FAE1892c6Bd2971DA --useMultiSig',
  ]

  async run() {
    const kit = await this.getKit()
    const res = await this.parse(Approve)
    const account = res.flags.from
    /**
     * TODO(Arthur): Move `useMultiSig` to another class
     */
    const useMultiSig = res.flags.useMultiSig
    const id = res.flags.proposalID
    const hotfix = res.flags.hotfix
    kit.defaultAccount = account
    const governance = await kit.contracts.getGovernance()
    /**
     * TODO(Arthur): My thinking is the use of the `getApproverMultisig` method in this variable
     * definition is too specialised and doesn't generalise if we want to support MultiSig
     * as a global flag.
     *
     * I'm thinking about refactoring this into a more generalised function that can be used
     * for MultiSig support here and elsewhere.
     *
     * In another class:
     * const multisig = getMultiSig(address)
     */
    const governanceApproverMultiSig = useMultiSig
      ? await governance.getApproverMultisig()
      : undefined
    const approver = useMultiSig ? governanceApproverMultiSig!.address : account
    /**
     * TODO(Arthur): In this file:
     * const approver = useMultiSig ? MultiSig!.address : account
     */

    const checkBuilder = newCheckBuilder(this)
      .isApprover(approver)
      .addConditionalCheck(`${account} is multisig signatory`, useMultiSig, () =>
        /**
         * TODO(Arthur): refactor to something like
         * multisig!.isowner(account)
         */
        governanceApproverMultiSig!.isowner(account)
      )

    let governanceTx: CeloTransactionObject<any>
    let logEvent: string
    if (id) {
      if (await governance.isQueued(id)) {
        await governance.dequeueProposalsIfReady().sendAndWaitForReceipt()
      }

      const governanceVersion = await governance.version()

      await checkBuilder
        .proposalExists(id)
        .proposalInStage(
          id,
          governanceVersion.storage === '1' && Number(governanceVersion.major) < 3
            ? 'Approval'
            : 'Referendum'
        )
        .addCheck(`${id} not already approved`, async () => !(await governance.isApproved(id)))
        .runChecks()
      governanceTx = await governance.approve(id)
      logEvent = 'ProposalApproved'
    } else if (hotfix) {
      const hotfixBuf = toBuffer(hotfix) as Buffer
      await checkBuilder.hotfixNotExecuted(hotfixBuf).hotfixNotApproved(hotfixBuf).runChecks()
      governanceTx = governance.approveHotfix(hotfixBuf)
      logEvent = 'HotfixApproved'
    } else {
      failWith('Proposal ID or hotfix must be provided')
    }

    /**
     * TODO(Arthur): Refactor
     */
    const tx = useMultiSig
      ? await governanceApproverMultiSig!.submitOrConfirmTransaction(
          governance.address,
          governanceTx.txo
        )
      : governanceTx
    await displaySendTx<string | void | boolean>('approveTx', tx, {}, logEvent)
  }
}
