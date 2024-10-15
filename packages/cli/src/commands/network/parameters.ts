import { downtimeSlasherABI, epochRewardsABI } from '@celo/abis'
import {
  attestationsABI,
  blockchainParametersABI,
  electionABI,
  epochManagerABI,
  feeCurrencyDirectoryABI,
  gasPriceMinimumABI,
  governanceABI,
  lockedGoldABI,
  reserveABI,
  sortedOraclesABI,
  validatorsABI,
} from '@celo/abis-12'
import { StrongAddress } from '@celo/base'
import { Flags } from '@oclif/core'
import { BaseCommand } from '../../base'
import { CeloContract } from '../../packages-to-be/contracts'
import {
  fromFixidityValueToFraction,
  multiplyByFixidityFraction,
} from '../../packages-to-be/fixidity'
import { celoTokenInfos } from '../../packages-to-be/tokens'
import {
  AttestationsConfig,
  BlockchainParametersConfig,
  DowntimeSlasherConfig,
  ElectionConfig,
  EpochManagerConfig,
  EpochRewardsConfig,
  FeeCurrencyDirectoryConfig,
  GasPriceMinimumConfig,
  GovernanceConfig,
  LockedGoldConfig,
  ReserveConfig,
  SortedOraclesConfig,
  ValidatorsConfig,
} from '../../types/network-config'
import { printValueMapRecursive } from '../../utils/cli'
import { blocksToDurationString, secondsToDurationString } from '../../utils/network-config'
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
          try {
            return [contract, await promise]
          } catch (error) {
            return [
              contract,
              new Error(`Failed to fetch config for contract ${contract}: \n${error}`),
            ]
          }
        })
      )
    )
  }

  private async getConfigPromises(humanReadable: boolean): Promise<Record<string, Promise<any>>> {
    if (await this.isCel2()) {
      return {
        [CeloContract.DowntimeSlasher]: this.getDowntimeSlasherConfig(humanReadable),
        [CeloContract.Election]: this.getElectionConfig(humanReadable),
        [CeloContract.Governance]: this.getGovernanceConfig(humanReadable),
        [CeloContract.LockedGold]: this.getLockedGoldConfig(humanReadable),
        [CeloContract.SortedOracles]: this.getSortedOraclesConfig(humanReadable),
        [CeloContract.Reserve]: this.getReserveConfig(humanReadable),
        [CeloContract.Validators]: this.getValidatorsConfig(humanReadable),
        [CeloContract.FeeCurrencyDirectory]: this.getFeeCurrencyDirectoryConfig(humanReadable),
        [CeloContract.EpochManager]: this.getEpochManagerConfig(humanReadable),
      }
    } else {
      return {
        [CeloContract.Attestations]: this.getAttestationsConfig(humanReadable),
        [CeloContract.Election]: this.getElectionConfig(humanReadable),
        [CeloContract.Governance]: this.getGovernanceConfig(humanReadable),
        [CeloContract.DowntimeSlasher]: this.getDowntimeSlasherConfig(humanReadable),
        [CeloContract.LockedGold]: this.getLockedGoldConfig(humanReadable),
        [CeloContract.SortedOracles]: this.getSortedOraclesConfig(humanReadable),
        [CeloContract.Reserve]: this.getReserveConfig(humanReadable),
        [CeloContract.Validators]: this.getValidatorsConfig(humanReadable),
        [CeloContract.GasPriceMinimum]: this.getGasPriceMinimumConfig(humanReadable),
        [CeloContract.BlockchainParameters]: this.getBlockchainParametersConfig(humanReadable),
        [CeloContract.EpochRewards]: this.getEpochRewardsConfig(humanReadable),
      }
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

    try {
      const results = await client.multicall({
        allowFailure: false,
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

      return {
        slashableDowntime: humanReadable ? blocksToDurationString(results[0]) : results[0],
        slashingIncentives: {
          penalty: results[1][0],
          reward: results[1][1],
        },
      }
    } catch (_) {
      throw new Error('Failed to fetch DowntimeSlasher parameters')
    }
  }

  private async getElectionConfig(_: boolean): Promise<ElectionConfig> {
    const client = await this.getPublicClient()
    const addressResolver = await this.getAddressResolver()

    const contractCallBase = {
      abi: electionABI,
      address: await addressResolver.resolve(CeloContract.Election),
    }

    try {
      const results = await client.multicall({
        allowFailure: false,
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

      return {
        electableValidators: {
          min: results[0][0],
          max: results[0][1],
        },
        electabilityThreshold: fromFixidityValueToFraction(results[1]),
        maxNumGroupsVotedFor: results[2],
        totalVotes: results[3],
        currentThreshold: multiplyByFixidityFraction(results[3], results[1]),
      }
    } catch (_) {
      throw new Error('Failed to fetch Election parameters')
    }
  }

  private async getGovernanceConfig(humanReadable: boolean): Promise<GovernanceConfig> {
    const client = await this.getPublicClient()
    const addressResolver = await this.getAddressResolver()

    const contractCallBase = {
      abi: governanceABI,
      address: await addressResolver.resolve(CeloContract.Governance),
    }

    try {
      const results = await client.multicall({
        allowFailure: false,
        contracts: [
          {
            ...contractCallBase,
            functionName: 'concurrentProposals',
          },
          {
            ...contractCallBase,
            functionName: 'dequeueFrequency',
          },
          {
            ...contractCallBase,
            functionName: 'minDeposit',
          },
          {
            ...contractCallBase,
            functionName: 'queueExpiry',
          },
          {
            ...contractCallBase,
            functionName: 'stageDurations',
          },
          {
            ...contractCallBase,
            functionName: 'getParticipationParameters',
          },
        ],
      })

      return {
        concurrentProposals: results[0],
        dequeueFrequency: humanReadable ? secondsToDurationString(results[1]) : results[1],
        minDeposit: results[2],
        queueExpiry: humanReadable ? secondsToDurationString(results[3]) : results[3],
        stageDurations: {
          Referendum: humanReadable ? secondsToDurationString(results[4][1]) : results[4][1],
          Execution: humanReadable ? secondsToDurationString(results[4][2]) : results[4][2],
        },
        participationParameters: {
          baseline: fromFixidityValueToFraction(results[5][0]),
          baselineFloor: fromFixidityValueToFraction(results[5][1]),
          baselineUpdateFactor: fromFixidityValueToFraction(results[5][2]),
          baselineQuorumFactor: fromFixidityValueToFraction(results[5][3]),
        },
      }
    } catch (_) {
      throw new Error('Failed to fetch Governance parameters')
    }
  }

  private async getLockedGoldConfig(humanReadable: boolean): Promise<LockedGoldConfig> {
    const client = await this.getPublicClient()
    const addressResolver = await this.getAddressResolver()

    const contractCallBase = {
      abi: lockedGoldABI,
      address: await addressResolver.resolve(CeloContract.LockedGold),
    }

    try {
      const results = await client.multicall({
        allowFailure: false,
        contracts: [
          {
            ...contractCallBase,
            functionName: 'getTotalLockedGold',
          },
          {
            ...contractCallBase,
            functionName: 'unlockingPeriod',
          },
        ],
      })

      return {
        totalLockedGold: results[0],
        unlockingPeriod: humanReadable ? secondsToDurationString(results[1]) : results[1],
      }
    } catch (_) {
      throw new Error('Failed to fetch LockedGold parameters')
    }
  }

  private async getSortedOraclesConfig(humanReadable: boolean): Promise<SortedOraclesConfig> {
    const client = await this.getPublicClient()
    const addressResolver = await this.getAddressResolver()

    const contractCallBase = {
      abi: sortedOraclesABI,
      address: await addressResolver.resolve(CeloContract.SortedOracles),
    }

    try {
      const results = await client.multicall({
        allowFailure: false,
        contracts: [
          {
            ...contractCallBase,
            functionName: 'reportExpirySeconds',
          },
        ],
      })

      return {
        reportExpiry: humanReadable ? secondsToDurationString(results[0]) : results[0],
      }
    } catch (_) {
      throw new Error('Failed to fetch SortedOracles parameters')
    }
  }

  private async getReserveConfig(_: boolean): Promise<ReserveConfig> {
    const client = await this.getPublicClient()
    const addressResolver = await this.getAddressResolver()

    const contractCallBase = {
      abi: reserveABI,
      address: await addressResolver.resolve(CeloContract.Reserve),
    }

    try {
      const results = await client.multicall({
        allowFailure: false,
        contracts: [
          {
            ...contractCallBase,
            functionName: 'tobinTaxStalenessThreshold',
          },
          {
            ...contractCallBase,
            functionName: 'frozenReserveGoldStartBalance',
          },
          {
            ...contractCallBase,
            functionName: 'frozenReserveGoldStartDay',
          },
          {
            ...contractCallBase,
            functionName: 'frozenReserveGoldDays',
          },
          {
            ...contractCallBase,
            functionName: 'getOtherReserveAddresses',
          },
        ],
      })

      return {
        tobinTaxStalenessThreshold: results[0],
        frozenReserveGoldStartBalance: results[1],
        frozenReserveGoldStartDay: results[2],
        frozenReserveGoldDays: results[3],
        otherReserveAddresses: results[4] as string[],
      }
    } catch (_) {
      throw new Error('Failed to fetch Reserve parameters')
    }
  }

  private async getValidatorsConfig(humanReadable: boolean): Promise<ValidatorsConfig> {
    const client = await this.getPublicClient()
    const addressResolver = await this.getAddressResolver()

    const contractCallBase = {
      abi: validatorsABI,
      address: await addressResolver.resolve(CeloContract.Validators),
    }

    try {
      const results = await client.multicall({
        allowFailure: false,
        contracts: [
          {
            ...contractCallBase,
            functionName: 'getValidatorLockedGoldRequirements',
          },
          {
            ...contractCallBase,
            functionName: 'getGroupLockedGoldRequirements',
          },
          {
            ...contractCallBase,
            functionName: 'maxGroupSize',
          },
          {
            ...contractCallBase,
            functionName: 'membershipHistoryLength',
          },
          {
            ...contractCallBase,
            functionName: 'slashingMultiplierResetPeriod',
          },
          {
            ...contractCallBase,
            functionName: 'commissionUpdateDelay',
          },
          {
            ...contractCallBase,
            functionName: 'downtimeGracePeriod',
          },
        ],
      })

      return {
        validatorLockedGoldRequirements: {
          value: results[0][0],
          duration: humanReadable ? secondsToDurationString(results[0][1]) : results[0][1],
        },
        groupLockedGoldRequirements: {
          value: results[1][0],
          duration: humanReadable ? secondsToDurationString(results[1][1]) : results[1][1],
        },
        maxGroupSize: results[2],
        membershipHistoryLength: results[3],
        slashingMultiplierResetPeriod: humanReadable
          ? secondsToDurationString(results[4])
          : results[4],
        commissionUpdateDelay: humanReadable ? blocksToDurationString(results[5]) : results[5],
        downtimeGracePeriod: results[6],
      }
    } catch (err) {
      throw new Error('Failed to fetch Validators parameters')
    }
  }

  async getFeeCurrencyDirectoryConfig(_: boolean): Promise<FeeCurrencyDirectoryConfig> {
    const client = await this.getPublicClient()
    const addressResolver = await this.getAddressResolver()
    const feeCurrencyDirectoryAddress = await addressResolver.resolve(
      CeloContract.FeeCurrencyDirectory
    )

    const addresses = await client.readContract({
      abi: feeCurrencyDirectoryABI,
      address: feeCurrencyDirectoryAddress,
      functionName: 'getCurrencies',
    })

    const results = await client.multicall({
      allowFailure: false,
      contracts: addresses.map((address) => ({
        abi: feeCurrencyDirectoryABI,
        address: feeCurrencyDirectoryAddress,
        functionName: 'getCurrencyConfig',
        args: [address],
      })) as Array<{
        abi: typeof feeCurrencyDirectoryABI
        address: StrongAddress
        functionName: 'getCurrencyConfig'
      }>,
    })

    let config: FeeCurrencyDirectoryConfig = { intrinsicGasForAlternativeFeeCurrency: {} }

    for (let i = 0; i < addresses.length; i++) {
      config.intrinsicGasForAlternativeFeeCurrency[addresses[i]] = results[i].intrinsicGas
    }

    return config
  }

  private async getEpochManagerConfig(_: boolean): Promise<EpochManagerConfig> {
    const client = await this.getPublicClient()
    const addressResolver = await this.getAddressResolver()

    const contractCallBase = {
      abi: epochManagerABI,
      address: await addressResolver.resolve(CeloContract.EpochManager),
    }

    try {
      const results = await client.multicall({
        allowFailure: false,
        contracts: [
          {
            ...contractCallBase,
            functionName: 'getCurrentEpochNumber',
          },
          {
            ...contractCallBase,
            functionName: 'epochDuration',
          },
          {
            ...contractCallBase,
            functionName: 'isTimeForNextEpoch',
          },
        ],
      })

      return {
        currentEpochNumber: results[0],
        epochDuration: Number(results[1]),
        isTimeForNextEpoch: results[2],
      }
    } catch (_) {
      throw new Error('Failed to fetch EpochManager parameters')
    }
  }

  private async getAttestationsConfig(humanReadable: boolean): Promise<AttestationsConfig> {
    const client = await this.getPublicClient()
    const addressResolver = await this.getAddressResolver()

    const contractCallBase = {
      abi: attestationsABI,
      address: await addressResolver.resolve(CeloContract.Attestations),
    }

    const attestationRequestFeeContractCalls = (await Promise.all(
      Object.values(celoTokenInfos).map(async (token) => ({
        ...contractCallBase,
        functionName: 'getAttestationRequestFee',
        args: [await addressResolver.resolve(token.contract)],
      }))
    )) as Array<{
      abi: typeof attestationsABI
      address: StrongAddress
      functionName: 'getAttestationRequestFee'
      args: [StrongAddress]
    }>

    const attestationsExpiryBlockResult = await client.readContract({
      ...contractCallBase,
      functionName: 'attestationExpiryBlocks',
    })

    const attestationRequestFeeContractCallResults = await client.multicall({
      allowFailure: false,
      contracts: attestationRequestFeeContractCalls,
    })

    return {
      attestationExpiryBlocks: humanReadable
        ? blocksToDurationString(attestationsExpiryBlockResult)
        : attestationsExpiryBlockResult,
      attestationRequestFees: attestationRequestFeeContractCallResults.map((result, index) => ({
        address: attestationRequestFeeContractCalls[index].args[0],
        fee: result,
      })),
    }
  }

  private async getGasPriceMinimumConfig(_: boolean): Promise<GasPriceMinimumConfig> {
    const client = await this.getPublicClient()
    const addressResolver = await this.getAddressResolver()

    const contractCallBase = {
      abi: gasPriceMinimumABI,
      address: await addressResolver.resolve(CeloContract.GasPriceMinimum),
    }

    try {
      const results = await client.multicall({
        allowFailure: false,
        contracts: [
          {
            ...contractCallBase,
            functionName: 'gasPriceMinimum',
          },
          {
            ...contractCallBase,
            functionName: 'targetDensity',
          },
          {
            ...contractCallBase,
            functionName: 'adjustmentSpeed',
          },
        ],
      })

      return {
        gasPriceMinimum: results[0],
        targetDensity: fromFixidityValueToFraction(results[1]),
        adjustmentSpeed: fromFixidityValueToFraction(results[2]),
      }
    } catch (_) {
      throw new Error('Failed to fetch GasPriceMinimum parameters')
    }
  }

  private async getBlockchainParametersConfig(_: boolean): Promise<BlockchainParametersConfig> {
    const client = await this.getPublicClient()
    const addressResolver = await this.getAddressResolver()

    const contractCallBase = {
      abi: blockchainParametersABI,
      address: await addressResolver.resolve(CeloContract.BlockchainParameters),
    }

    try {
      const results = await client.multicall({
        allowFailure: false,
        contracts: [
          {
            ...contractCallBase,
            functionName: 'blockGasLimit',
          },
          {
            ...contractCallBase,
            functionName: 'intrinsicGasForAlternativeFeeCurrency',
          },
        ],
      })

      return {
        blockGasLimit: results[0],
        intrinsicGasForAlternativeFeeCurrency: results[1],
      }
    } catch (_) {
      throw new Error('Failed to fetch BlockchainParameters parameters')
    }
  }

  private async getEpochRewardsConfig(_: boolean): Promise<EpochRewardsConfig> {
    const client = await this.getPublicClient()
    const addressResolver = await this.getAddressResolver()

    const contractCallBase = {
      abi: epochRewardsABI,
      address: await addressResolver.resolve(CeloContract.EpochRewards),
    }

    try {
      const results = await client.multicall({
        allowFailure: false,
        contracts: [
          {
            ...contractCallBase,
            functionName: 'getRewardsMultiplierParameters',
          },
          {
            ...contractCallBase,
            functionName: 'getCarbonOffsettingFraction',
          },
          {
            ...contractCallBase,
            functionName: 'carbonOffsettingPartner',
          },
          {
            ...contractCallBase,
            functionName: 'getCommunityRewardFraction',
          },
          {
            ...contractCallBase,
            functionName: 'getTargetVotingYieldParameters',
          },
          {
            ...contractCallBase,
            functionName: 'targetValidatorEpochPayment',
          },
        ],
      })

      return {
        rewardsMultiplier: {
          max: fromFixidityValueToFraction(results[0][0]),
          underspendAdjustment: fromFixidityValueToFraction(results[0][1]),
          overspendAdjustment: fromFixidityValueToFraction(results[0][2]),
        },
        carbonOffsetting: {
          factor: fromFixidityValueToFraction(results[1]),
          partner: results[2],
        },
        communityReward: fromFixidityValueToFraction(results[3]),
        targetVotingYield: {
          target: fromFixidityValueToFraction(results[4][0]),
          max: fromFixidityValueToFraction(results[4][1]),
          adjustment: fromFixidityValueToFraction(results[4][2]),
        },
        targetValidatorEpochPayment: results[5],
      }
    } catch (_) {
      throw new Error('Failed to fetch EpochRewards parameters')
    }
  }
}
