import { downtimeSlasherABI } from '@celo/abis'
import { electionABI } from '@celo/abis-12'
import { Flags } from '@oclif/core'
import { BaseCommand } from '../../base'
import { CeloContract } from '../../packages-to-be/contracts'
import { fromFixed, multiplyByFixidityFraction } from '../../packages-to-be/fixidity'
import { DowntimeSlasherConfig, ElectionConfig } from '../../types/network-config'
import { printValueMapRecursive } from '../../utils/cli'
import { ViemCommand } from '../../viem'

type NetworkConfig = Record<string, Record<string, any>>

export default class Parameters extends ViemCommand {
  static description =
    'View parameters of the network, including but not limited to configuration for the various Celo core smart contracts.'

  static flags = {
    ...BaseCommand.flags,
    raw: Flags.boolean({
      description: 'Display raw numerical configuration',
      required: false,
      default: false,
    }),
  }

  async run() {
    const config = await this.buildConfig()

    printValueMapRecursive(config)
  }

  private async buildConfig(): Promise<NetworkConfig> {
    const res = await this.parse(Parameters)
    const promises = await this.getConfigPromises(!res.flags.raw)

    // TODO add error handling
    return Object.fromEntries(
      await Promise.all(
        Object.entries(promises).map(async ([contract, promise]) => {
          return [contract, await promise]
        })
      )
    )
  }

  private async getConfigPromises(humanReadable: boolean): Promise<Record<string, Promise<any>>> {
    // const client = await this.getPublicClient();
    // const addressResolver = await this.getAddressResolver();

    if (await this.isCel2()) {
      return {
        [CeloContract.Election]: this.getElectionConfig(humanReadable),
        // CeloContract.Governance,
        // CeloContract.LockedGold,
        // CeloContract.SortedOracles,
        // CeloContract.Reserve,
        // CeloContract.Validators,
        // CeloContract.DowntimeSlasher,
        // CeloContract.FeeCurrencyDirectory,
        // CeloContract.EpochManager,
      }
    } else {
      return {
        [CeloContract.Election]: this.getElectionConfig(humanReadable),
        [CeloContract.DowntimeSlasher]: this.getDowntimeSlasherConfig(humanReadable),
      }
      // configContracts = [
      //   CeloContract.Election,
      //   CeloContract.Attestations,
      //   CeloContract.Governance,
      //   CeloContract.LockedGold,
      //   CeloContract.SortedOracles,
      //   CeloContract.GasPriceMinimum,
      //   CeloContract.Reserve,
      //   CeloContract.Validators,
      //   CeloContract.DowntimeSlasher,
      //   CeloContract.BlockchainParameters,
      //   CeloContract.EpochRewards,
      // ]
    }
  }

  private async getDowntimeSlasherConfig(humanReadable: boolean): Promise<DowntimeSlasherConfig> {
    const client = await this.getPublicClient()
    const addressResolver = await this.getAddressResolver()

    // TODO multicalls can be DRYed, so that the individual functions
    // don't have to build the contractCallBase object
    const contractCallBase = {
      abi: downtimeSlasherABI,
      address: await addressResolver.resolve(CeloContract.DowntimeSlasher),
    }

    const results = await client.multicall({
      contracts: [
        {
          ...contractCallBase,
          functionName: 'slashableDowntime',
        },
        {
          ...contractCallBase,
          functionName: 'slashingIncentives',
        },
      ],
    })

    if (!results[0].result || !results[1].result) {
      throw new Error('Failed to fetch DowntimeSlasher parameters')
    }

    return {
      // @ts-ignore TODO fix type
      slashableDowntime: humanReadable
        ? blocksToDurationString(results[0].result)
        : results[0].result,
      slashingIncentives: {
        penalty: results[1].result[0],
        reward: results[1].result[1],
      },
    }
  }

  private async getElectionConfig(_: boolean): Promise<ElectionConfig> {
    const client = await this.getPublicClient()
    const addressResolver = await this.getAddressResolver()

    const contractCallBase = {
      abi: electionABI,
      address: await addressResolver.resolve(CeloContract.Election),
    }

    const results = await client.multicall({
      contracts: [
        {
          ...contractCallBase,
          functionName: 'electableValidators',
        },
        {
          ...contractCallBase,
          functionName: 'electabilityThreshold',
        },
        {
          ...contractCallBase,
          functionName: 'maxNumGroupsVotedFor',
        },
        {
          ...contractCallBase,
          functionName: 'getTotalVotes',
        },
      ],
    })

    if (!results[0].result || !results[1].result || !results[2].result || !results[3].result) {
      throw new Error('Failed to fetch Election parameters')
    }

    return {
      electableValidators: {
        min: results[0].result[0],
        max: results[0].result[1],
      },
      electabilityThreshold: fromFixed(results[1].result!),
      maxNumGroupsVotedFor: results[2].result!,
      totalVotes: results[3].result!,
      currentThreshold: multiplyByFixidityFraction(results[3].result, results[1].result),
    }
  }
}

enum TimeDurations {
  millennium = 31536000000000,
  century = 3153600000000,
  decade = 315360000000,
  year = 31536000000,
  quarter = 7776000000,
  month = 2592000000,
  week = 604800000,
  day = 86400000,
  hour = 3600000,
  minute = 60000,
  second = 1000,
  millisecond = 1,
}

// TODO: set of utils extracted from CK for config readibility - decide where to put them

type TimeUnit = keyof typeof TimeDurations

// taken mostly from https://gist.github.com/RienNeVaPlus/024de3431ae95546d60f2acce128a7e2
export function secondsToDurationString(
  durationSeconds: bigint,
  outputUnits: TimeUnit[] = ['year', 'month', 'week', 'day', 'hour', 'minute', 'second']
) {
  let durationMilliseconds = durationSeconds * BigInt(TimeDurations.second)

  if (durationMilliseconds <= 0) {
    return 'past'
  }

  const durations = outputUnits.reduce((res: Map<TimeUnit, bigint>, key) => {
    const unitDuration = BigInt(TimeDurations[key])
    const value = durationMilliseconds / unitDuration
    durationMilliseconds -= value * unitDuration
    return res.set(key, value)
  }, new Map())

  let s = ''
  durations.forEach((value, unit) => {
    if (value > 0) {
      s += s !== '' ? ', ' : ''
      s += `${value} ${unit}${value > 1 ? 's' : ''}`
    }
  })
  return s
}

export const blocksToDurationString = (input: bigint) => secondsToDurationString(input * 5n)
