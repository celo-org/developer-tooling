import { type GetContractReturnType, type PublicClient, getContract } from 'viem'

/**
 * Viem-native contract type for Celo contracts.
 * Replaces the custom ViemContract interface with viem's native GetContractReturnType.
 * Provides type-safe `.read`, `.write`, `.simulate`, `.estimateGas` namespaces
 * when a const-typed ABI is provided.
 */
export type CeloContract<TAbi extends readonly unknown[] = readonly unknown[]> =
  GetContractReturnType<TAbi, PublicClient>

/**
 * @deprecated Use `CeloContract` instead. This type alias will be removed in a future version.
 */
export type ViemContract<TAbi extends readonly unknown[] = readonly unknown[]> = CeloContract<TAbi>

/**
 * Create a viem contract instance for a Celo contract.
 * Direct replacement for Connection.getViemContract().
 */
export function createCeloContract<TAbi extends readonly unknown[]>(
  abi: TAbi,
  address: `0x${string}`,
  client: PublicClient
): CeloContract<TAbi> {
  return getContract({ abi, address, client })
}
