import { StrongAddress } from '@celo/base'
import { CeloTransactionObject } from '@celo/connect'
import { GovernanceWrapper } from '@celo/contractkit/lib/wrappers/Governance'
import { MultiSigWrapper } from '@celo/contractkit/lib/wrappers/MultiSig'
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
    type: Flags.option({
      description:
        'Determines which type of hotfix approval (approver or security council) to use.',
      dependsOn: ['hotfix'],
      // TODO add enum or constants
      options: ['approver', 'securityCouncil'],
      multiple: false,
      required: false,
    })(),
  }

  static examples = [
    'approve --proposalID 99 --from 0x5409ed021d9299bf6814279a6a1411a7e866a631',
    'approve --proposalID 99 --from 0x5409ed021d9299bf6814279a6a1411a7e866a631 --useMultiSig',
    'approve --hotfix 0xfcfc98ec3db7c56f0866a7149e811bf7f9e30c9d40008b0def497fcc6fe90649 --from 0xCc50EaC48bA71343dC76852FAE1892c6Bd2971DA --useMultiSig',
    'approve --hotfix 0xfcfc98ec3db7c56f0866a7149e811bf7f9e30c9d40008b0def497fcc6fe90649 --from 0xCc50EaC48bA71343dC76852FAE1892c6Bd2971DA --useMultiSig --type securityCouncil',
  ]

  async run() {
    const checkBuilder = newCheckBuilder(this)
    const kit = await this.getKit()
    const res = await this.parse(Approve)
    const account = res.flags.from
    const useMultiSig = res.flags.useMultiSig
    const id = res.flags.proposalID
    const hotfix = res.flags.hotfix
    const approvalType = res.flags.type
    kit.defaultAccount = account
    const governance = await kit.contracts.getGovernance()
    const governanceApproverMultiSig = useMultiSig
      ? await governance.getApproverMultisig()
      : undefined
    const governanceSecurityCouncilMultiSig = useMultiSig
      ? await governance.getSecurityCouncilMultisig()
      : undefined
    const approver = useMultiSig ? governanceApproverMultiSig!.address : account
    const isCel2 = await this.isCel2()

    // TODO consider passing whole res object or flags object
    await addDefaultChecks(
      checkBuilder,
      governance,
      isCel2,
      !!hotfix,
      useMultiSig,
      approvalType as 'approver' | 'securityCouncil',
      hotfix as string,
      approver,
      account,
      governanceApproverMultiSig
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
      if (!isCel2) {
        const hotfixBuf = toBuffer(hotfix) as Buffer

        checkBuilder.hotfixNotApproved(hotfixBuf).hotfixNotExecuted(hotfixBuf)
      }

      await checkBuilder.runChecks()

      // TODO dedup toBuffer
      governanceTx = governance.approveHotfix(toBuffer(hotfix) as Buffer)
      logEvent = 'HotfixApproved'
    } else {
      failWith('Proposal ID or hotfix must be provided')
    }

    if (
      isCel2 &&
      approvalType === 'securityCouncil' &&
      useMultiSig &&
      governanceSecurityCouncilMultiSig
    ) {
      const tx = await governanceSecurityCouncilMultiSig.submitOrConfirmTransaction(
        governance.address,
        governanceTx.txo
      )

      await displaySendTx<string | void | boolean>('approveTx', tx, {}, logEvent)
    } else {
      const tx = useMultiSig
        ? await governanceApproverMultiSig!.submitOrConfirmTransaction(
            governance.address,
            governanceTx.txo
          )
        : governanceTx
      await displaySendTx<string | void | boolean>('approveTx', tx, {}, logEvent)
    }
  }
}

const addDefaultChecks = async (
  checkBuilder: ReturnType<typeof newCheckBuilder>,
  governance: GovernanceWrapper,
  isCel2: boolean,
  isHotfix: boolean,
  useMultiSig: boolean,
  approvalType: 'approver' | 'securityCouncil',
  hotfix: string,
  approver: StrongAddress,
  account: StrongAddress,
  governanceApproverMultiSig: MultiSigWrapper | undefined
) => {
  if (isHotfix && isCel2) {
    const hotfixBuf = toBuffer(hotfix) as Buffer

    if (approvalType === 'approver' || approvalType === undefined) {
      if (useMultiSig) {
        const approverMultisig = await governance.getApproverMultisig()

        checkBuilder
          .isApprover(approverMultisig.address)
          .addCheck(`${account} is approver multisig signatory`, async () => {
            return await approverMultisig.isOwner(account)
          })
      } else {
        checkBuilder.isApprover(account)
      }

      checkBuilder.hotfixNotApproved(hotfixBuf)
    } else {
      // approvalType securityCouncil
      if (useMultiSig) {
        const securityCouncilMultisig = await governance.getSecurityCouncilMultisig()

        checkBuilder
          .isSecurityCouncil(securityCouncilMultisig.address)
          .addCheck(`${account} is security council multisig signatory`, async () => {
            return await securityCouncilMultisig.isOwner(account)
          })
      } else {
        checkBuilder.isSecurityCouncil(account)
      }

      checkBuilder.hotfixNotApprovedBySecurityCouncil(hotfixBuf)
    }

    return checkBuilder.hotfixNotExecuted(hotfixBuf)
  }

  return checkBuilder
    .isApprover(approver)
    .addConditionalCheck(`${account} is multisig signatory`, useMultiSig, () =>
      governanceApproverMultiSig!.isOwner(account)
    )
}
