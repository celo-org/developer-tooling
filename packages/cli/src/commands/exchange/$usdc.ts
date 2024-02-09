import { StableToken } from '@celo/contractkit'
import ExchangeStableBase from '../../exchange-stable-base'
import { CustomFlags } from '../../utils/command'
export default class ExchangeReals extends ExchangeStableBase {
  static description = 'Exchange Circle USD Coin ($USDC) for CELO via the stability mechanism'

  static flags = {
    ...ExchangeStableBase.flags,
    from: CustomFlags.address({
      required: true,
      description: 'The address with Circle USD Coin ($USDC) to exchange',
    }),
    value: CustomFlags.wei({
      required: true,
      description: 'The value of Circle USD Coin ($USDC) to exchange for CELO',
    }),
  }

  static examples = [
    'reals --value 10000000000000 --from 0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d',
    'reals --value 10000000000000 --forAtLeast 50000000000000 --from 0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d',
  ]

  async init() {
    this._stableCurrency = StableToken.$USDC
    await super.init()
  }
}
