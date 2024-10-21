import { FeeCurrencyWhitelistWrapper } from '@celo/contractkit/lib/wrappers/FeeCurrencyWhitelistWrapper'
import { testWithAnvilL1 } from '@celo/dev-utils/lib/anvil-test'
import { ux } from '@oclif/core'
import Web3 from 'web3'
import { stripAnsiCodesFromNestedArray, testLocallyWithWeb3Node } from '../../test-utils/cliUtils'
import Whitelist from './whitelist'

process.env.NO_SYNCCHECK = 'true'

// Lots of commands, sometimes times out
jest.setTimeout(15000)

const writeMock = jest.spyOn(ux.write, 'stdout')

beforeEach(() => {
  writeMock.mockClear()
})

testWithAnvilL1('network:whitelist cmd', (web3: Web3) => {
  test('can print the whitelist', async () => {
    await testLocallyWithWeb3Node(Whitelist, [], web3)
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
          " Celo Dollar         cUSD   0x20FE3FD86C231fb8E28255452CEA7851f9C5f9c1 0x20FE3FD86C231fb8E28255452CEA7851f9C5f9c1 18       false         
      ",
        ],
        [
          " Celo Euro           cEUR   0x5930519559Ffa7528a00BE445734036471c443a2 0x5930519559Ffa7528a00BE445734036471c443a2 18       false         
      ",
        ],
        [
          " Celo Brazilian Real cREAL  0xB2Fd9852Ca3D69678286A8635d661690906A3E9d 0xB2Fd9852Ca3D69678286A8635d661690906A3E9d 18       false         
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

    await testLocallyWithWeb3Node(Whitelist, [], web3)

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
