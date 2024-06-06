import { newKitFromWeb3 } from '@celo/contractkit'
import { testWithAnvil } from '@celo/dev-utils/lib/anvil-test'
import Web3 from 'web3'
import { setupL2 } from '../../test-utils/chain-setup'
import { testLocallyWithWeb3Node } from '../../test-utils/cliUtils'
import Whitelist from './whitelist'

process.env.NO_SYNCCHECK = 'true'

const spy = jest.spyOn(console, 'log')

afterAll(() => {
  jest.clearAllMocks()
})

testWithAnvil('network:whitelist cmd', (web3: Web3) => {
  test('can print the whitelist', async () => {
    const kit = newKitFromWeb3(web3)

    await setupL2(kit)

    await testLocallyWithWeb3Node(Whitelist, [], web3)
    expect(spy.mock.calls[0][0]).toMatchInlineSnapshot(`
      "Available currencies:
      0x2A3733dBc31980f02b12135C809b5da33BF3a1e9 - Celo Brazilian Real (Celo Brazilian Real)
      0xb7a33b4ad2B1f6b0a944232F5c71798d27Ad9272 - Celo Euro (Celo Euro)
      0xe6774BE4E5f97dB10cAFB4c00C74cFbdCDc434D9 - Celo Dollar (Celo Dollar)"
    `)
  })
})
