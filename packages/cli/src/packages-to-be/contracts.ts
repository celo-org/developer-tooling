import {
  accountsABI,
  epochManagerABI,
  governanceABI,
  lockedGoldABI,
  validatorsABI,
} from '@celo/abis-12'
import { getContract, GetContractReturnType, PublicClient } from 'viem'
import { resolveAddress } from './address-resolver'

export const getAccountsContract = async (client: PublicClient): Promise<AccountsContract> => {
  return getContract({
    address: await resolveAddress(client, 'Accounts'),
    abi: accountsABI,
    client,
  })
}

export const getGovernanceContract = async (client: PublicClient): Promise<GovernanceContract> => {
  return getContract({
    address: await resolveAddress(client, 'Governance'),
    abi: governanceABI,
    client,
  })
}

export const getLockedGoldContract = async (client: PublicClient): Promise<LockedGoldContract> => {
  return getContract({
    address: await resolveAddress(client, 'LockedGold'),
    abi: lockedGoldABI,
    client,
  })
}

export const getValidatorsContract = async (client: PublicClient): Promise<ValidatorsContract> => {
  return getContract({
    address: await resolveAddress(client, 'Validators'),
    abi: validatorsABI,
    client,
  })
}

export const getEpochManagerContract = async (client: PublicClient): Promise<EpochManager> => {
  return getContract({
    address: await resolveAddress(client, 'EpochManager'),
    abi: epochManagerABI,
    client,
  })
}

export type AccountsContract = GetContractReturnType<typeof accountsABI, PublicClient>
export type GovernanceContract = GetContractReturnType<typeof governanceABI, PublicClient>
export type LockedGoldContract = GetContractReturnType<typeof lockedGoldABI, PublicClient>
export type ValidatorsContract = GetContractReturnType<typeof validatorsABI, PublicClient>
export type EpochManager = GetContractReturnType<typeof epochManagerABI, PublicClient>
