import {
  type Account,
  type Client,
  type PublicClient,
  type Transport,
  type WalletClient,
} from 'viem'
import type { celo, celoAlfajores, celoSepolia } from 'viem/chains'
import type { celoBaklava } from './chains.js'

type CeloChain = typeof celo | typeof celoAlfajores | typeof celoBaklava | typeof celoSepolia

export type CeloClient = Client<Transport, CeloChain>

export type PublicCeloClient = PublicClient<Transport, CeloChain, undefined>

export type WalletCeloClient = WalletClient<Transport, CeloChain, Account>

export type Clients<
  P extends PublicCeloClient | PublicClient = PublicCeloClient,
  W extends WalletCeloClient | WalletClient = WalletCeloClient,
> = {
  public: P
  wallet?: W
}
