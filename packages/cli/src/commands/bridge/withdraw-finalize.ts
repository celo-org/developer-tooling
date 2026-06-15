import { ensureLeading0x } from '@celo/base'
import { Flags, ux } from '@oclif/core'
import { createPublicClient, createWalletClient, http, isAddressEqual } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { getWithdrawals, publicActionsL2, walletActionsL1 } from 'viem/op-stack'
import { BaseCommand } from '../../base'
import {
  BRIDGE_CONFIG,
  type BridgeNetwork,
  createL1PublicClient,
  getL2OpChain,
  validateNetwork,
  verifyL1ChainId,
  verifyL2ChainId,
} from '../../utils/bridge'
import { printValueMap } from '../../utils/cli'
import { CustomFlags } from '../../utils/command'

export default class BridgeWithdrawFinalize extends BaseCommand {
  static description =
    'Finalize a withdrawal and claim your CELO on Ethereum (L1). This is the final step of the withdrawal process.\n\nCan only be run after the 7-day challenge period has passed. Use bridge:withdraw-status to check if your withdrawal is ready.'

  static examples = [
    'bridge:withdraw-finalize --txHash 0xYOUR_L2_TX_HASH --from 0xYOUR_ADDRESS --network mainnet --l1RpcUrl https://eth-mainnet.example.com -n mainnet -k 0xPRIVATE_KEY',
  ]

  static flags = {
    ...BaseCommand.flags,
    txHash: CustomFlags.hexString({
      required: true,
      description: 'Transaction hash of the withdrawal initiation on L2',
    }),
    from: CustomFlags.address({
      required: true,
      description: 'Address that will finalize the withdrawal on L1 (pays L1 gas)',
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

  async init() {
    // noop — skip ContractKit
  }

  async run() {
    const res = await this.parse(BridgeWithdrawFinalize)
    const { txHash, network: networkFlag, l1RpcUrl } = res.flags
    const network = validateNetwork(networkFlag)
    const l2Chain = getL2OpChain(network)

    // Create L2 client with OP Stack extensions
    const l2NodeUrl = await this.getNodeUrl()
    const l2Client = createPublicClient({
      chain: l2Chain,
      transport: http(l2NodeUrl),
    }).extend(publicActionsL2())

    await verifyL2ChainId(l2Client, network)

    // Create L1 clients
    const l1Client = createL1PublicClient(l1RpcUrl, network)

    await verifyL1ChainId(l1Client, network)

    const l1Wallet = await this.getL1WalletClient(res, l1RpcUrl, network)

    // Step 1: Get the withdrawal receipt
    ux.action.start('Step 1/3: Fetching withdrawal transaction receipt')
    const receipt = await l2Client.getTransactionReceipt({ hash: txHash as `0x${string}` })
    ux.action.stop()

    // Step 2: Check status
    ux.action.start('Step 2/3: Verifying withdrawal is ready to finalize')
    const status = await l1Client.getWithdrawalStatus({
      receipt,
      targetChain: l2Chain as any,
    })
    ux.action.stop()

    if (status !== 'ready-to-finalize') {
      const statusMessages: Record<string, string> = {
        'waiting-to-prove':
          'The withdrawal has not been proven yet. Run bridge:withdraw-prove first.',
        'ready-to-prove': 'The withdrawal needs to be proven first. Run bridge:withdraw-prove.',
        'waiting-to-finalize':
          'The 7-day challenge period has not passed yet. Please wait and try again later.',
        finalized: 'This withdrawal has already been finalized.',
      }
      const msg = statusMessages[status] || `Unexpected status: ${status}`
      throw new Error(`Cannot finalize: ${msg}`)
    }

    // Step 3: Finalize the withdrawal on L1
    ux.action.start('Step 3/3: Finalizing withdrawal on L1')
    const [withdrawal] = getWithdrawals(receipt)
    const finalizeHash = await l1Wallet.finalizeWithdrawal({
      targetChain: l2Chain as any,
      withdrawal,
    })

    const finalizeReceipt = await createPublicClient({
      chain: BRIDGE_CONFIG[network].l1Chain,
      transport: http(l1RpcUrl),
    }).waitForTransactionReceipt({ hash: finalizeHash })
    ux.action.stop()

    printValueMap({
      'Finalize txHash': finalizeReceipt.transactionHash,
      status: finalizeReceipt.status === 'success' ? 'Success' : 'Failed',
    })

    if (finalizeReceipt.status === 'success') {
      console.log('\nWithdrawal finalized! Your CELO has been sent to your L1 address.')
    } else {
      throw new Error(
        'Finalize transaction failed. Please check the transaction on a block explorer.'
      )
    }
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
      if (res.flags.from && !isAddressEqual(res.flags.from, account.address)) {
        throw new Error(
          `The --from address ${res.flags.from} does not match the address derived from the provided private key ${account.address}.`
        )
      }
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
