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
import { erc20Abi, getContract, GetContractReturnType, PublicClient } from 'viem'
import { resolveAddress } from './address-resolver'

export const getAccountsContract = async (client: PublicClient): Promise<AccountsContract> => {
  return getContract({
    address: await resolveAddress(client, 'Accounts'),
    abi: accountsABI,
    client,
  })
}
export type AccountsContract = GetContractReturnType<typeof accountsABI, PublicClient>

export const getGovernanceContract = async (client: PublicClient): Promise<GovernanceContract> => {
  return getContract({
    address: await resolveAddress(client, 'Governance'),
    abi: governanceABI,
    client,
  })
}
export type GovernanceContract = GetContractReturnType<typeof governanceABI, PublicClient>

export const getLockedGoldContract = async (client: PublicClient): Promise<LockedGoldContract> => {
  return getContract({
    address: await resolveAddress(client, 'LockedGold'),
    abi: lockedGoldABI,
    client,
  })
}
export type LockedGoldContract = GetContractReturnType<typeof lockedGoldABI, PublicClient>

export const getValidatorsContract = async (client: PublicClient): Promise<ValidatorsContract> => {
  return getContract({
    address: await resolveAddress(client, 'Validators'),
    abi: validatorsABI,
    client,
  })
}
export type ValidatorsContract = GetContractReturnType<typeof validatorsABI, PublicClient>

export const getEpochManagerContract = async (client: PublicClient): Promise<EpochManager> => {
  return getContract({
    address: await resolveAddress(client, 'EpochManager'),
    abi: epochManagerABI,
    client,
  })
}
export type EpochManager = GetContractReturnType<typeof epochManagerABI, PublicClient>

export const getERC20Contract = async (
  client: PublicClient,
  address: `0x${string}`
): Promise<ERC20> => {
  return getContract({
    address,
    abi: erc20Abi,
    client,
  })
}
export type ERC20 = GetContractReturnType<typeof erc20Abi, PublicClient>

export const getGoldTokenContract = async (client: PublicClient): Promise<GoldToken> => {
  return getContract({
    address: await resolveAddress(client, 'GoldToken'),
    abi: goldTokenABI,
    client,
  })
}
export type GoldToken = GetContractReturnType<typeof goldTokenABI, PublicClient>

export const getStableTokenUSDContract = async (client: PublicClient): Promise<StableTokenUSD> => {
  return getContract({
    address: await resolveAddress(client, 'StableToken'),
    abi: stableTokenABI,
    client,
  })
}
export type StableTokenUSD = GetContractReturnType<typeof stableTokenABI, PublicClient>

export const getStableTokenEurContract = async (client: PublicClient): Promise<StableTokenEUR> => {
  return getContract({
    address: await resolveAddress(client, 'StableTokenEUR'),
    abi: stableTokenEurABI,
    client,
  })
}
export type StableTokenEUR = GetContractReturnType<typeof stableTokenEurABI, PublicClient>

export const getStableTokenBrlContract = async (client: PublicClient): Promise<StableTokenBRL> => {
  return getContract({
    address: await resolveAddress(client, 'StableTokenBRL'),
    abi: stableTokenBrlABI,
    client,
  })
}
export type StableTokenBRL = GetContractReturnType<typeof stableTokenBrlABI, PublicClient>

export const StableTokens = {
  cUSD: getStableTokenUSDContract,
  cEUR: getStableTokenEurContract,
  cREAL: getStableTokenBrlContract,
} as const
export type StableToken = keyof typeof StableTokens
export type StableTokenContractGetter = (typeof StableTokens)[StableToken]
export type StableTokenContract = Awaited<ReturnType<StableTokenContractGetter>>
