import { epochRewardsABI } from '@celo/abis'
import { fromFixed } from '@celo/utils/lib/fixidity'
import { BaseWrapper, valueToBigNumber } from './BaseWrapper'

const parseFixidity = (v: string) => fromFixed(valueToBigNumber(v))

export class EpochRewardsWrapper extends BaseWrapper<typeof epochRewardsABI> {
  getRewardsMultiplierParameters = async () => {
    const res = await this.contract.read.getRewardsMultiplierParameters()
    return {
      max: parseFixidity(res[0].toString()),
      underspendAdjustment: parseFixidity(res[1].toString()),
      overspendAdjustment: parseFixidity(res[2].toString()),
    }
  }

  getTargetVotingYieldParameters = async () => {
    const res = await this.contract.read.getTargetVotingYieldParameters()
    return {
      target: parseFixidity(res[0].toString()),
      max: parseFixidity(res[1].toString()),
      adjustment: parseFixidity(res[2].toString()),
    }
  }

  getCommunityReward = async () => {
    const res = await this.contract.read.getCommunityRewardFraction()
    return parseFixidity(res.toString())
  }

  private _getCarbonOffsettingFraction = async () => {
    const res = await this.contract.read.getCarbonOffsettingFraction()
    return parseFixidity(res.toString())
  }

  private _getCarbonOffsettingPartner = async (): Promise<string> => {
    return this.contract.read.carbonOffsettingPartner()
  }

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

  getTargetValidatorEpochPayment = async () => {
    const res = await this.contract.read.targetValidatorEpochPayment()
    return valueToBigNumber(res.toString())
  }

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
