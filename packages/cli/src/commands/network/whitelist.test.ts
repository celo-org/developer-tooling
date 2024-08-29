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
          " Name                Symbol              Whitelisted Address                        Token Address                              Decimals Uses Adapter? 
      ",
        ],
        [
          " ─────────────────── ─────────────────── ────────────────────────────────────────── ────────────────────────────────────────── ──────── ───────────── 
      ",
        ],
        [
          " Celo Euro           Celo Euro           0x0c6a0fde0A72bA3990870f0F99ED79a821703474 0x0c6a0fde0A72bA3990870f0F99ED79a821703474 18       false         
      ",
        ],
        [
          " Celo Brazilian Real Celo Brazilian Real 0x603931FF5E63d2fd3EEF1513a55fB773d8082195 0x603931FF5E63d2fd3EEF1513a55fB773d8082195 18       false         
      ",
        ],
        [
          " Celo Dollar         Celo Dollar         0x82398F079D742F9D0Ae71ef8C99E5c68b2eD6705 0x82398F079D742F9D0Ae71ef8C99E5c68b2eD6705 18       false         
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
