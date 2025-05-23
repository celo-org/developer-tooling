import { stripAnsiCodesAndTxHashes, testLocally } from '../../test-utils/cliUtils'
import Get from './get'

process.env.NO_SYNCCHECK = 'true'

afterEach(async () => {
  jest.clearAllMocks()
  jest.restoreAllMocks()
})

describe('config:get cmd', () => {
  it('shows the config', async () => {
    const logMock = jest.spyOn(console, 'log').mockImplementation()
    await testLocally(Get, [])
    expect(stripAnsiCodesAndTxHashes(logMock.mock.calls[0][0].replace(/:\d+/, ':PORT')))
      .toMatchInlineSnapshot(`
      "node: http://localhost:PORT
      derivationPath: m/44'/60'/0'
      telemetry: true"
    `)
  })
})
