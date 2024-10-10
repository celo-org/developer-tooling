interface ElectableValidators {
  min: bigint
  max: bigint
}

export interface DowntimeSlasherConfig {
  slashableDowntime: bigint
  slashingIncentives: {
    reward: bigint
    penalty: bigint
  }
}

export interface ElectionConfig {
  electableValidators: ElectableValidators
  electabilityThreshold: number
  maxNumGroupsVotedFor: bigint
  totalVotes: bigint
  currentThreshold: bigint
}
