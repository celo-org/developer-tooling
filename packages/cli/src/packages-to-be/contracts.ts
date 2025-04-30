import {
  accountsABI,
  epochManagerABI,
  goldTokenABI,
  governanceABI,
  lockedGoldABI,
  stableTokenABI,
  stableTokenBrlABI,
  stableTokenEurABI,
  validatorsABI,
} from '@celo/abis-12'
import { erc20Abi, getContract, GetContractReturnType, PublicClient, WalletClient } from 'viem'
import { resolveAddress } from './address-resolver'

export const getAccountsContract = async (
  client: PublicClient | WalletClient
): Promise<AccountsContract<typeof client>> => {
  return getContract({
    address: await resolveAddress(client, 'Accounts'),
    abi: accountsABI,
    client,
  })
}
export type AccountsContract<T extends WalletClient | PublicClient> = GetContractReturnType<
  typeof accountsABI,
  T
>

export const getGovernanceContract = async (
  client: PublicClient | WalletClient
): Promise<GovernanceContract<typeof client>> => {
  return getContract({
    address: await resolveAddress(client, 'Governance'),
    abi: governanceABI,
    client,
  })
}
export type GovernanceContract<T extends WalletClient | PublicClient> = GetContractReturnType<
  typeof governanceABI,
  T
>

export const getLockedGoldContract = async (
  client: PublicClient | WalletClient
): Promise<LockedGoldContract<typeof client>> => {
  return getContract({
    address: await resolveAddress(client, 'LockedGold'),
    abi: lockedGoldABI,
    client,
  })
}
export type LockedGoldContract<T extends WalletClient | PublicClient> = GetContractReturnType<
  typeof lockedGoldABI,
  T
>

export const getValidatorsContract = async (
  client: PublicClient | WalletClient
): Promise<ValidatorsContract<typeof client>> => {
  return getContract({
    address: await resolveAddress(client, 'Validators'),
    abi: validatorsABI,
    client,
  })
}
export type ValidatorsContract<T extends WalletClient | PublicClient> = GetContractReturnType<
  typeof validatorsABI,
  T
>

export const getEpochManagerContract = async (
  client: PublicClient | WalletClient
): Promise<EpochManager<typeof client>> => {
  return getContract({
    address: await resolveAddress(client, 'EpochManager'),
    abi: epochManagerABI,
    client,
  })
}
export type EpochManager<T extends WalletClient | PublicClient> = GetContractReturnType<
  typeof epochManagerABI,
  T
>

export const getERC20Contract = async (
  client: PublicClient | WalletClient,
  address: `0x${string}`
): Promise<ERC20<typeof client>> => {
  return getContract({
    address,
    abi: erc20Abi,
    client,
  })
}
export type ERC20<T extends WalletClient | PublicClient> = GetContractReturnType<typeof erc20Abi, T>

export const getGoldTokenContract = async (
  client: PublicClient | WalletClient
): Promise<GoldToken<typeof client>> => {
  return getContract({
    address: await resolveAddress(client, 'GoldToken'),
    abi: goldTokenABI,
    client,
  })
}
export type GoldToken<T extends WalletClient | PublicClient> = GetContractReturnType<
  typeof goldTokenABI,
  T
>

export const getStableTokenUSDContract = async (
  client: PublicClient | WalletClient
): Promise<StableTokenUSD<typeof client>> => {
  return getContract({
    address: await resolveAddress(client, 'StableToken'),
    abi: stableTokenABI,
    client,
  })
}
export type StableTokenUSD<T extends WalletClient | PublicClient> = GetContractReturnType<
  typeof stableTokenABI,
  T
>

export const getStableTokenEurContract = async (
  client: PublicClient | WalletClient
): Promise<StableTokenEUR<typeof client>> => {
  return getContract({
    address: await resolveAddress(client, 'StableTokenEUR'),
    abi: stableTokenEurABI,
    client,
  })
}
export type StableTokenEUR<T extends WalletClient | PublicClient> = GetContractReturnType<
  typeof stableTokenEurABI,
  T
>

export const getStableTokenBrlContract = async (
  client: PublicClient | WalletClient
): Promise<StableTokenBRL<typeof client>> => {
  return getContract({
    address: await resolveAddress(client, 'StableTokenBRL'),
    abi: stableTokenBrlABI,
    client,
  })
}
export type StableTokenBRL<T extends WalletClient | PublicClient> = GetContractReturnType<
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
export type StableTokenContract = Awaited<ReturnType<StableTokenContractGetter>>
