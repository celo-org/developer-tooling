import { StrongAddress } from '@celo/base'
import { CeloTransactionObject } from '@celo/connect'
import { GovernanceWrapper } from '@celo/contractkit/lib/wrappers/Governance'
import { MultiSigWrapper } from '@celo/contractkit/lib/wrappers/MultiSig'
import { toBuffer } from '@ethereumjs/util'
import { Flags } from '@oclif/core'
import Web3 from 'web3'
import { BaseCommand } from '../../base'
import { newCheckBuilder } from '../../utils/checks'
import { displaySendSafeTx, displaySendTx, failWith } from '../../utils/cli'
import { CustomFlags } from '../../utils/command'
import {
  createApproveSafeTransactionIfNotApproved,
  createExecuteSafeTransactionIfThresholdMet,
  createSafeFromWeb3,
} from '../../utils/safe'

enum HotfixApprovalType {
  APPROVER = 'approver',
  SECURITY_COUNCIL = 'securityCouncil',
}

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
      exclusive: ['useSafe'],
    }),
    useSafe: Flags.boolean({
      description: 'True means the request will be sent through safe.',
      exclusive: ['useMultiSig'],
    }),
    hotfix: Flags.string({
      exclusive: ['proposalID'],
      description: 'Hash of hotfix proposal',
    }),
    type: Flags.option({
      description:
        'Determines which type of hotfix approval (approver or security council) to use.',
      dependsOn: ['hotfix'],
      options: [HotfixApprovalType.APPROVER, HotfixApprovalType.SECURITY_COUNCIL],
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
    const useSafe = res.flags.useSafe
    const id = res.flags.proposalID
    const hotfix = res.flags.hotfix
    const approvalType = res.flags.type
    kit.defaultAccount = account
    const governance = await kit.contracts.getGovernance()
    const governanceApproverMultiSig = useMultiSig
      ? await governance.getApproverMultisig()
      : undefined
    const isCel2 = await this.isCel2()
    const governanceSecurityCouncilMultiSig =
      useMultiSig && isCel2 ? await governance.getSecurityCouncilMultisig() : undefined
    const approver = useMultiSig ? governanceApproverMultiSig!.address : account

    await addDefaultChecks(
      await this.getWeb3(),
      checkBuilder,
      governance,
      isCel2,
      !!hotfix,
      useMultiSig,
      useSafe,
      approvalType as HotfixApprovalType,
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

      await checkBuilder
        .proposalExists(id)
        .proposalInStages(id, ['Referendum', 'Execution'])
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

    if (isCel2 && approvalType === 'securityCouncil' && useSafe) {
      const web3 = await this.getWeb3()
      const safe = await createSafeFromWeb3(web3, account, await governance.getSecurityCouncil())

      const approveTx = await createApproveSafeTransactionIfNotApproved(
        safe,
        governanceTx,
        governance.address,
        account
      )

      if (approveTx !== null) {
        // @ts-expect-error
        await displaySendSafeTx('approveTx', approveTx)
      }

      const executeTx = await createExecuteSafeTransactionIfThresholdMet(
        safe,
        governanceTx,
        governance.address
      )

      if (executeTx !== null) {
        // @ts-expect-error
        await displaySendSafeTx('executeTx', executeTx)
      }
    } else if (
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
  web3: Web3,
  checkBuilder: ReturnType<typeof newCheckBuilder>,
  governance: GovernanceWrapper,
  isCel2: boolean,
  isHotfix: boolean,
  useMultiSig: boolean,
  useSafe: boolean,
  approvalType: HotfixApprovalType,
  hotfix: string,
  approver: StrongAddress,
  account: StrongAddress,
  governanceApproverMultiSig: MultiSigWrapper | undefined
) => {
  if (isHotfix && isCel2) {
    const hotfixBuf = toBuffer(hotfix) as Buffer

    if (approvalType === HotfixApprovalType.APPROVER || approvalType === undefined) {
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
      } else if (useSafe) {
        checkBuilder.addCheck(`${account} is security council safe signatory`, async () => {
          const protocolKit = await createSafeFromWeb3(
            web3,
            account,
            await governance.getSecurityCouncil()
          )

          return await protocolKit.isOwner(account)
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
