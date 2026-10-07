import { type PublicCeloClient } from '@celo/actions'
import { type StrongAddress } from '@celo/base'
import { ContractKit } from '@celo/contractkit'
import {
  GovernanceWrapper,
  HotfixRecord,
  ProposalTransaction,
} from '@celo/contractkit/lib/wrappers/Governance'
import { MultiSigWrapper } from '@celo/contractkit/lib/wrappers/MultiSig'
import { ProposalBuilder, ProposalTransactionJSON, proposalToJSON } from '@celo/governance'
import chalk from 'chalk'
import { readJsonSync } from 'fs-extra'
import { createWalletClient, type Hex, http } from 'viem'
import { waitForTransactionReceipt } from 'viem/actions'
import createCeloPublicClient from '../packages-to-be/public-client'

export async function checkProposal(
  proposal: ProposalTransaction[],
  kit: ContractKit,
  governanceAddress: StrongAddress
) {
  return tryProposal(proposal, kit, governanceAddress, true)
}

export async function simulateProposalOnRpc(
  proposal: ProposalTransaction[],
  rpcUrl: string,
  governanceAddress: StrongAddress
) {
  const transport = http(rpcUrl)
  const publicClient = await createCeloPublicClient({ transport, nodeUrl: rpcUrl })

  const walletClient = createWalletClient({
    transport,
    chain: publicClient.chain,
    account: governanceAddress,
  })

  console.log(`Simulating proposal execution against ${rpcUrl} as Governance ${governanceAddress}`)

  let ok = true
  for (const [i, tx] of proposal.entries()) {
    if (!tx.to) {
      console.log(
        chalk.red(`   ${chalk.bold('✘')}  Transaction ${i} has no 'to' address; skipping`)
      )
      ok = false
      continue
    }
    try {
      const hash = await walletClient.sendTransaction({
        to: tx.to as StrongAddress,
        value: BigInt(tx.value ?? 0),
        data: (tx.input ?? '0x') as Hex,
      })
      const receipt = await publicClient.waitForTransactionReceipt({ hash })
      if (receipt.status !== 'success') {
        let reason = ''
        try {
          await publicClient.call({
            to: tx.to as StrongAddress,
            data: (tx.input ?? '0x') as Hex,
            value: BigInt(tx.value ?? 0),
            account: governanceAddress,
            blockNumber: receipt.blockNumber,
          })
        } catch (callErr: any) {
          reason = callErr.shortMessage || callErr.message || String(callErr)
        }
        console.log(
          chalk.red(
            `   ${chalk.bold('✘')}  Transaction ${i} reverted on-chain (${hash})${
              reason ? `: ${reason}` : ''
            }`
          )
        )
        ok = false
      } else {
        console.log(chalk.green(`   ${chalk.bold('✔')}  Transaction ${i} success! (${hash})`))
      }
    } catch (err: any) {
      console.log(chalk.red(`   ${chalk.bold('✘')}  Transaction ${i} failure: ${err.toString()}`))
      ok = false
    }
  }
  return ok
}

export async function executeProposal(
  proposal: ProposalTransaction[],
  kit: ContractKit,
  from: string
) {
  return tryProposal(proposal, kit, from, false)
}

async function tryProposal(
  proposal: ProposalTransaction[],
  kit: ContractKit,
  from: string,
  call: boolean
) {
  console.log('Simulating proposal execution')
  let ok = true
  for (const [i, tx] of proposal.entries()) {
    if (!tx.to) {
      console.log(
        chalk.red(`   ${chalk.bold('✘')}  Transaction ${i} has no 'to' address; skipping`)
      )
      ok = false
      continue
    }

    try {
      if (call) {
        // JSON-RPC quantities must be hex-encoded; proposal values are decimal strings
        const hexValue = `0x${BigInt(tx.value ?? 0).toString(16)}`
        await kit.connection.viemClient.request({
          method: 'eth_call',
          params: [{ to: tx.to, from, value: hexValue, data: tx.input }, 'latest'] as any,
        })
      } else {
        const hash = await kit.connection.sendTransaction({
          to: tx.to,
          from,
          value: tx.value,
          data: tx.input,
        })
        await waitForTransactionReceipt(kit.connection.viemClient, {
          hash,
        })
      }
      console.log(chalk.green(`   ${chalk.bold('✔')}  Transaction ${i} success!`))
    } catch (err: any) {
      console.log(chalk.red(`   ${chalk.bold('✘')}  Transaction ${i} failure: ${err.toString()}`))
      ok = false
    }
  }
  return ok
}

/**
 * What kind of account has to give an approval:
 * - `multisig`: a Celo MultiSig, whose confirmations are visible onchain
 * - `safe`: a Gnosis Safe, which collects signatures offchain
 * - `eoa`: a plain externally owned account
 * - `contract`: some other contract we cannot introspect
 */
