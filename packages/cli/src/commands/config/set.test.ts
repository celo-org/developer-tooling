import { newKitFromWeb3 } from '@celo/contractkit'
import { testWithAnvilL1 } from '@celo/dev-utils/lib/anvil-test'
import { ux } from '@oclif/core'
import Web3 from 'web3'
import {
  extractHostFromWeb3,
  stripAnsiCodesFromNestedArray,
  testLocallyWithWeb3Node,
} from '../../test-utils/cliUtils'
import * as config from '../../utils/config'
import Set from './set'

process.env.NO_SYNCCHECK = 'true'

afterEach(async () => {
  jest.clearAllMocks()
  jest.restoreAllMocks()
})

testWithAnvilL1('config:set cmd', (web3: Web3) => {
  it('shows a warning if gasCurrency is passed', async () => {
    const kit = newKitFromWeb3(web3)
    const feeCurrencyDirectory = await kit.contracts.getFeeCurrencyDirectory()
    const consoleMock = jest.spyOn(ux, 'warn')
    const writeMock = jest.spyOn(config, 'writeConfig')

    await testLocallyWithWeb3Node(
      Set,
      ['--gasCurrency', (await feeCurrencyDirectory.getCurrencies())[0]],
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
        "telemetry": true,
      }
    `)
  })
})
