import { testWithAnvil } from '@celo/dev-utils/lib/anvil-test'
import { newKitFromWeb3 } from '../kit'

testWithAnvil('FeeCurrencyDirectory', (web3) => {
  const kit = newKitFromWeb3(web3)

  it('fetches fee currency information', async () => {
    const wrapper = await kit.contracts.getFeeCurrencyDirectory()

    expect(await wrapper.getFeeCurrencyInformation()).toMatchInlineSnapshot(`
      [
        {
          "adaptedToken": undefined,
          "address": "0x2A3733dBc31980f02b12135C809b5da33BF3a1e9",
          "name": "Celo Brazilian Real",
          "symbol": "Celo Brazilian Real",
        },
        {
          "adaptedToken": undefined,
          "address": "0xb7a33b4ad2B1f6b0a944232F5c71798d27Ad9272",
          "name": "Celo Euro",
          "symbol": "Celo Euro",
        },
        {
          "adaptedToken": undefined,
          "address": "0xe6774BE4E5f97dB10cAFB4c00C74cFbdCDc434D9",
          "name": "Celo Dollar",
          "symbol": "Celo Dollar",
        },
      ]
    `)
  })
})
