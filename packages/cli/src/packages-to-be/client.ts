import { PublicClient, Transport } from 'viem'
import { celo, celoAlfajores } from 'viem/chains'

export type CeloClient = PublicClient<Transport, typeof celo | typeof celoAlfajores>
