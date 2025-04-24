import { newKitFromWeb3 } from '@celo/contractkit'
import { FeeCurrencyDirectoryWrapper } from '@celo/contractkit/lib/wrappers/FeeCurrencyDirectoryWrapper'
import { testWithAnvilL2 } from '@celo/dev-utils/lib/anvil-test'
import Web3 from 'web3'
import { getFeeCurrencyContractWrapper } from './fee-currency'

testWithAnvilL2('getFeeCurrencyContractWrapper', async (web3: Web3) => {
  it('returns FeeCurrencyDirectory for L2 context', async () => {
    const kit = newKitFromWeb3(web3)

    const wrapper = await getFeeCurrencyContractWrapper(kit)
    expect(wrapper).toBeInstanceOf(FeeCurrencyDirectoryWrapper)
  })
})
