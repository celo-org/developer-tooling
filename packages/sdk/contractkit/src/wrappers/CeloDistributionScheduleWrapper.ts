import { CeloDistributionSchedule } from '@celo/abis-12/web3/CeloDistributionSchedule'
import { BaseWrapper, proxyCall, proxySend, valueToString } from './BaseWrapper'

type TargetTotalSupplyResponse = {
  targetCeloDistribution: string
  communityTargetRewards: string
  carbonFundTargetRewards: string
}

type CeloDistributionScheduleConfig = {
  carbonOffsetting: {
    fraction: string
    partner: string
  }
  communityReward: {
    fraction: string
    fund: string
  }
  distributableAmount: string
  targetCeloDistribution: {
    carbonFundTargetRewards: string
    communityTargetRewards: string
    targetCeloDistribution: string
  }
}

export class CeloDistributionScheduleWrapper extends BaseWrapper<CeloDistributionSchedule> {
  carbonOffsettingPartner = proxyCall(this.contract.methods.carbonOffsettingPartner)
  communityRewardFund = proxyCall(this.contract.methods.communityRewardFund)

  getCommunityRewardFraction = proxyCall(
    this.contract.methods.getCommunityRewardFraction,
    undefined,
    valueToString
  )
  getCarbonOffsettingFraction = proxyCall(
    this.contract.methods.getCarbonOffsettingFraction,
    undefined,
    valueToString
  )
  getRemainingBalanceToDistribute = proxyCall(
    this.contract.methods.getRemainingBalanceToDistribute,
    undefined,
    valueToString
  )
  getTotalDistributedBySchedule = proxyCall(
    this.contract.methods.getTotalDistributedBySchedule,
    undefined,
    valueToString
  )
  getDistributableAmount = proxyCall(
    this.contract.methods.getDistributableAmount,
    undefined,
    valueToString
  )
  getTargetCeloDistribution: () => Promise<TargetTotalSupplyResponse> = proxyCall(
    this.contract.methods.getTargetCeloDistribution,
    undefined,
    (res) => ({
      carbonFundTargetRewards: valueToString(res.carbonFundTargetRewards),
      communityTargetRewards: valueToString(res.communityTargetRewards),
      targetCeloDistribution: valueToString(res.targetCeloDistribution),
    })
  )

  distributeAccordingToSchedule = proxySend(
    this.connection,
    this.contract.methods.distributeAccordingToSchedule
  )

  async getConfig(): Promise<CeloDistributionScheduleConfig> {
    return {
      carbonOffsetting: {
        fraction: await this.getCarbonOffsettingFraction(),
        partner: await this.carbonOffsettingPartner(),
      },
      communityReward: {
        fraction: await this.getCommunityRewardFraction(),
        fund: await this.communityRewardFund(),
      },
      distributableAmount: await this.getDistributableAmount(),
      targetCeloDistribution: await this.getTargetCeloDistribution(),
    }
  }
}
