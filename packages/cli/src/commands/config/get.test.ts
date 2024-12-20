import { testWithAnvilL2 } from '@celo/dev-utils/lib/anvil-test'
import Web3 from 'web3'
import { stripAnsiCodesAndTxHashes, testLocallyWithWeb3Node } from '../../test-utils/cliUtils'
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
    expect(stripAnsiCodesAndTxHashes(logMock.mock.calls[0][0].replace(/:\d+/, ':PORT')))
      .toMatchInlineSnapshot(`
      "node: http://127.0.0.1:PORT
      derivationPath: m/44'/52752'/0'
      telemetry: true"
    `)
  })
})
