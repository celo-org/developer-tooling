import { accountsABI, lockedGoldABI, validatorsABI } from '@celo/abis-12'
import { Address, concurrentMap, eqAddress, StrongAddress } from '@celo/base'
import { fromFixed } from '@celo/utils/lib/fixidity'
import BigNumber from 'bignumber.js'
import { PublicClient } from 'viem'
import { resolveAddress } from './address-resolver'
import { bigintToBigNumber } from './utils'

export interface Validator {
  name: string
  address: Address
  ecdsaPublicKey: string
  blsPublicKey: string
  affiliation: string | null
  score: BigNumber
  signer: Address
}
export interface ValidatorGroup {
  name: string
  address: Address
  members: Address[]
  membersUpdated: number
  affiliates: Address[]
  commission: BigNumber
  nextCommission: BigNumber
  nextCommissionBlock: BigNumber
  lastSlashed: BigNumber
  slashingMultiplier: BigNumber
}

export interface MembershipHistoryExtraData {
  lastRemovedFromGroupTimestamp: number
  tail: number
}

export const getValidatorLockedGoldRequirements = async (client: PublicClient) => {
  const requirements = await client.readContract({
    address: await resolveAddress(client, 'Validators'),
    abi: validatorsABI,
    functionName: 'getValidatorLockedGoldRequirements',
  })

  return {
    value: bigintToBigNumber(requirements[0]),
    duration: bigintToBigNumber(requirements[1]),
  }
}

export const meetsValidatorBalanceRequirements = async (
  client: PublicClient,
  address: StrongAddress
) => {
  const accountTotalLockedGold = await client.readContract({
    abi: lockedGoldABI,
    address: await resolveAddress(client, 'LockedGold'),
    functionName: 'getAccountTotalLockedGold',
    args: [address],
  })
  const validatorLockedGoldRequirements = await client.readContract({
    abi: validatorsABI,
    address: await resolveAddress(client, 'Validators'),
    functionName: 'getValidatorLockedGoldRequirements',
  })

  return validatorLockedGoldRequirements[1] <= accountTotalLockedGold
}

export const meetsValidatorGroupBalanceRequirements = async (
  client: PublicClient,
  address: StrongAddress
) => {
  const accountTotalLockedGold = await client.readContract({
    abi: lockedGoldABI,
    address: await resolveAddress(client, 'LockedGold'),
    functionName: 'getAccountTotalLockedGold',
    args: [address],
  })
  const validatorLockedGoldRequirements = await client.readContract({
    abi: validatorsABI,
    address: await resolveAddress(client, 'Validators'),
    functionName: 'getGroupLockedGoldRequirements',
  })

  return validatorLockedGoldRequirements[1] <= accountTotalLockedGold
}

export const getValidatorGroup = async (
  client: PublicClient,
  address: Address,
  getAffiliates: boolean = true,
  blockNumber?: number
) => {
  // TODO rename
  const res = await client.readContract({
    address: await resolveAddress(client, 'Validators'),
    abi: validatorsABI,
    functionName: 'getValidatorGroup',
    args: [address as StrongAddress],
    blockNumber: typeof blockNumber === 'undefined' ? undefined : BigInt(blockNumber),
  })
  const name = await client.readContract({
    address: await resolveAddress(client, 'Accounts'),
    abi: accountsABI,
    functionName: 'getName',
    args: [address as StrongAddress],
    blockNumber: typeof blockNumber === 'undefined' ? undefined : BigInt(blockNumber),
  })
  let affiliates: Validator[] = []
  if (getAffiliates) {
    const validators = await getRegisteredValidators(client, blockNumber)
    affiliates = validators
      .filter((v) => v.affiliation && eqAddress(v.affiliation, address))
      .filter((v) => !res[0].includes(v.address as StrongAddress))
  }
  return {
    name,
    address,
    members: Array.from(res[0]),
    commission: fromFixed(new BigNumber(res[1].toString())),
    nextCommission: fromFixed(new BigNumber(res[2].toString())),
    nextCommissionBlock: new BigNumber(res[3].toString()),
    // TODO expose in some utils the bigintToBigNumber and reuse it here instead of
    // casting back and forth
    membersUpdated: res[4]
      .map((value) => new BigNumber(value.toString()))
      .reduce((a: number, b: BigNumber.Value) => Math.max(a, new BigNumber(b).toNumber()), 0),
    affiliates: affiliates.map((v) => v.address),
    slashingMultiplier: fromFixed(new BigNumber(res[5].toString())),
    lastSlashed: new BigNumber(res[6].toString()),
  }
}

export const getRegisteredValidators = async (
  client: PublicClient,
  blockNumber?: number
): Promise<Validator[]> => {
  const vgAddresses = await getRegisteredValidatorsAddresses(client, blockNumber)

  return concurrentMap(10, vgAddresses, (address) => getValidator(client, address, blockNumber))
}

export const getRegisteredValidatorsAddresses = async (
  client: PublicClient,
  blockNumber?: number
): Promise<StrongAddress[]> => {
  return (await client.readContract({
    address: await resolveAddress(client, 'Validators'),
    abi: validatorsABI,
    functionName: 'getRegisteredValidators',
    blockNumber: typeof blockNumber === 'undefined' ? undefined : BigInt(blockNumber),
  })) as StrongAddress[]
}

export const getValidator = async (
  client: PublicClient,
  address: Address,
  blockNumber?: number
): Promise<Validator> => {
  const res = await client.readContract({
    address: await resolveAddress(client, 'Validators'),
    abi: validatorsABI,
    functionName: 'getValidator',
    args: [address as StrongAddress],
    blockNumber: typeof blockNumber === 'undefined' ? undefined : BigInt(blockNumber),
  })
  const name = await client.readContract({
    address: await resolveAddress(client, 'Accounts'),
    abi: accountsABI,
    functionName: 'getName',
    args: [address as StrongAddress],
    blockNumber: typeof blockNumber === 'undefined' ? undefined : BigInt(blockNumber),
  })

  return {
    name,
    address,
    ecdsaPublicKey: res[0],
    blsPublicKey: res[1],
    affiliation: res[2],
    score: fromFixed(new BigNumber(res[3].toString())),
    signer: res[4],
  }
}

export const getValidatorMembershipHistoryExtraData = async (
  client: PublicClient,
  validator: StrongAddress
): Promise<MembershipHistoryExtraData> => {
  const history = await client.readContract({
    address: await resolveAddress(client, 'Validators'),
    abi: validatorsABI,
    functionName: 'getMembershipHistory',
    args: [validator],
  })

  return {
    lastRemovedFromGroupTimestamp: Number(history[2]),
    tail: Number(history[3]),
  }
}
