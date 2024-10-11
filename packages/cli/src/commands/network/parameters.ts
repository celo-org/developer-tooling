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

    if (results[0].status === 'failure' || results[1].status === 'failure') {
      throw new Error('Failed to fetch DowntimeSlasher parameters')
    }

    return {
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

    if (
      results[0].status === 'failure' ||
      results[1].status === 'failure' ||
      results[2].status === 'failure' ||
      results[3].status === 'failure'
    ) {
      throw new Error('Failed to fetch Election parameters')
    }

    return {
      electableValidators: {
        min: results[0].result[0],
        max: results[0].result[1],
      },
      electabilityThreshold: fromFixidityValueToFraction(results[1].result!),
      maxNumGroupsVotedFor: results[2].result!,
      totalVotes: results[3].result!,
      currentThreshold: multiplyByFixidityFraction(results[3].result, results[1].result),
    }
  }

  private async getGovernanceConfig(humanReadable: boolean): Promise<GovernanceConfig> {
    const client = await this.getPublicClient()
    const addressResolver = await this.getAddressResolver()

    const contractCallBase = {
      abi: governanceABI,
      address: await addressResolver.resolve(CeloContract.Governance),
    }

    const results = await client.multicall({
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

    if (
      results[0].status === 'failure' ||
      results[1].status === 'failure' ||
      results[2].status === 'failure' ||
      results[3].status === 'failure' ||
      results[4].status === 'failure' ||
      results[5].status === 'failure'
    ) {
      throw new Error('Failed to fetch Governance parameters')
    }

    // TODO it doesn't work as it should, fix it
    return {
      concurrentProposals: results[0].result,
      dequeueFrequency: humanReadable
        ? blocksToDurationString(results[1].result)
        : results[1].result,
      minDeposit: results[2].result,
      queueExpiry: humanReadable ? blocksToDurationString(results[3].result) : results[3].result,
      stageDurations: {
        Referendum: humanReadable
          ? blocksToDurationString(results[4].result[1])
          : results[4].result[1],
        Execution: humanReadable
          ? blocksToDurationString(results[4].result[2])
          : results[4].result[2],
      },
      participationParameters: {
        baseline: fromFixidityValueToFraction(results[5].result[0]),
        baselineFloor: fromFixidityValueToFraction(results[5].result[1]),
        baselineUpdateFactor: fromFixidityValueToFraction(results[5].result[2]),
        baselineQuorumFactor: fromFixidityValueToFraction(results[5].result[3]),
      },
    }
  }

  private async getLockedGoldConfig(humanReadable: boolean): Promise<LockedGoldConfig> {
    const client = await this.getPublicClient()
    const addressResolver = await this.getAddressResolver()

    const contractCallBase = {
      abi: lockedGoldABI,
      address: await addressResolver.resolve(CeloContract.LockedGold),
    }

    const results = await client.multicall({
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

    if (results[0].status === 'failure' || results[1].status === 'failure') {
      throw new Error('Failed to fetch LockedGold parameters')
    }

    return {
      totalLockedGold: results[0].result,
      unlockingPeriod: humanReadable
        ? secondsToDurationString(results[1].result)
        : results[1].result,
    }
  }

  private async getSortedOraclesConfig(humanReadable: boolean): Promise<SortedOraclesConfig> {
    const client = await this.getPublicClient()
    const addressResolver = await this.getAddressResolver()

    const contractCallBase = {
      abi: sortedOraclesABI,
      address: await addressResolver.resolve(CeloContract.SortedOracles),
    }

    const results = await client.multicall({
      contracts: [
        {
          ...contractCallBase,
          functionName: 'reportExpirySeconds',
        },
      ],
    })

    if (results[0].status === 'failure') {
      throw new Error('Failed to fetch SortedOracles parameters')
    }

    return {
      reportExpirySeconds: humanReadable
        ? secondsToDurationString(results[0].result)
        : results[0].result,
    }
  }

  private async getReserveConfig(_: boolean): Promise<ReserveConfig> {
    const client = await this.getPublicClient()
    const addressResolver = await this.getAddressResolver()

    const contractCallBase = {
      abi: reserveABI,
      address: await addressResolver.resolve(CeloContract.Reserve),
    }

    const results = await client.multicall({
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

    if (
      results[0].status === 'failure' ||
      results[1].status === 'failure' ||
      results[2].status === 'failure' ||
      results[3].status === 'failure' ||
      results[4].status === 'failure'
    ) {
      throw new Error('Failed to fetch Reserve parameters')
    }

    return {
      tobinTaxStalenessThreshold: results[0].result,
      frozenReserveGoldStartBalance: results[1].result,
      frozenReserveGoldStartDay: results[2].result,
      frozenReserveGoldDays: results[3].result,
      otherReserveAddresses: results[4].result as string[],
    }
  }

  private async getValidatorsConfig(humanReadable: boolean): Promise<ValidatorsConfig> {
    const client = await this.getPublicClient()
    const addressResolver = await this.getAddressResolver()

    const contractCallBase = {
      abi: validatorsABI,
      address: await addressResolver.resolve(CeloContract.Validators),
    }

    const results = await client.multicall({
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

    if (
      results[0].status === 'failure' ||
      results[1].status === 'failure' ||
      results[2].status === 'failure' ||
      results[3].status === 'failure' ||
      results[4].status === 'failure' ||
      results[5].status === 'failure' ||
      results[6].status === 'failure'
    ) {
      throw new Error('Failed to fetch Validators parameters')
    }

    return {
      validatorLockedGoldRequirements: {
        value: results[0].result[0],
        duration: humanReadable
          ? secondsToDurationString(results[0].result[1])
          : results[0].result[1],
      },
      groupLockedGoldRequirements: {
        value: results[1].result[0],
        duration: humanReadable
          ? secondsToDurationString(results[1].result[1])
          : results[1].result[1],
      },
      maxGroupSize: results[2].result,
      membershipHistoryLength: results[3].result,
      slashingMultiplierResetPeriod: humanReadable
        ? secondsToDurationString(results[4].result)
        : results[4].result,
      commissionUpdateDelay: humanReadable
        ? blocksToDurationString(results[5].result)
        : results[5].result,
      downtimeGracePeriod: results[6].result,
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
      contracts: addresses.map((address) => ({
        abi: feeCurrencyDirectoryABI,
        address: feeCurrencyDirectoryAddress,
        functionName: 'getCurrencyConfig',
        args: [address],
      })),
    })

    let config: FeeCurrencyDirectoryConfig = { intrinsicGasForAlternativeFeeCurrency: {} }

    if (results.some((result) => result.status === 'failure')) {
      throw new Error('Failed to fetch FeeCurrencyDirectory parameters')
    }

    for (let i = 0; i < addresses.length; i++) {
      // @ts-expect-error TODO how can I fix the typing here? data is correct
      config.intrinsicGasForAlternativeFeeCurrency[addresses[i]] = results[i].result.intrinsicGas
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

    const results = await client.multicall({
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

    if (
      results[0].status === 'failure' ||
      results[1].status === 'failure' ||
      results[2].status === 'failure'
    ) {
      throw new Error('Failed to fetch EpochManager parameters')
    }

    return {
      currentEpochNumber: results[0].result,
      epochDuration: results[1].result,
      isTimeForNextEpoch: results[2].result,
    }
  }

  private async getAttestationsConfig(humanReadable: boolean): Promise<AttestationsConfig> {
    const client = await this.getPublicClient()
    const addressResolver = await this.getAddressResolver()

    const contractCallBase = {
      abi: attestationsABI,
      address: await addressResolver.resolve(CeloContract.Attestations),
    }

    const attestationRequestFeeContractCalls = await Promise.all(
      Object.values(celoTokenInfos).map(async (token) => ({
        ...contractCallBase,
        functionName: 'getAttestationRequestFee',
        args: [await addressResolver.resolve(token.contract)],
      }))
    )

    const results = await client.multicall({
      contracts: [
        {
          ...contractCallBase,
          functionName: 'attestationExpiryBlocks',
        },
      ].concat(attestationRequestFeeContractCalls),
    })

    if (results.some((result) => result.status === 'failure')) {
      throw new Error('Failed to fetch Attestations parameters')
    }

    return {
      // @ts-ignore TODO fix typing, data is correct
      attestationExpiryBlocks: humanReadable
        ? blocksToDurationString(results[0].result)
        : results[0].result,
      attestationRequestFees: results.slice(1).map((result, index) => ({
        address: attestationRequestFeeContractCalls[index].args[0] as StrongAddress,
        fee: result.result as bigint,
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

    const results = await client.multicall({
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

    if (
      results[0].status === 'failure' ||
      results[1].status === 'failure' ||
      results[2].status === 'failure'
    ) {
      throw new Error('Failed to fetch GasPriceMinimum parameters')
    }

    return {
      gasPriceMinimum: results[0].result,
      targetDensity: results[1].result,
      adjustmentSpeed: fromFixidityValueToFraction(results[2].result),
    }
  }

  private async getBlockchainParametersConfig(_: boolean): Promise<BlockchainParametersConfig> {
    const client = await this.getPublicClient()
    const addressResolver = await this.getAddressResolver()

    const contractCallBase = {
      abi: blockchainParametersABI,
      address: await addressResolver.resolve(CeloContract.BlockchainParameters),
    }

    const results = await client.multicall({
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

    if (results[0].status === 'failure' || results[1].status === 'failure') {
      throw new Error('Failed to fetch BlockchainParameters parameters')
    }

    return {
      blockGasLimit: results[0].result,
      intrinsicGasForAlternativeFeeCurrency: results[1].result,
    }
  }

  private async getEpochRewardsConfig(_: boolean): Promise<EpochRewardsConfig> {
    const client = await this.getPublicClient()
    const addressResolver = await this.getAddressResolver()

    const contractCallBase = {
      abi: epochRewardsABI,
      address: await addressResolver.resolve(CeloContract.EpochRewards),
    }

    const results = await client.multicall({
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

    if (
      results[0].status === 'failure' ||
      results[1].status === 'failure' ||
      results[2].status === 'failure' ||
      results[3].status === 'failure' ||
      results[4].status === 'failure' ||
      results[5].status === 'failure'
    ) {
      throw new Error('Failed to fetch EpochRewards parameters')
    }

    return {
      rewardsMultiplier: {
        max: fromFixidityValueToFraction(results[0].result[0]),
        underspendAdjustment: fromFixidityValueToFraction(results[0].result[1]),
        overspendAdjustment: fromFixidityValueToFraction(results[0].result[2]),
      },
      carbonOffsetting: {
        factor: fromFixidityValueToFraction(results[1].result),
        partner: results[2].result,
      },
      communityReward: fromFixidityValueToFraction(results[3].result),
      targetVotingYield: {
        target: fromFixidityValueToFraction(results[4].result[0]),
        max: fromFixidityValueToFraction(results[4].result[1]),
        adjustment: fromFixidityValueToFraction(results[4].result[2]),
      },
      targetValidatorEpochPayment: results[5].result,
    }
  }
}
