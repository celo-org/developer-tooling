import { lockedGoldABI, validatorsABI } from '@celo/abis-12'
import { StrongAddress } from '@celo/base'
import { resolveAddress } from './address-resolver'
import { getClient } from './client'

export const meetsValidatorBalanceRequirements = async (address: StrongAddress) => {
  const client = getClient()
  const accountTotalLockedGold = await client.readContract({
    abi: lockedGoldABI,
    address: await resolveAddress('LockedGold'),
    functionName: 'getAccountTotalLockedGold',
    args: [address],
  })
  const validatorLockedGoldRequirements = await client.readContract({
    abi: validatorsABI,
    address: await resolveAddress('Validators'),
    functionName: 'getValidatorLockedGoldRequirements',
  })

  // TODO: check BigNumber vs biging
  return validatorLockedGoldRequirements[1] <= accountTotalLockedGold
}
