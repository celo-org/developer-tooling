import { ScoreManager } from '@celo/abis-12/web3/ScoreManager'
import { BaseWrapper, fixidityValueToBigNumber, proxyCall } from './BaseWrapper'

/**
 * Contract handling validator scores.
 */
export class ScoreManagerWrapper extends BaseWrapper<ScoreManager> {
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
