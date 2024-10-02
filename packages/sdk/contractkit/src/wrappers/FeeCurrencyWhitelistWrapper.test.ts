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
          "address": "0x06f60E083aDf016a98E3c7A1aFfa1c097B617aB9",
          "decimals": 18,
          "name": "Celo Euro",
          "symbol": "cEUR",
        },
        {
          "adaptedToken": undefined,
          "address": "0x9cA64d4663B4A623C3E9a7F9155451647592bEc7",
          "decimals": 18,
          "name": "Celo Dollar",
          "symbol": "cUSD",
        },
        {
          "adaptedToken": undefined,
          "address": "0xC458f5ab25a47741205722d465cDea9aB1E1154A",
          "decimals": 18,
          "name": "Celo Brazilian Real",
          "symbol": "cREAL",
        },
      ]
    `)
  })
})
