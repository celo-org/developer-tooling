import type { Account, Client, PublicClient, Transport, WalletClient } from 'viem'
import type { celo, celoAlfajores } from 'viem/chains'
import type { celoBaklava } from './chains'

type CeloChain = typeof celo | typeof celoAlfajores | typeof celoBaklava

export type CeloClient = Client<Transport, CeloChain>

export type PublicCeloClient = PublicClient<Transport, CeloChain, undefined>

export type WalletCeloClient = WalletClient<Transport, CeloChain, Account>
