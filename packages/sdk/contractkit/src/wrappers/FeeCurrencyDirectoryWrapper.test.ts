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
          "address": "0x20FE3FD86C231fb8E28255452CEA7851f9C5f9c1",
          "decimals": 18,
          "name": "Celo Dollar",
          "symbol": "cUSD",
        },
        {
          "adaptedToken": undefined,
          "address": "0x5930519559Ffa7528a00BE445734036471c443a2",
          "decimals": 18,
          "name": "Celo Euro",
          "symbol": "cEUR",
        },
        {
          "adaptedToken": undefined,
          "address": "0xB2Fd9852Ca3D69678286A8635d661690906A3E9d",
          "decimals": 18,
          "name": "Celo Brazilian Real",
          "symbol": "cREAL",
        },
      ]
    `)
  })

  it('fetches exchange rate', async () => {
    const wrapper = await kit.contracts.getFeeCurrencyDirectory()
    const addresses = await wrapper.getAddresses()
    const exchangeRate = await wrapper.getExchangeRate(addresses[0])

    expect(exchangeRate.denominator).toEqual(new BigNumber('1000000000000000000000000'))
    expect(exchangeRate.numerator).toEqual(new BigNumber('1000000000000000000000000'))
  })

  it('fetches currency config', async () => {
    const wrapper = await kit.contracts.getFeeCurrencyDirectory()
    const addresses = await wrapper.getAddresses()
    const currencyConfig = await wrapper.getCurrencyConfig(addresses[0])
    expect(currencyConfig).toMatchInlineSnapshot(`
      {
        "intrinsicGas": "21000",
        "oracle": "0xeA6aCD469A2C2F32E167a9Ce50db735B61e00A2a",
      }
    `)
  })

  it('fetches config', async () => {
    const wrapper = await kit.contracts.getFeeCurrencyDirectory()
    const config = await wrapper.getConfig()

    expect(config).toMatchInlineSnapshot(`
      {
        "intrinsicGasForAlternativeFeeCurrency": {
          "0x20FE3FD86C231fb8E28255452CEA7851f9C5f9c1": "21000",
          "0x5930519559Ffa7528a00BE445734036471c443a2": "21000",
          "0xB2Fd9852Ca3D69678286A8635d661690906A3E9d": "21000",
        },
      }
    `)
  })
})
