import { resolveAddress } from '@celo/actions'
import { stableTokenViemAbi } from '@celo/contractkit/lib/stable-token-abi'
import { Client, GetContractReturnType, getContract, PublicClient } from 'viem'

export async function getStableTokenUSDContract<T extends Client = PublicClient>(
  client: T
): Promise<StableTokenUSD<T>> {
  return getContract({
    address: await resolveAddress(client, 'StableToken'),
    abi: stableTokenViemAbi,
    client,
  })
}
export type StableTokenUSD<T extends Client = PublicClient> = GetContractReturnType<
  typeof stableTokenViemAbi,
  T
>

export async function getStableTokenEurContract<T extends Client = PublicClient>(
  client: T
): Promise<StableTokenEUR<T>> {
  return getContract({
    address: await resolveAddress(client, 'StableTokenEUR'),
    abi: stableTokenViemAbi,
    client,
  })
}
export type StableTokenEUR<T extends Client = PublicClient> = GetContractReturnType<
  typeof stableTokenViemAbi,
  T
>

export async function getStableTokenBrlContract<T extends Client = PublicClient>(
  client: T
): Promise<StableTokenBRL<T>> {
  return getContract({
    address: await resolveAddress(client, 'StableTokenBRL'),
    abi: stableTokenViemAbi,
    client,
  })
}
export type StableTokenBRL<T extends Client = PublicClient> = GetContractReturnType<
  typeof stableTokenViemAbi,
  T
>

export const StableTokens = {
  USDm: getStableTokenUSDContract,
  EURm: getStableTokenEurContract,
  BRLm: getStableTokenBrlContract,
} as const
export type StableToken = keyof typeof StableTokens
export type StableTokenContractGetter = (typeof StableTokens)[StableToken]
// all stables are the same type, this heavily simplifies the typings
export type StableTokenContract<T extends Client = PublicClient> = StableTokenUSD<T>
