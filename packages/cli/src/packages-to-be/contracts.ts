import { accountsABI, governanceABI, lockedGoldABI, validatorsABI } from '@celo/abis-12'
import { getContract, GetContractReturnType, PublicClient } from 'viem'
import { resolveAddress } from './address-resolver'

// TODO a bit of redundancy here for typing, find a way to generalise this
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

// TODO a way to generalise this?
export type AccountsContract = GetContractReturnType<typeof accountsABI, PublicClient>
export type GovernanceContract = GetContractReturnType<typeof governanceABI, PublicClient>
export type LockedGoldContract = GetContractReturnType<typeof lockedGoldABI, PublicClient>
export type ValidatorsContract = GetContractReturnType<typeof validatorsABI, PublicClient>
