import {
  accountsABI,
  epochManagerABI,
  feeCurrencyDirectoryABI,
  goldTokenABI,
  governanceABI,
  lockedGoldABI,
  stableTokenABI,
  stableTokenBrlABI,
  stableTokenEurABI,
  validatorsABI,
} from '@celo/abis-12'
import { Client, erc20Abi, getContract, GetContractReturnType, PublicClient } from 'viem'
import { resolveAddress } from './address-resolver'

export async function getAccountsContract<T extends Client = PublicClient>(
  client: T
): Promise<AccountsContract<T>> {
  return getContract({
    address: await resolveAddress(client, 'Accounts'),
    abi: accountsABI,
    client,
  })
}
export type AccountsContract<T extends Client = PublicClient> = GetContractReturnType<
  typeof accountsABI,
  T
>

export async function getGovernanceContract<T extends Client = PublicClient>(
  client: T
): Promise<GovernanceContract<T>> {
  return getContract({
    address: await resolveAddress(client, 'Governance'),
    abi: governanceABI,
    client,
  })
}
export type GovernanceContract<T extends Client = PublicClient> = GetContractReturnType<
  typeof governanceABI,
  T
>

export async function getLockedGoldContract<T extends Client = PublicClient>(
  client: T
): Promise<LockedGoldContract<T>> {
  return getContract({
    address: await resolveAddress(client, 'LockedGold'),
    abi: lockedGoldABI,
    client,
  })
}
export type LockedGoldContract<T extends Client = PublicClient> = GetContractReturnType<
  typeof lockedGoldABI,
  T
>

export async function getValidatorsContract<T extends Client = PublicClient>(
  client: T
): Promise<ValidatorsContract<T>> {
  return getContract({
    address: await resolveAddress(client, 'Validators'),
    abi: validatorsABI,
    client,
  })
}
export type ValidatorsContract<T extends Client = PublicClient> = GetContractReturnType<
  typeof validatorsABI,
  T
>

export async function getEpochManagerContract<T extends Client = PublicClient>(
  client: T
): Promise<EpochManager<T>> {
  return getContract({
    address: await resolveAddress(client, 'EpochManager'),
    abi: epochManagerABI,
    client,
  })
}
export type EpochManager<T extends Client = PublicClient> = GetContractReturnType<
  typeof epochManagerABI,
  T
>

export async function getFeeCurrencyDirectoryContract<T extends Client = PublicClient>(
  client: T
): Promise<FeeCurrencyDirectory<T>> {
  return getContract({
    address: await resolveAddress(client, 'FeeCurrencyDirectory'),
    abi: feeCurrencyDirectoryABI,
    client,
  })
}
export type FeeCurrencyDirectory<T extends Client = PublicClient> = GetContractReturnType<
  typeof feeCurrencyDirectoryABI,
  T
>

export async function getERC20Contract<T extends Client = PublicClient>(
  client: T,
  address: `0x${string}`
): Promise<ERC20<T>> {
  return getContract({
    address,
    abi: erc20Abi,
    client,
  })
}
export type ERC20<T extends Client = PublicClient> = GetContractReturnType<typeof erc20Abi, T>

export async function getGoldTokenContract<T extends Client = PublicClient>(
  client: T
): Promise<GoldToken<T>> {
  return getContract({
    address: await resolveAddress(client, 'GoldToken'),
    abi: goldTokenABI,
    client,
  })
}
export type GoldToken<T extends Client = PublicClient> = GetContractReturnType<
  typeof goldTokenABI,
  T
>

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
