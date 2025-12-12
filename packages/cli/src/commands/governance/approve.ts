import { StrongAddress } from '@celo/base'
import { CeloTransactionObject } from '@celo/connect'
import { GovernanceWrapper } from '@celo/contractkit/lib/wrappers/Governance'
import { MultiSigWrapper } from '@celo/contractkit/lib/wrappers/MultiSig'
import { toBuffer } from '@ethereumjs/util'
import { Flags } from '@oclif/core'
import fetch from 'cross-fetch'
import debugFactory from 'debug'
import { Hex } from 'viem'

import Web3 from 'web3'
import { BaseCommand } from '../../base'
import { newCheckBuilder } from '../../utils/checks'
import { displaySendTx, failWith } from '../../utils/cli'
import { CustomFlags } from '../../utils/command'
import {
  createSafeFromWeb3,
  performSafeTransaction,
  safeTransactionMetadataFromCeloTransactionObject,
} from '../../utils/safe'

enum HotfixApprovalType {
  APPROVER = 'approver',
  SECURITY_COUNCIL = 'securityCouncil',
}

export default class Approve extends BaseCommand {
  static description =
    'Approve a dequeued governance proposal (or hotfix). Only authorized approvers may use this command'

  static aliases = ['governance:approvehotfix']

  static flags = {
    ...BaseCommand.flags,
    proposalID: Flags.string({
      description: 'UUID of proposal to approve',
      exclusive: ['hotfix'],
    }),
    multisigTXId: Flags.string({
      dependsOn: ['proposalID', 'useMultiSig'],
      exclusive: ['hotfix', 'useSafe'],
      description: 'Optionally provide the exact multisig transaction id to confirm. otherwise will search onchain for transaction which matches the proposal.',
    }),
    submit: Flags.boolean({
      dependsOn: ['proposalID', 'useMultiSig'],
      description: 'Submit the approval transaction to multisig without checking for prior confirmations onchain. (Use with caution!)',
    }),
    from: CustomFlags.address({ required: true, description: "Approver's address" }),
    useMultiSig: Flags.boolean({
      description: 'True means the request will be sent through multisig.',
      exclusive: ['useSafe'],
    }),
    useSafe: Flags.boolean({
      description: 'True means the request will be sent through SAFE (http://safe.global)',
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
    const governanceSecurityCouncilMultiSig = useMultiSig
      ? await governance.getSecurityCouncilMultisig()
      : undefined
    const approver = useMultiSig ? governanceApproverMultiSig!.address : account

    await addDefaultChecks(
      await this.getWeb3(),
      checkBuilder,
      governance,
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
        .addConditionalCheck('Proposal has not been submitted to multisig', res.flags.submit, async () => {
          // We would prefer it allow for submissions if there is ambiguity, only fail if we confirm that it has been submitted
          const confrimations = await fetchConfirmationsForProposals(id)
          return confrimations === null || confrimations.count === 0
        })
        .addConditionalCheck('multisgTXId provided is valid', !!res.flags.multisigTXId,  async () => {
          const confirmations = await fetchConfirmationsForProposals(id)
          if (!confirmations || confirmations.count === 0) {
            return false
          }
          return confirmations.approvals.some(approval => approval.multisigTxId.toString() === res.flags.multisigTXId)
    
        })
        .runChecks()
      governanceTx = await governance.approve(id)
      logEvent = 'ProposalApproved'
    } else if (hotfix) {
      await checkBuilder.runChecks()

      // TODO dedup toBuffer
      governanceTx = governance.approveHotfix(toBuffer(hotfix) as Buffer)
      logEvent = 'HotfixApproved'
    } else {
      failWith('Proposal ID or hotfix must be provided')
    }

    if (approvalType === 'securityCouncil' && useSafe) {
      await performSafeTransaction(
        await this.getWeb3(),
        await governance.getSecurityCouncil(),
        account,
        await safeTransactionMetadataFromCeloTransactionObject(governanceTx, governance.address)
      )
    } else if (
      approvalType === 'securityCouncil' &&
      useMultiSig &&
      governanceSecurityCouncilMultiSig
    ) {
      const tx = await governanceSecurityCouncilMultiSig.submitOrConfirmTransaction(
        governance.address,
        governanceTx.txo,
      )

      await displaySendTx<string | void | boolean>('approveTx', tx, {}, logEvent)
    } else if (res.flags.multisigTXId && useMultiSig) {
      const tx = await governanceApproverMultiSig!.confirmTransaction(
        parseInt(res.flags.multisigTXId)
      )
      await displaySendTx<string | void | boolean>('approveTx', tx, {}, logEvent)
    } else if (res.flags.submit && useMultiSig) {
      const tx = await governanceApproverMultiSig!.submitTransaction(
            governance.address,
            governanceTx.txo,
          )
      await displaySendTx<string | void | boolean>('approveTx', tx, {}, logEvent)
    } 
    
    else {
      const tx = useMultiSig
        ? await governanceApproverMultiSig!.submitOrConfirmTransaction(
            governance.address,
            governanceTx.txo,
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
  isHotfix: boolean,
  useMultiSig: boolean,
  useSafe: boolean,
  approvalType: HotfixApprovalType,
  hotfix: string,
  approver: StrongAddress,
  account: StrongAddress,
  governanceApproverMultiSig: MultiSigWrapper | undefined
) => {
  if (isHotfix) {
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
const debugRpcPayload = debugFactory('mento-api')



async function fetchConfirmationsForProposals(proposalId: string): Promise<MondoAPITx | null> {
  const response = await fetch(`https://mondo.celo.org/api/governance/${proposalId}/approval-confirmations`)
  if (response.ok) {
    const data = await response.json() as MondoAPITx
    debugRpcPayload('Fetched confirmations for proposal %s: %O', proposalId, data)
    return data
  } else {
    return null
  }
}

interface MondoAPITx {
  "proposalId": number
  "count": number
  "approvals": Array<{
    "approver": StrongAddress
    "multisigTxId": number
    "confirmedAt": number
    "blockNumber": number
    "transactionHash": Hex
  }>
}
