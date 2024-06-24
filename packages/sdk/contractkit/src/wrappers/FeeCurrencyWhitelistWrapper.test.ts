import { testWithGanache } from '@celo/dev-utils/lib/ganache-test'
import { newKitFromWeb3 } from '../kit'

testWithGanache('FeeCurrencyWhitelist', (web3) => {
  const kit = newKitFromWeb3(web3)

  it('fetches fee currency information', async () => {
    const wrapper = await kit.contracts.getFeeCurrencyWhitelist()

    expect(await wrapper.getFeeCurrencyInformation()).toMatchInlineSnapshot(`
      [
        {
          "adaptedToken": undefined,
          "address": "0x5315e44798395d4a952530d131249fE00f554565",
          "decimals": 18,
          "name": "Celo Dollar",
          "symbol": "cUSD",
        },
        {
          "adaptedToken": undefined,
          "address": "0x965D352283a3C8A016b9BBbC9bf6306665d495E7",
          "decimals": 18,
          "name": "Celo Brazilian Real",
          "symbol": "cREAL",
        },
        {
          "adaptedToken": undefined,
          "address": "0xdD66C23e07b4D6925b6089b5Fe6fc9E62941aFE8",
          "decimals": 18,
          "name": "Celo Euro",
          "symbol": "cEUR",
        },
      ]
    `)
  })
})
