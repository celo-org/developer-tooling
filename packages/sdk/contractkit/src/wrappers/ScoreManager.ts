import { scoreManagerABI } from '@celo/abis'
import { BaseWrapper, fixidityValueToBigNumber, proxyCall } from './BaseWrapper'

/**
 * Contract handling validator scores.
 */
export class ScoreManagerWrapper extends BaseWrapper<typeof scoreManagerABI> {
  getGroupScore = proxyCall(this.contract, 'getGroupScore', undefined, (res) =>
    fixidityValueToBigNumber(res.toString())
  )
  getValidatorScore = proxyCall(this.contract, 'getValidatorScore', undefined, (res) =>
    fixidityValueToBigNumber(res.toString())
  )
}

export type ScoreManagerWrapperType = ScoreManagerWrapper
