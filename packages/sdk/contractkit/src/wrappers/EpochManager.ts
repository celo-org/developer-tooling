import { EpochManager } from '@celo/abis-12/web3/EpochManager'
import BigNumber from 'bignumber.js'
import { proxyCall } from './BaseWrapper'
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
 * Contract handling slashing for Validator downtime using intervals.
 */
export class EpochManagerWrapper extends BaseWrapperForGoverning<EpochManager> {
  private ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'

  startNextEpochProcess: () => Promise<void> = proxyCall(
    this.contract.methods.startNextEpochProcess
  )
  isTimeForNextEpoch: () => Promise<boolean> = proxyCall(this.contract.methods.isTimeForNextEpoch)
  getElected: () => Promise<string[]> = proxyCall(this.contract.methods.getElected)
  getEpochProcessingStatus: () => Promise<EpochProcessState> = async () => {
    const statusRaw = await this.contract.methods.epochProcessing().call()
    return {
      status: parseInt(statusRaw.status),
      perValidatorReward: new BigNumber(statusRaw.perValidatorReward),
      totalRewardsVoter: new BigNumber(statusRaw.totalRewardsVoter),
      totalRewardsCommunity: new BigNumber(statusRaw.totalRewardsCommunity),
      totalRewardsCarbonFund: new BigNumber(statusRaw.totalRewardsCarbonFund),
      toProcessGroups: parseInt(statusRaw.toProcessGroups),
    }
  }
  finishNextEpochProcess: (
    groups: string[],
    lessers: string[],
    greaters: string[]
  ) => Promise<void> = proxyCall(this.contract.methods.finishNextEpochProcess)

  finishNextEpochProcessH: () => Promise<void> = async () => {
    const electedPromise = this.getElected()
    const electionPromise = this.contracts.getElection()
    const epochProcessStatePromise = this.getEpochProcessingStatus()

    const elected = await electedPromise
    const election = await electionPromise
    const epochProcessState = await epochProcessStatePromise

    const currentVotesPromise = await election.getEligibleValidatorGroupsVotes()

    const groupsWithRewards = await Promise.all(
      elected.map(async (group) => {
        const groupScore = new BigNumber(10) // TODO: use score manager
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

    let previousGroup = this.ZERO_ADDRESS

    const groups = []
    const lessers = []
    const greaters = []

    for (let i = 0; i < groupsNewTotalSorted.length; i++) {
      const group = groupsNewTotalSorted[i]
      currentVotesMap.delete(group.group)

      groups.push(group.group)
      lessers.push(previousGroup)
      greaters.push(
        i == groupsNewTotalSorted.length - 1
          ? this.ZERO_ADDRESS
          : currentVotesMap.keys().next().value
      )

      previousGroup = group.group
    }

    await this.finishNextEpochProcess(groups, lessers, greaters)
  }
}

export type EpochManagerWrapperType = EpochManagerWrapper
