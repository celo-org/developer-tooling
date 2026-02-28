import { epochManagerABI } from '@celo/abis'
import { NULL_ADDRESS } from '@celo/base'
import { CeloTransactionObject, CeloContract } from '@celo/connect'
import BigNumber from 'bignumber.js'
import { proxyCall, proxySend, valueToInt } from './BaseWrapper'
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
export class EpochManagerWrapper extends BaseWrapperForGoverning<typeof epochManagerABI> {
  public get _contract(): CeloContract<typeof epochManagerABI> {
    return this.contract
  }
  epochDuration = proxyCall(this.contract, 'epochDuration', undefined, (res) =>
    valueToInt(res.toString())
  )
  firstKnownEpoch = proxyCall(this.contract, 'firstKnownEpoch', undefined, (res) =>
    valueToInt(res.toString())
  )
  getCurrentEpochNumber = proxyCall(this.contract, 'getCurrentEpochNumber', undefined, (res) =>
    valueToInt(res.toString())
  )
  getFirstBlockAtEpoch = proxyCall(this.contract, 'getFirstBlockAtEpoch', undefined, (res) =>
    valueToInt(res.toString())
  )
  getLastBlockAtEpoch = proxyCall(this.contract, 'getLastBlockAtEpoch', undefined, (res) =>
    valueToInt(res.toString())
  )
  getEpochNumberOfBlock = proxyCall(this.contract, 'getEpochNumberOfBlock', undefined, (res) =>
    valueToInt(res.toString())
  )
  processedGroups = proxyCall(this.contract, 'processedGroups', undefined, (res) => res.toString())
  isOnEpochProcess: () => Promise<boolean> = proxyCall(this.contract, 'isOnEpochProcess')
  isEpochProcessingStarted: () => Promise<boolean> = proxyCall(
    this.contract,
    'isEpochProcessingStarted'
  )
  isIndividualProcessing: () => Promise<boolean> = proxyCall(
    this.contract,
    'isIndividualProcessing'
  )
  isTimeForNextEpoch: () => Promise<boolean> = proxyCall(this.contract, 'isTimeForNextEpoch')
  getElectedAccounts: () => Promise<string[]> = proxyCall(
    this.contract,
    'getElectedAccounts',
    undefined,
    (res) => [...res] as string[]
  )
  getElectedSigners: () => Promise<string[]> = proxyCall(
    this.contract,
    'getElectedSigners',
    undefined,
    (res) => [...res] as string[]
  )
  getEpochProcessingStatus = proxyCall(
    this.contract,
    'epochProcessing',
    undefined,
    (result): EpochProcessState => {
      return {
        status: Number(result[0]),
        perValidatorReward: new BigNumber(result[1].toString()),
        totalRewardsVoter: new BigNumber(result[2].toString()),
        totalRewardsCommunity: new BigNumber(result[3].toString()),
        totalRewardsCarbonFund: new BigNumber(result[4].toString()),
      }
    }
  )

  startNextEpochProcess: () => CeloTransactionObject<void> = proxySend(
    this.connection,
    this.contract,
    'startNextEpochProcess'
  )
  finishNextEpochProcess: (
    groups: string[],
    lessers: string[],
    greaters: string[]
  ) => CeloTransactionObject<void> = proxySend(
    this.connection,
    this.contract,
    'finishNextEpochProcess'
  )
  sendValidatorPayment: (validator: string) => CeloTransactionObject<void> = proxySend(
    this.connection,
    this.contract,
    'sendValidatorPayment'
  )
  setToProcessGroups: () => CeloTransactionObject<void> = proxySend(
    this.connection,
    this.contract,
    'setToProcessGroups'
  )
  processGroups: (
    groups: string[],
    lessers: string[],
    greaters: string[]
  ) => CeloTransactionObject<void> = proxySend(this.connection, this.contract, 'processGroups')

  startNextEpochProcessTx = async (): Promise<CeloTransactionObject<void> | undefined> => {
    // check that the epoch process is not already started
    const isEpochProcessStarted = await this.isOnEpochProcess()
    if (isEpochProcessStarted) {
      console.warn('Epoch process has already started.')
      return
    }
    return this.startNextEpochProcess()
  }

  finishNextEpochProcessTx = async (): Promise<CeloTransactionObject<void>> => {
    const { groups, lessers, greaters } = await this.getEpochGroupsAndSorting()

    return this.finishNextEpochProcess(groups, lessers, greaters)
  }

  processGroupsTx = async (): Promise<CeloTransactionObject<void>> => {
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
          elected.map(async (validator: string) => validators.getMembershipInLastEpoch(validator))
        )
      )
    )

    const groupProcessedEvents = await this.getPastEvents('GroupProcessed', {
      // We need +1 because events are emitted on the first block of the new epoch
      fromBlock: (await this.getFirstBlockAtEpoch(await this.getCurrentEpochNumber())) + 1,
    })

    // Filter out groups that have been processed
    const groups = electedGroups.filter((group) => {
      return !groupProcessedEvents.some((event: any) => event.returnValues.group === group)
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
