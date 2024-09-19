import { EpochManager } from '@celo/abis-12/web3/EpochManager'
import BigNumber from 'bignumber.js'
import { proxyCall, proxySend } from './BaseWrapper'
import { BaseWrapperForGoverning } from './BaseWrapperForGoverning'

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

  finishNextEpochProcessTx = async () => {
    const elected = await this.getElected()
    const validators = await this.contracts.getValidators()

    const electedGroups = new Set(
      await Promise.all(elected.map(async (validator) => validators.getValidatorsGroup(validator)))
    )
    const groups = Array.from(electedGroups)

    const [lessers, greaters] = await this.getLessersAndGreaters(groups)

    for (let i = 0; i < groups.length; i++) {
      console.log(`Group: ${groups[i]} - Lesser: ${lessers[i]} - Greater: ${greaters[i]}`)
    }

    return this.finishNextEpochProcess(groups, lessers, greaters)
  }

  getLessersAndGreaters = async (groups: string[]) => {
    const zeroAddress = '0x0000000000000000000000000000000000000000'
    const scoreManager = await this.contracts.getScoreManager()
    const election = await this.contracts.getElection()

    const processingStatus = await this.getEpochProcessingStatus()
    const groupWithVotes = await election.getEligibleValidatorGroupsVotes()

    const lessers: string[] = new Array(groups.length)
    const greaters: string[] = new Array(groups.length)

    const rewards: BigNumber[] = new Array(groups.length)

    for (let i = 0; i < groups.length; i++) {
      const groupScore = await scoreManager.getGroupScore(groups[i])
      rewards[i] = await election.getGroupEpochRewards(
        groups[i],
        processingStatus.totalRewardsVoter,
        groupScore
      )
    }

    for (let i = 0; i < groups.length; i++) {
      const reward = rewards[i]

      for (let j = 0; j < groupWithVotes.length; j++) {
        if (groupWithVotes[j].address === groups[i]) {
          groupWithVotes[j].votes.plus(reward)
          break
        }
      }

      groupWithVotes.sort((a, b) => (b.votes.gt(a.votes) ? 1 : b.votes.lt(a.votes) ? -1 : 0))

      let lesser = ''
      let greater = ''

      for (let j = 0; j < groupWithVotes.length; j++) {
        if (groupWithVotes[j].address === groups[i]) {
          greater = j === 0 ? zeroAddress : groupWithVotes[j - 1].address
          lesser = j === groupWithVotes.length - 1 ? zeroAddress : groupWithVotes[j + 1].address
          break
        }
      }

      lessers[i] = lesser
      greaters[i] = greater
    }

    return [lessers, greaters]
  }
}

export type EpochManagerWrapperType = EpochManagerWrapper
