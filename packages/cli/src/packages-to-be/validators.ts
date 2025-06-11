import { accountsABI, lockedGoldABI, validatorsABI } from '@celo/abis'
import { PublicCeloClient, resolveAddress } from '@celo/actions'
import { getScoreManagerContract } from '@celo/actions/contracts/score-manager'
import { getValidatorsContract } from '@celo/actions/contracts/validators'
import { Address, concurrentMap, ensureLeading0x, eqAddress, StrongAddress } from '@celo/base'
import { fromFixed } from '@celo/utils/lib/fixidity'
import BigNumber from 'bignumber.js'
import { bigintToBigNumber } from './utils'

export interface Validator {
  name: string
  address: StrongAddress
  ecdsaPublicKey: string
  blsPublicKey: string
  affiliation: StrongAddress | null
  score: BigNumber
  signer: Address
}
export interface ValidatorGroup {
  name: string
  address: Address
  members: Address[]
  membersUpdated: number
  affiliates: StrongAddress[]
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

export const getValidatorLockedGoldRequirements = async (client: PublicCeloClient) => {
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
  client: PublicCeloClient,
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
  client: PublicCeloClient,
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

/* 
  @param validatorAddress - address of validator/community-rpc node affiliated with an Group
  @returns the group the given address is affiliated with
 */
export async function getValidatorsGroup(
  client: PublicCeloClient,
  validatorAddress: StrongAddress
): Promise<StrongAddress> {
  const contract = await getValidatorsContract({ public: client })
  return contract.read.getValidatorsGroup([validatorAddress])
}

/* 
  @param address - address of a group
  @returns group info including name, commission, affiliates + members and slash data. 
 */
export const getValidatorGroup = async (
  client: PublicCeloClient,
  address: Address,
  getAffiliates: boolean = true,
  blockNumber?: number
) => {
  const validatorGroupTuple = await client.readContract({
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
      .filter((v) => !validatorGroupTuple[0].includes(v.address as StrongAddress))
  }
  return {
    name,
    address,
    members: Array.from(validatorGroupTuple[0]),
    commission: fromFixed(bigintToBigNumber(validatorGroupTuple[1])),
    nextCommission: fromFixed(bigintToBigNumber(validatorGroupTuple[2])),
    nextCommissionBlock: bigintToBigNumber(validatorGroupTuple[3]),
    membersUpdated: bigintToBigNumber(
      validatorGroupTuple[4].reduce((a: bigint, b: bigint) => (a < b ? b : a), 0n)
    ),
    affiliates: affiliates.map((v) => v.address),
    slashingMultiplier: fromFixed(bigintToBigNumber(validatorGroupTuple[5])),
    lastSlashed: bigintToBigNumber(validatorGroupTuple[6]),
  }
}

export const getRegisteredValidators = async (
  client: PublicCeloClient,
  blockNumber?: number
): Promise<Validator[]> => {
  const vgAddresses = await getRegisteredValidatorsAddresses(client, blockNumber)

  return concurrentMap(10, vgAddresses, (address) => getValidator(client, address, blockNumber))
}

export const getRegisteredValidatorsAddresses = async (
  client: PublicCeloClient,
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
  client: PublicCeloClient,
  address: Address,
  blockNumber?: number
): Promise<Validator> => {
  const [validatorsAddress, accountsAddress, scoreManager] = await Promise.all([
    resolveAddress(client, 'Validators'),
    resolveAddress(client, 'Accounts'),
    getScoreManagerContract({ public: client }),
  ])

  const atBlockNumber = typeof blockNumber === 'undefined' ? undefined : BigInt(blockNumber)

  const [validatorTuple, name, score] = await Promise.all([
    client.readContract({
      address: validatorsAddress,
      abi: validatorsABI,
      functionName: 'getValidator',
      args: [address as StrongAddress],
      blockNumber: atBlockNumber,
    }),
    client.readContract({
      address: accountsAddress,
      abi: accountsABI,
      functionName: 'getName',
      args: [address as StrongAddress],
      blockNumber: atBlockNumber,
    }),
    scoreManager.read.getValidatorScore([address as StrongAddress], { blockNumber: atBlockNumber }),
  ])

  return {
    name,
    address: ensureLeading0x(address),
    ecdsaPublicKey: validatorTuple[0],
    blsPublicKey: validatorTuple[1],
    affiliation: validatorTuple[2],
    signer: validatorTuple[4],
    score: bigintToBigNumber(score),
  }
}

export const getValidatorMembershipHistoryExtraData = async (
  client: PublicCeloClient,
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
