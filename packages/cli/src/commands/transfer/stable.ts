import { StableToken } from '@celo/contractkit'
import { Flags } from '@oclif/core'
import { TransferStableBase } from '../../transfer-stable-base'
import { enumEntriesDupWithLowercase } from '../../utils/helpers'

const stableTokenOptions = enumEntriesDupWithLowercase(Object.entries(StableToken))
export default class TransferStable extends TransferStableBase {
  static description = 'Transfer a stable token to a specified address.'

  static flags = {
    ...TransferStableBase.flags,
    stableToken: Flags.enum({
      options: Object.keys(stableTokenOptions) as Array<StableToken | Lowercase<StableToken>>,
      description: 'Name of the stable to be transfered',
    }),
  }

  static examples = [
    'stable --from 0xa0Af2E71cECc248f4a7fD606F203467B500Dd53B --to 0x5409ed021d9299bf6814279a6a1411a7e866a631 --value 1000000000000000000 --stableToken cStableTokenSymbol',
  ]

  async init() {
    const res = await this.parse(TransferStable)
    const stableName = res.flags.stableToken
    this._stableCurrency = stableTokenOptions[stableName as StableToken]
    await super.init()
  }
}
