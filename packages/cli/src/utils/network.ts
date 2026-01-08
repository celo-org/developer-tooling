import { PublicCeloClient } from '@celo/actions'
import { ElectionContract, getElectionContract } from '@celo/actions/contracts/election'
import { EpochManager, getEpochManagerContract } from '@celo/actions/contracts/epoch-manager'
import { FeeCurrencyDirectory, getFeeCurrencyDirectoryContract } from '@celo/actions/contracts/feecurrency-directory'
import { getGovernanceContract, GovernanceContract } from '@celo/actions/contracts/governance'
import { getLockedCeloContract, LockedCeloContract } from '@celo/actions/contracts/locked-celo'
import { getReserveContract, ReserveContract } from '@celo/actions/contracts/reserve'
import { getSortedOraclesContract, SortedOraclesContract } from '@celo/actions/contracts/sorted-oracles'
import { getValidatorsContract, ValidatorsContract } from '@celo/actions/contracts/validators'
import BigNumber from 'bignumber.js'
import { blocksToDurationString, secondsToDurationString } from './duration'

// Specific types for each contract's config
export interface ElectionConfig {
  electableValidators: { min: BigNumber; max: BigNumber }
  electabilityThreshold: BigNumber
  maxNumGroupsVotedFor: BigNumber
  totalVotes: BigNumber
  currentThreshold: BigNumber
}

export interface GovernanceConfig {
  concurrentProposals: BigNumber
  dequeueFrequency: BigNumber
  minDeposit: BigNumber
  queueExpiry: BigNumber
  stageDurations: {
    approval: BigNumber
    referendum: BigNumber
    execution: BigNumber
  }
  participationParameters: {
    baseline: BigNumber
    baselineFloor: BigNumber
    baselineUpdateFactor: BigNumber
    baselineQuorumFactor: BigNumber
  }
}

export interface LockedCeloConfig {
  unlockingPeriod: BigNumber
  totalLockedCelo: BigNumber
}

export interface SortedOraclesConfig {
  reportExpirySeconds: BigNumber
}

export interface ReserveConfig {
  tobinTaxStalenessThreshold: BigNumber
  frozenReserveGoldStartBalance: BigNumber
  frozenReserveGoldStartDay: BigNumber
  frozenReserveGoldDays: BigNumber
  otherReserveAddresses: readonly string[]
}

export interface ValidatorsConfig {
  validatorLockedCeloRequirements: {
    value: BigNumber
    duration: BigNumber
  }
  groupLockedCeloRequirements: {
    value: BigNumber
    duration: BigNumber
  }
  maxGroupSize: BigNumber
  membershipHistoryLength: BigNumber
  slashingMultiplierResetPeriod: BigNumber
  commissionUpdateDelay: BigNumber
  downtimeGracePeriod: BigNumber
}

export interface EpochManagerConfig {
  currentEpochNumber: BigNumber
  epochDuration: BigNumber
  isTimeForNextEpoch: boolean
}

export interface FeeCurrencyDirectoryConfig {
  intrinsicGasForAlternativeFeeCurrency: {
    [feeCurrencyAddress: string]: BigNumber
  }
}

export interface NetworkConfig {
  Election?: ElectionConfig | Error
  Governance?: GovernanceConfig | Error
  LockedCelo?: LockedCeloConfig | Error
  SortedOracles?: SortedOraclesConfig | Error
  Reserve?: ReserveConfig | Error
  Validators?: ValidatorsConfig | Error
  FeeCurrencyDirectory?: FeeCurrencyDirectoryConfig | Error
  EpochManager?: EpochManagerConfig | Error
}

function valueToBigNumber(input: string | number | bigint): BigNumber {
  return new BigNumber(input.toString())
}

function fixidityValueToBigNumber(input: string | number | bigint): BigNumber {
  const FIXED1 = new BigNumber('1000000000000000000000000') // 10^24
  return new BigNumber(input.toString()).dividedBy(FIXED1)
}

