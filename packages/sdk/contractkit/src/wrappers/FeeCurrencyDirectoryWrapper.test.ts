import { testWithGanache } from '@celo/dev-utils/lib/ganache-test'
import { newKitFromWeb3 } from '../kit'

testWithGanache('FeeCurrencyDirectory', (web3) => {
  const kit = newKitFromWeb3(web3)

  // Fails with "FeeCurrencyDirectory not (yet) registered"
  it.failing('fetches fee currency information', async () => {
    const wrapper = await kit.contracts.getFeeCurrencyDirectory()

    expect(wrapper.getFeeCurrencyInformation()).toMatchInlineSnapshot()
  })
})
