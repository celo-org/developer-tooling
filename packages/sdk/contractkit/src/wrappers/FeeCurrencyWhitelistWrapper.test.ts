import { testWithAnvilL1 } from '@celo/dev-utils/lib/anvil-test'
import { newKitFromWeb3 } from '../kit'

testWithAnvilL1('FeeCurrencyWhitelist', (web3) => {
  const kit = newKitFromWeb3(web3)

  it('fetches fee currency information', async () => {
    const wrapper = await kit.contracts.getFeeCurrencyWhitelist()

    expect(await wrapper.getFeeCurrencyInformation()).toMatchInlineSnapshot(`
      [
        {
          "adaptedToken": undefined,
          "address": "0x0c6a0fde0A72bA3990870f0F99ED79a821703474",
          "decimals": 18,
          "name": "Celo Euro",
          "symbol": "Celo Euro",
        },
        {
          "adaptedToken": undefined,
          "address": "0x603931FF5E63d2fd3EEF1513a55fB773d8082195",
          "decimals": 18,
          "name": "Celo Brazilian Real",
          "symbol": "Celo Brazilian Real",
        },
        {
          "adaptedToken": undefined,
          "address": "0x82398F079D742F9D0Ae71ef8C99E5c68b2eD6705",
          "decimals": 18,
          "name": "Celo Dollar",
          "symbol": "Celo Dollar",
        },
      ]
    `)
  })
})
