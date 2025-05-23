import { stableTokenABI, stableTokenBrlABI, stableTokenEurABI } from '@celo/abis'
import { resolveAddress } from '@celo/actions'
import { Client, getContract, GetContractReturnType, PublicClient } from 'viem'

export async function getStableTokenUSDContract<T extends Client = PublicClient>(
  client: T
): Promise<StableTokenUSD<T>> {
  return getContract({
    address: await resolveAddress(client, 'StableToken'),
    abi: stableTokenABI,
    client,
  })
}
export type StableTokenUSD<T extends Client = PublicClient> = GetContractReturnType<
  typeof stableTokenABI,
  T
>

export async function getStableTokenEurContract<T extends Client = PublicClient>(
  client: T
): Promise<StableTokenEUR<T>> {
  return getContract({
    address: await resolveAddress(client, 'StableTokenEUR'),
    abi: stableTokenEurABI,
    client,
  })
}
export type StableTokenEUR<T extends Client = PublicClient> = GetContractReturnType<
  typeof stableTokenEurABI,
  T
>

export async function getStableTokenBrlContract<T extends Client = PublicClient>(
  client: T
): Promise<StableTokenBRL<T>> {
  return getContract({
    address: await resolveAddress(client, 'StableTokenBRL'),
    abi: stableTokenBrlABI,
    client,
  })
}
export type StableTokenBRL<T extends Client = PublicClient> = GetContractReturnType<
  typeof stableTokenBrlABI,
  T
>

export const StableTokens = {
  cUSD: getStableTokenUSDContract,
  cEUR: getStableTokenEurContract,
  cREAL: getStableTokenBrlContract,
} as const
export type StableToken = keyof typeof StableTokens
export type StableTokenContractGetter = (typeof StableTokens)[StableToken]
// all stables are the same type, this heavily simplifies the typings
export type StableTokenContract<T extends Client = PublicClient> = StableTokenUSD<T>
