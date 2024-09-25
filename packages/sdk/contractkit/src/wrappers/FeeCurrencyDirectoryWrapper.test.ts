import { testWithAnvilL1 } from '@celo/dev-utils/lib/anvil-test'
import BigNumber from 'bignumber.js'
import { newKitFromWeb3 } from '../kit'

testWithAnvilL1('FeeCurrencyDirectory', (web3) => {
  const kit = newKitFromWeb3(web3)

  it('fetches fee currency information', async () => {
    const wrapper = await kit.contracts.getFeeCurrencyDirectory()

    expect(await wrapper.getFeeCurrencyInformation()).toMatchInlineSnapshot(`
      [
        {
          "adaptedToken": undefined,
          "address": "0x06f60E083aDf016a98E3c7A1aFfa1c097B617aB9",
          "decimals": 18,
          "name": "Celo Euro",
          "symbol": "Celo Euro",
        },
        {
          "adaptedToken": undefined,
          "address": "0x9cA64d4663B4A623C3E9a7F9155451647592bEc7",
          "decimals": 18,
          "name": "Celo Dollar",
          "symbol": "Celo Dollar",
        },
        {
          "adaptedToken": undefined,
          "address": "0xC458f5ab25a47741205722d465cDea9aB1E1154A",
          "decimals": 18,
          "name": "Celo Brazilian Real",
          "symbol": "Celo Brazilian Real",
        },
      ]
    `)
  })

  it('fetches exchange rate', async () => {
    const wrapper = await kit.contracts.getFeeCurrencyDirectory()
    const exchangeRate = await wrapper.getExchangeRate('0x06f60E083aDf016a98E3c7A1aFfa1c097B617aB9')

    expect(exchangeRate.denominator).toEqual(new BigNumber('1000000000000000000000000'))
    expect(exchangeRate.numerator).toEqual(new BigNumber('1000000000000000000000000'))
  })

  it('fetches currency config', async () => {
    const wrapper = await kit.contracts.getFeeCurrencyDirectory()
    const currencyConfig = await wrapper.getCurrencyConfig(
      '0x06f60E083aDf016a98E3c7A1aFfa1c097B617aB9'
    )
    expect(currencyConfig).toMatchInlineSnapshot(`
      {
        "intrinsicGas": "21000",
        "oracle": "0xAa2b1051A90b6BCa493E844338307dCe6817F4d7",
      }
    `)
  })

  it('fetches config', async () => {
    const wrapper = await kit.contracts.getFeeCurrencyDirectory()
    const config = await wrapper.getConfig()

    expect(config).toMatchInlineSnapshot(`
      {
        "intrinsicGasForAlternativeFeeCurrency": {
          "0x06f60E083aDf016a98E3c7A1aFfa1c097B617aB9": "21000",
          "0x9cA64d4663B4A623C3E9a7F9155451647592bEc7": "21000",
          "0xC458f5ab25a47741205722d465cDea9aB1E1154A": "21000",
        },
      }
    `)
  })
})