export async function getNetworkConfig(
  client: PublicCeloClient,
  humanReadable = false
): Promise<NetworkConfig> {
  const contractGetters = {
    Election: () => getElectionContract({ public: client }),
    Governance: () => getGovernanceContract({ public: client }),
    LockedCelo: () => getLockedCeloContract({ public: client }),
    SortedOracles: () => getSortedOraclesContract({ public: client }),
    Reserve: () => getReserveContract({ public: client }),
    Validators: () => getValidatorsContract({ public: client }),
    FeeCurrencyDirectory: () => getFeeCurrencyDirectoryContract({ public: client }),
    EpochManager: () => getEpochManagerContract({ public: client }),
  }

  const configMethod = async (contractName: keyof typeof contractGetters) => {
    try {
      const contract = await contractGetters[contractName]()

      if (humanReadable && contractName in humanReadableConfigs) {
        return await humanReadableConfigs[contractName](contract)
      } else if (contractName in configs) {
        // @ts-expect-error
        return await configs[contractName](contract)
      } else {
        throw new Error('No config endpoint found')
      }
    } catch (e) {
      return new Error(`Failed to fetch config for contract ${contractName}: \n${e}`)
    }
  }

  const configArray = await Promise.all(
    Object.keys(contractGetters).map((k) => configMethod(k as keyof typeof contractGetters))
  )
  const configMap: NetworkConfig = {}

  Object.keys(contractGetters).forEach((contractName, index) => {
    const result = configArray[index]
    const key = contractName as keyof NetworkConfig
    if (key === 'Election') {
      configMap.Election = result as ElectionConfig | Error
    } else if (key === 'Governance') {
      configMap.Governance = result as GovernanceConfig | Error
    } else if (key === 'LockedCelo') {
      configMap.LockedCelo = result as LockedCeloConfig | Error
    } else if (key === 'SortedOracles') {
      configMap.SortedOracles = result as SortedOraclesConfig | Error
    } else if (key === 'Reserve') {
      configMap.Reserve = result as ReserveConfig | Error
    } else if (key === 'Validators') {
      configMap.Validators = result as ValidatorsConfig | Error
    } else if (key === 'FeeCurrencyDirectory') {
      configMap.FeeCurrencyDirectory = result as FeeCurrencyDirectoryConfig | Error
    } else if (key === 'EpochManager') {
      configMap.EpochManager = result as EpochManagerConfig | Error
    }
  })

  return configMap
}

