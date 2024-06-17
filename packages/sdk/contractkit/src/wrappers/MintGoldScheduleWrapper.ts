import { MintGoldSchedule } from '@celo/abis-12/web3/MintGoldSchedule'
import { BaseWrapper, proxyCall, proxySend, valueToString } from './BaseWrapper'

type TargetTotalSupplyResponse = {
  targetGoldTotalSupply: string
  communityTargetRewards: string
  carbonFundTargetRewards: string
}

type MintGoldScheduleConfig = {
  carbonOffsetting: {
    fraction: string
    fund: string
  }
  communityReward: {
    fraction: string
    fund: string
  }
  mintableAmount: string
  targetGoldTotalSupply: {
    carbonFundTargetRewards: string
    communityTargetRewards: string
    targetGoldTotalSupply: string
  }
}

export class MintGoldScheduleWrapper extends BaseWrapper<MintGoldSchedule> {
  communityRewardFund = proxyCall(
    this.contract.methods.communityRewardFund,
    undefined,
    valueToString
  )

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
  getRemainingBalanceToMint = proxyCall(
    this.contract.methods.getRemainingBalanceToMint,
    undefined,
    valueToString
  )
  getTotalMintedBySchedule = proxyCall(
    this.contract.methods.getTotalMintedBySchedule,
    undefined,
    valueToString
  )
  getMintableAmount = proxyCall(this.contract.methods.getMintableAmount, undefined, valueToString)
  getTargetGoldTotalSupply: () => Promise<TargetTotalSupplyResponse> = proxyCall(
    this.contract.methods.getTargetGoldTotalSupply,
    undefined,
    (res) => ({
      carbonFundTargetRewards: valueToString(res.carbonFundTargetRewards),
      communityTargetRewards: valueToString(res.communityTargetRewards),
      targetGoldTotalSupply: valueToString(res.targetGoldTotalSupply),
    })
  )

  activate = proxySend(this.connection, this.contract.methods.activate)
  mintAccordingToSchedule = proxySend(
    this.connection,
    this.contract.methods.mintAccordingToSchedule
  )
  setCommunityRewardFraction = proxySend(
    this.connection,
    this.contract.methods.setCommunityRewardFraction
  )
  setCarbonOffsettingFund = proxySend(
    this.connection,
    this.contract.methods.setCarbonOffsettingFund
  )

  async getConfig(): Promise<MintGoldScheduleConfig> {
    return {
      carbonOffsetting: {
        fraction: await this.getCarbonOffsettingFraction(),
        fund: await this.communityRewardFund(),
      },
      communityReward: {
        fraction: await this.getCommunityRewardFraction(),
        fund: await this.communityRewardFund(),
      },
      mintableAmount: await this.getMintableAmount(),
      targetGoldTotalSupply: await this.getTargetGoldTotalSupply(),
    }
  }
}
