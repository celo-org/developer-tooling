import { EpochManager } from '@celo/abis-12/web3/EpochManager'
import { NULL_ADDRESS } from '@celo/base'
import BigNumber from 'bignumber.js'
import { proxyCall, proxySend, valueToInt } from './BaseWrapper'
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
}

export interface EpochManagerConfig {
  currentEpochNumber: number
  epochDuration: number
  isTimeForNextEpoch: boolean
}

/**
 * Contract handling epoch management.
 */
export class EpochManagerWrapper extends BaseWrapperForGoverning<EpochManager> {
  epochDuration = proxyCall(this.contract.methods.epochDuration, undefined, valueToInt)
  firstKnownEpoch = proxyCall(this.contract.methods.firstKnownEpoch, undefined, valueToInt)
  getCurrentEpochNumber = proxyCall(
    this.contract.methods.getCurrentEpochNumber,
    undefined,
    valueToInt
  )
  getFirstBlockAtEpoch = proxyCall(
    this.contract.methods.getFirstBlockAtEpoch,
    undefined,
    valueToInt
  )
  getLastBlockAtEpoch = proxyCall(this.contract.methods.getLastBlockAtEpoch, undefined, valueToInt)
  getEpochNumberOfBlock = proxyCall(
    this.contract.methods.getEpochNumberOfBlock,
    undefined,
    valueToInt
  )
  isOnEpochProcess = proxyCall(this.contract.methods.isOnEpochProcess)
  isTimeForNextEpoch = proxyCall(this.contract.methods.isTimeForNextEpoch)
  getElectedAccounts = proxyCall(this.contract.methods.getElectedAccounts)
  getElectedSigners = proxyCall(this.contract.methods.getElectedSigners)
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
      }
    }
  )

  startNextEpochProcess = proxySend(this.connection, this.contract.methods.startNextEpochProcess)
  finishNextEpochProcess = proxySend(this.connection, this.contract.methods.finishNextEpochProcess)
  sendValidatorPayment = proxySend(this.connection, this.contract.methods.sendValidatorPayment)
  setToProcessGroups = proxySend(this.connection, this.contract.methods.setToProcessGroups)
  processGroups = proxySend(this.connection, this.contract.methods.processGroups)

  finishNextEpochProcessTx = async () => {
    const { groups, lessers, greaters } = await this.getEpochGroupsAndSorting()
    return this.finishNextEpochProcess(groups, lessers, greaters)
  }

  processGroupsTx = async () => {
    const { groups, lessers, greaters } = await this.getEpochGroupsAndSorting()
    return this.processGroups(groups, lessers, greaters)
  }

  getLessersAndGreaters = async (groups: string[]) => {
    const scoreManager = await this.contracts.getScoreManager()
    const election = await this.contracts.getElection()

    const processingStatusPromise = this.getEpochProcessingStatus()
    const groupWithVotesPromise = election.getEligibleValidatorGroupsVotes()

    const lessers: string[] = new Array(groups.length)
    const greaters: string[] = new Array(groups.length)
    const rewards = await Promise.all(
      groups.map(async (group) => {
        const groupScore = await scoreManager.getGroupScore(group)
        return await election.getGroupEpochRewards(
          group,
          (
            await processingStatusPromise
          ).totalRewardsVoter,
          groupScore
        )
      })
    )

    const groupWithVotes = await groupWithVotesPromise

    for (let i = 0; i < groups.length; i++) {
      const reward = rewards[i]

      for (let j = 0; j < groupWithVotes.length; j++) {
        if (groupWithVotes[j].address === groups[i]) {
          groupWithVotes[j].votes.plus(reward)
          break
        }
      }

      groupWithVotes.sort((a, b) => (b.votes.gt(a.votes) ? 1 : b.votes.lt(a.votes) ? -1 : 0))

      for (let j = 0; j < groupWithVotes.length; j++) {
        if (groupWithVotes[j].address === groups[i]) {
          greaters[i] = j === 0 ? NULL_ADDRESS : groupWithVotes[j - 1].address
          lessers[i] =
            j === groupWithVotes.length - 1 ? NULL_ADDRESS : groupWithVotes[j + 1].address
          break
        }
      }
    }

    return [lessers, greaters]
  }

  getEpochGroupsAndSorting = async () => {
    const elected = await this.getElectedAccounts()
    const validators = await this.contracts.getValidators()

    const electedGroups = new Set(
      await Promise.all(elected.map(async (validator) => validators.getValidatorsGroup(validator)))
    )
    const groups = Array.from(electedGroups)
    const [lessers, greaters] = await this.getLessersAndGreaters(groups)

    return { groups, lessers, greaters }
  }

  async getConfig(): Promise<EpochManagerConfig> {
    const currentEpochNumber = await this.getCurrentEpochNumber()
    const epochDuration = await this.epochDuration()
    const isTimeForNextEpoch = await this.isTimeForNextEpoch()

    return {
      currentEpochNumber,
      epochDuration,
      isTimeForNextEpoch,
    }
  }
}

export type EpochManagerWrapperType = EpochManagerWrapper
