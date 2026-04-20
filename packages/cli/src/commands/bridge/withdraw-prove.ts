import { ensureLeading0x } from '@celo/base'
import { Flags, ux } from '@oclif/core'
import { createPublicClient, createWalletClient, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { publicActionsL2, walletActionsL1 } from 'viem/op-stack'
import { BaseCommand } from '../../base'
import { printValueMap } from '../../utils/cli'
import { CustomFlags } from '../../utils/command'
import {
  BRIDGE_CONFIG,
  validateNetwork,
  getL2OpChain,
  createL1PublicClient,
  type BridgeNetwork,
} from '../../utils/bridge'

export default class BridgeWithdrawProve extends BaseCommand {
  static description =
    'Build a withdrawal proof and submit it to Ethereum (L1). This is step 2 of the withdrawal process.\n\nThis command will wait until the proof is available (~1 hour after withdrawal initiation), then automatically build and submit it.'

  static examples = [
    'bridge:withdraw-prove --txHash 0xYOUR_L2_TX_HASH --from 0xYOUR_ADDRESS --network mainnet --l1RpcUrl https://eth-mainnet.example.com -n mainnet -k 0xPRIVATE_KEY',
  ]

  static flags = {
    ...BaseCommand.flags,
    txHash: CustomFlags.hexString({
      required: true,
      description: 'Transaction hash of the withdrawal initiation on L2',
    }),
    from: CustomFlags.address({
      required: true,
      description: 'Address that will submit the proof on L1 (pays L1 gas)',
    }),
    network: Flags.string({
      required: true,
      options: ['mainnet', 'sepolia'],
      description: 'Network to bridge on (mainnet or sepolia)',
    }),
    l1RpcUrl: Flags.string({
      required: true,
      description: 'RPC URL for the Ethereum L1 network',
    }),
  }

  requireSynced = false

  async init() {
    // noop — skip ContractKit
  }

  async run() {
    const res = await this.parse(BridgeWithdrawProve)
    const { txHash, network: networkFlag, l1RpcUrl } = res.flags
    const network = validateNetwork(networkFlag)
    const l2Chain = getL2OpChain(network)

    // Create L2 client with OP Stack extensions
    const l2NodeUrl = await this.getNodeUrl()
    const l2Client = createPublicClient({
      chain: l2Chain,
      transport: http(l2NodeUrl),
    }).extend(publicActionsL2())

    // Create L1 public client with OP Stack extensions
    const l1Client = createL1PublicClient(l1RpcUrl, network)

    // Create L1 wallet client for submitting the prove tx
    const l1Wallet = await this.getL1WalletClient(res, l1RpcUrl, network)

    // Step 1: Get the withdrawal receipt
    ux.action.start('Step 1/4: Fetching withdrawal transaction receipt')
    const receipt = await l2Client.getTransactionReceipt({ hash: txHash as `0x${string}` })
    ux.action.stop()
    printValueMap({
      blockNumber: receipt.blockNumber.toString(),
      status: receipt.status,
    })

    // Step 2: Check/wait for proof readiness
    ux.action.start('Step 2/4: Waiting for proof to become available (this may take up to 1 hour)')
    const { output, withdrawal } = await l1Client.waitToProve({
      receipt,
      targetChain: l2Chain as any,
    })
    ux.action.stop()
    console.log('Proof is ready!')

    // Step 3: Build the proof
    ux.action.start('Step 3/4: Building withdrawal proof')
    const proveArgs = await l2Client.buildProveWithdrawal({
      output,
      withdrawal,
    })
    ux.action.stop()
    console.log('Proof built successfully.')

    // Step 4: Submit the prove transaction on L1
    ux.action.start('Step 4/4: Submitting proof to L1')
    const proveHash = await l1Wallet.proveWithdrawal(proveArgs)
    const proveReceipt = await createPublicClient({
      chain: BRIDGE_CONFIG[network].l1Chain,
      transport: http(l1RpcUrl),
    }).waitForTransactionReceipt({ hash: proveHash })
    ux.action.stop()

    printValueMap({
      'Prove txHash': proveReceipt.transactionHash,
      status: proveReceipt.status === 'success' ? 'Success' : 'Failed',
    })

    console.log('\nWithdrawal proof submitted! Next steps:')
    console.log('  1. Wait 7 days for the challenge period to pass')
    console.log('  2. Run: celocli bridge:withdraw-status --txHash ' + txHash + ' ...')
    console.log('  3. When ready, run: celocli bridge:withdraw-finalize --txHash ' + txHash + ' ...')
  }

  private async getL1WalletClient(res: any, l1RpcUrl: string, network: BridgeNetwork) {
    const config = BRIDGE_CONFIG[network]

    if (res.flags.useLedger) {
      const ledgerOptions = await this.ledgerOptions()
      const { ledgerToWalletClient } = await import('@celo/viem-account-ledger')
      const wallet = await ledgerToWalletClient({
        ...ledgerOptions,
        account: res.flags.from,
        walletClientOptions: {
          transport: http(l1RpcUrl),
          chain: config.l1Chain,
        },
      })
      return wallet.extend(walletActionsL1())
    } else if (res.flags.privateKey) {
      const account = privateKeyToAccount(ensureLeading0x(res.flags.privateKey))
      return createWalletClient({
        account,
        chain: config.l1Chain,
        transport: http(l1RpcUrl),
      }).extend(walletActionsL1())
    }

    throw new Error(
      'Bridge commands require --privateKey or --useLedger for signing L1 transactions'
    )
  }
}
