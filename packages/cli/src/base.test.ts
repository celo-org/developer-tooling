import { testWithAnvilL1 } from '@celo/dev-utils/lib/anvil-test'
import Web3 from 'web3'
import { BaseCommand } from './base'
import { testLocallyWithWeb3Node } from './test-utils/cliUtils'

process.env.NO_SYNCCHECK = 'true'

class TestErrorCommand extends BaseCommand {
  async run() {
    throw new Error('test error')
  }
}

testWithAnvilL1('BaseCommand', (web3: Web3) => {
  it('logs command execution error', async () => {
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
})
