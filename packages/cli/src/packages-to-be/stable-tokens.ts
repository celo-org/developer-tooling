import { stableTokenABI, stableTokenBrlABI, stableTokenEurABI } from '@celo/abis-12'
import { resolveAddress } from '@celo/actions'
import { getContract, GetContractReturnType, PublicClient, WalletClient } from 'viem'

export async function getStableTokenUSDContract<
  T extends WalletClient | PublicClient = PublicClient
>(client: T): Promise<StableTokenUSD<T>> {
  return getContract({
    address: await resolveAddress(client, 'StableToken'),
    abi: stableTokenABI,
    client,
  })
}
export type StableTokenUSD<T extends WalletClient | PublicClient = PublicClient> =
  GetContractReturnType<typeof stableTokenABI, T>

export async function getStableTokenEurContract<
  T extends WalletClient | PublicClient = PublicClient
>(client: T): Promise<StableTokenEUR<T>> {
  return getContract({
    address: await resolveAddress(client, 'StableTokenEUR'),
    abi: stableTokenEurABI,
    client,
  })
}
export type StableTokenEUR<T extends WalletClient | PublicClient = PublicClient> =
  GetContractReturnType<typeof stableTokenEurABI, T>

export async function getStableTokenBrlContract<
  T extends WalletClient | PublicClient = PublicClient
>(client: T): Promise<StableTokenBRL<T>> {
  return getContract({
    address: await resolveAddress(client, 'StableTokenBRL'),
    abi: stableTokenBrlABI,
    client,
  })
}
export type StableTokenBRL<T extends WalletClient | PublicClient = PublicClient> =
  GetContractReturnType<typeof stableTokenBrlABI, T>

export const StableTokens = {
  cUSD: getStableTokenUSDContract,
  cEUR: getStableTokenEurContract,
  cREAL: getStableTokenBrlContract,
} as const
export type StableToken = keyof typeof StableTokens
export type StableTokenContractGetter = (typeof StableTokens)[StableToken]
export type StableTokenContract = Awaited<ReturnType<StableTokenContractGetter>>
