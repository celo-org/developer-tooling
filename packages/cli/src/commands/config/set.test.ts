import { ux } from '@oclif/core'
import { extractHostFromWeb3, stripAnsiCodesFromNestedArray, testLocallyWithWeb3Node } from '../../test-utils/cliUtils'
import * as config from '../../utils/config'
import Set from './set'
import { testWithAnvil } from '@celo/dev-utils/lib/anvil-test'
import Web3 from 'web3'

process.env.NO_SYNCCHECK = 'true'

afterEach(async () => {
  jest.clearAllMocks()
  jest.restoreAllMocks()
})

testWithAnvil('config:set cmd', (web3: Web3) => {
  it('shows a warning if gasCurrency is passed', async () => {
    const consoleMock = jest.spyOn(ux, 'warn')
    const writeMock = jest.spyOn(config, 'writeConfig')

    await testLocallyWithWeb3Node(
      Set,
      ['--gasCurrency', '0xe6774BE4E5f97dB10cAFB4c00C74cFbdCDc434D9'],
      web3
    )
    expect(stripAnsiCodesFromNestedArray(consoleMock.mock.calls as string[][]))
      .toMatchInlineSnapshot(`
      [
        [
          "
      Setting a default gasCurrency has been removed from the config, you may still use the --gasCurrency on every command.
      Did you value this feature a lot and would like to see it back? Let us know at https://github.com/celo-org/developer-tooling/discussions/92",
        ],
      ]
    `)
    expect(writeMock.mock.calls[0][1]).toMatchInlineSnapshot(`
      {
        "node": "${extractHostFromWeb3(web3)}",
      }
    `)
  })
})
