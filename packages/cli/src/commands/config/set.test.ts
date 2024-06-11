import { ux } from '@oclif/core'
import { stripAnsiCodesFromNestedArray, testLocally } from '../../test-utils/cliUtils'
import * as config from '../../utils/config'
import Set from './set'

process.env.NO_SYNCCHECK = 'true'

afterEach(async () => {
  jest.clearAllMocks()
  jest.restoreAllMocks()
})

describe('config:set cmd', () => {
  it('shows a warning if gasCurrency is passed', async () => {
    const consoleMock = jest.spyOn(ux, 'warn')
    const writeMock = jest.spyOn(config, 'writeConfig')

    await testLocally(Set, ['--gasCurrency', '0x5315e44798395d4a952530d131249fE00f554565'])
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
        "node": "http://localhost:8545",
      }
    `)
  })
})
