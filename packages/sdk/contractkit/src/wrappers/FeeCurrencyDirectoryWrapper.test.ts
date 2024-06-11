import { testWithAnvil } from '@celo/dev-utils/lib/anvil-test'
import BigNumber from 'bignumber.js'
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

  it('fetches exchange rate', async () => {
    const wrapper = await kit.contracts.getFeeCurrencyDirectory()
    const exchangeRate = await wrapper.getExchangeRate('0xe6774BE4E5f97dB10cAFB4c00C74cFbdCDc434D9')

    expect(exchangeRate.denominator).toEqual(new BigNumber('1000000000000000000000000'))
    expect(exchangeRate.numerator).toEqual(new BigNumber('1000000000000000000000000'))
  })

  it('fetches currency config', async () => {
    const wrapper = await kit.contracts.getFeeCurrencyDirectory()
    const currencyConfig = await wrapper.getCurrencyConfig(
      '0xe6774BE4E5f97dB10cAFB4c00C74cFbdCDc434D9'
    )
    expect(currencyConfig).toMatchInlineSnapshot(`
      {
        "intrinsicGas": "21000",
        "oracle": "0xa2204011717369e044106e3bC93599E02538d65b",
      }
    `)
  })

  it('fetches config', async () => {
    const wrapper = await kit.contracts.getFeeCurrencyDirectory()
    const config = await wrapper.getConfig()

    expect(config).toMatchInlineSnapshot(`
      {
        "intrinsicGasForAlternativeFeeCurrency": {
          "0x2A3733dBc31980f02b12135C809b5da33BF3a1e9": "21000",
          "0xb7a33b4ad2B1f6b0a944232F5c71798d27Ad9272": "21000",
          "0xe6774BE4E5f97dB10cAFB4c00C74cFbdCDc434D9": "21000",
        },
      }
    `)
  })
})
