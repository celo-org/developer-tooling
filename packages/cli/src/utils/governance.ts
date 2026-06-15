import { type StrongAddress } from '@celo/base'
import { ContractKit } from '@celo/contractkit'
import { ProposalTransaction } from '@celo/contractkit/lib/wrappers/Governance'
import { ProposalBuilder, proposalToJSON, ProposalTransactionJSON } from '@celo/governance'
import chalk from 'chalk'
import { waitForTransactionReceipt } from 'viem/actions'
import { readJsonSync } from 'fs-extra'
import { createWalletClient, http, type Hex } from 'viem'
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
