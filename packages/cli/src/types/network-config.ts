import { StrongAddress } from '@celo/base'

export type DowntimeSlasherConfig = {
  slashableDowntime: bigint | string
  slashingIncentives: {
    reward: bigint
    penalty: bigint
  }
}

export interface ElectionConfig {
  electableValidators: {
    min: bigint
    max: bigint
  }
  electabilityThreshold: number
  maxNumGroupsVotedFor: bigint
  totalVotes: bigint
  currentThreshold: bigint
}

export interface GovernanceConfig {
  concurrentProposals: bigint
  dequeueFrequency: bigint | string
  minDeposit: bigint
  queueExpiry: bigint | string
  stageDurations: {
    Referendum: bigint | string
    Execution: bigint | string
  }
  participationParameters: {
    baseline: number
    baselineFloor: number
    baselineUpdateFactor: number
    baselineQuorumFactor: number
  }
}

export interface LockedGoldConfig {
  unlockingPeriod: bigint | string
  totalLockedGold: bigint
}

export interface SortedOraclesConfig {
  reportExpirySeconds: bigint | string
}

export interface ReserveConfig {
  tobinTaxStalenessThreshold: bigint
  frozenReserveGoldStartBalance: bigint
  frozenReserveGoldStartDay: bigint
  frozenReserveGoldDays: bigint
  otherReserveAddresses: string[]
}

export interface ValidatorsConfig {
  groupLockedGoldRequirements: {
    value: bigint
    duration: bigint | string
  }
  validatorLockedGoldRequirements: {
    value: bigint
    duration: bigint | string
  }
  maxGroupSize: bigint
  membershipHistoryLength: bigint
  slashingMultiplierResetPeriod: bigint | string
  commissionUpdateDelay: bigint | string
  downtimeGracePeriod: bigint
}

export interface FeeCurrencyDirectoryConfig {
  intrinsicGasForAlternativeFeeCurrency: {
    [feeCurrencyAddress: StrongAddress]: bigint
  }
}

export interface EpochManagerConfig {
  currentEpochNumber: bigint
  epochDuration: bigint
  isTimeForNextEpoch: boolean
}

export interface AttestationsConfig {
  attestationExpiryBlocks: bigint | string
  attestationRequestFees: {
    address: StrongAddress
    fee: bigint
  }[]
}

export interface GasPriceMinimumConfig {
  gasPriceMinimum: bigint
  targetDensity: bigint
  adjustmentSpeed: number
}

export interface BlockchainParametersConfig {
  blockGasLimit: bigint
  intrinsicGasForAlternativeFeeCurrency: bigint
}

export interface EpochRewardsConfig {
  rewardsMultiplier: {
    max: number
    underspendAdjustment: number
    overspendAdjustment: number
  }
  carbonOffsetting: {
    factor: number
    partner: StrongAddress
  }
  communityReward: number
  targetVotingYield: {
    target: number
    max: number
    adjustment: number
  }
  targetValidatorEpochPayment: bigint
}
