import { defineChain } from 'viem'

/**
 * NOTE: to prevent cyclic imports copied from cli/src/package-to-be/chains.ts
 * TODO: remove this
 */
export const celoBaklava = /*#__PURE__*/ defineChain({
  id: 62_320,
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
  },
  testnet: true,
})
