import { testWithAnvilL2 } from '@celo/dev-utils/lib/anvil-test'
import Web3 from 'web3'
import { stripAnsiCodesFromNestedArray, testLocallyWithWeb3Node } from '../../test-utils/cliUtils'
import Get from './get'

process.env.NO_SYNCCHECK = 'true'

afterEach(async () => {
  jest.clearAllMocks()
  jest.restoreAllMocks()
})

testWithAnvilL2('config:get cmd', (web3: Web3) => {
  it('shows the config', async () => {
    const logMock = jest.spyOn(console, 'log').mockImplementation()
    await testLocallyWithWeb3Node(Get, [], web3)
    expect(stripAnsiCodesFromNestedArray(logMock.mock.calls)).toMatchInlineSnapshot(`
      [
        [
          "node: http://127.0.0.1:8620
      derivationPath: m/44'/60'/0'",
        ],
      ]
    `)
  })
})
