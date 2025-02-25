import { accountsABI, governanceABI, lockedGoldABI, validatorsABI } from '@celo/abis-12'
import { getContract, GetContractReturnType } from 'viem'
import { resolveAddress } from './address-resolver'
import { CeloClient, getClient } from './client'

// TODO a bit of redundancy here for typing, find a way to generalise this

export const getAccountsContract = async (): Promise<AccountsContract> => {
  return getContract({
    address: await resolveAddress('Accounts'),
    abi: accountsABI,
    client: getClient(),
  })
}

export const getGovernanceContract = async (): Promise<GovernanceContract> => {
  return getContract({
    address: await resolveAddress('Governance'),
    abi: governanceABI,
    client: getClient(),
  })
}

export const getLockedGoldContract = async (): Promise<LockedGoldContract> => {
  return getContract({
    address: await resolveAddress('LockedGold'),
    abi: lockedGoldABI,
    client: getClient(),
  })
}

export const getValidatorsContract = async (): Promise<ValidatorsContract> => {
  return getContract({
    address: await resolveAddress('Validators'),
    abi: validatorsABI,
    client: getClient(),
  })
}

// TODO a way to generalise this?
export type AccountsContract = GetContractReturnType<typeof accountsABI, CeloClient>
export type GovernanceContract = GetContractReturnType<typeof governanceABI, CeloClient>
export type LockedGoldContract = GetContractReturnType<typeof lockedGoldABI, CeloClient>
export type ValidatorsContract = GetContractReturnType<typeof validatorsABI, CeloClient>
