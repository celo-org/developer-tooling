import { celoBaklava } from '@celo/dev-utils/src/viem/chains'
import { Account, PublicClient, Transport, WalletClient } from 'viem'
import { celo, celoAlfajores } from 'viem/chains'

export type CeloClient = PublicClient<
  Transport,
  typeof celo | typeof celoAlfajores | typeof celoBaklava,
  Account | undefined
>

export type WalletCeloClient = WalletClient<
  Transport,
  typeof celo | typeof celoAlfajores | typeof celoBaklava,
  Account | undefined
>
