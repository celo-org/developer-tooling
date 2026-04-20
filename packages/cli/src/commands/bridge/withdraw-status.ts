import { Flags, ux } from '@oclif/core'
import { createPublicClient, http } from 'viem'
import { publicActionsL2 } from 'viem/op-stack'
import { BaseCommand } from '../../base'
import { printValueMap } from '../../utils/cli'
import { CustomFlags } from '../../utils/command'
import {
  WITHDRAWAL_STATUS_LABELS,
  validateNetwork,
  getL2OpChain,
  createL1PublicClient,
} from '../../utils/bridge'

export default class BridgeWithdrawStatus extends BaseCommand {
  static description =
    'Check the status of a CELO withdrawal from Celo (L2) to Ethereum (L1).\n\nProvide the L2 transaction hash from the initial bridge:withdraw-init command to see where your withdrawal stands in the process.'

  static examples = [
    'bridge:withdraw-status --txHash 0xYOUR_L2_TX_HASH --network mainnet --l1RpcUrl https://eth-mainnet.example.com -n mainnet',
    'bridge:withdraw-status --txHash 0xYOUR_L2_TX_HASH --network sepolia --l1RpcUrl https://eth-sepolia.example.com -n celo-sepolia',
  ]

  static flags = {
    ...BaseCommand.flags,
    txHash: CustomFlags.hexString({
      required: true,
      description: 'Transaction hash of the withdrawal initiation on L2',
    }),
    network: Flags.string({
      required: true,
      options: ['mainnet', 'sepolia'],
      description: 'Network (mainnet or sepolia)',
    }),
    l1RpcUrl: Flags.string({
      required: true,
      description: 'RPC URL for the Ethereum L1 network',
    }),
  }

  requireSynced = false

  // Read-only command
  isOnlyReadingWallet = true

  async init() {
    // noop — skip ContractKit
  }

  async run() {
    const res = await this.parse(BridgeWithdrawStatus)
    const { txHash, network: networkFlag, l1RpcUrl } = res.flags
    const network = validateNetwork(networkFlag)
    const l2Chain = getL2OpChain(network)

    // Create L2 client with OP Stack extensions
    const l2NodeUrl = await this.getNodeUrl()
    const l2Client = createPublicClient({
      chain: l2Chain,
      transport: http(l2NodeUrl),
    }).extend(publicActionsL2())

    // Create L1 client with OP Stack extensions
    const l1Client = createL1PublicClient(l1RpcUrl, network)

    // Get the receipt
    ux.action.start('Fetching withdrawal transaction')
    const receipt = await l2Client.getTransactionReceipt({ hash: txHash as `0x${string}` })
    ux.action.stop()

    if (receipt.status !== 'success') {
      console.log('\nThe withdrawal transaction failed on L2.')
      printValueMap({ status: 'Failed', blockNumber: receipt.blockNumber.toString() })
      return
    }

    // Get the withdrawal status from L1
    ux.action.start('Checking withdrawal status on L1')
    const status = await l1Client.getWithdrawalStatus({
      receipt,
      targetChain: l2Chain as any,
    })
    ux.action.stop()

    const statusInfo = WITHDRAWAL_STATUS_LABELS[
      status as keyof typeof WITHDRAWAL_STATUS_LABELS
    ] || {
      label: status,
      description: 'Unknown status',
    }

    // Display human-readable status
    console.log('')
    console.log(`  Status: ${statusInfo.label}`)
    console.log('')
    console.log(`  ${statusInfo.description}`)
    console.log('')

    // Show contextual next steps
    printValueMap({
      'L2 Transaction': txHash,
      'L2 Block': receipt.blockNumber.toString(),
      'Current Status': statusInfo.label,
    })

    console.log('')
    switch (status) {
      case 'waiting-to-prove':
        console.log('What to do next:')
        console.log('  Wait for the proof to become available (~1 hour after initiation).')
        console.log('  Then run: celocli bridge:withdraw-prove --txHash ' + txHash + ' ...')
        break
      case 'ready-to-prove':
        console.log('What to do next:')
        console.log('  Run: celocli bridge:withdraw-prove --txHash ' + txHash + ' ...')
        break
      case 'waiting-to-finalize':
        console.log('What to do next:')
        console.log('  Wait for the 7-day challenge period to pass.')
        console.log('  You can check again later with this same command.')
        break
      case 'ready-to-finalize':
        console.log('What to do next:')
        console.log('  Run: celocli bridge:withdraw-finalize --txHash ' + txHash + ' ...')
        break
      case 'finalized':
        console.log('Your withdrawal is complete! Funds have been sent to L1.')
        break
    }
  }
}
