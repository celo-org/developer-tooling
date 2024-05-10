import { newKitFromWeb3 } from '@celo/contractkit'
import { FeeCurrencyDirectoryWrapper } from '@celo/contractkit/lib/wrappers/FeeCurrencyDirectoryWrapper'
import { FeeCurrencyWhitelistWrapper } from '@celo/contractkit/lib/wrappers/FeeCurrencyWhitelistWrapper'
import { testWithGanache } from '@celo/dev-utils/lib/ganache-test'
import Web3 from 'web3'
import { getFeeCurrencyContractWrapper } from './fee-currency'

/**
 * Based on L1/L2 context returns an appropriate fee currency contract from contractkit.
 */
testWithGanache('getFeeCurrencyContractWrapper', async (web3: Web3) => {
  it('returns FeeCurrencyWhitelist for L1 context', async () => {
    const kit = newKitFromWeb3(web3)
    const wrapper = await getFeeCurrencyContractWrapper(kit, false)

    expect(wrapper).toBeInstanceOf(FeeCurrencyWhitelistWrapper)
  })

  // TODO it's currently expected to fail with "FeeCurrencyDirectory not (yet) registered"
  it.failing('returns FeeCurrencyDirectory for L2 context', async () => {
    const kit = newKitFromWeb3(web3)
    const wrapper = await getFeeCurrencyContractWrapper(kit, true)

    expect(wrapper).toBeInstanceOf(FeeCurrencyDirectoryWrapper)
  })
})
