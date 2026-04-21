import { StrongAddress } from '@celo/base'
import { createPublicClient, http, type Chain } from 'viem'
import { mainnet, sepolia } from 'viem/chains'
import { chainConfig, publicActionsL1 } from 'viem/op-stack'
import { defineChain } from 'viem/utils'

export type BridgeNetwork = 'mainnet' | 'sepolia'

export interface BridgeConfig {
  l1Chain: Chain
  systemConfig: StrongAddress
  optimismPortal: StrongAddress
  l2L1MessagePasser: StrongAddress
}

// Contract addresses per network — sourced from op-tooling deposit.sh / withdrawal scripts
export const BRIDGE_CONFIG: Record<BridgeNetwork, BridgeConfig> = {
  mainnet: {
    l1Chain: mainnet,
    systemConfig: '0x89E31965D844a309231B1f17759Ccaf1b7c09861',
    optimismPortal: '0xc5c5D157928BDBD2ACf6d0777626b6C75a9EAEDC',
    l2L1MessagePasser: '0x4200000000000000000000000000000000000016',
  },
  sepolia: {
    l1Chain: sepolia,
    systemConfig: '0x760a5f022c9940f4a074e0030be682f560d29818',
    optimismPortal: '0x44ae3d41a335a7d05eb533029917aad35662dcc2',
    l2L1MessagePasser: '0x4200000000000000000000000000000000000016',
  },
}

// Celo Mainnet OP Stack chain definition for viem
// Standard viem `celo` chain lacks OP Stack contract addresses needed for
// withdrawal proving/finalization. This definition adds them.
const celoL2 = /*#__PURE__*/ defineChain({
  ...chainConfig,
  id: 42_220,
  name: 'Celo',
  nativeCurrency: { decimals: 18, name: 'CELO', symbol: 'CELO' },
  rpcUrls: { default: { http: ['https://forno.celo.org'] } },
  blockExplorers: {
    default: {
      name: 'Celo Explorer',
      url: 'https://celoscan.io',
      apiUrl: 'https://api.celoscan.io/api',
    },
  },
  contracts: {
    ...chainConfig.contracts,
    multicall3: {
      address: '0xcA11bde05977b3631167028862bE2a173976CA11',
      blockCreated: 13112599,
    },
    portal: {
      1: { address: '0xc5c5D157928BDBD2ACf6d0777626b6C75a9EAEDC' },
    },
    disputeGameFactory: {
      1: { address: '0xFbAC162162f4009Bb007C6DeBC36B1dAC10aF683' },
    },
    l1StandardBridge: {
      1: { address: '0x9C4955b92F34148dbcfDCD82e9c9eCe5CF2badfe' },
    },
  },
  sourceId: 1,
  testnet: false,
})

// Celo Sepolia OP Stack chain definition for viem
const celoSepoliaL2 = /*#__PURE__*/ defineChain({
  ...chainConfig,
  id: 11_142_220,
  name: 'Celo Sepolia Testnet',
  nativeCurrency: { decimals: 18, name: 'CELO', symbol: 'S-CELO' },
  rpcUrls: { default: { http: ['https://forno.celo-sepolia.celo-testnet.org'] } },
  blockExplorers: {
    default: {
      name: 'Celo Sepolia Explorer',
      url: 'https://celo-sepolia.blockscout.com',
      apiUrl: 'https://celo-sepolia.blockscout.com/api',
    },
  },
  contracts: {
    ...chainConfig.contracts,
    multicall3: {
      address: '0xcA11bde05977b3631167028862bE2a173976CA11',
      blockCreated: 1,
    },
    portal: {
      11155111: { address: '0x44ae3d41a335a7d05eb533029917aad35662dcc2', blockCreated: 8825790 },
    },
    disputeGameFactory: {
      11155111: { address: '0x57c45d82d1a995f1e135b8d7edc0a6bb5211cfaa', blockCreated: 8825790 },
    },
    l1StandardBridge: {
      11155111: { address: '0xec18a3c30131a0db4246e785355fbc16e2eaf408', blockCreated: 8825790 },
    },
  },
  sourceId: 11155111,
  testnet: true,
})

