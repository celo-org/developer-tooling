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
      0x4CB77DF8f44817DE26D2dE10813e98dd0aA6AE00 - Celo Euro (Celo Euro)
      0x4E2EE025A14c76020D24a511AC1Ce7755537fACf - Celo Dollar (Celo Dollar)
      0x5428F291b5d2555EA47EEaec4a12E434CF267cd2 - Celo Brazilian Real (Celo Brazilian Real)"
    `)
  })
})
