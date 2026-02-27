import { epochRewardsABI } from '@celo/abis'
import { fromFixed } from '@celo/utils/lib/fixidity'
import { BaseWrapper, proxyCall, valueToBigNumber } from './BaseWrapper'

const parseFixidity = (v: string) => fromFixed(valueToBigNumber(v))

export class EpochRewardsWrapper extends BaseWrapper<typeof epochRewardsABI> {
  getRewardsMultiplierParameters = proxyCall(
    this.contract,
    'getRewardsMultiplierParameters',
    undefined,
    (res) => ({
      max: parseFixidity(res[0].toString()),
      underspendAdjustment: parseFixidity(res[1].toString()),
      overspendAdjustment: parseFixidity(res[2].toString()),
    })
  )

  getTargetVotingYieldParameters = proxyCall(
    this.contract,
    'getTargetVotingYieldParameters',
    undefined,
    (res) => ({
      target: parseFixidity(res[0].toString()),
      max: parseFixidity(res[1].toString()),
      adjustment: parseFixidity(res[2].toString()),
    })
  )

  getCommunityReward = proxyCall(this.contract, 'getCommunityRewardFraction', undefined, (res) =>
    parseFixidity(res.toString())
  )

  private _getCarbonOffsettingFraction = proxyCall(
    this.contract,
    'getCarbonOffsettingFraction',
    undefined,
    (res) => parseFixidity(res.toString())
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
    (res) => valueToBigNumber(res.toString())
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
