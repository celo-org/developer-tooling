import type { PublicClient } from 'viem'
import type { AbiItem } from './abi-types'

/**
 * Viem-native contract representation.
 * Replaces the web3-style Contract interface with a lightweight
 * wrapper around a viem PublicClient + ABI + address.
 *
 * @typeParam TAbi - The contract's ABI type. When a const-typed ABI is provided
 *   (e.g. `typeof accountsABI` from `@celo/abis`), viem utility types can infer
 *   method names, argument types, and return types at compile time.
 */
export interface ViemContract<TAbi extends readonly unknown[] = AbiItem[]> {
  /** The contract's ABI */
  readonly abi: TAbi
  /** The deployed contract address */
  readonly address: `0x${string}`
  /** Viem PublicClient for read operations */
  readonly client: PublicClient
}