export function validateNetwork(network: string): BridgeNetwork {
  if (network === 'mainnet' || network === 'sepolia') {
    return network
  }
  throw new Error(`Invalid network: ${network}. Must be 'mainnet' or 'sepolia'.`)
}

export function getL2OpChain(network: BridgeNetwork) {
  return network === 'mainnet' ? celoL2 : celoSepoliaL2
}

export async function verifyL2ChainId(client: { getChainId: () => Promise<number> }, network: BridgeNetwork) {
  const expectedChainId = getL2OpChain(network).id
  const actualChainId = await client.getChainId()
  if (actualChainId !== expectedChainId) {
    throw new Error(
      `L2 node chain ID mismatch: --network ${network} expects chain ${expectedChainId} but --node is connected to chain ${actualChainId}. Ensure --node points to the correct L2 network.`
    )
  }
}

export async function verifyL1ChainId(client: { getChainId: () => Promise<number> }, network: BridgeNetwork) {
  const expectedChainId = BRIDGE_CONFIG[network].l1Chain.id
  const actualChainId = await client.getChainId()
  if (actualChainId !== expectedChainId) {
    throw new Error(
      `L1 RPC chain ID mismatch: --network ${network} expects chain ${expectedChainId} but --l1RpcUrl is connected to chain ${actualChainId}. Ensure --l1RpcUrl points to the correct L1 network.`
    )
  }
}

export function createL1PublicClient(l1RpcUrl: string, network: BridgeNetwork): any {
  const config = BRIDGE_CONFIG[network]
  return createPublicClient({
    chain: config.l1Chain,
    transport: http(l1RpcUrl),
  }).extend(publicActionsL1())
}

// ABI fragments

export const SYSTEM_CONFIG_ABI = [
  {
    name: 'gasPayingToken',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [
      { name: 'addr_', type: 'address' },
      { name: 'decimals_', type: 'uint8' },
    ],
  },
] as const

export const ERC20_APPROVE_ABI = [
  {
    name: 'approve',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'spender', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    outputs: [{ name: '', type: 'bool' }],
  },
] as const

export const OPTIMISM_PORTAL_DEPOSIT_ABI = [
  {
    name: 'depositERC20Transaction',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [
      { name: '_to', type: 'address' },
      { name: '_mint', type: 'uint256' },
      { name: '_value', type: 'uint256' },
      { name: '_gasLimit', type: 'uint64' },
      { name: '_isCreation', type: 'bool' },
      { name: '_data', type: 'bytes' },
    ],
    outputs: [],
  },
] as const

export const L2_L1_MESSAGE_PASSER_ABI = [
  {
    name: 'initiateWithdrawal',
    type: 'function',
    stateMutability: 'payable',
    inputs: [
      { name: '_target', type: 'address' },
      { name: '_gasLimit', type: 'uint256' },
      { name: '_data', type: 'bytes' },
    ],
    outputs: [],
  },
] as const

// Human-readable withdrawal status labels
export type WithdrawalStatus =
  | 'waiting-to-prove'
  | 'ready-to-prove'
  | 'waiting-to-finalize'
  | 'ready-to-finalize'
  | 'finalized'

export const WITHDRAWAL_STATUS_LABELS: Record<
  WithdrawalStatus,
  { label: string; description: string }
> = {
  'waiting-to-prove': {
    label: 'Waiting to Prove',
    description:
      'Your withdrawal has been initiated on L2. Wait ~1 hour for the proof to become available.',
  },
  'ready-to-prove': {
    label: 'Ready to Prove',
    description:
      'The proof is available. You can now submit it on L1 with bridge:withdraw-prove.',
  },
  'waiting-to-finalize': {
    label: 'Waiting to Finalize',
    description:
      'The proof has been submitted. The 7-day challenge period is in progress.',
  },
  'ready-to-finalize': {
    label: 'Ready to Finalize',
    description:
      'The challenge period has passed. Claim your funds on L1 with bridge:withdraw-finalize.',
  },
  finalized: {
    label: 'Finalized',
    description: 'The withdrawal is complete. Funds have been sent to your L1 address.',
  },
}
