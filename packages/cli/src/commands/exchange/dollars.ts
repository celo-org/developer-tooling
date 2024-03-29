import { StableToken } from '@celo/contractkit'
import ExchangeStableBase from '../../exchange-stable-base'
import { CustomFlags } from '../../utils/command'
export default class ExchangeDollars extends ExchangeStableBase {
  static description = 'Exchange Celo Dollars for CELO via Mento'

  static flags = {
    ...ExchangeStableBase.flags,
    from: CustomFlags.address({
      required: true,
      description: 'The address with Celo Dollars to exchange',
    }),
    value: CustomFlags.wei({
      required: true,
      description: 'The value of Celo Dollars to exchange for CELO',
    }),
  }

  static examples = [
    'dollars --value 10000000000000 --from 0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d',
    'dollars --value 10000000000000 --forAtLeast 50000000000000 --from 0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d',
  ]

  async init() {
    this._stableCurrency = StableToken.cUSD
    await super.init()
  }
}
