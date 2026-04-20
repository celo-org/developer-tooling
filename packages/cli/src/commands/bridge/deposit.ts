import { Flags, ux } from '@oclif/core'
import { createPublicClient, createWalletClient, http, isAddressEqual } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { BaseCommand } from '../../base'
import { printValueMap } from '../../utils/cli'
import { CustomFlags } from '../../utils/command'
import {
  BRIDGE_CONFIG,
  SYSTEM_CONFIG_ABI,
  ERC20_APPROVE_ABI,
  OPTIMISM_PORTAL_DEPOSIT_ABI,
  validateNetwork,
  verifyL1ChainId,
  type BridgeNetwork,
} from '../../utils/bridge'

export default class BridgeDeposit extends BaseCommand {
  static description =
    'Deposit CELO from Ethereum (L1) to Celo (L2). This bridges your CELO tokens to the Celo L2 network.'

  static examples = [
    'bridge:deposit --from 0xYOUR_ADDRESS --to 0xRECIPIENT --value 1000000000000000000 --network mainnet --l1RpcUrl https://eth-mainnet.example.com -k 0xPRIVATE_KEY',
    'bridge:deposit --from 0xYOUR_ADDRESS --value 1000000000000000000 --network sepolia --l1RpcUrl https://eth-sepolia.example.com -k 0xPRIVATE_KEY',
  ]

  static flags = {
    ...BaseCommand.flags,
    from: CustomFlags.address({
      required: true,
      description: 'Address of the sender on L1',
    }),
    to: CustomFlags.address({
      description: 'Address of the recipient on L2 (defaults to sender address)',
    }),
    value: CustomFlags.bigint({
      required: true,
      description: 'Amount of CELO to deposit (in wei)',
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
    gasLimit: Flags.integer({
      description: 'Gas limit for the L2 transaction',
      default: 100000,
    }),
  }

  requireSynced = false

  async init() {
    // noop - skip ContractKit initialization, we use L1 directly
  }

  async run() {
    const res = await this.parse(BridgeDeposit)
    const { from, value, network: networkFlag, l1RpcUrl, gasLimit } = res.flags
    const to = res.flags.to || from
    const network = validateNetwork(networkFlag)
    const config = BRIDGE_CONFIG[network]

    // We need wallet client for L1 - derive from BaseCommand's signing config
    const wallet = await this.getL1WalletClient(res, l1RpcUrl, network)
    const l1Client = createPublicClient({
      chain: config.l1Chain,
      transport: http(l1RpcUrl),
    })

    await verifyL1ChainId(l1Client, network)

    // Step 1: Retrieve gas paying token (CELO address on L1)
    ux.action.start('Step 1/3: Retrieving CELO token address on L1')
    const [celoL1Address] = await l1Client.readContract({
      address: config.systemConfig,
      abi: SYSTEM_CONFIG_ABI,
      functionName: 'gasPayingToken',
    })
    ux.action.stop()
    printValueMap({ 'CELO token on L1': celoL1Address })

    // Step 2: Approve OptimismPortal to spend CELO
    ux.action.start('Step 2/3: Approving CELO spending on L1')
    // Type assertion needed: wallet client is created dynamically so TS can't infer chain/account
    const approveHash = await wallet.writeContract({
      address: celoL1Address,
      abi: ERC20_APPROVE_ABI,
      functionName: 'approve',
      args: [config.optimismPortal, value],
      chain: config.l1Chain,
      account: wallet.account!,
    } as any)
    const approveReceipt = await l1Client.waitForTransactionReceipt({ hash: approveHash })
    ux.action.stop()
    printValueMap({ 'Approval txHash': approveReceipt.transactionHash })

    if (approveReceipt.status !== 'success') {
      throw new Error('Approval transaction failed. Please check the transaction on a block explorer.')
    }

    // Step 3: Deposit CELO to L2
    ux.action.start('Step 3/3: Depositing CELO to L2')
    const depositHash = await wallet.writeContract({
      address: config.optimismPortal,
      abi: OPTIMISM_PORTAL_DEPOSIT_ABI,
      functionName: 'depositERC20Transaction',
      // Type assertion needed: wallet client is created dynamically so TS can't infer chain/account
      args: [to, value, value, BigInt(gasLimit), false, '0x'],
      chain: config.l1Chain,
      account: wallet.account!,
    } as any)
    const depositReceipt = await l1Client.waitForTransactionReceipt({ hash: depositHash })
    ux.action.stop()
    printValueMap({
      'Deposit txHash': depositReceipt.transactionHash,
      status: depositReceipt.status === 'success' ? 'Success' : 'Failed',
    })

    if (depositReceipt.status === 'success') {
      console.log(
        '\nDeposit initiated! Your CELO should appear on L2 in approximately 15 minutes.'
      )
    } else {
      throw new Error('Deposit transaction failed. Please check the transaction on a block explorer.')
    }
  }

  // Create an L1 wallet client using the same signing mechanism as BaseCommand
  private async getL1WalletClient(res: any, l1RpcUrl: string, network: BridgeNetwork) {
    const config = BRIDGE_CONFIG[network]

    if (res.flags.useLedger) {
      const ledgerOptions = await this.ledgerOptions()
      const { ledgerToWalletClient } = await import('@celo/viem-account-ledger')
      return ledgerToWalletClient({
        ...ledgerOptions,
        account: res.flags.from,
        walletClientOptions: {
          transport: http(l1RpcUrl),
          chain: config.l1Chain,
        },
      })
    } else if (res.flags.privateKey) {
      const { ensureLeading0x } = await import('@celo/base')
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
      })
    }

    throw new Error(
      'Bridge commands require --privateKey or --useLedger for signing L1 transactions'
    )
  }
}
