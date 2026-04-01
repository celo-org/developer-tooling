import { StrongAddress } from '@celo/base'
import { type Provider } from '@celo/connect'
import { GovernanceWrapper } from '@celo/contractkit/lib/wrappers/Governance'
import { MultiSigWrapper } from '@celo/contractkit/lib/wrappers/MultiSig'
import { hexToBytes } from 'viem'
import { Flags } from '@oclif/core'
import fetch from 'cross-fetch'
import debugFactory from 'debug'
import { Hex } from 'viem'
import { BaseCommand } from '../../base'
import { newCheckBuilder } from '../../utils/checks'
import { displayViemTx, failWith } from '../../utils/cli'
import { CustomFlags } from '../../utils/command'
import { createSafe, performSafeTransaction, safeTransactionMetadata } from '../../utils/safe'

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
    multisigTx: Flags.string({
      dependsOn: ['proposalID', 'useMultiSig'],
      exclusive: ['hotfix', 'useSafe'],
      description:
        'Optionally provide the exact multisig transaction ID to confirm. Otherwise will search onchain for transaction which matches the proposal call data.',
    }),
    submit: Flags.boolean({
      dependsOn: ['proposalID', 'useMultiSig'],
      description:
        'Submit the approval transaction to multisig without checking for prior confirmations onchain. (Use with caution!)',
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
    const publicClient = await this.getPublicClient()
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
      (await this.getKit()).connection.currentProvider,
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

    let encodedGovernanceData: `0x${string}` | undefined
    if (id) {
      if (await governance.isQueued(id)) {
        const dequeueHash = await governance.dequeueProposalsIfReady()
        await publicClient.waitForTransactionReceipt({ hash: dequeueHash })
      }

      await checkBuilder
        .proposalExists(id)
        .proposalInStages(id, ['Referendum', 'Execution'])
        .addCheck(`${id} not already approved`, async () => !(await governance.isApproved(id)))
        .addConditionalCheck(
          'Proposal has not been submitted to multisig',
          res.flags.submit,
          async () => {
            const confrimations = await fetchConfirmationsForProposals(id)
            return confrimations === null || confrimations.count === 0
          }
        )
        .addConditionalCheck('multisgTXId provided is valid', !!res.flags.multisigTx, async () => {
          const confirmations = await fetchConfirmationsForProposals(id)
          if (!confirmations || confirmations.count === 0) {
            return true
          }
          return confirmations.approvals.some(
            (approval) => approval.multisigTx.toString() === res.flags.multisigTx
          )
        })
        .runChecks()

      if (useMultiSig || useSafe) {
        const dequeue = await governance.getDequeue()
        const proposalIndex = dequeue.findIndex((d) => d.eq(id))
        encodedGovernanceData = governance.encodeFunctionData('approve', [
          id,
          proposalIndex.toString(),
        ])
      }
    } else if (hotfix) {
      await checkBuilder.runChecks()

      if (useMultiSig || useSafe) {
        encodedGovernanceData = governance.encodeFunctionData('approveHotfix', [hotfix])
      }
    } else {
      failWith('Proposal ID or hotfix must be provided')
    }

    if (approvalType === 'securityCouncil' && useSafe) {
      await performSafeTransaction(
        (await this.getKit()).connection.currentProvider,
        (await governance.getSecurityCouncil()) as StrongAddress,
        account,
        safeTransactionMetadata(encodedGovernanceData!, governance.address)
      )
    } else if (
      approvalType === 'securityCouncil' &&
      useMultiSig &&
      governanceSecurityCouncilMultiSig
    ) {
      await displayViemTx(
        'approveTx',
        governanceSecurityCouncilMultiSig.submitOrConfirmTransaction(
          governance.address,
          encodedGovernanceData!
        ),
        publicClient
      )
    } else if (res.flags.multisigTx && useMultiSig) {
      await displayViemTx(
        'approveTx',
        governanceApproverMultiSig!.confirmTransaction(parseInt(res.flags.multisigTx)),
        publicClient
      )
    } else if (res.flags.submit && useMultiSig) {
      await displayViemTx(
        'approveTx',
        governanceApproverMultiSig!.submitTransaction(governance.address, encodedGovernanceData!),
        publicClient
      )
    } else if (useMultiSig) {
      await displayViemTx(
        'approveTx',
        governanceApproverMultiSig!.submitOrConfirmTransaction(
          governance.address,
          encodedGovernanceData!
        ),
        publicClient
      )
    } else {
      if (id) {
        await displayViemTx('approveTx', governance.approve(id), publicClient)
      } else {
        await displayViemTx(
          'approveTx',
          governance.approveHotfix(Buffer.from(hexToBytes(hotfix! as `0x${string}`))),
          publicClient
        )
      }
    }
  }
}

const addDefaultChecks = async (
  provider: Provider,
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
    const hotfixBuf = Buffer.from(hexToBytes(hotfix as `0x${string}`))

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
          const protocolKit = await createSafe(
            provider,
            account,
            (await governance.getSecurityCouncil()) as StrongAddress
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
  const response = await fetch(
    `https://mondo.celo.org/api/governance/${proposalId}/approval-confirmations`
  )
  if (response.ok) {
    const data = (await response.json()) as MondoAPITx
    debugRpcPayload('Fetched confirmations for proposal %s: %O', proposalId, data)
    return data
  } else {
    return null
  }
}

interface MondoAPITx {
  proposalId: number
  count: number
  approvals: Array<{
    approver: StrongAddress
    multisigTx: number
    confirmedAt: number
    blockNumber: number
    transactionHash: Hex
  }>
}
