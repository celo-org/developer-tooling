import { EpochManager } from '@celo/abis/web3/EpochManager'
import { NULL_ADDRESS } from '@celo/base'
import BigNumber from 'bignumber.js'
import { proxyCall, proxySend, valueToInt, valueToString } from './BaseWrapper'
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
  public get _contract() {
    return this.contract
  }
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
  processedGroups = proxyCall(this.contract.methods.processedGroups, undefined, valueToString)
  isOnEpochProcess = proxyCall(this.contract.methods.isOnEpochProcess)
  isEpochProcessingStarted = proxyCall(this.contract.methods.isEpochProcessingStarted)
  isIndividualProcessing = proxyCall(this.contract.methods.isIndividualProcessing)
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

  startNextEpochProcessTx = async () => {
    // check that the epoch process is not already started
    const isEpochProcessStarted = await this.isOnEpochProcess()
    if (isEpochProcessStarted) {
      console.warn('Epoch process has already started.')
      return
    }
    return this.startNextEpochProcess()
  }

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
          (await processingStatusPromise).totalRewardsVoter,
          groupScore
        )
      })
    )

    const groupWithVotes = await groupWithVotesPromise
    const groupWithVotesMap = new Map<string, { address: string; votes: BigNumber }>(
      groupWithVotes.map((group) => [group.address, group])
    )

    const missingGroups = groups.filter((group) => !groupWithVotesMap.has(group))

    const missingGroupsLoaded = await Promise.all(
      missingGroups.map(async (group) => {
        const votes = await election.getTotalVotesForGroup(group)
        return { group, votes }
      })
    )

    for (const group of missingGroupsLoaded) {
      groupWithVotes.push({ address: group.group, votes: group.votes } as ValidatorGroupVote)
    }

    for (let i = 0; i < groups.length; i++) {
      const reward = rewards[i]

      // biome-ignore lint/style/useForOf: unsure why we need it do it this way
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
    const electedGroups = Array.from(
      new Set(
        await Promise.all(
          elected.map(async (validator) => validators.getMembershipInLastEpoch(validator))
        )
      )
    )

    const groupProcessedEvents = await this.contract.getPastEvents('GroupProcessed', {
      // We need +1 because events are emitted on the first block of the new epoch
      fromBlock: (await this.getFirstBlockAtEpoch(await this.getCurrentEpochNumber())) + 1,
    })

    // Filter out groups that have been processed
    const groups = electedGroups.filter((group) => {
      return !groupProcessedEvents.some((event) => event.returnValues.group === group)
    })

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
