import { BaseWrapper, fixidityValueToBigNumber, proxyCall } from './BaseWrapper'

/**
 * Contract handling validator scores.
 */
export class ScoreManagerWrapper extends BaseWrapper {
  getGroupScore = proxyCall(
    this.contract.methods.getGroupScore,
    undefined,
    fixidityValueToBigNumber
  )
  getValidatorScore = proxyCall(
    this.contract.methods.getValidatorScore,
    undefined,
    fixidityValueToBigNumber
  )
}

export type ScoreManagerWrapperType = ScoreManagerWrapper
