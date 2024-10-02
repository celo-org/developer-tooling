import { testWithAnvilL2 } from '@celo/dev-utils/lib/anvil-test'
import { ux } from '@oclif/core'
import Web3 from 'web3'
import { stripAnsiCodesFromNestedArray, testLocallyWithWeb3Node } from '../../test-utils/cliUtils'
import Whitelist from './whitelist'

process.env.NO_SYNCCHECK = 'true'

testWithAnvilL2('network:whitelist cmd', (web3: Web3) => {
  const writeMock = jest.spyOn(ux.write, 'stdout')

  afterAll(() => {
    jest.clearAllMocks()
  })

  it('can print the whitelist', async () => {
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
          " Celo Euro           cEUR   0x06f60E083aDf016a98E3c7A1aFfa1c097B617aB9 0x06f60E083aDf016a98E3c7A1aFfa1c097B617aB9 18       false         
      ",
        ],
        [
          " Celo Dollar         cUSD   0x9cA64d4663B4A623C3E9a7F9155451647592bEc7 0x9cA64d4663B4A623C3E9a7F9155451647592bEc7 18       false         
      ",
        ],
        [
          " Celo Brazilian Real cREAL  0xC458f5ab25a47741205722d465cDea9aB1E1154A 0xC458f5ab25a47741205722d465cDea9aB1E1154A 18       false         
      ",
        ],
      ]
    `)
  })
  it('modifies output when formating flag is passed', async () => {
    await testLocallyWithWeb3Node(Whitelist, ['--output=json'], web3)

    expect(writeMock.mock.calls).toMatchInlineSnapshot(`
      [
        [
          "[
        {
          "name": "Celo Euro",
          "symbol": "cEUR",
          "whitelisted": "0x06f60E083aDf016a98E3c7A1aFfa1c097B617aB9",
          "token": "0x06f60E083aDf016a98E3c7A1aFfa1c097B617aB9",
          "decimals": "18",
          "usesAdapter": "false"
        },
        {
          "name": "Celo Dollar",
          "symbol": "cUSD",
          "whitelisted": "0x9cA64d4663B4A623C3E9a7F9155451647592bEc7",
          "token": "0x9cA64d4663B4A623C3E9a7F9155451647592bEc7",
          "decimals": "18",
          "usesAdapter": "false"
        },
        {
          "name": "Celo Brazilian Real",
          "symbol": "cREAL",
          "whitelisted": "0xC458f5ab25a47741205722d465cDea9aB1E1154A",
          "token": "0xC458f5ab25a47741205722d465cDea9aB1E1154A",
          "decimals": "18",
          "usesAdapter": "false"
        }
      ]
      ",
        ],
      ]
    `)
  })
})
