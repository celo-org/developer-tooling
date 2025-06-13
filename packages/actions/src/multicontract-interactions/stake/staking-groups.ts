import { concurrentMap } from '@celo/base/lib/async.js'
import { PublicCeloClient } from '../../client.js'
import { getAccountsContract } from '../../contracts/accounts.js'
import { getScoreManagerContract } from '../../contracts/score-manager.js'
import { getValidatorsContract } from '../../contracts/validators.js'

interface Options {
  withNames?: boolean
  withScores?: boolean
}

export async function getRegisteredStakingGroups(client: PublicCeloClient, options: Options = {}) {
  const validatorContract = await getValidatorsContract({ public: client })
  const accountsContract = await getAccountsContract({ public: client })
  const scoreManager = await getScoreManagerContract({ public: client })

  const addresses = await validatorContract.read.getRegisteredValidatorGroups()

  const groups = await concurrentMap(25, [...addresses], (addr) =>
    validatorContract.read.getValidatorGroup([addr])
  )

  let names: string[] = []
  let scores: bigint[] = []

  if (options.withNames) {
    names = await concurrentMap(25, [...addresses], (addr) => accountsContract.read.getName([addr]))
  }
  if (options.withScores) {
    scores = await concurrentMap(25, [...addresses], (addr) =>
      scoreManager.read.getGroupScore([addr])
    )
  }

  return groups.map((group, index) => {
    // rest of tuple is _nextCommission, _nextCommissionBlock, _membersUpdated, _slashingMultiplier, _lastSlashed
    const [members, commission] = group

    return {
      name: options.withNames ? names[index] : undefined,
      address: addresses[index],
      members,
      commission,
      score: options.withScores ? scores[index] : undefined,
    }
  })
}

export const getRegisteredValidatorGroups = getRegisteredStakingGroups
