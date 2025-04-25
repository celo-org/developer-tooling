import { Account, PublicClient, Transport, WalletClient } from 'viem'
import { celo, celoAlfajores } from 'viem/chains'
import { celoBaklava } from './chains'

export type CeloClient = PublicClient<
  Transport,
  typeof celo | typeof celoAlfajores | typeof celoBaklava,
  undefined
>

export type WalletCeloClient = WalletClient<
  Transport,
  typeof celo | typeof celoAlfajores | typeof celoBaklava,
  Account
>
