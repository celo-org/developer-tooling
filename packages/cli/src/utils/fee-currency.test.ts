import { newKitFromProvider } from '@celo/contractkit'
import { FeeCurrencyDirectoryWrapper } from '@celo/contractkit/lib/wrappers/FeeCurrencyDirectoryWrapper'
import { testWithAnvilL2 } from '@celo/dev-utils/anvil-test'
import { getFeeCurrencyContractWrapper } from './fee-currency'

testWithAnvilL2('getFeeCurrencyContractWrapper', async (provider) => {
  it('returns FeeCurrencyDirectory for L2 context', async () => {
    const kit = newKitFromProvider(provider)

    const wrapper = await getFeeCurrencyContractWrapper(kit)
    expect(wrapper).toBeInstanceOf(FeeCurrencyDirectoryWrapper)
  })
})
