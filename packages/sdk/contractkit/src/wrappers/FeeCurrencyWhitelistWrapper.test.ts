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
})
