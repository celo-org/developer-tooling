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
<<<<<<< HEAD
          "address": "0x4CB77DF8f44817DE26D2dE10813e98dd0aA6AE00",
=======
          "address": "0x2A3733dBc31980f02b12135C809b5da33BF3a1e9",
          "decimals": 18,
          "name": "Celo Brazilian Real",
          "symbol": "Celo Brazilian Real",
        },
        {
          "adaptedToken": undefined,
          "address": "0xb7a33b4ad2B1f6b0a944232F5c71798d27Ad9272",
          "decimals": 18,
>>>>>>> master
          "name": "Celo Euro",
          "symbol": "Celo Euro",
        },
        {
          "adaptedToken": undefined,
<<<<<<< HEAD
          "address": "0x4E2EE025A14c76020D24a511AC1Ce7755537fACf",
          "name": "Celo Dollar",
          "symbol": "Celo Dollar",
        },
        {
          "adaptedToken": undefined,
          "address": "0x5428F291b5d2555EA47EEaec4a12E434CF267cd2",
          "name": "Celo Brazilian Real",
          "symbol": "Celo Brazilian Real",
        },
=======
          "address": "0xe6774BE4E5f97dB10cAFB4c00C74cFbdCDc434D9",
          "decimals": 18,
          "name": "Celo Dollar",
          "symbol": "Celo Dollar",
        },
>>>>>>> master
      ]
    `)
  })

  it('fetches exchange rate', async () => {
    const wrapper = await kit.contracts.getFeeCurrencyDirectory()
<<<<<<< HEAD
    const exchangeRate = await wrapper.getExchangeRate('0x4E2EE025A14c76020D24a511AC1Ce7755537fACf')
=======
    const exchangeRate = await wrapper.getExchangeRate('0xe6774BE4E5f97dB10cAFB4c00C74cFbdCDc434D9')
>>>>>>> master

    expect(exchangeRate.denominator).toEqual(new BigNumber('1000000000000000000000000'))
    expect(exchangeRate.numerator).toEqual(new BigNumber('1000000000000000000000000'))
  })

  it('fetches currency config', async () => {
    const wrapper = await kit.contracts.getFeeCurrencyDirectory()
    const currencyConfig = await wrapper.getCurrencyConfig(
<<<<<<< HEAD
      '0x4E2EE025A14c76020D24a511AC1Ce7755537fACf'
=======
      '0xe6774BE4E5f97dB10cAFB4c00C74cFbdCDc434D9'
>>>>>>> master
    )
    expect(currencyConfig).toMatchInlineSnapshot(`
      {
        "intrinsicGas": "21000",
<<<<<<< HEAD
        "oracle": "0x6962c2ecE4cAbAAa698a930c757F2ecE2411F1e5",
=======
        "oracle": "0xa2204011717369e044106e3bC93599E02538d65b",
>>>>>>> master
      }
    `)
  })

  it('fetches config', async () => {
    const wrapper = await kit.contracts.getFeeCurrencyDirectory()
    const config = await wrapper.getConfig()

    expect(config).toMatchInlineSnapshot(`
      {
        "intrinsicGasForAlternativeFeeCurrency": {
<<<<<<< HEAD
          "0x4CB77DF8f44817DE26D2dE10813e98dd0aA6AE00": "21000",
          "0x4E2EE025A14c76020D24a511AC1Ce7755537fACf": "21000",
          "0x5428F291b5d2555EA47EEaec4a12E434CF267cd2": "21000",
=======
          "0x2A3733dBc31980f02b12135C809b5da33BF3a1e9": "21000",
          "0xb7a33b4ad2B1f6b0a944232F5c71798d27Ad9272": "21000",
          "0xe6774BE4E5f97dB10cAFB4c00C74cFbdCDc434D9": "21000",
>>>>>>> master
        },
      }
    `)
  })
})