export type ApproverKind = 'multisig' | 'safe' | 'eoa' | 'contract'

export interface ApprovalProgress {
  /** Address which has to approve */
  address: string
  kind: ApproverKind
  approved: boolean
  confirmations: string[]
  /** Confirmations needed before the approval goes through */
  required: number
  /** How many signatories still need to confirm */
  remaining: number
}

const SAFE_GET_THRESHOLD_ABI = [
  {
    inputs: [],
    name: 'getThreshold',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
] as const

/**
 * Confirmation progress of a multisig transaction identified by its content.
 * Pass `requiredConfirmations` when the threshold was already fetched to save the read.
 */
export async function getMultiSigApprovalProgress(
  multiSig: MultiSigWrapper,
  destination: string,
  encodedData: string,
  requiredConfirmations?: number
): Promise<Pick<ApprovalProgress, 'confirmations' | 'required' | 'remaining'>> {
  const [transaction, required] = await Promise.all([
    multiSig.getTransactionDataByContent(destination, encodedData),
    requiredConfirmations !== undefined
      ? requiredConfirmations
      : multiSig.getRequired().then((r) => r.toNumber()),
  ])
  const confirmations = transaction ? transaction.confirmations : []

  return {
    confirmations,
    required,
    remaining: Math.max(0, required - confirmations.length),
  }
}

/**
 * Approval progress of a hotfix for both approval paths (approver and security council).
 * Either address may be a Celo MultiSig, a Gnosis Safe, or a plain EOA.
 */
export async function getHotfixApprovalProgress(
  publicClient: PublicCeloClient,
  governance: GovernanceWrapper,
  hotfixHash: string,
  record: HotfixRecord
): Promise<{ approver: ApprovalProgress; securityCouncil: ApprovalProgress }> {
  const encodedData = governance.encodeFunctionData('approveHotfix', [hotfixHash])
  const [approverMultiSig, securityCouncilMultiSig] = await Promise.all([
    governance.getApproverMultisig(),
    governance.getSecurityCouncilMultisig(),
  ])

  const progressFor = async (
    multiSig: MultiSigWrapper,
    approved: boolean
  ): Promise<ApprovalProgress> => {
    const address = multiSig.address

    const code = await publicClient.getCode({ address })
    if (!code || code === '0x') {
      return {
        address,
        kind: 'eoa',
        approved,
        confirmations: approved ? [address] : [],
        required: 1,
        remaining: approved ? 0 : 1,
      }
    }

    const required = await multiSig
      .getRequired()
      .then((r) => r.toNumber())
      .catch(() => undefined)
    if (required !== undefined) {
      // the executed approval transaction stays in the multisig's history,
      // so the confirmation list resolves even after the hotfix was approved
      const progress = await getMultiSigApprovalProgress(
        multiSig,
        governance.address,
        encodedData,
        required
      )
      return {
        address,
        kind: 'multisig',
        approved,
        ...progress,
        remaining: approved ? 0 : progress.remaining,
      }
    }

    const threshold = await publicClient
      .readContract({ address, abi: SAFE_GET_THRESHOLD_ABI, functionName: 'getThreshold' })
      .then((t) => Number(t))
      .catch(() => undefined)
    if (threshold !== undefined) {
      // a Safe collects its signatures offchain, so partial progress is not visible here
      return {
        address,
        kind: 'safe',
        approved,
        confirmations: [],
        required: threshold,
        remaining: approved ? 0 : threshold,
      }
    }

    return {
      address,
      kind: 'contract',
      approved,
      confirmations: [],
      required: 1,
      remaining: approved ? 0 : 1,
    }
  }

  const [approver, securityCouncil] = await Promise.all([
    progressFor(approverMultiSig, record.approved),
    progressFor(securityCouncilMultiSig, record.councilApproved),
  ])

  return { approver, securityCouncil }
}

export async function addExistingProposalIDToBuilder(
  kit: ContractKit,
  builder: ProposalBuilder,
  existingProposalID: string
) {
  const governance = await kit.contracts.getGovernance()
  const proposalRaw = await governance.getProposal(existingProposalID)
  return addProposalToBuilder(builder, await proposalToJSON(kit, proposalRaw))
}

export function addExistingProposalJSONFileToBuilder(
  builder: ProposalBuilder,
  existingProposalPath: string
) {
  return addProposalToBuilder(builder, readJsonSync(existingProposalPath))
}

async function addProposalToBuilder(
  builder: ProposalBuilder,
  existingProposal: ProposalTransactionJSON[]
) {
  // accounts for registry additions and caches in builder
  for (const tx of existingProposal) {
    await builder.fromJsonTx(tx)
  }

  console.info(
    `After executing provided proposal, account for registry remappings: ${JSON.stringify(
      builder.registryAdditions,
      null,
      2
    )}`
  )
}
