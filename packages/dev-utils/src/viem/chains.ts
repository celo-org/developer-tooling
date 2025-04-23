/**
 * NOTE: to prevent cyclic imports copied from cli/src/package-to-be/chains.ts
 * TODO: remove this
 */
import { Chain, defineChain } from 'viem'
import { chainConfig } from 'viem/celo'

// holsky
const sourceId = 17000
// https://storage.googleapis.com/cel2-rollup-files/baklava/deployment-l1.json

export const celoBaklava = /*#__PURE__*/ defineChain({
  ...chainConfig,
  id: 44_787,
  name: 'Baklava',
  nativeCurrency: {
    decimals: 18,
    name: 'CELO',
    symbol: 'B-CELO',
  },
  rpcUrls: {
    default: {
      http: ['https://baklava-forno.celo-testnet.org'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Celo Baklava Explorer',
      url: 'https://celo-baklava.blockscout.com',
      apiUrl: 'https://celo-baklava.blockscout.com/api',
    },
  },
  contracts: {
    multicall3: {
      address: '0xcA11bde05977b3631167028862bE2a173976CA11',
    },
    portal: {
      [sourceId]: {
        address: '0x87e9cB54f185a32266689138fbA56F0C994CF50c',
        blockCreated: 2411324,
      },
    },
    disputeGameFactory: {
      [sourceId]: {
        address: '0x788ef5850c3a51d41f59Dc4327017EF8D754eD80',
        blockCreated: 2411324,
      },
    },
    l2OutputOracle: {
      [sourceId]: {
        address: '0x1C084a644951A5d189396c8761A9F95b33c282E6',
        blockCreated: 2411324,
      },
    },
    l1StandardBridge: {
      [sourceId]: {
        address: '0x6fd3fF186975aD8B66Ab40b705EC016b36da0486',
        blockCreated: 2411324,
      },
    },
  },
  testnet: true,
}) satisfies Chain
