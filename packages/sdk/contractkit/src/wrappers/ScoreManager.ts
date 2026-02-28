import { scoreManagerABI } from '@celo/abis'
import { BaseWrapper, fixidityValueToBigNumber, toViemAddress } from './BaseWrapper'

/**
 * Contract handling validator scores.
 */
export class ScoreManagerWrapper extends BaseWrapper<typeof scoreManagerABI> {
  getGroupScore = async (group: string) => {
    const res = await this.contract.read.getGroupScore([toViemAddress(group)])
    return fixidityValueToBigNumber(res.toString())
  }
  getValidatorScore = async (signer: string) => {
    const res = await this.contract.read.getValidatorScore([toViemAddress(signer)])
    return fixidityValueToBigNumber(res.toString())
  }
}

export type ScoreManagerWrapperType = ScoreManagerWrapper
