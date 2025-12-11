import { testWithAnvilL2 } from '@celo/dev-utils/anvil-test'
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
          " Mento Dollar         USDm   0x20FE3FD86C231fb8E28255452CEA7851f9C5f9c1 0x20FE3FD86C231fb8E28255452CEA7851f9C5f9c1 18       false         
      ",
        ],
        [
          " Mento Euro           EURm   0x5930519559Ffa7528a00BE445734036471c443a2 0x5930519559Ffa7528a00BE445734036471c443a2 18       false         
      ",
        ],
        [
          " Mento Brazilian Real BRLm  0xB2Fd9852Ca3D69678286A8635d661690906A3E9d 0xB2Fd9852Ca3D69678286A8635d661690906A3E9d 18       false         
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
          "name": "Mento Dollar",
          "symbol": "USDm",
          "whitelisted": "0x20FE3FD86C231fb8E28255452CEA7851f9C5f9c1",
          "token": "0x20FE3FD86C231fb8E28255452CEA7851f9C5f9c1",
          "decimals": "18",
          "usesAdapter": "false"
        },
        {
          "name": "Mento Euro",
          "symbol": "EURm",
          "whitelisted": "0x5930519559Ffa7528a00BE445734036471c443a2",
          "token": "0x5930519559Ffa7528a00BE445734036471c443a2",
          "decimals": "18",
          "usesAdapter": "false"
        },
        {
          "name": "Mento Brazilian Real",
          "symbol": "BRLm",
          "whitelisted": "0xB2Fd9852Ca3D69678286A8635d661690906A3E9d",
          "token": "0xB2Fd9852Ca3D69678286A8635d661690906A3E9d",
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
