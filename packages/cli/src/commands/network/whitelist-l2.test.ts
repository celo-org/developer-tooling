import { setupL2, testWithAnvil } from '@celo/dev-utils/lib/anvil-test'
import { ux } from '@oclif/core'
import Web3 from 'web3'
import { stripAnsiCodesFromNestedArray, testLocallyWithWeb3Node } from '../../test-utils/cliUtils'
import Whitelist from './whitelist'

process.env.NO_SYNCCHECK = 'true'

testWithAnvil('network:whitelist cmd', (web3: Web3) => {
  beforeEach(async () => {
    await setupL2(web3)
  })

  const writeMock = jest.spyOn(ux.write, 'stdout')

  afterAll(() => {
    jest.clearAllMocks()
  })

  it('can print the whitelist', async () => {
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
  it('modifies output when formating flag is passed', async () => {
    await testLocallyWithWeb3Node(Whitelist, ['--output=json'], web3)

    expect(writeMock.mock.calls).toMatchInlineSnapshot(`
      [
        [
          "[
        {
          "name": "Celo Euro",
          "symbol": "Celo Euro",
          "whitelisted": "0x0c6a0fde0A72bA3990870f0F99ED79a821703474",
          "token": "0x0c6a0fde0A72bA3990870f0F99ED79a821703474",
          "decimals": "18",
          "usesAdapter": "false"
        },
        {
          "name": "Celo Brazilian Real",
          "symbol": "Celo Brazilian Real",
          "whitelisted": "0x603931FF5E63d2fd3EEF1513a55fB773d8082195",
          "token": "0x603931FF5E63d2fd3EEF1513a55fB773d8082195",
          "decimals": "18",
          "usesAdapter": "false"
        },
        {
          "name": "Celo Dollar",
          "symbol": "Celo Dollar",
          "whitelisted": "0x82398F079D742F9D0Ae71ef8C99E5c68b2eD6705",
          "token": "0x82398F079D742F9D0Ae71ef8C99E5c68b2eD6705",
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
