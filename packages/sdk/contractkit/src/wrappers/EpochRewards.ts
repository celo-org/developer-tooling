import { epochRewardsABI } from '@celo/abis'
import { fromFixed } from '@celo/utils/lib/fixidity'
import { BaseWrapper, proxyCall, valueToBigNumber } from './BaseWrapper'

const parseFixidity = (v: string) => fromFixed(valueToBigNumber(v))

export class EpochRewardsWrapper extends BaseWrapper<typeof epochRewardsABI> {
  getRewardsMultiplierParameters = proxyCall(
    this.contract,
    'getRewardsMultiplierParameters',
    undefined,
    (res: any) => ({
      max: parseFixidity(res[0]),
      underspendAdjustment: parseFixidity(res[1]),
      overspendAdjustment: parseFixidity(res[2]),
    })
  )

  getTargetVotingYieldParameters = proxyCall(
    this.contract,
    'getTargetVotingYieldParameters',
    undefined,
    (res: any) => ({
      target: parseFixidity(res[0]),
      max: parseFixidity(res[1]),
      adjustment: parseFixidity(res[2]),
    })
  )

  getCommunityReward = proxyCall(
    this.contract,
    'getCommunityRewardFraction',
    undefined,
    parseFixidity
  )

  private _getCarbonOffsettingFraction = proxyCall(
    this.contract,
    'getCarbonOffsettingFraction',
    undefined,
    parseFixidity
  )

  private _getCarbonOffsettingPartner: (...args: any[]) => Promise<string> = proxyCall(
    this.contract,
    'carbonOffsettingPartner'
  )

  getCarbonOffsetting = async (): Promise<{
    factor: import('bignumber.js').default
    partner: string
  }> => {
    const factor = await this._getCarbonOffsettingFraction()
    const partner: string = await this._getCarbonOffsettingPartner()
    return {
      factor,
      partner,
    }
  }

  getTargetValidatorEpochPayment = proxyCall(
    this.contract,
    'targetValidatorEpochPayment',
    undefined,
    valueToBigNumber
  )

  async getConfig() {
    const rewardsMultiplier = await this.getRewardsMultiplierParameters()
    const carbonOffsetting = await this.getCarbonOffsetting()
    const communityReward = await this.getCommunityReward()
    const targetVotingYield = await this.getTargetVotingYieldParameters()
    const targetValidatorEpochPayment = await this.getTargetValidatorEpochPayment()
    return {
      rewardsMultiplier,
      carbonOffsetting,
      communityReward,
      targetVotingYield,
      targetValidatorEpochPayment,
    }
  }
}

export type EpochRewardsWrapperType = EpochRewardsWrapper
