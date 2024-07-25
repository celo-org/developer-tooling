import { FeeCurrencyWhitelistWrapper } from '@celo/contractkit/lib/wrappers/FeeCurrencyWhitelistWrapper'
import { testWithGanache } from '@celo/dev-utils/lib/ganache-test'
import { ux } from '@oclif/core'
import { stripAnsiCodesFromNestedArray, testLocally } from '../../test-utils/cliUtils'
import Whitelist from './whitelist'

process.env.NO_SYNCCHECK = 'true'

// Lots of commands, sometimes times out
jest.setTimeout(15000)

const writeMock = jest.spyOn(ux.write, 'stdout')

beforeEach(() => {
  writeMock.mockClear()
})

testWithGanache('network:whitelist cmd', () => {
  test('can print the whitelist', async () => {
    await testLocally(Whitelist, [])
    expect(stripAnsiCodesFromNestedArray(writeMock.mock.calls)).toMatchInlineSnapshot(`
      [
        [
          " Name                Symbol Whitelisted Address                        Token Address                              Decimals Uses Adapter? 
      ",
        ],
        [
          " ─────────────────── ────── ────────────────────────────────────────── ────────────────────────────────────────── ──────── ───────────── 
      ",
        ],
        [
          " Celo Dollar         cUSD   0x5315e44798395d4a952530d131249fE00f554565 0x5315e44798395d4a952530d131249fE00f554565 18       false         
      ",
        ],
        [
          " Celo Brazilian Real cREAL  0x965D352283a3C8A016b9BBbC9bf6306665d495E7 0x965D352283a3C8A016b9BBbC9bf6306665d495E7 18       false         
      ",
        ],
        [
          " Celo Euro           cEUR   0xdD66C23e07b4D6925b6089b5Fe6fc9E62941aFE8 0xdD66C23e07b4D6925b6089b5Fe6fc9E62941aFE8 18       false         
      ",
        ],
      ]
    `)
  })

  test('handles adapted tokens too', async () => {
    const mock = jest
      .spyOn(FeeCurrencyWhitelistWrapper.prototype, 'getFeeCurrencyInformation')
      .mockImplementation(() =>
        Promise.resolve([
          {
            name: 'mock token',
            symbol: 'MCK',
            address: '0x123',
            adaptedToken: '0x456',
            decimals: 69,
          },
        ])
      )

    await testLocally(Whitelist, [])

    expect(stripAnsiCodesFromNestedArray(writeMock.mock.calls)).toMatchInlineSnapshot(`
      [
        [
          " Name       Symbol Whitelisted Address Token Address Decimals Uses Adapter? 
      ",
        ],
        [
          " ────────── ────── ─────────────────── ───────────── ──────── ───────────── 
      ",
        ],
        [
          " mock token MCK    0x123               0x456         69       true          
      ",
        ],
      ]
    `)

    mock.mockClear()
  })
})
