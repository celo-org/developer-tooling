import { newKitFromProvider } from '@celo/contractkit'
import { testWithAnvilL2 } from '@celo/dev-utils/anvil-test'
import { testLocallyWithNode } from '../../test-utils/cliUtils'
import Register from './register'

process.env.NO_SYNCCHECK = 'true'

testWithAnvilL2('account:register cmd', (client) => {
  test('can register account', async () => {
    const kit = newKitFromProvider(client.currentProvider)
    const accounts = await kit.connection.getAccounts()

    await testLocallyWithNode(
      Register,
      ['--from', accounts[0], '--name', 'Chapulin Colorado'],
      client
    )
    const account = await kit.contracts.getAccounts()

    expect(await account.getName(accounts[0])).toMatchInlineSnapshot(`"Chapulin Colorado"`)
  })

  test('fails if from is missing', async () => {
    await expect(testLocallyWithNode(Register, [], client)).rejects.toThrow('Missing required flag')
  })
})
