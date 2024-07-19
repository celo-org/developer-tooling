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

  it('fetches exchange rate', async () => {
    const wrapper = await kit.contracts.getFeeCurrencyDirectory()
    const exchangeRate = await wrapper.getExchangeRate('0x82398F079D742F9D0Ae71ef8C99E5c68b2eD6705')

    expect(exchangeRate.denominator).toEqual(new BigNumber('1000000000000000000000000'))
    expect(exchangeRate.numerator).toEqual(new BigNumber('1000000000000000000000000'))
  })

  it('fetches currency config', async () => {
    const wrapper = await kit.contracts.getFeeCurrencyDirectory()
    const currencyConfig = await wrapper.getCurrencyConfig(
      '0x82398F079D742F9D0Ae71ef8C99E5c68b2eD6705'
    )
    expect(currencyConfig).toMatchInlineSnapshot(`
      {
        "intrinsicGas": "21000",
        "oracle": "0xF0358Ffb1DC83CbFAD879735918f3E3570c9ae05",
      }
    `)
  })

  it('fetches config', async () => {
    const wrapper = await kit.contracts.getFeeCurrencyDirectory()
    const config = await wrapper.getConfig()

    expect(config).toMatchInlineSnapshot(`
      {
        "intrinsicGasForAlternativeFeeCurrency": {
          "0x0c6a0fde0A72bA3990870f0F99ED79a821703474": "21000",
          "0x603931FF5E63d2fd3EEF1513a55fB773d8082195": "21000",
          "0x82398F079D742F9D0Ae71ef8C99E5c68b2eD6705": "21000",
        },
      }
    `)
  })
})
