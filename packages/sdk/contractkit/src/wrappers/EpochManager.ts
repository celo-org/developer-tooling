import { EpochManager } from '@celo/abis-12/web3/EpochManager'
import { NULL_ADDRESS } from '@celo/base'
import BigNumber from 'bignumber.js'
import { proxyCall, proxySend } from './BaseWrapper'
import { BaseWrapperForGoverning } from './BaseWrapperForGoverning'
import { ValidatorGroupVote } from './Election'

export enum EpochProcessStatus {
  NotStarted,
  Started,
}

export interface EpochProcessState {
  status: EpochProcessStatus
  perValidatorReward: BigNumber
  totalRewardsVoter: BigNumber
  totalRewardsCommunity: BigNumber
  totalRewardsCarbonFund: BigNumber
  toProcessGroups: number
}

/**
 * Contract handling epoch management.
 */
export class EpochManagerWrapper extends BaseWrapperForGoverning<EpochManager> {
  isTimeForNextEpoch = proxyCall(this.contract.methods.isTimeForNextEpoch)
  getElected = proxyCall(this.contract.methods.getElected)
  getEpochProcessingStatus = proxyCall(
    this.contract.methods.epochProcessing,
    undefined,
    (result): EpochProcessState => {
      return {
        status: parseInt(result.status),
        perValidatorReward: new BigNumber(result.perValidatorReward),
        totalRewardsVoter: new BigNumber(result.totalRewardsVoter),
        totalRewardsCommunity: new BigNumber(result.totalRewardsCommunity),
        totalRewardsCarbonFund: new BigNumber(result.totalRewardsCarbonFund),
        toProcessGroups: parseInt(result.toProcessGroups),
      }
    }
  )

  startNextEpochProcess = proxySend(this.connection, this.contract.methods.startNextEpochProcess)
  finishNextEpochProcess = proxySend(this.connection, this.contract.methods.finishNextEpochProcess)

  prepareFinishNextEpochProcessTx = async () => {
    const scoreManager = await this.contracts.getScoreManager()
    const elected = await this.getElected()
    const epochProcessState = await this.getEpochProcessingStatus()
    const election = await this.contracts.getElection()
    const currentVotesPromise = await election.getEligibleValidatorGroupsVotes()

    const groupsWithRewards = await Promise.all(
      elected.map(async (group) => {
        const groupScore = await scoreManager.getGroupScore(group)
        const rewards = await election.getGroupEpochRewards(
          group,
          epochProcessState.totalRewardsVoter,
          groupScore
        )
        return {
          group,
          rewards,
        }
      })
    )

    const currentVotes = await currentVotesPromise
    const currentVotesMap = new Map<string, ValidatorGroupVote>()

    for (const currentVote of currentVotes) {
      currentVotesMap.set(currentVote.address, currentVote)
    }

    const groupsNewTotal = new Map(
      groupsWithRewards
        .map((gwr) => ({
          group: gwr.group,
          total: currentVotesMap.has(gwr.group)
            ? currentVotesMap.get(gwr.group)!.votes.plus(gwr.rewards)
            : gwr.rewards,
        }))
        .map((object) => {
          return [object.group, object]
        })
    )

    const groupsNewTotalSorted = Array.from(groupsNewTotal.values()).sort((a, b) =>
      b.total.comparedTo(a.total)
    )

    let previousGroup = NULL_ADDRESS

    const groups = []
    const lessers = []
    const greaters = []

    for (let i = 0; i < groupsNewTotalSorted.length; i++) {
      const group = groupsNewTotalSorted[i]
      currentVotesMap.delete(group.group)

      groups.push(group.group)
      lessers.push(previousGroup)
      greaters.push(
        i == groupsNewTotalSorted.length - 1 ? NULL_ADDRESS : currentVotesMap.keys().next().value
      )

      previousGroup = group.group
    }

    return this.finishNextEpochProcess(groups, lessers, greaters)
  }
}

export type EpochManagerWrapperType = EpochManagerWrapper
