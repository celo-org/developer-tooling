import { accountsABI, governanceABI, lockedGoldABI, validatorsABI } from '@celo/abis-12'
import { getContract, GetContractReturnType } from 'viem'
import { resolveAddress } from './address-resolver'
import { CeloClient } from './client'

// TODO a bit of redundancy here for typing, find a way to generalise this

export const getAccountsContract = async (client: CeloClient): Promise<AccountsContract> => {
  return getContract({
    address: await resolveAddress(client, 'Accounts'),
    abi: accountsABI,
    client,
  })
}

export const getGovernanceContract = async (client: CeloClient): Promise<GovernanceContract> => {
  return getContract({
    address: await resolveAddress(client, 'Governance'),
    abi: governanceABI,
    client,
  })
}

export const getLockedGoldContract = async (client: CeloClient): Promise<LockedGoldContract> => {
  return getContract({
    address: await resolveAddress(client, 'LockedGold'),
    abi: lockedGoldABI,
    client,
  })
}

export const getValidatorsContract = async (client: CeloClient): Promise<ValidatorsContract> => {
  return getContract({
    address: await resolveAddress(client, 'Validators'),
    abi: validatorsABI,
    client,
  })
}

// TODO a way to generalise this?
export type AccountsContract = GetContractReturnType<typeof accountsABI, CeloClient>
export type GovernanceContract = GetContractReturnType<typeof governanceABI, CeloClient>
export type LockedGoldContract = GetContractReturnType<typeof lockedGoldABI, CeloClient>
export type ValidatorsContract = GetContractReturnType<typeof validatorsABI, CeloClient>
