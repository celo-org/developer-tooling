import { createPublicClient, extractChain, Hex, http } from 'viem'
import { celo, celoAlfajores } from 'viem/chains'

export const celoBaklava = {
  ...celoAlfajores,
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
      url: 'https://celo-baklava.blockscout.com/',
      apiUrl: 'https://celo-baklava.blockscout.com/api',
    },
  },
}

export const TEST_PRIVATE_KEY = process.env.TEST_ACCOUNT as Hex

const network = (process.env.NETWORK as string).toLowerCase()
let RPC_URL: string
if (network === 'celo' || network === 'mainnet') {
  RPC_URL = celo.rpcUrls.default.http[0]
} else if (network === 'alfajores') {
  RPC_URL = celoAlfajores.rpcUrls.default.http[0]
} else if (network === 'baklava') {
  RPC_URL = celoBaklava.rpcUrls.default.http[0]
} else {
  throw new Error(
    `Unrecognized network ${network}. Valid networks are celo, mainnet, alfajores, baklava`
  )
}

const transport = http(RPC_URL)
const intermediateClient = createPublicClient({
  transport,
})
export const CHAIN = extractChain({
  chains: [celo, celoAlfajores, celoBaklava],
  id: (await intermediateClient.getChainId()) as
    | typeof celo.id
    | typeof celoAlfajores.id
    | typeof celoBaklava.id,
})