// Exact replica of each contract's getConfig method
const configs: {
  Election: (contract: ElectionContract) => Promise<ElectionConfig>
  Governance: (
    contract: GovernanceContract
  ) => Promise<GovernanceConfig>
  LockedCelo: (
    contract: LockedCeloContract
  ) => Promise<LockedCeloConfig>
  SortedOracles: (
    contract: SortedOraclesContract
  ) => Promise<SortedOraclesConfig>
  Reserve: (contract: ReserveContract) => Promise<ReserveConfig>
  Validators: (
    contract: ValidatorsContract
  ) => Promise<ValidatorsConfig>
  FeeCurrencyDirectory: (
    contract: FeeCurrencyDirectory
  ) => Promise<FeeCurrencyDirectoryConfig>
  EpochManager: (
    contract: EpochManager
  ) => Promise<EpochManagerConfig>
} = {
  Election: async (
    contract: ElectionContract
  ): Promise<ElectionConfig> => {
    const [electableValidators, electabilityThreshold, maxNumGroupsVotedFor, totalVotes] =
      await Promise.all([
        contract.read.getElectableValidators(),
        contract.read.getElectabilityThreshold(),
        contract.read.maxNumGroupsVotedFor(),
        contract.read.getTotalVotes(),
      ])

    const electableValidatorsResult = {
      min: valueToBigNumber(electableValidators[0]),
      max: valueToBigNumber(electableValidators[1]),
    }
    const totalVotesResult = valueToBigNumber(totalVotes)

    const electabilityThresholdResult = fixidityValueToBigNumber(electabilityThreshold)
    
    return {
      electableValidators: electableValidatorsResult,
      electabilityThreshold: electabilityThresholdResult,
      maxNumGroupsVotedFor: valueToBigNumber(maxNumGroupsVotedFor),
      totalVotes: totalVotesResult,
      currentThreshold: totalVotesResult.multipliedBy(electabilityThresholdResult),
    }
  },

  Governance: async (
    contract: GovernanceContract
  ): Promise<GovernanceConfig> => {
    const [
      concurrentProposals,
      dequeueFrequency,
      minDeposit,
      queueExpiry,
      stageDurations,
      participationParameters,
    ] = await Promise.all([
      contract.read.concurrentProposals(),
      contract.read.dequeueFrequency(),
      contract.read.minDeposit(),
      contract.read.queueExpiry(),
      contract.read.stageDurations(),
      contract.read.getParticipationParameters(),
    ])

    return {
      concurrentProposals: valueToBigNumber(concurrentProposals),
      dequeueFrequency: valueToBigNumber(dequeueFrequency),
      minDeposit: valueToBigNumber(minDeposit),
      queueExpiry: valueToBigNumber(queueExpiry),
      stageDurations: stageDurations
        ? {
            approval: valueToBigNumber( stageDurations[0]),
            referendum: valueToBigNumber(stageDurations[1]),
            execution: valueToBigNumber(stageDurations[2]),
          }
        : {
            approval: valueToBigNumber(0),
            referendum: valueToBigNumber(0),
            execution: valueToBigNumber(0),
          },
      participationParameters: participationParameters
        ? {
            baseline: fixidityValueToBigNumber(participationParameters[0] || 0),
            baselineFloor: fixidityValueToBigNumber(participationParameters[1] || 0),
            baselineUpdateFactor: fixidityValueToBigNumber(participationParameters[2] || 0),
            baselineQuorumFactor: fixidityValueToBigNumber(participationParameters[3] || 0),
          }
        : {
            baseline: fixidityValueToBigNumber(0),
            baselineFloor: fixidityValueToBigNumber(0),
            baselineUpdateFactor: fixidityValueToBigNumber(0),
            baselineQuorumFactor: fixidityValueToBigNumber(0),
          },
    }
  },

  LockedCelo: async (
    contract: LockedCeloContract
  ): Promise<LockedCeloConfig> => {
    const [unlockingPeriod, totalLockedCelo] = await Promise.all([
      contract.read.unlockingPeriod(),
      contract.read.getTotalLockedGold(),
    ])

    return {
      unlockingPeriod: valueToBigNumber(unlockingPeriod),
      totalLockedCelo: valueToBigNumber(totalLockedCelo),
    }
  },

  SortedOracles: async (
    contract: SortedOraclesContract
  ): Promise<SortedOraclesConfig> => {
    const reportExpirySeconds = await contract.read.reportExpirySeconds()

    return {
      reportExpirySeconds: valueToBigNumber(reportExpirySeconds),
    }
  },

  Reserve: async (
    contract: Awaited<ReturnType<typeof getReserveContract>>
  ): Promise<ReserveConfig> => {
    const [
      tobinTaxStalenessThreshold,
      frozenReserveGoldStartBalance,
      frozenReserveGoldStartDay,
      frozenReserveGoldDays,
      otherReserveAddresses,
    ] = await Promise.all([
      contract.read.tobinTaxStalenessThreshold(),
      contract.read.frozenReserveGoldStartBalance(),
      contract.read.frozenReserveGoldStartDay(),
      contract.read.frozenReserveGoldDays(),
      contract.read.getOtherReserveAddresses(),
    ])

    return {
      tobinTaxStalenessThreshold: valueToBigNumber(tobinTaxStalenessThreshold),
      frozenReserveGoldStartBalance: valueToBigNumber(frozenReserveGoldStartBalance),
      frozenReserveGoldStartDay: valueToBigNumber(frozenReserveGoldStartDay),
      frozenReserveGoldDays: valueToBigNumber(frozenReserveGoldDays),
      otherReserveAddresses,
    }
  },

  Validators: async (
    contract: ValidatorsContract
  ): Promise<ValidatorsConfig> => {
    const [
      validatorLockedCeloRequirements,
      groupLockedCeloRequirements,
      maxGroupSize,
      membershipHistoryLength,
      slashingMultiplierResetPeriod,
      commissionUpdateDelay,
      downtimeGracePeriod,
    ] = await Promise.all([
      contract.read.getValidatorLockedGoldRequirements(),
      contract.read.getGroupLockedGoldRequirements(),
      contract.read.maxGroupSize(),
      contract.read.membershipHistoryLength(),
      contract.read.slashingMultiplierResetPeriod(),
      contract.read.commissionUpdateDelay(),
      contract.read.deprecated_downtimeGracePeriod(),
    ])

    return {
      validatorLockedCeloRequirements: {
        value: valueToBigNumber(validatorLockedCeloRequirements[0]),
        duration: valueToBigNumber(validatorLockedCeloRequirements[1]),
      },
      groupLockedCeloRequirements: {
        value: valueToBigNumber(groupLockedCeloRequirements[0]),
        duration: valueToBigNumber(groupLockedCeloRequirements[1]),
      },
      maxGroupSize: valueToBigNumber(maxGroupSize),
      membershipHistoryLength: valueToBigNumber(membershipHistoryLength),
      slashingMultiplierResetPeriod: valueToBigNumber(slashingMultiplierResetPeriod),
      commissionUpdateDelay: valueToBigNumber(commissionUpdateDelay),
      downtimeGracePeriod: valueToBigNumber(downtimeGracePeriod),
    }
  },

  FeeCurrencyDirectory: async (
    contract: Awaited<ReturnType<typeof getFeeCurrencyDirectoryContract>>
  ): Promise<FeeCurrencyDirectoryConfig> => {
    const addresses = await contract.read.getCurrencies()
    const config: FeeCurrencyDirectoryConfig = { intrinsicGasForAlternativeFeeCurrency: {} }

    for (const address of addresses) {
      const currencyConfig = await contract.read.getCurrencyConfig([address])
      config.intrinsicGasForAlternativeFeeCurrency[address] = valueToBigNumber(
        currencyConfig.intrinsicGas
      )
    }

    return config
  },

  EpochManager: async (
    contract: Awaited<ReturnType<typeof getEpochManagerContract>>
  ): Promise<EpochManagerConfig> => {
    const [currentEpochNumber, epochDuration, isTimeForNextEpoch] = await Promise.all([
      contract.read.getCurrentEpochNumber(),
      contract.read.epochDuration(),
      contract.read.isTimeForNextEpoch(),
    ])

    return {
      currentEpochNumber: valueToBigNumber(currentEpochNumber),
      epochDuration: valueToBigNumber(epochDuration),
      isTimeForNextEpoch,
    }
  },
}

