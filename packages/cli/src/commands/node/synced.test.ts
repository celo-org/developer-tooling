import { viem_testWithAnvil } from '@celo/dev-utils/viem/anvil-test'
import { stripAnsiCodesFromNestedArray, testLocallyWithViemNode } from '../../test-utils/cliUtils'
import Synced from './synced'

const nodeIsSynced = jest.fn()
const ethNodeIsSyncing = jest.fn()
jest.mock('../../utils/helpers', () => ({
  ...jest.requireActual('../../utils/helpers'),
  ethNodeIsSyncing: () => ethNodeIsSyncing(),
  nodeIsSynced: () => nodeIsSynced(),
}))

viem_testWithAnvil('node:synced cmd', (client) => {
  beforeEach(() => {
    process.env.NO_SYNCCHECK = undefined
  })
  afterEach(() => {
    jest.clearAllMocks()
    process.env.NO_SYNCCHECK = 'true'
  })

  it("logs if it's synced", async () => {
    const logMock = jest.spyOn(console, 'log')
    nodeIsSynced.mockResolvedValueOnce(true)
    await testLocallyWithViemNode(Synced, [], client)
    expect(stripAnsiCodesFromNestedArray(logMock.mock.calls)).toMatchInlineSnapshot(`
      [
        [
          true,
        ],
      ]
    `)
  })

  it("logs if it's not synced", async () => {
    const logMock = jest.spyOn(console, 'log')
    nodeIsSynced.mockResolvedValueOnce(false)
    await testLocallyWithViemNode(Synced, [], client)
    expect(stripAnsiCodesFromNestedArray(logMock.mock.calls)).toMatchInlineSnapshot(`
      [
        [
          false,
        ],
      ]
    `)
  })

  it("logs if it's synced w/ flag", async () => {
    const logMock = jest.spyOn(console, 'log')
    ethNodeIsSyncing.mockResolvedValueOnce({
      startingBlock: 1n,
      currentBlock: 42n,
      highestBlock: 69n,
    })
    nodeIsSynced.mockResolvedValueOnce(true)
    await testLocallyWithViemNode(Synced, ['--verbose'], client)
    expect(stripAnsiCodesFromNestedArray(logMock.mock.calls)).toMatchInlineSnapshot(`
      [
        [
          {
            "currentBlock": 42n,
            "highestBlock": 69n,
            "startingBlock": 1n,
          },
        ],
        [
          true,
        ],
      ]
    `)
  })
})
