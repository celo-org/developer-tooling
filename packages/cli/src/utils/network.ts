import { PublicCeloClient } from '@celo/actions'
import { getElectionContract } from '@celo/actions/contracts/election'
import { getGovernanceContract } from '@celo/actions/contracts/governance'
import { getLockedCeloContract } from '@celo/actions/contracts/locked-celo'
import { getFeeCurrencyDirectoryContract } from '@celo/actions/contracts/feecurrency-directory'
import { getEpochManagerContract } from '@celo/actions/contracts/epoch-manager'
import { getValidatorsContract } from '@celo/actions/contracts/validators'
import { getSortedOraclesContract } from '@celo/actions/contracts/sorted-oracles'
import { getReserveContract } from '@celo/actions/contracts/reserve'
import BigNumber from 'bignumber.js'
import { secondsToDurationString, blocksToDurationString } from './duration'

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

export interface LockedGoldConfig {
  unlockingPeriod: BigNumber
  totalLockedGold: BigNumber
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
  validatorLockedGoldRequirements: {
    value: BigNumber
    duration: BigNumber
  }
  groupLockedGoldRequirements: {
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
  // Empty object as per contractkit behavior
}

export interface NetworkConfig {
  Election?: ElectionConfig | Error
  Governance?: GovernanceConfig | Error
  LockedGold?: LockedGoldConfig | Error
  SortedOracles?: SortedOraclesConfig | Error
  Reserve?: ReserveConfig | Error
  Validators?: ValidatorsConfig | Error
  FeeCurrencyDirectory?: FeeCurrencyDirectoryConfig | Error
  EpochManager?: EpochManagerConfig | Error
}

function valueToBigNumber(input: string | number | bigint): BigNumber {
  return new BigNumber(input.toString())
}

export async function getNetworkConfig(
  client: PublicCeloClient,
  humanReadable = false
): Promise<NetworkConfig> {
  const contractGetters = {
    Election: () => getElectionContract({ public: client }),
    Governance: () => getGovernanceContract({ public: client }),
    LockedGold: () => getLockedCeloContract({ public: client }),
    SortedOracles: () => getSortedOraclesContract({ public: client }),
    Reserve: () => getReserveContract({ public: client }),
    Validators: () => getValidatorsContract({ public: client }),
    FeeCurrencyDirectory: () => getFeeCurrencyDirectoryContract({ public: client }),
    EpochManager: () => getEpochManagerContract({ public: client })
  }

  const configMethod = async (contractName: keyof typeof contractGetters) => {
    try {
      const contract = await contractGetters[contractName]()

      if (humanReadable && contractName in humanReadableConfigs) {
        return await humanReadableConfigs[contractName](contract)
      } else if (contractName in configs) {
        return await configs[contractName](contract)
      } else {
        throw new Error('No config endpoint found')
      }
    } catch (e) {
      return new Error(`Failed to fetch config for contract ${contractName}: \n${e}`)
    }
  }

  const configArray = await Promise.all(Object.keys(contractGetters).map(k => configMethod(k as keyof typeof contractGetters)))
  const configMap: NetworkConfig = {}
  
  Object.keys(contractGetters).forEach((contractName, index) => {
    const result = configArray[index]
    const key = contractName as keyof NetworkConfig
    if (key === 'Election') {
      configMap.Election = result as ElectionConfig | Error
    } else if (key === 'Governance') {
      configMap.Governance = result as GovernanceConfig | Error
    } else if (key === 'LockedGold') {
      configMap.LockedGold = result as LockedGoldConfig | Error
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
  Election: (contract: Awaited<ReturnType<typeof getElectionContract>>) => Promise<ElectionConfig>
  Governance: (contract: Awaited<ReturnType<typeof getGovernanceContract>>) => Promise<GovernanceConfig>
  LockedGold: (contract: Awaited<ReturnType<typeof getLockedCeloContract>>) => Promise<LockedGoldConfig>
  SortedOracles: (contract: Awaited<ReturnType<typeof getSortedOraclesContract>>) => Promise<SortedOraclesConfig>
  Reserve: (contract: Awaited<ReturnType<typeof getReserveContract>>) => Promise<ReserveConfig>
  Validators: (contract: Awaited<ReturnType<typeof getValidatorsContract>>) => Promise<ValidatorsConfig>
  FeeCurrencyDirectory: (contract: Awaited<ReturnType<typeof getFeeCurrencyDirectoryContract>>) => Promise<FeeCurrencyDirectoryConfig>
  EpochManager: (contract: Awaited<ReturnType<typeof getEpochManagerContract>>) => Promise<EpochManagerConfig>
} = {
  Election: async (contract: Awaited<ReturnType<typeof getElectionContract>>): Promise<ElectionConfig> => {
    const [electableValidators, electabilityThreshold, maxNumGroupsVotedFor, totalVotes] = 
      await Promise.all([
        contract.read.getElectableValidators(),
        contract.read.getElectabilityThreshold(),
        contract.read.maxNumGroupsVotedFor(),
        contract.read.getTotalVotes()
      ])

    const electableValidatorsResult = { min: valueToBigNumber(electableValidators[0]), max: valueToBigNumber(electableValidators[1]) }
    const totalVotesResult = valueToBigNumber(totalVotes)

    return {
      electableValidators: electableValidatorsResult,
      electabilityThreshold: valueToBigNumber(electabilityThreshold),
      maxNumGroupsVotedFor: valueToBigNumber(maxNumGroupsVotedFor),
      totalVotes: totalVotesResult,
      currentThreshold: totalVotesResult.multipliedBy(valueToBigNumber(electabilityThreshold))
    }
  },

  Governance: async (contract: Awaited<ReturnType<typeof getGovernanceContract>>): Promise<GovernanceConfig> => {
    const [concurrentProposals, dequeueFrequency, minDeposit, queueExpiry, stageDurations, participationParameters] = 
      await Promise.all([
        contract.read.concurrentProposals(),
        contract.read.dequeueFrequency(),
        contract.read.minDeposit(),
        contract.read.queueExpiry(),
        contract.read.stageDurations(),
        contract.read.getParticipationParameters()
      ])

    return {
      concurrentProposals: valueToBigNumber(concurrentProposals),
      dequeueFrequency: valueToBigNumber(dequeueFrequency),
      minDeposit: valueToBigNumber(minDeposit),
      queueExpiry: valueToBigNumber(queueExpiry),
      stageDurations: stageDurations ? {
        approval: valueToBigNumber(stageDurations.approval || stageDurations[0]),
        referendum: valueToBigNumber(stageDurations.referendum || stageDurations[1]),
        execution: valueToBigNumber(stageDurations.execution || stageDurations[2])
      } : { approval: valueToBigNumber(0), referendum: valueToBigNumber(0), execution: valueToBigNumber(0) },
      participationParameters: participationParameters ? {
        baseline: valueToBigNumber(participationParameters[0] || 0),
        baselineFloor: valueToBigNumber(participationParameters[1] || 0),
        baselineUpdateFactor: valueToBigNumber(participationParameters[2] || 0),
        baselineQuorumFactor: valueToBigNumber(participationParameters[3] || 0)
      } : { baseline: valueToBigNumber(0), baselineFloor: valueToBigNumber(0), baselineUpdateFactor: valueToBigNumber(0), baselineQuorumFactor: valueToBigNumber(0) }
    }
  },

  LockedGold: async (contract: Awaited<ReturnType<typeof getLockedCeloContract>>): Promise<LockedGoldConfig> => {
    const [unlockingPeriod, totalLockedGold] = await Promise.all([
      contract.read.unlockingPeriod(),
      contract.read.getTotalLockedGold()
    ])

    return {
      unlockingPeriod: valueToBigNumber(unlockingPeriod),
      totalLockedGold: valueToBigNumber(totalLockedGold)
    }
  },

  SortedOracles: async (contract: Awaited<ReturnType<typeof getSortedOraclesContract>>): Promise<SortedOraclesConfig> => {
    const reportExpirySeconds = await contract.read.reportExpirySeconds()
    
    return {
      reportExpirySeconds: valueToBigNumber(reportExpirySeconds)
    }
  },

  Reserve: async (contract: Awaited<ReturnType<typeof getReserveContract>>): Promise<ReserveConfig> => {
    const [
      tobinTaxStalenessThreshold,
      frozenReserveGoldStartBalance, 
      frozenReserveGoldStartDay,
      frozenReserveGoldDays,
      otherReserveAddresses
    ] = await Promise.all([
      contract.read.tobinTaxStalenessThreshold(),
      contract.read.frozenReserveGoldStartBalance(),
      contract.read.frozenReserveGoldStartDay(),
      contract.read.frozenReserveGoldDays(),
      contract.read.getOtherReserveAddresses()
    ])

    return {
      tobinTaxStalenessThreshold: valueToBigNumber(tobinTaxStalenessThreshold),
      frozenReserveGoldStartBalance: valueToBigNumber(frozenReserveGoldStartBalance),
      frozenReserveGoldStartDay: valueToBigNumber(frozenReserveGoldStartDay),
      frozenReserveGoldDays: valueToBigNumber(frozenReserveGoldDays),
      otherReserveAddresses
    }
  },

  Validators: async (contract: Awaited<ReturnType<typeof getValidatorsContract>>): Promise<ValidatorsConfig> => {
    const [
      validatorLockedGoldRequirements,
      groupLockedGoldRequirements,
      maxGroupSize,
      membershipHistoryLength,
      slashingMultiplierResetPeriod,
      commissionUpdateDelay,
      downtimeGracePeriod
    ] = await Promise.all([
      contract.read.getValidatorLockedGoldRequirements(),
      contract.read.getGroupLockedGoldRequirements(),
      contract.read.maxGroupSize(),
      contract.read.membershipHistoryLength(),
      contract.read.slashingMultiplierResetPeriod(),
      contract.read.commissionUpdateDelay(),
      contract.read.deprecated_downtimeGracePeriod()
    ])

    return {
      validatorLockedGoldRequirements: {
        value: valueToBigNumber(validatorLockedGoldRequirements[0]),
        duration: valueToBigNumber(validatorLockedGoldRequirements[1])
      },
      groupLockedGoldRequirements: {
        value: valueToBigNumber(groupLockedGoldRequirements[0]),
        duration: valueToBigNumber(groupLockedGoldRequirements[1])
      },
      maxGroupSize: valueToBigNumber(maxGroupSize),
      membershipHistoryLength: valueToBigNumber(membershipHistoryLength),
      slashingMultiplierResetPeriod: valueToBigNumber(slashingMultiplierResetPeriod),
      commissionUpdateDelay: valueToBigNumber(commissionUpdateDelay),
      downtimeGracePeriod: valueToBigNumber(downtimeGracePeriod)
    }
  },

  FeeCurrencyDirectory: async (_contract: Awaited<ReturnType<typeof getFeeCurrencyDirectoryContract>>): Promise<FeeCurrencyDirectoryConfig> => {
    // FeeCurrencyDirectory doesn't have a standard config method in contractkit
    // Return empty object to match contractkit behavior
    return {}
  },

  EpochManager: async (contract: Awaited<ReturnType<typeof getEpochManagerContract>>): Promise<EpochManagerConfig> => {
    const [currentEpochNumber, epochDuration, isTimeForNextEpoch] = await Promise.all([
      contract.read.getCurrentEpochNumber(),
      contract.read.epochDuration(),
      contract.read.isTimeForNextEpoch()
    ])

    return {
      currentEpochNumber: valueToBigNumber(currentEpochNumber),
      epochDuration: valueToBigNumber(epochDuration),
      isTimeForNextEpoch
    }
  }
}

// Human readable versions - convert durations to readable strings
const humanReadableConfigs = {
  Election: configs.Election, // No duration fields to convert

  Governance: async (contract: Awaited<ReturnType<typeof getGovernanceContract>>) => {
    const config = await configs.Governance(contract)
    return {
      ...config,
      stageDurations: {
        approval: blocksToDurationString(config.stageDurations.approval),
        referendum: blocksToDurationString(config.stageDurations.referendum),
        execution: blocksToDurationString(config.stageDurations.execution)
      }
    }
  },

  LockedGold: async (contract: Awaited<ReturnType<typeof getLockedCeloContract>>) => {
    const config = await configs.LockedGold(contract)
    return {
      ...config,
      unlockingPeriod: secondsToDurationString(config.unlockingPeriod)
    }
  },

  SortedOracles: async (contract: Awaited<ReturnType<typeof getSortedOraclesContract>>) => {
    const config = await configs.SortedOracles(contract)
    return {
      reportExpiry: secondsToDurationString(config.reportExpirySeconds)
    }
  },

  Reserve: configs.Reserve, // No duration fields to convert

  Validators: async (contract: Awaited<ReturnType<typeof getValidatorsContract>>) => {
    const config = await configs.Validators(contract)
    return {
      ...config,
      validatorLockedGoldRequirements: {
        ...config.validatorLockedGoldRequirements,
        duration: secondsToDurationString(config.validatorLockedGoldRequirements.duration)
      },
      groupLockedGoldRequirements: {
        ...config.groupLockedGoldRequirements,
        duration: secondsToDurationString(config.groupLockedGoldRequirements.duration)
      },
      slashingMultiplierResetPeriod: secondsToDurationString(config.slashingMultiplierResetPeriod),
      commissionUpdateDelay: blocksToDurationString(config.commissionUpdateDelay),
      downtimeGracePeriod: secondsToDurationString(config.downtimeGracePeriod)
    }
  },

  FeeCurrencyDirectory: configs.FeeCurrencyDirectory, // No duration fields to convert
  
  EpochManager: configs.EpochManager // No duration fields to convert (currentEpochNumber and isTimeForNextEpoch are not durations)
}