// Human readable versions - convert durations to readable strings
const humanReadableConfigs = {
  Election: configs.Election,

  Governance: async (contract: GovernanceContract) => {
    const config = await configs.Governance(contract)
    return {
      ...config,
      dequeueFrequency: secondsToDurationString(config.dequeueFrequency),
      participationParameters: {
        ...config.participationParameters,
      },
      queueExpiry: secondsToDurationString(config.queueExpiry),
      stageDurations: {
        Execution: blocksToDurationString(config.stageDurations.execution),
        Referendum: blocksToDurationString(config.stageDurations.referendum),
      },
    }
  },

  LockedCelo: async (contract: LockedCeloContract) => {
    const config = await configs.LockedCelo(contract)
    return {
      ...config,
      unlockingPeriod: secondsToDurationString(config.unlockingPeriod),
    }
  },

  SortedOracles: async (contract: Awaited<ReturnType<typeof getSortedOraclesContract>>) => {
    const config = await configs.SortedOracles(contract)
    return {
      reportExpiry: secondsToDurationString(config.reportExpirySeconds),
    }
  },

  Reserve: configs.Reserve, // No duration fields to convert

  Validators: async (contract: ValidatorsContract) => {
    const config = await configs.Validators(contract)
    return {
      ...config,
      validatorLockedCeloRequirements: {
        ...config.validatorLockedCeloRequirements,
        duration: secondsToDurationString(config.validatorLockedCeloRequirements.duration),
      },
      groupLockedCeloRequirements: {
        ...config.groupLockedCeloRequirements,
        duration: secondsToDurationString(config.groupLockedCeloRequirements.duration),
      },
      slashingMultiplierResetPeriod: secondsToDurationString(config.slashingMultiplierResetPeriod),
      commissionUpdateDelay: secondsToDurationString(config.commissionUpdateDelay),
      downtimeGracePeriod: config.downtimeGracePeriod,
    }
  },

  FeeCurrencyDirectory: configs.FeeCurrencyDirectory, 

  EpochManager: configs.EpochManager, 
}
