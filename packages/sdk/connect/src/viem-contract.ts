import type { PublicClient } from 'viem'
import type { AbiItem } from './abi-types'

/**
 * Viem-native contract representation.
 * Replaces the web3-style Contract interface with a lightweight
 * wrapper around a viem PublicClient + ABI + address.
 */
export interface ViemContract {
  /** The contract's ABI */
  readonly abi: AbiItem[]
  /** The deployed contract address */
  readonly address: string
  /** Viem PublicClient for read operations */
  readonly client: PublicClient
}
