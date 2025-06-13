import { defineChain } from 'viem'

export const celoBaklava = /* #__PURE__ */ defineChain({
  id: 62_320,
  name: 'Baklava',
  nativeCurrency: {
    decimals: 18,
    name: 'CELO',
    symbol: 'B-CELO',
  },
  rpcUrls: {
    default: {
      http: ['https://baklava-forno.celo-testnet.org' as string],
    },
  },
  blockExplorers: {
    default: {
      name: 'Celo Baklava Explorer' as string,
      url: 'https://celo-baklava.blockscout.com' as string,
      apiUrl: 'https://celo-baklava.blockscout.com/api' as string,
    },
  },
  contracts: {
    multicall3: {
      address: '0xcA11bde05977b3631167028862bE2a173976CA11',
    },
  },
  testnet: true,
})
