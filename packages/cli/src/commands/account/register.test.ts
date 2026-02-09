import { newKitFromWeb3 } from '@celo/contractkit'
import { testWithAnvilL2 } from '@celo/dev-utils/anvil-test'
import { testLocallyWithWeb3Node } from '../../test-utils/cliUtils'
import Register from './register'

process.env.NO_SYNCCHECK = 'true'

testWithAnvilL2('account:register cmd', (client) => {
  test('can register account', async () => {
    const accounts = await client.eth.getAccounts()

    await testLocallyWithWeb3Node(
      Register,
      ['--from', accounts[0], '--name', 'Chapulin Colorado'],
      client
    )

    const kit = newKitFromWeb3(client)
    const account = await kit.contracts.getAccounts()

    expect(await account.getName(accounts[0])).toMatchInlineSnapshot(`"Chapulin Colorado"`)
  })

  test('fails if from is missing', async () => {
    await expect(testLocallyWithWeb3Node(Register, [], client)).rejects.toThrow(
      'Missing required flag'
    )
  })
})
