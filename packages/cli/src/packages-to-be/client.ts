import { Account, Client, PublicClient, Transport, WalletClient } from 'viem'
import { celo, celoAlfajores } from 'viem/chains'
import { celoBaklava } from './chains'

export type CeloClient = Client<
  Transport,
  typeof celo | typeof celoAlfajores | typeof celoBaklava,
  undefined
>

export type PublicCeloClient = PublicClient<
  Transport,
  typeof celo | typeof celoAlfajores | typeof celoBaklava,
  undefined
>

export type WalletCeloClient = WalletClient<
  Transport,
  typeof celo | typeof celoAlfajores | typeof celoBaklava,
  Account
>
