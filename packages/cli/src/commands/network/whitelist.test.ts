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
          " Celo Euro           Celo Euro           0x06f60E083aDf016a98E3c7A1aFfa1c097B617aB9 0x06f60E083aDf016a98E3c7A1aFfa1c097B617aB9 18       false         
      ",
        ],
        [
          " Celo Dollar         Celo Dollar         0x9cA64d4663B4A623C3E9a7F9155451647592bEc7 0x9cA64d4663B4A623C3E9a7F9155451647592bEc7 18       false         
      ",
        ],
        [
          " Celo Brazilian Real Celo Brazilian Real 0xC458f5ab25a47741205722d465cDea9aB1E1154A 0xC458f5ab25a47741205722d465cDea9aB1E1154A 18       false         
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
