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
          "address": "0x4CB77DF8f44817DE26D2dE10813e98dd0aA6AE00",
          "decimals": 18,
          "name": "Celo Euro",
          "symbol": "Celo Euro",
        },
        {
          "adaptedToken": undefined,
          "address": "0x4E2EE025A14c76020D24a511AC1Ce7755537fACf",
          "decimals": 18,
          "name": "Celo Dollar",
          "symbol": "Celo Dollar",
        },
        {
          "adaptedToken": undefined,
          "address": "0x5428F291b5d2555EA47EEaec4a12E434CF267cd2",
          "decimals": 18,
          "name": "Celo Brazilian Real",
          "symbol": "Celo Brazilian Real",
        },
      ]
    `)
  })

  it('fetches exchange rate', async () => {
    const wrapper = await kit.contracts.getFeeCurrencyDirectory()
    const exchangeRate = await wrapper.getExchangeRate('0x4E2EE025A14c76020D24a511AC1Ce7755537fACf')

    expect(exchangeRate.denominator).toEqual(new BigNumber('1000000000000000000000000'))
    expect(exchangeRate.numerator).toEqual(new BigNumber('1000000000000000000000000'))
  })

  it('fetches currency config', async () => {
    const wrapper = await kit.contracts.getFeeCurrencyDirectory()
    const currencyConfig = await wrapper.getCurrencyConfig(
      '0x4E2EE025A14c76020D24a511AC1Ce7755537fACf'
    )
    expect(currencyConfig).toMatchInlineSnapshot(`
      {
        "intrinsicGas": "21000",
        "oracle": "0x6962c2ecE4cAbAAa698a930c757F2ecE2411F1e5",
      }
    `)
  })

  it('fetches config', async () => {
    const wrapper = await kit.contracts.getFeeCurrencyDirectory()
    const config = await wrapper.getConfig()

    expect(config).toMatchInlineSnapshot(`
      {
        "intrinsicGasForAlternativeFeeCurrency": {
          "0x4CB77DF8f44817DE26D2dE10813e98dd0aA6AE00": "21000",
          "0x4E2EE025A14c76020D24a511AC1Ce7755537fACf": "21000",
          "0x5428F291b5d2555EA47EEaec4a12E434CF267cd2": "21000",
        },
      }
    `)
  })
})
