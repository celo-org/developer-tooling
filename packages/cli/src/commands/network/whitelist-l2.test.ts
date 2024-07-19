import { setupL2, testWithAnvil } from '@celo/dev-utils/lib/anvil-test'
import Web3 from 'web3'
import { testLocallyWithWeb3Node } from '../../test-utils/cliUtils'
import Whitelist from './whitelist'

process.env.NO_SYNCCHECK = 'true'

afterAll(() => {
  jest.clearAllMocks()
})

testWithAnvil('network:whitelist cmd', (web3: Web3) => {
  test('can print the whitelist', async () => {
    const spy = jest.spyOn(console, 'log')

    await setupL2(web3)

    await testLocallyWithWeb3Node(Whitelist, [], web3)

    expect(spy.mock.calls[0][0]).toMatchInlineSnapshot(`
      "Available currencies:
      0x0c6a0fde0A72bA3990870f0F99ED79a821703474 - Celo Euro (Celo Euro) - 18 decimals
      0x603931FF5E63d2fd3EEF1513a55fB773d8082195 - Celo Brazilian Real (Celo Brazilian Real) - 18 decimals
      0x82398F079D742F9D0Ae71ef8C99E5c68b2eD6705 - Celo Dollar (Celo Dollar) - 18 decimals"
    `)
  })
})
