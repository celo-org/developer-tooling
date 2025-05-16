import type { Account, PublicClient, Transport, WalletClient } from 'viem'
import type { celo, celoAlfajores } from 'viem/chains'
import type { celoBaklava } from './chains'

type CeloChain = typeof celo | typeof celoAlfajores | typeof celoBaklava

export type CeloClient = PublicClient<
  Transport,
  typeof celo | typeof celoAlfajores | typeof celoBaklava,
  undefined
>

export type WalletCeloClient = WalletClient<Transport, CeloChain, Account>
