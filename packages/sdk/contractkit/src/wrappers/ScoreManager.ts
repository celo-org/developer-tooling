import { ScoreManager } from '@celo/abis-12/web3/ScoreManager'
import { BaseWrapper, proxyCall, valueToBigNumber } from './BaseWrapper'

/**
 * Contract handling validator scores.
 */
export class ScoreManagerWrapper extends BaseWrapper<ScoreManager> {
  getGroupScore = proxyCall(this.contract.methods.getGroupScore, undefined, valueToBigNumber)
  getValidatorScore = proxyCall(this.contract.methods.getValidatorScore)
}

export type ScoreManagerWrapperType = ScoreManagerWrapper
