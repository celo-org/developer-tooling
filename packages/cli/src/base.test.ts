import { Connection } from '@celo/connect'
import { testWithAnvilL1 } from '@celo/dev-utils/lib/anvil-test'
import { ux } from '@oclif/core'
import Web3 from 'web3'
import { BaseCommand } from './base'
import { testLocallyWithWeb3Node } from './test-utils/cliUtils'

process.env.NO_SYNCCHECK = 'true'

testWithAnvilL1('BaseCommand', (web3: Web3) => {
  it('logs command execution error', async () => {
    class TestErrorCommand extends BaseCommand {
      async run() {
        throw new Error('test error')
      }
    }

    const errorSpy = jest.spyOn(console, 'error')

    await expect(testLocallyWithWeb3Node(TestErrorCommand, [], web3)).rejects.toThrow()

    expect(errorSpy.mock.calls).toMatchInlineSnapshot(`
      [
        [
          "
      Received an error during command execution, if you believe this is a bug you can create an issue here: 
                  
      https://github.com/celo-org/developer-tooling/issues/new?assignees=&labels=bug+report&projects=&template=BUG-FORM.yml

      ",
          [Error: test error],
        ],
      ]
    `)
  })

  it('logs connection close error', async () => {
    class TestConnectionStopErrorCommand extends BaseCommand {
      async run() {
        console.log('Successful run')
      }
    }

    const writeMock = jest.spyOn(ux.write, 'stdout')
    const logSpy = jest.spyOn(console, 'log')
    const errorSpy = jest.spyOn(console, 'error')

    jest.spyOn(Connection.prototype, 'stop').mockImplementation(() => {
      throw new Error('Mock connection stop error')
    })

    await testLocallyWithWeb3Node(TestConnectionStopErrorCommand, [], web3)

    expect(logSpy.mock.calls).toMatchInlineSnapshot(`
      [
        [
          "Successful run",
        ],
      ]
    `)
    expect(errorSpy.mock.calls).toMatchInlineSnapshot(`[]`)
    expect(writeMock.mock.calls).toMatchInlineSnapshot(`
      [
        [
          "Failed to close the connection: Error: Mock connection stop error
      ",
        ],
      ]
    `)
  })
})
