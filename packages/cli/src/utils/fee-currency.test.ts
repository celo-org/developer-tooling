import { isCel2 } from '@celo/connect'
import { newKitFromWeb3 } from '@celo/contractkit'
import { FeeCurrencyDirectoryWrapper } from '@celo/contractkit/lib/wrappers/FeeCurrencyDirectoryWrapper'
import { FeeCurrencyWhitelistWrapper } from '@celo/contractkit/lib/wrappers/FeeCurrencyWhitelistWrapper'
import { testWithAnvilL1, testWithAnvilL2 } from '@celo/dev-utils/lib/anvil-test'
import Web3 from 'web3'
import { getFeeCurrencyContractWrapper } from './fee-currency'

testWithAnvilL1('getFeeCurrencyContractWrapper', async (web3: Web3) => {
  it('returns FeeCurrencyWhitelist for L1 context', async () => {
    const kit = newKitFromWeb3(web3)

    const wrapper = await getFeeCurrencyContractWrapper(kit, await isCel2(web3))
    expect(wrapper).toBeInstanceOf(FeeCurrencyWhitelistWrapper)
  })
})

testWithAnvilL2('getFeeCurrencyContractWrapper', async (web3: Web3) => {
  it('returns FeeCurrencyDirectory for L2 context', async () => {
    const kit = newKitFromWeb3(web3)

    const wrapper = await getFeeCurrencyContractWrapper(kit, await isCel2(web3))
    expect(wrapper).toBeInstanceOf(FeeCurrencyDirectoryWrapper)
  })
})
