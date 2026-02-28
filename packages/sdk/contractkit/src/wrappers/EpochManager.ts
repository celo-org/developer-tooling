import { epochManagerABI } from '@celo/abis'
import { NULL_ADDRESS } from '@celo/base'
import { CeloTx, CeloContract } from '@celo/connect'
import BigNumber from 'bignumber.js'
import { toViemAddress, toViemBigInt, valueToInt } from './BaseWrapper'
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
  epochDuration = async () => {
    const res = await this.contract.read.epochDuration()
    return valueToInt(res.toString())
  }
  firstKnownEpoch = async () => {
    const res = await this.contract.read.firstKnownEpoch()
    return valueToInt(res.toString())
  }
  getCurrentEpochNumber = async () => {
    const res = await this.contract.read.getCurrentEpochNumber()
    return valueToInt(res.toString())
  }
  getFirstBlockAtEpoch = async (epoch: BigNumber.Value) => {
    const res = await this.contract.read.getFirstBlockAtEpoch([toViemBigInt(epoch)])
    return valueToInt(res.toString())
  }
  getLastBlockAtEpoch = async (epoch: BigNumber.Value) => {
    const res = await this.contract.read.getLastBlockAtEpoch([toViemBigInt(epoch)])
    return valueToInt(res.toString())
  }
  getEpochNumberOfBlock = async (blockNumber: BigNumber.Value) => {
    const res = await this.contract.read.getEpochNumberOfBlock([toViemBigInt(blockNumber)])
    return valueToInt(res.toString())
  }
  processedGroups = async (group: string) => {
    const res = await this.contract.read.processedGroups([toViemAddress(group)])
    return res.toString()
  }
  isOnEpochProcess = async (): Promise<boolean> => {
    return this.contract.read.isOnEpochProcess()
  }
  isEpochProcessingStarted = async (): Promise<boolean> => {
    return this.contract.read.isEpochProcessingStarted()
  }
  isIndividualProcessing = async (): Promise<boolean> => {
    return this.contract.read.isIndividualProcessing()
  }
  isTimeForNextEpoch = async (): Promise<boolean> => {
    return this.contract.read.isTimeForNextEpoch()
  }
  getElectedAccounts = async (): Promise<string[]> => {
    const res = await this.contract.read.getElectedAccounts()
    return [...res] as string[]
  }
  getElectedSigners = async (): Promise<string[]> => {
    const res = await this.contract.read.getElectedSigners()
    return [...res] as string[]
  }
  getEpochProcessingStatus = async (): Promise<EpochProcessState> => {
    const result = await this.contract.read.epochProcessing()
    return {
      status: Number(result[0]),
      perValidatorReward: new BigNumber(result[1].toString()),
      totalRewardsVoter: new BigNumber(result[2].toString()),
      totalRewardsCommunity: new BigNumber(result[3].toString()),
      totalRewardsCarbonFund: new BigNumber(result[4].toString()),
    }
  }

  startNextEpochProcess = (txParams?: Omit<CeloTx, 'data'>) =>
    this.sendTx('startNextEpochProcess', [], txParams)
  finishNextEpochProcess = (
    groups: string[],
    lessers: string[],
    greaters: string[],
    txParams?: Omit<CeloTx, 'data'>
  ) => this.sendTx('finishNextEpochProcess', [groups, lessers, greaters], txParams)
  sendValidatorPayment = (validator: string, txParams?: Omit<CeloTx, 'data'>) =>
    this.sendTx('sendValidatorPayment', [validator], txParams)
  setToProcessGroups = (txParams?: Omit<CeloTx, 'data'>) =>
    this.sendTx('setToProcessGroups', [], txParams)
  processGroups = (
    groups: string[],
    lessers: string[],
    greaters: string[],
    txParams?: Omit<CeloTx, 'data'>
  ) => this.sendTx('processGroups', [groups, lessers, greaters], txParams)

  startNextEpochProcessTx = async (
    txParams?: Omit<CeloTx, 'data'>
  ): Promise<`0x${string}` | undefined> => {
    // check that the epoch process is not already started
    const isEpochProcessStarted = await this.isOnEpochProcess()
    if (isEpochProcessStarted) {
      console.warn('Epoch process has already started.')
      return
    }
    return this.startNextEpochProcess(txParams)
  }

  finishNextEpochProcessTx = async (txParams?: Omit<CeloTx, 'data'>): Promise<`0x${string}`> => {
    const { groups, lessers, greaters } = await this.getEpochGroupsAndSorting()

    return this.finishNextEpochProcess(groups, lessers, greaters, txParams)
  }

  processGroupsTx = async (txParams?: Omit<CeloTx, 'data'>): Promise<`0x${string}`> => {
    const { groups, lessers, greaters } = await this.getEpochGroupsAndSorting()

    return this.processGroups(groups, lessers, greaters, txParams)
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
